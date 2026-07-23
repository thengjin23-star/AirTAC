import React, { useEffect, useState } from 'react';
import { Cloud, CloudOff, Loader2, RefreshCw, ChevronDown, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { cloudSelfTest, resetCloudProbe } from '../lib/cloudStore';

type State =
  | { kind: 'checking' }
  | { kind: 'healthy'; backend: string }
  | { kind: 'local' }                         // 未設定雲端 → 各自 localStorage
  | { kind: 'broken'; error?: string };       // 已設定但讀寫失敗

/**
 * 團隊雲端狀態橫幅。
 * 之前雲端沒設定時 app 會「靜默」退回本機 localStorage，導致同事各自存、彼此看不到。
 * 這個橫幅把狀態攤開講清楚，並在本機模式時給出啟用步驟。
 */
export function CloudStatusBanner({ onStatus }: { onStatus?: (cloud: boolean) => void }) {
  const [state, setState] = useState<State>({ kind: 'checking' });
  const [showSteps, setShowSteps] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const run = async () => {
    setState({ kind: 'checking' });
    resetCloudProbe();
    const r = await cloudSelfTest();
    if (!r.configured) setState({ kind: 'local' });
    else if (r.ok) setState({ kind: 'healthy', backend: r.backend });
    else setState({ kind: 'broken', error: r.error });
    onStatus?.(r.configured && r.ok);
  };

  useEffect(() => { run(); /* eslint-disable-next-line */ }, []);

  if (state.kind === 'checking') {
    return (
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-400 bg-white border border-slate-200 rounded-xl px-4 py-2.5">
        <Loader2 className="w-4 h-4 animate-spin" /> 檢查團隊雲端連線中…
      </div>
    );
  }

  if (state.kind === 'healthy') {
    if (dismissed) return null;
    return (
      <div className="mb-6 flex items-center justify-between gap-2 text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-2.5">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> 團隊雲端共用運作正常，確認清單與對手知識庫全公司同步。
        </span>
        <button onClick={() => setDismissed(true)} className="text-emerald-400 hover:text-emerald-600 p-1" title="收起">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // local 或 broken → 醒目卡片
  const broken = state.kind === 'broken';
  return (
    <div className={`mb-6 rounded-xl border overflow-hidden ${broken ? 'border-red-200 bg-red-50/60' : 'border-amber-200 bg-amber-50/70'}`}>
      <div className="px-4 py-3 flex items-start gap-3">
        <div className={`mt-0.5 shrink-0 ${broken ? 'text-red-500' : 'text-amber-500'}`}>
          {broken ? <AlertTriangle className="w-5 h-5" /> : <CloudOff className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-bold ${broken ? 'text-red-800' : 'text-amber-800'}`}>
            {broken ? '雲端已設定，但連線測試失敗' : '目前為「本機模式」，資料不會與同事共用'}
          </h3>
          <p className={`text-xs mt-1 leading-relaxed ${broken ? 'text-red-700' : 'text-amber-800'}`}>
            {broken ? (
              <>後端無法正常讀寫，確認清單／知識庫可能存不進雲端。錯誤：<span className="font-mono">{state.error || '未知'}</span>。請檢查 Vercel 的 Upstash/KV 環境變數與 Token 是否有效。</>
            ) : (
              <>你和同事現在各自把「確認清單、對手知識庫、自我學習」存在<b>自己的瀏覽器</b>裡，
              彼此看不到、換裝置也不會同步。要全公司共用，需在 Vercel 掛上一個免費的 Upstash Redis 資料庫（一次性設定）。</>
            )}
          </p>

          <div className="flex items-center gap-3 mt-2.5">
            <button
              onClick={run}
              className={`text-xs font-medium inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-colors ${broken ? 'border-red-200 text-red-700 hover:bg-red-100' : 'border-amber-300 text-amber-800 hover:bg-amber-100'}`}
            >
              <RefreshCw className="w-3.5 h-3.5" /> 重新檢查
            </button>
            <button
              onClick={() => setShowSteps(s => !s)}
              className={`text-xs font-medium inline-flex items-center gap-1 ${broken ? 'text-red-600 hover:text-red-800' : 'text-amber-700 hover:text-amber-900'}`}
            >
              如何啟用團隊共用 <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSteps ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showSteps && (
            <ol className="mt-3 space-y-1.5 text-xs text-slate-700 bg-white/70 border border-slate-200 rounded-lg p-3 list-decimal list-inside leading-relaxed">
              <li>到 <b>Vercel</b> 打開這個專案 → 上方 <b>Storage</b> 分頁。</li>
              <li>點 <b>Create Database</b> → 選 <b>Upstash for Redis</b>（有免費方案）→ 建立並 <b>Connect</b> 到本專案。</li>
              <li>Vercel 會自動注入 <span className="font-mono bg-slate-100 px-1 rounded">KV_REST_API_URL</span> 與 <span className="font-mono bg-slate-100 px-1 rounded">KV_REST_API_TOKEN</span>，不用手動填。</li>
              <li>到 <b>Deployments</b> → 對最新一版按 <b>Redeploy</b>（讓新環境變數生效）。</li>
              <li>重新整理本頁，這個橫幅會變成綠色「運作正常」，之後所有人共用同一份資料。</li>
            </ol>
          )}
          <p className="text-[11px] text-slate-400 mt-2">
            提示：在雲端啟用前，重要的確認清單請先用「匯出 Excel」、知識庫用「匯出備份」保存，設定完成後再匯入即可。
          </p>
        </div>
      </div>
    </div>
  );
}
