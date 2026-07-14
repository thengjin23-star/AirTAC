import type { CrossReferenceResult } from '../types';

/** 呼叫後端交叉比對 API (單筆)。批量分析由前端逐筆排隊呼叫本函式。 */
export async function analyzeModel(
  competitorModel: string,
  brand?: string,
  customRules?: string,
  timeoutMs = 150000,
): Promise<CrossReferenceResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('/api/cross-reference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        competitorModel,
        brand: brand && brand !== 'auto' ? brand : undefined,
        customRules: customRules?.trim() || undefined,
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
