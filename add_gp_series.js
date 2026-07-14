import fs from 'fs';
const file = 'src/data/catalog-air-prep.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const threadOptions = [
  { code: '', description: 'PT牙' },
  { code: 'G', description: 'G牙' },
  { code: 'T', description: 'NPT牙' }
];

const cupOptions = [
  { code: '', description: 'PC杯' },
  { code: 'C', description: '金屬杯' },
  { code: 'N', description: '尼龍杯' }
];

const bracketOptions = [
  { code: '', description: '附支架' },
  { code: 'J', description: '不附支架' }
];

const gaugeOptions = [
  { code: '', description: '圓表卡扣式' },
  { code: 'N', description: '不附表' }
];

const drainOptions = [
  { code: '', description: '差壓+手動排水式' },
  { code: 'A', description: '自動排水式' }
];

const portOptions = [
  { code: '06', description: '1/8" (200系列)' },
  { code: '08', description: '1/4" (200/300系列)' },
  { code: '10', description: "3/8\" (300/400系列)" },
  { code: "15", description: "1/2\" (400系列)" }
];

const gpfrSeries = {
  id: "GPFR",
  category: "氣源處理元件",
  superGroup: "GP系列",
  group: "調壓精密過濾器",
  name: "GPFR系列 調壓精密過濾器",
  format: "GPFR{series} {cup} {port} {drain} {type} {bracket} {gauge} {filter} {thread}",
  categories: [
    {
      id: "series",
      name: "系列代號",
      options: [
        { code: "200", description: "200系列" },
        { code: "300", description: "300系列" },
        { code: "400", description: "400系列" }
      ]
    },
    { id: "cup", name: "杯體材質", options: cupOptions },
    { id: "port", name: "接管口徑", options: portOptions },
    { id: "drain", name: "排水方式", options: drainOptions },
    {
      id: "type",
      name: "型式代碼",
      options: [
        { code: "S", description: "標準型" },
        { code: "L", description: "低壓型" }
      ]
    },
    { id: "bracket", name: "支架代碼", options: bracketOptions },
    { id: "gauge", name: "壓力表代碼", options: gaugeOptions },
    {
      id: "filter",
      name: "過濾精度",
      options: [
        { code: "M", description: "0.3μm級" },
        { code: "D", description: "0.01μm級" }
      ]
    },
    { id: "thread", name: "牙型代碼", options: threadOptions }
  ]
};

const gprSeries = {
  id: "GPR",
  category: "氣源處理元件",
  superGroup: "GP系列",
  group: "精密調壓閥",
  name: "GPR系列 精密調壓閥",
  format: "GPR{series} {port} {type} {bracket} {gauge} {thread}",
  categories: [
    {
      id: "series",
      name: "系列代號",
      options: [
        { code: "200", description: "200系列" },
        { code: "300", description: "300系列" },
        { code: "400", description: "400系列" }
      ]
    },
    { id: "port", name: "接管口徑", options: portOptions },
    {
      id: "type",
      name: "設定壓力範圍",
      options: [
        { code: "L", description: "低壓型 0.005~0.2MPa" },
        { code: "M", description: "中壓型 0.01~0.4MPa" },
        { code: "H", description: "高壓型 0.01~0.8MPa" }
      ]
    },
    { id: "bracket", name: "支架代碼", options: bracketOptions },
    { id: "gauge", name: "壓力表代碼", options: gaugeOptions },
    { id: "thread", name: "牙型代碼", options: threadOptions }
  ]
};

const gpfSeries = {
  id: "GPF",
  category: "氣源處理元件",
  superGroup: "GP系列",
  group: "油霧分離器",
  name: "GPF系列 油霧分離器",
  format: "GPF{series} {cup} {port} {drain} {bracket} {filter} {thread}",
  categories: [
    {
      id: "series",
      name: "系列代號",
      options: [
        { code: "200", description: "200系列" },
        { code: "300", description: "300系列" },
        { code: "400", description: "400系列" }
      ]
    },
    { id: "cup", name: "杯體材質", options: cupOptions },
    { id: "port", name: "接管口徑", options: portOptions },
    { id: "drain", name: "排水方式", options: drainOptions },
    { id: "bracket", name: "支架代碼", options: bracketOptions },
    {
      id: "filter",
      name: "過濾精度",
      options: [
        { code: "M", description: "0.3μm" },
        { code: "D", description: "0.01μm" }
      ]
    },
    { id: "thread", name: "牙型代碼", options: threadOptions }
  ]
};

data.series.push(gpfrSeries);
data.series.push(gprSeries);
data.series.push(gpfSeries);

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('GP series added.');
