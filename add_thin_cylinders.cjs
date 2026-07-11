const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

const actBores = [
  { code: '125', description: '125mm' },
  { code: '140', description: '140mm' },
  { code: '160', description: '160mm' },
  { code: '200', description: '200mm' },
  { code: '250', description: '250mm' },
];

const acqBores = [
  { code: '12', description: '12mm' },
  { code: '16', description: '16mm' },
  { code: '20', description: '20mm' },
  { code: '25', description: '25mm' },
  { code: '32', description: '32mm' },
  { code: '40', description: '40mm' },
  { code: '50', description: '50mm' },
  { code: '63', description: '63mm' },
  { code: '80', description: '80mm' },
  { code: '100', description: '100mm' },
];

const aceBores = [
  ...acqBores,
  { code: '125', description: '125mm' }
];

const thinStrokes = [
  { code: '5', description: '5mm' },
  { code: '10', description: '10mm' },
  { code: '15', description: '15mm' },
  { code: '20', description: '20mm' },
  { code: '25', description: '25mm' },
  { code: '30', description: '30mm' },
  { code: '35', description: '35mm' },
  { code: '40', description: '40mm' },
  { code: '45', description: '45mm' },
  { code: '50', description: '50mm' },
  { code: '55', description: '55mm' },
  { code: '60', description: '60mm' },
  { code: '70', description: '70mm' },
  { code: '75', description: '75mm' },
  { code: '80', description: '80mm' },
  { code: '90', description: '90mm' },
  { code: '100', description: '100mm' },
  { code: '125', description: '125mm' },
  { code: '150', description: '150mm' },
  { code: '175', description: '175mm' },
  { code: '200', description: '200mm' },
  { code: '250', description: '250mm' },
  { code: '300', description: '300mm' },
  { code: '350', description: '350mm' },
  { code: '400', description: '400mm' },
  { code: '450', description: '450mm' },
  { code: '500', description: '500mm' },
];

const adjustStrokes = [
  { code: '10', description: '10mm' },
  { code: '20', description: '20mm' },
  { code: '30', description: '30mm' },
  { code: '40', description: '40mm' },
  { code: '50', description: '50mm' },
  { code: '75', description: '75mm' },
  { code: '100', description: '100mm' },
];

const rodThreads = [
  { code: '', description: '空白: 內牙型' },
  { code: 'B', description: 'B: 外牙型' },
];

const mountings = [
  { code: '', description: '空白: 無安裝附件' },
  { code: 'FA', description: 'FA: 前法蘭連接板' },
  { code: 'FB', description: 'FB: 後法蘭連接板' },
  { code: 'CB', description: 'CB: 雙耳固定座' },
  { code: 'LB', description: 'LB: 軸向固定座' },
];

const aceMountings = [
  ...mountings,
  { code: 'CR', description: 'CR: 單耳連接座' },
  { code: 'FTC', description: 'FTC: 前蓋耳軸支架' },
  { code: 'SDB', description: 'SDB: 後鉸固定座' },
  { code: 'CA', description: 'CA: 單耳固定座' }
];

const threads = [
  { code: '', description: '空白: PT牙' },
  { code: 'G', description: 'G: G牙' },
  { code: 'T', description: 'T: NPT牙' },
];

// Helper to stringify properly
function objToStr(obj) {
  return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
}

