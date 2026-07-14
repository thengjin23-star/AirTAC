import fs from 'fs';
const file = 'src/data/catalog-air-prep.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const otherSeries = [
  {
    id: "GVF",
    category: "氣源處理元件",
    superGroup: "真空系列",
    group: "真空過濾器",
    name: "GVF系列 真空過濾器",
    format: "GVF{series} {cup} {port} {bracket} {filter} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: "200", description: "200系列"}, {code: "300", description: "300系列"}] },
      { id: "cup", name: "杯體材質", options: [{code: "", description: "PC杯"}, {code: "C", description: "金屬杯"}, {code: "N", description: "尼龍杯"}] },
      { id: "port", name: "接管口徑", options: [{code: "06", description: "1/8\""}, {code: "08", description: "1/4\""}, {code: "10", description: "3/8\""}, {code: "15", description: "1/2\""}] },
      { id: "bracket", name: "支架代碼", options: [{code: "", description: "附支架"}, {code: "J", description: "不附支架"}] },
      { id: "filter", name: "過濾精度", options: [{code: "", description: "40μm級"}, {code: "W", description: "5μm級"}] },
      { id: "thread", name: "牙型代碼", options: [{code: "", description: "PT牙"}, {code: "G", description: "G牙"}, {code: "T", description: "NPT牙"}] }
    ]
  },
  {
    id: "GVR",
    category: "氣源處理元件",
    superGroup: "真空系列",
    group: "真空調壓閥",
    name: "GVR系列 真空調壓閥",
    format: "GVR{series} {port} {bracket} {gauge} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: "200", description: "200系列"}, {code: "300", description: "300系列"}] },
      { id: "port", name: "接管口徑", options: [{code: "06", description: "1/8\""}, {code: "08", description: "1/4\""}, {code: "10", description: "3/8\""}] },
      { id: "bracket", name: "支架附件", options: [{code: "", description: "附支架"}, {code: "J", description: "不附支架(標準配置)"}] },
      { id: "gauge", name: "壓力表代碼", options: [{code: "", description: "附壓力表"}, {code: "N", description: "不附壓力表"}] },
      { id: "thread", name: "牙型代碼", options: [{code: "", description: "PT牙(kPa & psi)"}, {code: "G", description: "G牙(kPa & psi)"}, {code: "T", description: "NPT牙(kPa & psi)"}] }
    ]
  },
  {
    id: "SDR",
    category: "氣源處理元件",
    superGroup: "其它系列",
    group: "調壓閥",
    name: "SDR系列 調壓閥",
    format: "SDR{series} {port} {type} {bracket} {gauge} {scale} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: "100", description: "100系列"}, {code: "200", description: "200系列"}] },
      { id: "port", name: "接管口徑", options: [{code: "M5", description: "M5"}, {code: "06", description: "1/8\""}, {code: "08", description: "1/4\""}] },
      { id: "type", name: "型式代碼", options: [{code: "", description: "標準型"}, {code: "L", description: "低壓型"}] },
      { id: "bracket", name: "支架代碼", options: [{code: "", description: "附支架"}, {code: "J", description: "不附支架"}] },
      { id: "gauge", name: "壓力表代碼", options: [{code: "", description: "附表"}, {code: "N", description: "不附表"}] },
      { id: "scale", name: "刻度單位", options: [{code: "1", description: "MPa"}, {code: "2", description: "psi"}, {code: "3", description: "bar"}] },
      { id: "thread", name: "牙型代碼", options: [{code: "", description: "PT牙"}, {code: "G", description: "G牙"}, {code: "T", description: "NPT牙(M5不適用)"}] }
    ]
  },
  {
    id: "SR",
    category: "氣源處理元件",
    superGroup: "其它系列",
    group: "調壓閥",
    name: "SR系列 調壓閥",
    format: "SR{series} {port} {type} {bracket} {gauge} {scale} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: "200", description: "200系列"}] },
      { id: "port", name: "接管口徑", options: [{code: "06", description: "1/8\""}, {code: "08", description: "1/4\""}] },
      { id: "type", name: "型式代碼", options: [{code: "", description: "標準型"}, {code: "L", description: "低壓型"}] },
      { id: "bracket", name: "支架代碼", options: [{code: "", description: "附支架"}, {code: "J", description: "不附支架"}] },
      { id: "gauge", name: "壓力表代碼", options: [{code: "", description: "附表"}, {code: "N", description: "不附表"}] },
      { id: "scale", name: "刻度單位", options: [{code: "1", description: "MPa"}, {code: "2", description: "psi"}, {code: "3", description: "bar"}, {code: "4", description: "kgf/cm² & psi"}] },
      { id: "thread", name: "牙型代碼", options: [{code: "", description: "PT牙"}, {code: "G", description: "G牙"}, {code: "T", description: "NPT牙"}] }
    ]
  },
  {
    id: "SM-ARH",
    category: "氣源處理元件",
    superGroup: "其它系列",
    group: "潔淨減壓閥",
    name: "SM-ARH系列 潔淨減壓閥",
    format: "SM-ARH{series}-{port} {bracket} {gauge} {direction}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: "200", description: "200系列"}, {code: "300", description: "300系列"}] },
      { id: "port", name: "接管口徑", options: [{code: "06", description: "1/8\""}, {code: "08", description: "1/4\""}, {code: "10", description: "3/8\""}, {code: "15", description: "1/2\""}] },
      { id: "bracket", name: "支架代碼", options: [{code: "", description: "附支架"}, {code: "J", description: "不附支架"}] },
      { id: "gauge", name: "壓力表代碼", options: [{code: "", description: "附表(SM-ARH4007M)"}, {code: "N", description: "不附表"}] },
      { id: "direction", name: "壓力表方向代碼", options: [{code: "", description: "標準方向"}, {code: "R", description: "背側方向"}] }
    ]
  },
  {
    id: "F-G",
    category: "氣源處理元件",
    superGroup: "輔助元件",
    group: "壓力表",
    name: "F-G系列 壓力表",
    format: "F-G {type} {size} {max_pressure} {unit_thread}",
    categories: [
      {
        id: "type",
        name: "安裝型式",
        options: [
          {code: "S", description: "標準安裝 (GS)"},
          {code: "F", description: "面板安裝 (GF)"},
          {code: "U", description: "嵌入式安裝 (GU)"},
          {code: "P", description: "不銹鋼外殼 (GP)"},
          {code: "V", description: "眞空型 (GV)"}
        ]
      },
      {
        id: "size",
        name: "表盤外徑",
        options: [
          {code: "30", description: "外徑30"},
          {code: "40", description: "外徑40"},
          {code: "50", description: "外徑50"},
          {code: "60", description: "外徑60"}
        ]
      },
      {
        id: "max_pressure",
        name: "最大顯示壓力值",
        options: [
          {code: "02", description: "0.2MPa (僅限P型)"},
          {code: "04", description: "0.4MPa"},
          {code: "10", description: "1.0MPa / -100kPa(V型)"}
        ]
      },
      {
        id: "unit_thread",
        name: "壓力刻度單位與牙型",
        options: [
          {code: "M", description: "MPa (PT牙) - 適用S/F/U"},
          {code: "P", description: "psi (NPT牙) / MPa&psi (PT牙, P型) / kPa&psi (PT牙, V型)"},
          {code: "B", description: "bar (G牙) - 適用S/F/U"},
          {code: "Z", description: "kgf/cm² & psi (PT牙) - 適用S/F/U"},
          {code: "G", description: "MPa&bar(G牙, P型) / kPa&psi(G牙, V型)"},
          {code: "T", description: "bar&psi(NPT牙, P型) / kPa&psi(NPT牙, V型)"}
        ]
      }
    ]
  }
];

data.series.push(...otherSeries);
fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Other series added.');
