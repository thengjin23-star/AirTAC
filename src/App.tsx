/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Search, Loader2, Info, Building2, Lightbulb, CheckCircle2, Database, Repeat, History, Trash2, ShieldCheck, ClipboardList, User, Rows3, BookOpen, Cloud } from 'lucide-react';
import type { CrossReferenceResult, SearchHistoryItem, ConfirmedItem, BatchRow } from './types';
import { ProductDatabase } from './components/ProductDatabase';
import { MatchResult } from './components/MatchResult';
import { ConfirmedList } from './components/ConfirmedList';
import { BatchPanel } from './components/BatchPanel';
import { KnowledgeBase } from './components/KnowledgeBase';
import { CloudStatusBanner } from './components/CloudStatusBanner';
import { analyzeModel } from './lib/api';
import { loadItems, putItem, deleteItem, clearItems, saveCorrection } from './lib/cloudStore';

const HISTORY_KEY = 'airtac_search_history_v1';
const CONFIRMED_KEY = 'airtac_confirmed_list_v1';
const MAX_HISTORY = 15;

const LOADING_STAGES = [
  '解析競品型號結構…',
  '從型錄索引篩選候選系列…',
  '比對候選系列詳細規格…',
  '生成訂購碼並執行型錄驗證…',
];

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem(key) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(fallback) ? Array.isArray(parsed) : parsed) return parsed as T;
    }
  } catch (e) {
    console.warn(`Failed to load ${key}`, e);
  }
  return fallback;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'match' | 'confirmed' | 'knowledge' | 'database'>('match');
  const [matchMode, setMatchMode] = useState<'single' | 'batch'>('single');
  const [modelInput, setModelInput] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('auto');
  const [customRules, setCustomRules] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [result, setResult] = useState<CrossReferenceResult | null>(null);
  const [searchedModel, setSearchedModel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchHistoryItem[]>(() => loadJson(HISTORY_KEY, [] as SearchHistoryItem[]));
  const [confirmedItems, setConfirmedItems] = useState<ConfirmedItem[]>(() => loadJson(CONFIRMED_KEY, [] as ConfirmedItem[]));
  const [cloudMode, setCloudMode] = useState(false);
  const stageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch (e) {}
  }, [history]);

  // 確認清單：雲端優先載入 (未設定雲端則等同讀 localStorage)。
  // cloudMode 由 CloudStatusBanner 的端到端自我測試決定 (較 isCloudConfigured 更嚴謹)。
  useEffect(() => {
    (async () => {
      const { items } = await loadItems<ConfirmedItem>('confirmed');
      if (items && items.length) setConfirmedItems(items);
    })();
  }, []);

  useEffect(() => () => { if (stageTimerRef.current) clearInterval(stageTimerRef.current); }, []);

  const pushHistory = (model: string, brand: string, res: CrossReferenceResult) => {
    setHistory(prev => {
      const item: SearchHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp: Date.now(),
        model,
        brand,
        result: res,
      };
      const filtered = prev.filter(h => !(h.model === model && h.brand === brand));
      return [item, ...filtered].slice(0, MAX_HISTORY);
    });
  };

  /** 加入確認清單 (供單筆與批量的 MatchResult 共用) — 同步雲端 + 觸發自我學習 */
  const addToConfirmedList = (item: Omit<ConfirmedItem, 'id' | 'confirmedAt'> & { seriesId?: string }) => {
    // 同一個競品型號 + 同一個訂購碼 視為重複，不重覆加入
    if (confirmedItems.some(p => p.competitorModel === item.competitorModel && p.airtacCode === item.airtacCode)) return;
    const full: ConfirmedItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      confirmedAt: Date.now(),
    };
    setConfirmedItems(prev => [...prev, full]);
    putItem('confirmed', full);
    // 自我學習：把這筆人工確認記為修正，未來同型號優先採用 (只在雲端模式)
    saveCorrection({
      competitorModel: item.competitorModel,
      brand: item.brand,
      airtacCode: item.airtacCode,
      seriesId: (item as any).seriesId,
      description: item.description,
      note: item.note,
    });
  };

  const isConfirmed = (competitorModel: string, code: string) =>
    confirmedItems.some(p => p.competitorModel === competitorModel && p.airtacCode === code);

  // 確認清單的雲端同步操作 (傳給 ConfirmedList)
  const updateConfirmed = (id: string, patch: Partial<ConfirmedItem>) => {
    setConfirmedItems(prev => {
      const next = prev.map(it => (it.id === id ? { ...it, ...patch } : it));
      const updated = next.find(it => it.id === id);
      if (updated) putItem('confirmed', updated);
      return next;
    });
  };
  const removeConfirmed = (id: string) => {
    setConfirmedItems(prev => prev.filter(it => it.id !== id));
    deleteItem('confirmed', id);
  };
  const clearConfirmed = () => {
    setConfirmedItems([]);
    clearItems('confirmed');
  };

  const restoreHistory = (item: SearchHistoryItem) => {
    setMatchMode('single');
    setModelInput(item.model);
    setSelectedBrand(item.brand || 'auto');
    setSearchedModel(item.model);
    setResult(item.result);
    setError(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setLoadingStage(0);
    if (stageTimerRef.current) clearInterval(stageTimerRef.current);
    stageTimerRef.current = setInterval(() => {
      setLoadingStage(s => Math.min(s + 1, LOADING_STAGES.length - 1));
    }, 6000);

    const queryModel = modelInput.trim();
    const queryBrand = selectedBrand;

    try {
      const data = await analyzeModel(queryModel, queryBrand, customRules);
      setSearchedModel(queryModel);
      setResult(data);
      pushHistory(queryModel, queryBrand, data);
    } catch (err: any) {
      setError(err.message || '發生未知的錯誤。');
    } finally {
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
      setIsLoading(false);
    }
  };

  const handleBatchDone = (row: BatchRow) => {
    if (row.result) pushHistory(row.model, row.brand || 'auto', row.result);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#004880] to-[#005a9c] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 pt-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/20">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">AirTAC 產品系統</h1>
                <p className="text-xs text-blue-100 opacity-90 mt-0.5 tracking-wide">亞德客競品對應與產品資料庫</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              {cloudMode && (
                <div className="flex items-center gap-1.5 text-xs text-white bg-white/15 px-3 py-1.5 rounded-full border border-white/20" title="團隊雲端共用模式：確認清單、知識庫、自我學習全公司共用">
                  <Cloud className="w-3.5 h-3.5" /> 團隊共用
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                AI 推薦均經型錄驗證
              </div>
            </div>
          </div>
          <div className="flex space-x-1 overflow-x-auto">
            {([
              { key: 'match', icon: Repeat, label: '型號自動匹配' },
              { key: 'confirmed', icon: ClipboardList, label: `確認清單${confirmedItems.length > 0 ? ` (${confirmedItems.length})` : ''}` },
              { key: 'knowledge', icon: BookOpen, label: '對手知識庫' },
              { key: 'database', icon: Database, label: '產品資料庫' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 text-sm font-medium transition-colors rounded-t-xl whitespace-nowrap ${activeTab === tab.key ? 'bg-slate-50 text-[#005a9c]' : 'text-blue-100 hover:text-white hover:bg-white/10'}`}
              >
                <div className="flex items-center">
                  <tab.icon className="w-4 h-4 mr-1.5" />
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <CloudStatusBanner onStatus={setCloudMode} />
        {activeTab === 'database' && <ProductDatabase />}
        {activeTab === 'knowledge' && <KnowledgeBase />}
        {activeTab === 'confirmed' && <ConfirmedList items={confirmedItems} onUpdate={updateConfirmed} onRemove={removeConfirmed} onClear={clearConfirmed} cloudMode={cloudMode} />}
        {activeTab === 'match' && (
          <>
            {/* 單筆 / 批量 模式切換 */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-1 flex">
                {([
                  { key: 'single', icon: User, label: '單筆分析' },
                  { key: 'batch', icon: Rows3, label: '批量分析' },
                ] as const).map(m => (
                  <button
                    key={m.key}
                    onClick={() => setMatchMode(m.key)}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${matchMode === m.key ? 'bg-[#005a9c] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <m.icon className="w-4 h-4 mr-1.5" />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {matchMode === 'batch' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3 space-y-5">
                  {/* 共用設定 */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">預設廠牌 (選填)</label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl shadow-sm py-2.5 px-3 focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] bg-slate-50 text-slate-700 text-sm outline-none transition-all"
                      >
                        <option value="auto">自動偵測廠牌</option>
                        <option value="SMC">SMC</option>
                        <option value="PISCO">PISCO</option>
                        <option value="Mindman">Mindman (金器)</option>
                        <option value="Festo">Festo (費斯托)</option>
                        <option value="CKD">CKD (喜開理)</option>
                        <option value="MISUMI">MISUMI (米思米)</option>
                      </select>
                      <p className="text-[11px] text-slate-400 mt-1">每行型號後面用逗號指定品牌可覆蓋此設定</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">自訂替換規則 (選填，套用到全部)</label>
                      <textarea
                        value={customRules}
                        onChange={(e) => setCustomRules(e.target.value)}
                        placeholder="例如：「SMC CQ2 必須優先對應 ACQ」"
                        rows={3}
                        className="w-full border border-slate-200 rounded-xl shadow-sm py-2.5 px-3 focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] bg-white text-slate-700 text-sm outline-none transition-all resize-y"
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100/60 text-xs text-blue-800/80 leading-relaxed">
                    <Lightbulb className="w-4 h-4 text-blue-600 mb-1.5" />
                    分析完成的項目點開即可檢視詳情、修改訂購碼並加入確認清單；全部確認後到「確認清單」分頁一次匯出 Excel。
                  </div>
                </div>
                <div className="lg:col-span-9">
                  <BatchPanel
                    brand={selectedBrand}
                    customRules={customRules}
                    onAddToList={addToConfirmedList}
                    isConfirmed={isConfirmed}
                    onDone={handleBatchDone}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Input Form & Guidance */}
                <div className={`space-y-6 ${result || isLoading ? 'lg:col-span-4' : 'lg:col-span-8 lg:col-start-3'}`}>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                      <h2 className="text-lg font-semibold text-slate-800">尋找對應型號</h2>
                      <p className="text-slate-500 text-sm mt-0.5">輸入競爭對手產品，獲取亞德客等效型號</p>
                    </div>

                    <div className="p-6">
                      <form onSubmit={handleSearch} className="space-y-5">
                        <div>
                          <label htmlFor="brand" className="block text-sm font-medium text-slate-700 mb-1.5 whitespace-nowrap">
                            指定廠牌 (選填)
                          </label>
                          <select
                            id="brand"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full border border-slate-200 rounded-xl shadow-sm py-2.5 px-3 focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] bg-slate-50 text-slate-700 text-sm outline-none transition-all"
                          >
                            <option value="auto">自動偵測廠牌</option>
                            <option value="SMC">SMC</option>
                            <option value="PISCO">PISCO</option>
                            <option value="Mindman">Mindman (金器)</option>
                            <option value="Festo">Festo (費斯托)</option>
                            <option value="CKD">CKD (喜開理)</option>
                            <option value="MISUMI">MISUMI (米思米)</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="modelInput" className="block text-sm font-medium text-slate-700 mb-1.5">
                            完整型號 / 組合描述
                          </label>
                          <input
                            id="modelInput"
                            type="text"
                            value={modelInput}
                            onChange={(e) => setModelInput(e.target.value)}
                            placeholder="例：SY5320-5LOZE-01 或 CQ2B40-30DZ + D-M9B"
                            className="w-full border border-slate-200 rounded-xl shadow-sm py-3 pl-4 pr-4 focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] bg-white text-slate-900 placeholder-slate-400 outline-none transition-all font-mono text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="customRules" className="block text-sm font-medium text-slate-700 mb-1.5">
                            自訂替換規則或提示 (選填)
                          </label>
                          <textarea
                            id="customRules"
                            value={customRules}
                            onChange={(e) => setCustomRules(e.target.value)}
                            placeholder="餵入專屬知識，例如：「SMC CQ2 必須優先對應 AirTAC ACQ」或是「此型號已停產，改用 XXX」"
                            rows={3}
                            className="w-full border border-slate-200 rounded-xl shadow-sm py-3 px-4 focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] bg-white text-slate-700 text-sm outline-none transition-all resize-y"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading || !modelInput.trim()}
                          className="w-full py-3 px-4 flex items-center justify-center rounded-xl bg-[#005a9c] text-white font-medium hover:bg-[#004880] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                          {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Search className="w-5 h-5 mr-2" />}
                          開始分析比對
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Search History */}
                  {history.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center text-slate-600">
                          <History className="w-4 h-4 mr-2" />
                          <h3 className="text-sm font-semibold">最近查詢</h3>
                        </div>
                        <button
                          onClick={() => setHistory([])}
                          className="text-xs text-slate-400 hover:text-red-500 flex items-center transition-colors"
                          title="清除全部歷史"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" /> 清除
                        </button>
                      </div>
                      <ul className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                        {history.map(item => {
                          const firstRec = item.result.airtacRecommendations?.[0];
                          return (
                            <li key={item.id}>
                              <button
                                onClick={() => restoreHistory(item)}
                                className="w-full text-left px-5 py-2.5 hover:bg-blue-50/50 transition-colors group"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-mono text-sm text-slate-700 group-hover:text-[#005a9c] truncate">{item.model}</span>
                                  <span className="text-[10px] text-slate-400 shrink-0">{new Date(item.timestamp).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                {firstRec && (
                                  <div className="text-xs text-slate-400 mt-0.5 truncate">
                                    → <span className="font-mono">{firstRec.validation?.serverGeneratedCode || firstRec.fullOrderingCode || firstRec.baseModel}</span>
                                  </div>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Hint Box */}
                  <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-100/60">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-xl text-blue-700 mt-0.5 shrink-0">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900 text-sm">如何獲得更精準的匹配結果？</h3>
                        <ul className="mt-2 space-y-2 text-sm text-blue-800/80">
                          <li className="flex items-start">
                            <span className="mr-2 opacity-50 mt-0.5">•</span>
                            <span><strong>提供完整後綴碼：</strong> 包含口徑、行程、牙型、牙規（M, R, NPT）與電壓等代碼。</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 opacity-50 mt-0.5">•</span>
                            <span><strong>列出組合配件：</strong> 若為氣缸帶感測器或接頭，請將所有配件型號用「+」一併列出。</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 opacity-50 mt-0.5">•</span>
                            <span><strong>善用自訂規則：</strong> 發現 AI 對應錯誤時，把正確規則寫進「自訂替換規則」欄位，AI 會優先遵守。</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Error State */}
                  {error && (
                    <div className="bg-red-50 text-red-700 p-5 rounded-2xl flex items-start space-x-3 border border-red-100 animate-in fade-in">
                      <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
                      <div>
                        <h3 className="font-semibold text-sm">查詢發生錯誤</h3>
                        <p className="text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Loading progress panel */}
                {isLoading && (
                  <div className="lg:col-span-8 lg:pl-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in">
                      <div className="flex items-center space-x-3 mb-6">
                        <Loader2 className="w-6 h-6 animate-spin text-[#005a9c]" />
                        <h3 className="text-lg font-semibold text-slate-800">AI 分析比對中</h3>
                      </div>
                      <ol className="space-y-4">
                        {LOADING_STAGES.map((stage, idx) => (
                          <li key={idx} className={`flex items-center space-x-3 text-sm transition-all duration-500 ${idx < loadingStage ? 'text-green-600' : idx === loadingStage ? 'text-[#005a9c] font-medium' : 'text-slate-300'}`}>
                            {idx < loadingStage ? (
                              <CheckCircle2 className="w-5 h-5 shrink-0" />
                            ) : idx === loadingStage ? (
                              <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-slate-200 shrink-0" />
                            )}
                            <span>{stage}</span>
                          </li>
                        ))}
                      </ol>
                      <p className="text-xs text-slate-400 mt-6">兩階段分析通常需要 15~30 秒，系統會先從 294 個系列中篩選候選，再進行精確比對。</p>
                    </div>
                  </div>
                )}

                {/* Results */}
                {result && !isLoading && (
                  <div className="lg:col-span-8 lg:pl-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <MatchResult
                      model={searchedModel}
                      result={result}
                      onAddToList={addToConfirmedList}
                      isConfirmed={isConfirmed}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-6 pb-8 text-center text-xs text-slate-400">
        AI 推薦僅供選型參考，最終訂購前請務必與亞德客官方型錄核對規格。
      </footer>
    </div>
  );
}
