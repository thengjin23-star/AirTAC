import fs from 'fs';

const auxiliarySeries = [
  {
    id: "B-SS",
    category: "輔助元件",
    superGroup: "不銹鋼管接頭",
    group: "螺紋-螺紋類",
    name: "不銹鋼螺紋直通接頭 (BB/BD/BU/BZ)",
    format: "{series} {thread1} {thread2} - {type}",
    categories: [
      {
        id: "series",
        name: "規格代號",
        options: [
          {code: "BB", description: "BB: 雙外螺紋直通"},
          {code: "BD", description: "BD: 內外螺紋直通"},
          {code: "BU", description: "BU: 雙內螺紋直通"},
          {code: "BZ", description: "BZ: 外六角堵頭"}
        ]
      },
      {
        id: "thread1",
        name: "連接螺紋I",
        options: [
          {code: "01", description: "PT1/8"},
          {code: "02", description: "PT1/4"},
          {code: "03", description: "PT3/8"},
          {code: "04", description: "PT1/2"}
        ]
      },
      {
        id: "thread2",
        name: "連接螺紋II (BZ無此項)",
        options: [
          {code: "", description: "無(適用BZ)"},
          {code: "01", description: "PT1/8"},
          {code: "02", description: "PT1/4"},
          {code: "03", description: "PT3/8"},
          {code: "04", description: "PT1/2"}
        ]
      },
      {
        id: "type",
        name: "材質代號",
        options: [
          {code: "S", description: "不銹鋼304"}
        ]
      }
    ]
  },
  {
    id: "BKC",
    category: "輔助元件",
    superGroup: "不銹鋼管接頭",
    group: "螺紋-螺紋類",
    name: "BKC系列 鎖母直通",
    format: "BKC {outer} {inner} - {thread} - {type}",
    categories: [
      {
        id: "outer",
        name: "接管外徑",
        options: [
          {code: "04", description: "Φ4mm"},
          {code: "06", description: "Φ6mm"},
          {code: "08", description: "Φ8mm"},
          {code: "10", description: "Φ10mm"},
          {code: "12", description: "Φ12mm"}
        ]
      },
      {
        id: "inner",
        name: "接管內徑",
        options: [
          {code: "25", description: "Φ2.5mm"},
          {code: "04", description: "Φ4mm"},
          {code: "05", description: "Φ5mm"},
          {code: "06", description: "Φ6mm"},
          {code: "65", description: "Φ6.5mm"},
          {code: "75", description: "Φ7.5mm"},
          {code: "08", description: "Φ8mm"},
          {code: "09", description: "Φ9mm"}
        ]
      },
      {
        id: "thread",
        name: "連接螺紋",
        options: [
          {code: "M3", description: "M3x0.5"},
          {code: "M5", description: "M5x0.8"},
          {code: "01", description: "PT1/8"},
          {code: "02", description: "PT1/4"},
          {code: "03", description: "PT3/8"},
          {code: "04", description: "PT1/2"}
        ]
      },
      {
        id: "type",
        name: "材質代號",
        options: [
          {code: "S", description: "不銹鋼304"}
        ]
      }
    ]
  },
  {
    id: "BSL-SS",
    category: "輔助元件",
    superGroup: "不銹鋼消聲器",
    group: "消聲器",
    name: "不銹鋼消聲器 (BSL/BSLM/BESL)",
    format: "{series} {thread} - {type}",
    categories: [
      {
        id: "series",
        name: "消聲器類型",
        options: [
          {code: "BSL", description: "BSL: 通用型消聲器"},
          {code: "BSLM", description: "BSLM: 微型消聲器"},
          {code: "BESL", description: "BESL: 節流型消聲器"}
        ]
      },
      {
        id: "thread",
        name: "連接螺紋",
        options: [
          {code: "M5", description: "M5x0.8"},
          {code: "01", description: "PT1/8"},
          {code: "02", description: "PT1/4"},
          {code: "03", description: "PT3/8"},
          {code: "04", description: "PT1/2"}
        ]
      },
      {
        id: "type",
        name: "材質代號",
        options: [
          {code: "S", description: "不銹鋼304"}
        ]
      }
    ]
  },
  {
    id: "PU-Tube",
    category: "輔助元件",
    superGroup: "PU管",
    group: "PU管",
    name: "PU管 (US98A/UE95A)",
    format: "{series} {outer} {inner} {length} {color}",
    categories: [
      {
        id: "series",
        name: "規格代號",
        options: [
          {code: "US98A", description: "US98A: 聚酯, 硬度98A±2"},
          {code: "UE95A", description: "UE95A: 聚醚, 硬度95A±2"}
        ]
      },
      {
        id: "outer",
        name: "外徑代號",
        options: [
          {code: "032", description: "Φ3.2mm"},
          {code: "040", description: "Φ4.0mm"},
          {code: "060", description: "Φ6.0mm"},
          {code: "080", description: "Φ8.0mm"},
          {code: "100", description: "Φ10.0mm"},
          {code: "120", description: "Φ12.0mm"},
          {code: "160", description: "Φ16.0mm"}
        ]
      },
      {
        id: "inner",
        name: "內徑代號",
        options: [
          {code: "020", description: "Φ2.0mm"},
          {code: "025", description: "Φ2.5mm"},
          {code: "040", description: "Φ4.0mm"},
          {code: "050", description: "Φ5.0mm"},
          {code: "055", description: "Φ5.5mm"},
          {code: "065", description: "Φ6.5mm"},
          {code: "080", description: "Φ8.0mm"},
          {code: "100", description: "Φ10.0mm"},
          {code: "110", description: "Φ11.0mm"},
          {code: "120", description: "Φ12.0mm"}
        ]
      },
      {
        id: "length",
        name: "長度代號",
        options: [
          {code: "20M", description: "20m/卷"},
          {code: "100M", description: "100m/卷"},
          {code: "200M", description: "200m/卷"}
        ]
      },
      {
        id: "color",
        name: "顏色代號",
        options: [
          {code: "BU", description: "藍色"},
          {code: "BK", description: "黑色"},
          {code: "GN", description: "綠色"},
          {code: "GE", description: "橙色"},
          {code: "BR", description: "棕色"},
          {code: "C", description: "透明"},
          {code: "CR", description: "透明紅"},
          {code: "WH", description: "白色"},
          {code: "CG", description: "透明綠"},
          {code: "CB", description: "透明藍"},
          {code: "CY", description: "透明黃"},
          {code: "R", description: "紅色"},
          {code: "CE", description: "透明橙"},
          {code: "Y", description: "黃色"},
          {code: "GA", description: "灰色"}
        ]
      }
    ]
  },
  {
    id: "UWS98A",
    category: "輔助元件",
    superGroup: "雙層阻燃管",
    group: "雙層阻燃管",
    name: "UWS98A系列 雙層阻燃管",
    format: "UWS98A {outer} {inner} {length} {color}",
    categories: [
      {
        id: "outer",
        name: "外徑(內層)代號",
        options: [
          {code: "060", description: "Φ6.0mm"},
          {code: "080", description: "Φ8.0mm"},
          {code: "100", description: "Φ10.0mm"},
          {code: "120", description: "Φ12.0mm"}
        ]
      },
      {
        id: "inner",
        name: "內徑代號",
        options: [
          {code: "040", description: "Φ4.0mm"},
          {code: "050", description: "Φ5.0mm"},
          {code: "065", description: "Φ6.5mm"},
          {code: "080", description: "Φ8.0mm"}
        ]
      },
      {
        id: "length",
        name: "長度代號",
        options: [
          {code: "050M", description: "50m/卷"},
          {code: "100M", description: "100m/卷"}
        ]
      },
      {
        id: "color",
        name: "顏色代號",
        options: [
          {code: "BU", description: "藍色"},
          {code: "BK", description: "黑色"},
          {code: "GN", description: "綠色"},
          {code: "WH", description: "白色"},
          {code: "R", description: "紅色"},
          {code: "Y", description: "黃色"}
        ]
      }
    ]
  },
  {
    id: "PA-Tube",
    category: "輔助元件",
    superGroup: "尼龍管",
    group: "尼龍管",
    name: "PA管 (PA12/PA6)",
    format: "{series} {outer} {inner} {length} {color}",
    categories: [
      {
        id: "series",
        name: "規格代號",
        options: [
          {code: "PA12", description: "PA12: 尼龍12"},
          {code: "PA6", description: "PA6: 尼龍6"}
        ]
      },
      {
        id: "outer",
        name: "外徑代號",
        options: [
          {code: "040", description: "Φ4.0mm"},
          {code: "060", description: "Φ6.0mm"},
          {code: "080", description: "Φ8.0mm"},
          {code: "100", description: "Φ10.0mm"},
          {code: "120", description: "Φ12.0mm"}
        ]
      },
      {
        id: "inner",
        name: "內徑代號",
        options: [
          {code: "025", description: "Φ2.5mm"},
          {code: "040", description: "Φ4.0mm"},
          {code: "060", description: "Φ6.0mm"},
          {code: "075", description: "Φ7.5mm"},
          {code: "090", description: "Φ9.0mm"}
        ]
      },
      {
        id: "length",
        name: "長度代號",
        options: [
          {code: "100M", description: "100m/卷"},
          {code: "200M", description: "200m/卷"}
        ]
      },
      {
        id: "color",
        name: "顏色代號",
        options: [
          {code: "BU", description: "藍色"},
          {code: "BK", description: "黑色"},
          {code: "GE", description: "橙色"},
          {code: "N", description: "本色"},
          {code: "WH", description: "白色"},
          {code: "GN", description: "綠色"},
          {code: "R", description: "紅色"},
          {code: "Y", description: "黃色"}
        ]
      }
    ]
  },
  {
    id: "UN54D",
    category: "輔助元件",
    superGroup: "阻燃管",
    group: "阻燃管",
    name: "UN54D系列 阻燃管",
    format: "UN54D {outer} {inner} {length} {color}",
    categories: [
      {
        id: "outer",
        name: "外徑代號",
        options: [
          {code: "060", description: "Φ6.0mm"},
          {code: "080", description: "Φ8.0mm"},
          {code: "100", description: "Φ10.0mm"},
          {code: "120", description: "Φ12.0mm"}
        ]
      },
      {
        id: "inner",
        name: "內徑代號",
        options: [
          {code: "040", description: "Φ4.0mm"},
          {code: "050", description: "Φ5.0mm"},
          {code: "065", description: "Φ6.5mm"},
          {code: "080", description: "Φ8.0mm"}
        ]
      },
      {
        id: "length",
        name: "長度代號",
        options: [
          {code: "100M", description: "100m/卷"}
        ]
      },
      {
        id: "color",
        name: "顏色代號",
        options: [
          {code: "BU", description: "藍色"},
          {code: "BK", description: "黑色"},
          {code: "GN", description: "綠色"},
          {code: "WH", description: "白色"},
          {code: "R", description: "紅色"},
          {code: "Y", description: "黃色"}
        ]
      }
    ]
  },
  {
    id: "PWC-PWL",
    category: "輔助元件",
    superGroup: "氣動指示燈",
    group: "指示燈",
    name: "氣動指示燈 (PWC/PWL)",
    format: "{series} {port1} {port2} {color} {thread}",
    categories: [
      {
        id: "series",
        name: "規格代號",
        options: [
          {code: "PWC", description: "PWC: 三通標準型"},
          {code: "PWL", description: "PWL: 三通帶插管"}
        ]
      },
      {
        id: "port1",
        name: "接管口徑 (PWL用)",
        options: [
          {code: "", description: "無(適用PWC)"},
          {code: "4", description: "Φ4 (PWL)"},
          {code: "6", description: "Φ6 (PWL)"},
          {code: "8", description: "Φ8 (PWL)"}
        ]
      },
      {
        id: "port2",
        name: "接管口徑",
        options: [
          {code: "M5", description: "M5x0.8"},
          {code: "01", description: "1/8"},
          {code: "02", description: "1/4"}
        ]
      },
      {
        id: "color",
        name: "指示燈",
        options: [
          {code: "R", description: "紅色"},
          {code: "GN", description: "綠色"}
        ]
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: [
          {code: "", description: "PT牙(M5時為空)"},
          {code: "G", description: "G牙"},
          {code: "T", description: "NPT牙"}
        ]
      }
    ]
  }
];

const file = 'src/data/catalog-auxiliary.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
data.series.push(...auxiliarySeries);
fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Auxiliary series part 2 added.');
