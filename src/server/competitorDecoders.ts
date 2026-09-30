/**
 * 競品型號「確定性」解碼器。
 *
 * AI 讀型號偶爾會看錯位數 (例如把 SY7220 的「2=雙電控」讀成三位閥)，而且不同備援模型的
 * 品質不一。對於編碼規則固定、又最常被詢問的系列，這裡直接用程式拆出缸徑/行程/磁石/
 * 口徑/電壓/機能，並依「公司對照表」給出 AirTAC 系列與選項：
 *   - 解碼結果以「確定值」注入 AI 提示
 *   - AI 回傳後，同系列推薦的對應參數會被強制校正，訂購碼重新產生
 *   - 只輸出百分之百確定的欄位；其餘 (安裝方式、配件等) 仍交給 AI 判斷
 */
import { defaultCatalog } from "../data/index";
import type { CatalogSeries } from "../data/types";

export interface DecodedCompetitor {
  /** 例: "SMC SY5000 電磁閥" */
  family: string;
  /** 逐段解析說明 (給 AI 與使用者看) */
  facts: string[];
  /** 依公司對照表的 AirTAC 對應 (系列 + 確定的選項) */
  target?: { seriesId: string; selections: Record<string, string> };
}

const seriesById = new Map<string, CatalogSeries>(defaultCatalog.map(s => [s.id, s]));

/** 只保留型錄中存在的選項 (行程例外：非標準行程可訂製，保留數字)。 */
function keepValid(seriesId: string, sel: Record<string, string | undefined>): Record<string, string> {
  const s = seriesById.get(seriesId);
  const out: Record<string, string> = {};
  if (!s) return out;
  for (const [k, v] of Object.entries(sel)) {
    if (v === undefined) continue;
    const cat = s.categories.find(c => c.id === k);
    if (!cat) continue;
    if (cat.options.some(o => o.code === v) || (/stroke/i.test(k) && /^\d+$/.test(v))) out[k] = v;
  }
  return out;
}

const SMC_VOLTAGE: Record<string, [string, string]> = {
  "5": ["B", "DC24V"], "6": ["F", "DC12V"], "3": ["C", "AC110V"], "4": ["A", "AC220V"],
  "1": ["C", "AC100V (AirTAC 以 AC110V 對應，請確認)"], "2": ["A", "AC200V (AirTAC 以 AC220V 對應，請確認)"],
};
const SMC_FUNCTION: Record<string, [string, string]> = {
  "1": ["10", "二位單電控"], "2": ["20", "二位雙電控"], "3": ["30C", "三位中位封閉"], "4": ["30E", "三位中位排氣"], "5": ["30P", "三位中位供壓"],
};
/** SMC 牙規代碼 → AirTAC 口徑代碼 (閥類/氣源處理) */
const SMC_PORT_TO_AIRTAC: Record<string, [string, string]> = {
  "M5": ["M5", "M5"], "01": ["06", '1/8"'], "02": ["08", '1/4"'], "03": ["10", '3/8"'], "04": ["15", '1/2"'], "06": ["20", '3/4"'], "10": ["25", '1"'],
};
const SMC_THREAD: Record<string, [string, string]> = { "": ["", "Rc(PT)牙"], F: ["G", "G牙"], N: ["T", "NPT牙"], T: ["T", "NPTF牙(以NPT對應)"] };

type Decoder = (m: string) => DecodedCompetitor | null;