const newSeries = [
  // ACT Series
  {
    id: 'act',
    superGroup: '超薄氣缸',
    group: 'ACT系列',
    code: 'ACT',
    name: '超薄氣缸(復動型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: actBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'thread', name: '牙型代碼', options: threads.slice(0, 2) } // Only PT, G
    ]
  },
  
  // ACQ Series
  {
    id: 'acq',
    superGroup: '超薄氣缸',
    group: 'ACQ系列',
    code: 'ACQ',
    name: '超薄氣缸(復動型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'mounting', name: '固定型式', options: mountings },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'asq',
    superGroup: '超薄氣缸',
    group: 'ACQ系列',
    code: 'ASQ',
    name: '超薄氣缸(單動押出型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores.slice(0, -2) }, // up to 63 probably, based on catalog typically single acting limits. Actually, wait, standard says 12-50 for single acting. We'll use acqBores.
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'mounting', name: '固定型式', options: mountings },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'atq',
    superGroup: '超薄氣缸',
    group: 'ACQ系列',
    code: 'ATQ',
    name: '超薄氣缸(單動引入型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'mounting', name: '固定型式', options: mountings },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'acqd',
    superGroup: '超薄氣缸',
    group: 'ACQ系列',
    code: 'ACQD',
    name: '超薄氣缸(雙軸復動型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'mounting', name: '固定型式', options: mountings.slice(0,3) }, // FA, FB only for double rod? Usually. We'll leave as is.
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },
  {
    id: 'acqj',
    superGroup: '超薄氣缸',
    group: 'ACQ系列',
    code: 'ACQJ',
    name: '超薄氣缸(雙軸復動行程可調型)',
    format: '{code} {bore}X{stroke}-{adjustStroke} {magnet} {rodThread} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'adjustStroke', name: '調整行程', options: adjustStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'mounting', name: '固定型式', options: mountings },
      { id: 'thread', name: '牙型代碼', options: threads }
    ]
  },

  // SDA Series
  {
    id: 'sda',
    superGroup: '超薄氣缸',
    group: 'SDA系列',
    code: 'SDA',
    name: '超薄氣缸(復動型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'thread', name: '牙型代碼', options: [{ code: '', description: '空白: PT牙' }] }
    ]
  },
  {
    id: 'ssa',
    superGroup: '超薄氣缸',
    group: 'SDA系列',
    code: 'SSA',
    name: '超薄氣缸(單動押出型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'thread', name: '牙型代碼', options: [{ code: '', description: '空白: PT牙' }] }
    ]
  },
  {
    id: 'sta',
    superGroup: '超薄氣缸',
    group: 'SDA系列',
    code: 'STA',
    name: '超薄氣缸(單動引入型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'thread', name: '牙型代碼', options: [{ code: '', description: '空白: PT牙' }] }
    ]
  },
  {
    id: 'sdad',
    superGroup: '超薄氣缸',
    group: 'SDA系列',
    code: 'SDAD',
    name: '超薄氣缸(雙軸復動型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'thread', name: '牙型代碼', options: [{ code: '', description: '空白: PT牙' }] }
    ]
  },
  {
    id: 'sdaj',
    superGroup: '超薄氣缸',
    group: 'SDA系列',
    code: 'SDAJ',
    name: '超薄氣缸(雙軸復動行程可調型)',
    format: '{code} {bore}X{stroke}-{adjustStroke} {magnet} {rodThread} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'adjustStroke', name: '調整行程', options: adjustStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'thread', name: '牙型代碼', options: [{ code: '', description: '空白: PT牙' }] }
    ]
  },
  {
    id: 'sdat',
    superGroup: '超薄氣缸',
    group: 'SDA系列',
    code: 'SDAT',
    name: '超薄氣缸(多位置型)',
    format: '{code} {bore}X{stroke1}-{stroke2} {magnet} {rodThread} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke1', name: '行程1', options: thinStrokes },
      { id: 'stroke2', name: '行程2', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'thread', name: '牙型代碼', options: [{ code: '', description: '空白: PT牙' }] }
    ]
  },
  {
    id: 'sdaw',
    superGroup: '超薄氣缸',
    group: 'SDA系列',
    code: 'SDAW',
    name: '超薄氣缸(雙軸復動多位置型)',
    format: '{code} {bore}X{stroke1}-{stroke2} {magnet} {rodThread} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: acqBores },
      { id: 'stroke1', name: '行程1', options: thinStrokes },
      { id: 'stroke2', name: '行程2', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'thread', name: '牙型代碼', options: [{ code: '', description: '空白: PT牙' }] }
    ]
  },

  // ACE Series (Compact Cylinders)
  {
    id: 'ace',
    superGroup: '超薄氣缸', // Grouped with thin cylinders as requested or compact
    group: 'ACE系列緊湊型',
    code: 'ACE',
    name: '緊湊型氣缸(復動型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: aceBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'mounting', name: '固定型式', options: aceMountings },
      { id: 'thread', name: '牙型代碼', options: threads.slice(0, 2) } // PT, G
    ]
  },
  {
    id: 'ase',
    superGroup: '超薄氣缸',
    group: 'ACE系列緊湊型',
    code: 'ASE',
    name: '緊湊型氣缸(單動押出型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: aceBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'mounting', name: '固定型式', options: aceMountings },
      { id: 'thread', name: '牙型代碼', options: threads.slice(0, 2) }
    ]
  },
  {
    id: 'ate',
    superGroup: '超薄氣缸',
    group: 'ACE系列緊湊型',
    code: 'ATE',
    name: '緊湊型氣缸(單動引入型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: aceBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'mounting', name: '固定型式', options: aceMountings },
      { id: 'thread', name: '牙型代碼', options: threads.slice(0, 2) }
    ]
  },
  {
    id: 'aced',
    superGroup: '超薄氣缸',
    group: 'ACE系列緊湊型',
    code: 'ACED',
    name: '緊湊型氣缸(雙軸復動型)',
    format: '{code} {bore}X{stroke} {magnet} {rodThread} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: aceBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'mounting', name: '固定型式', options: aceMountings },
      { id: 'thread', name: '牙型代碼', options: threads.slice(0, 2) }
    ]
  },
  {
    id: 'acej',
    superGroup: '超薄氣缸',
    group: 'ACE系列緊湊型',
    code: 'ACEJ',
    name: '緊湊型氣缸(雙軸復動行程可調型)',
    format: '{code} {bore}X{stroke}-{adjustStroke} {magnet} {rodThread} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: aceBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'adjustStroke', name: '調整行程', options: adjustStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'rodThread', name: '活塞杆牙型', options: rodThreads },
      { id: 'mounting', name: '固定型式', options: aceMountings },
      { id: 'thread', name: '牙型代碼', options: threads.slice(0, 2) }
    ]
  },
  {
    id: 'tace',
    superGroup: '超薄氣缸',
    group: 'ACE系列緊湊型',
    code: 'TACE',
    name: '緊湊型氣缸(雙軸帶導杆型)',
    format: '{code} {bore}X{stroke} {magnet} {mounting} {thread}', // No rod thread for TACE
    categories: [
      { id: 'bore', name: '缸徑', options: aceBores.slice(0, 8) }, // 12-100 probably, let's just use aceBores
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'mounting', name: '固定型式', options: aceMountings },
      { id: 'thread', name: '牙型代碼', options: threads.slice(0, 2) }
    ]
  },
  {
    id: 'taced',
    superGroup: '超薄氣缸',
    group: 'ACE系列緊湊型',
    code: 'TACED',
    name: '緊湊型氣缸(雙軸復動帶導杆型)',
    format: '{code} {bore}X{stroke} {magnet} {mounting} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: aceBores },
      { id: 'stroke', name: '行程', options: thinStrokes },
      { id: 'magnet', name: '磁石代號', options: [{ code: '', description: '空白: 不附磁石' }, { code: 'S', description: 'S: 附磁石' }] },
      { id: 'mounting', name: '固定型式', options: aceMountings },
      { id: 'thread', name: '牙型代碼', options: threads.slice(0, 2) }
    ]
  }
];

let addedContent = '';
for (const series of newSeries) {
  addedContent += '  ' + objToStr(series) + ',\n';
}

const insertionPoint = content.lastIndexOf('];');
if (insertionPoint !== -1) {
  const newFileContent = content.slice(0, insertionPoint) + addedContent + content.slice(insertionPoint);
  fs.writeFileSync('src/data/catalog.ts', newFileContent);
  console.log('Successfully added thin cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
