const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

const newSeries = [
  {
    id: 'npm',
    superGroup: '打刀氣缸',
    group: 'NPM系列',
    code: 'NPM',
    name: '打刀氣缸',
    format: '{code} {output} {bore_stroke} {voltage} {connection} {switch}',
    categories: [
      { id: 'output', name: '出力', options: [
        { code: '35T', description: '35T: 出力3.5噸' },
        { code: '45T', description: '45T: 出力4.5噸' },
        { code: '60T', description: '60T: 出力6.0噸' }
      ]},
      { id: 'bore_stroke', name: '液壓缸徑X打刀行程', options: [
        { code: '63x13', description: '63x13: 液壓缸徑63mm；打刀行程13mm' },
        { code: '63x15', description: '63x15: 液壓缸徑63mm；打刀行程15mm' },
        { code: '70x15', description: '70x15: 液壓缸徑70mm；打刀行程15mm' }
      ]},
      { id: 'voltage', name: '標準電壓', options: [
        { code: 'A', description: 'A: AC220V' },
        { code: 'B', description: 'B: DC24V' },
        { code: 'C', description: 'C: AC110V' },
        { code: 'E', description: 'E: AC24V' },
        { code: 'F', description: 'F: DC12V' }
      ]},
      { id: 'connection', name: '接電方式', options: [
        { code: '', description: '空白: DIN插座式' },
        { code: 'I', description: 'I: 出線式' }
      ]},
      { id: 'switch', name: '微動開關', options: [
        { code: '', description: '空白: 不附微動開關' },
        { code: 'L', description: 'L: 2個微動開關' }
      ]}
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
  console.log('Successfully added tool release cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
