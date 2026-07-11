const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

const newSeries = [
  {
    id: '4sv_base',
    category: '控制元件',
    superGroup: '電磁閥底座與配件',
    group: '4SV系列底座',
    code: '4SV',
    name: '4SV系列用底座',
    format: '{code} {stations} {thread}',
    categories: [
      { id: 'code', name: '規格代號', options: [
        { code: '4SV100M', description: '4SV100M: 4SV100系列底座' },
        { code: '4SV200M', description: '4SV200M: 4SV200系列底座' },
        { code: '4SV300M', description: '4SV300M: 4SV300系列底座' },
        { code: '4SV400M', description: '4SV400M: 4SV400系列底座' }
      ]},
      { id: 'stations', name: '連數代號', options: [
        { code: '1F', description: '1F: 1連' },
        { code: '2F', description: '2F: 2連' },
        { code: '3F', description: '3F: 3連' },
        { code: '4F', description: '4F: 4連' },
        { code: '5F', description: '5F: 5連' },
        { code: '6F', description: '6F: 6連' },
        { code: '7F', description: '7F: 7連' },
        { code: '8F', description: '8F: 8連' },
        { code: '9F', description: '9F: 9連' },
        { code: '10F', description: '10F: 10連' },
        { code: '20F', description: '20F: 20連' },
        { code: '30F', description: '30F: 30連' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: '4stv_base',
    category: '控制元件',
    superGroup: '電磁閥底座與配件',
    group: '4STV系列底座',
    code: '4STV',
    name: '4STV系列用底座',
    format: '{code} {stations} {thread}',
    categories: [
      { id: 'code', name: '規格代號', options: [
        { code: '4STV100M', description: '4STV100M: 4STV100系列底座' },
        { code: '4STV200M', description: '4STV200M: 4STV200系列底座' },
        { code: '4STV300M', description: '4STV300M: 4STV300系列底座' }
      ]},
      { id: 'stations', name: '連數代號', options: [
        { code: '1F', description: '1F: 1連' },
        { code: '2F', description: '2F: 2連' },
        { code: '3F', description: '3F: 3連' },
        { code: '4F', description: '4F: 4連' },
        { code: '5F', description: '5F: 5連' },
        { code: '6F', description: '6F: 6連' },
        { code: '7F', description: '7F: 7連' },
        { code: '8F', description: '8F: 8連' },
        { code: '9F', description: '9F: 9連' },
        { code: '10F', description: '10F: 10連' },
        { code: '20F', description: '20F: 20連' },
        { code: '30F', description: '30F: 30連' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: '6stv_base',
    category: '控制元件',
    superGroup: '電磁閥底座與配件',
    group: '6STV系列底座',
    code: '6STV',
    name: '6STV系列用底座',
    format: '{code} {stations} {thread}',
    categories: [
      { id: 'code', name: '規格代號', options: [
        { code: '6STV0500M', description: '6STV0500M: 6STV0500系列底座' },
        { code: '6STV100M', description: '6STV100M: 6STV100系列底座' },
        { code: '6STV200M', description: '6STV200M: 6STV200系列底座' },
        { code: '6STV300M', description: '6STV300M: 6STV300系列底座' }
      ]},
      { id: 'stations', name: '連數代號', options: [
        { code: '1F', description: '1F: 1連' },
        { code: '2F', description: '2F: 2連' },
        { code: '3F', description: '3F: 3連' },
        { code: '4F', description: '4F: 4連' },
        { code: '5F', description: '5F: 5連' },
        { code: '6F', description: '6F: 6連' },
        { code: '7F', description: '7F: 7連' },
        { code: '8F', description: '8F: 8連' },
        { code: '9F', description: '9F: 9連' },
        { code: '10F', description: '10F: 10連' },
        { code: '20F', description: '20F: 20連' },
        { code: '30F', description: '30F: 30連' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: '7sv_base',
    category: '控制元件',
    superGroup: '電磁閥底座與配件',
    group: '7SV系列底座',
    code: '7SV',
    name: '7SV系列用底座',
    format: '{code} {stations} {thread}',
    categories: [
      { id: 'code', name: '規格代號', options: [
        { code: '7SV0500M', description: '7SV0500M: 7SV0500系列底座' },
        { code: '7SV100M', description: '7SV100M: 7SV100系列底座' },
        { code: '7SV200M', description: '7SV200M: 7SV200系列底座' },
        { code: '7SV300M', description: '7SV300M: 7SV300系列底座' }
      ]},
      { id: 'stations', name: '連數代號', options: [
        { code: '1F', description: '1F: 1連' },
        { code: '2F', description: '2F: 2連' },
        { code: '3F', description: '3F: 3連' },
        { code: '4F', description: '4F: 4連' },
        { code: '5F', description: '5F: 5連' },
        { code: '6F', description: '6F: 6連' },
        { code: '7F', description: '7F: 7連' },
        { code: '8F', description: '8F: 8連' },
        { code: '9F', description: '9F: 9連' },
        { code: '10F', description: '10F: 10連' },
        { code: '20F', description: '20F: 20連' },
        { code: '30F', description: '30F: 30連' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: '6sv_base',
    category: '控制元件',
    superGroup: '電磁閥底座與配件',
    group: '6SV系列底座',
    code: '6SV',
    name: '6SV系列用底座',
    format: '{code} {stations} {thread}',
    categories: [
      { id: 'code', name: '規格代號', options: [
        { code: '6SV0500M', description: '6SV0500M: 6SV0500系列底座' },
        { code: '6SV100M', description: '6SV100M: 6SV100系列底座' },
        { code: '6SV200M', description: '6SV200M: 6SV200系列底座' },
        { code: '6SV300M', description: '6SV300M: 6SV300系列底座' },
        { code: '6SV400M', description: '6SV400M: 6SV400系列底座' }
      ]},
      { id: 'stations', name: '連數代號', options: [
        { code: '1F', description: '1F: 1連' },
        { code: '2F', description: '2F: 2連' },
        { code: '3F', description: '3F: 3連' },
        { code: '4F', description: '4F: 4連' },
        { code: '5F', description: '5F: 5連' },
        { code: '6F', description: '6F: 6連' },
        { code: '7F', description: '7F: 7連' },
        { code: '8F', description: '8F: 8連' },
        { code: '9F', description: '9F: 9連' },
        { code: '10F', description: '10F: 10連' },
        { code: '20F', description: '20F: 20連' },
        { code: '30F', description: '30F: 30連' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: 'cpv10_base',
    category: '控制元件',
    superGroup: '電磁閥底座與配件',
    group: 'CPV10S系列底座',
    code: 'CPV10M',
    name: 'CPV10S系列配套用底座',
    format: '{code} {port} - {stations}',
    categories: [
      { id: 'code', name: '規格代號', options: [
        { code: 'CPV10M', description: 'CPV10M: CPV10系列底座' }
      ]},
      { id: 'port', name: 'A孔接管口徑', options: [
        { code: 'J03', description: 'J03: Φ3.2快插接頭' },
        { code: 'J04', description: 'J04: Φ4快插接頭' }
      ]},
      { id: 'stations', name: '連數代號', options: [
        { code: '2F', description: '2F: 2連' },
        { code: '3F', description: '3F: 3連' },
        { code: '4F', description: '4F: 4連' },
        { code: '20F', description: '20F: 20連 (最大至20連)' }
      ]}
    ]
  },
  {
    id: 'cpv15_base',
    category: '控制元件',
    superGroup: '電磁閥底座與配件',
    group: 'CPV15S系列底座',
    code: 'CPV15S',
    name: 'CPV15S系列集成底座',
    format: '{code} {stations} {thread}',
    categories: [
      { id: 'code', name: '規格代號', options: [
        { code: 'CPV15S', description: 'CPV15S: CPV15S系列集成閥' }
      ]},
      { id: 'stations', name: '連數代號', options: [
        { code: '2F', description: '2F: 2連' },
        { code: '3F', description: '3F: 3連' },
        { code: '4F', description: '4F: 4連' },
        { code: '20F', description: '20F: 20連 (最大至20連)' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: '3v2_base',
    category: '控制元件',
    superGroup: '電磁閥底座與配件',
    group: '3V2M系列底座',
    code: '3V2M',
    name: '3V2系列底座',
    format: '3V2M {stations} {thread}',
    categories: [
      { id: 'stations', name: '連數代號', options: [
        { code: '1F', description: '1F: 1連' },
        { code: '2F', description: '2F: 2連' },
        { code: '3F', description: '3F: 3連' },
        { code: '20F', description: '20F: 20連 (最大至20連)' }
      ]},
      { id: 'thread', name: '牙型代碼', options: [
        { code: '', description: '空白: PT牙' },
        { code: 'G', description: 'G: G牙' },
        { code: 'T', description: 'T: NPT牙' }
      ]}
    ]
  },
  {
    id: 'blanking_plates',
    category: '控制元件',
    superGroup: '電磁閥底座與配件',
    group: '底座盲板組件',
    code: 'P-',
    name: '底座盲板組件',
    format: 'P-{code}-R2',
    categories: [
      { id: 'code', name: '規格代號', options: [
        { code: '4SV100M', description: '4SV100M: 4SV100系列底座' },
        { code: '4SV200M', description: '4SV200M: 4SV200系列底座' },
        { code: '4SV300M', description: '4SV300M: 4SV300系列底座' },
        { code: '4SV400M', description: '4SV400M: 4SV400系列底座' },
        { code: '4STV100M', description: '4STV100M: 4STV100系列底座' },
        { code: '4STV200M', description: '4STV200M: 4STV200系列底座' },
        { code: '4STV300M', description: '4STV300M: 4STV300系列底座' },
        { code: '6STV0500M', description: '6STV0500M: 6STV0500系列底座' },
        { code: '6STV100M', description: '6STV100M: 6STV100系列底座' },
        { code: '6STV200M', description: '6STV200M: 6STV200系列底座' },
        { code: '6STV300M', description: '6STV300M: 6STV300系列底座' },
        { code: '7SV0500M', description: '7SV0500M: 7SV0500系列底座' },
        { code: '7SV100M', description: '7SV100M: 7SV100系列底座' },
        { code: '7SV200M', description: '7SV200M: 7SV200系列底座' },
        { code: '7SV300M', description: '7SV300M: 7SV300系列底座' },
        { code: '6SV0500M', description: '6SV0500M: 6SV0500系列底座' },
        { code: '6SV100M', description: '6SV100M: 6SV100系列底座' },
        { code: '6SV200M', description: '6SV200M: 6SV200系列底座' },
        { code: '6SV300M', description: '6SV300M: 6SV300系列底座' },
        { code: '6SV400M', description: '6SV400M: 6SV400系列底座' },
        { code: 'CPV10M', description: 'CPV10M: CPV10系列底座' },
        { code: 'CPV15S', description: 'CPV15S: CPV15S系列底座' },
        { code: '3V2M', description: '3V2M: 3V2系列底座' }
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
  console.log('Successfully added bases and blanking plates!');
} else {
  console.error('Could not find end of defaultCatalog array');
}