const decoders: Decoder[] = [
  // ---------- SMC SY 電磁閥 → AirTAC 7V (公司表 SY3/5/7/9*00 → 7V050/100/200/300) ----------
  (m) => {
    const r = m.match(/^SY([3579])([1-5])(\d{2})[A-Z]?-([0-9VSR])([A-Z]*)-(M5|0[1-3]|C(?:4|6|8|10|12))([FNT]?)/);
    if (!r) return null;
    const [, size, fn, mount, volt, , port, thr] = r;
    const seriesCode = { "3": "05", "5": "1", "7": "2", "9": "3" }[size]!;
    const [ctrl, fnText] = SMC_FUNCTION[fn];
    const v = SMC_VOLTAGE[volt];
    const quick = port.startsWith("C");
    const portCode = quick ? port.slice(1).padStart(2, "0") : SMC_PORT_TO_AIRTAC[port]?.[0];
    const facts = [
      `SY${size}000 系列 → AirTAC 7V${seriesCode === "05" ? "050" : seriesCode + "00"} (公司對照表)`,
      `第2碼 ${fn} = ${fnText} → controlType ${ctrl}`,
      `${mount === "20" ? "20 = 本體直接配管" : `${mount} = 底座配管型 (需另配 7V 底座)`}`,
      `電壓碼 ${volt} = ${v ? v[1] : "未知"}${v ? ` → ${v[0]}` : ""}`,
      quick ? `口徑 ${port} = Φ${portCode}快插 → portConnType J + port ${portCode}` : `口徑 ${port} = ${SMC_PORT_TO_AIRTAC[port]?.[1]} → port ${portCode}`,
      `牙型 ${thr || "(無)"} = ${SMC_THREAD[thr]?.[1]}`,
      "SMC 附導線/插座 (G/L/M 等) → AirTAC 端子線長 050 (0.5m)",
    ];
    if (mount !== "20") return { family: `SMC SY${size}000 電磁閥 (底座型)`, facts };
    return {
      family: `SMC SY${size}000 電磁閥`, facts,
      target: {
        seriesId: "7SV",
        selections: keepValid("7SV", {
          seriesCode, controlType: ctrl, portConnType: quick ? "J" : "", port: portCode,
          voltage: v?.[0], leadLength: "050", thread: SMC_THREAD[thr]?.[0],
        }),
      },
    };
  },

  // ---------- SMC VFS1000/2000/3000 → AirTAC 4V100/200/300 (公司表) ----------
  (m) => {
    const r = m.match(/^VFS([123])([1-5])\d{2}[A-Z]?-([0-9])([A-Z]*)-(M5|0[1-4])([FNT]?)/);
    if (!r) return null;
    const [, size, fn, volt, , port, thr] = r;
    const seriesId = `4V${size}00`;
    const [ctrl, fnText] = SMC_FUNCTION[fn];
    const v = SMC_VOLTAGE[volt];
    const p = SMC_PORT_TO_AIRTAC[port];
    return {
      family: `SMC VFS${size}000 電磁閥`,
      facts: [
        `VFS${size}000 → AirTAC ${seriesId} (公司對照表)`,
        `第2碼 ${fn} = ${fnText} → ${ctrl}`,
        `電壓碼 ${volt} = ${v ? v[1] : "未知"}${v ? ` → ${v[0]}` : ""}`,
        `口徑 ${port} = ${p?.[1]} → ${p?.[0]}`,
      ],
      target: { seriesId, selections: keepValid(seriesId, { controlType: ctrl, port: p?.[0], voltage: v?.[0], thread: SMC_THREAD[thr]?.[0] }) },
    };
  },

  // ---------- SMC CQ2 / CDQ2 薄型氣缸 → AirTAC ACQ ----------
  (m) => {
    const r = m.match(/^C(D?)Q2(W?)([AB]?)(\d{2,3})-(\d{1,3})([DST]?)/);
    if (!r) return null;
    const [, d, w, mountLetter, bore, stroke, action] = r;
    const series = w ? "ACQD" : action === "S" ? "ASQ" : action === "T" ? "ATQ" : "ACQ";
    return {
      family: "SMC CQ2 薄型氣缸",
      facts: [
        `C${d ? "D" : ""}Q2 → AirTAC ACQ (公司對照表)；${d ? "CD = 附磁石 → S" : "無 D = 不附磁石"}`,
        `缸徑 ${bore}、行程 ${stroke}${w ? "、W = 雙軸 → ACQD" : ""}${action === "S" ? "、S = 單動押出 → ASQ" : action === "T" ? "、T = 單動引入 → ATQ" : "、復動"}`,
        mountLetter ? `安裝 ${mountLetter} = ${mountLetter === "B" ? "通孔基本型" : "兩端螺孔型"} → ACQ 標準安裝 (空白)` : "",
      ].filter(Boolean),
      target: { seriesId: "acq", selections: keepValid("acq", { series, bore, stroke, magnet: d ? "S" : "", mounting_type: mountLetter ? "" : undefined }) },
    };
  },

  // ---------- SMC CJ2 / CDJ2 筆型氣缸 → AirTAC PB (公司表) ----------
  (m) => {
    const r = m.match(/^C(D?)J2([A-Z]?)(\d{1,2})-(\d{1,3})(?![0-9])/);
    if (!r) return null;
    const [, d, , bore, stroke] = r;
    return {
      family: "SMC CJ2 筆型氣缸",
      facts: [`CJ2 → AirTAC PB (公司對照表)；${d ? "CD = 附磁石 → S" : "不附磁石"}`, `缸徑 ${bore}、行程 ${stroke}`],
      target: { seriesId: "pb", selections: keepValid("pb", { bore, stroke, magnet: d ? "S" : "" }) },
    };
  },

  // ---------- SMC CM2 / CDM2 圓形氣缸 → AirTAC MF (公司表) ----------
  (m) => {
    const r = m.match(/^C(D?)M2([A-Z]{0,2})(\d{2})-(\d{1,4})/);
    if (!r) return null;
    const [, d, , bore, stroke] = r;
    return {
      family: "SMC CM2 圓形氣缸",
      facts: [`CM2 → AirTAC MF (公司對照表，MFC 為緩衝可調型)；${d ? "CD = 附磁石 → S" : "不附磁石"}`, `缸徑 ${bore}、行程 ${stroke}`],
      target: { seriesId: "mf", selections: keepValid("mf", { bore, stroke, magnet: d ? "S" : "" }) },
    };
  },

  // ---------- SMC MGP 三軸氣缸 → AirTAC TCL / TCM ----------
  (m) => {
    const r = m.match(/^MGP([MLA])(\d{2,3})-(\d{1,3})/);
    if (!r) return null;
    const [, b, bore, stroke] = r;
    const bearing = b === "M" ? "M" : "L";
    return {
      family: "SMC MGP 三軸氣缸",
      facts: [`MGP${b} → AirTAC TC${bearing} (${b === "M" ? "滑動軸承→銅套 M" : "滾珠軸承→直線軸承 L"}，公司對照表)`, `缸徑 ${bore}、行程 ${stroke}；SMC 標配磁石 → S`],
      target: { seriesId: "tcl", selections: keepValid("tcl", { bearing, bore, stroke, magnet: "S" }) },
    };
  },

  // ---------- SMC MXS / MXQ 滑台 → AirTAC HLS / HLQ ----------
  (m) => {
    const r = m.match(/^MX([SQ])(L?)(\d{1,2})-(\d{1,3})/);
    if (!r) return null;
    const [, t, , bore, stroke] = r;
    const seriesId = t === "S" ? "hls" : "hlq";
    return {
      family: `SMC MX${t} 滑台`,
      facts: [`MX${t} → AirTAC ${seriesId.toUpperCase()} (公司對照表)`, `缸徑 ${bore}、行程 ${stroke}`],
      target: { seriesId, selections: keepValid(seriesId, { type: seriesId.toUpperCase(), bore, stroke, magnet: "S" }) },
    };
  },

  // ---------- SMC CXS 雙軸氣缸 → AirTAC TR (公司表) ----------
  (m) => {
    const r = m.match(/^CXS([ML]?)(\d{1,2})-(\d{1,3})/);
    if (!r) return null;
    const [, , bore, stroke] = r;
    return {
      family: "SMC CXS 雙軸氣缸",
      facts: ["CXS → AirTAC TR (公司對照表)", `缸徑 ${bore}、行程 ${stroke}`],
      target: { seriesId: "tr", selections: keepValid("tr", { bore, stroke, magnet: "S" }) },
    };
  },

  // ---------- SMC KQ2 快插接頭 → AirTAC PC / PL / PE 系列 ----------
  (m) => {
    const r = m.match(/^KQ2([HLTUYE])(\d{2})-(M5|0[1-4]|00)/);
    if (!r) return null;
    const [, shape, od, thr] = r;
    const tube = String(Number(od));
    if (shape === "H" && thr !== "00") {
      return { family: "SMC KQ2H 公牙直通", facts: [`KQ2H → AirTAC PC；管徑 Φ${tube}、牙 ${thr}`], target: { seriesId: "PC", selections: keepValid("PC", { spec: "PC", tube_od: tube, thread_spec: thr }) } };
    }
    if (shape === "L" && thr !== "00") {
      return { family: "SMC KQ2L 公牙彎頭", facts: [`KQ2L → AirTAC PL；管徑 Φ${tube}、牙 ${thr}`], target: { seriesId: "PL", selections: keepValid("PL", { spec: "PL", tube_od: tube, thread_spec: thr }) } };
    }
    const spec = { T: "PE", U: "PU", Y: "PY", L: "PV", E: "PM" }[shape];
    if (thr === "00" && spec) {
      return { family: `SMC KQ2${shape} 管對管接頭`, facts: [`KQ2${shape}(管對管) → AirTAC PE 系列 spec ${spec}；管徑 Φ${tube}`], target: { seriesId: "PE", selections: keepValid("PE", { spec, tube_od: tube }) } };
    }
    return null;
  },

  // ---------- SMC AS 附快插調速接頭 → AirTAC PSL ----------
  (m) => {
    const r = m.match(/^AS([1-4])\d{2}1F-(M5|0[1-4])-(\d{2})/);
    if (!r) return null;
    const [, , thr, od] = r;
    const tube = String(Number(od));
    return {
      family: "SMC AS 調速接頭 (附快插)",
      facts: [`AS…1F (彎頭附快插) → AirTAC PSL；牙 ${thr}、管徑 Φ${tube}`],
      target: { seriesId: "PSL", selections: keepValid("PSL", { spec: "PSL", tube_od: tube, thread_spec: thr }) },
    };
  },

  // ---------- SMC AW / AR / AF / AL / AC 氣源處理 → AirTAC GFR / GR / GF / GL / GC / GFC ----------
  (m) => {
    const r = m.match(/^A([WRFLC])(20|30|40)(A?)-(0[1-4]|06|10)([A-Z]*)/);
    if (!r) return null;
    const [, kind, size, a, port, opts] = r;
    const seriesId = kind === "W" ? "GFR" : kind === "R" ? "GR" : kind === "F" ? "GF" : kind === "L" ? "GL" : a ? "GFC" : "GC";
    const series = `${size}0`;
    const p = SMC_PORT_TO_AIRTAC[port];
    const sel: Record<string, string | undefined> = { series, port: p?.[0] };
    const facts = [`A${kind}${size}${a} → AirTAC ${seriesId}${series} (公司對照表)`, `口徑 ${port} = ${p?.[1]} → ${p?.[0]}`];
    if (seriesId === "GFR" || seriesId === "GR") {
      sel.bracket = opts.includes("B") ? "" : "J";
      sel.gauge = opts.includes("G") ? "" : "N";
      facts.push(`${opts.includes("B") ? "B = 附支架 → 空白" : "未附支架 → J"}；${opts.includes("G") ? "G = 附壓力表 → 空白" : "未附壓力表 → N"}`);
    }
    return { family: `SMC A${kind} 氣源處理`, facts, target: { seriesId, selections: keepValid(seriesId, sel) } };
  },

  // ---------- Mindman MCJA / MCMJ / MCMI (格式 系列-動作-缸徑-行程[M]) ----------
  (m) => {
    const r = m.match(/^MC(JA|MJ|MI)-(\d{2})-(\d{1,3})-(\d{1,4})(M?)/);
    if (!r) return null;
    const [, t, action, bore, stroke, mag] = r;
    const seriesId = t === "JA" ? "sda" : t === "MJ" ? "pb" : "mi";
    if (action !== "11") return { family: `Mindman MC${t}`, facts: [`MC${t} → AirTAC ${seriesId.toUpperCase()} (公司對照表)；動作碼 ${action} 非復動，請確認`] };
    return {
      family: `Mindman MC${t}`,
      facts: [`MC${t} → AirTAC ${seriesId.toUpperCase()} (公司對照表)`, `11 = 復動、缸徑 ${bore}、行程 ${stroke}、${mag ? "M = 附磁石 → S" : "不附磁石"}`],
      target: { seriesId, selections: keepValid(seriesId, { bore, stroke, magnet: mag ? "S" : "" }) },
    };
  },

  // ---------- Festo DSNU → AirTAC MI / MIC ----------
  (m) => {
    const r = m.match(/^DSNU-(\d{1,2})-(\d{1,4})-(PPV|PPS|P)(-A)?/);
    if (!r) return null;
    const [, bore, stroke, cushion, a] = r;
    const series = cushion === "P" ? "MI" : "MIC";
    return {
      family: "Festo DSNU 圓形氣缸",
      facts: [`DSNU → AirTAC MI (公司對照表)`, `缸徑 ${bore}、行程 ${stroke}、${cushion === "P" ? "P = 彈性緩衝 → MI" : `${cushion} = 可調緩衝 → MIC`}、${a ? "A = 附磁石 → S" : "不附磁石"}`],
      target: { seriesId: "mi", selections: keepValid("mi", { series, bore, stroke, magnet: a ? "S" : "" }) },
    };
  },

  // ---------- CKD SSD2 薄型氣缸 → AirTAC ACQ (公司表) ----------
  (m) => {
    const r = m.match(/^SSD2?-(?:L-)?(\d{2,3})-(\d{1,3})(?![0-9])/);
    if (!r) return null;
    const [, bore, stroke] = r;
    return {
      family: "CKD SSD 薄型氣缸",
      facts: ["SSD2 → AirTAC ACQ (公司對照表)", `缸徑 ${bore}、行程 ${stroke}`],
      target: { seriesId: "acq", selections: keepValid("acq", { series: "ACQ", bore, stroke }) },
    };
  },
];

/** 解碼單一競品型號；組合輸入 (A + B) 或不認得的型號回傳 null。 */
export function decodeCompetitor(input: string): DecodedCompetitor | null {
  const raw = String(input || "").trim().toUpperCase();
  if (!raw || /[+＋,，;；\n]/.test(raw)) return null;
  const m = raw.replace(/\s+/g, "");
  for (const d of decoders) {
    const r = d(m);
    if (r) return r;
  }
  return null;
}
