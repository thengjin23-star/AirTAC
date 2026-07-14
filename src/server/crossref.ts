/**
 * 兩階段 AI 匹配引擎的伺服器端輔助模組。
 *
 * 第一階段(候選篩選)只送出壓縮版型錄索引 + 競品對照知識庫，
 * 讓模型挑出最相關的候選系列；第二階段才送出候選系列的完整
 * 型錄資料進行精確匹配。最後由伺服器對 AI 回傳的訂購碼做
 * 型錄逐項驗證，防止幻覺型號流出。
 */
import { defaultCatalog } from '../data/index';
import type { CatalogSeries } from '../data/types';

// ---------------------------------------------------------------------------
// 型錄索引
// ---------------------------------------------------------------------------

export interface CatalogIndexEntry {
  id: string;
  code?: string;
  name: string;
  category: string;
  superGroup: string;
  group: string;
  format?: string;
  parameters: string[];
}

const seriesById = new Map<string, CatalogSeries>();
for (const s of defaultCatalog) {
  if (s && s.id) seriesById.set(s.id, s);
}

/** 壓縮版索引：所有系列的 id/名稱/分類/格式，約十幾 KB，用於第一階段。 */
export function buildCatalogIndex(): CatalogIndexEntry[] {
  return defaultCatalog.map(s => ({
    id: s.id,
    code: s.code || undefined,
    name: s.name,
    category: s.category,
    superGroup: s.superGroup,
    group: s.group,
    format: s.format || s.orderCodeFormat || undefined,
    parameters: (s.categories || []).map(c => c.name),
  }));
}

/** 取得候選系列的完整型錄資料(選項已展開)。 */
export function getSeriesDetails(ids: string[]): CatalogSeries[] {
  const seen = new Set<string>();
  const out: CatalogSeries[] = [];
  for (const id of ids) {
    const s = seriesById.get(id);
    if (s && !seen.has(s.id)) {
      seen.add(s.id);
      out.push(s);
    }
  }
  return out;
}

export function isValidSeriesId(id: string): boolean {
  return seriesById.has(id);
}

// ---------------------------------------------------------------------------
// 競品 → AirTAC 對照知識庫
// ---------------------------------------------------------------------------

export interface KnowledgeEntry {
  brand: string;
  /** 競品型號的字首/樣式 (不含大小寫)。 */
  pattern: RegExp;
  competitorSeries: string;
  airtacSeriesIds: string[];
  note: string;
}

/**
 * 業界常見交叉對照規則。airtacSeriesIds 一律使用型錄 JSON 內的系列 id。
 * 這份表同時用於：(1) 啟發式預選候選系列 (2) 注入 prompt 作為匹配提示。
 */
