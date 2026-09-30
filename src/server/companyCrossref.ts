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
    // 個位數範圍展開：4GA1~3 → 4GA1、4GA2、4GA3；其他範圍 (AC20~40) 只取起點，靠弱比對涵蓋
    .flatMap(t => {
      const r = t.trim().match(/^(.*?)(\d)~(\d)$/);
      if (!r) return [t.trim().split('~')[0]];
      const out: string[] = [];
      for (let d = Number(r[2]); d <= Number(r[3]); d++) out.push(`${r[1]}${d}`);
      return out;
    })
    .map(t => t.replace(/[^A-Za-z0-9*-]/g, '').toUpperCase())
    .filter(t => t.length >= 2);
}

const alphaPrefix = (t: string) => (t.match(/^[A-Z]+/)?.[0] || '');

/** 用輸入型號查公司對照表，回傳命中的列 (強比對優先)。 */
export function matchCompanyTable(input: string, brand?: string): CompanyMatch[] {
  const baseTokens = input
    .split(/[\s,，、;；+＋\n\/]+/)
    .map(t => t.trim().toUpperCase().replace(/[^A-Z0-9-]/g, ''))
    .filter(t => t.length >= 2);
  if (baseTokens.length === 0) return [];
  // SMC 附磁石 (自動開關) 型號在第 2 碼插入 D：CDJ2→CJ2、CDQ2→CQ2、CDM2→CM2、MDB1→MB1，
  // 公司表只寫不附磁的系列名，因此同時用去掉 D 的版本比對
  const inputTokens = [...baseTokens];
  for (const t of baseTokens) {
    if (/^CD[A-Z0-9]/.test(t)) inputTokens.push('C' + t.slice(2));
    if (/^MD[A-Z]\d?/.test(t)) inputTokens.push('M' + t.slice(2));
  }

  const strong: CompanyMatch[] = [];
  const weak: CompanyMatch[] = [];

  for (const entry of entries) {
    // 「自製接頭」是說明列 (亞德客自有接頭)，不是對照，當提示會誤導 AI
    if (/自製/.test(entry.airtac)) continue;
    for (const [entryBrand, cell] of Object.entries(entry.competitors)) {
      if (brand && entryBrand.toLowerCase() !== brand.toLowerCase()) continue;
      let weakHit: CompanyMatch | null = null;
      let strongHit = false;
      for (const rawToken of cellTokens(cell)) {
        // 表上常用 * 表示一整個家族 (如 SY5*00 = SY5000 系列)：取 * 之前的字首做強比對
        // 表上寫「VFS2000 / SYJ500」代表整個家族 (VFS2100、SYJ5120…)，把尾端的 000/00 當成萬用
        const family = !rawToken.includes('*') && /[A-Z]\d0{2,}$/.test(rawToken) ? rawToken.replace(/(\d)0{2,}$/, '$1') : '';
        const wildcard = rawToken.includes('*') || Boolean(family);
        const token = family || (rawToken.includes('*') ? rawToken.split('*')[0] : rawToken);
        if (token.length < 2 || (wildcard && token.length < 3)) continue;
        // 只有 2 碼的代號 (如 Norgren「MC」) 必須後接數字才算，否則會吃掉所有 MC 開頭的 Mindman 型號
        const hitStrong = inputTokens.some(it => it.startsWith(token) && (token.length > 2 || /\d/.test(it.charAt(2))));
        if (hitStrong) {
          strong.push({ entry, brand: entryBrand, matchedModel: token, strong: true });
          strongHit = true;
          break;
        }
        // 弱比對: 只比英文字首 (如表上寫 AC20~40，輸入 AC30-03)；先記下，整格都沒有強比對才採用
        const ap = alphaPrefix(token);
        if (!weakHit && !wildcard && ap.length >= 2 && inputTokens.some(it => it.startsWith(ap) && /\d/.test(it.charAt(ap.length)))) {
          weakHit = { entry, brand: entryBrand, matchedModel: token, strong: false };
        }
      }
      if (!strongHit && weakHit) weak.push(weakHit);
    }
  }

  // 有明顯更精準的強比對時 (比對到的代號長 ≥4)，捨棄只靠很短代號命中的列 (多半是別家品牌的巧合)
  const best = Math.max(0, ...strong.map(m => m.matchedModel.length));
  const strongKept = best >= 4 ? strong.filter(m => m.matchedModel.length >= best - 1) : strong;
  // 同一列只留一次，強比對優先 (有強比對時不再附上弱比對)
  const seen = new Set<CompanyEntry>();
  const out: CompanyMatch[] = [];
  for (const m of strongKept.length > 0 ? strongKept : weak) {
    if (!seen.has(m.entry)) {
      seen.add(m.entry);
      out.push(m);
    }
  }
  return out.slice(0, 8);
}

