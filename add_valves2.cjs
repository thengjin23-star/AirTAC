const fs = require('fs');
const content = fs.readFileSync('src/data/catalog.ts', 'utf8');

const newItems = `
  ,
  {
    id: "5v",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "5V系列",
    code: "5V",
    name: "5V系列電磁閥 (五口二位、五口三位)",
    format: "{code}{series}{control} {port} {voltage} {length} {thread}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "1", description: "1: 100系列" },
          { code: "2", description: "2: 200系列" },
          { code: "3", description: "3: 300系列" },
          { code: "4", description: "4: 400系列" },
        ],
      },
      {
        id: "control",
        name: "電控方式",
        options: [
          { code: "10", description: "10: 雙位置單電控" },
          { code: "20", description: "20: 雙位置雙電控" },
          { code: "30C", description: "30C: 三位置雙電控中位封閉型" },
          { code: "30E", description: "30E: 三位置雙電控中位排氣型" },
          { code: "30P", description: "30P: 三位置雙電控中位壓力型" },
        ],
      },
      {
        id: "port",
        name: "接管口徑",
        options: [
          { code: "M5", description: "M5: M5" },
          { code: "06", description: "06: 1/8\\"" },
          { code: "08", description: "08: 1/4\\"" },
          { code: "10", description: "10: 3/8\\"" },
          { code: "15", description: "15: 1/2\\"" },
        ],
      },
      {
        id: "voltage",
        name: "標準電壓",
        options: [
          { code: "A", description: "A: AC220V" },
          { code: "B", description: "B: DC24V" },
          { code: "C", description: "C: AC110V" },
          { code: "E", description: "E: AC24V" },
          { code: "F", description: "F: DC12V" },
        ],
      },
      {
        id: "length",
        name: "端子線長",
        options: [
          { code: "050", description: "050: 0.5m" },
          { code: "200", description: "200: 2.0m" },
        ],
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: [
          { code: "", description: "空白: PT牙或無此代碼(M5)" },
        ],
      },
    ],
  },
  {
    id: "esv-valve",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "ESV系列",
    code: "ESV",
    name: "ISO標準電磁閥 (五口二位、五口三位)",
    format: "{code} {series} {control} {voltage} {terminal} {pilot}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "2", description: "2: 200系列" },
          { code: "3", description: "3: 300系列" },
          { code: "4", description: "4: 400系列" },
          { code: "6", description: "6: 600系列" },
        ],
      },
      {
        id: "control",
        name: "電控方式",
        options: [
          { code: "10", description: "10: 雙位置單電控" },
          { code: "20", description: "20: 雙位置雙電控" },
          { code: "30C", description: "30C: 三位置雙電控中位封閉型" },
          { code: "30E", description: "30E: 三位置雙電控中位排氣型" },
          { code: "30P", description: "30P: 三位置雙電控中位壓力型" },
        ],
      },
      {
        id: "voltage",
        name: "標準電壓",
        options: [
          { code: "A", description: "A: AC220V" },
          { code: "B", description: "B: DC24V" },
          { code: "C", description: "C: AC110V" },
          { code: "E", description: "E: AC24V" },
          { code: "F", description: "F: DC12V" },
        ],
      },
      {
        id: "terminal",
        name: "接電方式",
        options: [
          { code: "", description: "空白: DIN插座式" },
          { code: "I", description: "I: 出線式" },
        ],
      },
      {
        id: "pilot",
        name: "引導方式",
        options: [
          { code: "", description: "空白: 內部引導式" },
          { code: "W", description: "W: 外部引導式" },
        ],
      },
    ],
  },
  {
    id: "esv-base",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "ESV系列底座與端板",
    code: "ESV",
    name: "ISO標準電磁閥 底座與端板組件",
    format: "{code} {series} {type} {thread} {pilot} {port_pos}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "20", description: "20: 200系列" },
          { code: "30", description: "30: 300系列" },
          { code: "40", description: "40: 400系列" },
          { code: "60", description: "60: 600系列" },
        ],
      },
      {
        id: "type",
        name: "型式代號",
        options: [
          { code: "1M", description: "1M: 單體型底座" },
          { code: "2M", description: "2M: 多聯型底座" },
          { code: "3M", description: "3M: 端板組件" },
          { code: "4M", description: "4M: 多聯型底座轉接塊" },
        ],
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: [
          { code: "", description: "空白: PT牙" },
          { code: "G", description: "G: G牙" },
        ],
      },
      {
        id: "pilot",
        name: "外部引導氣口方式",
        options: [
          { code: "", description: "空白: 獨立外部引導氣口" },
          { code: "W", description: "W: 集中外部引導氣口" },
        ],
      },
      {
        id: "port_pos",
        name: "氣口方位代號",
        options: [
          { code: "", description: "空白: 側面工作氣口 / 左側工作氣口" },
          { code: "B", description: "B: 底面工作氣口" },
          { code: "R", description: "R: 右側工作氣口" },
        ],
      },
    ],
  },
  {
    id: "esv-blanking",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "ESV系列底座盲板",
    code: "P-",
    name: "ISO標準電磁閥 附件訂購碼 (盲板)",
    format: "{code}{series} - R2",
    categories: [
      {
        id: "series",
        name: "適用產品代號",
        options: [
          { code: "ESV200M", description: "ESV200M: 200系列底座" },
          { code: "ESV300M", description: "ESV300M: 300系列底座" },
          { code: "ESV400M", description: "ESV400M: 400系列底座" },
          { code: "ESV600M", description: "ESV600M: 600系列底座" },
        ],
      },
    ],
  },
  {
    id: "coil-cd",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "普通線圈",
    code: "",
    name: "普通線圈 (080, 092系列)",
    format: "{code} {diameter} {voltage}",
    categories: [
      {
        id: "code",
        name: "線圈類別",
        options: [
          { code: "CD", description: "CD: DIN插座式線圈" },
          { code: "CL", description: "CL: 出線式線圈" },
        ],
      },
      {
        id: "diameter",
        name: "線圈內徑",
        options: [
          { code: "A080", description: "A080: 內徑 Φ8.0mm" },
          { code: "A092", description: "A092: 內徑 Φ9.0mm" },
        ],
      },
      {
        id: "voltage",
        name: "標準電壓",
        options: [
          { code: "A", description: "A: AC220V" },
          { code: "B", description: "B: DC24V" },
          { code: "C", description: "C: AC110V" },
          { code: "E", description: "E: AC24V" },
          { code: "F", description: "F: DC12V" },
        ],
      },
    ],
  },
  {
    id: "coil-cfb",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "防爆線圈",
    code: "CFB",
    name: "防爆型線圈部品",
    format: "{code} {diameter} {voltage}",
    categories: [
      {
        id: "diameter",
        name: "線圈規格代號",
        options: [
          { code: "092", description: "092: 適用於防爆閥" },
        ],
      },
      {
        id: "voltage",
        name: "標準電壓",
        options: [
          { code: "A", description: "A: AC220V" },
          { code: "B", description: "B: DC24V" },
        ],
      },
    ],
  },
  {
    id: "b03-valve",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "B03防爆電磁閥",
    code: "B03-",
    name: "B03防爆型電磁閥",
    format: "{code}{type} {series} {control} {port} {voltage} {thread}",
    categories: [
      {
        id: "type",
        name: "規格代號",
        options: [
          { code: "3V", description: "3V: 三口二位電磁閥" },
          { code: "4V", description: "4V: 五口二位五口三位" },
          { code: "4M", description: "4M: 五口二位(NAMUR規格)" },
        ],
      },
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "1", description: "1: 100系列 (僅3V)" },
          { code: "2", description: "2: 200系列" },
          { code: "3", description: "3: 300系列" },
          { code: "4", description: "4: 400系列 (僅4V)" },
        ],
      },
      {
        id: "control",
        name: "電控方式",
        options: [
          { code: "10", description: "10: 雙位置單電控" },
          { code: "20", description: "20: 雙位置雙電控" },
          { code: "30C", description: "30C: 三位置中封型 (僅4V)" },
          { code: "30E", description: "30E: 三位置中排型 (僅4V)" },
          { code: "30P", description: "30P: 三位置中壓型 (僅4V)" },
        ],
      },
      {
        id: "port",
        name: "接管口徑",
        options: [
          { code: "M5", description: "M5: M5" },
          { code: "06", description: "06: 1/8\\"" },
          { code: "08", description: "08: 1/4\\"" },
          { code: "10", description: "10: 3/8\\"" },
          { code: "15", description: "15: 1/2\\"" },
        ],
      },
      {
        id: "voltage",
        name: "標準電壓",
        options: [
          { code: "A", description: "A: AC220V" },
          { code: "B", description: "B: DC24V" },
        ],
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: [
          { code: "", description: "空白: PT牙 或 無此代碼" },
        ],
      },
    ],
  },
  {
    id: "cable-dsub",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "集成閥組配套線纜",
    code: "F-DSUB",
    name: "F-DSUB系列配套線纜",
    format: "{code} {pins} {type} {length}",
    categories: [
      {
        id: "pins",
        name: "針數代號",
        options: [
          { code: "15", description: "15: 15PIN" },
          { code: "25", description: "25: 25PIN" },
          { code: "37", description: "37: 37PIN" },
        ],
      },
      {
        id: "type",
        name: "線端連接器型式",
        options: [
          { code: "F", description: "F: 兩端為同型母接頭" },
          { code: "M", description: "M: 一端公接頭一端母接頭" },
          { code: "S", description: "S: 一端母接頭一端直接出線" },
        ],
      },
      {
        id: "length",
        name: "線長",
        options: [
          { code: "150", description: "150: 1.5m (僅15PIN)" },
          { code: "200", description: "200: 2m" },
          { code: "300", description: "300: 3m" },
          { code: "500", description: "500: 5m" },
          { code: "800", description: "800: 8m" },
          { code: "1000", description: "1000: 10m" },
        ],
      },
    ],
  }
`;

const updatedContent = content.replace(/\];\s*$/, newItems + '];\n');
fs.writeFileSync('src/data/catalog.ts', updatedContent);
