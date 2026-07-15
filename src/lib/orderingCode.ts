import type { CatalogSeries } from '../data/types';

/** 依型錄 format 模板 + 各參數選擇組合出訂購碼 (前後端共用同一套邏輯)。 */
export function generateOrderingCode(series: CatalogSeries, selections: Record<string, string>): string {
  let code = series.format || series.orderCodeFormat || '';
  const hasCodeCategory = (series.categories || []).some(c => c.id === 'code');
  if (!hasCodeCategory) {
    code = code.replace('{code}', series.code !== undefined ? series.code : (series.id || ''));
  }
  for (const cat of series.categories || []) {
    const val = selections[cat.id];
    code = code.replace(`{${cat.id}}`, val !== undefined ? val : (cat.options?.[0]?.code || ''));
  }
  code = code
    .replace(/\s+/g, ' ')
    .replace(/-\s*-/g, '-')
    .replace(/\s+-/g, '-')
    .replace(/-\s+/g, '-')
    .trim();
  if (code.endsWith('-')) code = code.slice(0, -1);
  return code;
}
