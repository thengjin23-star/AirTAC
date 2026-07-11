const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

function generateBores(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

function generateStrokes(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

const bores_6_to_32 = generateBores([6, 10, 16, 20, 25, 32]);
const bores_10_to_32 = generateBores([10, 16, 20, 25, 32]);
const bores_8_to_25 = generateBores([8, 12, 16, 20, 25]);
const bores_16_to_63 = generateBores([16, 20, 25, 32, 40, 50, 63]);
const bores_16_to_32 = generateBores([16, 20, 25, 32]);
const bores_10_to_25 = generateBores([10, 16, 20, 25]);
const bores_6_to_40 = generateBores([6, 10, 16, 20, 25, 32, 40]);
const bores_10_to_40 = generateBores([10, 16, 20, 25, 32, 40]);

const threads = [
  { code: '', description: '空白: PT牙(或M5)' },
  { code: 'G', description: 'G: G牙' },
  { code: 'T', description: 'T: NPT牙' },
];

const HFT_strokes = generateStrokes([10, 16, 20, 25, 30, 40, 60, 80, 100, 150]);
const HFD_strokes = generateStrokes([8, 10, 15, 20, 25, 30, 40, 50, 60, 80]);

const HFP_types = [
  { code: '', description: '空白: 標準型' },
  { code: 'N', description: 'N: 通孔安裝型' }
];

const HFR_install = [
  { code: '', description: '空白: 標準型' },
  { code: 'N', description: 'N: 開閉方向通孔安裝型' }
];

const HFCQ_pusher = [
  { code: '', description: '空白: 無推杆' },
  { code: 'E', description: 'E: 氣缸式推杆' },
  { code: 'V', description: 'V: 彈簧式推杆' }
];

const HFC_jaws = [
  { code: 'I', description: 'I: 兩爪' },
  { code: 'Y', description: 'Y: 三爪' },
  { code: 'X', description: 'X: 四爪' }
];

const HFZ_install = [
  { code: '', description: '空白: 標準型' },
  { code: 'B', description: 'B: 側面安裝型' },
  { code: 'N', description: 'N: 通孔安裝型' },
  { code: 'F', description: 'F: 底部安裝型' }
];

const HFK_install = [
  { code: '', description: '空白: 標準型' },
  { code: 'B', description: 'B: 側面安裝型' },
  { code: 'N', description: 'N: 通孔安裝型' },
  { code: 'F', description: 'F: 底部安裝型' },
  { code: 'R', description: 'R: 爪寬窄型' },
  { code: 'W', description: 'W: 側面安裝且爪寬窄型' },
  { code: 'M', description: 'M: 通孔安裝且爪寬窄型' }
];

const newSeries = [
  {
    id: 'hft',
    superGroup: '氣動手指',
    group: 'HFT系列',
    code: 'HFT',
    name: '大口徑開口夾(復動型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_32 },
      { id: 'stroke', name: '行程', options: HFT_strokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: 'S', description: 'S: 附磁石' }] },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'hfd',
    superGroup: '氣動手指',
    group: 'HFD系列',
    code: 'HFD',
    name: '薄型氣動手指',
    format: '{code} {bore}X{stroke}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_8_to_25 },
      { id: 'stroke', name: '行程', options: HFD_strokes }
    ]
  },
  {
    id: 'hfp',
    superGroup: '氣動手指',
    group: 'HFP系列',
    code: 'HFP',
    name: '機械式平行型氣動手指(復動型)',
    format: '{code} {bore} {type}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_32 },
      { id: 'type', name: '夾爪可選種類', options: HFP_types }
    ]
  },
  {
    id: 'hftp',
    superGroup: '氣動手指',
    group: 'HFP系列',
    code: 'HFTP',
    name: '機械式平行型氣動手指(單動常開型)',
    format: '{code} {bore} {type}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_32 },
      { id: 'type', name: '夾爪可選種類', options: HFP_types }
    ]
  },
  {
    id: 'hfy',
    superGroup: '氣動手指',
    group: 'HFY系列',
    code: 'HFY',
    name: 'Y型氣動手指(標準復動型)',
    format: '{code} {bore}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_6_to_32 }
    ]
  },
  {
    id: 'hfty',
    superGroup: '氣動手指',
    group: 'HFY系列',
    code: 'HFTY',
    name: 'Y型氣動手指(單動常開型)',
    format: '{code} {bore}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_6_to_32 }
    ]
  },
  {
    id: 'hfr',
    superGroup: '氣動手指',
    group: 'HFR系列',
    code: 'HFR',
    name: '180°開閉型氣動手指',
    format: '{code} {bore} {install}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_32 },
      { id: 'install', name: '安裝方式', options: HFR_install }
    ]
  },
  {
    id: 'hfcq',
    superGroup: '氣動手指',
    group: 'HFCQ系列',
    code: 'HFCQ',
    name: '平行開閉中空型氣動手指',
    format: '{code} {bore} {pusher}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_16_to_63 },
      { id: 'pusher', name: '推杆機構', options: HFCQ_pusher }
    ]
  },
  {
    id: 'hfc',
    superGroup: '氣動手指',
    group: 'HFC系列',
    code: 'HFC',
    name: '平行開閉型氣動手指',
    format: '{code} {jaw} {bore}',
    categories: [
      { id: 'jaw', name: '夾爪可選種類', options: HFC_jaws },
      { id: 'bore', name: '缸徑', options: bores_16_to_63 }
    ]
  },
  {
    id: 'hfkp',
    superGroup: '氣動手指',
    group: 'HFKP系列',
    code: 'HFKP',
    name: '防塵帶導軌平行型氣動手指(滾柱型)',
    format: '{code} {bore}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_16_to_32 }
    ]
  },
  {
    id: 'hfkl',
    superGroup: '氣動手指',
    group: 'HFKL系列',
    code: 'HFKL',
    name: '帶導軌平行型氣動手指(長行程滾柱型)(復動)',
    format: '{code} {bore} {install}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_25 },
      { id: 'install', name: '安裝型式', options: HFZ_install }
    ]
  },
  {
    id: 'hfskl',
    superGroup: '氣動手指',
    group: 'HFKL系列',
    code: 'HFSKL',
    name: '帶導軌平行型氣動手指(長行程滾柱型)(單動常閉)',
    format: '{code} {bore} {install}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_25 },
      { id: 'install', name: '安裝型式', options: HFZ_install }
    ]
  },
  {
    id: 'hftkl',
    superGroup: '氣動手指',
    group: 'HFKL系列',
    code: 'HFTKL',
    name: '帶導軌平行型氣動手指(長行程滾柱型)(單動常開)',
    format: '{code} {bore} {install}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_25 },
      { id: 'install', name: '安裝型式', options: HFZ_install }
    ]
  },
  {
    id: 'hfz',
    superGroup: '氣動手指',
    group: 'HFZ/HFK系列',
    code: 'HFZ',
    name: '帶導軌平行型氣動手指(滾珠型)(復動)',
    format: '{code} {bore} {install}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_6_to_40 },
      { id: 'install', name: '安裝型式', options: HFZ_install }
    ]
  },
  {
    id: 'hfsz',
    superGroup: '氣動手指',
    group: 'HFZ/HFK系列',
    code: 'HFSZ',
    name: '帶導軌平行型氣動手指(滾珠型)(單動常閉)',
    format: '{code} {bore} {install}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_40 },
      { id: 'install', name: '安裝型式', options: HFZ_install }
    ]
  },
  {
    id: 'hftz',
    superGroup: '氣動手指',
    group: 'HFZ/HFK系列',
    code: 'HFTZ',
    name: '帶導軌平行型氣動手指(滾珠型)(單動常開)',
    format: '{code} {bore} {install}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_6_to_40 },
      { id: 'install', name: '安裝型式', options: HFZ_install }
    ]
  },
  {
    id: 'hfk',
    superGroup: '氣動手指',
    group: 'HFZ/HFK系列',
    code: 'HFK',
    name: '帶導軌平行型氣動手指(滾柱型)(復動)',
    format: '{code} {bore} {install}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_40 },
      { id: 'install', name: '安裝型式', options: HFK_install }
    ]
  },
  {
    id: 'hfsk',
    superGroup: '氣動手指',
    group: 'HFZ/HFK系列',
    code: 'HFSK',
    name: '帶導軌平行型氣動手指(滾柱型)(單動常閉)',
    format: '{code} {bore} {install}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_40 },
      { id: 'install', name: '安裝型式', options: HFK_install }
    ]
  },
  {
    id: 'hftk',
    superGroup: '氣動手指',
    group: 'HFZ/HFK系列',
    code: 'HFTK',
    name: '帶導軌平行型氣動手指(滾柱型)(單動常開)',
    format: '{code} {bore} {install}',
    categories: [
      { id: 'bore', name: '缸徑', options: bores_10_to_40 },
      { id: 'install', name: '安裝型式', options: HFK_install }
    ]
  }
];

function objToStr(obj) {
  return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
}

let addedContent = '';
for (const series of newSeries) {
  addedContent += '  ' + objToStr(series) + ',\n';
}

const insertionPoint = content.lastIndexOf('];');
if (insertionPoint !== -1) {
  const newFileContent = content.slice(0, insertionPoint) + addedContent + content.slice(insertionPoint);
  fs.writeFileSync('src/data/catalog.ts', newFileContent);
  console.log('Successfully added gripper cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
