/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Search, ArrowRight, Loader2, Info, Building2, Lightbulb, CheckCircle2, Database, Repeat, Activity, Copy, Check, History, Trash2, ShieldCheck, AlertTriangle, Layers } from 'lucide-react';
import type { CrossReferenceResult, SearchHistoryItem } from './types';
import { ProductDatabase } from './components/ProductDatabase';

const HISTORY_KEY = 'airtac_search_history_v1';
const MAX_HISTORY = 15;

const LOADING_STAGES = [
  '解析競品型號結構…',
  '從型錄索引篩選候選系列…',
  '比對候選系列詳細規格…',
  '生成訂購碼並執行型錄驗證…',
];

function loadHistory(): SearchHistoryItem[] {
  try {
    const raw = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem(HISTORY_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load search history', e);
  }
  return [];
}

function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }).catch(() => {});
      }}
      className={`p-1.5 rounded-lg transition-colors ${copied ? 'text-green-600 bg-green-50' : 'text-slate-400 hover:text-[#005a9c] hover:bg-blue-50'} ${className}`}
      title={copied ? '已複製' : '複製訂購碼'}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function MatchBar({ percentage }: { percentage: number }) {
  const pct = Math.max(0, Math.min(100, percentage));
  const color = pct >= 90 ? 'bg-green-500' : pct >= 70 ? 'bg-amber-400' : 'bg-red-400';
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-slate-600 tabular-nums">{pct}%</span>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'match' | 'database'>('match');
  const [modelInput, setModelInput] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('auto');
  const [customRules, setCustomRules] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [result, setResult] = useState<CrossReferenceResult | null>(null);
  const [searchedModel, setSearchedModel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchHistoryItem[]>(loadHistory);
  const stageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      }
    } catch (e) {
      console.warn('Failed to save search history', e);
    }
  }, [history]);

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

  const restoreHistory = (item: SearchHistoryItem) => {
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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 150000); // 兩階段分析，放寬至 150 秒

      const response = await fetch('/api/cross-reference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitorModel: queryModel,
          brand: queryBrand === 'auto' ? undefined : queryBrand,
          customRules: customRules.trim() || undefined
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = '無法取得型號對應資料';
        try {
          const text = await response.text();
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            console.error("Non-JSON error response:", text);
            if (text.toLowerCase().includes('<!doctype') || text.toLowerCase().includes('<html')) {
              errorMessage = `伺服器回應異常 (${response.status})：系統可能正在重啟或線路不穩，請重新整理頁面後再試。`;
            } else {
              errorMessage = `伺服器錯誤 (${response.status}): ${text.substring(0, 100)}`;
            }
          }
        } catch (e) {
          errorMessage = `網路請求失敗: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const rawText = await response.text();
      let data: CrossReferenceResult;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error("Invalid JSON from server:", rawText);
        if (rawText.toLowerCase().includes('<!doctype') || rawText.toLowerCase().includes('<html')) {
          throw new Error('伺服器回應格式錯誤 (收到 HTML 網頁而非 API 數據)。系統可能在更新中，請重新整理頁面。');
        }
        throw new Error('無法解析伺服器回傳的資料格式。');
      }

      setSearchedModel(queryModel);
      setResult(data);
      pushHistory(queryModel, queryBrand, data);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('請求超時，請檢查網路連線或稍後再試。這通常是因為模型產生時間過長。');
      } else {
        setError(err.message || '發生未知的錯誤。');
      }
    } finally {
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
      setIsLoading(false);
    }
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
            <div className="hidden sm:flex items-center gap-2 text-xs text-blue-100 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              AI 推薦均經型錄資料庫驗證
            </div>
          </div>
          <div className="flex space-x-1">
            {([
              { key: 'match', icon: Repeat, label: '型號自動匹配' },
              { key: 'database', icon: Database, label: '產品資料庫' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 text-sm font-medium transition-colors rounded-t-xl ${activeTab === tab.key ? 'bg-slate-50 text-[#005a9c]' : 'text-blue-100 hover:text-white hover:bg-white/10'}`}
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
        {activeTab === 'database' ? (
          <ProductDatabase />
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
                      placeholder="例：KQ2L06-01NS 或 CQ2B40-30DZ + D-M9B"
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
                      <span><strong>注意特殊規格：</strong> 若設備有耐高溫、耐酸鹼、無塵室等特殊要求，務必交叉比對型錄。</span>
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
                <p className="text-xs text-slate-400 mt-6">兩階段分析通常需要 20~60 秒，系統會先從 294 個系列中篩選候選，再進行精確比對。</p>
              </div>
            </div>
          )}

          {/* Right Column: Results */}
          {result && !isLoading && (
            <div className="lg:col-span-8 space-y-6 lg:pl-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* Competitor Spec Analysis */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                  <div>
                    <div className="flex items-center space-x-2 text-slate-500 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 border border-slate-200">競爭對手產品分析</span>
                      {result.productType && (
                        <span className="text-xs font-semibold bg-blue-50 px-2.5 py-1 rounded-md text-[#005a9c] border border-blue-100">{result.productType}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold font-mono text-slate-800 break-all">{searchedModel}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">識別廠牌</span>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">{result.competitorBrand}</p>
                  </div>
                </div>

                {result.candidateSeries && result.candidateSeries.length > 0 && (
                  <div className="mb-5 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center">
                      <Layers className="w-3.5 h-3.5 mr-1" /> AI 篩選出的候選系列 ({result.candidateSeries.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {result.candidateSeries.map(cs => (
                        <span key={cs.id} className="text-xs bg-white text-slate-600 px-2 py-1 rounded-md border border-slate-200" title={cs.name}>
                          <span className="font-mono font-semibold text-[#005a9c]">{cs.code || cs.id}</span>
                          <span className="text-slate-400 ml-1">{cs.group}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.preAnalysis && (
                  <div className="mb-5 space-y-4">
                    <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-100/50">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3 flex items-center">
                        <Search className="w-3.5 h-3.5 mr-1" /> 對手型號精確拆解
                      </h4>
                      <ul className="space-y-1.5">
                        {result.preAnalysis.competitorModelDisassembly.map((item, idx) => (
                          <li key={idx} className="flex items-start text-xs text-amber-900 leading-relaxed font-mono">
                            <span className="text-amber-500 mr-2">›</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#005a9c]/5 p-4 rounded-xl border border-[#005a9c]/10">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#005a9c] mb-3 flex items-center">
                        <Lightbulb className="w-3.5 h-3.5 mr-1" /> 亞德客對應邏輯推演
                      </h4>
                      <ul className="space-y-1.5">
                        {result.preAnalysis.airtacRuleMapping.map((item, idx) => (
                          <li key={idx} className="flex items-start text-xs text-slate-700 leading-relaxed font-medium">
                            <span className="text-[#005a9c] mr-2">›</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
                    <Info className="w-3.5 h-3.5 mr-1" />規格解析綜合結果
                  </h4>
                  <ul className="space-y-2.5">
                    {result.competitorSpecs.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-2.5 flex-shrink-0"></span>
                        <span className="text-sm text-slate-700 leading-relaxed font-medium">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm text-[#005a9c]">
                  <ArrowRight className="w-5 h-5 rotate-90 lg:rotate-0" />
                </div>
              </div>

              {/* AirTAC Recommendations */}
              <div className="bg-white rounded-2xl shadow-md border-t-4 border-t-[#005a9c] border-x border-b border-slate-200 overflow-hidden">
                <div className="bg-slate-50/80 p-5 border-b border-slate-100 flex items-center space-x-3">
                  <div className="bg-[#005a9c]/10 p-2 rounded-lg text-[#005a9c]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">亞德客 (AirTAC) 推薦方案</h3>
                </div>

                <div className="p-6">
                  <div className="space-y-5">
                    {result.airtacRecommendations.map((rec, idx) => {
                      const isNoMatch = rec.baseModel.includes("無對應") || rec.baseModel.includes("無直接對應") || rec.matchType?.includes("無") ;
                      const validation = rec.validation;
                      // 優先顯示經型錄驗證重建的訂購碼
                      const displayCode = (!isNoMatch && validation?.serverGeneratedCode && !validation.catalogVerified)
                        ? validation.serverGeneratedCode
                        : (rec.fullOrderingCode && !isNoMatch ? rec.fullOrderingCode : rec.baseModel);

                      let matchBadgeClass = "bg-green-50 text-green-700 border-green-200";
                      if (isNoMatch) matchBadgeClass = "bg-red-50 text-red-700 border-red-200";
                      else if (rec.matchType === "相似替代") matchBadgeClass = "bg-amber-50 text-amber-700 border-amber-200";

                      const cardClass = isNoMatch ? "border-red-100 bg-red-50/30" : "border-slate-200 bg-white";

                      return (
                        <div key={idx} className={`rounded-xl p-5 border shadow-sm ${cardClass} relative overflow-hidden transition-all hover:shadow-md`}>

                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${isNoMatch ? 'bg-red-400' : (rec.matchType === "相似替代" ? 'bg-amber-400' : 'bg-green-500')}`}></div>

                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 pl-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1 flex-wrap">
                                <h3 className={`text-2xl font-bold font-mono tracking-tight break-all ${isNoMatch ? 'text-red-700' : 'text-[#005a9c]'}`}>
                                  {displayCode}
                                </h3>
                                {!isNoMatch && <CopyButton text={displayCode} />}
                              </div>
                              {rec.fullOrderingCode && !isNoMatch && rec.fullOrderingCode !== rec.baseModel && (
                                <p className="text-slate-500 text-xs mt-1 font-mono bg-slate-100 inline-block px-1.5 py-0.5 rounded">基礎系列: {rec.baseModel}</p>
                              )}
                              <p className="text-slate-700 text-sm mt-2 font-medium">{rec.description}</p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                              <div className="flex items-center gap-2">
                                {rec.matchType && (
                                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${matchBadgeClass}`}>
                                    {rec.matchType}
                                  </span>
                                )}
                                {!isNoMatch && validation && (
                                  validation.catalogVerified ? (
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md border bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1" title="系列與所有選項代碼皆通過型錄資料庫驗證">
                                      <ShieldCheck className="w-3.5 h-3.5" /> 型錄已驗證
                                    </span>
                                  ) : (
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md border bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1" title="部分內容與型錄不一致，請見下方警告">
                                      <AlertTriangle className="w-3.5 h-3.5" /> 需人工確認
                                    </span>
                                  )
                                )}
                              </div>
                              {rec.matchPercentage !== undefined && !isNoMatch && (
                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                                  <span>匹配度</span>
                                  <MatchBar percentage={rec.matchPercentage} />
                                </div>
                              )}
                            </div>
                          </div>

                          {validation && validation.warnings.length > 0 && !isNoMatch && (
                            <div className="mt-2 mb-4 pl-2">
                              <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 text-sm">
                                <h4 className="text-xs font-bold text-orange-700 mb-1.5 flex items-center">
                                  <AlertTriangle className="w-3.5 h-3.5 mr-1" /> 型錄驗證警告
                                </h4>
                                <ul className="space-y-1">
                                  {validation.warnings.map((w, wIdx) => (
                                    <li key={wIdx} className="text-xs text-orange-800 leading-relaxed flex items-start">
                                      <span className="mr-1.5">•</span>{w}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {rec.reasoningForOrderingCode && (
                            <div className="mt-3 mb-4 pl-2">
                              <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/50 text-sm">
                                <h4 className="text-xs font-bold text-blue-700 mb-1.5 flex items-center">
                                  <Lightbulb className="w-3.5 h-3.5 mr-1" /> 推導邏輯
                                </h4>
                                <p className="text-slate-600 leading-relaxed text-xs">{rec.reasoningForOrderingCode}</p>
                              </div>
                            </div>
                          )}

                          {!isNoMatch && rec.configurableOptions && rec.configurableOptions.length > 0 && (
                            <div className="mt-5 pl-2">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-2">細部規格選擇指示</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {rec.configurableOptions.map((opt, oIdx) => (
                                  <div key={oIdx} className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-sm">
                                    <div className="text-slate-500 text-xs mb-1 font-medium">{opt.parameter}</div>
                                    <div className="font-semibold text-slate-800 mb-2">{opt.options}</div>
                                    <div className="bg-blue-50 text-[#005a9c] px-2.5 py-1.5 rounded-md text-xs border border-blue-100 inline-flex w-full items-center">
                                      <span className="font-bold mr-1.5">推薦選型:</span>
                                      <span className="font-medium text-blue-900">{opt.suggestion}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Explanation box */}
                  <div className="mt-6 bg-slate-50 rounded-xl p-5 border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">專案匹配備註</h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {result.explanation}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-6 pb-8 text-center text-xs text-slate-400">
        AI 推薦僅供選型參考，最終訂購前請務必與亞德客官方型錄核對規格。
      </footer>
    </div>
  );
}
