const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

const newSeries = [
  {
    id: 'twq',
    superGroup: '阻擋氣缸',
    group: 'TWQ系列',
    code: 'TWQ',
    name: '阻擋氣缸',
    format: '{type} {bore}X{stroke} {magnet} {block_type} {self_lock} {thread}',
    categories: [
      { id: 'type', name: '種類', options: [
        { code: 'TWQ', description: 'TWQ: 阻擋氣缸(高度固定複動型)' },
        { code: 'TTQ', description: 'TTQ: 阻擋氣缸(高度固定單動引入型)' }
      ]},
      { id: 'bore', name: '缸徑', options: [
        { code: '20', description: '20mm' },
        { code: '25', description: '25mm' },
        { code: '32', description: '32mm' },
        { code: '40', description: '40mm' },
        { code: '50', description: '50mm' }
      ]},
      { id: 'stroke', name: '行程', options: [
        { code: '10', description: '10mm' },
        { code: '15', description: '15mm' },
        { code: '20', description: '20mm' },
        { code: '25', description: '25mm' },
        { code: '30', description: '30mm' }
      ]},
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'block_type', name: '阻擋方式', options: [
        { code: 'C', description: 'C: 圓柱型' },
        { code: 'B', description: 'B: 扁柱型' },
        { code: 'R', description: 'R: 滾輪型' },
        { code: 'K', description: 'K: 杠杆式滾輪型(帶可調油壓緩衝器)' }
      ]},
      { id: 'self_lock', name: '自鎖功能', options: [
        { code: '', description: '空白: 無自鎖' },
        { code: 'F', description: 'F: 帶自鎖' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' }
      ]}
    ]
  },
  {
    id: 'twg',
    superGroup: '阻擋氣缸',
    group: 'TWG系列',
    code: 'TWG',
    name: '阻擋氣缸',
    format: '{type} {bore}X{stroke} {magnet} {block_type} {self_lock} {thread}',
    categories: [
      { id: 'type', name: '種類', options: [
        { code: 'TWG', description: 'TWG: 阻擋氣缸(高度可調複動型)' },
        { code: 'TTG', description: 'TTG: 阻擋氣缸(高度可調單動引入型)' }
      ]},
      { id: 'bore', name: '缸徑', options: [
        { code: '32', description: '32mm' },
        { code: '40', description: '40mm' },
        { code: '50', description: '50mm' }
      ]},
      { id: 'stroke', name: '行程', options: [
        { code: '10', description: '10mm' },
        { code: '15', description: '15mm' },
        { code: '20', description: '20mm' },
        { code: '25', description: '25mm' },
        { code: '30', description: '30mm' }
      ]},
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'block_type', name: '阻擋方式', options: [
        { code: 'C', description: 'C: 圓柱型' },
        { code: 'B', description: 'B: 扁柱型' },
        { code: 'R', description: 'R: 滾輪型' },
        { code: 'K', description: 'K: 杠杆式滾輪型(帶可調油壓緩衝器)' }
      ]},
      { id: 'self_lock', name: '自鎖功能', options: [
        { code: '', description: '空白: 無自鎖' },
        { code: 'F', description: 'F: 帶自鎖' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' }
      ]}
    ]
  },
  {
    id: 'twh',
    superGroup: '阻擋氣缸',
    group: 'TWH系列',
    code: 'TWH',
    name: '阻擋氣缸',
    format: '{type} {bore}X{stroke} {magnet} {block_type} {self_lock} {thread}',
    categories: [
      { id: 'type', name: '種類', options: [
        { code: 'TWH', description: 'TWH: 阻擋氣缸(複動型)' },
        { code: 'TDH', description: 'TDH: 阻擋氣缸(內置彈簧複動型)' },
        { code: 'TTH', description: 'TTH: 阻擋氣缸(單動引入型)' }
      ]},
      { id: 'bore', name: '缸徑', options: [
        { code: '20', description: '20mm' },
        { code: '25', description: '25mm' },
        { code: '32', description: '32mm' },
        { code: '40', description: '40mm' },
        { code: '50', description: '50mm' },
        { code: '63', description: '63mm' },
        { code: '80', description: '80mm' }
      ]},
      { id: 'stroke', name: '行程', options: [
        { code: '15', description: '15mm' },
        { code: '20', description: '20mm' },
        { code: '30', description: '30mm' },
        { code: '40', description: '40mm' }
      ]},
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'block_type', name: '阻擋方式', options: [
        { code: 'L', description: 'L: 杠杆式滾輪型(不可調油壓緩衝器)' },
        { code: 'K', description: 'K: 杠杆式滾輪型(可調油壓緩衝器)' }
      ]},
      { id: 'self_lock', name: '自鎖功能', options: [
        { code: '', description: '空白: 無自鎖' },
        { code: 'F', description: 'F: 帶自鎖' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' }
      ]}
    ]
  },
  {
    id: 'twm',
    superGroup: '阻擋氣缸',
    group: 'TWM系列',
    code: 'TWM',
    name: '阻擋氣缸',
    format: '{type} {bore}X{stroke} {magnet} {block_type} {self_lock} {thread}',
    categories: [
      { id: 'type', name: '種類', options: [
        { code: 'TWM', description: 'TWM: 阻擋氣缸(複動型)' },
        { code: 'TDM', description: 'TDM: 阻擋氣缸(內置彈簧複動型)' },
        { code: 'TTM', description: 'TTM: 阻擋氣缸(單動引入型)' }
      ]},
      { id: 'bore', name: '缸徑', options: [
        { code: '50', description: '50mm' }
      ]},
      { id: 'stroke', name: '行程', options: [
        { code: '30', description: '30mm' }
      ]},
      { id: 'magnet', name: '磁石代號', options: [
        { code: '', description: '空白: 不附磁石' },
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'block_type', name: '阻擋方式', options: [
        { code: 'K', description: 'K: 杠杆式滾輪型(可調油壓緩衝器)' }
      ]},
      { id: 'self_lock', name: '自鎖功能', options: [
        { code: '', description: '空白: 無自鎖' },
        { code: 'F', description: 'F: 帶自鎖' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' }
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
  console.log('Successfully added stopper cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
