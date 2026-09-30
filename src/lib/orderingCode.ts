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

/**
 * 「自由數值」類別：型錄只放一個示意值 (如無桿缸行程「200=行程數值」)，實際可填任意數字。
 * 驗證時不該把其他數值當成「非標準」，下拉選單也應直接開放輸入。
 */
export function isFreeValueCategory(cat: { options?: { description?: string }[] }): boolean {
  const opts = cat.options || [];
  return opts.length > 0 && opts.length <= 2 && opts.some(o => /數值/.test(o.description || ''));
}
