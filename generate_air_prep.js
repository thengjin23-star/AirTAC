import fs from 'fs';

const portOptions = [
  { code: 'M5', description: 'M5x0.8' },
  { code: '06', description: '1/8"' },
  { code: '08', description: '1/4"' },
  { code: '10', description: '3/8"' },
  { code: '15', description: '1/2"' },
  { code: '20', description: '3/4"' },
  { code: '25', description: '1"' }
];

const threadOptions = [
  { code: '', description: 'PT牙 (M5不適用)' },
  { code: 'G', description: 'G牙 (M5不適用)' },
  { code: 'T', description: 'NPT牙 (M5不適用)' }
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

const drainOptions = [
  { code: '', description: '差壓+手動排水式' },
  { code: 'A', description: '自動排水式' }
];

const typeOptions = [
  { code: 'S', description: '標準型' },
  { code: 'L', description: '低壓型 (0.15~0.4MPa)' }
];

const gaugeOptions = [
  { code: '', description: '圓表卡扣式' },
  { code: 'N', description: '不附表' }
];

const filterOptions = [
  { code: '', description: '40μm級' },
  { code: 'W', description: '5μm級' }
];

const checkValveOptions = [
  { code: '', description: '不附逆流閥' },
  { code: 'K', description: '附逆流閥' }
];

const seriesData = [
  {
    id: "GA-Splitter",
    category: "氣源處理元件",
    superGroup: "GA系列",
    group: "分氣塊",
    name: "GA系列 分氣塊",
    format: "GA{series} {port} {thread}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "200", description: "GA200系列" },
          { code: "300", description: "GA300系列" },
          { code: "400", description: "GA400/500系列" },
          { code: "600", description: "GA600系列" }
        ]
      },
      {
        id: "port",
        name: "接管口徑",
        options: [
          { code: "06", description: "1/8\" (200系列)" },
          { code: "08", description: "1/4\" (200/300系列)" },
          { code: "10", description: "3/8\" (300/400系列)" },
          { code: "15", description: "1/2\" (400系列)" },
          { code: "20", description: "3/4\" (600系列)" },
          { code: "25", description: "1\" (600系列)" }
        ]
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: threadOptions
      }
    ]
  },
  {
    id: "GAL",
    category: "氣源處理元件",
    superGroup: "GA系列",
    group: "給油器",
    name: "GAL系列 給油器",
    format: "GAL{series} {cup} {port} {bracket} {thread}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "100", description: "100系列" },
          { code: "200", description: "200系列" },
          { code: "300", description: "300系列" },
          { code: "400", description: "400系列" },
          { code: "500", description: "500系列" },
          { code: "600", description: "600系列" }
        ]
      },
      {
        id: "cup",
        name: "杯體材質",
        options: cupOptions
      },
      {
        id: "port",
        name: "接管口徑",
        options: portOptions
      },
      {
        id: "bracket",
        name: "支架代碼",
        options: bracketOptions
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: threadOptions
      }
    ]
  },
  {
    id: "GAR",
    category: "氣源處理元件",
    superGroup: "GA系列",
    group: "調壓閥",
    name: "GAR系列 調壓閥",
    format: "GAR{series} {port} {type} {bracket} {gauge} {thread} {checkValve}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "100", description: "100系列" },
          { code: "200", description: "200系列" },
          { code: "300", description: "300系列" },
          { code: "400", description: "400系列" },
          { code: "500", description: "500系列" },
          { code: "600", description: "600系列" }
        ]
      },
      {
        id: "port",
        name: "接管口徑",
        options: portOptions
      },
      {
        id: "type",
        name: "型式代碼",
        options: typeOptions
      },
      {
        id: "bracket",
        name: "支架代碼",
        options: bracketOptions
      },
      {
        id: "gauge",
        name: "壓力表代碼",
        options: gaugeOptions
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: threadOptions
      },
      {
        id: "checkValve",
        name: "逆流閥代碼",
        options: checkValveOptions
      }
    ]
  },
  {
    id: "GAF",
    category: "氣源處理元件",
    superGroup: "GA系列",
    group: "過濾器",
    name: "GAF系列 過濾器",
    format: "GAF{series} {cup} {port} {drain} {bracket} {filter} {thread}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "100", description: "100系列" },
          { code: "200", description: "200系列" },
          { code: "300", description: "300系列" },
          { code: "400", description: "400系列" },
          { code: "500", description: "500系列" },
          { code: "600", description: "600系列" }
        ]
      },
      {
        id: "cup",
        name: "杯體材質",
        options: cupOptions
      },
      {
        id: "port",
        name: "接管口徑",
        options: portOptions
      },
      {
        id: "drain",
        name: "排水方式",
        options: drainOptions
      },
      {
        id: "bracket",
        name: "支架代碼",
        options: bracketOptions
      },
      {
        id: "filter",
        name: "過濾精度",
        options: filterOptions
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: threadOptions
      }
    ]
  },
  {
    id: "GAFR",
    category: "氣源處理元件",
    superGroup: "GA系列",
    group: "調壓過濾器",
    name: "GAFR系列 調壓過濾器",
    format: "GAFR{series} {cup} {port} {drain} {type} {bracket} {gauge} {filter} {thread} {checkValve}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "100", description: "100系列" },
          { code: "200", description: "200系列" },
          { code: "300", description: "300系列" },
          { code: "400", description: "400系列" },
          { code: "500", description: "500系列" },
          { code: "600", description: "600系列" }
        ]
      },
      {
        id: "cup",
        name: "杯體材質",
        options: cupOptions
      },
      {
        id: "port",
        name: "接管口徑",
        options: portOptions
      },
      {
        id: "drain",
        name: "排水方式",
        options: drainOptions
      },
      {
        id: "type",
        name: "型式代碼",
        options: typeOptions
      },
      {
        id: "bracket",
        name: "支架代碼",
        options: bracketOptions
      },
      {
        id: "gauge",
        name: "壓力表代碼",
        options: gaugeOptions
      },
      {
        id: "filter",
        name: "過濾精度",
        options: filterOptions
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: threadOptions
      },
      {
        id: "checkValve",
        name: "逆流閥代碼",
        options: checkValveOptions
      }
    ]
  },
  {
    id: "GAFC",
    category: "氣源處理元件",
    superGroup: "GA系列",
    group: "二聯件(F.R+L)",
    name: "GAFC系列 二聯件 (調壓過濾器+給油器)",
    format: "GAFC{series} {cup} {port} {drain} {type} {gauge} {filter} {thread} {checkValve}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "100", description: "100系列" },
          { code: "200", description: "200系列" },
          { code: "300", description: "300系列" },
          { code: "400", description: "400系列" },
          { code: "500", description: "500系列" },
          { code: "600", description: "600系列" }
        ]
      },
      {
        id: "cup",
        name: "杯體材質",
        options: cupOptions
      },
      {
        id: "port",
        name: "接管口徑",
        options: portOptions
      },
      {
        id: "drain",
        name: "排水方式",
        options: drainOptions
      },
      {
        id: "type",
        name: "型式代碼",
        options: typeOptions
      },
      {
        id: "gauge",
        name: "壓力表代碼",
        options: gaugeOptions
      },
      {
        id: "filter",
        name: "過濾精度",
        options: filterOptions
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: threadOptions
      },
      {
        id: "checkValve",
        name: "逆流閥代碼",
        options: checkValveOptions
      }
    ]
  },
  {
    id: "GAC",
    category: "氣源處理元件",
    superGroup: "GA系列",
    group: "三聯件(F+R+L)",
    name: "GAC系列 三聯件 (過濾器+調壓閥+給油器)",
    format: "GAC{series} {cup} {port} {drain} {type} {gauge} {filter} {thread} {checkValve}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "100", description: "100系列" },
          { code: "200", description: "200系列" },
          { code: "300", description: "300系列" },
          { code: "400", description: "400系列" },
          { code: "500", description: "500系列" },
          { code: "600", description: "600系列" }
        ]
      },
      {
        id: "cup",
        name: "杯體材質",
        options: cupOptions
      },
      {
        id: "port",
        name: "接管口徑",
        options: portOptions
      },
      {
        id: "drain",
        name: "排水方式",
        options: drainOptions
      },
      {
        id: "type",
        name: "型式代碼",
        options: typeOptions
      },
      {
        id: "gauge",
        name: "壓力表代碼",
        options: gaugeOptions
      },
      {
        id: "filter",
        name: "過濾精度",
        options: filterOptions
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: threadOptions
      },
      {
        id: "checkValve",
        name: "逆流閥代碼",
        options: checkValveOptions
      }
    ]
  }
];

fs.writeFileSync('src/data/catalog-air-prep.json', JSON.stringify({ series: seriesData }, null, 2));
console.log('Done');
