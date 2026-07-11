const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

function generateBores(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

function generateStrokes(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

const qdkBores = generateBores([20, 25, 32, 40]);
const qckBores = generateBores([12, 16, 20, 25, 32, 40, 50, 63]);
const ackBores = generateBores([25, 32, 40, 50, 63]);

const directions = [
  { code: 'L', description: 'L: 左旋' },
  { code: 'R', description: 'R: 右旋' }
];

const ack_directions = [
  { code: 'L', description: 'L: 下壓左旋' },
  { code: 'R', description: 'R: 下壓右旋' }
];

const newSeries = [
  {
    id: 'qdk',
    superGroup: '旋轉夾緊氣缸',
    group: 'QDK系列',
    code: 'QDK',
    name: '平面回轉夾緊氣缸',
    format: '{code}{dir} {bore}X{stroke} {magnet} {cover} {thread}',
    categories: [
      { id: 'dir', name: '轉向', options: directions },
      { id: 'bore', name: '缸徑', options: qdkBores },
      { id: 'stroke', name: '夾緊行程', options: [{ code: '5', description: '5mm' }] },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'cover', name: '前蓋型式', options: [
        { code: '', description: '空白: 穿穿板型' },
        { code: 'U', description: 'U: 平面型' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'qck',
    superGroup: '旋轉夾緊氣缸',
    group: 'QCK系列',
    code: 'QCK',
    name: '回轉夾緊氣缸',
    format: '{code}{dir} {bore}X{stroke} {magnet} {rod_end} {mounting} {thread}',
    categories: [
      { id: 'dir', name: '轉向', options: directions },
      { id: 'bore', name: '缸徑', options: qckBores },
      { id: 'stroke', name: '夾緊行程', options: generateStrokes([10, 20, 30, 50]) },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'rod_end', name: '活塞杆端部型式', options: [
        { code: '', description: '空白: 錐度型(帶擺臂)' },
        { code: 'M', description: 'M: 扁位型(不帶擺臂)' }
      ]},
      { id: 'mounting', name: '固定型式', options: [
        { code: '', description: '空白: 無安裝附件' },
        { code: 'FB', description: 'FB: 後蓋法蘭連接板' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'ack',
    superGroup: '旋轉夾緊氣缸',
    group: 'ACK系列',
    code: 'ACK',
    name: '轉角氣缸(單邊壓板)',
    format: '{code}{dir} {bore}X{angle} {thread}',
    categories: [
      { id: 'dir', name: '轉向', options: ack_directions },
      { id: 'bore', name: '缸徑', options: ackBores },
      { id: 'angle', name: '轉角', options: [
        { code: '90', description: '90°' },
        { code: '180', description: '180°' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' }
      ]}
    ]
  },
  {
    id: 'ackd',
    superGroup: '旋轉夾緊氣缸',
    group: 'ACK系列',
    code: 'ACKD',
    name: '轉角氣缸(雙邊壓板)',
    format: '{code}{dir} {bore}X{angle} {thread}',
    categories: [
      { id: 'dir', name: '轉向', options: ack_directions },
      { id: 'bore', name: '缸徑', options: ackBores },
      { id: 'angle', name: '轉角', options: [
        { code: '90', description: '90°' },
        { code: '180', description: '180°' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' }
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
  console.log('Successfully added rotary clamp cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
