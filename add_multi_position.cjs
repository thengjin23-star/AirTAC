const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

function generateBores(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

function generateStrokes(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

// 1. MPE Series
const mpeBores = generateBores([6, 8, 10, 12, 16]);
const mpeStrokes = generateStrokes([5, 10, 15]);

// 2. MPG Series
const mpgBores = generateBores([6, 8, 10, 12, 16]);
const mpgStrokes = generateStrokes([5, 10, 15, 20, 25, 30, 35, 40]);

// 3. MU Series
const muBores = generateBores([4, 6, 8, 10, 12, 16, 20]);
const muStrokes = generateStrokes([4, 6, 8, 10, 15, 20, 25, 30, 35, 40, 45, 50]);

// 4. MD, MK Series
const mdBores = generateBores([6, 10, 16, 20, 25, 32]);
const mdStrokes = generateStrokes([5, 10, 15, 20, 25, 30, 35, 40, 50, 60]);
const mdAdjustStrokes = generateStrokes([10, 20, 30]);

const newSeries = [
  {
    id: 'mpe',
    superGroup: '小型多位置、自由安裝氣缸',
    group: 'MPE系列',
    code: 'MPE',
    name: '標準型螺紋氣缸(單動押出型)',
    format: '{code} {bore}X{stroke} {rod}',
    categories: [
      { id: 'bore', name: '缸徑', options: mpeBores },
      { id: 'stroke', name: '行程', options: mpeStrokes },
      { id: 'rod', name: '活塞杆牙型', options: [
        { code: '', description: '空白: 外牙型' },
        { code: 'N', description: 'N: 無牙型' }
      ]}
    ]
  },
  {
    id: 'mpef',
    superGroup: '小型多位置、自由安裝氣缸',
    group: 'MPE系列',
    code: 'MPEF',
    name: '埋入安裝型螺紋氣缸(單動押出型)',
    format: '{code} {bore}X{stroke} {rod}',
    categories: [
      { id: 'bore', name: '缸徑', options: mpeBores },
      { id: 'stroke', name: '行程', options: mpeStrokes },
      { id: 'rod', name: '活塞杆牙型', options: [
        { code: '', description: '空白: 外牙型' },
        { code: 'N', description: 'N: 無牙型' }
      ]}
    ]
  },
  {
    id: 'mpg',
    superGroup: '小型多位置、自由安裝氣缸',
    group: 'MPG系列',
    code: 'MPG',
    name: '標準面板型氣缸(復動型)',
    format: '{code} {bore}X{stroke} {magnet} {rod} {mounting}',
    categories: [
      { id: 'bore', name: '缸徑', options: mpgBores },
      { id: 'stroke', name: '行程', options: mpgStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'rod', name: '活塞杆牙型', options: [
        { code: '', description: '空白: 外牙型' },
        { code: 'N', description: 'N: 無牙型' }
      ]},
      { id: 'mounting', name: '固定型式', options: [
        { code: '', description: '空白: 無安裝附件' },
        { code: 'LB', description: 'LB: 軸向固定架' },
        { code: 'FA', description: 'FA: 前法蘭連接板' },
        { code: 'SDB', description: 'SDB: 後鉸固定架' }
      ]}
    ]
  },
  {
    id: 'mpgh',
    superGroup: '小型多位置、自由安裝氣缸',
    group: 'MPG系列',
    code: 'MPGH',
    name: '鉸鏈安裝型氣缸(復動型)',
    format: '{code} {bore}X{stroke} {magnet} {rod} {mounting}',
    categories: [
      { id: 'bore', name: '缸徑', options: mpgBores },
      { id: 'stroke', name: '行程', options: mpgStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'rod', name: '活塞杆牙型', options: [
        { code: '', description: '空白: 外牙型' },
        { code: 'N', description: 'N: 無牙型' }
      ]},
      { id: 'mounting', name: '固定型式', options: [
        { code: '', description: '空白: 無安裝附件' },
        { code: 'LB', description: 'LB: 軸向固定架' },
        { code: 'FA', description: 'FA: 前法蘭連接板' },
        { code: 'SDB', description: 'SDB: 後鉸固定架' }
      ]}
    ]
  },
  {
    id: 'mu',
    superGroup: '小型多位置、自由安裝氣缸',
    group: 'MU系列',
    code: 'MU',
    name: '小型自由安裝氣缸(復動型)',
    format: '{code}{mounting} {bore}X{stroke} {magnet} {rod}',
    categories: [
      { id: 'mounting', name: '本體安裝方式', options: [
        { code: '', description: '空白: 橫向安裝' },
        { code: 'R', description: 'R: 軸向安裝' }
      ]},
      { id: 'bore', name: '缸徑', options: muBores },
      { id: 'stroke', name: '行程', options: muStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'rod', name: '活塞杆牙型', options: [
        { code: '', description: '空白: 無牙型' },
        { code: 'B', description: 'B: 外牙型' }
      ]}
    ]
  },
  {
    id: 'msu',
    superGroup: '小型多位置、自由安裝氣缸',
    group: 'MU系列',
    code: 'MSU',
    name: '小型自由安裝氣缸(單動押出型)',
    format: '{code}{mounting} {bore}X{stroke} {magnet} {rod}',
    categories: [
      { id: 'mounting', name: '本體安裝方式', options: [
        { code: '', description: '空白: 橫向安裝' },
        { code: 'R', description: 'R: 軸向安裝' }
      ]},
      { id: 'bore', name: '缸徑', options: muBores },
      { id: 'stroke', name: '行程', options: muStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'rod', name: '活塞杆牙型', options: [
        { code: '', description: '空白: 無牙型' },
        { code: 'B', description: 'B: 外牙型' }
      ]}
    ]
  },
  {
    id: 'md',
    superGroup: '多位置固定型氣缸',
    group: 'MD\\MK系列',
    code: 'MD',
    name: '多固型氣缸(復動型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: mdBores },
      { id: 'stroke', name: '行程', options: mdStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'msd',
    superGroup: '多位置固定型氣缸',
    group: 'MD\\MK系列',
    code: 'MSD',
    name: '多固型氣缸(單動押出型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: mdBores },
      { id: 'stroke', name: '行程', options: mdStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'mtd',
    superGroup: '多位置固定型氣缸',
    group: 'MD\\MK系列',
    code: 'MTD',
    name: '多固型氣缸(單動引入型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: mdBores },
      { id: 'stroke', name: '行程', options: mdStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'mdd',
    superGroup: '多位置固定型氣缸',
    group: 'MD\\MK系列',
    code: 'MDD',
    name: '多固型氣缸(雙軸復動型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: mdBores },
      { id: 'stroke', name: '行程', options: mdStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'mdj',
    superGroup: '多位置固定型氣缸',
    group: 'MD\\MK系列',
    code: 'MDJ',
    name: '多固型氣缸(雙軸復動行程可調型)',
    format: '{code} {bore}X{stroke}-{adjust} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: mdBores },
      { id: 'stroke', name: '行程', options: mdStrokes },
      { id: 'adjust', name: '調整行程', options: mdAdjustStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'mk',
    superGroup: '多位置固定型氣缸',
    group: 'MD\\MK系列',
    code: 'MK',
    name: '多固型氣缸(復動止回轉型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: mdBores },
      { id: 'stroke', name: '行程', options: mdStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'msk',
    superGroup: '多位置固定型氣缸',
    group: 'MD\\MK系列',
    code: 'MSK',
    name: '多固型氣缸(單動押出止回轉型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: mdBores },
      { id: 'stroke', name: '行程', options: mdStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'mtk',
    superGroup: '多位置固定型氣缸',
    group: 'MD\\MK系列',
    code: 'MTK',
    name: '多固型氣缸(單動引入止回轉型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: mdBores },
      { id: 'stroke', name: '行程', options: mdStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'mkd',
    superGroup: '多位置固定型氣缸',
    group: 'MD\\MK系列',
    code: 'MKD',
    name: '多固型氣缸(雙軸復動止回轉型)',
    format: '{code} {bore}X{stroke} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: mdBores },
      { id: 'stroke', name: '行程', options: mdStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'mkj',
    superGroup: '多位置固定型氣缸',
    group: 'MD\\MK系列',
    code: 'MKJ',
    name: '多固型氣缸(雙軸復動行程可調止回轉型)',
    format: '{code} {bore}X{stroke}-{adjust} {magnet} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: mdBores },
      { id: 'stroke', name: '行程', options: mdStrokes },
      { id: 'adjust', name: '調整行程', options: mdAdjustStrokes },
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
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
  console.log('Successfully added multi-position/free-mount cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
