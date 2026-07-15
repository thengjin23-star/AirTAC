/**
 * 公司內部「競品對照表」查詢模組。
 *
 * 資料來源: src/data/company-crossref.json (由 scripts/convert-company-xls.mjs
 * 從公司提供的 Excel 轉出，共 226 筆、12+ 個品牌)。
 * 比對時以競品型號字首查表，命中的列會:
 * 1. 作為權威提示注入 AI prompt (公司表優先於一般業界知識)
 * 2. 對應的 AirTAC 系列加入候選清單
 */
import companyTable from '../data/company-crossref.json';
import { defaultCatalog } from '../data/index';

export interface CompanyEntry {
  sheet: string;
  section: string;
  airtac: string;
  note: string;
  sensor: string;
  competitors: Record<string, string>;
}

export interface CompanyMatch {
  entry: CompanyEntry;
  brand: string;
  matchedModel: string;
  strong: boolean;
}

const entries = companyTable as CompanyEntry[];

/** 把儲存格內容拆成可比對的型號 token: "DNC/DNCB/DNG" → 3個, "AC20~40" → "AC20" */
function cellTokens(cell: string): string[] {
  return cell
    .split(/[\/,，、\s]+/)
    .map(t => t.trim().split('~')[0])
    .map(t => t.replace(/[^A-Za-z0-9-]/g, '').toUpperCase())
    .filter(t => t.length >= 2);
}

const alphaPrefix = (t: string) => (t.match(/^[A-Z]+/)?.[0] || '');

/** 用輸入型號查公司對照表，回傳命中的列 (強比對優先)。 */
export function matchCompanyTable(input: string, brand?: string): CompanyMatch[] {
  const inputTokens = input
    .split(/[\s,，、;；+＋\n\/]+/)
    .map(t => t.trim().toUpperCase().replace(/[^A-Z0-9-]/g, ''))
    .filter(t => t.length >= 2);
  if (inputTokens.length === 0) return [];

  const strong: CompanyMatch[] = [];
  const weak: CompanyMatch[] = [];

  for (const entry of entries) {
    for (const [entryBrand, cell] of Object.entries(entry.competitors)) {
      if (brand && entryBrand.toLowerCase() !== brand.toLowerCase()) continue;
      for (const token of cellTokens(cell)) {
        const hitStrong = inputTokens.some(it => it.startsWith(token));
        if (hitStrong) {
          strong.push({ entry, brand: entryBrand, matchedModel: token, strong: true });
          break;
        }
        // 弱比對: 只比英文字首 (如表上寫 AC20~40，輸入 AC30-03)
        const ap = alphaPrefix(token);
        if (ap.length >= 2 && inputTokens.some(it => it.startsWith(ap) && /\d/.test(it.charAt(ap.length)))) {
          weak.push({ entry, brand: entryBrand, matchedModel: token, strong: false });
          break;
        }
      }
    }
  }

  // 同一列只留一次，強比對優先
  const seen = new Set<CompanyEntry>();
  const out: CompanyMatch[] = [];
  for (const m of [...strong, ...weak]) {
    if (!seen.has(m.entry)) {
      seen.add(m.entry);
      out.push(m);
    }
  }
  return out.slice(0, 8);
}

/** 把命中的 AirTAC 系列字串 (如 "SE"、"GFR200~600"、"3V2M") 對回型錄系列 id。 */
export function companyMatchCatalogIds(matches: CompanyMatch[]): string[] {
  const ids: string[] = [];
  for (const m of matches) {
    for (const raw of m.entry.airtac.split(/[\/,，、\s]+/)) {
      const token = raw.trim().split('~')[0].toUpperCase().replace(/[^A-Z0-9-]/g, '');
      if (token.length < 2) continue;
      const ap = alphaPrefix(token);
      for (const s of defaultCatalog) {
        const code = (s.code || '').toUpperCase().replace(/\s+/g, '');
        const id = s.id.toUpperCase();
        if (code === token || id === token || (ap.length >= 2 && (code === ap || id === ap))) {
          if (!ids.includes(s.id)) ids.push(s.id);
        }
      }
    }
  }
  return ids;
}

/** 命中列轉成 prompt 提示文字。 */
export function companyMatchesText(matches: CompanyMatch[]): string {
  if (matches.length === 0) return '';
  return matches
    .map(m => {
      const comps = Object.entries(m.entry.competitors).map(([b, v]) => `${b}: ${v}`).join(' | ');
      const extra = [m.entry.note && `備註: ${m.entry.note}`, m.entry.sensor && `搭配感測器: ${m.entry.sensor}`]
        .filter(Boolean).join('；');
      return `- [公司對照表/${m.entry.sheet}/${m.entry.section}] ${comps} → AirTAC「${m.entry.airtac}」${extra ? `（${extra}）` : ''}`;
    })
    .join('\n');
}
