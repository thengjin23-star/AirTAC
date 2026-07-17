import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Upload, Loader2, Trash2, Save, X, FileDown, FileUp, Sparkles, Image as ImageIcon, AlertTriangle, Cloud, HardDrive } from 'lucide-react';
import { LearnedRule, loadLearnedRules, saveLearnedRules } from '../lib/learnedRules';
import { isCloudConfigured, loadItems, putItem, deleteItem } from '../lib/cloudStore';

/**
 * 對手知識庫：上傳競品型錄的「訂購碼說明頁」(圖片或文字)，
 * AI 解析出逐位解碼表後存起來；之後分析同系列型號會自動套用。
 */
export function KnowledgeBase() {
  const [rules, setRules] = useState<LearnedRule[]>(loadLearnedRules);
  const [cloudMode, setCloudMode] = useState(false);
  const [brand, setBrand] = useState('');
  const [seriesHint, setSeriesHint] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState<{ data: string; mimeType: string; name: string } | null>(null);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<LearnedRule, 'id' | 'createdAt'> | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const importRef = useRef<HTMLInputElement>(null);

  // 雲端優先載入知識庫規則 (未設定雲端則等同讀 localStorage)
  useEffect(() => {
    (async () => {
      const cloud = await isCloudConfigured();
      setCloudMode(cloud);
      const { items } = await loadItems<LearnedRule>('rules');
      if (items && items.length) { setRules(items); saveLearnedRules(items); }
    })();
  }, []);

  // 更新本機快取 (供 lib/api 的 matchLearnedRules 附帶規則使用)
  const persist = (next: LearnedRule[]) => {
    setRules(next);
    saveLearnedRules(next);
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('請上傳圖片檔 (PNG/JPG)。PDF 請先截圖訂購碼說明的那一頁。');
      return;
    }
    if (file.size > 3.5 * 1024 * 1024) {
      setError('圖片超過 3.5MB，請裁切到「型號表示方法」區域或壓縮後再上傳。');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const base64 = dataUrl.split(',')[1];
      setImage({ data: base64, mimeType: file.type, name: file.name });
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const parseCatalog = async () => {
    if (!text.trim() && !image) {
      setError('請先上傳型錄頁圖片，或貼上型錄的訂購碼說明文字。');
      return;
    }
    setParsing(true);
    setError(null);
    setDraft(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000);
      const resp = await fetch('/api/learn-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: brand.trim() || undefined,
          seriesHint: seriesHint.trim() || undefined,
          text: text.trim() || undefined,
          image: image ? { data: image.data, mimeType: image.mimeType } : undefined,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const body = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(body.error || `解析失敗 (${resp.status})`);
      setDraft({
        brand: body.brand || brand,
        seriesName: body.seriesName || '',
        pattern: body.pattern || '',
        productType: body.productType || '',
        decode: body.decode || '',
      });
    } catch (e: any) {
      setError(e.name === 'AbortError' ? '解析超時，請重試或縮小圖片範圍。' : (e.message || '解析失敗'));
    } finally {
      setParsing(false);
    }
  };

  const saveDraft = () => {
    if (!draft || !draft.decode.trim() || !draft.pattern.trim()) return;
    const rule: LearnedRule = {
      ...draft,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
    };
    persist([...rules, rule]);
    putItem('rules', rule); // 同步雲端 (全公司共用)
    setDraft(null);
    setText('');
    setImage(null);
    setSeriesHint('');
  };

  const exportRules = () => {
    const blob = new Blob([JSON.stringify(rules, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `airtac_knowledge_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importRules = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!Array.isArray(parsed)) throw new Error('格式不正確');
        const valid = parsed.filter((r: any) => r && r.decode && r.pattern);
        const existing = new Set(rules.map(r => r.id));
        const toAdd = valid.filter((r: any) => !existing.has(r.id));
        persist([...rules, ...toAdd]);
        toAdd.forEach((r: LearnedRule) => putItem('rules', r)); // 同步雲端
      } catch (e) {
        setError('匯入失敗：檔案不是有效的知識庫 JSON。');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* 新增規則 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-[#005a9c]/5">
          <div className="flex items-center space-x-3">
            <div className="bg-[#005a9c] p-2 rounded-lg text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">學習對手型錄</h2>
              <p className="text-slate-500 text-sm mt-0.5">上傳競品型錄的「型號表示方法」頁面，AI 解析出編碼規則並記住，之後分析同系列型號自動套用</p>
            </div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">品牌 (選填，幫助辨識)</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="例：SMC"
                className="w-full border border-slate-200 rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] bg-white text-slate-700 text-sm outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">系列名稱 (選填)</label>
              <input
                value={seriesHint}
                onChange={(e) => setSeriesHint(e.target.value)}
                placeholder="例：SY3000/5000/7000"
                className="w-full border border-slate-200 rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] bg-white text-slate-700 text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">方式一：上傳型錄頁圖片</label>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              {image ? (
                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                  <div className="flex items-center text-sm text-[#005a9c] min-w-0">
                    <ImageIcon className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">{image.name}</span>
                  </div>
                  <button onClick={() => setImage(null)} className="text-slate-400 hover:text-red-500 p-1 shrink-0"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-200 hover:border-[#005a9c]/50 rounded-xl py-6 text-sm text-slate-400 hover:text-[#005a9c] transition-colors flex flex-col items-center gap-1.5"
                >
                  <Upload className="w-5 h-5" />
                  點擊上傳「型號表示方法」頁截圖 (PNG/JPG，&lt;3.5MB)
                </button>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">方式二：貼上型錄文字</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="把型錄 PDF 裡訂購碼說明的文字複製貼上（兩種方式擇一即可）"
                rows={4}
                className="w-full border border-slate-200 rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] bg-white text-slate-700 text-sm outline-none transition-all resize-y"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-100 text-sm flex items-start">
              <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />{error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={parseCatalog}
              disabled={parsing || (!text.trim() && !image)}
              className="px-5 py-2.5 rounded-xl bg-[#005a9c] text-white font-medium hover:bg-[#004880] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors flex items-center shadow-sm"
            >
              {parsing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
              AI 解析編碼規則
            </button>
          </div>

          {/* 解析結果草稿 (可修改後儲存) */}
          {draft && (
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3 animate-in fade-in">
              <h3 className="text-sm font-bold text-emerald-800">解析完成，請檢查後儲存：</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">品牌</label>
                  <input value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white outline-none focus:border-[#005a9c]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">系列名稱</label>
                  <input value={draft.seriesName} onChange={(e) => setDraft({ ...draft, seriesName: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white outline-none focus:border-[#005a9c]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">適用型號字首 (逗號分隔)</label>
                  <input value={draft.pattern} onChange={(e) => setDraft({ ...draft, pattern: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white font-mono outline-none focus:border-[#005a9c]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">逐位解碼表 (可修改補充)</label>
                <textarea value={draft.decode} onChange={(e) => setDraft({ ...draft, decode: e.target.value })} rows={10}
                  className="w-full border border-slate-200 rounded-lg py-2 px-3 text-xs bg-white font-mono outline-none focus:border-[#005a9c] resize-y leading-relaxed" />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setDraft(null)} className="px-4 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-100 transition-colors flex items-center">
                  <X className="w-4 h-4 mr-1" /> 捨棄
                </button>
                <button onClick={saveDraft} disabled={!draft.decode.trim() || !draft.pattern.trim()}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 transition-colors flex items-center shadow-sm">
                  <Save className="w-4 h-4 mr-1.5" /> 儲存到知識庫
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 已儲存的規則 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">已學習的編碼規則 ({rules.length})</h2>
              <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1">
                分析型號時字首命中就會自動套用
                {cloudMode
                  ? <span className="inline-flex items-center gap-0.5 text-[#005a9c] font-medium"><Cloud className="w-3.5 h-3.5" />雲端共用</span>
                  : <span className="inline-flex items-center gap-0.5 text-slate-400"><HardDrive className="w-3.5 h-3.5" />本機儲存，可匯出備份</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input ref={importRef} type="file" accept=".json" className="hidden" onChange={(e) => e.target.files?.[0] && importRules(e.target.files[0])} />
            <button onClick={() => importRef.current?.click()} className="px-3.5 py-2 bg-white text-slate-600 border border-slate-200 hover:border-[#005a9c] hover:text-[#005a9c] rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
              <FileUp className="w-4 h-4 mr-1.5" /> 匯入
            </button>
            <button onClick={exportRules} disabled={rules.length === 0} className="px-3.5 py-2 bg-white text-slate-600 border border-slate-200 hover:border-[#005a9c] hover:text-[#005a9c] rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm disabled:opacity-50">
              <FileDown className="w-4 h-4 mr-1.5" /> 匯出備份
            </button>
          </div>
        </div>

        {rules.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">
            還沒有學習任何型錄。內建知識庫已涵蓋 SMC SY/CQ2/KQ2/AS/D- 等常用系列；遇到拆解不準的系列，把該系列型錄的訂購碼說明頁餵進來即可。
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {rules.map(rule => {
              const expanded = expandedId === rule.id;
              return (
                <li key={rule.id} className="px-5 py-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <button onClick={() => setExpandedId(expanded ? null : rule.id)} className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">{rule.brand}</span>
                        <span className="text-sm font-semibold text-slate-800">{rule.seriesName}</span>
                        <span className="text-xs text-slate-400">{rule.productType}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-mono">適用字首: {rule.pattern}</div>
                    </button>
                    <button onClick={() => { persist(rules.filter(r => r.id !== rule.id)); deleteItem('rules', rule.id); }} className="text-slate-300 hover:text-red-500 p-1.5 rounded hover:bg-red-50 transition-colors shrink-0" title="刪除此規則">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {expanded && (
                    <pre className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-600 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">{rule.decode}</pre>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
