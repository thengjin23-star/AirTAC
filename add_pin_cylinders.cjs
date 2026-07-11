const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

function generateBores(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

function generateStrokes(arr) {
  return arr.map(code => ({ code: String(code), description: `${code}mm` }));
}

const aqk_pins = [
  { code: '141X290', description: '141X290: 導向銷釘直徑Φ14.1, 高度29(不帶墊片)' },
  { code: '151X290', description: '151X290: 導向銷釘直徑Φ15.1, 高度29(不帶墊片)' },
  { code: '177X340', description: '177X340: 導向銷釘直徑Φ17.7, 高度34(不帶墊片)' },
  { code: '191X340', description: '191X340: 導向銷釘直徑Φ19.1, 高度34(不帶墊片)' },
  { code: '241X340', description: '241X340: 導向銷釘直徑Φ24.1, 高度34(不帶墊片)' },
  { code: '141X310', description: '141X310: 導向銷釘直徑Φ14.1, 高度31(帶墊片)' },
  { code: '151X310', description: '151X310: 導向銷釘直徑Φ15.1, 高度31(帶墊片)' },
  { code: '177X360', description: '177X360: 導向銷釘直徑Φ17.7, 高度36(帶墊片)' },
  { code: '191X360', description: '191X360: 導向銷釘直徑Φ19.1, 高度36(帶墊片)' },
  { code: '241X360', description: '241X360: 導向銷釘直徑Φ24.1, 高度36(帶墊片)' }
];

const newSeries = [
  {
    id: 'jqk',
    superGroup: '銷釘氣缸',
    group: 'JQK系列',
    code: 'JQK',
    name: '底板夾緊氣缸',
    format: '{code} {bore} {rod_dir} - {pin_dia} {boss_height} {clamp_thickness} {sensor} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: generateBores([32, 63]) },
      { id: 'rod_dir', name: '拉杆方向', options: [
        { code: '', description: '空白: 正向' },
        { code: 'R', description: 'R: 反向' }
      ]},
      { id: 'pin_dia', name: '導向銷直徑', options: [
        { code: '17', description: '17: Φ17.x' },
        { code: '19', description: '19: Φ19.x' },
        { code: '24', description: '24: Φ24.x' },
        { code: '29', description: '29: Φ29.x' }
      ]},
      { id: 'boss_height', name: '凸臺高度', options: [
        { code: 'L45', description: 'L45: 45mm' }
      ]},
      { id: 'clamp_thickness', name: '夾緊厚度', options: [
        { code: 'T16', description: 'T16: 1.6mm' }
      ]},
      { id: 'sensor', name: '傳感器', options: [
        { code: '', description: '空白: 不附傳感器' },
        { code: 'K', description: 'K: 附電感傳感器(PNP型)' },
        { code: 'KN', description: 'KN: 附電感傳感器(NPN型)' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'jcp',
    superGroup: '銷釘氣缸',
    group: 'JCP系列',
    code: 'JCP',
    name: '單伸縮銷',
    format: '{code} {bore}X{stroke} {pin_type} {sensor} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: generateBores([40, 63]) },
      { id: 'stroke', name: '行程', options: generateStrokes([40, 60]) },
      { id: 'pin_type', name: '銷釘類型', options: [
        { code: 'A', description: 'A型' },
        { code: 'B', description: 'B型' },
        { code: 'C', description: 'C型' },
        { code: 'D', description: 'D型' }
      ]},
      { id: 'sensor', name: '傳感器', options: [
        { code: '', description: '空白: 不附傳感器' },
        { code: 'K', description: 'K: 附電感傳感器(PNP型)' },
        { code: 'KN', description: 'KN: 附電感傳感器(NPN型)' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'jch',
    superGroup: '銷釘氣缸',
    group: 'JCH系列',
    code: 'JCH',
    name: '雙伸縮銷',
    format: '{code} {bore}X{stroke} {pin_type} {sensor} {thread}',
    categories: [
      { id: 'bore', name: '缸徑', options: generateBores([40, 63]) },
      { id: 'stroke', name: '行程', options: generateStrokes([40, 60]) },
      { id: 'pin_type', name: '銷釘類型', options: [
        { code: 'A', description: 'A型' },
        { code: 'B', description: 'B型' }
      ]},
      { id: 'sensor', name: '傳感器', options: [
        { code: '', description: '空白: 不附傳感器' },
        { code: 'K', description: 'K: 附電感傳感器(PNP型)' },
        { code: 'KN', description: 'KN: 附電感傳感器(NPN型)' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙(或M5)' },
        { code: 'G', description: 'G: G牙' }
      ]}
    ]
  },
  {
    id: 'aqk',
    superGroup: '銷釘氣缸',
    group: 'AQK系列',
    code: 'AQK',
    name: '銷釘氣缸',
    format: '{code}{bore} {magnet} {body} {relation} {arm} {shim} - {pin_spec}',
    categories: [
      { id: 'bore', name: '缸徑', options: generateBores([50]) },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'body', name: '本體安裝尺寸', options: [
        { code: 'A', description: 'A: A型配置關系' },
        { code: 'B', description: 'B: B型配置關系' },
        { code: 'C', description: 'C: C型配置關系' },
        { code: 'D', description: 'D: D型配置關系' }
      ]},
      { id: 'relation', name: '安裝面螺孔與銷孔位置關系', options: [
        { code: 'A', description: 'A: A型配置關系' },
        { code: 'B', description: 'B: B型配置關系' },
        { code: 'C', description: 'C: C型配置關系' },
        { code: 'D', description: 'D: D型配置關系' }
      ]},
      { id: 'arm', name: '夾緊臂位置', options: [
        { code: 'A', description: 'A: 夾緊臂與進氣孔同側(0°)' },
        { code: 'B', description: 'B: 夾緊臂與進氣孔90°' },
        { code: 'C', description: 'C: 夾緊臂與進氣孔180°' },
        { code: 'D', description: 'D: 夾緊臂與進氣孔270°' }
      ]},
      { id: 'shim', name: '調整墊片', options: [
        { code: '', description: '空白: 無調整墊片' },
        { code: '2', description: '2: 帶調整墊片2mm' }
      ]},
      { id: 'pin_spec', name: '導向銷釘規格代號', options: aqk_pins }
    ]
  },
  {
    id: 'baqk',
    superGroup: '銷釘氣缸',
    group: 'BAQK系列',
    code: 'BAQK',
    name: '抱緊型銷釘氣缸',
    format: '{code}{bore} {magnet} {body} {relation} {arm} {shim} - {pin_spec}',
    categories: [
      { id: 'bore', name: '缸徑', options: generateBores([50]) },
      { id: 'magnet', name: '磁石代號', options: [
        { code: 'S', description: 'S: 附磁石' }
      ]},
      { id: 'body', name: '本體安裝尺寸', options: [
        { code: 'A', description: 'A: A型配置關系' },
        { code: 'B', description: 'B: B型配置關系' },
        { code: 'C', description: 'C: C型配置關系' },
        { code: 'D', description: 'D: D型配置關系' }
      ]},
      { id: 'relation', name: '安裝面螺孔與銷孔位置關系', options: [
        { code: 'A', description: 'A: A型配置關系' },
        { code: 'B', description: 'B: B型配置關系' },
        { code: 'C', description: 'C: C型配置關系' },
        { code: 'D', description: 'D: D型配置關系' }
      ]},
      { id: 'arm', name: '夾緊臂位置', options: [
        { code: 'A', description: 'A: 夾緊臂與進氣孔同側(0°)' },
        { code: 'B', description: 'B: 夾緊臂與進氣孔90°' },
        { code: 'C', description: 'C: 夾緊臂與進氣孔180°' },
        { code: 'D', description: 'D: 夾緊臂與進氣孔270°' }
      ]},
      { id: 'shim', name: '調整墊片', options: [
        { code: '', description: '空白: 無調整墊片' },
        { code: '2', description: '2: 帶調整墊片2mm' }
      ]},
      { id: 'pin_spec', name: '導向銷釘規格代號', options: aqk_pins }
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
  console.log('Successfully added pin cylinders!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
