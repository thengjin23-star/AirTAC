const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

function generateBores(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

function generateStrokes(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

const rmhBores = generateBores([10, 16, 20, 25]);
const rmtlBores = generateBores([10, 16, 20, 25, 32, 40]);
const rmtBores = generateBores([16, 20, 25, 32, 40]);
const rmsBores = generateBores([10, 16, 20, 25, 32, 40]);

const magStrokes = generateStrokes([50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 750, 800, 900, 1000]);

const threads = [
  { code: '', description: '空白: PT牙(或M5)' },
  { code: 'G', description: 'G: G牙' },
  { code: 'T', description: 'T: NPT牙' },
];

const rmsMountings = [
  { code: '', description: '空白: 無安裝附件' },
  { code: 'LB', description: 'LB: 腳座固定架' },
  { code: 'FA', description: 'FA: 法蘭連接板' }
];

const rmtCushions = [
  { code: '', description: '空白: 調整螺絲2個' },
  { code: 'A', description: 'A: 油壓緩衝器緩衝2個' }
];

const newSeries = [
  {
    id: 'rmh',
    superGroup: '磁耦合無杆氣缸',
    group: 'RMH系列',
    code: 'RMH',
    name: '磁耦合無杆氣缸(滑軌型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: rmhBores },
      { id: 'stroke', name: '行程', options: magStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'rmtl',
    superGroup: '磁耦合無杆氣缸',
    group: 'RMTL系列',
    code: 'RMTL',
    name: '磁耦合無杆氣缸(精密導杆型)',
    format: '{code} {bore}X{stroke} {magnet} {cushion} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: rmtlBores },
      { id: 'stroke', name: '行程', options: magStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'cushion', name: '緩衝方式', options: rmtCushions },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'rmt',
    superGroup: '磁耦合無杆氣缸',
    group: 'RMT系列',
    code: 'RMT',
    name: '磁耦合無杆氣缸(導杆型)',
    format: '{code} {bore}X{stroke} {magnet} {cushion} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: rmtBores },
      { id: 'stroke', name: '行程', options: magStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'cushion', name: '緩衝方式', options: rmtCushions },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'rms',
    superGroup: '磁耦合無杆氣缸',
    group: 'RMS系列',
    code: 'RMS',
    name: '磁耦合無杆氣缸(基本型)',
    format: '{code} {bore}X{stroke} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: rmsBores },
      { id: 'stroke', name: '行程', options: magStrokes },
      { id: 'mounting', name: '固定型式', options: rmsMountings },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'rmsp',
    superGroup: '磁耦合無杆氣缸',
    group: 'RMS系列',
    code: 'RMSP',
    name: '磁耦合無杆氣缸(P型)',
    format: '{code} {bore}X{stroke} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: rmsBores.filter(b => b.code !== '10') },
      { id: 'stroke', name: '行程', options: magStrokes },
      { id: 'mounting', name: '固定型式', options: rmsMountings },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'rmsf',
    superGroup: '磁耦合無杆氣缸',
    group: 'RMS系列',
    code: 'RMSF',
    name: '磁耦合無杆氣缸(F型)',
    format: '{code} {bore}X{stroke} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: rmsBores },
      { id: 'stroke', name: '行程', options: magStrokes },
      { id: 'mounting', name: '固定型式', options: rmsMountings.filter(m => m.code !== 'FA') },
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
  console.log('Successfully added magnetic cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
