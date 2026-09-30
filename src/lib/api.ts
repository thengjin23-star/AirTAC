import type { CrossReferenceResult } from '../types';
import { matchLearnedRules, saveLearnedRules } from './learnedRules';
import { apiFetch } from './http';
import { loadItems } from './cloudStore';

/**
 * 同事在「對手知識庫」上傳的型錄解碼表存在雲端；分析時是從本機快取挑規則，
 * 所以要先把雲端最新版同步下來 (否則沒打開過知識庫分頁的人永遠用不到同事的型錄)。
 * 最多每 2 分鐘同步一次，失敗就沿用本機快取。
 */
let lastRulesSync = 0;
let rulesSyncing: Promise<void> | null = null;
async function syncLearnedRules(): Promise<void> {
  if (Date.now() - lastRulesSync < 120_000) return;
  if (!rulesSyncing) {
    rulesSyncing = (async () => {
      try {
        const { items, cloud } = await loadItems<any>('rules');
        if (cloud) saveLearnedRules(items);
        lastRulesSync = Date.now();
      } catch (e) { /* 沿用本機快取 */ }
      finally { rulesSyncing = null; }
    })();
  }
  return rulesSyncing;
}

/** 呼叫後端交叉比對 API (單筆)。批量分析由前端逐筆排隊呼叫本函式。 */
export async function analyzeModel(
  competitorModel: string,
  brand?: string,
  customRules?: string,
  options: { forceAI?: boolean; timeoutMs?: number } = {},
): Promise<CrossReferenceResult> {
  const timeoutMs = options.timeoutMs ?? 150000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  await syncLearnedRules();

  // 自動帶上使用者知識庫中字首命中的型錄解碼表
  const learnedRules = matchLearnedRules(competitorModel).map(r => ({
    brand: r.brand,
    seriesName: r.seriesName,
    decode: r.decode,
  }));

  try {
    const response = await apiFetch('/api/cross-reference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        competitorModel,
        brand: brand && brand !== 'auto' ? brand : undefined,
        customRules: customRules?.trim() || undefined,
        learnedRules: learnedRules.length > 0 ? learnedRules : undefined,
        forceAI: options.forceAI || undefined,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      let errorMessage = '無法取得型號對應資料';
      const text = await response.text().catch(() => '');
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        if (text.toLowerCase().includes('<!doctype') || text.toLowerCase().includes('<html')) {
          errorMessage = `伺服器回應異常 (${response.status})：系統可能正在重啟或部署中，請稍後再試。`;
        } else if (text) {
          errorMessage = `伺服器錯誤 (${response.status}): ${text.substring(0, 100)}`;
        }
      }
      throw new Error(errorMessage);
    }

    const rawText = await response.text();
    try {
      return JSON.parse(rawText) as CrossReferenceResult;
    } catch (parseError) {
      if (rawText.toLowerCase().includes('<!doctype') || rawText.toLowerCase().includes('<html')) {
        throw new Error('伺服器回應格式錯誤 (收到 HTML 而非 API 數據)，系統可能在更新中。');
      }
      throw new Error('無法解析伺服器回傳的資料格式。');
    }
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('請求超時，請檢查網路連線或稍後再試。');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