export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // --- SMC 氣缸 ---
  { brand: 'SMC', pattern: /^C?D?Q2/i, competitorSeries: 'CQ2/CDQ2 薄型氣缸', airtacSeriesIds: ['acq', 'sda', 'acqd', 'acqj'], note: 'SMC CQ2 薄型氣缸對應 AirTAC ACQ (優先) 或 SDA 系列，缸徑行程直接沿用。' },
  { brand: 'SMC', pattern: /^C?D?QS/i, competitorSeries: 'CQS 小型薄型氣缸', airtacSeriesIds: ['acq', 'sda', 'ace'], note: 'SMC CQS 小缸徑薄型氣缸對應 AirTAC ACQ 小缸徑或 ACE 緊湊型。' },
  { brand: 'SMC', pattern: /^C?D?J2/i, competitorSeries: 'CJ2 針型氣缸(ISO6432)', airtacSeriesIds: ['mi', 'ma', 'mf'], note: 'SMC CJ2 迷你氣缸對應 AirTAC MI (不銹鋼迷你缸) 或 MA 系列。' },
  { brand: 'SMC', pattern: /^C?D?M2/i, competitorSeries: 'CM2 圓形氣缸', airtacSeriesIds: ['ma', 'mi', 'mbl'], note: 'SMC CM2 圓形氣缸(20~40mm)對應 AirTAC MA/MI 不銹鋼迷你缸。' },
  { brand: 'SMC', pattern: /^MB\d?/i, competitorSeries: 'MB 標準氣缸(ISO15552)', airtacSeriesIds: ['se', 'sai', 'sc'], note: 'SMC MB 標準氣缸對應 AirTAC SE 或 SAI (ISO15552) 系列。' },
  { brand: 'SMC', pattern: /^C?D?A2/i, competitorSeries: 'CA2 標準氣缸', airtacSeriesIds: ['sc', 'se', 'sau'], note: 'SMC CA2 拉桿式標準氣缸對應 AirTAC SC 系列。' },
  { brand: 'SMC', pattern: /^MGP/i, competitorSeries: 'MGP 帶導桿薄型氣缸', airtacSeriesIds: ['tcl', 'tcm', 'tclj', 'tcmj'], note: 'SMC MGP 三軸帶導桿氣缸對應 AirTAC TCL (直線軸承) / TCM (銅套軸承)。MGPL→TCL、MGPM→TCM。' },
  { brand: 'SMC', pattern: /^CXS/i, competitorSeries: 'CXS 雙聯氣缸', airtacSeriesIds: ['tn', 'tr'], note: 'SMC CXS 雙聯氣缸對應 AirTAC TN 雙軸氣缸。' },
  { brand: 'SMC', pattern: /^MXQ/i, competitorSeries: 'MXQ 氣動滑台', airtacSeriesIds: ['hlq', 'hlql', 'hls'], note: 'SMC MXQ 精密滑台對應 AirTAC HLQ (循環滾珠) 系列。' },
  { brand: 'SMC', pattern: /^MXS/i, competitorSeries: 'MXS 氣動滑台', airtacSeriesIds: ['hls', 'hlsl', 'hlq'], note: 'SMC MXS 精密滑台對應 AirTAC HLS (滾柱型) 系列。' },
  { brand: 'SMC', pattern: /^MHZ2?/i, competitorSeries: 'MHZ2 平行開閉氣爪', airtacSeriesIds: ['hfz', 'hfk', 'hfsz', 'hftz'], note: 'SMC MHZ2 平行氣爪對應 AirTAC HFZ (滾珠導軌平行氣爪)，MHZL2 長行程對應 HFKL。' },
  { brand: 'SMC', pattern: /^MHY2?/i, competitorSeries: 'MHY2 180°開閉氣爪', airtacSeriesIds: ['hfr'], note: 'SMC MHY2 180°開閉氣爪對應 AirTAC HFR 系列。' },
  { brand: 'SMC', pattern: /^MHC2?/i, competitorSeries: 'MHC2 支點開閉氣爪', airtacSeriesIds: ['hfy', 'hfty'], note: 'SMC MHC2 支點開閉(Y型)氣爪對應 AirTAC HFY 系列。' },
  { brand: 'SMC', pattern: /^MHS/i, competitorSeries: 'MHS 多爪氣爪', airtacSeriesIds: ['hfp', 'hfc'], note: 'SMC MHS 氣爪可比對 AirTAC HFP/HFC 平行開閉型氣爪。' },
  { brand: 'SMC', pattern: /^CRB|^MSQ|^CRQ/i, competitorSeries: 'CRB/MSQ 擺動氣缸', airtacSeriesIds: ['hrq', 'hrs'], note: 'SMC 擺動氣缸(葉片式CRB、齒條式MSQ)對應 AirTAC HRQ 回轉氣缸(齒條齒輪式)。' },
  { brand: 'SMC', pattern: /^MK\d?/i, competitorSeries: 'MK 回轉夾緊氣缸', airtacSeriesIds: ['ack', 'ackd', 'qck', 'qdk'], note: 'SMC MK 回轉夾緊氣缸對應 AirTAC ACK 轉角缸或 QCK 系列。' },
  { brand: 'SMC', pattern: /^RS[QDH]/i, competitorSeries: 'RSQ/RSD 阻擋氣缸', airtacSeriesIds: ['twq', 'twg', 'twh', 'twm'], note: 'SMC RSQ 阻擋氣缸對應 AirTAC TWQ/TWH 系列。' },
  { brand: 'SMC', pattern: /^MY\d|^CY\d/i, competitorSeries: 'MY/CY 無桿氣缸', airtacSeriesIds: ['rmt', 'rmtl', 'rms', 'rmh'], note: 'SMC 機械/磁耦式無桿氣缸對應 AirTAC RMT (導桿型) / RMS (基本型) / RMH (滑軌型)。' },
  { brand: 'SMC', pattern: /^CU\b|^CU\d/i, competitorSeries: 'CU 自由安裝氣缸', airtacSeriesIds: ['mu', 'msu', 'md'], note: 'SMC CU 自由安裝氣缸對應 AirTAC MU 系列。' },
  // --- SMC 閥類 ---
  { brand: 'SMC', pattern: /^SY[3579]/i, competitorSeries: 'SY3000/5000/7000 電磁閥', airtacSeriesIds: ['7SV', '6SV', '4V100', '4V200', '4V300'], note: 'SMC SY 系列五口電磁閥：SY3000→AirTAC 7SV/4V100、SY5000→6SV/4V200、SY7000→4V300。' },
  { brand: 'SMC', pattern: /^VF[35]|^VZ[35]/i, competitorSeries: 'VF/VZ 電磁閥', airtacSeriesIds: ['4V100', '4V200', '4V300'], note: 'SMC VF/VZ 五口電磁閥對應 AirTAC 4V 系列，依口徑選 100/200/300。' },
  { brand: 'SMC', pattern: /^VQ[Zz]?/i, competitorSeries: 'VQ 直動電磁閥', airtacSeriesIds: ['4V100', 'CPV10', 'CPV15', '7SV'], note: 'SMC VQ 小型電磁閥依尺寸對應 AirTAC CPV10/CPV15 微型閥或 4V100。' },
  { brand: 'SMC', pattern: /^VT3|^VT0|^V100/i, competitorSeries: 'VT 三口電磁閥', airtacSeriesIds: ['3V1', '3V2', '3V100'], note: 'SMC VT307 等三口二位閥對應 AirTAC 3V1/3V2 直動閥或 3V100。' },
  { brand: 'SMC', pattern: /^VX2?\d/i, competitorSeries: 'VX 流體電磁閥', airtacSeriesIds: ['fluid-2v', 'fluid-2p', 'fluid-direct-nc', 'fluid-direct-no'], note: 'SMC VX 二口流體閥對應 AirTAC 2V (氣體) / 2P (塑膠) / 2SA·2WA (水氣油) 系列。' },
  { brand: 'SMC', pattern: /^VXZ|^VXD/i, competitorSeries: 'VXZ/VXD 先導流體閥', airtacSeriesIds: ['fluid-pilot-nc', 'fluid-pilot-no', 'fluid-2j'], note: 'SMC 先導式流體閥對應 AirTAC 2SA/2WA 先導型或 2J 角座閥。' },
  // --- SMC 氣源處理/輔助 ---
  { brand: 'SMC', pattern: /^AC\d{2}/i, competitorSeries: 'AC FRL組合', airtacSeriesIds: ['GC', 'GAC', 'GFC', 'GAFC', 'AC-BC'], note: 'SMC AC 系列三聯件/二聯件對應 AirTAC GC (三聯) / GFC (二聯) 系列，口徑對齊。' },
  { brand: 'SMC', pattern: /^AW\d{2}/i, competitorSeries: 'AW 調壓過濾器', airtacSeriesIds: ['GFR', 'GAFR', 'AFR-BFR'], note: 'SMC AW 調壓過濾器(濾壓一體)對應 AirTAC GFR 系列。' },
  { brand: 'SMC', pattern: /^AF\d{2}/i, competitorSeries: 'AF 過濾器', airtacSeriesIds: ['GF', 'GAF', 'AF-BF'], note: 'SMC AF 空氣過濾器對應 AirTAC GF 系列。' },
  { brand: 'SMC', pattern: /^AR\d{2}/i, competitorSeries: 'AR 調壓閥', airtacSeriesIds: ['GR', 'GAR', 'AR-BR'], note: 'SMC AR 調壓閥對應 AirTAC GR 系列。' },
  { brand: 'SMC', pattern: /^AL\d{2}/i, competitorSeries: 'AL 給油器', airtacSeriesIds: ['GL', 'GAL', 'AL-BL'], note: 'SMC AL 給油器(油霧器)對應 AirTAC GL 系列。' },
  { brand: 'SMC', pattern: /^IR\d/i, competitorSeries: 'IR 精密調壓閥', airtacSeriesIds: ['GPR', 'GPFR'], note: 'SMC IR 精密減壓閥對應 AirTAC GPR 精密調壓閥。' },
  { brand: 'SMC', pattern: /^AFM|^AMG|^AFD/i, competitorSeries: 'AFM 油霧分離器', airtacSeriesIds: ['GPF'], note: 'SMC AFM/AFD 油霧分離器對應 AirTAC GPF 系列。' },
  { brand: 'SMC', pattern: /^AS\d{3,4}/i, competitorSeries: 'AS 速度控制閥', airtacSeriesIds: ['PSL'], note: 'SMC AS 調速接頭(如 AS2201F)對應 AirTAC PSL 系列 L 型調速閥。嚴禁輸出 PISCO 的 JSC。' },
  { brand: 'SMC', pattern: /^AN\d/i, competitorSeries: 'AN 消聲器', airtacSeriesIds: ['BSL', 'BSL-SS'], note: 'SMC AN 消聲器對應 AirTAC BSL 系列。' },
  { brand: 'SMC', pattern: /^KQ2?([HLTUYE])/i, competitorSeries: 'KQ2 快插接頭', airtacSeriesIds: ['Fittings-PC', 'Fittings-PL', 'Fittings-PU', 'Fittings-PE'], note: 'SMC KQ2 快插接頭：KQ2H直通→PC、KQ2L彎頭→PL、KQ2T三通→PE、KQ2U Y型→PU 對應形狀選擇。管徑(公制mm)與牙規直接對應。' },
  { brand: 'SMC', pattern: /^RB\d{2}/i, competitorSeries: 'RB 油壓緩衝器', airtacSeriesIds: ['ACA', 'ACJ', 'HR'], note: 'SMC RB 油壓緩衝器對應 AirTAC ACA (標準自補償) / ACJ (可調) 系列，依螺紋尺寸對應。' },
  { brand: 'SMC', pattern: /^D-[A-Z]\d|^D-M9/i, competitorSeries: 'D- 磁性開關', airtacSeriesIds: ['cms', 'dms', 'ems'], note: 'SMC D- 系列磁性開關：有接點(磁簧式)對應 CMS，無接點(電子式)對應 DMS/EMS。' },
  { brand: 'SMC', pattern: /^T[USH]\d{4}|^TU\d/i, competitorSeries: 'TU 氣管', airtacSeriesIds: ['PU-Tube', 'PA-Tube', 'UWS98A'], note: 'SMC TU 聚氨酯氣管對應 AirTAC US98A/UE95A PU管；尼龍管對應 PA 系列。' },
  // --- Festo ---
  { brand: 'Festo', pattern: /^DSNU|^ESNU/i, competitorSeries: 'DSNU 圓形氣缸(ISO6432)', airtacSeriesIds: ['mi', 'ma', 'mf'], note: 'Festo DSNU 圓形迷你缸對應 AirTAC MI/MA 系列(ISO6432)。' },
  { brand: 'Festo', pattern: /^DSBC|^DNC/i, competitorSeries: 'DSBC/DNC 標準氣缸(ISO15552)', airtacSeriesIds: ['sai', 'se', 'sc'], note: 'Festo DSBC/DNC 標準缸對應 AirTAC SAI (ISO15552) 或 SE 系列。' },
  { brand: 'Festo', pattern: /^ADVU|^ADN|^AEVC|^ADVC/i, competitorSeries: 'ADVU/ADN 緊湊氣缸', airtacSeriesIds: ['acq', 'sda', 'ace', 'act'], note: 'Festo ADVU/ADN 緊湊型氣缸對應 AirTAC ACQ/SDA 超薄缸。' },
  { brand: 'Festo', pattern: /^DFM/i, competitorSeries: 'DFM 帶導桿氣缸', airtacSeriesIds: ['tcl', 'tcm', 'tsai'], note: 'Festo DFM 帶導桿氣缸對應 AirTAC TCL/TCM 三軸缸。' },
  { brand: 'Festo', pattern: /^SLT|^DGSL/i, competitorSeries: 'SLT/DGSL 迷你滑台', airtacSeriesIds: ['hlq', 'hls', 'hlf'], note: 'Festo 迷你滑台對應 AirTAC HLQ/HLS 精密滑台。' },
  { brand: 'Festo', pattern: /^HGP|^DHPS/i, competitorSeries: 'HGP/DHPS 平行氣爪', airtacSeriesIds: ['hfz', 'hfk', 'hfp'], note: 'Festo 平行氣爪對應 AirTAC HFZ/HFK 系列。' },
  { brand: 'Festo', pattern: /^DSM|^DRVS|^DRRD/i, competitorSeries: 'DSM/DRVS 擺動氣缸', airtacSeriesIds: ['hrq', 'hrs'], note: 'Festo 擺動缸對應 AirTAC HRQ 系列。' },
  { brand: 'Festo', pattern: /^DFSP|^STA[F]?/i, competitorSeries: 'STA/DFSP 阻擋氣缸', airtacSeriesIds: ['twq', 'twh', 'twg'], note: 'Festo 阻擋氣缸對應 AirTAC TWQ/TWH 系列。' },
  { brand: 'Festo', pattern: /^VUVS|^MFH|^JMFH|^VUVG/i, competitorSeries: 'VUVS/MFH 電磁閥', airtacSeriesIds: ['4V200', '4V300', '6SV', '7SV'], note: 'Festo 五口電磁閥對應 AirTAC 4V 或 6SV/7SV 系列，依口徑與流量。' },
  { brand: 'Festo', pattern: /^GRLA|^GRL[ZO]?|^GR-/i, competitorSeries: 'GRLA 調速閥', airtacSeriesIds: ['PSL'], note: 'Festo GRLA 調速接頭對應 AirTAC PSL 系列。' },
  { brand: 'Festo', pattern: /^QS[LTMYF]?/i, competitorSeries: 'QS 快插接頭', airtacSeriesIds: ['Fittings-PC', 'Fittings-PL', 'Fittings-PU', 'Fittings-PE'], note: 'Festo QS 快插接頭：QS直通→PC、QSL彎頭→PL、QST三通→PE。' },
  { brand: 'Festo', pattern: /^MS[4-9]|^FRC|^LFR/i, competitorSeries: 'MS/FRC 氣源處理', airtacSeriesIds: ['GC', 'GFC', 'GFR', 'GF', 'GR'], note: 'Festo MS/FRC 系列 FRL 對應 AirTAC G 系列氣源處理(GFR/GC等)。' },
  { brand: 'Festo', pattern: /^U-\d|^AMTE/i, competitorSeries: 'U 消聲器', airtacSeriesIds: ['BSL'], note: 'Festo U 系列消聲器對應 AirTAC BSL。' },
  // --- Mindman (金器) ---
  { brand: 'Mindman', pattern: /^MCQV|^MCQA|^MCQI/i, competitorSeries: 'MCQV/MCQA 薄型氣缸', airtacSeriesIds: ['acq', 'sda'], note: 'Mindman MCQ 系列薄型缸對應 AirTAC ACQ/SDA。' },
  { brand: 'Mindman', pattern: /^MCMI|^MCMJ|^MCJA/i, competitorSeries: 'MCMI 迷你氣缸', airtacSeriesIds: ['mi', 'ma', 'mf'], note: 'Mindman MCMI 迷你缸(ISO6432)對應 AirTAC MI/MA。' },
  { brand: 'Mindman', pattern: /^MCGB|^MCGA|^MCMA/i, competitorSeries: 'MCGB/MCMA 標準氣缸', airtacSeriesIds: ['sc', 'se', 'sai'], note: 'Mindman 標準氣缸對應 AirTAC SC/SE 系列。' },
  { brand: 'Mindman', pattern: /^MCGS/i, competitorSeries: 'MCGS 帶導桿氣缸', airtacSeriesIds: ['tcl', 'tcm'], note: 'Mindman MCGS 帶導桿缸對應 AirTAC TCL/TCM。' },
  { brand: 'Mindman', pattern: /^MCHA|^MCHB/i, competitorSeries: 'MCH 氣爪', airtacSeriesIds: ['hfz', 'hfy', 'hfp'], note: 'Mindman 氣爪對應 AirTAC HF 系列，依開閉形式選擇。' },
  { brand: 'Mindman', pattern: /^MVSC|^MVSD|^MVSE/i, competitorSeries: 'MVSC 電磁閥', airtacSeriesIds: ['4V100', '4V200', '4V300'], note: 'Mindman MVSC 電磁閥對應 AirTAC 4V 系列(MVSC-220→4V210 等)。' },
  { brand: 'Mindman', pattern: /^MACP|^MAFR|^MACT/i, competitorSeries: 'MACP 氣源處理', airtacSeriesIds: ['GFR', 'GC', 'GFC'], note: 'Mindman 氣源處理(調壓過濾器等)對應 AirTAC GFR/GC 系列。' },
  // --- PISCO ---
  { brand: 'PISCO', pattern: /^JSC/i, competitorSeries: 'JSC 調速閥', airtacSeriesIds: ['PSL'], note: 'PISCO JSC 調速接頭對應 AirTAC PSL 系列。' },
  { brand: 'PISCO', pattern: /^P[CLBEUY]\d/i, competitorSeries: 'PC/PL 快插接頭', airtacSeriesIds: ['Fittings-PC', 'Fittings-PL', 'Fittings-PU', 'Fittings-PE'], note: 'PISCO 快插接頭命名與 AirTAC 幾乎相同：PC直通、PL彎頭、PE三通、PU直通(管對管)。' },
  { brand: 'PISCO', pattern: /^SL[WM]?\d/i, competitorSeries: 'SL 消聲器', airtacSeriesIds: ['BSL'], note: 'PISCO 消聲器對應 AirTAC BSL。' },
  // --- CKD (常見，雖不在下拉清單也支援自動偵測) ---
  { brand: 'CKD', pattern: /^SSD/i, competitorSeries: 'SSD 薄型氣缸', airtacSeriesIds: ['acq', 'sda'], note: 'CKD SSD 薄型缸對應 AirTAC ACQ/SDA。' },
  { brand: 'CKD', pattern: /^CMK2|^SCM/i, competitorSeries: 'CMK2/SCM 氣缸', airtacSeriesIds: ['ma', 'mi', 'sc'], note: 'CKD CMK2 對應 AirTAC MA/MI；SCM 對應 SC 系列。' },
  { brand: 'CKD', pattern: /^STG|^STS|^STL/i, competitorSeries: 'STG 帶導桿氣缸', airtacSeriesIds: ['tcl', 'tcm'], note: 'CKD STG 帶導桿缸對應 AirTAC TCL/TCM。' },
  { brand: 'CKD', pattern: /^4G[ABD]|^4K[AB]/i, competitorSeries: '4G/4K 電磁閥', airtacSeriesIds: ['4V100', '4V200', '4V300', '7SV'], note: 'CKD 4G/4KA 電磁閥對應 AirTAC 4V/7SV 系列。' },
];

