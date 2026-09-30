/**
 * 兩階段 AI 匹配引擎的伺服器端輔助模組。
 *
 * 第一階段(候選篩選)只送出壓縮版型錄索引 + 競品對照知識庫，
 * 讓模型挑出最相關的候選系列；第二階段才送出候選系列的完整
 * 型錄資料進行精確匹配。最後由伺服器對 AI 回傳的訂購碼做
 * 型錄逐項驗證，防止幻覺型號流出。
 */
import { defaultCatalog } from '../data/index';
import { generateOrderingCode, isFreeValueCategory } from '../lib/orderingCode';
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
  /**
   * 競品訂購碼「逐位解碼表」(從原廠型錄整理)。
   * 命中時整段注入 prompt，並要求模型以此為準拆解型號，
   * 防止模型憑印象猜測後綴意義 (例如把 SY 的電壓碼當成口徑碼)。
   */
  decode?: string;
}

/**
 * 業界常見交叉對照規則。airtacSeriesIds 一律使用型錄 JSON 內的系列 id。
 * 這份表同時用於：(1) 啟發式預選候選系列 (2) 注入 prompt 作為匹配提示。
 */
export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // --- SMC 氣缸 ---
  {
    brand: 'SMC', pattern: /^C?D?Q2/i, competitorSeries: 'CQ2/CDQ2 薄型氣缸', airtacSeriesIds: ['acq', 'sda'],
    note: 'SMC CQ2 薄型氣缸對應 AirTAC ACQ (優先) 或 SDA 系列，缸徑行程直接沿用。',
    decode: `SMC CQ2 訂購碼解碼 (格式: C(D)Q2[安裝型式][缸徑]-[行程][動作]+尾碼):
- 開頭 CDQ2 = 內建磁石(可裝磁性開關)版本的 CQ2；CQ2 開頭若尾碼無磁石標記則無磁石
- 安裝型式: B=通孔基本型, A=兩端牙孔型, L=腳座型, F=前法蘭, G=後法蘭, D=雙耳環
- 缸徑: 12/16/20/25/32/40/50/63/80/100 (mm)
- 行程: 數字直接為 mm
- 動作: D=復動(雙作用), S=單動押出, T=單動引入; DZ/DM/DCM 等組合中 D 之後的字母屬其他選項
- 常見尾碼: Z=附磁石(舊寫法), M9B等=隨附磁性開關型號
→ AirTAC ACQ 對應: 缸徑/行程直接沿用 (ACQ 缸徑範圍 12~100)；附磁石→磁石代碼 S；安裝以通孔為標準。CDQ2B40-30DZ → ACQ40X30S` },
  { brand: 'SMC', pattern: /^C?D?QS/i, competitorSeries: 'CQS 小型薄型氣缸', airtacSeriesIds: ['acq', 'sda', 'ace'], note: 'SMC CQS 小缸徑薄型氣缸對應 AirTAC ACQ 小缸徑或 ACE 緊湊型。' },
  { brand: 'SMC', pattern: /^C?D?J2|^C?D?J1/i, competitorSeries: 'CJ1/CJ2 筆型氣缸', airtacSeriesIds: ['pb', 'pbr'], note: '依公司對照表：SMC CJ1/CJ2 筆型不銹鋼氣缸 → AirTAC PB 系列 (CJ2R→PBR)。CD 開頭=附磁石→magnet S；缸徑 6/10/16 直接對應。不要對到 MI (MI 對應的是 SMC C85)。' },
  { brand: 'SMC', pattern: /^C?D?M2/i, competitorSeries: 'CM2 圓形氣缸', airtacSeriesIds: ['mf', 'mbl'], note: '依公司對照表：SMC CM2 圓形氣缸(20~40mm) → AirTAC MF / MFC (緩衝可調) 或 MAL(鋁製，型錄以 MBL 表示)；CM2R→MAR。CD 開頭=附磁石→S。' },
  { brand: 'SMC', pattern: /^C?D?85|^C85/i, competitorSeries: 'C85 迷你氣缸(ISO6432)', airtacSeriesIds: ['mi'], note: '依公司對照表：SMC C85 (ISO6432) → AirTAC MI / MIC (緩衝可調)。' },
  { brand: 'SMC', pattern: /^C?D?G1/i, competitorSeries: 'CG1 圓形氣缸', airtacSeriesIds: ['mg'], note: '依公司對照表：SMC CG1 → AirTAC MG / MGC。' },
  { brand: 'SMC', pattern: /^C?D?MB1/i, competitorSeries: 'MB1 標準氣缸(ISO15552)', airtacSeriesIds: ['se', 'sai'], note: '依公司對照表：SMC MB1 → AirTAC SE (ISO15552)。' },
  { brand: 'SMC', pattern: /^C?D?MB\b|^C?D?MB[A-Z]?\d/i, competitorSeries: 'MB 標準氣缸', airtacSeriesIds: ['jsi', 'se'], note: '依公司對照表：SMC MB → AirTAC JSI。' },
  { brand: 'SMC', pattern: /^C?P?9[56]/i, competitorSeries: 'C95/C96 標準氣缸(ISO15552)', airtacSeriesIds: ['se', 'sai'], note: '依公司對照表：SMC C95 → AirTAC SI (目前型錄資料未收錄 SI，暫以 SE/SAI 替代並在說明中註明)。' },
  { brand: 'SMC', pattern: /^C?D?A2/i, competitorSeries: 'CA2 標準氣缸', airtacSeriesIds: ['sc', 'se', 'sau'], note: 'SMC CA2 拉桿式標準氣缸對應 AirTAC SC 系列。' },
  { brand: 'SMC', pattern: /^MGP/i, competitorSeries: 'MGP 帶導桿薄型氣缸', airtacSeriesIds: ['tcl'], note: 'SMC MGP 三軸帶導桿氣缸對應 AirTAC TCL (直線軸承) / TCM (銅套軸承)。MGPL→TCL、MGPM→TCM。' },
  { brand: 'SMC', pattern: /^CXS/i, competitorSeries: 'CXS 雙聯氣缸', airtacSeriesIds: ['tr', 'tn'], note: '依公司對照表：SMC CXS → AirTAC TR 雙軸氣缸 (CXSM 滑動軸承/CXSL 滾珠軸承皆先對 TR)。' },
  { brand: 'SMC', pattern: /^MXH/i, competitorSeries: 'MXH 滑台', airtacSeriesIds: ['hlh'], note: '依公司對照表：SMC MXH → AirTAC HLH。' },
  { brand: 'SMC', pattern: /^CXWM|^CXW/i, competitorSeries: 'CXW 雙桿滑台', airtacSeriesIds: ['stw'], note: '依公司對照表：SMC CXWM → AirTAC STW。' },
  { brand: 'SMC', pattern: /^MXQ/i, competitorSeries: 'MXQ 氣動滑台', airtacSeriesIds: ['hlq', 'hls'], note: 'SMC MXQ 精密滑台對應 AirTAC HLQ (循環滾珠) 系列。' },
  { brand: 'SMC', pattern: /^MXS/i, competitorSeries: 'MXS 氣動滑台', airtacSeriesIds: ['hls', 'hlq'], note: 'SMC MXS 精密滑台對應 AirTAC HLS (滾柱型) 系列。' },
  { brand: 'SMC', pattern: /^MHZ2?/i, competitorSeries: 'MHZ2 平行開閉氣爪', airtacSeriesIds: ['hfz', 'hfk'], note: 'SMC MHZ2 平行氣爪對應 AirTAC HFZ (滾珠導軌平行氣爪)，MHZL2 長行程對應 HFKL。' },
  { brand: 'SMC', pattern: /^MHY2?/i, competitorSeries: 'MHY2 180°開閉氣爪', airtacSeriesIds: ['hfr'], note: 'SMC MHY2 180°開閉氣爪對應 AirTAC HFR 系列。' },
  { brand: 'SMC', pattern: /^MHC2?/i, competitorSeries: 'MHC2 支點開閉氣爪', airtacSeriesIds: ['hfy'], note: 'SMC MHC2 支點開閉(Y型)氣爪對應 AirTAC HFY 系列。' },
  { brand: 'SMC', pattern: /^MHS/i, competitorSeries: 'MHS 三爪氣爪', airtacSeriesIds: ['hfc'], note: '依公司對照表：SMC MHS → AirTAC HFC。' },
  { brand: 'SMC', pattern: /^CRB|^MSQ|^CRQ/i, competitorSeries: 'CRB/MSQ 擺動氣缸', airtacSeriesIds: ['hrq', 'hrs'], note: 'SMC 擺動氣缸(葉片式CRB、齒條式MSQ)對應 AirTAC HRQ 回轉氣缸(齒條齒輪式)。' },
  { brand: 'SMC', pattern: /^C?D?MK\d?/i, competitorSeries: 'MK 回轉夾緊氣缸', airtacSeriesIds: ['qck', 'qdk', 'ack'], note: '依公司對照表：SMC MK → AirTAC QCK。' },
  { brand: 'SMC', pattern: /^CKG|^CKZ/i, competitorSeries: 'CKG/CKZ 夾緊氣缸', airtacSeriesIds: ['mck', 'jck'], note: '依公司對照表：SMC CKG1 → AirTAC MCK；CKZ3 → JCK。' },
  { brand: 'SMC', pattern: /^RS[QDH]/i, competitorSeries: 'RSQ/RSD 阻擋氣缸', airtacSeriesIds: ['twq', 'twg', 'twh'], note: 'SMC RSQ 阻擋氣缸對應 AirTAC TWQ/TWH 系列。' },
  { brand: 'SMC', pattern: /^MY\d|^CY\d/i, competitorSeries: 'MY/CY 無桿氣缸', airtacSeriesIds: ['rmt', 'rmtl', 'rms', 'rmh'], note: 'SMC 機械/磁耦式無桿氣缸對應 AirTAC RMT (導桿型) / RMS (基本型) / RMH (滑軌型)。' },
  { brand: 'SMC', pattern: /^C?D?U[KJ]?\d/i, competitorSeries: 'CU/CUK/CUJ 自由安裝氣缸', airtacSeriesIds: ['md', 'mk', 'mu'], note: '依公司對照表：SMC CU → AirTAC MD；CUK(不回轉) → MK；CUJ(迷你) → MU。' },
  { brand: 'SMC', pattern: /^C?D?JP/i, competitorSeries: 'CJP 針型氣缸', airtacSeriesIds: ['mpe', 'mpg'], note: '依公司對照表：SMC CJP → AirTAC MPE；CJP2 → MPG。' },
  // --- SMC 閥類 ---
  {
    brand: 'SMC', pattern: /^SY[3579]/i, competitorSeries: 'SY3000/5000/7000/9000 電磁閥', airtacSeriesIds: ['7SV', '4V100', '4V200', '4V300'],
    note: '依公司對照表：SMC SY 系列(插接式小型五口閥)首選 AirTAC 7V 系列 (型錄 id: 7SV)：SY3*00→7V050、SY5*00→7V100、SY7*00→7V200、SY9*00→7V300；底座式 SY5*40/SY7*40→7MV100/7MV200 (7V 閥+底座)。僅在客戶指定 DIN 插座式或需要較大流量時才改用 4V (4V100/200/300)，且需在說明中註明。務必依下方解碼表逐位拆解。',
    decode: `SMC SY 系列訂購碼逐位解碼 (格式: SY[系列][機能]20-[電壓][接線][燈/突波][手動]-[口徑][牙型])，此表來自 SMC 原廠型錄，具絕對權威性:
- 第1碼 系列/閥體尺寸: 3=SY3000(M5), 5=SY5000(1/8), 7=SY7000(1/4), 9=SY9000(3/8)
- 第2碼 切換方式: 1=二位單電控, 2=二位雙電控, 3=三位中位封閉, 4=三位中位排氣, 5=三位中位供壓
- 第3~4碼: 20=單體直接配管型 (本體配管)；40=底座配管型 (需搭配底座)
- 破折號後第1碼 = 額定電壓 (注意!! 這一碼是電壓、不是口徑): 5=DC24V, 6=DC12V, V=DC6V, S=DC5V, R=DC3V, 1=AC100V, 2=AC200V, 3=AC110V, 4=AC220V
- 接線取出方式: G=導線出線式300mm, H=出線式600mm, L=L形插座式附導線(300mm), LN=L形不附導線, LO=L形不附插頭, M=M形插座式附導線(300mm), MN/MO=M形變體, D=DIN插座式, DO=DIN不附接線座, W開頭=M8插座式
- 指示燈/突波保護(緊接在接線代碼後): 無記號=皆無, S=附突波保護, Z=附指示燈+突波保護, R=突波保護(無極性), U=指示燈+突波保護(無極性)
- 手動操作: 無記號=非鎖定按鈕式, D=起子壓下旋轉鎖定式, E=手動壓下旋轉鎖定式
- 第二個破折號後 = A·B口接管口徑: M5=M5×0.8, 01=1/8", 02=1/4", 03=3/8", C4=Φ4快插, C6=Φ6快插, C8=Φ8快插, C10=Φ10快插, C12=Φ12快插, N開頭=英制快插
- 牙型(緊接在口徑後): 無記號=Rc(PT牙), F=G牙, N=NPT牙, T=NPTF牙

對應 AirTAC 7V 系列 (型錄 id 7SV，格式 7V{seriesCode}{controlType}{portConnType}-{port}{voltage}{leadLength}{thread}):
- seriesCode: SY3→05, SY5→1, SY7→2, SY9→3
- controlType: 1→10, 2→20, 3→30C, 4→30E, 5→30P
- 口徑: M5→port M5；01(1/8")→06；02(1/4")→08；03(3/8")→10 (portConnType 空白=螺紋)
- SMC 快插口徑 C4/C6/C8/C10 → portConnType=J (快插接頭型) + port 04/06/08/10 (7V 有內建快插，不需另配接頭)
- 電壓: 5(DC24V)→B, 6(DC12V)→F, 3(AC110V)→C, 4(AC220V)→A, 1(AC100V)→C(最接近,需備註), 2(AC200V)→A(最接近,需備註)
- 端子線長 leadLength: SMC 附導線 G/L/M(300mm)→050(0.5m)；H(600mm)→050 並備註；需長線→200(2.0m)。DIN 插座式(D)→7V 無 DIN，改推 4V 系列並說明
- 牙型: 無記號(Rc)→空白(PT牙), F→G, N→T；指示燈/突波/手動鈕 AirTAC 無獨立代碼，於說明中註明即可
範例: SY5120-5LZD-01 = SY5000 + 二位單電控 + 本體配管 + DC24V + L形插座附線 + 指示燈突波 + 手動旋轉鎖定 + 1/8" + Rc → AirTAC 7V110-06B050
範例: SY3220-5LZ-M5 → 7V0520-M5B050；SY7320-5GZ-C8 → 7V230CJ-08B050 (C8 快插→J+08)
若改用 4V 系列: 機能碼同上，口徑 4V100: M5/06；4V200: 06(1/8)/08(1/4)；4V300: 08/10；DIN(D)→terminal 空白，出線(G/H/L/M)→terminal I` },
  { brand: 'SMC', pattern: /^VFS?[1-5]|^VZ[35]/i, competitorSeries: 'VF/VFS/VZ 電磁閥', airtacSeriesIds: ['4V100', '4V200', '4V300', '4V400'], note: '依公司對照表：SMC VFS1000→4V100、VFS2000→4V200、VFS3000→4V300 (VF3000 同為 1/4~3/8 級距→4V300)。機能碼: 1=單電控→10, 2=雙電控→20, 3/4/5→30C/30E/30P；電壓 5=DC24V→B；口徑 01→06, 02→08, 03→10。' },
  { brand: 'SMC', pattern: /^SYJ[357]/i, competitorSeries: 'SYJ 三口電磁閥', airtacSeriesIds: ['3V100', '3V200', '3V300'], note: '依公司對照表：SMC SYJ300→3V100、SYJ500→3V200、SYJ700→3V300。' },
  { brand: 'SMC', pattern: /^VX3|^VT317/i, competitorSeries: 'VX31/VT317 三口閥', airtacSeriesIds: ['3V1', '3V3'], note: '依公司對照表：SMC VX31→3V1；VT317→3V3。' },
  { brand: 'SMC', pattern: /^VQ[Zz]?/i, competitorSeries: 'VQ 直動電磁閥', airtacSeriesIds: ['4V100', 'CPV10', 'CPV15', '7SV'], note: 'SMC VQ 小型電磁閥依尺寸對應 AirTAC CPV10/CPV15 微型閥或 4V100。' },
  {
    brand: 'SMC', pattern: /^VT3|^VV3|^VT0|^V100/i, competitorSeries: 'VT 三口電磁閥', airtacSeriesIds: ['3V1', '3V2', '3V2M', '3V100'],
    note: 'SMC VT307 等三口二位直動閥對應 AirTAC 3V2 (公司對照表)；VV307 帶底座對應 3V2M。',
    decode: `SMC VT307 訂購碼解碼 (格式: VT307-[電壓][接線]-[口徑]):
- 電壓 (與 SY 系列同一套代碼): 1=AC100V, 2=AC200V, 3=AC110V, 4=AC220V, 5=DC24V, 6=DC12V, V=DC6V, S=DC5V, R=DC3V
- 接線: G=出線式(grommet)300mm, H=出線式600mm, L=L形插座, M=M形插座, D=DIN插座; 後綴數字1=帶指示燈
- 口徑: 01=1/8", 02=1/4"
範例: VT307-5G1-01 = DC24V + 出線式帶燈 + 1/8"
→ AirTAC 3V2 對應: 電壓 5(DC24V)→B, 6(DC12V)→F, 1(AC100V)→C(最接近AC110V), 4(AC220V)→A; 口徑 01(1/8")→06, 02(1/4")→08; 出線式→I` },
  { brand: 'SMC', pattern: /^VX2?\d/i, competitorSeries: 'VX 流體電磁閥', airtacSeriesIds: ['2SA', '2KSA', '2WA', '2LA', '2V'], note: '依公司對照表：SMC VX2 → AirTAC 2S(常閉,型錄 2SA)/2KS(常開,2KSA)；VXE2→2W(2WA)；VCS2/VXH→2L(2LA)；VXP→2V；VDW→2P。' },
  { brand: 'SMC', pattern: /^VXZ|^VXD/i, competitorSeries: 'VXZ/VXD 先導流體閥', airtacSeriesIds: ['2SA', '2KSA', '2J'], note: 'SMC 先導式流體閥對應 AirTAC 2SA/2WA 先導型或 2J 角座閥。' },
  // --- SMC 氣源處理/輔助 ---
  { brand: 'SMC', pattern: /^AC\d{2}/i, competitorSeries: 'AC FRL組合', airtacSeriesIds: ['GC', 'GAC', 'GFC', 'GAFC', 'AC-BC'], note: 'SMC AC 系列三聯件/二聯件對應 AirTAC GC (三聯) / GFC (二聯) 系列，口徑對齊。' },
  { brand: 'SMC', pattern: /^AW\d{2}/i, competitorSeries: 'AW 調壓過濾器', airtacSeriesIds: ['GFR', 'GAFR', 'AFR-BFR'], note: 'SMC AW 調壓過濾器(濾壓一體)對應 AirTAC GFR 系列。' },
  { brand: 'SMC', pattern: /^AF\d{2}/i, competitorSeries: 'AF 過濾器', airtacSeriesIds: ['GF', 'GAF', 'AF-BF'], note: 'SMC AF 空氣過濾器對應 AirTAC GF 系列。' },
  { brand: 'SMC', pattern: /^AR\d{2}/i, competitorSeries: 'AR 調壓閥', airtacSeriesIds: ['GR', 'GAR', 'AR-BR'], note: 'SMC AR 調壓閥對應 AirTAC GR 系列。' },
  { brand: 'SMC', pattern: /^AL\d{2}/i, competitorSeries: 'AL 給油器', airtacSeriesIds: ['GL', 'GAL', 'AL-BL'], note: 'SMC AL 給油器(油霧器)對應 AirTAC GL 系列。' },
  { brand: 'SMC', pattern: /^IR\d/i, competitorSeries: 'IR 精密調壓閥', airtacSeriesIds: ['GPR', 'GPFR'], note: 'SMC IR 精密減壓閥對應 AirTAC GPR 精密調壓閥。' },
  { brand: 'SMC', pattern: /^AFM|^AMG|^AFD/i, competitorSeries: 'AFM 油霧分離器', airtacSeriesIds: ['GPF'], note: 'SMC AFM/AFD 油霧分離器對應 AirTAC GPF 系列。' },
  {
    brand: 'SMC', pattern: /^AS\d{3,4}/i, competitorSeries: 'AS 速度控制閥', airtacSeriesIds: ['PSL', 'ASC'],
    note: '分兩類，務必先判斷：(1) 型號帶 F (附快插) 的萬向/彎頭型調速接頭，如 AS1201F、AS2201F、AS2211F、AS3201F → AirTAC PSL (L 型調速接頭)；(2) 不帶快插的管路直通型 AS1000/AS2000/AS3000 (如 AS2000-02) → AirTAC ASC (公司對照表的 AS→ASC 指的是這一類)。嚴禁輸出 PISCO 的 JSC。',
    decode: `SMC AS 調速閥訂購碼解碼 (格式: AS[體型][口]0[節流方向][F]-[牙規]-[管徑]):
- 體型/牙規等級: 1=M5, 2=1/8, 3=1/4, 4=3/8~1/2
- 第3~4碼: 01=標準; 節流方向尾碼: 無/預設=排氣節流(meter-out), 1F前的數字2=排氣節流彎頭型
- F=附快插接頭 (elbow with one-touch fitting)
- -[數字]=螺紋尺寸: 01=1/8", 02=1/4"; -[數字]=適用管外徑: 04=Φ4, 06=Φ6, 08=Φ8
- 尾碼 S=鋼珠內六角, A=排氣節流, B=入氣節流
範例: AS2201F-01-06SA = 1/8"牙 + Φ6管快插 + 排氣節流 L型
→ AirTAC PSL 對應: PSL[管徑]-[牙規], 例 → PSL6-01 (Φ6管、1/8"牙、排氣節流標準)。PSL 標準即排氣節流(A型)` },
  { brand: 'SMC', pattern: /^AN\d/i, competitorSeries: 'AN 消聲器', airtacSeriesIds: ['BSL', 'PPA', 'BSL-S'], note: 'SMC AN 消聲器對應 AirTAC BSL 系列 (spec 可選 BSL/BSLM/BESL/PAL)；管塞式對應 PPA；不銹鋼版對應 BSL-S。' },
  {
    brand: 'SMC', pattern: /^KQ2?([HLTUYE])/i, competitorSeries: 'KQ2 快插接頭', airtacSeriesIds: ['PC', 'PL', 'PE', 'PEG', 'PC-S', 'PL-S'],
    note: 'SMC KQ2 快插接頭對應 AirTAC 快速接頭：直通公牙→PC、彎頭/牙型類→PL 系列的 spec 選項、插管對插管類→PE 系列的 spec 選項、減徑/多通→PEG。不銹鋼版選 -S 系列。',
    decode: `SMC KQ2 訂購碼解碼 (格式: KQ2[形狀][管徑]-[牙規/第二管徑]+尾碼):
- 形狀: H=直通公牙接頭, L=L型彎頭公牙, T=T型三通, U=Y型二叉, E=隔板直通, F=母牙直通, W=延長彎頭
- 管徑: 04=Φ4, 06=Φ6, 08=Φ8, 10=Φ10, 12=Φ12 (mm)
- 牙規: M5=M5牙, 01=1/8", 02=1/4", 03=3/8", 04=1/2"; 前綴 N (如 -01N)=NPT牙; 尾碼 S=內六角型
→ AirTAC 對應: 形狀 H→PC 系列, L(彎頭)→PL 系列(spec 選 PL), T(牙三通)→PL 系列(spec 選 PEB/PED), 插管三通→PE 系列(spec 選 PE), U/Y→PE 系列(spec 選 PY), 管對管直通→PE 系列(spec 選 PU); 訂購碼 = [形狀代號][管徑] [牙規], 例 KQ2L06-01S → PL 6 01 (Φ6管、1/8"牙)。NPT 牙需備註` },
  { brand: 'SMC', pattern: /^RB\d{2}/i, competitorSeries: 'RB 油壓緩衝器', airtacSeriesIds: ['ACA', 'ACJ', 'ACJ-L', 'HR'], note: 'SMC RB 油壓緩衝器對應 AirTAC ACA (自動補償式) / ACJ (可調式, M10~M14) / ACJ-L (可調式, M20以上)，依本體螺紋尺寸對應。' },
  {
    brand: 'SMC', pattern: /^D-[A-Z]\d|^D-M9/i, competitorSeries: 'D- 磁性開關', airtacSeriesIds: ['cms', 'dms', 'ems'],
    note: 'SMC D- 系列磁性開關：有接點(磁簧式)對應 CMS，無接點(電子式)對應 DMS/EMS。',
    decode: `SMC D- 磁性開關解碼:
- D-A9□/A5□/A6□ = 有接點磁簧式 (reed): A93=2線式, A96=3線式
- D-M9□ = 無接點電子式 (solid state): M9B=2線式, M9N=3線式NPN, M9P=3線式PNP
- 尾碼 V=垂直出線, W=雙色指示, 數字L=導線長(如 L=3m, Z=5m, 無記號=0.5m)
→ AirTAC 對應: 磁簧式(A9□)→CMS 系列; 電子式(M9□)→DMS 系列 (2線/3線依型錄選項對應); 出線長依 AirTAC 選項選最接近` },
  { brand: 'SMC', pattern: /^T[USH]\d{4}|^TU\d/i, competitorSeries: 'TU 氣管', airtacSeriesIds: ['PU-Tube', 'UCS-Tube', 'PA-Tube', 'UWS98A', 'UN54D'], note: 'SMC TU 聚氨酯氣管對應 AirTAC US98A/UE95A PU管；捲管對應 UCS/UCE；尼龍管對應 PA12/PA6；阻燃管對應 UN54D/UWS98A。' },
  // --- Festo ---
  { brand: 'Festo', pattern: /^DSNU|^ESNU|^DSN\b|^DSN-/i, competitorSeries: 'DSNU 圓形氣缸(ISO6432)', airtacSeriesIds: ['mi'], note: '依公司對照表：Festo DSN/DSNU → AirTAC MI (PPV=兩端緩衝可調→MIC；A=附磁→S)。' },
  { brand: 'Festo', pattern: /^DNC|^DNG/i, competitorSeries: 'DNC/DNCB/DNG 標準氣缸(ISO15552)', airtacSeriesIds: ['se', 'sai'], note: '依公司對照表：Festo DNC/DNCB/DNG → AirTAC SE (或 SI，型錄未收錄 SI 時以 SE 為準)。' },
  { brand: 'Festo', pattern: /^DSBC/i, competitorSeries: 'DSBC 標準氣缸(ISO15552)', airtacSeriesIds: ['sai', 'se'], note: '依公司對照表：Festo DSBC → AirTAC SU (型錄資料未收錄 SU，暫以 SAI/SE 替代並務必在說明中註明)。' },
  { brand: 'Festo', pattern: /^DSBG/i, competitorSeries: 'DSBG 標準氣缸', airtacSeriesIds: ['sc'], note: '依公司對照表：Festo DSBG → AirTAC SC。' },
  { brand: 'Festo', pattern: /^AEN/i, competitorSeries: 'AEN 緊湊氣缸', airtacSeriesIds: ['ace'], note: '依公司對照表：Festo AEN → AirTAC ACE。' },
  { brand: 'Festo', pattern: /^DPZ/i, competitorSeries: 'DPZ 雙軸氣缸', airtacSeriesIds: ['tn'], note: '依公司對照表：Festo DPZ/DPZC → AirTAC TN。' },
  { brand: 'Festo', pattern: /^SPZ/i, competitorSeries: 'SPZ 雙桿滑台', airtacSeriesIds: ['stw'], note: '依公司對照表：Festo SPZ → AirTAC STW。' },
  { brand: 'Festo', pattern: /^SLS\b|^SLS-/i, competitorSeries: 'SLS 滑台', airtacSeriesIds: ['hlh'], note: '依公司對照表：Festo SLS → AirTAC HLH。' },
  { brand: 'Festo', pattern: /^HGW/i, competitorSeries: 'HGW 支點氣爪', airtacSeriesIds: ['hfy'], note: '依公司對照表：Festo HGW → AirTAC HFY。' },
  { brand: 'Festo', pattern: /^DHRS/i, competitorSeries: 'DHRS 180°氣爪', airtacSeriesIds: ['hfr'], note: '依公司對照表：Festo DHRS → AirTAC HFR。' },
  { brand: 'Festo', pattern: /^CLR/i, competitorSeries: 'CLR 回轉夾緊', airtacSeriesIds: ['qck'], note: '依公司對照表：Festo CLR → AirTAC QCK。' },
  { brand: 'Festo', pattern: /^DGO/i, competitorSeries: 'DGO 無桿氣缸', airtacSeriesIds: ['rms'], note: '依公司對照表：Festo DGO → AirTAC RMS。' },
  { brand: 'Festo', pattern: /^SLM/i, competitorSeries: 'SLM 無桿滑台', airtacSeriesIds: ['rmtl'], note: '依公司對照表：Festo SLM → AirTAC RMTL。' },
  { brand: 'Festo', pattern: /^ADVUL/i, competitorSeries: 'ADVUL 帶導桿緊湊缸', airtacSeriesIds: ['tacq'], note: '依公司對照表：Festo ADVUL → AirTAC TACQ。' },
  { brand: 'Festo', pattern: /^ADVU|^ADN|^AEVC|^ADVC/i, competitorSeries: 'ADVU/ADN 緊湊氣缸', airtacSeriesIds: ['acq', 'sda', 'ace'], note: '公司對照表：Festo ADVU → AirTAC ACP (型錄資料未收錄 ACP，以 ACQ 替代並註明)；ADN(ISO21287) → ACQ/SDA。' },
  { brand: 'Festo', pattern: /^DFM/i, competitorSeries: 'DFM 帶導桿氣缸', airtacSeriesIds: ['tcl', 'tsai'], note: 'Festo DFM 帶導桿氣缸對應 AirTAC TCL/TCM 三軸缸。' },
  { brand: 'Festo', pattern: /^SLT|^DGSL/i, competitorSeries: 'SLT/DGSL 迷你滑台', airtacSeriesIds: ['hlq', 'hls', 'hlf'], note: 'Festo 迷你滑台對應 AirTAC HLQ/HLS 精密滑台。' },
  { brand: 'Festo', pattern: /^HGP|^DHPS/i, competitorSeries: 'HGP/DHPS 平行氣爪', airtacSeriesIds: ['hfz', 'hfk', 'hfp'], note: 'Festo 平行氣爪對應 AirTAC HFZ/HFK 系列。' },
  { brand: 'Festo', pattern: /^DSM|^DRVS|^DRRD/i, competitorSeries: 'DSM/DRVS 擺動氣缸', airtacSeriesIds: ['hrq', 'hrs'], note: 'Festo 擺動缸對應 AirTAC HRQ 系列。' },
  { brand: 'Festo', pattern: /^DFSP|^STA[F]?/i, competitorSeries: 'STA/DFSP 阻擋氣缸', airtacSeriesIds: ['twq', 'twh', 'twg'], note: 'Festo 阻擋氣缸對應 AirTAC TWQ/TWH 系列。' },
  { brand: 'Festo', pattern: /^VUVS|^MFH|^JMFH|^VUVG/i, competitorSeries: 'VUVS/MFH 電磁閥', airtacSeriesIds: ['4V200', '4V300', '6SV', '7SV'], note: 'Festo 五口電磁閥對應 AirTAC 4V 或 6SV/7SV 系列，依口徑與流量。' },
  { brand: 'Festo', pattern: /^GRLA|^GRL[ZO]?|^GR-/i, competitorSeries: 'GRLA 調速閥', airtacSeriesIds: ['PSL'], note: 'Festo GRLA 調速接頭對應 AirTAC PSL 系列。' },
  { brand: 'Festo', pattern: /^QS[LTMYF]?/i, competitorSeries: 'QS 快插接頭', airtacSeriesIds: ['PC', 'PL', 'PE', 'PEG'], note: 'Festo QS 快插接頭：QS直通公牙→PC、QSL彎頭→PL(spec選L型)、QST三通→PE(spec選PE)、減徑→PEG。' },
  { brand: 'Festo', pattern: /^MS[4-9]|^FRC|^LFR/i, competitorSeries: 'MS/FRC 氣源處理', airtacSeriesIds: ['GC', 'GFC', 'GFR', 'GF', 'GR'], note: 'Festo MS/FRC 系列 FRL 對應 AirTAC G 系列氣源處理(GFR/GC等)。' },
  { brand: 'Festo', pattern: /^U-\d|^AMTE/i, competitorSeries: 'U 消聲器', airtacSeriesIds: ['BSL'], note: 'Festo U 系列消聲器對應 AirTAC BSL。' },
  // --- Mindman (金器) ---
  { brand: 'Mindman', pattern: /^MCQV2/i, competitorSeries: 'MCQV2 標準氣缸(ISO15552)', airtacSeriesIds: ['se', 'sai'], note: '依公司對照表：Mindman MCQV2 → AirTAC SE。' },
  { brand: 'Mindman', pattern: /^MCQI/i, competitorSeries: 'MCQI2 標準氣缸', airtacSeriesIds: ['se', 'sai'], note: '依公司對照表：Mindman MCQI2 → AirTAC SI (型錄未收錄 SI，以 SE/SAI 替代並註明)。' },
  { brand: 'Mindman', pattern: /^MCQV(?!2)/i, competitorSeries: 'MCQV 標準氣缸', airtacSeriesIds: ['sg'], note: '依公司對照表：Mindman MCQV → AirTAC SGC (鋁管，型錄 id: sg，規格代號選 SGC)。' },
  { brand: 'Mindman', pattern: /^MCQA/i, competitorSeries: 'MCQA 標準氣缸', airtacSeriesIds: ['sc'], note: '依公司對照表：Mindman MCQA → AirTAC SC。' },
  { brand: 'Mindman', pattern: /^MCJQ/i, competitorSeries: 'MCJQ 薄型氣缸', airtacSeriesIds: ['acq'], note: '依公司對照表：Mindman MCJQ → AirTAC ACQ。' },
  { brand: 'Mindman', pattern: /^MCJA/i, competitorSeries: 'MCJA 薄型氣缸', airtacSeriesIds: ['sda'], note: '依公司對照表：Mindman MCJA → AirTAC SDA。格式 MCJA-[動作]-[缸徑]-[行程][M=附磁]：例 MCJA-11-32-25M → SDA32x25S。' },
  { brand: 'Mindman', pattern: /^MCJI/i, competitorSeries: 'MCJI 緊湊氣缸', airtacSeriesIds: ['ace'], note: '依公司對照表：Mindman MCJI → AirTAC ACE。' },
  { brand: 'Mindman', pattern: /^MCGI/i, competitorSeries: 'MCGI 帶導桿薄型缸', airtacSeriesIds: ['tacq'], note: '依公司對照表：Mindman MCGI → AirTAC TACQ。' },
  { brand: 'Mindman', pattern: /^MCMI/i, competitorSeries: 'MCMI 迷你氣缸(ISO6432)', airtacSeriesIds: ['mi'], note: '依公司對照表：Mindman MCMI → AirTAC MI / MIC。' },
  { brand: 'Mindman', pattern: /^MCMJP/i, competitorSeries: 'MCMJP 針型氣缸', airtacSeriesIds: ['mpe', 'mpg'], note: '依公司對照表：Mindman MCMJP → AirTAC MPE / MPG。' },
  { brand: 'Mindman', pattern: /^MCMJ(?!P)/i, competitorSeries: 'MCMJ 筆型氣缸', airtacSeriesIds: ['pb'], note: '依公司對照表：Mindman MCMJ → AirTAC PB。格式 MCMJ-[動作]-[缸徑]-[行程][M=附磁]：例 MCMJ-11-16-50 → PB16x50。' },
  { brand: 'Mindman', pattern: /^MCMA/i, competitorSeries: 'MCMA 迷你氣缸', airtacSeriesIds: ['ma'], note: '依公司對照表：Mindman MCMA → AirTAC MA / MAC。' },
  { brand: 'Mindman', pattern: /^MCMB/i, competitorSeries: 'MCMB 迷你氣缸', airtacSeriesIds: ['mf'], note: '依公司對照表：Mindman MCMB → AirTAC MF / MFC；MCMBR → MAR。' },
  { brand: 'Mindman', pattern: /^MCCG/i, competitorSeries: 'MCCG 氣缸', airtacSeriesIds: ['mg'], note: '依公司對照表：Mindman MCCG → AirTAC MG / MGC。' },
  { brand: 'Mindman', pattern: /^MCDA/i, competitorSeries: 'MCDA 雙軸氣缸', airtacSeriesIds: ['tn'], note: '依公司對照表：Mindman MCDA → AirTAC TN。' },
  { brand: 'Mindman', pattern: /^MCFA|^MCFB/i, competitorSeries: 'MCFA/MCFB 自由安裝氣缸', airtacSeriesIds: ['md', 'mk', 'mu'], note: '依公司對照表：Mindman MCFA → AirTAC MD；MCFA-K → MK；MCFB → MU。' },
  { brand: 'Mindman', pattern: /^MCSS|^MCSH/i, competitorSeries: 'MCSS/MCSH 滑台', airtacSeriesIds: ['hls', 'hlh'], note: '依公司對照表：Mindman MCSS → AirTAC HLS；MCSH → HLH。' },
  { brand: 'Mindman', pattern: /^MCRQ/i, competitorSeries: 'MCRQ 回轉氣缸', airtacSeriesIds: ['hrq'], note: '依公司對照表：Mindman MCRQ → AirTAC HRQ。' },
  { brand: 'Mindman', pattern: /^MCGB|^MCGA/i, competitorSeries: 'MCGB/MCGA 標準氣缸', airtacSeriesIds: ['sc', 'se', 'sai'], note: 'Mindman 標準氣缸對應 AirTAC SC/SE 系列。' },
  { brand: 'Mindman', pattern: /^MCGS/i, competitorSeries: 'MCGS 帶導桿氣缸', airtacSeriesIds: ['tcl'], note: 'Mindman MCGS 帶導桿缸對應 AirTAC TCL/TCM。' },
  { brand: 'Mindman', pattern: /^MCH[ABCY]/i, competitorSeries: 'MCH 氣爪', airtacSeriesIds: ['hfy', 'hfp', 'hfz', 'hfr'], note: '依公司對照表：Mindman MCHA→HFY、MCHB→HFP、MCHC→HFZ、MCHY→HFR。' },
  { brand: 'Mindman', pattern: /^MVSC/i, competitorSeries: 'MVSC 電磁閥', airtacSeriesIds: ['4V100', '4V200', '4V300', '4V400', '3V100', '3V200', '3V300'], note: '依公司對照表：Mindman MVSC-180→4V100、MVSC-220→4V200、MVSC-300→4V300、MVSC-460→4V400；型號中「-3E1」等 3 開頭=三口→3V100/3V200/3V300，「-4E1」=五口二位單電控(→10)，「-4E2」=雙電控(→20)。' },
  { brand: 'Mindman', pattern: /^MVSY/i, competitorSeries: 'MVSY 電磁閥', airtacSeriesIds: ['7SV'], note: '依公司對照表：Mindman MVSY-156 → AirTAC 7V100；MVSY-188 → 7V200 (型錄 id 7SV)。' },
  { brand: 'Mindman', pattern: /^MVSN/i, competitorSeries: 'MVSN 電磁閥', airtacSeriesIds: ['4m'], note: '依公司對照表：Mindman MVSN → AirTAC 4M。' },
  { brand: 'Mindman', pattern: /^MACP|^MAFR|^MACT|^MAF\d|^MAL\d|^MAR\d/i, competitorSeries: 'Mindman 氣源處理', airtacSeriesIds: ['GFR', 'GC', 'GFC', 'GF', 'GR', 'GL'], note: '依公司對照表：MACT→GC(三聯)、MACP→GFC(二聯)、MAFR→GFR、MAF→GF、MAR→GR、MAL→GL。' },
  // --- PISCO ---
  { brand: 'PISCO', pattern: /^JSC/i, competitorSeries: 'JSC 調速閥', airtacSeriesIds: ['PSL'], note: 'PISCO JSC 調速接頭對應 AirTAC PSL 系列。' },
  { brand: 'PISCO', pattern: /^P[CLBEUY]\d/i, competitorSeries: 'PC/PL 快插接頭', airtacSeriesIds: ['PC', 'PL', 'PE', 'PEG'], note: 'PISCO 快插接頭命名與 AirTAC 幾乎相同：PC直通→PC、PL彎頭→PL、PE三通/PU直通(管對管)/PY→PE 系列 spec 選項、減徑類→PEG。' },
  { brand: 'PISCO', pattern: /^SL[WM]?\d/i, competitorSeries: 'SL 消聲器', airtacSeriesIds: ['BSL'], note: 'PISCO 消聲器對應 AirTAC BSL。' },
  // --- CKD (常見，雖不在下拉清單也支援自動偵測) ---
  { brand: 'CKD', pattern: /^SSD/i, competitorSeries: 'SSD 薄型氣缸', airtacSeriesIds: ['acq', 'sda'], note: 'CKD SSD 薄型缸對應 AirTAC ACQ/SDA。' },
  { brand: 'CKD', pattern: /^CMK2|^SCM/i, competitorSeries: 'CMK2/SCM 氣缸', airtacSeriesIds: ['ma', 'mi', 'sc'], note: 'CKD CMK2 對應 AirTAC MA/MI；SCM 對應 SC 系列。' },
  { brand: 'CKD', pattern: /^SCW/i, competitorSeries: 'SCW 標準氣缸', airtacSeriesIds: ['se', 'sai'], note: '依公司對照表：CKD SCW → AirTAC SE / SI。' },
  { brand: 'CKD', pattern: /^SCA2/i, competitorSeries: 'SCA2 標準氣缸', airtacSeriesIds: ['sc', 'jsi'], note: '依公司對照表：CKD SCA2 → AirTAC SC / JSI。' },
  { brand: 'CKD', pattern: /^SCP/i, competitorSeries: 'SCP 筆型氣缸', airtacSeriesIds: ['pb'], note: '依公司對照表：CKD SCP*3 → AirTAC PB。' },
  { brand: 'CKD', pattern: /^STR2/i, competitorSeries: 'STR2 雙軸氣缸', airtacSeriesIds: ['tr'], note: '依公司對照表：CKD STR2 → AirTAC TR。' },
  { brand: 'CKD', pattern: /^SMG|^SMD2|^MDC2/i, competitorSeries: 'SMG/SMD2/MDC2 氣缸', airtacSeriesIds: ['md', 'mk', 'mu'], note: '依公司對照表：CKD SMG → MD、SMD2 → MK、MDC2 → MU。' },
  { brand: 'CKD', pattern: /^LC[RGM]/i, competitorSeries: 'LCR/LCG/LCM 滑台', airtacSeriesIds: ['hlq', 'hls'], note: '依公司對照表：CKD LCR/LCG → AirTAC HLQ；LCM → HLS。' },
  { brand: 'CKD', pattern: /^GRC/i, competitorSeries: 'GRC 回轉氣缸', airtacSeriesIds: ['hrq'], note: '依公司對照表：CKD GRC → AirTAC HRQ。' },
  { brand: 'CKD', pattern: /^RCC2/i, competitorSeries: 'RCC2 回轉夾緊', airtacSeriesIds: ['qck'], note: '依公司對照表：CKD RCC2 → AirTAC QCK。' },
  { brand: 'CKD', pattern: /^MRL2/i, competitorSeries: 'MRL2 無桿氣缸', airtacSeriesIds: ['rms'], note: '依公司對照表：CKD MRL2 → AirTAC RMS。' },
  { brand: 'CKD', pattern: /^3G[ABD]/i, competitorSeries: '3G 三口電磁閥', airtacSeriesIds: ['3V100', '3V200', '3V300'], note: '依公司對照表：CKD 3GA1~3 → AirTAC 3V100~3V300。' },
  { brand: 'CKD', pattern: /^STG|^STS|^STL/i, competitorSeries: 'STG 帶導桿氣缸', airtacSeriesIds: ['tcl'], note: 'CKD STG 帶導桿缸對應 AirTAC TCL/TCM。' },
  { brand: 'CKD', pattern: /^4G[ABD]|^4K[AB]/i, competitorSeries: '4G/4K 電磁閥', airtacSeriesIds: ['4V100', '4V200', '4V300', '7SV'], note: '依公司對照表：CKD 4GA1/4GA2/4GA3 → AirTAC 4V100/4V200/4V300 (第 4 碼 1=單電控→10, 2=雙電控→20)。' },
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

