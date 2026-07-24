import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { Database, Upload, Loader2, Trash2, Search, Cloud, HardDrive, FileDown, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import {
  CorrectionRow, loadCorrections, deleteCorrection, clearCorrections, importCorrections, isCloudConfigured,
} from '../lib/cloudStore';

/** 依表頭關鍵字自動辨識欄位 → 我們需要的欄位。 */
function detectColumns(headers: string[]): Record<string, number> {
  const norm = (s: string) => String(s || '').toLowerCase().replace(/\s/g, '');
  const find = (keys: string[]) => headers.findIndex(h => keys.some(k => norm(h).includes(k)));
  return {
    brand: find(['競品品牌', '對手品牌', '品牌', '廠牌', 'brand', 'maker']),
    // 競品型號：優先含「競品/對手」，否則退回一般「型號/model」
    competitorModel: (() => {
      const strict = headers.findIndex(h => /競品|對手|competitor/i.test(h) && /型號|料號|model|部品|品番/i.test(h));
      if (strict >= 0) return strict;
      return find(['競品型號', '對手型號', '競品', '對手型', 'competitormodel']);
    })(),
    airtacCode: (() => {
      const strict = headers.findIndex(h => /airtac|亞德客|對應|建議/i.test(h) && /型號|訂購|料號|code|品番/i.test(h));
      if (strict >= 0) return strict;
      return find(['airtac', '亞德客', '訂購碼', '對應型號', '建議型號']);
    })(),
    description: find(['描述', '品名', '說明', 'description', '產品']),
    note: find(['備註', '說明備註', 'note', 'remark']),
  };
}

/** 若嚴格偵測失敗，退回「第一欄=競品、第二欄=AirTAC」的寬鬆猜測。 */
function fallbackModelCode(headers: string[], cols: Record<string, number>): Record<string, number> {
  const next = { ...cols };
  if (next.competitorModel < 0 || next.airtacCode < 0) {
    // 找出看起來像型號的兩欄 (排除已辨識到的品牌/描述/備註欄)
    const used = new Set([cols.brand, cols.description, cols.note].filter(i => i >= 0));
    const candidates = headers.map((_, i) => i).filter(i => !used.has(i));
    if (next.competitorModel < 0) next.competitorModel = candidates[0] ?? 0;
    if (next.airtacCode < 0) next.airtacCode = candidates.find(i => i !== next.competitorModel) ?? 1;
  }
  return next;
}

type Parsed = { rows: CorrectionRow[]; total: number; skipped: number; headers: string[]; cols: Record<string, number> };

/**
 * 已對照參考資料庫：所有經確認/匯入的「競品 → AirTAC」對照。
 * 之後分析同一競品型號時，這裡的結果會被當成最高權威直接採用，越多越快越準。
 */
export function ReferenceDB() {
  const [items, setItems] = useState<CorrectionRow[]>([]);
  const [cloudMode, setCloudMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [parsed, setParsed] = useState<Parsed | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const reload = async () => {
    setLoading(true);
    const cloud = await isCloudConfigured();
    setCloudMode(cloud);
    const { items } = await loadCorrections();
    setItems(items.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
    setLoading(false);
  };
  useEffect(() => { reload(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(it =>
      [it.competitorModel, it.brand, it.airtacCode, it.description, it.note]
        .some(v => String(v || '').toLowerCase().includes(q)));
  }, [items, query]);

  const handleFile = (file: File) => {
    setMsg(null); setParsed(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const wb = XLSX.read(reader.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const aoa = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1, blankrows: false });
        if (aoa.length < 2) { setMsg({ kind: 'err', text: '檔案沒有資料列（至少要有表頭 + 一列）。' }); return; }
        const headers = (aoa[0] as any[]).map(h => String(h ?? ''));
        let cols = detectColumns(headers);
        cols = fallbackModelCode(headers, cols);
        const rows: CorrectionRow[] = [];
        let skipped = 0;
        for (let i = 1; i < aoa.length; i++) {
          const r = aoa[i] as any[];
          const competitorModel = String(r[cols.competitorModel] ?? '').trim();
          const airtacCode = String(r[cols.airtacCode] ?? '').trim();
          if (!competitorModel || !airtacCode) { skipped++; continue; }
          rows.push({
            competitorModel,
            airtacCode,
            brand: cols.brand >= 0 ? String(r[cols.brand] ?? '').trim() || undefined : undefined,
            description: cols.description >= 0 ? String(r[cols.description] ?? '').trim() || undefined : undefined,
            note: cols.note >= 0 ? (String(r[cols.note] ?? '').trim() || '歷史匯入') : '歷史匯入',
          });
        }
        if (rows.length === 0) { setMsg({ kind: 'err', text: '找不到可用的「競品型號」與「AirTAC 訂購碼」欄位，請確認表頭名稱。' }); return; }
        setParsed({ rows, total: rows.length, skipped, headers, cols });
      } catch (e: any) {
        setMsg({ kind: 'err', text: `解析失敗：${e?.message || e}` });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const doImport = async () => {
    if (!parsed) return;
    setImporting(true);
    setProgress({ done: 0, total: parsed.total });
    const { ok, fail } = await importCorrections(parsed.rows, (done, total) => setProgress({ done, total }));
    setImporting(false);
    setParsed(null);
    if (fileRef.current) fileRef.current.value = '';
    setMsg({ kind: fail === 0 ? 'ok' : 'err', text: `匯入完成：成功 ${ok} 筆${fail ? `，失敗 ${fail} 筆` : ''}。` });
    reload();
  };

  const exportExcel = () => {
    const aoa = [['競品品牌', '競品型號', 'AirTAC 訂購碼', '產品描述', '備註', '更新時間']];
    for (const it of items) aoa.push([
      it.brand || '', it.competitorModel, it.airtacCode, it.description || '', it.note || '',
      it.updatedAt ? new Date(it.updatedAt).toLocaleString('zh-TW') : '',
    ]);
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws['!cols'] = [{ wch: 10 }, { wch: 24 }, { wch: 24 }, { wch: 30 }, { wch: 20 }, { wch: 18 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '已對照參考資料庫');
    XLSX.writeFile(wb, `AirTAC_參考資料庫_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const removeOne = async (it: CorrectionRow) => {
    if (!it.key) return;
    setItems(prev => prev.filter(x => x.key !== it.key));
    await deleteCorrection(it.key);
  };

  const clearAll = async () => {
    if (!window.confirm(`確定清空整個參考資料庫（${items.length} 筆）嗎？此動作無法復原。`)) return;
    setItems([]);
    await clearCorrections();
  };

  return (
    <div className="space-y-6">
      {/* 匯入區 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-[#005a9c]/5 flex items-center space-x-3">
          <div className="bg-[#005a9c] p-2 rounded-lg text-white"><Database className="w-5 h-5" /></div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">已對照參考資料庫</h2>
            <p className="text-slate-500 text-sm mt-0.5">
              匯入你們過去對過的 Excel，之後分析同一競品型號時會直接採用這裡的答案，越多越快越準。
            </p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {!cloudMode && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              參考資料庫是全公司共用的雲端資料，目前偵測到「本機模式」，無法匯入或共用。請先在頂端橫幅完成雲端啟用。
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden"
              onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={!cloudMode || importing}
              className="px-4 py-2.5 rounded-xl bg-[#005a9c] text-white font-medium hover:bg-[#004880] disabled:bg-slate-200 disabled:text-slate-400 transition-colors flex items-center shadow-sm"
            >
              <Upload className="w-4 h-4 mr-2" /> 選擇歷史對照 Excel
            </button>
            <span className="text-xs text-slate-400">
              支援 .xlsx / .xls / .csv，自動辨識「競品品牌 / 競品型號 / AirTAC 訂購碼 / 描述 / 備註」欄位
            </span>
          </div>

          {msg && (
            <div className={`px-4 py-3 rounded-xl border text-sm flex items-start gap-2 ${msg.kind === 'ok' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {msg.kind === 'ok' ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />}
              {msg.text}
            </div>
          )}

          {/* 匯入預覽 */}
          {parsed && (
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-emerald-800">
                  解析完成：可匯入 {parsed.total} 筆{parsed.skipped ? `（略過 ${parsed.skipped} 筆缺型號/訂購碼）` : ''}
                </h3>
                <button onClick={() => setParsed(null)} className="text-slate-400 hover:text-slate-600 p-1"><X className="w-4 h-4" /></button>
              </div>
              <div className="text-xs text-slate-500">
                欄位對應：
                <span className="font-mono ml-1">競品型號=「{parsed.headers[parsed.cols.competitorModel] || '?'}」</span>、
                <span className="font-mono ml-1">AirTAC=「{parsed.headers[parsed.cols.airtacCode] || '?'}」</span>
                {parsed.cols.brand >= 0 && <span className="font-mono ml-1">、品牌=「{parsed.headers[parsed.cols.brand]}」</span>}
              </div>
              <div className="overflow-x-auto max-h-48 border border-emerald-100 rounded-lg bg-white">
                <table className="w-full text-xs">
                  <thead className="bg-emerald-50 text-emerald-700"><tr>
                    <th className="px-2 py-1.5 text-left">競品品牌</th><th className="px-2 py-1.5 text-left">競品型號</th><th className="px-2 py-1.5 text-left">AirTAC 訂購碼</th>
                  </tr></thead>
                  <tbody>
                    {parsed.rows.slice(0, 8).map((r, i) => (
                      <tr key={i} className="border-t border-emerald-50">
                        <td className="px-2 py-1 text-slate-500">{r.brand || '-'}</td>
                        <td className="px-2 py-1 font-mono text-slate-700">{r.competitorModel}</td>
                        <td className="px-2 py-1 font-mono text-[#005a9c] font-semibold">{r.airtacCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setParsed(null)} className="px-4 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-100">取消</button>
                <button onClick={doImport} disabled={importing}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:bg-slate-200 flex items-center shadow-sm">
                  {importing ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />匯入中 {progress.done}/{progress.total}</> : <>確認匯入 {parsed.total} 筆</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 資料庫列表 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              資料庫內容 ({items.length})
              {cloudMode
                ? <span className="inline-flex items-center gap-0.5 text-xs text-[#005a9c] font-medium"><Cloud className="w-3.5 h-3.5" />雲端共用</span>
                : <span className="inline-flex items-center gap-0.5 text-xs text-slate-400"><HardDrive className="w-3.5 h-3.5" />本機模式</span>}
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">分析時競品型號命中這裡就直接採用（最高權威），跳過 AI 重算</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜尋型號…"
                className="pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]/30 outline-none w-40" />
            </div>
            <button onClick={exportExcel} disabled={items.length === 0}
              className="px-3 py-2 bg-white text-slate-600 border border-slate-200 hover:border-[#005a9c] hover:text-[#005a9c] rounded-lg text-sm font-medium flex items-center shadow-sm disabled:opacity-50">
              <FileDown className="w-4 h-4 mr-1.5" /> 匯出
            </button>
            <button onClick={clearAll} disabled={items.length === 0}
              className="px-3 py-2 bg-white text-slate-500 hover:text-red-600 hover:border-red-200 border border-slate-200 rounded-lg text-sm font-medium flex items-center shadow-sm disabled:opacity-50">
              <Trash2 className="w-4 h-4 mr-1.5" /> 清空
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-400 flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />載入中…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">
            {items.length === 0 ? '資料庫還是空的。確認過的對照會自動存進來，也可以上方匯入歷史 Excel。' : '沒有符合搜尋的資料。'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-semibold">競品型號</th>
                  <th className="px-4 py-3 font-semibold">AirTAC 訂購碼</th>
                  <th className="px-4 py-3 font-semibold hidden lg:table-cell">描述</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">備註</th>
                  <th className="px-4 py-3 font-semibold w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((it, idx) => (
                  <tr key={it.key || idx} className="hover:bg-slate-50/50">
                    <td className="px-4 py-2.5">
                      <div className="font-mono text-slate-700 break-all">{it.competitorModel}</div>
                      {it.brand && <div className="text-xs text-slate-400">{it.brand}</div>}
                    </td>
                    <td className="px-4 py-2.5 font-mono font-semibold text-[#005a9c] break-all">{it.airtacCode}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-600 hidden lg:table-cell max-w-[240px]">{it.description}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-400 hidden md:table-cell">{it.note}</td>
                    <td className="px-4 py-2.5">
                      <button onClick={() => removeOne(it)} className="text-slate-300 hover:text-red-500 p-1 rounded hover:bg-red-50" title="刪除此筆">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
