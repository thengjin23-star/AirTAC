import React, { useState } from 'react';
import { Search, Info, Lightbulb, CheckCircle2, Activity, Copy, Check, ShieldCheck, AlertTriangle, Layers, RotateCcw, ListPlus, ArrowRight } from 'lucide-react';
import type { CrossReferenceResult, AirtacRecommendation, ConfirmedItem } from '../types';

export function CopyButton({ text, className = '' }: { text: string; className?: string }) {
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
    <div className="flex items-center gap-2 min-w-[110px]">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-slate-600 tabular-nums">{pct}%</span>
    </div>
  );
}

/** 單張推薦卡：訂購碼可編輯、確認後加入清單 */
function RecCard({ rec, competitorModel, competitorBrand, onAddToList, isConfirmed }: {
  rec: AirtacRecommendation;
  competitorModel: string;
  competitorBrand: string;
  onAddToList: (item: Omit<ConfirmedItem, 'id' | 'confirmedAt'>) => void;
  isConfirmed: (code: string) => boolean;
}) {
  const isNoMatch = rec.baseModel.includes('無對應') || rec.baseModel.includes('無直接對應') || (rec.matchType || '').includes('無');
  const validation = rec.validation;
  const suggestedCode = (!isNoMatch && validation?.serverGeneratedCode && !validation.catalogVerified)
    ? validation.serverGeneratedCode
    : (rec.fullOrderingCode && !isNoMatch ? rec.fullOrderingCode : rec.baseModel);

  const [editedCode, setEditedCode] = useState(suggestedCode);
  const [justAdded, setJustAdded] = useState(false);
  const confirmed = isConfirmed(editedCode) || justAdded;
  const codeModified = editedCode !== suggestedCode;

  let matchBadgeClass = 'bg-green-50 text-green-700 border-green-200';
  if (isNoMatch) matchBadgeClass = 'bg-red-50 text-red-700 border-red-200';
  else if (rec.matchType === '相似替代') matchBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';

  const handleAdd = () => {
    onAddToList({
      brand: competitorBrand,
      competitorModel,
      airtacCode: editedCode.trim(),
      description: rec.description,
      matchType: rec.matchType,
      matchPercentage: rec.matchPercentage,
      note: codeModified ? '訂購碼經人工修改' : '',
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  return (
    <div className={`rounded-xl border shadow-sm ${isNoMatch ? 'border-red-100 bg-red-50/30' : 'border-slate-200 bg-white'} relative overflow-hidden transition-all hover:shadow-md`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isNoMatch ? 'bg-red-400' : (rec.matchType === '相似替代' ? 'bg-amber-400' : 'bg-green-500')}`}></div>

      <div className="p-5 pl-6">
        {/* 競品 → AirTAC 對照列 */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
          <span className="font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200 break-all">{competitorModel}</span>
          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
          {isNoMatch ? (
            <span className="font-mono font-bold text-red-700 text-lg">無直接對應型號</span>
          ) : (
            <div className="flex items-center gap-1 flex-1 min-w-[220px]">
              <input
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                className={`font-mono font-bold text-lg text-[#005a9c] bg-blue-50/50 border rounded-lg px-3 py-1.5 flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] transition-all ${codeModified ? 'border-amber-300 bg-amber-50/50' : 'border-blue-100'}`}
                title="可直接修改訂購碼，確認後加入清單"
              />
              {codeModified && (
                <button onClick={() => setEditedCode(suggestedCode)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100" title={`還原為 AI 建議: ${suggestedCode}`}>
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <CopyButton text={editedCode} />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            {!isNoMatch && (
              <p className="text-slate-500 text-xs font-mono bg-slate-100 inline-block px-1.5 py-0.5 rounded">基礎系列: {rec.baseModel}</p>
            )}
            <p className="text-slate-700 text-sm mt-1.5 font-medium">{rec.description}</p>
            {codeModified && (
              <p className="text-amber-600 text-xs mt-1 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />訂購碼已手動修改 (AI 建議: <span className="font-mono ml-1">{suggestedCode}</span>)</p>
            )}
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              {rec.matchType && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${matchBadgeClass}`}>{rec.matchType}</span>
              )}
              {!isNoMatch && validation && (
                validation.catalogVerified ? (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md border bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1" title="系列與所有選項代碼皆通過型錄資料庫驗證">
                    <ShieldCheck className="w-3.5 h-3.5" /> 型錄已驗證
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md border bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1" title="部分內容與型錄不一致，請見警告">
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
          <div className="mb-3">
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 text-sm">
              <h4 className="text-xs font-bold text-orange-700 mb-1.5 flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-1" /> 型錄驗證警告
              </h4>
              <ul className="space-y-1">
                {validation.warnings.map((w, wIdx) => (
                  <li key={wIdx} className="text-xs text-orange-800 leading-relaxed flex items-start"><span className="mr-1.5">•</span>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {rec.reasoningForOrderingCode && (
          <details className="mb-3 group">
            <summary className="text-xs font-bold text-blue-700 cursor-pointer flex items-center hover:text-blue-800 select-none">
              <Lightbulb className="w-3.5 h-3.5 mr-1" /> 推導邏輯 <span className="ml-1 text-slate-400 group-open:hidden">(點擊展開)</span>
            </summary>
            <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/50 mt-2">
              <p className="text-slate-600 leading-relaxed text-xs whitespace-pre-line">{rec.reasoningForOrderingCode}</p>
            </div>
          </details>
        )}

        {!isNoMatch && rec.configurableOptions && rec.configurableOptions.length > 0 && (
          <details className="mb-3 group">
            <summary className="text-xs font-bold uppercase tracking-wider text-slate-500 cursor-pointer select-none hover:text-slate-700">
              細部規格選擇指示 ({rec.configurableOptions.length} 項) <span className="ml-1 text-slate-400 font-normal group-open:hidden">(點擊展開)</span>
            </summary>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {rec.configurableOptions.map((opt, oIdx) => (
                <div key={oIdx} className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-sm">
                  <div className="text-slate-500 text-xs mb-1 font-medium">{opt.parameter}</div>
                  <div className="font-semibold text-slate-800 mb-2 text-xs">{opt.options}</div>
                  <div className="bg-blue-50 text-[#005a9c] px-2.5 py-1.5 rounded-md text-xs border border-blue-100 inline-flex w-full items-start">
                    <span className="font-bold mr-1.5 shrink-0">推薦:</span>
                    <span className="font-medium text-blue-900">{opt.suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}

        {!isNoMatch && (
          <div className="flex justify-end pt-2 border-t border-slate-100">
            <button
              onClick={handleAdd}
              disabled={confirmed || !editedCode.trim()}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm ${
                confirmed
                  ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
                  : 'bg-[#005a9c] text-white hover:bg-[#004880]'
              }`}
            >
              {confirmed ? (<><Check className="w-4 h-4 mr-1.5" />已加入確認清單</>) : (<><ListPlus className="w-4 h-4 mr-1.5" />確認並加入清單</>)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** 完整比對結果視圖 (單筆與批量共用) */
export function MatchResult({ model, result, onAddToList, isConfirmed, compact = false }: {
  model: string;
  result: CrossReferenceResult;
  onAddToList: (item: Omit<ConfirmedItem, 'id' | 'confirmedAt'>) => void;
  isConfirmed: (competitorModel: string, code: string) => boolean;
  compact?: boolean;
}) {
  return (
    <div className="space-y-5">
      {/* 競品分析 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <div className="flex items-center flex-wrap gap-2 text-slate-500 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 border border-slate-200">競爭對手產品分析</span>
              {result.productType && (
                <span className="text-xs font-semibold bg-blue-50 px-2.5 py-1 rounded-md text-[#005a9c] border border-blue-100">{result.productType}</span>
              )}
            </div>
            <h3 className="text-xl font-bold font-mono text-slate-800 break-all">{model}</h3>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">識別廠牌</span>
            <p className="text-sm font-semibold text-slate-700 mt-0.5">{result.competitorBrand}</p>
          </div>
        </div>

        {result.candidateSeries && result.candidateSeries.length > 0 && (
          <div className="mb-4 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
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

        <div className={`grid grid-cols-1 ${compact ? '' : 'lg:grid-cols-2'} gap-4`}>
          {result.preAnalysis && (
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-100/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2.5 flex items-center">
                <Search className="w-3.5 h-3.5 mr-1" /> 對手型號精確拆解
              </h4>
              <ul className="space-y-1.5">
                {result.preAnalysis.competitorModelDisassembly.map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs text-amber-900 leading-relaxed font-mono">
                    <span className="text-amber-500 mr-2 shrink-0">›</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.preAnalysis && (
            <div className="bg-[#005a9c]/5 p-4 rounded-xl border border-[#005a9c]/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#005a9c] mb-2.5 flex items-center">
                <Lightbulb className="w-3.5 h-3.5 mr-1" /> 亞德客對應邏輯推演
              </h4>
              <ul className="space-y-1.5">
                {result.preAnalysis.airtacRuleMapping.map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-700 leading-relaxed font-medium">
                    <span className="text-[#005a9c] mr-2 shrink-0">›</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <details className="mt-4 group">
          <summary className="text-xs font-bold uppercase tracking-wider text-slate-400 cursor-pointer select-none hover:text-slate-600 flex items-center">
            <Info className="w-3.5 h-3.5 mr-1" />規格解析綜合結果 <span className="ml-1 font-normal group-open:hidden">(點擊展開)</span>
          </summary>
          <ul className="space-y-2 mt-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            {result.competitorSpecs.map((spec, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-2.5 flex-shrink-0"></span>
                <span className="text-sm text-slate-700 leading-relaxed font-medium">{spec}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>

      {/* 不確定事項 */}
      {result.uncertainties && result.uncertainties.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
          <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1.5" /> AI 無法確定、需人工核對的事項
          </h4>
          <ul className="space-y-1.5">
            {result.uncertainties.map((u, idx) => (
              <li key={idx} className="text-xs text-amber-900 leading-relaxed flex items-start"><span className="mr-1.5 mt-0.5">•</span>{u}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 推薦方案 */}
      <div className="bg-white rounded-2xl shadow-md border-t-4 border-t-[#005a9c] border-x border-b border-slate-200 overflow-hidden">
        <div className="bg-slate-50/80 px-5 py-4 border-b border-slate-100 flex items-center space-x-3">
          <div className="bg-[#005a9c]/10 p-2 rounded-lg text-[#005a9c]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">亞德客 (AirTAC) 推薦方案</h3>
            <p className="text-xs text-slate-500 mt-0.5">訂購碼可直接修改，確認無誤後按「確認並加入清單」</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {result.airtacRecommendations.map((rec, idx) => (
            <RecCard
              key={idx}
              rec={rec}
              competitorModel={model}
              competitorBrand={result.competitorBrand}
              onAddToList={onAddToList}
              isConfirmed={(code) => isConfirmed(model, code)}
            />
          ))}

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">專案匹配備註</h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">{result.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
