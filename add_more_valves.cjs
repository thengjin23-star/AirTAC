const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

const newSeries = [
  {
    id: 'cpv10',
    category: '控制元件',
    superGroup: '電磁閥',
    group: 'CPV10S系列',
    code: 'CPV10',
    name: '微型電磁閥 (三口二位, Cv: ~0.02)',
    format: 'CPV 10 {voltage} {manual} - {wire}',
    categories: [
      { id: 'voltage', name: '標準電壓', options: [
        { code: 'A', description: 'A: AC220V' },
        { code: 'B', description: 'B: DC24V' },
        { code: 'C', description: 'C: AC110V' },
        { code: 'F', description: 'F: DC12V' }
      ]},
      { id: 'manual', name: '手動銷代碼', options: [
        { code: 'P', description: 'P: 有手動銷' }
      ]},
      { id: 'wire', name: '線長', options: [
        { code: '050', description: '050: 0.5m' },
        { code: '200', description: '200: 2.0m' }
      ]}
    ]
  },
  {
    id: 'cpv15',
    category: '控制元件',
    superGroup: '電磁閥',
    group: 'CPV15S系列',
    code: 'CPV15',
    name: '微型電磁閥 (三口二位, Cv: ~0.03)',
    format: 'CPV 15 {voltage} {manual} - {wire}',
    categories: [
      { id: 'voltage', name: '標準電壓', options: [
        { code: 'A', description: 'A: AC220V' },
        { code: 'B', description: 'B: DC24V' },
        { code: 'C', description: 'C: AC110V' },
        { code: 'E', description: 'E: AC24V' },
        { code: 'F', description: 'F: DC12V' }
      ]},
      { id: 'manual', name: '手動銷代碼', options: [
        { code: 'P', description: 'P: 有手動銷' }
      ]},
      { id: 'wire', name: '線長', options: [
        { code: '050', description: '050: 0.5m' },
        { code: '200', description: '200: 2.0m' }
      ]}
    ]
  },
  {
    id: '3v1',
    category: '控制元件',
    superGroup: '電磁閥',
    group: '3V1系列',
    code: '3V1',
    name: '3V1系列電磁閥 (三口二位)',
    format: '3V 1 {port} {voltage} {terminal} {thread}',
    categories: [
      { id: 'port', name: '接管口徑', options: [
        { code: 'M5', description: 'M5: M5' },
        { code: '06', description: '06: 1/8"' }
      ]},
      { id: 'voltage', name: '標準電壓', options: [
        { code: 'A', description: 'A: AC220V' },
        { code: 'B', description: 'B: DC24V' },
        { code: 'C', description: 'C: AC110V' },
        { code: 'E', description: 'E: AC24V' },
        { code: 'F', description: 'F: DC12V' }
      ]},
      { id: 'terminal', name: '接電方式', options: [
        { code: '', description: '空白: DIN插座式' },
        { code: 'I', description: 'I: 出線式' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: '3v2',
    category: '控制元件',
    superGroup: '電磁閥',
    group: '3V2系列',
    code: '3V2',
    name: '3V2系列電磁閥 (三口二位, Cv: ~0.19)',
    format: '3V 2 {port} {initial} {voltage} {terminal} {thread}',
    categories: [
      { id: 'port', name: '接管口徑', options: [
        { code: '06', description: '06: 1/8"' },
        { code: '08', description: '08: 1/4"' }
      ]},
      { id: 'initial', name: '初始狀態', options: [
        { code: 'NC', description: 'NC: 常閉型' },
        { code: 'NO', description: 'NO: 常開型' }
      ]},
      { id: 'voltage', name: '標準電壓', options: [
        { code: 'A', description: 'A: AC220V' },
        { code: 'B', description: 'B: DC24V' },
        { code: 'C', description: 'C: AC110V' },
        { code: 'E', description: 'E: AC24V' },
        { code: 'F', description: 'F: DC12V' }
      ]},
      { id: 'terminal', name: '接電方式', options: [
        { code: '', description: '空白: DIN插座式' },
        { code: 'I', description: 'I: 出線式' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: '3v3',
    category: '控制元件',
    superGroup: '電磁閥',
    group: '3V3系列',
    code: '3V3',
    name: '3V3系列電磁閥 (三口二位, Cv: 0.62)',
    format: '3V 3 {port} {initial} {voltage} {terminal} {thread}',
    categories: [
      { id: 'port', name: '接管口徑', options: [
        { code: '08', description: '08: 1/4"' }
      ]},
      { id: 'initial', name: '初始狀態', options: [
        { code: 'NC', description: 'NC: 常閉型' },
        { code: 'NO', description: 'NO: 常開型' }
      ]},
      { id: 'voltage', name: '標準電壓', options: [
        { code: 'A', description: 'A: AC220V' },
        { code: 'B', description: 'B: DC24V' },
        { code: 'C', description: 'C: AC110V' },
        { code: 'E', description: 'E: AC24V' },
        { code: 'F', description: 'F: DC12V' }
      ]},
      { id: 'terminal', name: '接電方式', options: [
        { code: '', description: '空白: DIN插座式' },
        { code: 'I', description: 'I: 出線式' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: '7v',
    category: '控制元件',
    superGroup: '電磁閥',
    group: '7V系列',
    code: '7V',
    name: '7V系列電磁閥 (五口二位、五口三位, Cv: 0.13~2.26)',
    format: '7V {series} {type} {connection} {port} {voltage} {wire} {thread}',
    categories: [
      { id: 'series', name: '系列代號', options: [
        { code: '05', description: '05: 0500系列 (Cv~0.2)' },
        { code: '1', description: '1: 100系列 (Cv~0.47)' },
        { code: '2', description: '2: 200系列 (Cv~0.87)' },
        { code: '3', description: '3: 300系列 (Cv~2.26)' }
      ]},
      { id: 'type', name: '電控方式', options: [
        { code: '10', description: '10: 雙位置單電控' },
        { code: '20', description: '20: 雙位置雙電控' },
        { code: '30C', description: '30C: 三位置雙電控中位封閉型' },
        { code: '30E', description: '30E: 三位置雙電控中位排氣型' },
        { code: '30P', description: '30P: 三位置雙電控中位壓力型' }
      ]},
      { id: 'connection', name: '接管型式', options: [
        { code: '', description: '空白: 螺紋接管' },
        { code: 'J', description: 'J: 快插接頭接管' }
      ]},
      { id: 'port', name: '接管口徑', options: [
        { code: 'M5', description: 'M5: M5 (螺紋)' },
        { code: '06', description: '06: PT1/8 (螺紋) / Φ6mm (快插)' },
        { code: '08', description: '08: PT1/4 (螺紋) / Φ8mm (快插)' },
        { code: '10', description: '10: PT3/8 (螺紋) / Φ10mm (快插)' },
        { code: '04', description: '04: Φ4mm (快插)' }
      ]},
      { id: 'voltage', name: '標準電壓', options: [
        { code: 'A', description: 'A: AC220V' },
        { code: 'B', description: 'B: DC24V' },
        { code: 'C', description: 'C: AC110V' },
        { code: 'F', description: 'F: DC12V' }
      ]},
      { id: 'wire', name: '端子線長', options: [
        { code: '050', description: '050: 0.5m' },
        { code: '200', description: '200: 2.0m' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: '6d_valve',
    category: '控制元件',
    superGroup: '電磁閥',
    group: '6D系列',
    code: '6D',
    name: '6D系列電磁閥 (五口二位、五口三位、雙三口二位)',
    format: '6D {series} {type} {voltage} {air}',
    categories: [
      { id: 'series', name: '系列代號', options: [
        { code: '05', description: '05: 0500系列' },
        { code: '1', description: '1: 100系列' },
        { code: '2', description: '2: 200系列' }
      ]},
      { id: 'type', name: '電控方式', options: [
        { code: '10', description: '10: 雙位置單電控' },
        { code: '20', description: '20: 雙位置雙電控' },
        { code: '30C', description: '30C: 三位置雙電控中位封閉型' },
        { code: '30E', description: '30E: 三位置雙電控中位排氣型' },
        { code: '30P', description: '30P: 三位置雙電控中位壓力型' },
        { code: '20NC', description: '20NC: 雙三口二位電磁閥NC-NC' },
        { code: '20NO', description: '20NO: 雙三口二位電磁閥NO-NO' }
      ]},
      { id: 'voltage', name: '標準電壓', options: [
        { code: 'B', description: 'B: DC24V' },
        { code: 'F', description: 'F: DC12V' }
      ]},
      { id: 'air', name: '引導方式/進排氣類型', options: [
        { code: '', description: '空白: 內部引導式' },
        { code: '-W', description: '-W: 外部引導式' },
        { code: '-E', description: '-E: 獨立進氣' },
        { code: '-R', description: '-R: 獨立排氣' }
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
  console.log('Successfully added more valves!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
