import fs from 'fs';
const file = 'src/data/catalog-solenoid-valves.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Filter out old 6D series
data.series = data.series.filter(s => s.id !== '6D-manifold' && s.id !== '6D-single');

// New 6D Manifold
const manifold = {
  "id": "6D-manifold",
  "category": "控制元件",
  "superGroup": "電磁閥(五口二位、五口三位)",
  "group": "6DM/6D/6DW系列 集成閥組派生產品",
  "name": "6D/6DM/6DW系列 集成閥組 (五口二位、五口三位)",
  "orderCodeFormat": "{seriesCode} {stations}-{port} {voltage} {singleCtrl} {doubleCtrl} {midClosed} {midExhaust} {midPressure} {commModule} {specialValve}",
  "note": "此為複合式集成閥組訂購碼。包含 6D系列(25pin D-SUB), 6DM系列(15pin D-SUB), 6DW系列(37pin D-SUB)。",
  "categories": [
    {
      "id": "seriesCode",
      "name": "①系列代號",
      "options": [
        { "code": "6D05H", "description": "6D0500系列 側出型 (25pin D-SUB)" },
        { "code": "6D1H", "description": "6D100系列 側出型 (25pin D-SUB)" },
        { "code": "6D2H", "description": "6D200系列 側出型 (25pin D-SUB)" },
        { "code": "6DM05H", "description": "6D0500系列 側出型 (15pin D-SUB)" },
        { "code": "6DM1H", "description": "6D100系列 側出型 (15pin D-SUB)" },
        { "code": "6DM2H", "description": "6D200系列 側出型 (15pin D-SUB)" },
        { "code": "6DW05H", "description": "6D0500系列 側出型 (37pin D-SUB)" },
        { "code": "6DW1H", "description": "6D100系列 側出型 (37pin D-SUB)" },
        { "code": "6DW2H", "description": "6D200系列 側出型 (37pin D-SUB)" }
      ]
    },
    {
      "id": "stations",
      "name": "②總連數代號",
      "options": [
        { "code": "3F", "description": "3連" },
        { "code": "4F", "description": "4連" },
        { "code": "5F", "description": "5連" },
        { "code": "12F", "description": "12連" },
        { "code": "21F", "description": "21連 (僅特定型號支援)" }
      ]
    },
    {
      "id": "port",
      "name": "③接管口徑(A/B口)",
      "options": [
        { "code": "J04", "description": "Φ4快插接頭接管" },
        { "code": "J06", "description": "Φ6快插接頭接管" },
        { "code": "J08", "description": "Φ8快插接頭接管" },
        { "code": "J10", "description": "Φ10快插接頭接管" }
      ]
    },
    {
      "id": "voltage",
      "name": "④標準電壓",
      "options": [
        { "code": "B", "description": "DC24V" },
        { "code": "F", "description": "DC12V" }
      ]
    },
    {
      "id": "singleCtrl",
      "name": "⑤單控電磁閥數",
      "options": [
        { "code": "", "description": "無" },
        { "code": "S1", "description": "1個" },
        { "code": "S2", "description": "2個" },
        { "code": "S21", "description": "21個" }
      ]
    },
    {
      "id": "doubleCtrl",
      "name": "⑥雙控電磁閥數",
      "options": [
        { "code": "", "description": "無" },
        { "code": "D1", "description": "1個" },
        { "code": "D2", "description": "2個" },
        { "code": "D12", "description": "12個" }
      ]
    },
    {
      "id": "midClosed",
      "name": "⑦三位中封式電磁閥數",
      "options": [
        { "code": "", "description": "無" },
        { "code": "C1", "description": "1個" },
        { "code": "C2", "description": "2個" },
        { "code": "C12", "description": "12個" }
      ]
    },
    {
      "id": "midExhaust",
      "name": "⑧三位中泄式電磁閥數",
      "options": [
        { "code": "", "description": "無" },
        { "code": "E1", "description": "1個" },
        { "code": "E2", "description": "2個" },
        { "code": "E12", "description": "12個" }
      ]
    },
    {
      "id": "midPressure",
      "name": "⑨三位中壓式電磁閥數",
      "options": [
        { "code": "", "description": "無" },
        { "code": "P1", "description": "1個" },
        { "code": "P2", "description": "2個" },
        { "code": "P12", "description": "12個" }
      ]
    },
    {
      "id": "commModule",
      "name": "⑩附通信協議模塊規格",
      "options": [
        { "code": "", "description": "空白: 不附通信協議模塊" },
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
      "name": "⑪特殊派生閥數量",
      "options": [
        { "code": "", "description": "無" },
        { "code": "SE1", "description": "獨立進氣的單控電磁閥1個 (可增數量如 SE2)" },
        { "code": "DE1", "description": "獨立進氣的雙控電磁閥1個 (可增數量如 DE2)" },
        { "code": "EE1", "description": "獨立進氣的雙控中排式電磁閥1個" },
        { "code": "PE1", "description": "獨立進氣的雙控中壓式電磁閥1個" },
        { "code": "SR1", "description": "獨立排氣的單控電磁閥1個" },
        { "code": "DR1", "description": "獨立排氣的雙控電磁閥1個" },
        { "code": "ER1", "description": "獨立排氣的雙控中排式電磁閥1個" },
        { "code": "PR1", "description": "獨立排氣的雙控中壓式電磁閥1個" },
        { "code": "SW1", "description": "外部先導單控電磁閥1個" },
        { "code": "DW1", "description": "外部先導雙控電磁閥1個" },
        { "code": "CW1", "description": "外部先導雙控中封式電磁閥1個" },
        { "code": "EW1", "description": "外部先導雙控中排式電磁閥1個" },
        { "code": "PW1", "description": "外部先導雙控中壓式電磁閥1個" },
        { "code": "DNC1", "description": "雙三口二位電磁閥(NC-NC)1個 (可增數量如 DNC2)" },
        { "code": "DNO1", "description": "雙三口二位電磁閥(NO-NO)1個 (可增數量如 DNO2)" }
      ]
    }
  ]
};

const singleValves = {
  "id": "6D-single",
  "category": "控制元件",
  "superGroup": "電磁閥(五口二位、五口三位)",
  "group": "6D系列單體",
  "name": "6D系列 雙三口二位/不同進氣方式電磁閥單體",
  "orderCodeFormat": "6D {series} {controlType} {voltage} {pilotType}",
  "categories": [
    {
      "id": "series",
      "name": "①規格代號 & ②系列代號",
      "options": [
        { "code": "05", "description": "6D 0500系列" },
        { "code": "1", "description": "6D 100系列" },
        { "code": "2", "description": "6D 200系列" }
      ]
    },
    {
      "id": "controlType",
      "name": "③電控方式",
      "options": [
        { "code": "10", "description": "單位置單電控" },
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
      "name": "④標準電壓",
      "options": [
        { "code": "B", "description": "DC24V" },
        { "code": "F", "description": "DC12V" }
      ]
    },
    {
      "id": "pilotType",
      "name": "⑤引導方式/進排氣類型",
      "options": [
        { "code": "", "description": "標準(內部引導)" },
        { "code": "-W", "description": "外部引導式" },
        { "code": "-E", "description": "獨立進氣" },
        { "code": "-R", "description": "獨立排氣" }
      ]
    }
  ]
};

data.series.push(manifold);
data.series.push(singleValves);

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('6D rebuilt.');
