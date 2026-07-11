const fs = require('fs');
const content = fs.readFileSync('src/data/catalog.ts', 'utf8');

const newItems = `
  ,
  {
    id: "fluid-direct-nc",
    category: "控制元件",
    superGroup: "流體控制閥",
    group: "直動常閉型",
    code: "",
    name: "2SA/2WA/2LA系列 直動常閉型 (二口二位)",
    format: "{code}{pressure} {series} {port} {voltage} {terminal} {thread}",
    categories: [
      {
        id: "code",
        name: "規格代號",
        options: [
          { code: "2SA", description: "2SA: 二口二位直動常閉型(不銹鋼閥體)" },
          { code: "2WA", description: "2WA: 二口二位直動常閉型(黃銅閥體)" },
          { code: "2LA", description: "2LA: 二口二位直動常閉型(黃銅閥體, 適用蒸氣)" },
        ],
      },
      {
        id: "pressure",
        name: "壓力條件",
        options: [
          { code: "X", description: "X: 超高壓型" },
          { code: "H", description: "H: 高壓型" },
          { code: "", description: "空白: 標準型" },
          { code: "L", description: "L: 大流量型" },
          { code: "T", description: "T: 特大流量型" },
        ],
      },
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "030", description: "030: 030系列" },
          { code: "050", description: "050: 050系列" },
        ],
      },
      {
        id: "port",
        name: "接管口徑",
        options: [
          { code: "06", description: "06: 1/8\\"" },
          { code: "08", description: "08: 1/4\\"" },
          { code: "10", description: "10: 3/8\\"" },
          { code: "15", description: "15: 1/2\\"" },
        ],
      },
      {
        id: "voltage",
        name: "線圈電壓",
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
          { code: "", description: "空白: PT牙" },
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
    ],
  },
  {
    id: "fluid-direct-no",
    category: "控制元件",
    superGroup: "流體控制閥",
    group: "直動常開型",
    code: "",
    name: "2KSA/2KWA/2KLA系列 直動常開型 (二口二位)",
    format: "{code}{pressure} {series} {port} {voltage} {terminal} {thread}",
    categories: [
      {
        id: "code",
        name: "規格代號",
        options: [
          { code: "2KSA", description: "2KSA: 二口二位直動常開型(不銹鋼閥體)" },
          { code: "2KWA", description: "2KWA: 二口二位直動常開型(黃銅閥體)" },
          { code: "2KLA", description: "2KLA: 二口二位直動常開型(黃銅閥體, 適用蒸氣)" },
        ],
      },
      {
        id: "pressure",
        name: "壓力條件",
        options: [
          { code: "X", description: "X: 超高壓型" },
          { code: "H", description: "H: 高壓型" },
          { code: "", description: "空白: 標準型" },
          { code: "L", description: "L: 大流量型" },
        ],
      },
      {
        id: "series",
        name: "系列代號",
        options: [
          { code: "030", description: "030: 030系列" },
          { code: "050", description: "050: 050系列" },
        ],
      },
      {
        id: "port",
        name: "接管口徑",
        options: [
          { code: "06", description: "06: 1/8\\"" },
          { code: "08", description: "08: 1/4\\"" },
          { code: "10", description: "10: 3/8\\"" },
          { code: "15", description: "15: 1/2\\"" },
        ],
      },
      {
        id: "voltage",
        name: "線圈電壓",
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
          { code: "", description: "空白: PT牙" },
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
    ],
  },
  {
    id: "fluid-pilot-nc",
    category: "控制元件",
    superGroup: "流體控制閥",
    group: "先導常閉型",
    code: "",
    name: "2SA/2WA/2LA系列 先導常閉型 (二口二位)",
    format: "{code} {diameter} {port} {voltage} {terminal} {thread}",
    categories: [
      {
        id: "code",
        name: "規格代號",
        options: [
          { code: "2SA", description: "2SA: 二口二位先導常閉型(不銹鋼閥體)" },
          { code: "2WA", description: "2WA: 二口二位先導常閉型(黃銅閥體)" },
          { code: "2LA", description: "2LA: 二口二位先導常閉型(黃銅閥體, 適用蒸氣)" },
        ],
      },
      {
        id: "diameter",
        name: "標稱通徑",
        options: [
          { code: "150", description: "150: Φ15mm" },
          { code: "200", description: "200: Φ20mm" },
          { code: "250", description: "250: Φ25mm" },
          { code: "320", description: "320: Φ35mm" },
          { code: "400", description: "400: Φ40mm" },
          { code: "500", description: "500: Φ50mm" },
        ],
      },
      {
        id: "port",
        name: "接管口徑",
        options: [
          { code: "15", description: "15: 1/2\\"" },
          { code: "20", description: "20: 3/4\\"" },
          { code: "25", description: "25: 1\\"" },
          { code: "32", description: "32: 1 1/4\\"" },
          { code: "40", description: "40: 1 1/2\\"" },
          { code: "50", description: "50: 2\\"" },
        ],
      },
      {
        id: "voltage",
        name: "線圈電壓",
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
          { code: "", description: "空白: PT牙" },
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
    ],
  },
  {
    id: "fluid-pilot-no",
    category: "控制元件",
    superGroup: "流體控制閥",
    group: "先導常開型",
    code: "",
    name: "2KSA/2KWA/2KLA系列 先導常開型 (二口二位)",
    format: "{code} {diameter} {port} {voltage} {terminal} {thread}",
    categories: [
      {
        id: "code",
        name: "規格代號",
        options: [
          { code: "2KSA", description: "2KSA: 二口二位先導常開型(不銹鋼閥體)" },
          { code: "2KWA", description: "2KWA: 二口二位先導常開型(黃銅閥體)" },
          { code: "2KLA", description: "2KLA: 二口二位先導常開型(黃銅閥體, 適用蒸氣)" },
        ],
      },
      {
        id: "diameter",
        name: "標稱通徑",
        options: [
          { code: "150", description: "150: Φ15mm" },
          { code: "200", description: "200: Φ20mm" },
          { code: "250", description: "250: Φ25mm" },
          { code: "320", description: "320: Φ35mm" },
          { code: "400", description: "400: Φ40mm" },
          { code: "500", description: "500: Φ50mm" },
        ],
      },
      {
        id: "port",
        name: "接管口徑",
        options: [
          { code: "15", description: "15: 1/2\\"" },
          { code: "20", description: "20: 3/4\\"" },
          { code: "25", description: "25: 1\\"" },
          { code: "32", description: "32: 1 1/4\\"" },
          { code: "40", description: "40: 1 1/2\\"" },
          { code: "50", description: "50: 2\\"" },
        ],
      },
      {
        id: "voltage",
        name: "線圈電壓",
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
          { code: "", description: "空白: PT牙" },
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
    ],
  },
  {
    id: "fluid-2v",
    category: "控制元件",
    superGroup: "流體控制閥",
    group: "2V系列",
    code: "2V",
    name: "2V系列 流體控制閥 (二口二位)",
    format: "{code} {diameter} {port} {voltage} {terminal} {thread}",
    categories: [
      {
        id: "diameter",
        name: "標稱通徑",
        options: [
          { code: "025", description: "025: Φ2.5mm" },
          { code: "130", description: "130: Φ13mm" },
          { code: "250", description: "250: Φ25mm" },
        ],
      },
      {
        id: "port",
        name: "接管口徑",
        options: [
          { code: "06", description: "06: 1/8\\" (僅適用025)" },
          { code: "08", description: "08: 1/4\\" (僅適用025)" },
          { code: "10", description: "10: 3/8\\" (僅適用130)" },
          { code: "15", description: "15: 1/2\\" (僅適用130)" },
          { code: "20", description: "20: 3/4\\" (僅適用250)" },
          { code: "25", description: "25: 1\\" (僅適用250)" },
        ],
      },
      {
        id: "voltage",
        name: "線圈電壓",
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
          { code: "", description: "空白: PT牙" },
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
    ],
  },
  {
    id: "fluid-2p",
    category: "控制元件",
    superGroup: "流體控制閥",
    group: "2P系列",
    code: "2P",
    name: "2P系列 流體控制閥 (二口二位)",
    format: "{code} {diameter} {port} {voltage} {terminal} {thread}",
    categories: [
      {
        id: "diameter",
        name: "標稱通徑",
        options: [
          { code: "025", description: "025: Φ2.5mm" },
        ],
      },
      {
        id: "port",
        name: "接管口徑",
        options: [
          { code: "06", description: "06: 1/8\\"" },
          { code: "08", description: "08: 1/4\\"" },
        ],
      },
      {
        id: "voltage",
        name: "線圈電壓",
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
          { code: "I", description: "I: 出線式" },
        ],
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: [
          { code: "G", description: "G: G牙" },
        ],
      },
    ],
  },
  {
    id: "fluid-2j",
    category: "控制元件",
    superGroup: "流體控制閥",
    group: "2J系列",
    code: "2J",
    name: "2J系列 角座閥 (二口二位)",
    format: "{code} {material} {initial} {diameter} {port} {actuator} {thread}",
    categories: [
      {
        id: "material",
        name: "閥體材質",
        options: [
          { code: "S", description: "S: 不銹鋼SUS316L" },
          { code: "W", description: "W: 不銹鋼SUS304" },
        ],
      },
      {
        id: "initial",
        name: "初始狀態",
        options: [
          { code: "", description: "空白: 常閉無水錘型 (工作介質流向閥口下方)" },
          { code: "Y", description: "Y: 常閉有水錘型 (工作介質流向閥口上方)" },
          { code: "K", description: "K: 常開型 (工作介質流向閥口下方)" },
        ],
      },
      {
        id: "diameter",
        name: "標稱通徑",
        options: [
          { code: "150", description: "150: Φ15mm" },
          { code: "200", description: "200: Φ20mm" },
          { code: "250", description: "250: Φ25mm" },
          { code: "320", description: "320: Φ32mm" },
        ],
      },
      {
        id: "port",
        name: "接管口徑",
        options: [
          { code: "10", description: "10: 3/8\\"" },
          { code: "15", description: "15: 1/2\\"" },
          { code: "20", description: "20: 3/4\\"" },
          { code: "25", description: "25: 1\\"" },
          { code: "32", description: "32: 1 1/4\\"" },
        ],
      },
      {
        id: "actuator",
        name: "執行器缸徑",
        options: [
          { code: "Q40", description: "Q40: Φ40mm" },
          { code: "Q50", description: "Q50: Φ50mm" },
          { code: "Q63", description: "Q63: Φ63mm" },
          { code: "Q80", description: "Q80: Φ80mm" },
        ],
      },
      {
        id: "thread",
        name: "牙型代碼",
        options: [
          { code: "G", description: "G: G牙" },
          { code: "T", description: "T: NPT牙" },
        ],
      },
    ],
  },
  {
    id: "fluid-coil",
    category: "控制元件",
    superGroup: "流體控制閥",
    group: "流體控制閥線圈",
    code: "",
    name: "流體控制閥線圈及配件",
    format: "{code} {diameter} {valve_type} {voltage} {heat}",
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
          { code: "A110", description: "A110: 線圈內徑Φ11.0mm" },
          { code: "A160", description: "A160: 線圈內徑Φ16.0mm" },
        ],
      },
      {
        id: "valve_type",
        name: "配合閥體",
        options: [
          { code: "", description: "空白: 常閉型專用" },
          { code: "K", description: "K: 常開型專用" },
        ],
      },
      {
        id: "voltage",
        name: "線圈電壓",
        options: [
          { code: "A", description: "A: AC220V" },
          { code: "B", description: "B: DC24V" },
          { code: "C", description: "C: AC110V" },
          { code: "E", description: "E: AC24V" },
          { code: "F", description: "F: DC12V" },
        ],
      },
      {
        id: "heat",
        name: "耐熱等級",
        options: [
          { code: "", description: "空白: F級" },
          { code: "H", description: "H: H級" },
        ],
      },
    ],
  }
`;

const updatedContent = content.replace(/\];\s*$/, newItems + '];\n');
fs.writeFileSync('src/data/catalog.ts', updatedContent);
