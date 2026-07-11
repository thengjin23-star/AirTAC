const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

const hrqBores = [2, 3, 7, 10, 20, 30, 50, 70, 100, 200].map(c => ({ code: String(c), description: String(c) }));
const hrsBores = [10, 15, 20, 30, 40].map(c => ({ code: String(c), description: String(c) }));

const threads = [
  { code: '', description: '空白: PT牙(或無)' },
  { code: 'G', description: 'G: G牙' },
  { code: 'T', description: 'T: NPT牙' },
];

const newSeries = [
  {
    id: 'hrq',
    superGroup: '回轉氣缸',
    group: 'HRQ系列',
    code: 'HRQ',
    name: '回轉氣缸',
    format: '{code} {bore} {buffer} {thread}',
    categories: [
      { id: 'bore', name: '規格', options: hrqBores },
      { id: 'buffer', name: '緩衝方式', options: [
        { code: '', description: '空白: 固定緩衝' },
        { code: 'A', description: 'A: 油壓緩衝器緩衝' }
      ]},
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'hrs',
    superGroup: '回轉氣缸',
    group: 'HRS系列',
    code: 'HRS',
    name: '超薄型回轉氣缸',
    format: '{code} {bore} X {angle}° {thread}',
    categories: [
      { id: 'bore', name: '規格', options: hrsBores },
      { id: 'angle', name: '擺動角度', options: [
        { code: '90', description: '90°' },
        { code: '180', description: '180°' }
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
  console.log('Successfully added rotary cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
