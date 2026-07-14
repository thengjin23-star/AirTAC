import fs from 'fs';
const file = 'src/data/catalog-air-prep.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const threadOptions = [
  { code: '', description: 'PT牙' },
  { code: 'G', description: 'G牙' },
  { code: 'T', description: 'NPT牙' }
];

const drainOptions = [
  { code: '', description: '差壓排水式' },
  { code: 'M', description: '手動排水式' },
  { code: 'A', description: '自動排水式' }
];

const typeOptions = [
  { code: '', description: '標準型' },
  { code: 'L', description: '低壓型' }
];

const bracketOptions = [
  { code: '', description: '附支架' },
  { code: 'J', description: '不附支架' }
];

const gaugeOptions = [
  { code: '', description: '附表' },
  { code: 'N', description: '不附表' }
];

const gaugeTypeOptions = [
  { code: 'F', description: '方形表' },
  { code: 'C', description: '圓形表' }
];

const scaleOptions = [
  { code: '1', description: 'MPa' },
  { code: '2', description: 'psi' },
  { code: '3', description: 'bar' }
];

const filterOptions = [
  { code: '', description: '40μm級' },
  { code: 'W', description: '5μm級' }
];

const checkValveOptions = [
  { code: '', description: '不附逆流閥' },
  { code: 'K', description: '附逆流閥' }
];

const portOptions = [
  { code: '06', description: '1/8" (200系列)' },
  { code: '08', description: '1/4" (200/300系列)' },
  { code: '10', description: '3/8" (300/400系列)' },
  { code: '15', description: '1/2" (300/400系列)' },
  { code: '20', description: '3/4" (600系列)' },
  { code: '25', description: '1" (600系列)' }
];

const seriesOptions = [
  { code: '200', description: '200系列' },
  { code: '300', description: '300系列' },
  { code: '400', description: '400系列' },
  { code: '600', description: '600系列' }
];

const gSeries = [
  {
    id: "GR",
    category: "氣源處理元件",
    superGroup: "G系列",
    group: "調壓閥",
    name: "GR系列 調壓閥",
    format: "GR{series} {port} {type} {bracket} {gauge} {gaugeType} {scale} {thread} {checkValve}",
    categories: [
      { id: "series", name: "系列代號", options: seriesOptions },
      { id: "port", name: "接管口徑", options: portOptions },
      { id: "type", name: "型式代碼", options: typeOptions },
      { id: "bracket", name: "支架代碼", options: bracketOptions },
      { id: "gauge", name: "壓力表代碼", options: gaugeOptions },
      { id: "gaugeType", name: "壓力表型式", options: gaugeTypeOptions },
      { id: "scale", name: "刻度單位", options: scaleOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions },
      { id: "checkValve", name: "逆流閥代碼", options: checkValveOptions }
    ]
  },
  {
    id: "GL",
    category: "氣源處理元件",
    superGroup: "G系列",
    group: "給油器",
    name: "GL系列 給油器",
    format: "GL{series} {port} {bracket} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: seriesOptions },
      { id: "port", name: "接管口徑", options: portOptions },
      { id: "bracket", name: "支架代碼", options: bracketOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions }
    ]
  },
  {
    id: "GF",
    category: "氣源處理元件",
    superGroup: "G系列",
    group: "過濾器",
    name: "GF系列 過濾器",
    format: "GF{series} {port} {drain} {bracket} {filter} {thread}",
    categories: [
      { id: "series", name: "系列代號", options: seriesOptions },
      { id: "port", name: "接管口徑", options: portOptions },
      { id: "drain", name: "排水方式", options: drainOptions },
      { id: "bracket", name: "支架代碼", options: bracketOptions },
      { id: "filter", name: "過濾精度", options: filterOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions }
    ]
  },
  {
    id: "GFR",
    category: "氣源處理元件",
    superGroup: "G系列",
    group: "調壓過濾器",
    name: "GFR系列 調壓過濾器",
    format: "GFR{series} {port} {drain} {type} {bracket} {gauge} {gaugeType} {scale} {filter} {thread} {checkValve}",
    categories: [
      { id: "series", name: "系列代號", options: seriesOptions },
      { id: "port", name: "接管口徑", options: portOptions },
      { id: "drain", name: "排水方式", options: drainOptions },
      { id: "type", name: "型式代碼", options: typeOptions },
      { id: "bracket", name: "支架代碼", options: bracketOptions },
      { id: "gauge", name: "壓力表代碼", options: gaugeOptions },
      { id: "gaugeType", name: "壓力表型式", options: gaugeTypeOptions },
      { id: "scale", name: "刻度單位", options: scaleOptions },
      { id: "filter", name: "過濾精度", options: filterOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions },
      { id: "checkValve", name: "逆流閥代碼", options: checkValveOptions }
    ]
  },
  {
    id: "GC",
    category: "氣源處理元件",
    superGroup: "G系列",
    group: "三聯件(F+R+L)",
    name: "GC系列 三聯件",
    format: "GC{series} {port} {drain} {type} {gauge} {gaugeType} {scale} {filter} {thread} {checkValve}",
    categories: [
      { id: "series", name: "系列代號", options: seriesOptions },
      { id: "port", name: "接管口徑", options: portOptions },
      { id: "drain", name: "排水方式", options: drainOptions },
      { id: "type", name: "型式代碼", options: typeOptions },
      { id: "gauge", name: "壓力表代碼", options: gaugeOptions },
      { id: "gaugeType", name: "壓力表型式", options: gaugeTypeOptions },
      { id: "scale", name: "刻度單位", options: scaleOptions },
      { id: "filter", name: "過濾精度", options: filterOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions },
      { id: "checkValve", name: "逆流閥代碼", options: checkValveOptions }
    ]
  },
  {
    id: "GFC",
    category: "氣源處理元件",
    superGroup: "G系列",
    group: "二聯件(F.R+L)",
    name: "GFC系列 二聯件",
    format: "GFC{series} {port} {drain} {type} {gauge} {gaugeType} {scale} {filter} {thread} {checkValve}",
    categories: [
      { id: "series", name: "系列代號", options: seriesOptions },
      { id: "port", name: "接管口徑", options: portOptions },
      { id: "drain", name: "排水方式", options: drainOptions },
      { id: "type", name: "型式代碼", options: typeOptions },
      { id: "gauge", name: "壓力表代碼", options: gaugeOptions },
      { id: "gaugeType", name: "壓力表型式", options: gaugeTypeOptions },
      { id: "scale", name: "刻度單位", options: scaleOptions },
      { id: "filter", name: "過濾精度", options: filterOptions },
      { id: "thread", name: "牙型代碼", options: threadOptions },
      { id: "checkValve", name: "逆流閥代碼", options: checkValveOptions }
    ]
  }
];

data.series.push(...gSeries);

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('G series added.');
