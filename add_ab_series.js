import fs from 'fs';
const file = 'src/data/catalog-air-prep.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const threadOptions = [
  { code: '', description: 'PT牙' },
  { code: 'G', description: 'G牙' },
  { code: 'T', description: 'NPT牙' }
];

const drainOptions = [
  { code: '', description: '差壓+手動排水式' },
  { code: 'A', description: '自動排水式' }
];

const typeOptions = [
  { code: '', description: '標準型' },
  { code: 'L', description: '低壓型 (0.4MPa)' }
];

const gaugeOptions = [
  { code: '', description: '附表 (含壓力表及對應規格安裝架)' },
  { code: 'N', description: '不附表' }
];

const scaleOptions = [
  { code: '1', description: 'MPa' },
  { code: '2', description: 'psi' },
  { code: '3', description: 'bar' },
  { code: '4', description: 'kgf/cm² & psi' }
];

const filterOptions = [
  { code: '', description: '40μm級' },
  { code: 'W', description: '5μm級' }
];

const bracketOptions = [
  { code: '', description: '附支架' },
  { code: 'J', description: '不附支架' }
];

const gaugeMountOptions = [
  { code: '', description: '單側 (1500C/2000C/3000C) / 雙側 (4000C10/4000C)' },
  { code: 'D', description: '雙側 (僅適用1500C/2000C/3000C)' }
];

const modelCodeOptions = [
  { code: '1500C', description: '1500C: 1/8"' },
  { code: '2000C', description: '2000C: 1/4"' },
  { code: '3000C', description: '3000C: 3/8"' },
  { code: '4000C10', description: '4000C10: 3/8"' },
  { code: '4000C', description: '4000C: 1/2"' }
];

const abSeries = [
  {
    id: "AR-BR",
    category: "氣源處理元件",
    superGroup: "A、B系列",
    group: "調壓閥",
    name: "AR、BR系列 調壓閥",
    format: "{series}{model} {gaugeMount} {type} {bracket} {gauge} {scale} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: 'AR', description: 'A系列調壓閥'}, {code: 'BR', description: 'B系列調壓閥'}] },
      { id: "model", name: "接管口徑", options: modelCodeOptions },
      { id: "gaugeMount", name: "壓力表安裝螺紋代碼", options: gaugeMountOptions },
      { id: "type", name: "型式代碼", options: typeOptions },
      { id: "bracket", name: "支架代碼", options: bracketOptions },
      { id: "gauge", name: "壓力表代碼", options: gaugeOptions },
      { id: "scale", name: "刻度單位", options: scaleOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions }
    ]
  },
  {
    id: "AL-BL",
    category: "氣源處理元件",
    superGroup: "A、B系列",
    group: "給油器",
    name: "AL、BL系列 給油器",
    format: "{series}{model} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: 'AL', description: 'A系列給油器'}, {code: 'BL', description: 'B系列給油器'}] },
      { id: "model", name: "接管口徑", options: modelCodeOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions }
    ]
  },
  {
    id: "AF-BF",
    category: "氣源處理元件",
    superGroup: "A、B系列",
    group: "過濾器",
    name: "AF、BF系列 過濾器",
    format: "{series}{model} {drain} {filter} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: 'AF', description: 'A系列過濾器'}, {code: 'BF', description: 'B系列過濾器'}] },
      { id: "model", name: "接管口徑", options: modelCodeOptions },
      { id: "drain", name: "排水方式", options: drainOptions },
      { id: "filter", name: "過濾精度", options: filterOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions }
    ]
  },
  {
    id: "AFR-BFR",
    category: "氣源處理元件",
    superGroup: "A、B系列",
    group: "調壓過濾器",
    name: "AFR、BFR系列 調壓過濾器",
    format: "{series}{model} {gaugeMount} {drain} {type} {bracket} {gauge} {scale} {filter} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: 'AFR', description: 'A系列調壓過濾器'}, {code: 'BFR', description: 'B系列調壓過濾器'}] },
      { id: "model", name: "接管口徑", options: modelCodeOptions },
      { id: "gaugeMount", name: "壓力表安裝螺紋代碼", options: gaugeMountOptions },
      { id: "drain", name: "排水方式", options: drainOptions },
      { id: "type", name: "型式代碼", options: typeOptions },
      { id: "bracket", name: "支架代碼", options: bracketOptions },
      { id: "gauge", name: "壓力表代碼", options: gaugeOptions },
      { id: "scale", name: "刻度單位", options: scaleOptions },
      { id: "filter", name: "過濾精度", options: filterOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions }
    ]
  },
  {
    id: "AC-BC",
    category: "氣源處理元件",
    superGroup: "A、B系列",
    group: "三聯件(F+R+L)",
    name: "AC、BC系列 三聯件",
    format: "{series}{model} {drain} {type} {gauge} {scale} {filter} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: 'AC', description: 'A系列三聯件'}, {code: 'BC', description: 'B系列三聯件'}] },
      { id: "model", name: "接管口徑", options: modelCodeOptions },
      { id: "drain", name: "排水方式", options: drainOptions },
      { id: "type", name: "型式代碼", options: typeOptions },
      { id: "gauge", name: "壓力表代碼", options: gaugeOptions },
      { id: "scale", name: "刻度單位", options: scaleOptions },
      { id: "filter", name: "過濾精度", options: filterOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions }
    ]
  },
  {
    id: "AFC-BFC",
    category: "氣源處理元件",
    superGroup: "A、B系列",
    group: "二聯件(F.R+L)",
    name: "AFC、BFC系列 二聯件",
    format: "{series}{model} {drain} {type} {gauge} {scale} {filter} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: [{code: 'AFC', description: 'A系列二聯件'}, {code: 'BFC', description: 'B系列二聯件'}] },
      { id: "model", name: "接管口徑", options: modelCodeOptions },
      { id: "drain", name: "排水方式", options: drainOptions },
      { id: "type", name: "型式代碼", options: typeOptions },
      { id: "gauge", name: "壓力表代碼", options: gaugeOptions },
      { id: "scale", name: "刻度單位", options: scaleOptions },
      { id: "filter", name: "過濾精度", options: filterOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions }
    ]
  }
];

data.series.push(...abSeries);

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('AB series added.');
