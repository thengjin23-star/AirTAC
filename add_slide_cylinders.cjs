const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

// Function to generate options
function generateBores(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

function generateStrokes(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

// Bores
const hgsBores = generateBores([6, 8, 10, 12]);
const hlfBores = generateBores([8, 12, 16, 20]);
const hlhBores = generateBores([6, 10, 16, 20]);
const hlqBores = generateBores([6, 8, 12, 16, 20, 25]);
const stwBores = generateBores([10, 16, 20, 25, 32]);

const slideStrokes = generateStrokes([5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 175, 200]);
const stwStrokes = generateStrokes([25, 50, 75, 100, 125, 150, 175, 200]);

const slideBlockOptions = [
  { code: '', description: '空白: 無外部擋塊(基本型)' },
  { code: 'A', description: 'A: 兩端行程調整螺絲' },
  { code: 'B', description: 'B: 兩端油壓緩衝器' },
  { code: 'AS', description: 'AS: 前進端行程調整螺絲' },
  { code: 'BS', description: 'BS: 前進端油壓緩衝器' },
  { code: 'AF', description: 'AF: 後退端行程調整螺絲' },
  { code: 'BF', description: 'BF: 後退端油壓緩衝器' },
];

const threads = [
  { code: '', description: '空白: PT牙' },
  { code: 'G', description: 'G: G牙' },
  { code: 'T', description: 'T: NPT牙' },
];

const stwTypes = [
  { code: 'A', description: 'A: 固定板固定型' },
  { code: 'B', description: 'B: 本體固定型' },
];

const newSeries = [
  {
    id: 'hgs',
    superGroup: '精密滑台氣缸',
    group: 'HGS系列',
    code: 'HGS',
    name: '微型精密滑臺氣缸',
    format: '{code} {bore}X{stroke} {magnet} {adjust}',
    categories: [
      { id: 'bore', name: '缸徑', options: hgsBores },
      { id: 'stroke', name: '行程', options: slideStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石及傳感器固定座' },
        { code: 'S', description: 'S: 附磁石及傳感器固定座' }
      ]},
      { id: 'adjust', name: '行程調整裝置', options: [
        { code: '', description: '空白: 無' },
        { code: 'J', description: 'J: 附行程調整裝置' }
      ]}
    ]
  },
  {
    id: 'hlf',
    superGroup: '精密滑台氣缸',
    group: 'HLF系列',
    code: 'HLF',
    name: '超薄型精密滑臺氣缸',
    format: '{code} {bore}X{stroke} {magnet}',
    categories: [
      { id: 'bore', name: '缸徑', options: hlfBores },
      { id: 'stroke', name: '行程', options: slideStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]}
    ]
  },
  {
    id: 'hlh',
    superGroup: '精密滑台氣缸',
    group: 'HLH系列',
    code: 'HLH',
    name: '側軌型精密滑臺氣缸',
    format: '{code} {bore}X{stroke} {magnet}',
    categories: [
      { id: 'bore', name: '缸徑', options: hlhBores },
      { id: 'stroke', name: '行程', options: slideStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]}
    ]
  },
  {
    id: 'hlq',
    superGroup: '精密滑台氣缸',
    group: 'HLQ/HLQL系列',
    code: 'HLQ',
    name: '雙軸型精密滑臺氣缸(循環滾珠)(標準型)',
    format: '{code} {bore}X{stroke} {magnet} {block} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: hlqBores },
      { id: 'stroke', name: '行程', options: slideStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'block', name: '外部擋塊型式', options: slideBlockOptions },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'hlql',
    superGroup: '精密滑台氣缸',
    group: 'HLQ/HLQL系列',
    code: 'HLQL',
    name: '雙軸型精密滑臺氣缸(循環滾珠)(對稱型)',
    format: '{code} {bore}X{stroke} {magnet} {block} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: hlqBores },
      { id: 'stroke', name: '行程', options: slideStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'block', name: '外部擋塊型式', options: slideBlockOptions },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'hls',
    superGroup: '精密滑台氣缸',
    group: 'HLS/HLSL系列',
    code: 'HLS',
    name: '雙軸型精密滑臺氣缸(滾柱型)(標準型)',
    format: '{code} {bore}X{stroke} {magnet} {block} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: hlqBores },
      { id: 'stroke', name: '行程', options: slideStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'block', name: '外部擋塊型式', options: slideBlockOptions },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'hlsl',
    superGroup: '精密滑台氣缸',
    group: 'HLS/HLSL系列',
    code: 'HLSL',
    name: '雙軸型精密滑臺氣缸(滾柱型)(對稱型)',
    format: '{code} {bore}X{stroke} {magnet} {block} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: hlqBores },
      { id: 'stroke', name: '行程', options: slideStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'block', name: '外部擋塊型式', options: slideBlockOptions },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'stw',
    superGroup: '精密滑台氣缸',
    group: 'STW系列',
    code: 'STW',
    name: '滑臺氣缸',
    format: '{code} {type} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'type', name: '固定型式', options: stwTypes },
      { id: 'bore', name: '缸徑', options: stwBores },
      { id: 'stroke', name: '行程', options: stwStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [{ code: '', description: '空白: PT牙' }] }
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
  console.log('Successfully added slide cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
