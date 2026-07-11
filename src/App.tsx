/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ArrowRight, Loader2, Info, Building2, Server, Lightbulb, CheckCircle2, Database, Repeat } from 'lucide-react';
import type { CrossReferenceResult } from './types';
import { ProductDatabase } from './components/ProductDatabase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'match' | 'database'>('database');
  const [modelInput, setModelInput] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('auto');
  const [customRules, setCustomRules] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CrossReferenceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

      const response = await fetch('/api/cross-reference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitorModel: modelInput.trim(),
          brand: selectedBrand === 'auto' ? undefined : selectedBrand,
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
      
      setResult(data);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('請求超時，請檢查網路連線或稍後再試。這通常是因為模型產生時間過長。');
      } else {
        setError(err.message || '發生未知的錯誤。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-[#005a9c] text-white shadow-sm border-b border-[#004880]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">AirTAC 產品系統</h1>
                <p className="text-xs text-blue-100 opacity-90 mt-0.5 tracking-wide">亞德客競品對應與產品資料庫</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 border-b border-white/10 pb-[-1px]">
            <button
              onClick={() => setActiveTab('match')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'match' ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white hover:border-white/50'}`}
            >
              <div className="flex items-center">
                <Repeat className="w-4 h-4 mr-1.5" />
                型號自動匹配
              </div>
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'database' ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white hover:border-white/50'}`}
            >
              <div className="flex items-center">
                <Database className="w-4 h-4 mr-1.5" />
                產品資料庫
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {activeTab === 'database' ? (
          <ProductDatabase />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Form & Guidance */}
          <div className={`space-y-6 ${result ? 'lg:col-span-4' : 'lg:col-span-8 lg:col-start-3'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">尋找對應型號</h2>
                  <p className="text-slate-500 text-sm mt-0.5">輸入競爭對手產品，獲取亞德客等效型號</p>
                </div>
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
                      <option value="MISUMI">MISUMI (米思米)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="modelInput" className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>完整型號 / 組合描述</span>
                    </label>
                    <div className="relative">
                      <input
                        id="modelInput"
                        type="text"
                        value={modelInput}
                        onChange={(e) => setModelInput(e.target.value)}
                        placeholder="例：KQ2L06-01NS 或 AS2201F"
                        className="w-full border border-slate-200 rounded-xl shadow-sm py-3 pl-4 pr-14 focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] bg-white text-slate-900 placeholder-slate-400 outline-none transition-all font-mono text-sm"
                        required
                      />
                    </div>
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

            {/* Hint Box (shown mostly when no results to guide user) */}
            <div className={`bg-blue-50/70 p-5 rounded-2xl border border-blue-100/60 transition-all duration-500`}>
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
                      <span><strong>列出組合配件：</strong> 若為氣缸帶感測器或接頭，請將所有配件型號一併列出。</span>
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
                  <h3 className="font-semibold text-sm">查尋發生錯誤</h3>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Results */}
          {result && (
            <div className="lg:col-span-8 space-y-6 lg:pl-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Competitor Spec Analysis */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                  <div>
                    <div className="flex items-center space-x-2 text-slate-500 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 border border-slate-200">競爭對手產品分析</span>
                    </div>
                    <h3 className="text-xl font-bold font-mono text-slate-800 break-all">{modelInput}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">識別廠牌</span>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">{result.competitorBrand}</p>
                  </div>
                </div>

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

              {/* Arrow Indicator (visual connection) */}
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
                      const isNoMatch = rec.baseModel.includes("無對應") || rec.matchType?.includes("無對應");
                      
                      let matchBadgeClass = "bg-green-50 text-green-700 border-green-200";
                      if (isNoMatch) matchBadgeClass = "bg-red-50 text-red-700 border-red-200";
                      else if (rec.matchType === "相似替代") matchBadgeClass = "bg-amber-50 text-amber-700 border-amber-200";

                      let cardClass = isNoMatch ? "border-red-100 bg-red-50/30" : "border-slate-200 bg-white";

                      return (
                        <div key={idx} className={`rounded-xl p-5 border shadow-sm ${cardClass} relative overflow-hidden transition-all hover:shadow-md`}>
                          
                          {/* Accent line on the left */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${isNoMatch ? 'bg-red-400' : (rec.matchType === "相似替代" ? 'bg-amber-400' : 'bg-green-500')}`}></div>

                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 pl-2">
                            <div>
                              <h3 className={`text-2xl font-bold font-mono tracking-tight break-all ${isNoMatch ? 'text-red-700' : 'text-[#005a9c]'}`}>
                                {rec.fullOrderingCode && !isNoMatch ? rec.fullOrderingCode : rec.baseModel}
                              </h3>
                              {rec.fullOrderingCode && !isNoMatch && rec.fullOrderingCode !== rec.baseModel && (
                                <p className="text-slate-500 text-xs mt-1 font-mono bg-slate-100 inline-block px-1.5 py-0.5 rounded">基礎系列: {rec.baseModel}</p>
                              )}
                              <p className="text-slate-700 text-sm mt-2 font-medium">{rec.description}</p>
                            </div>
                            {rec.matchType && (
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border shrink-0 ${matchBadgeClass}`}>
                                {rec.matchType}
                              </span>
                            )}
                          </div>
                          
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
    </div>
  );
}

