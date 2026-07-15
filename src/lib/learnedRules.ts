/**
 * 使用者知識庫：由「學習對手型錄」功能產生的逐位解碼表。
 * 存在 localStorage，分析型號時若字首命中 pattern 就自動帶給後端。
 */

export interface LearnedRule {
  id: string;
  brand: string;
  seriesName: string;
  /** 適用型號字首，逗號分隔大寫 (如 "SY3,SY5,SY7") */
  pattern: string;
  productType: string;
  decode: string;
  createdAt: number;
}

const KEY = 'airtac_learned_rules_v1';

export function loadLearnedRules(): LearnedRule[] {
  try {
    const raw = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem(KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load learned rules', e);
  }
  return [];
}

export function saveLearnedRules(rules: LearnedRule[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(rules));
  } catch (e) {
    console.warn('Failed to save learned rules', e);
  }
}

/** 用輸入的型號找出適用的知識庫規則 (字首比對)。 */
export function matchLearnedRules(input: string, rules?: LearnedRule[]): LearnedRule[] {
  const list = rules || loadLearnedRules();
  if (list.length === 0) return [];
  const tokens = input
    .split(/[\s,，、;；+＋\n\/]+/)
    .map(t => t.trim().toUpperCase())
    .filter(t => t.length >= 2);
  return list.filter(rule =>
    (rule.pattern || '')
      .split(/[,，\s]+/)
      .map(p => p.trim().toUpperCase())
      .filter(p => p.length >= 2)
      .some(prefix => tokens.some(t => t.startsWith(prefix)))
  ).slice(0, 5);
}
