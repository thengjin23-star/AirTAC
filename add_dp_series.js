import fs from 'fs';
const file = 'src/data/catalog-air-prep.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const dpSeries = [
  {
    id: "DPH",
    category: "氣源處理元件",
    superGroup: "輔助元件",
    group: "壓力傳感器",
    name: "DPH系列 壓力傳感器",
    format: "DPH {output}{connection} - {range} {length} {thread}",
    categories: [
      {
        id: "output",
        name: "輸出型式",
        options: [
          {code: "N2", description: "NPN+類比電壓輸出(1~5V)"},
          {code: "P2", description: "PNP+類比電壓輸出(1~5V)"},
          {code: "N3", description: "NPN+類比電流輸出(4~20mA)"},
          {code: "P3", description: "PNP+類比電流輸出(4~20mA)"}
        ]
      },
      {
        id: "connection",
        name: "接電方式",
        options: [
          {code: "", description: "端子式接電"},
          {code: "B", description: "後出線式接電"}
        ]
      },
      {
        id: "range",
        name: "量測壓力範圍",
        options: [
          {code: "01", description: "-100kPa~100kPa"},
          {code: "10", description: "-100kPa~1,000kPa"}
        ]
      },
      {
        id: "length",
        name: "出線長度",
        options: [
          {code: "020", description: "線長2m"},
          {code: "030", description: "線長3m"},
          {code: "050", description: "線長5m"}
        ]
      },
      {
        id: "thread",
        name: "壓力氣孔型式",
        options: [
          {code: "", description: "外牙PT1/8; 內牙: M5"},
          {code: "T", description: "外牙NPT1/8; 內牙: 10-32UNF"},
          {code: "G", description: "外牙G1/8; 內牙: M5"}
        ]
      }
    ]
  },
  {
    id: "DPS",
    category: "氣源處理元件",
    superGroup: "輔助元件",
    group: "壓力傳感器",
    name: "DPS系列 壓力傳感器",
    format: "DPS {output}{connection} - {range} {length} {thread}",
    categories: [
      {
        id: "output",
        name: "輸出型式",
        options: [
          {code: "N1", description: "NPN"},
          {code: "P1", description: "PNP"}
        ]
      },
      {
        id: "connection",
        name: "接電方式",
        options: [
          {code: "", description: "端子式接電"},
          {code: "B", description: "後出線式接電"},
          {code: "D", description: "下出式接電"}
        ]
      },
      {
        id: "range",
        name: "量測壓力範圍",
        options: [
          {code: "01", description: "-100kPa~100kPa"},
          {code: "10", description: "-100kPa~1,000kPa"}
        ]
      },
      {
        id: "length",
        name: "出線長度",
        options: [
          {code: "020", description: "線長2m"},
          {code: "030", description: "線長3m"},
          {code: "050", description: "線長5m"},
          {code: "M08", description: "M8快遞公接頭+300mm"}
        ]
      },
      {
        id: "thread",
        name: "壓力氣孔型式",
        options: [
          {code: "", description: "外牙PT1/8; 內牙: M5"},
          {code: "T", description: "外牙NPT1/8; 內牙: 10-32UNF"},
          {code: "G", description: "外牙G1/8; 內牙: M5"}
        ]
      }
    ]
  }
];

data.series.push(...dpSeries);
fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('DP series added.');
