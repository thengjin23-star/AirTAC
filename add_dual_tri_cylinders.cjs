const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

function generateBores(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

function generateStrokes(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

const dualBores = generateBores([10, 16, 20, 25, 32]);
const triBores = generateBores([6, 10, 12, 16, 20, 25, 32, 40, 50, 63, 80, 100]);

const dualStrokes = generateStrokes([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200]);
const triStrokes = generateStrokes([5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100, 125, 150, 175, 200, 225, 250]);
const triAdjustStrokes = generateStrokes([10, 20, 30, 40, 50, 75, 100]);

const threads = [
  { code: '', description: '空白: PT牙' },
  { code: 'G', description: 'G: G牙' },
  { code: 'T', description: 'T: NPT牙' },
];

const newSeries = [
  {
    id: 'tn',
    superGroup: '雙軸氣缸',
    group: 'TN系列',
    code: 'TN',
    name: '雙軸氣缸(復動型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: dualBores },
      { id: 'stroke', name: '行程', options: dualStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'tr',
    superGroup: '雙軸氣缸',
    group: 'TR系列',
    code: 'TR',
    name: '雙軸氣缸(復動型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: dualBores },
      { id: 'stroke', name: '行程', options: dualStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'tcm',
    superGroup: '三軸氣缸',
    group: 'TCL/TCM系列',
    code: 'TCM',
    name: '三軸氣缸(復動型/銅套軸承)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: triBores },
      { id: 'stroke', name: '行程', options: triStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'tcl',
    superGroup: '三軸氣缸',
    group: 'TCL/TCM系列',
    code: 'TCL',
    name: '三軸氣缸(復動型/直線軸承)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: triBores },
      { id: 'stroke', name: '行程', options: triStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'tcmj',
    superGroup: '三軸氣缸',
    group: 'TCL/TCM系列',
    code: 'TCMJ',
    name: '三軸氣缸(可調型/銅套軸承)',
    format: '{code} {bore}X{stroke}-{adjustStroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: triBores.filter(b => parseInt(b.code) >= 12) },
      { id: 'stroke', name: '行程', options: triStrokes },
      { id: 'adjustStroke', name: '調整行程', options: triAdjustStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'tclj',
    superGroup: '三軸氣缸',
    group: 'TCL/TCM系列',
    code: 'TCLJ',
    name: '三軸氣缸(可調型/直線軸承)',
    format: '{code} {bore}X{stroke}-{adjustStroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: triBores.filter(b => parseInt(b.code) >= 12) },
      { id: 'stroke', name: '行程', options: triStrokes },
      { id: 'adjustStroke', name: '調整行程', options: triAdjustStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
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
  console.log('Successfully added dual/tri cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