// 預先建立「系列變體選項代碼 → 系列 id」索引 (整併後 MAC/TCM/TWM 等變體已成為
// series 下拉選項，不再是獨立 id，需靠此索引才能把公司表的變體代碼對回系列)。
const variantCodeToId = new Map<string, string>();
for (const s of defaultCatalog) {
  const seriesCat = (s.categories || []).find(c => c.id === 'series' || c.id === 'type' || c.id === 'spec');
  for (const opt of seriesCat?.options || []) {
    const c = (opt.code || '').toUpperCase().replace(/[^A-Z0-9-]/g, '');
    if (c.length >= 2 && !variantCodeToId.has(c)) variantCodeToId.set(c, s.id);
  }
}

/**
 * 公司表的 AirTAC 名稱與型錄系列 id 不一致的對應 (字首比對，長的優先)。
 * 沒有這張表時，公司表的 7V100 (SY5000 的對應)、TCM、2S… 等 53 列都對不到型錄，
 * 正確系列就進不了 AI 的候選清單。
 */
const COMPANY_ALIASES: [string, string[]][] = ([
  ['7MV', ['7SV', '7sv_base']], ['7MA', ['7sa']], ['7V', ['7SV']], ['7A', ['7sa']],
  ['TCM', ['tcl']], ['TCL', ['tcl']],
  ['SI', ['se', 'sai']], ['SU', ['sai', 'se']], ['ACP', ['acq']], ['ACQS', ['acq']], ['SDAS', ['sda']], ['MAL', ['mbl']],
  ['2KS', ['2KSA']], ['2KW', ['2KWA']], ['2KL', ['2KLA']], ['2S', ['2SA']], ['2W', ['2WA']], ['2L', ['2LA']],
  ['2V', ['2V']], ['2P', ['2P']],
  ['BFR', ['AFR-BFR']], ['BFC', ['AFC-BFC']], ['BC', ['AC-BC']], ['BF', ['AF-BF']], ['BR', ['AR-BR']], ['BL', ['AL-BL']],
  ['3FM', ['3f-3fm']], ['3F', ['3f-3fm']], ['GS', ['F-G-Gauge']], ['油壓緩衝器', ['ACA', 'ACJ', 'ACJ-L']],
] as [string, string[]][]).sort((a, b) => b[0].length - a[0].length);

/** 把命中的 AirTAC 系列字串 (如 "SE"、"GFR200~600"、"3V2M"、"MAC") 對回型錄系列 id。 */
export function companyMatchCatalogIds(matches: CompanyMatch[]): string[] {
  const ids: string[] = [];
  const add = (id: string) => { if (!ids.includes(id)) ids.push(id); };
  for (const m of matches) {
    const whole = m.entry.airtac.trim();
    const aliasWhole = COMPANY_ALIASES.find(([k]) => whole === k);
    if (aliasWhole) aliasWhole[1].forEach(add);
    for (const raw of m.entry.airtac.split(/[\/,，、\s]+/)) {
      const token = raw.trim().split('~')[0].toUpperCase().replace(/[^A-Z0-9-]/g, '');
      if (token.length < 2) continue;
      const alias = COMPANY_ALIASES.find(([k]) => token.startsWith(k));
      if (alias) { alias[1].forEach(add); continue; }
      const ap = alphaPrefix(token);
      // 先比對系列變體選項 (整併後的 MAC/TCM/TWM 等)
      if (variantCodeToId.has(token)) add(variantCodeToId.get(token)!);
      else if (ap.length >= 2 && variantCodeToId.has(ap)) add(variantCodeToId.get(ap)!);
      for (const s of defaultCatalog) {
        const code = (s.code || '').toUpperCase().replace(/\s+/g, '');
        const id = s.id.toUpperCase();
        if (code === token || id === token || (ap.length >= 2 && (code === ap || id === ap))) {
          add(s.id);
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