/** 從輸入型號字串以啟發式(字首規則)找出可能的候選系列與提示。 */
export function heuristicMatch(input: string, brand?: string): { entries: KnowledgeEntry[]; candidateIds: string[] } {
  // 將輸入拆成可能的多個型號 token (支援複合輸入，如「CQ2B40-30D + D-M9B」)
  const tokens = input
    .split(/[\s,，、;；+＋\n\/]+/)
    .map(t => t.trim())
    .filter(t => t.length >= 2);

  const entries: KnowledgeEntry[] = [];
  const candidateIds: string[] = [];
  for (const entry of KNOWLEDGE_BASE) {
    if (brand && entry.brand.toLowerCase() !== brand.toLowerCase()) continue;
    if (tokens.some(t => entry.pattern.test(t))) {
      entries.push(entry);
      for (const id of entry.airtacSeriesIds) {
        if (isValidSeriesId(id) && !candidateIds.includes(id)) candidateIds.push(id);
      }
    }
  }
  return { entries, candidateIds };
}

/** 供 prompt 使用的知識庫摘要文字。 */
export function knowledgeBaseText(entries?: KnowledgeEntry[]): string {
  const list = entries && entries.length > 0 ? entries : KNOWLEDGE_BASE;
  return list
    .map(e => `- [${e.brand}] ${e.competitorSeries} → AirTAC 系列id: ${e.airtacSeriesIds.join(', ')}。${e.note}`)
    .join('\n');
}

