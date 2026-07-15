import React, { useRef, useState } from 'react';
import { Play, Square, Loader2, CheckCircle2, XCircle, ChevronDown, ChevronRight, RotateCcw, Clock, ListChecks } from 'lucide-react';
import type { BatchRow, ConfirmedItem } from '../types';
import { analyzeModel } from '../lib/api';
import { MatchResult } from './MatchResult';

/** 批量分析：一行一個型號，逐筆排隊呼叫 API (避免免費額度 rate limit)。 */
export function BatchPanel({ brand, customRules, onAddToList, isConfirmed, onDone }: {
  brand: string;
  customRules: string;
  onAddToList: (item: Omit<ConfirmedItem, 'id' | 'confirmedAt'>) => void;
  isConfirmed: (competitorModel: string, code: string) => boolean;
  onDone?: (row: BatchRow) => void;
}) {
  const [input, setInput] = useState('');
  const [rows, setRows] = useState<BatchRow[]>([]);
  const [running, setRunning] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cancelRef = useRef(false);

  const parseInput = (): BatchRow[] => {
    const seen = new Set<string>();
    return input
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        // 支援「型號」或「型號[TAB/逗號]品牌」(方便從 Excel 貼上)
        const parts = line.split(/[\t,，]/).map(p => p.trim()).filter(Boolean);
        return { model: parts[0], lineBrand: parts[1] };
      })
      .filter(({ model }) => {
        const key = model.toUpperCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(({ model, lineBrand }, idx) => ({
        id: `${Date.now()}-${idx}`,
        model,
        brand: lineBrand || (brand !== 'auto' ? brand : undefined),
        status: 'pending' as const,
      }));
  };

  const processRow = async (row: BatchRow): Promise<BatchRow> => {
    try {
      const result = await analyzeModel(row.model, row.brand, customRules);
      return { ...row, status: 'done', result, error: undefined };
    } catch (e: any) {
      return { ...row, status: 'error', error: e.message || '未知錯誤' };
    }
  };

  const start = async () => {
    const newRows = parseInput();
    if (newRows.length === 0) return;
    setRows(newRows);
    setRunning(true);
    cancelRef.current = false;

    for (const row of newRows) {
      if (cancelRef.current) break;
      setRows(prev => prev.map(r => (r.id === row.id ? { ...r, status: 'running' } : r)));
      const finished = await processRow(row);
      setRows(prev => prev.map(r => (r.id === row.id ? finished : r)));
      if (finished.status === 'done') onDone?.(finished);
      // 每筆之間短暫間隔，避免免費方案 rate limit；失敗(多半是額度)時多等一下
      if (!cancelRef.current) await new Promise(r => setTimeout(r, finished.status === 'error' ? 3000 : 800));
    }
    setRunning(false);
  };

  const stop = () => {
    cancelRef.current = true;
    setRunning(false);
    setRows(prev => prev.map(r => (r.status === 'running' || r.status === 'pending' ? { ...r, status: r.status === 'running' ? r.status : 'pending' } : r)));
  };

  const retryRow = async (rowId: string) => {
    const row = rows.find(r => r.id === rowId);
    if (!row || running) return;
    setRows(prev => prev.map(r => (r.id === rowId ? { ...r, status: 'running', error: undefined } : r)));
    const finished = await processRow(row);
    setRows(prev => prev.map(r => (r.id === rowId ? finished : r)));
    if (finished.status === 'done') onDone?.(finished);
  };

  const doneCount = rows.filter(r => r.status === 'done').length;
  const errorCount = rows.filter(r => r.status === 'error').length;
  const totalCount = rows.length;
  const progress = totalCount > 0 ? Math.round(((doneCount + errorCount) / totalCount) * 100) : 0;

  const statusIcon = (row: BatchRow) => {
    switch (row.status) {
      case 'pending': return <Clock className="w-4 h-4 text-slate-300" />;
      case 'running': return <Loader2 className="w-4 h-4 text-[#005a9c] animate-spin" />;
      case 'done': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center">
            <ListChecks className="w-5 h-5 mr-2 text-[#005a9c]" /> 批量型號分析
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">一行一個型號；也可貼上兩欄資料「型號、品牌」(支援從 Excel 直接複製貼上)</p>
        </div>
        <div className="p-5 space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={running}
            placeholder={'SY5320-5LOZE-01\nCQ2B40-30DZ + D-M9B\nAS2201F-01-06SA\nKQ2L06-01NS,SMC'}
            rows={6}
            className="w-full border border-slate-200 rounded-xl shadow-sm py-3 px-4 focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] bg-white text-slate-800 font-mono text-sm outline-none transition-all resize-y disabled:bg-slate-50 disabled:text-slate-400"
          />
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-slate-400">
              為避免超出 Gemini 免費額度限制，系統會逐筆分析（每筆約 15~30 秒）。
            </p>
            {running ? (
              <button onClick={stop} className="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-200 font-medium hover:bg-red-100 transition-colors flex items-center shadow-sm">
                <Square className="w-4 h-4 mr-2" /> 停止
              </button>
            ) : (
              <button
                onClick={start}
                disabled={!input.trim()}
                className="px-5 py-2.5 rounded-xl bg-[#005a9c] text-white font-medium hover:bg-[#004880] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors flex items-center shadow-sm"
              >
                <Play className="w-4 h-4 mr-2" /> 開始批量分析
              </button>
            )}
          </div>
        </div>
      </div>

      {rows.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-700">
              分析進度：{doneCount + errorCount} / {totalCount}
              {errorCount > 0 && <span className="text-red-500 ml-2">({errorCount} 筆失敗)</span>}
            </div>
            <div className="flex-1 max-w-[200px] h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#005a9c] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <ul className="divide-y divide-slate-100">
            {rows.map(row => {
              const expanded = expandedId === row.id;
              const firstRec = row.result?.airtacRecommendations?.[0];
              const bestCode = firstRec
                ? (firstRec.validation?.serverGeneratedCode && !firstRec.validation.catalogVerified
                    ? firstRec.validation.serverGeneratedCode
                    : firstRec.fullOrderingCode || firstRec.baseModel)
                : null;
              return (
                <li key={row.id}>
                  <button
                    onClick={() => row.status === 'done' && setExpandedId(expanded ? null : row.id)}
                    className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-colors ${row.status === 'done' ? 'hover:bg-blue-50/40 cursor-pointer' : 'cursor-default'}`}
                  >
                    {statusIcon(row)}
                    <span className="font-mono text-sm text-slate-700 break-all flex-1 min-w-0">{row.model}</span>
                    {row.status === 'done' && bestCode && (
                      <span className="font-mono text-sm font-semibold text-[#005a9c] hidden sm:inline truncate max-w-[220px]">→ {bestCode}</span>
                    )}
                    {row.status === 'done' && firstRec?.matchPercentage !== undefined && (
                      <span className="text-xs text-slate-400 tabular-nums hidden md:inline">{firstRec.matchPercentage}%</span>
                    )}
                    {row.status === 'error' && (
                      <>
                        <span className="text-xs text-red-500 truncate max-w-[280px]">{row.error}</span>
                        <span
                          role="button"
                          onClick={(e) => { e.stopPropagation(); retryRow(row.id); }}
                          className="text-xs text-[#005a9c] hover:text-[#004880] flex items-center shrink-0 font-medium cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 mr-1" />重試
                        </span>
                      </>
                    )}
                    {row.status === 'done' && (expanded ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />)}
                  </button>
                  {expanded && row.result && (
                    <div className="px-5 pb-5 bg-slate-50/50 border-t border-slate-100 pt-4">
                      <MatchResult
                        model={row.model}
                        result={row.result}
                        onAddToList={onAddToList}
                        isConfirmed={isConfirmed}
                        compact
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
