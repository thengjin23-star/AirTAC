const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

function generateBores(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

function generateStrokes(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}` }));
}

const bores_40_80 = generateBores([40, 50, 63, 80]);
const angles = generateStrokes([15, 30, 45, 60, 75, 90, 105, 120, 135]).map(o => ({...o, description: o.description + '°'}));
const strokes_mck = generateStrokes([50, 75, 100, 125, 150]).map(o => ({...o, description: o.description + 'mm'}));

const arm_dirs = [
  { code: '', description: '空白: 夾緊臂水平' },
  { code: 'V', description: 'V: 夾緊臂垂直' }
];

const arms = [
  { code: '', description: '空白: 不附夾緊臂' },
  { code: 'AM1R', description: 'AM1R: 偏置15mm(右)' },
  { code: 'AM1C', description: 'AM1C: 偏置15mm(中)' },
  { code: 'AM1L', description: 'AM1L: 偏置15mm(左)' },
  { code: 'AM2R', description: 'AM2R: 偏置15mm(右)' },
  { code: 'AM2C', description: 'AM2C: 偏置15mm(中)' },
  { code: 'AM2L', description: 'AM2L: 偏置15mm(左)' },
  { code: 'AM3R', description: 'AM3R: 偏置45mm(右)' },
  { code: 'AM3C', description: 'AM3C: 偏置45mm(中)' },
  { code: 'AM3L', description: 'AM3L: 偏置45mm(左)' },
  { code: 'AM4R', description: 'AM4R: 偏置45mm(右)' },
  { code: 'AM4C', description: 'AM4C: 偏置45mm(中)' },
  { code: 'AM4L', description: 'AM4L: 偏置45mm(左)' }
];

const hands = [
  { code: '', description: '空白: 非手動型' },
  { code: 'HL', description: 'HL: 手動在左側' },
  { code: 'HR', description: 'HR: 手動在右側' }
];

const jck_sensors = [
  { code: '', description: '空白: 不附傳感器' },
  { code: 'K', description: 'K: 附電感傳感器(PNP型)' },
  { code: 'KN', description: 'KN: 附電感傳感器(NPN型)' },
  { code: 'KA', description: 'KA: 附氣動傳感器' }
];

const jsck_sensors = [
  { code: '', description: '空白: 不附傳感器' },
  { code: 'K', description: 'K: 附電感傳感器(PNP型)' },
  { code: 'KN', description: 'KN: 附電感傳感器(NPN型)' }
];

const threads = [
  { code: '', description: '空白: PT牙' },
  { code: 'G', description: 'G: G牙' }
];

const mck_open_types = [
  { code: '', description: '空白: 前後蓋各3個進氣孔' },
  { code: 'A', description: 'A: 開口A型' },
  { code: 'B', description: 'B: 開口B型' }
];

const newSeries = [
  {
    id: 'jck',
    superGroup: '焊接夾緊氣缸',
    group: 'JCK系列',
    code: 'JCK',
    name: '強力焊接夾緊氣缸',
    format: '{code}{arm_dir} {bore}X{angle} {arm} {hand} {sensor} {thread}',
    categories: [
      { id: 'arm_dir', name: '夾緊臂位置', options: arm_dirs },
      { id: 'bore', name: '缸徑', options: bores_40_80 },
      { id: 'angle', name: '打開角度', options: angles },
      { id: 'arm', name: '夾緊臂規格', options: arms },
      { id: 'hand', name: '手柄位置', options: hands },
      { id: 'sensor', name: '傳感器', options: jck_sensors },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'mck',
    superGroup: '焊接夾緊氣缸',
    group: 'MCK系列',
    code: 'MCK',
    name: '焊接夾緊氣缸',
    format: '{code} {open_type} {bore}X{stroke} {magnet} {acc} {thread}',
    categories: [
      { id: 'open_type', name: '開口型號', options: mck_open_types },
      { id: 'bore', name: '缸徑', options: bores_40_80 },
      { id: 'stroke', name: '行程', options: strokes_mck },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附普通磁石' }
      ]},
      { id: 'acc', name: '附件', options: [
        { code: '', description: '空白: 不附附件' },
        { code: 'Y', description: 'Y: 帶Y接頭(有M6螺孔)' },
        { code: 'YW', description: 'YW: 帶Y接頭(無M6螺孔)' }
      ]},
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'jsck',
    superGroup: '焊接夾緊氣缸',
    group: 'JSCK系列',
    code: 'JSCK',
    name: '強力焊接夾緊氣缸',
    format: '{code}{arm_dir} {bore}X{angle} {arm} {hand} {sensor} {thread}',
    categories: [
      { id: 'arm_dir', name: '夾緊臂位置', options: arm_dirs },
      { id: 'bore', name: '缸徑', options: bores_40_80 },
      { id: 'angle', name: '打開角度', options: angles },
      { id: 'arm', name: '夾緊臂規格', options: arms },
      { id: 'hand', name: '手柄位置', options: hands },
      { id: 'sensor', name: '傳感器', options: jsck_sensors },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'jsk',
    superGroup: '焊接夾緊氣缸',
    group: 'JSK系列',
    code: 'JSK',
    name: '強力焊接夾緊氣缸',
    format: '{code}{arm_dir} {bore} {arm} {sensor} {thread}',
    categories: [
      { id: 'arm_dir', name: '夾緊臂位置', options: arm_dirs },
      { id: 'bore', name: '缸徑', options: bores_40_80 },
      { id: 'arm', name: '夾緊臂規格', options: arms },
      { id: 'sensor', name: '傳感器', options: jsck_sensors },
      { id: 'thread', name: '牙型代碼', options: threads }
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
  console.log('Successfully added welding cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
