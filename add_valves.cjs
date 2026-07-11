const fs = require('fs');
const content = fs.readFileSync('src/data/catalog.ts', 'utf8');

const newItems = `
  {
    id: "3v",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "3V系列",
    code: "3V",
    name: "3V系列電磁閥 (三口二位)",
    format: "{code}{series}{control} {port} {initial} {voltage} {terminal} {thread} {pilot}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "1", description: "1: 100系列" },
          { code: "2", description: "2: 200系列" },
          { code: "3", description: "3: 300系列" },
        ],
      },
      {
        id: "control",
        name: "電控方式",
        options: [
          { code: "10", description: "10: 雙位置單電控" },
          { code: "20", description: "20: 雙位置雙電控" },
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
        ],
      },
      {
        id: "initial",
        name: "初始狀態",
        options: [
          { code: "", description: "無此代碼 (雙電控)" },
          { code: "NC", description: "NC: 常閉型" },
          { code: "NO", description: "NO: 常開型" },
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
        id: "thread",
        name: "牙型代碼",
        options: [
          { code: "", description: "空白: PT牙或無此代碼(M5)" },
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
      {
        id: "pilot",
        name: "引導方式",
        options: [
          { code: "", description: "空白: 內部引導式" },
          { code: "-W", description: "-W: 外部引導式" },
        ],
      },
    ],
  },
  {
    id: "4v",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "4V系列",
    code: "4V",
    name: "4V系列電磁閥 (五口二位、五口三位)",
    format: "{code}{series}{control} {port} {voltage} {terminal} {thread} {pilot}",
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
        id: "terminal",
        name: "接電方式",
        options: [
          { code: "", description: "空白: DIN插座式" },
          { code: "I", description: "I: 出線式" },
        ],
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: [
          { code: "", description: "空白: PT牙或無此代碼(M5)" },
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
      {
        id: "pilot",
        name: "引導方式",
        options: [
          { code: "", description: "空白: 內部引導式" },
          { code: "-W", description: "-W: 外部引導式" },
        ],
      },
    ],
  },
  {
    id: "4m",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "4M系列",
    code: "4M",
    name: "4M系列 NAMUR規格 (五口二位)",
    format: "{code} {series} {control} {port} {voltage} {terminal} {thread}",
    categories: [
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "1", description: "1: 100系列" },
          { code: "2", description: "2: 200系列" },
          { code: "3", description: "3: 300系列" },
        ],
      },
      {
        id: "control",
        name: "電控方式",
        options: [
          { code: "10", description: "10: 雙位置單電控" },
          { code: "20", description: "20: 雙位置雙電控" },
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
        id: "thread",
        name: "牙型代碼",
        options: [
          { code: "", description: "無此代碼 (M5)" },
          { code: "", description: "空白: PT牙" },
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
    ],
  },
  {
    id: "3v-manifold",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "3V系列底座",
    code: "",
    name: "3V100~300系列底座",
    format: "{code} {stations} {thread}",
    categories: [
      {
        id: "code",
        name: "規格代號",
        options: [
          { code: "3V100M", description: "3V100M: 100系列底座" },
          { code: "3V200M", description: "3V200M: 200系列底座" },
          { code: "3V300M", description: "3V300M: 300系列底座" },
        ],
      },
      {
        id: "stations",
        name: "連數代號",
        options: [
          { code: "1F", description: "1F: 1連" },
          { code: "2F", description: "2F: 2連" },
          { code: "3F", description: "3F: 3連" },
          { code: "4F", description: "4F: 4連" },
          { code: "5F", description: "5F: 5連" },
          { code: "6F", description: "6F: 6連" },
          { code: "7F", description: "7F: 7連" },
          { code: "8F", description: "8F: 8連" },
          { code: "9F", description: "9F: 9連" },
          { code: "10F", description: "10F: 10連" },
          { code: "11F", description: "11F: 11連" },
          { code: "12F", description: "12F: 12連" },
          { code: "13F", description: "13F: 13連" },
          { code: "14F", description: "14F: 14連" },
          { code: "15F", description: "15F: 15連" },
          { code: "16F", description: "16F: 16連" },
        ],
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: [
          { code: "", description: "空白: PT牙" },
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
    ],
  },
  {
    id: "3v-blanking",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "3V系列底座盲板",
    code: "P-",
    name: "3V100~300系列底座盲板",
    format: "{code}{series} - R2",
    categories: [
      {
        id: "series",
        name: "規格代號",
        options: [
          { code: "3V100M", description: "3V100M: 100系列底座" },
          { code: "3V200M", description: "3V200M: 200系列底座" },
          { code: "3V300M", description: "3V300M: 300系列底座" },
        ],
      },
    ],
  },
  {
    id: "4v-manifold",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "4V系列底座",
    code: "",
    name: "4V100~400系列底座",
    format: "{code} {stations} {thread}",
    categories: [
      {
        id: "code",
        name: "規格代號",
        options: [
          { code: "100M", description: "100M: 100系列底座" },
          { code: "200M", description: "200M: 200系列底座" },
          { code: "300M", description: "300M: 300系列底座" },
          { code: "400M", description: "400M: 400系列底座" },
        ],
      },
      {
        id: "stations",
        name: "連數代號",
        options: [
          { code: "1F", description: "1F: 1連" },
          { code: "2F", description: "2F: 2連" },
          { code: "3F", description: "3F: 3連" },
          { code: "4F", description: "4F: 4連" },
          { code: "5F", description: "5F: 5連" },
          { code: "6F", description: "6F: 6連" },
          { code: "7F", description: "7F: 7連" },
          { code: "8F", description: "8F: 8連" },
          { code: "9F", description: "9F: 9連" },
          { code: "10F", description: "10F: 10連" },
          { code: "11F", description: "11F: 11連" },
          { code: "12F", description: "12F: 12連" },
          { code: "13F", description: "13F: 13連" },
          { code: "14F", description: "14F: 14連" },
          { code: "15F", description: "15F: 15連" },
          { code: "16F", description: "16F: 16連" },
        ],
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: [
          { code: "", description: "空白: PT牙" },
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
    ],
  },
  {
    id: "4v-blanking",
    category: "控制元件",
    superGroup: "電磁閥",
    group: "4V系列底座盲板",
    code: "P-",
    name: "4V100~400系列底座盲板",
    format: "{code}{series} - R2",
    categories: [
      {
        id: "series",
        name: "規格代號",
        options: [
          { code: "100M", description: "100M: 100系列底座" },
          { code: "200M", description: "200M: 200系列底座" },
          { code: "300M", description: "300M: 300系列底座" },
          { code: "400M", description: "400M: 400系列底座" },
        ],
      },
    ],
  }
`;

const updatedContent = content.replace(/\];\s*$/, newItems + '];\n');
fs.writeFileSync('src/data/catalog.ts', updatedContent);
