const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

const newSeries = [
  {
    id: 'f_mq',
    superGroup: '氣缸附件',
    group: '傳感器與安裝附件',
    code: 'F-MQ',
    name: '圓形缸體用傳感器安裝附件',
    format: '{code} {spec}',
    categories: [
      { id: 'code', name: '類別代號', options: [{ code: 'F-MQ', description: 'F-MQ: 圓形缸體用傳感器安裝附件' }] },
      { id: 'spec', name: '規格代號', options: [
        { code: 'A20', description: 'A20: Φ20mm' },
        { code: 'A25', description: 'A25: Φ25mm' },
        { code: 'A32', description: 'A32: Φ32mm' },
        { code: 'A40', description: 'A40: Φ40mm' },
        { code: 'A50', description: 'A50: Φ50mm' },
        { code: 'A63', description: 'A63: Φ63mm' },
        { code: 'A80', description: 'A80: Φ80mm' },
        { code: 'A32T', description: 'A32T: Φ32mm' },
        { code: 'A40T', description: 'A40T: Φ40mm' },
        { code: 'A50T', description: 'A50T: Φ50mm' },
        { code: 'S06', description: 'S06: Φ6mm' },
        { code: 'S08', description: 'S08: Φ8mm' },
        { code: 'S10', description: 'S10: Φ10mm' },
        { code: 'S12', description: 'S12: Φ12mm' },
        { code: 'S16', description: 'S16: Φ16mm' },
        { code: 'S20', description: 'S20: Φ20mm' },
        { code: 'S25', description: 'S25: Φ25mm' },
        { code: 'S32', description: 'S32: Φ32mm' },
        { code: 'S40', description: 'S40: Φ40mm' },
        { code: 'S50', description: 'S50: Φ50mm' },
        { code: 'S63', description: 'S63: Φ63mm' }
      ]}
    ]
  },
  {
    id: 'f_sc_sh',
    superGroup: '氣缸附件',
    group: '傳感器與安裝附件',
    code: 'F-',
    name: '拉杆缸用安裝附件',
    format: '{code}{type} {spec}',
    categories: [
      { id: 'code', name: '類別', options: [{ code: 'F-', description: 'F-: 附件' }] },
      { id: 'type', name: '類型', options: [
        { code: 'SC', description: 'SC: 適用 SC, SGC' },
        { code: 'SH', description: 'SH: 適用 SC, SGC' },
        { code: 'ACT', description: 'ACT: 適用 ACT' }
      ]},
      { id: 'spec', name: '規格代號', options: [
        { code: '32', description: '32' },
        { code: '50', description: '50' },
        { code: '63', description: '63' },
        { code: '80', description: '80' },
        { code: '125', description: '125' },
        { code: '160', description: '160' },
        { code: '200', description: '200' },
        { code: '250', description: '250' }
      ]}
    ]
  },
  {
    id: 'dms',
    superGroup: '氣缸附件',
    group: '傳感器與安裝附件',
    code: 'DMS',
    name: 'DMS系列電子式傳感器',
    format: '{code}{type} - {output} {wire}',
    categories: [
      { id: 'type', name: '系列代號', options: [
        { code: 'G', description: 'G型' },
        { code: 'H', description: 'H型' },
        { code: 'E', description: 'E型' },
        { code: 'J', description: 'J型' }
      ]},
      { id: 'output', name: '輸出型式與接線', options: [
        { code: '020', description: '020: 二線式/三線式 線長2m' },
        { code: '030', description: '030: 二線式/三線式 線長3m' },
        { code: '050', description: '050: 二線式/三線式 線長5m' },
        { code: '100', description: '100: 二線式/三線式 線長10m' },
        { code: 'M08', description: 'M08: M8快速公接頭+0.5m線長' },
        { code: 'M12', description: 'M12: M12快速公接頭+0.5m線長' }
      ]},
      { id: 'wire', name: '特規代號', options: [
        { code: '', description: '空白: 一般型' },
        { code: 'RW', description: 'RW: 防水耐油抗撓曲型' }
      ]}
    ]
  },
  {
    id: 'ems',
    superGroup: '氣缸附件',
    group: '傳感器與安裝附件',
    code: 'EMS',
    name: 'EMS系列電子式傳感器',
    format: '{code}{type} - {output} {wire}',
    categories: [
      { id: 'type', name: '系列代號', options: [
        { code: 'G', description: 'G型' },
        { code: 'H', description: 'H型' }
      ]},
      { id: 'output', name: '輸出型式與接線', options: [
        { code: '020', description: '020: 二線式/三線式 線長2m' },
        { code: '030', description: '030: 二線式/三線式 線長3m' },
        { code: '050', description: '050: 二線式/三線式 線長5m' },
        { code: '100', description: '100: 二線式/三線式 線長10m' },
        { code: 'M08', description: 'M08: M8快速公接頭+0.5m線長' },
        { code: 'M12', description: 'M12: M12快速公接頭+0.5m線長' }
      ]},
      { id: 'wire', name: '特規代號', options: [
        { code: '', description: '空白: 一般型' },
        { code: 'RW', description: 'RW: 防水耐油抗撓曲型' }
      ]}
    ]
  },
  {
    id: 'cms',
    superGroup: '氣缸附件',
    group: '傳感器與安裝附件',
    code: 'CMS',
    name: 'CMS系列磁簧式傳感器',
    format: '{code}{type} - {output} {wire}',
    categories: [
      { id: 'type', name: '系列代號', options: [
        { code: 'G', description: 'G型' },
        { code: 'H', description: 'H型' },
        { code: 'E', description: 'E型' },
        { code: 'J', description: 'J型' }
      ]},
      { id: 'output', name: '輸出型式與接線', options: [
        { code: '020', description: '020: 二線式/三線式 線長2m' },
        { code: '030', description: '030: 二線式/三線式 線長3m' },
        { code: '050', description: '050: 二線式/三線式 線長5m' },
        { code: '100', description: '100: 二線式/三線式 線長10m' },
        { code: 'M08', description: 'M08: M8快速公接頭+0.5m線長' },
        { code: 'M12', description: 'M12: M12快速公接頭+0.5m線長' }
      ]},
      { id: 'wire', name: '特規代號', options: [
        { code: '', description: '空白: 一般型' },
        { code: 'H', description: 'H: 高溫型' }
      ]}
    ]
  },
  {
    id: 'prsu',
    superGroup: '氣缸附件',
    group: '傳感器與安裝附件',
    code: 'PRSU',
    name: 'PRSU系列槽型光電傳感器',
    format: '{code} {type} - {output} {length}',
    categories: [
      { id: 'type', name: '系列代號', options: [
        { code: 'T', description: 'T型' },
        { code: 'F', description: 'F型' },
        { code: 'R', description: 'R型' },
        { code: 'K', description: 'K型' },
        { code: 'L', description: 'L型' },
        { code: 'Y', description: 'Y型' }
      ]},
      { id: 'output', name: '輸出型式', options: [
        { code: 'N', description: 'N: NPN' },
        { code: 'P', description: 'P: PNP' }
      ]},
      { id: 'length', name: '接線型式', options: [
        { code: '020', description: '020: 線長2m' },
        { code: '030', description: '030: 線長3m' },
        { code: '050', description: '050: 線長5m' }
      ]}
    ]
  },
  {
    id: 'joint',
    superGroup: '氣缸附件',
    group: '活塞杆端連接附件',
    code: 'F-M',
    name: '氣缸活塞杆端連接附件',
    format: '{code}{thread} {type}',
    categories: [
      { id: 'thread', name: '螺紋規格與牙距', options: [
        { code: '3X050', description: 'M3x0.5' },
        { code: '4X070', description: 'M4x0.7' },
        { code: '5X080', description: 'M5x0.8' },
        { code: '6X100', description: 'M6x1.0' },
        { code: '8X125', description: 'M8x1.25' },
        { code: '10X125', description: 'M10x1.25' },
        { code: '12X125', description: 'M12x1.25' },
        { code: '14X150', description: 'M14x1.5' },
        { code: '16X150', description: 'M16x1.5' },
        { code: '18X150', description: 'M18x1.5' },
        { code: '20X150', description: 'M20x1.5' },
        { code: '22X150', description: 'M22x1.5' },
        { code: '26X150', description: 'M26x1.5' },
        { code: '27X200', description: 'M27x2.0' },
        { code: '36X200', description: 'M36x2.0' },
        { code: '42X200', description: 'M42x2.0' }
      ]},
      { id: 'type', name: '附件類別', options: [
        { code: 'I', description: 'I: I接頭' },
        { code: 'Y', description: 'Y: Y接頭' },
        { code: 'F', description: 'F: 浮動接頭' },
        { code: 'U', description: 'U: 魚眼接頭' }
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
  console.log('Successfully added attachments!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
