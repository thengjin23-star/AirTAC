import fs from 'fs';
const data = JSON.parse(fs.readFileSync('src/data/catalog-solenoid-valves.json', 'utf8'));
const series = data.series.find(s => s.id === '6D-manifold');

series.orderCodeFormat = "{seriesCode} {stations}-{port} {voltage} {singleCtrl} {doubleCtrl} {midClosed} {midExhaust} {midPressure} {commModule} {specialValve}";
series.name = "6D/6DM/6DW系列 集成閥組 (五口二位、五口三位)";

series.categories = [
  {
    "id": "seriesCode",
    "name": "系列代號",
    "options": [
      { "code": "6D05H", "description": "6D0500系列 側出型集成閥組" },
      { "code": "6D1H", "description": "6D100系列 側出型集成閥組" },
      { "code": "6D2H", "description": "6D200系列 側出型集成閥組" }
    ]
  },
  {
    "id": "stations",
    "name": "總連數代號",
    "options": [
      { "code": "3F", "description": "3連" },
      { "code": "4F", "description": "4連" },
      { "code": "5F", "description": "5連" },
      { "code": "6F", "description": "6連" },
      { "code": "7F", "description": "7連" },
      { "code": "8F", "description": "8連" },
      { "code": "9F", "description": "9連" },
      { "code": "10F", "description": "10連" },
      { "code": "11F", "description": "11連" },
      { "code": "12F", "description": "12連" },
      { "code": "21F", "description": "21連" }
    ]
  },
  {
    "id": "port",
    "name": "接管口徑(A/B口)",
    "options": [
      { "code": "J04", "description": "Φ4快插接頭接管" },
      { "code": "J06", "description": "Φ6快插接頭接管" },
      { "code": "J08", "description": "Φ8快插接頭接管" },
      { "code": "J10", "description": "Φ10快插接頭接管" }
    ]
  },
  {
    "id": "voltage",
    "name": "標準電壓",
    "options": [
      { "code": "B", "description": "DC24V" },
      { "code": "F", "description": "DC12V" }
    ]
  },
  {
    "id": "singleCtrl",
    "name": "單控電磁閥數",
    "options": [
      { "code": "", "description": "無" },
      { "code": "S1", "description": "1個" },
      { "code": "S2", "description": "2個" }
    ]
  },
  {
    "id": "doubleCtrl",
    "name": "雙控電磁閥數",
    "options": [
      { "code": "", "description": "無" },
      { "code": "D1", "description": "1個" },
      { "code": "D2", "description": "2個" }
    ]
  },
  {
    "id": "midClosed",
    "name": "三位中封式電磁閥數",
    "options": [
      { "code": "", "description": "無" },
      { "code": "C1", "description": "1個" },
      { "code": "C2", "description": "2個" }
    ]
  },
  {
    "id": "midExhaust",
    "name": "三位中泄式電磁閥數",
    "options": [
      { "code": "", "description": "無" },
      { "code": "E1", "description": "1個" },
      { "code": "E2", "description": "2個" }
    ]
  },
  {
    "id": "midPressure",
    "name": "三位中壓式電磁閥數",
    "options": [
      { "code": "", "description": "無" },
      { "code": "P1", "description": "1個" },
      { "code": "P2", "description": "2個" }
    ]
  },
  {
    "id": "commModule",
    "name": "通信協議模塊規格",
    "options": [
      { "code": "", "description": "不附通信協議模塊" },
      { "code": "CPN1", "description": "附Profinet通信協議模塊PNP型" },
      { "code": "CEN1", "description": "附EtherNet/IP通信協議模塊PNP型" },
      { "code": "CEA1", "description": "附EtherCAT通信協議模塊PNP型" },
      { "code": "CLK1", "description": "附IO-Link通信協議模塊PNP型" },
      { "code": "CPN2", "description": "附Profinet通信協議模塊NPN型" },
      { "code": "CEN2", "description": "附EtherNet/IP通信協議模塊NPN型" },
      { "code": "CEA2", "description": "附EtherCAT通信協議模塊NPN型" }
    ]
  },
  {
    "id": "specialValve",
    "name": "獨立進氣/排氣/外部先導/雙三口二位電磁閥數量",
    "options": [
      { "code": "", "description": "無" },
      { "code": "SE1", "description": "獨立進氣的單控電磁閥1個" },
      { "code": "DE1", "description": "獨立進氣的雙控電磁閥1個" },
      { "code": "SR1", "description": "獨立排氣的單控電磁閥1個" },
      { "code": "DR1", "description": "獨立排氣的雙控電磁閥1個" },
      { "code": "SW1", "description": "外部先導單控電磁閥1個" },
      { "code": "DW1", "description": "外部先導雙控電磁閥1個" },
      { "code": "DNC1", "description": "雙三口二位電磁閥(NC-NC)1個" },
      { "code": "DNO1", "description": "雙三口二位電磁閥(NO-NO)1個" }
    ]
  }
];

// Add single/different series for 6D solenoid valves from page 3
const singleValves = {
  "id": "6D-single",
  "category": "控制元件",
  "superGroup": "電磁閥(五口二位、五口三位)",
  "group": "6D系列單體",
  "name": "6D系列 雙三口二位/不同進氣方式電磁閥",
  "orderCodeFormat": "6D {series} {controlType} {voltage} {pilotType}",
  "categories": [
    {
      "id": "series",
      "name": "系列代號",
      "options": [
        { "code": "05", "description": "0500系列" },
        { "code": "1", "description": "100系列" },
        { "code": "2", "description": "200系列" }
      ]
    },
    {
      "id": "controlType",
      "name": "電控方式",
      "options": [
        { "code": "10", "description": "單位置雙電控" },
        { "code": "20", "description": "雙位置雙電控" },
        { "code": "30C", "description": "三位置雙電控中位封閉型" },
        { "code": "30E", "description": "三位置雙電控中位排氣型" },
        { "code": "30P", "description": "三位置雙電控中位壓力型" },
        { "code": "20NC", "description": "雙三口二位電磁閥NC-NC" },
        { "code": "20NO", "description": "雙三口二位電磁閥NO-NO" }
      ]
    },
    {
      "id": "voltage",
      "name": "標準電壓",
      "options": [
        { "code": "B", "description": "DC24V" },
        { "code": "F", "description": "DC12V" }
      ]
    },
    {
      "id": "pilotType",
      "name": "引導方式/進排氣類型",
      "options": [
        { "code": "", "description": "標準(內部引導)" },
        { "code": "-W", "description": "外部引導式" },
        { "code": "-E", "description": "獨立進氣" },
        { "code": "-R", "description": "獨立排氣" }
      ]
    }
  ]
};

data.series.push(singleValves);

fs.writeFileSync('src/data/catalog-solenoid-valves.json', JSON.stringify(data, null, 2));