// ---------------------------------------------------------------------------
// 訂購碼驗證
// ---------------------------------------------------------------------------

export interface SelectedOption {
  categoryId: string;
  code: string;
}

export interface RecommendationValidation {
  catalogVerified: boolean;
  seriesFound: boolean;
  warnings: string[];
  serverGeneratedCode?: string;
}

/** 依型錄 format 模板 + 選項組合出訂購碼 (與前端訂購碼產生器邏輯一致)。 */
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

const NO_MATCH_RE = /無(直接)?對應/;

/**
 * 對 AI 回傳的單筆推薦做型錄驗證：
 * 1. seriesId 是否存在於型錄
 * 2. selectedOptions 的參數與代碼是否為型錄內合法選項
 * 3. 依型錄 format 重新生成訂購碼供比對
 */
export function validateRecommendation(rec: {
  baseModel?: string;
  seriesId?: string;
  fullOrderingCode?: string;
  selectedOptions?: SelectedOption[];
}): RecommendationValidation {
  const warnings: string[] = [];

  if (rec.baseModel && NO_MATCH_RE.test(rec.baseModel)) {
    return { catalogVerified: true, seriesFound: false, warnings: [] };
  }

  const series = rec.seriesId ? seriesById.get(rec.seriesId) : undefined;
  if (!series) {
    warnings.push(`推薦的系列 id「${rec.seriesId || '(未提供)'}」不在型錄資料庫中，請人工確認此型號是否存在。`);
    return { catalogVerified: false, seriesFound: false, warnings };
  }

  const selections: Record<string, string> = {};
  for (const sel of rec.selectedOptions || []) {
    const cat = (series.categories || []).find(c => c.id === sel.categoryId);
    if (!cat) {
      warnings.push(`參數「${sel.categoryId}」不存在於 ${series.name} 的型錄定義中。`);
      continue;
    }
    const opt = (cat.options || []).find(o => o.code === sel.code);
    if (!opt) {
      const valid = (cat.options || []).map(o => (o.code === '' ? '(空白)' : o.code)).join(', ');
      warnings.push(`「${cat.name}」代碼「${sel.code === '' ? '(空白)' : sel.code}」不在型錄合法選項內 (可選: ${valid})。`);
      continue;
    }
    selections[sel.categoryId] = sel.code;
  }

  const serverGeneratedCode = generateOrderingCode(series, selections);

  // 比對 AI 給的訂購碼與伺服器重建的訂購碼 (忽略空白/大小寫差異)
  const normalize = (s: string) => s.replace(/[\s\-–—]+/g, '').toUpperCase();
  if (rec.fullOrderingCode && serverGeneratedCode && normalize(rec.fullOrderingCode) !== normalize(serverGeneratedCode)) {
    warnings.push(`AI 產生的訂購碼「${rec.fullOrderingCode}」與依型錄規則重建的「${serverGeneratedCode}」不一致，請以型錄驗證版本為準。`);
  }

  return {
    catalogVerified: warnings.length === 0,
    seriesFound: true,
    warnings,
    serverGeneratedCode,
  };
}