/** 供 prompt 使用的知識庫摘要文字 (命中的條目會附上逐位解碼表)。 */
export function knowledgeBaseText(entries?: KnowledgeEntry[]): string {
  const matched = entries && entries.length > 0;
  const list = matched ? entries! : KNOWLEDGE_BASE;
  return list
    .map(e => {
      let text = `- [${e.brand}] ${e.competitorSeries} → AirTAC 系列id: ${e.airtacSeriesIds.join(', ')}。${e.note}`;
      // 命中特定系列時注入完整解碼表；未命中(注入全庫)時省略以控制長度
      if (matched && e.decode) {
        text += `\n<<< 原廠型錄解碼表 (絕對權威，優先於你的任何既有認知) >>>\n${e.decode}\n<<< 解碼表結束 >>>`;
      }
      return text;
    })
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

// 訂購碼產生器與前端共用同一份實作，避免兩邊邏輯漂移
export { generateOrderingCode };

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
    const code = String(sel.code ?? '');
    const opt = (cat.options || []).find(o => o.code === code);
    // 自由數值類別 (無桿缸行程等)：任何數字都合法
    if (!opt && isFreeValueCategory(cat) && /^\d+(\.\d+)?$/.test(code)) {
      selections[sel.categoryId] = code;
      continue;
    }
    if (!opt) {
      const valid = (cat.options || []).map(o => (o.code === '' ? '(空白)' : o.code)).join(', ');
      if (/stroke/i.test(cat.id) && /^\d+$/.test(code)) {
        warnings.push(`「${cat.name}」${code} 不是型錄標準行程 (標準: ${valid})；亞德客多可訂製非標準行程，請與業務確認交期。`);
      } else {
        warnings.push(`「${cat.name}」代碼「${code === '' ? '(空白)' : code}」不在型錄合法選項內 (可選: ${valid})。`);
      }
      // 保留 AI 給的代碼，不要默默換成第一個選項 —— 否則訂購碼規格會被偷換
      // (例如非標準行程 120 變成 25) 而且看起來還像「驗證過」的樣子。
      selections[sel.categoryId] = code;
      continue;
    }
    selections[sel.categoryId] = code;
  }

  // 關鍵尺寸參數沒給就會套用第一個選項 (如缸徑 6mm)，必須提醒
  const KEY_PARAMS = /^(bore|stroke|size|port|port_size|diameter|tube)$/i;
  for (const cat of series.categories || []) {
    if (KEY_PARAMS.test(cat.id) && selections[cat.id] === undefined && (cat.options || []).length > 1) {
      const def = cat.options[0]?.code;
      warnings.push(`未指定「${cat.name}」，暫用預設值「${def === '' ? '(空白)' : def}」，請依實際規格修改。`);
    }
  }

  const serverGeneratedCode = generateOrderingCode(series, selections);

  // 比對 AI 給的訂購碼與伺服器重建的訂購碼 (忽略空白/大小寫差異)
  const normalize = (s: string) => s.replace(/[\s\-–—]+/g, '').toUpperCase();
  const ai = normalize(rec.fullOrderingCode || '');
  const server = normalize(serverGeneratedCode || '');
  // AI 只是省略了尾端的預設選項 (如 7V110-06B vs 7V110-06B050、GFR200-08 vs GFR20008F1) 不算矛盾
  const aiIsPrefix = ai.length >= 3 && server.startsWith(ai);
  // 字元完全相同只是順序不同 (如 TCMS20-50 vs TCM20-50S)：AI 只是把代碼寫錯位置，以型錄格式為準即可
  const sameChars = ai.length > 0 && ai.split('').sort().join('') === server.split('').sort().join('');
  if (rec.fullOrderingCode && serverGeneratedCode && ai !== server && !aiIsPrefix && !sameChars) {
    warnings.push(`AI 產生的訂購碼「${rec.fullOrderingCode}」與依型錄規則重建的「${serverGeneratedCode}」不一致，請以型錄驗證版本為準。`);
  }

  return {
    catalogVerified: warnings.length === 0,
    seriesFound: true,
    warnings,
    serverGeneratedCode,
  };
}
