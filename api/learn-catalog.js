// 此檔案由 scripts/build-api.mjs 自動產生，請勿手動編輯。
// 原始碼在 src/server/vercelHandlers/，修改後執行 npm run build:api 重新產生。

// src/server/learnCatalogService.ts
import { Type as Type2 } from "@google/genai";

// src/server/crossReferenceService.ts
import { GoogleGenAI, Type } from "@google/genai";

// src/data/shared-options.json
var shared_options_default = {
  _\u8AAA\u660E: "\u5171\u7528\u9078\u9805\u5B57\u5178\u3002\u591A\u500B\u7CFB\u5217\u90FD\u6703\u7528\u5230\u540C\u6A23\u7684\u7DDA\u5708\u96FB\u58D3\u3001\u7259\u578B\u4EE3\u78BC\u3001\u63A5\u96FB\u65B9\u5F0F,\u7D71\u4E00\u5B9A\u7FA9\u5728\u9019\u88E1,\u5404\u7CFB\u5217\u7528 refId \u5F15\u7528,\u4E0D\u91CD\u8907\u8907\u88FD\u3002",
  voltageOptions: {
    standard5: [
      { code: "A", description: "AC220V" },
      { code: "B", description: "DC24V" },
      { code: "C", description: "AC110V" },
      { code: "E", description: "AC24V" },
      { code: "F", description: "DC12V" }
    ]
  },
  threadOptions: {
    standardGT: [
      { code: "", description: "\u7A7A\u767D: PT\u7259" },
      { code: "G", description: "G\u7259" },
      { code: "T", description: "NPT\u7259" }
    ],
    onlyG: [
      { code: "G", description: "G\u7259" }
    ]
  },
  terminalOptions: {
    dinOrLead: [
      { code: "", description: "\u7A7A\u767D: DIN\u63D2\u5EA7\u5F0F" },
      { code: "I", description: "\u51FA\u7DDA\u5F0F(\u51FA\u7DDA\u9577\u5EA6\u7D040.5m)" }
    ],
    onlyLead: [
      { code: "I", description: "\u51FA\u7DDA\u5F0F" }
    ]
  },
  pressureGradeOptions: {
    "030_050\u7CFB\u5217": [
      { code: "", description: "\u7A7A\u767D: \u6A19\u6E96\u578B" },
      { code: "X", description: "X: \u8D85\u9AD8\u58D3\u578B" },
      { code: "H", description: "H: \u9AD8\u58D3\u578B" },
      { code: "L", description: "L: \u5927\u6D41\u91CF\u578B" },
      { code: "T", description: "T: \u7279\u5927\u6D41\u91CF\u578B (\u50C5\u90E8\u5206\u53E3\u5F91\u9069\u7528)" }
    ]
  },
  coilHeatGradeOptions: {
    standard: [
      { code: "", description: "\u7A7A\u767D: F\u7D1A" },
      { code: "H", description: "H: H\u7D1A" }
    ]
  },
  controlTypeOptions: {
    "5port_2or3position": [
      { code: "10", description: "\u96D9\u4F4D\u7F6E\u55AE\u96FB\u63A7" },
      { code: "20", description: "\u96D9\u4F4D\u7F6E\u96D9\u96FB\u63A7" },
      { code: "30C", description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u5C01\u9589\u578B" },
      { code: "30E", description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u6392\u6C23\u578B" },
      { code: "30P", description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u58D3\u529B\u578B" }
    ],
    "3port_2position": [
      { code: "10", description: "\u96D9\u4F4D\u7F6E\u55AE\u96FB\u63A7" },
      { code: "20", description: "\u96D9\u4F4D\u7F6E\u96D9\u96FB\u63A7" }
    ]
  },
  initialStateOptions: {
    ncNo: [
      { code: "NC", description: "\u5E38\u9589\u578B" },
      { code: "NO", description: "\u5E38\u958B\u578B" }
    ]
  },
  pilotTypeOptions: {
    internalExternal: [
      { code: "", description: "\u7A7A\u767D: \u5167\u90E8\u5F15\u5C0E\u5F0F" },
      { code: "W", description: "W: \u5916\u90E8\u5F15\u5C0E\u5F0F(\u9700\u5916\u90E8\u6C23\u6E90\u5F15\u5C0E)" }
    ]
  },
  portConnectionTypeOptions: {
    threadOrQuick: [
      { code: "", description: "\u7A7A\u767D: \u87BA\u7D0B\u63A5\u7BA1" },
      { code: "J", description: "J: \u5FEB\u63D2\u63A5\u982D\u578B" }
    ]
  }
};

// src/data/catalog-fluid-valves.json
var catalog_fluid_valves_default = [
  {
    id: "2J",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6D41\u9AD4\u63A7\u5236\u95A5",
    group: "2J\u89D2\u5EA7\u95A5",
    code: "",
    name: "2J\u7CFB\u5217 \u89D2\u5EA7\u95A5",
    format: "2J{series}{material}{state}{bore}{port}{actuator}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FCSUS316L"
          },
          {
            code: "W",
            description: "\u4E0D\u92B9\u92FCSUS304"
          }
        ]
      },
      {
        id: "material",
        name: "\u95A5\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FCSUS316L"
          },
          {
            code: "W",
            description: "\u4E0D\u92B9\u92FCSUS304"
          }
        ]
      },
      {
        id: "state",
        name: "\u521D\u59CB\u72C0\u614B",
        options: [
          {
            code: "",
            description: "\u5E38\u9589\u7121\u6C34\u9318\u578B"
          },
          {
            code: "Y",
            description: "\u5E38\u9589\u6709\u6C34\u9318\u578B"
          },
          {
            code: "K",
            description: "\u5E38\u958B\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u6A19\u7A31\u901A\u5F91",
        options: [
          {
            code: "150",
            description: "\u03A615mm"
          },
          {
            code: "200",
            description: "\u03A620mm"
          },
          {
            code: "250",
            description: "\u03A625mm"
          },
          {
            code: "320",
            description: "\u03A632mm"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          },
          {
            code: "32",
            description: '1 1/4"'
          }
        ]
      },
      {
        id: "actuator",
        name: "\u57F7\u884C\u5668\u7F38\u5F91",
        options: [
          {
            code: "Q40",
            description: "\u03A640mm"
          },
          {
            code: "Q50",
            description: "\u03A650mm"
          },
          {
            code: "Q63",
            description: "\u03A663mm"
          },
          {
            code: "Q80",
            description: "\u03A680mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.230"
  },
  {
    id: "2KLA",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6D41\u9AD4\u63A7\u5236\u95A5",
    group: "2KLA\u5E38\u958B\u578B(\u6CB9)",
    code: "2KLA",
    name: "2KLA\u7CFB\u5217 \u76F4\u52D5/\u5148\u5C0E\u5E38\u9589\u578B\u96FB\u78C1\u95A5",
    format: "2KLA{type}{function}{bore}{port}{voltage}{connection}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u76F4\u52D5\u5E38\u9589\u578B\u96FB\u78C1\u95A5"
          },
          {
            code: "150",
            description: "\u5148\u5C0E\u5E38\u9589\u578B\u96FB\u78C1\u95A5"
          }
        ]
      },
      {
        id: "function",
        name: "\u58D3\u529B\u689D\u4EF6",
        options: [
          {
            code: "H",
            description: "\u9AD8\u58D3\u578B"
          },
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u5927\u6D41\u91CF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u6A19\u7A31\u901A\u5F91",
        options: [
          {
            code: "030",
            description: "\u03A615mm"
          },
          {
            code: "050",
            description: "\u03A620mm"
          },
          {
            code: "150",
            description: "\u03A615mm"
          },
          {
            code: "200",
            description: "\u03A620mm"
          },
          {
            code: "250",
            description: "\u03A625mm"
          },
          {
            code: "320",
            description: "\u03A635mm"
          },
          {
            code: "400",
            description: "\u03A640mm"
          },
          {
            code: "500",
            description: "\u03A650mm"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          },
          {
            code: "32",
            description: '1 1/4"'
          },
          {
            code: "40",
            description: '1 1/2"'
          },
          {
            code: "50",
            description: '2"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u7DDA\u5708\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.197"
  },
  {
    id: "2KSA",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6D41\u9AD4\u63A7\u5236\u95A5",
    group: "2KSA\u5E38\u958B\u578B(\u6C23\u9AD4)",
    code: "2KSA",
    name: "2KSA\u7CFB\u5217 \u76F4\u52D5/\u5148\u5C0E\u5E38\u958B\u578B\u96FB\u78C1\u95A5",
    format: "2KSA{type}{function}{bore}{port}{voltage}{connection}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u76F4\u52D5\u5E38\u958B\u578B\u96FB\u78C1\u95A5"
          },
          {
            code: "150",
            description: "\u5148\u5C0E\u5E38\u958B\u578B\u96FB\u78C1\u95A5"
          }
        ]
      },
      {
        id: "function",
        name: "\u58D3\u529B\u689D\u4EF6",
        options: [
          {
            code: "X",
            description: "\u8D85\u9AD8\u58D3\u578B"
          },
          {
            code: "H",
            description: "\u9AD8\u58D3\u578B"
          },
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u5927\u6D41\u91CF\u578B"
          },
          {
            code: "T",
            description: "\u7279\u5927\u6D41\u91CF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u6A19\u7A31\u901A\u5F91",
        options: [
          {
            code: "030",
            description: "\u03A615mm"
          },
          {
            code: "050",
            description: "\u03A620mm"
          },
          {
            code: "150",
            description: "\u03A615mm"
          },
          {
            code: "200",
            description: "\u03A620mm"
          },
          {
            code: "250",
            description: "\u03A625mm"
          },
          {
            code: "320",
            description: "\u03A635mm"
          },
          {
            code: "400",
            description: "\u03A640mm"
          },
          {
            code: "500",
            description: "\u03A650mm"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          },
          {
            code: "32",
            description: '1 1/4"'
          },
          {
            code: "40",
            description: '1 1/2"'
          },
          {
            code: "50",
            description: '2"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u7DDA\u5708\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.189"
  },
  {
    id: "2KWA",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6D41\u9AD4\u63A7\u5236\u95A5",
    group: "2KWA\u5E38\u958B\u578B(\u6C34)",
    code: "2KWA",
    name: "2KWA\u7CFB\u5217 \u76F4\u52D5/\u5148\u5C0E\u5E38\u958B\u578B\u96FB\u78C1\u95A5",
    format: "2KWA{type}{function}{bore}{port}{voltage}{connection}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u76F4\u52D5\u5E38\u958B\u578B\u96FB\u78C1\u95A5"
          },
          {
            code: "150",
            description: "\u5148\u5C0E\u5E38\u958B\u578B\u96FB\u78C1\u95A5"
          }
        ]
      },
      {
        id: "function",
        name: "\u58D3\u529B\u689D\u4EF6",
        options: [
          {
            code: "X",
            description: "\u8D85\u9AD8\u58D3\u578B"
          },
          {
            code: "H",
            description: "\u9AD8\u58D3\u578B"
          },
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u5927\u6D41\u91CF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u6A19\u7A31\u901A\u5F91",
        options: [
          {
            code: "030",
            description: "\u03A615mm"
          },
          {
            code: "050",
            description: "\u03A620mm"
          },
          {
            code: "150",
            description: "\u03A615mm"
          },
          {
            code: "200",
            description: "\u03A620mm"
          },
          {
            code: "250",
            description: "\u03A625mm"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u7DDA\u5708\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.181"
  },
  {
    id: "2LA",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6D41\u9AD4\u63A7\u5236\u95A5",
    group: "2LA\u7CFB\u5217(\u6CB9)",
    code: "2LA",
    name: "2LA\u7CFB\u5217 \u76F4\u52D5/\u5148\u5C0E\u5E38\u9589\u578B\u96FB\u78C1\u95A5",
    format: "2LA{type}{function}{bore}{port}{voltage}{connection}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u76F4\u52D5\u5E38\u9589\u578B\u96FB\u78C1\u95A5"
          },
          {
            code: "150",
            description: "\u5148\u5C0E\u5E38\u9589\u578B\u96FB\u78C1\u95A5"
          }
        ]
      },
      {
        id: "function",
        name: "\u58D3\u529B\u689D\u4EF6",
        options: [
          {
            code: "H",
            description: "\u9AD8\u58D3\u578B"
          },
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u6A19\u7A31\u901A\u5F91",
        options: [
          {
            code: "030",
            description: "\u03A615mm"
          },
          {
            code: "050",
            description: "\u03A620mm"
          },
          {
            code: "150",
            description: "\u03A615mm"
          },
          {
            code: "200",
            description: "\u03A620mm"
          },
          {
            code: "250",
            description: "\u03A625mm"
          },
          {
            code: "320",
            description: "\u03A635mm"
          },
          {
            code: "400",
            description: "\u03A640mm"
          },
          {
            code: "500",
            description: "\u03A650mm"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          },
          {
            code: "32",
            description: '1 1/4"'
          },
          {
            code: "40",
            description: '1 1/2"'
          },
          {
            code: "50",
            description: '2"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u7DDA\u5708\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.193"
  },
  {
    id: "2SA",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6D41\u9AD4\u63A7\u5236\u95A5",
    group: "2SA\u7CFB\u5217(\u6C23\u9AD4)",
    code: "2SA",
    name: "2SA\u7CFB\u5217 \u76F4\u52D5/\u5148\u5C0E\u5E38\u9589\u578B\u96FB\u78C1\u95A5",
    format: "2SA{type}{function}{bore}{port}{voltage}{connection}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u76F4\u52D5\u5E38\u9589\u578B\u96FB\u78C1\u95A5"
          },
          {
            code: "150",
            description: "\u5148\u5C0E\u5E38\u9589\u578B\u96FB\u78C1\u95A5"
          }
        ]
      },
      {
        id: "function",
        name: "\u58D3\u529B\u689D\u4EF6",
        options: [
          {
            code: "X",
            description: "\u8D85\u9AD8\u58D3\u578B"
          },
          {
            code: "H",
            description: "\u9AD8\u58D3\u578B"
          },
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u5927\u6D41\u91CF\u578B"
          },
          {
            code: "T",
            description: "\u7279\u5927\u6D41\u91CF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u6A19\u7A31\u901A\u5F91",
        options: [
          {
            code: "030",
            description: "\u03A615mm"
          },
          {
            code: "050",
            description: "\u03A620mm"
          },
          {
            code: "150",
            description: "\u03A615mm"
          },
          {
            code: "200",
            description: "\u03A620mm"
          },
          {
            code: "250",
            description: "\u03A625mm"
          },
          {
            code: "320",
            description: "\u03A635mm"
          },
          {
            code: "400",
            description: "\u03A640mm"
          },
          {
            code: "500",
            description: "\u03A650mm"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          },
          {
            code: "32",
            description: '1 1/4"'
          },
          {
            code: "40",
            description: '1 1/2"'
          },
          {
            code: "50",
            description: '2"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u7DDA\u5708\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.185"
  },
  {
    id: "2V",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6D41\u9AD4\u63A7\u5236\u95A5",
    group: "2V\u7CFB\u5217",
    code: "2V",
    name: "2V\u7CFB\u5217 \u5E38\u9589\u578B\u96FB\u78C1\u95A5",
    format: "{type}{bore}{port}{voltage}{connection}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "2V",
            description: "\u4E8C\u53E3\u4E8C\u4F4D\u96FB\u78C1\u95A5"
          }
        ]
      },
      {
        id: "bore",
        name: "\u6A19\u7A31\u901A\u5F91",
        options: [
          {
            code: "025",
            description: "\u03A62.5mm"
          },
          {
            code: "130",
            description: "\u03A613mm"
          },
          {
            code: "250",
            description: "\u03A625mm"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u7DDA\u5708\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.206"
  },
  {
    id: "2P",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6D41\u9AD4\u63A7\u5236\u95A5",
    group: "2P\u7CFB\u5217",
    code: "2P",
    name: "2P\u7CFB\u5217 \u5E38\u9589\u578B\u96FB\u78C1\u95A5",
    format: "{type}{bore}{port}{voltage}{connection}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "2P",
            description: "\u4E8C\u53E3\u4E8C\u4F4D\u96FB\u78C1\u95A5"
          }
        ]
      },
      {
        id: "bore",
        name: "\u6A19\u7A31\u901A\u5F91",
        options: [
          {
            code: "025",
            description: "\u03A62.5mm"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u7DDA\u5708\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "A",
            description: "\u7AEF\u5B50\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.208"
  },
  {
    id: "2WA",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6D41\u9AD4\u63A7\u5236\u95A5",
    group: "2WA\u7CFB\u5217(\u6C34)",
    code: "2WA",
    name: "2WA\u7CFB\u5217 \u76F4\u52D5/\u5148\u5C0E\u5E38\u9589\u578B\u96FB\u78C1\u95A5",
    format: "2WA{type}{function}{bore}{port}{voltage}{connection}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u76F4\u52D5\u5E38\u9589\u578B\u96FB\u78C1\u95A5"
          },
          {
            code: "150",
            description: "\u5148\u5C0E\u5E38\u9589\u578B\u96FB\u78C1\u95A5"
          }
        ]
      },
      {
        id: "function",
        name: "\u58D3\u529B\u689D\u4EF6",
        options: [
          {
            code: "H",
            description: "\u9AD8\u58D3\u578B"
          },
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u5927\u6D41\u91CF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u6A19\u7A31\u901A\u5F91",
        options: [
          {
            code: "030",
            description: "\u03A615mm"
          },
          {
            code: "050",
            description: "\u03A620mm"
          },
          {
            code: "150",
            description: "\u03A615mm"
          },
          {
            code: "200",
            description: "\u03A620mm"
          },
          {
            code: "250",
            description: "\u03A625mm"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u7DDA\u5708\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.178"
  }
];

// src/data/catalog-solenoid-valves.json
var catalog_solenoid_valves_default = [
  {
    id: "4V100",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "4V100\u7CFB\u5217",
    name: "4V100\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    orderCodeFormat: "4V 1 {controlType} {port} {voltage} {terminal} {thread} - {pilotType}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "100\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      },
      {
        id: "pilotType",
        name: "\u5F15\u5C0E\u65B9\u5F0F",
        optionsRef: "pilotTypeOptions.internalExternal",
        note: "M5\u53E3\u5F91\u7121\u5916\u90E8\u5F15\u5C0E\u5B54\u898F\u683C"
      }
    ],
    specs: [
      {
        model: "4V110-M5/4V120-M5/4V130C-M5/4V130E-M5/4V130P-M5",
        port: "M5",
        cv: 0.6,
        weightG: "120/200"
      },
      {
        model: "4V110-06/4V120-06/4V130C-06/4V130E-06/4V130P-06",
        port: '1/8"',
        cv: 0.51,
        weightG: "120~175/200"
      }
    ],
    electrical: {
      voltageOptions: "AC220V/AC110V/AC24V/DC24V/DC12V",
      protectionGrade: "IP65(DIN40050)",
      heatGrade: "B\u7D1A",
      maxOperateFreq: "5\u6B21/\u79D2(\u55AE\u96FB\u63A7) / 3\u6B21/\u79D2(\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7)"
    },
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    workingFluid: "\u7A7A\u6C23(\u7D9340\u03BCm\u4EE5\u4E0A\u6FFE\u7DB2\u904E\u6FFE)",
    sourceFile: "4V-202303011022369106.pdf (P80)"
  },
  {
    id: "4V200",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "4V200\u7CFB\u5217",
    name: "4V200\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    orderCodeFormat: "4V 2 {controlType} {port} {voltage} {terminal} {thread} - {pilotType}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "2",
            description: "200\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      },
      {
        id: "pilotType",
        name: "\u5F15\u5C0E\u65B9\u5F0F",
        optionsRef: "pilotTypeOptions.internalExternal"
      }
    ],
    specs: [
      {
        model: "4V210-06/4V220-06/4V230C-06/4V230E-06/4V230P-06",
        port: '1/8"',
        cv: 1,
        weightG: "220/360"
      },
      {
        model: "4V210-08/4V220-08/4V230C-08/4V230E-08/4V230P-08",
        port: '1/4"',
        cv: 0.8,
        weightG: "220~320/360"
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "4V-202303011022369106.pdf (P82)"
  },
  {
    id: "4V300",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "4V300\u7CFB\u5217",
    name: "4V300\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    orderCodeFormat: "4V 3 {controlType} {port} {voltage} {terminal} {thread} - {pilotType}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "3",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      },
      {
        id: "pilotType",
        name: "\u5F15\u5C0E\u65B9\u5F0F",
        optionsRef: "pilotTypeOptions.internalExternal"
      }
    ],
    specs: [
      {
        model: "4V310-08/4V320-08/4V330C-08/4V330E-08/4V330P-08",
        port: '1/4"',
        cv: 1.65,
        weightG: "310~400/450"
      },
      {
        model: "4V310-10/4V320-10/4V330C-10/4V330E-10/4V330P-10",
        port: '3/8"',
        cv: 1.25,
        weightG: "310~400/450"
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "4V-202303011022369106.pdf (P84)"
  },
  {
    id: "4V400",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "4V400\u7CFB\u5217",
    name: "4V400\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    orderCodeFormat: "4V 4 {controlType} {port} {voltage} {terminal} {thread} - {pilotType}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "4",
            description: "400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      },
      {
        id: "pilotType",
        name: "\u5F15\u5C0E\u65B9\u5F0F",
        optionsRef: "pilotTypeOptions.internalExternal"
      }
    ],
    specs: [
      {
        model: "4V410-15/4V420-15",
        port: '1/2"',
        cv: 2.82,
        weightG: 590
      },
      {
        model: "4V430C-15/4V430E-15",
        port: '1/2"',
        cv: 2.35,
        weightG: 720
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "4V-202303011022369106.pdf (P86)"
  },
  {
    id: "6SV",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "6SV\u7CFB\u5217",
    name: "6SV\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D, \u5148\u5C0E\u5F0F)",
    orderCodeFormat: "6SV {seriesCode} {controlType} {port} {voltage} {terminal} {leadLength} {thread}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "05",
            description: "0500\u7CFB\u5217"
          },
          {
            code: "1",
            description: "100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "300\u7CFB\u5217"
          },
          {
            code: "4",
            description: "400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5(0500\u7CFB\u5217)"
          },
          {
            code: "06",
            description: "PT1/8(100\u7CFB\u5217\u62160500\u7279\u6B8A\u898F\u683C)"
          },
          {
            code: "08",
            description: "PT1/4(200\u7CFB\u5217)"
          },
          {
            code: "10",
            description: "PT3/8(300\u7CFB\u5217)"
          },
          {
            code: "15",
            description: "PT1/2(400\u7CFB\u5217)"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u63D2\u63A5\u5F0F"
          },
          {
            code: "I",
            description: "I: \u51FA\u7DDA\u5F0F"
          },
          {
            code: "D",
            description: "D: DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "M",
            description: "M: M8\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "leadLength",
        name: "\u7AEF\u5B50\u7DDA\u9577",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: 0.5m"
          },
          {
            code: "200",
            description: "200: 2m"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    specs: [
      {
        model: "6SV0510/6SV0520/6SV0530",
        port: "M5",
        cv: "0.2~0.25",
        weightG: "31.5~48"
      },
      {
        model: "6SV110/6SV120/6SV130",
        port: "PT1/8",
        cv: "0.5~0.7",
        weightG: "69.5~101.5"
      },
      {
        model: "6SV210/6SV220/6SV230",
        port: "PT1/4\u62161/8",
        cv: "0.9~1.05",
        weightG: "105~143"
      },
      {
        model: "6SV310/6SV320/6SV330",
        port: "PT3/8",
        cv: "1.8~2.25",
        weightG: "240~317.5"
      },
      {
        model: "6SV410/6SV420/6SV430",
        port: "PT1/2",
        cv: "3~3.2",
        weightG: "368~487.5"
      }
    ],
    note: "6SV0500\u7CFB\u5217\u96FB\u78C1\u95A5\u4F7F\u7528CPSV10\u5148\u5C0E\u95A5,\u63A5\u96FB\u5F62\u5F0F\u7121DIN\u63D2\u5EA7\u5F0F,\u96FB\u58D3\u898F\u683C\u70BADC24V/DC12V/AC220V/AC110V",
    workingPressureRange: "\u4E09\u4F4D\u7F6E\u578B0.2~0.8MPa(29~114psi); \u5176\u5B83\u578B0.15~0.8MPa(21~114psi)",
    electrical: {
      protectionGrade: "IP65",
      heatGrade: "F\u7D1A"
    },
    sourceFile: "6SV\u7CFB\u5217\u96FB\u78C1\u95A5_\u4E94\u53E3\u4E8C\u4F4D_\u4E94\u53E3\u4E09\u4F4D_-202603240400409696.pdf"
  },
  {
    id: "7SV",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "7SV\u7CFB\u5217",
    name: "7SV\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D, \u5148\u5C0E\u5F0F, \u63D2\u63A5\u5F0F\u63A5\u96FB)",
    orderCodeFormat: "7V {seriesCode} {controlType} {portConnType} {port} {voltage} {leadLength} {thread}",
    note: "7V/7SV\u70BA\u540C\u6B3E\u7522\u54C1\u5728\u4E0D\u540C\u578B\u9304\u4E2D\u7684\u6A19\u793A,\u8A02\u8CFC\u78BC\u7D50\u69CB\u76F8\u540C",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "05",
            description: "0500\u7CFB\u5217"
          },
          {
            code: "1",
            description: "100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "portConnType",
        name: "\u63A5\u7BA1\u578B\u5F0F",
        optionsRef: "portConnectionTypeOptions.threadOrQuick"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91(\u87BA\u7D0B)/\u7BA1\u63A5\u53E3\u5F91(\u5FEB\u63D2)",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "04",
            description: "\u03A64mm(\u5FEB\u63D2)"
          },
          {
            code: "06",
            description: "PT1/8 \u6216 \u03A66mm(\u5FEB\u63D2)"
          },
          {
            code: "08",
            description: "PT1/4 \u6216 \u03A68mm(\u5FEB\u63D2)"
          },
          {
            code: "10",
            description: "PT3/8 \u6216 \u03A610mm(\u5FEB\u63D2)"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "leadLength",
        name: "\u7AEF\u5B50\u7E10\u9577",
        options: [
          {
            code: "050",
            description: "0.5m"
          },
          {
            code: "200",
            description: "2.0m"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    specs: [
      {
        model: "7V0510/7V0520/7V0530",
        port: "M5",
        cv: "0.13~0.2",
        weightG: "30~50"
      },
      {
        model: "7V110/7V120/7V130",
        port: "PT1/8",
        cv: "0.41~0.47",
        weightG: "80~100"
      },
      {
        model: "7V210/7V220/7V230",
        port: "PT1/4",
        cv: "0.64~0.87",
        weightG: "120~145"
      },
      {
        model: "7V310/7V320/7V330",
        port: "PT3/8",
        cv: "1.25~1.8",
        weightG: "230~305"
      }
    ],
    workingPressureRange: "\u4E09\u4F4D\u7F6E\u578B0.2~0.8MPa(29~114psi); \u5176\u5B83\u578B0.15~0.8MPa(21~114psi)",
    electrical: {
      \u8017\u96FB\u91CF: "1.1VA(AC) / 0.7W(DC)",
      protectionGrade: "\u9632\u5875",
      heatGrade: "F\u7D1A"
    },
    accessories: "\u914D\u5957\u7528\u5E95\u5EA7 7V0500M/7V100M/7V200M/7V300M(\u53EF1~20\u9023), \u5074\u9762/\u5E95\u90E8\u5B89\u88DD\u652F\u67B6 F-7V\u7CFB\u5217LB/LBD",
    sourceFile: "7V\u7CFB\u5217\u96FB\u78C1\u95A5-202507101002293446.pdf"
  },
  {
    id: "3V100",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "3V100\u7CFB\u5217",
    name: "3V100\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D)",
    orderCodeFormat: "3V 1 {controlType} {port} {initialState} {voltage} {terminal} {thread} - {pilotType}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "100\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.3port_2position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        optionsRef: "initialStateOptions.ncNo"
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      },
      {
        id: "pilotType",
        name: "\u5F15\u5C0E\u65B9\u5F0F",
        optionsRef: "pilotTypeOptions.internalExternal"
      }
    ],
    specs: [
      {
        model: "3V110-M5/3V120-M5",
        port: "M5",
        cv: null
      },
      {
        model: "3V110-06/3V120-06",
        port: '1/8"',
        cv: 0.6
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    maxOperateFreq: "5\u6B21/\u79D2(\u7A7A\u8F09)",
    sourceFile: "3V100\u7CFB\u5217-202303011011382166.pdf (P42)"
  },
  {
    id: "3V200",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "3V200\u7CFB\u5217",
    name: "3V200\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D)",
    orderCodeFormat: "3V 2 {controlType} {port} {initialState} {voltage} {terminal} {thread} - {pilotType}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "2",
            description: "200\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.3port_2position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        optionsRef: "initialStateOptions.ncNo"
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      },
      {
        id: "pilotType",
        name: "\u5F15\u5C0E\u65B9\u5F0F",
        optionsRef: "pilotTypeOptions.internalExternal"
      }
    ],
    specs: [
      {
        model: "3V210-06/3V220-06",
        port: '1/8"',
        cv: null
      },
      {
        model: "3V210-08/3V220-08",
        port: '1/4"',
        cv: 1
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "3V100\u7CFB\u5217-202303011011382166.pdf (P44)"
  },
  {
    id: "3V300",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "3V300\u7CFB\u5217",
    name: "3V300\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D)",
    orderCodeFormat: "3V 3 {controlType} {port} {initialState} {voltage} {terminal} {thread} - {pilotType}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "3",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.3port_2position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        optionsRef: "initialStateOptions.ncNo"
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      },
      {
        id: "pilotType",
        name: "\u5F15\u5C0E\u65B9\u5F0F",
        optionsRef: "pilotTypeOptions.internalExternal"
      }
    ],
    specs: [
      {
        model: "3V310-08/3V320-08",
        port: '1/4"',
        cv: null
      },
      {
        model: "3V310-10/3V320-10",
        port: '3/8"',
        cv: 1.65
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "3V100\u7CFB\u5217-202303011011382166.pdf (P46)"
  },
  {
    id: "3V1",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "3V1\u7CFB\u5217",
    name: "3V1\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u76F4\u52D5\u5F0F\u5E38\u9589\u578B)",
    orderCodeFormat: "3V1 {port} {voltage} {terminal} {thread}",
    categories: [
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    specs: [
      {
        model: "3V1-M5 / 3V1-06",
        flowDiameterMm: 1.2,
        note: "\u76F4\u52D5\u5F0F,\u7121\u9700\u52A0\u6CB9\u6F64\u6ED1,\u53EF\u591A\u95A5\u96C6\u6210\u4F7F\u7528"
      }
    ],
    workingPressureRange: "0~0.8MPa(0~114psi)",
    maxOperateFreq: "10\u6B21/\u79D2(\u7A7A\u8F09)",
    sourceFile: "3V1\u7CFB\u5217-\u96FB\u78C1\u95A5-202303011004205466.pdf (P31)"
  },
  {
    id: "3V2",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "3V2\u7CFB\u5217",
    name: "3V2\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u76F4\u52D5\u5F0F, \u5E38\u9589/\u5E38\u958B\u53EF\u9078)",
    orderCodeFormat: "3V2 {port} {initialState} {voltage} {terminal} {thread}",
    categories: [
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        optionsRef: "initialStateOptions.ncNo"
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    specs: [
      {
        model: "3V206",
        port: '1/8"',
        cv: 0.18
      },
      {
        model: "3V208",
        port: '1/4"',
        cv: 0.19
      }
    ],
    workingPressureRange: "\u666E\u901A0~0.8MPa(0~114psi); \u771F\u7A7A-102.2kPa~0.1MPa(-14.5~14.2psi)",
    features: "\u540C\u8EF8\u622A\u6B62\u5F0F\u7D50\u69CB,\u5BC6\u5C01\u6027\u597D,\u6D41\u91CF\u5927,\u53EF\u7528\u65BC\u771F\u7A7A(\u8CA0\u58D3)",
    accessories: "\u5B89\u88DD\u9644\u4EF6\u8A02\u8CFC\u78BC F-3V2 FA (FA\u578B\u5B89\u88DD\u677F)",
    sourceFile: "3V1\u7CFB\u5217-\u96FB\u78C1\u95A5-202303011004205466.pdf (P33)"
  },
  {
    id: "3V2M",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "3V2M\u7CFB\u5217(\u5E36\u5E95\u5EA7\u578B)",
    name: "3V2M\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u5E36\u5E95\u5EA7\u578B, \u53EF\u96C6\u6210\u64F4\u5145)",
    orderCodeFormat: "\u95A5\u9AD4: 3V2M {initialState} {voltage} {terminal} | \u5E95\u5EA7: 3V2M {manifoldStations} {exhaustType} {thread}",
    categories: [
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        optionsRef: "initialStateOptions.ncNo"
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "manifoldStations",
        name: "\u5E95\u5EA7\u9023\u6578",
        options: [
          {
            code: "1F",
            description: "1\u9023"
          },
          {
            code: "2F",
            description: "2\u9023"
          },
          {
            code: "20F",
            description: "\u2026\u6700\u592720\u9023"
          }
        ]
      },
      {
        id: "exhaustType",
        name: "\u6392\u6C23\u985E\u578B",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u96C6\u4E2D\u6392\u6C23\u578B"
          },
          {
            code: "D",
            description: "D: \u7368\u7ACB\u6392\u6C23\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    specs: [
      {
        model: "3V2M",
        cv: 0.1,
        port: '1/8"(\u5E95\u5EA7\u50C5\u6B64\u4E00\u7A2E)'
      }
    ],
    note: "\u8A02\u8CFC\u78BC\u5206\u4E09\u7A2E: \u95A5\u9AD4\u8A02\u8CFC\u78BC\u3001\u5E95\u5EA7\u8A02\u8CFC\u78BC\u3001\u7D44\u5408(\u95A5\u7D44)\u8A02\u8CFC\u78BC\u3001\u76F2\u677F\u8A02\u8CFC\u78BC(P-3V2M-R2)",
    workingPressureRange: "0~0.8MPa(0~114psi)",
    sourceFile: "3V1\u7CFB\u5217-\u96FB\u78C1\u95A5-202303011004205466.pdf (P35)"
  },
  {
    id: "3V3",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "3V3\u7CFB\u5217",
    name: "3V3\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u76F4\u52D5\u5F0F, \u5E38\u9589/\u5E38\u958B\u53EF\u9078)",
    orderCodeFormat: "3V3 {port} {initialState} {voltage} {terminal} {thread}",
    categories: [
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        optionsRef: "initialStateOptions.ncNo"
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        optionsRef: "terminalOptions.dinOrLead"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    specs: [
      {
        model: "3V308",
        port: '1/4"',
        cv: 0.62
      }
    ],
    workingPressureRange: "\u666E\u901A0~0.8MPa; \u771F\u7A7A-102.2kPa~0.1MPa",
    sourceFile: "3V1\u7CFB\u5217-\u96FB\u78C1\u95A5-202303011004205466.pdf (P37)"
  },
  {
    id: "6STV",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "6STV\u7CFB\u5217",
    name: "6STV\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u5148\u5C0E\u5F0F)",
    orderCodeFormat: "6STV {seriesCode} {controlType} {port} {initialState} {voltage} {terminal} {leadLength} {thread}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "05",
            description: "0500\u7CFB\u5217"
          },
          {
            code: "1",
            description: "100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.3port_2position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: "PT1/8"
          },
          {
            code: "08",
            description: "PT1/4"
          },
          {
            code: "10",
            description: "PT3/8"
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        options: [
          {
            code: "NC",
            description: "\u5E38\u9589\u578B"
          },
          {
            code: "NO",
            description: "\u5E38\u958B\u578B"
          },
          {
            code: "B",
            description: "\u58D3; \u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u7121\u521D\u59CB\u72C0\u614B\u53EF\u6E2C"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u63D2\u63A5\u5F0F"
          },
          {
            code: "I",
            description: "I: \u51FA\u7DDA\u5F0F"
          },
          {
            code: "D",
            description: "D: DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "M",
            description: "M: M8\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "leadLength",
        name: "\u7AEF\u5B50\u7DDA\u9577",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: 0.5m"
          },
          {
            code: "200",
            description: "200: 2.0m"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    specs: [
      {
        model: "6STV0510/6STV0520",
        port: "M5",
        cv: 0.25,
        weightG: "28/42"
      },
      {
        model: "6STV110/6STV120",
        port: "M5\u6216PT1/8",
        cv: 0.7,
        weightG: "63/89.5"
      },
      {
        model: "6STV210/6STV220",
        port: "PT1/8\u62161/4",
        cv: "1.05",
        weightG: "101.5/129"
      },
      {
        model: "6STV310/6STV320",
        port: "PT3/8\u62161/4",
        cv: 2.25,
        weightG: "196.5/227"
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "6STV\u7CFB\u5217\u96FB\u78C1\u95A5_\u4E09\u53E3\u4E8C\u4F4D_-202603240359446146.pdf"
  },
  {
    id: "4STV",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "4STV\u7CFB\u5217",
    name: "4STV\u7CFB\u5217 \u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u5148\u5C0E\u5F0F)",
    orderCodeFormat: "4STV {seriesCode} {controlType} {port} {initialState} {voltage} {terminal} {leadLength} {thread}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.3port_2position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: "PT1/8"
          },
          {
            code: "08",
            description: "PT1/4"
          },
          {
            code: "10",
            description: "PT3/8"
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        options: [
          {
            code: "NC",
            description: "\u5E38\u9589\u578B"
          },
          {
            code: "NO",
            description: "\u5E38\u958B\u578B(\u96D9\u4F4D\u7F6E\u96D9\u96FB\u63A7\u7121\u521D\u59CB\u72C0\u614B\u53EF\u9078)"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u63D2\u63A5\u5F0F"
          },
          {
            code: "I",
            description: "I: \u51FA\u7DDA\u5F0F"
          },
          {
            code: "D",
            description: "D: DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "M",
            description: "M: M8\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "leadLength",
        name: "\u7AEF\u5B50\u7DDA\u9577",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: 0.5m"
          },
          {
            code: "200",
            description: "200: 2.0m"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    specs: [
      {
        model: "4STV110/4STV120",
        port: "M5\u6216PT1/8",
        cv: 0.6,
        weightG: "74/102"
      },
      {
        model: "4STV210/4STV220",
        port: "PT1/8\u62161/4",
        cv: 1,
        weightG: "114/144"
      },
      {
        model: "4STV310",
        port: "PT1/4",
        cv: 1.8,
        weightG: 171
      },
      {
        model: "4STV320",
        port: "PT3/8",
        cv: 1.8,
        weightG: 203
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "4STV\u7CFB\u5217\u96FB\u78C1\u95A5_\u4E09\u53E3\u4E8C\u4F4D_-202602240320286216.pdf"
  },
  {
    id: "CPV10",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u5FAE\u578B\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "CPV10\u7CFB\u5217",
    name: "CPV10\u7CFB\u5217 \u5FAE\u578B\u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u76F4\u52D5\u5F0F)",
    orderCodeFormat: "CPV 10 {voltage} {manualPin}-{leadLength}",
    categories: [
      {
        id: "bodyWidth",
        name: "\u95A5\u9AD4\u5BEC\u5EA6",
        options: [
          {
            code: "10",
            description: "10mm"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "manualPin",
        name: "\u624B\u52D5\u92B7\u4EE3\u78BC",
        options: [
          {
            code: "P",
            description: "P: \u6709\u624B\u52D5\u92B7"
          }
        ]
      },
      {
        id: "leadLength",
        name: "\u7DDA\u9577",
        options: [
          {
            code: "050",
            description: "0.5m"
          },
          {
            code: "200",
            description: "2.0m"
          }
        ]
      }
    ],
    specs: [
      {
        model: "CPV10",
        flowDiameterMm: 0.55,
        cvPA: 0.014,
        cvAR: 0.02,
        weightG: 15
      }
    ],
    workingPressureRange: "0~0.8MPa(0~114psi)",
    protectionGrade: "\u9632\u5875",
    features: "DC\u96FB\u8DEF\u7121\u6975\u6027\u8F38\u5165\u8A2D\u8A08, \u6A4B\u5F0F\u6574\u6D41\u5668\u5168\u6CE2\u6574\u6D41, \u555F\u52D5\u96FB\u58D3\u4F4E\u58FD\u547D\u9577",
    accessories: "\u914D\u5957\u7528\u5E95\u5EA7 CPV10M(2\u9023~20\u9023), \u7AEF\u5B50\u7DDA\u53EF\u53E6\u8CFC CPV T 050/200",
    sourceFile: "CPV10\u7CFB\u5217\u5FAE\u578B\u96FB\u78C1\u95A5-202603240402288946.pdf"
  },
  {
    id: "CPV15",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u5FAE\u578B\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "CPV15\u7CFB\u5217",
    name: "CPV15\u7CFB\u5217 \u5FAE\u578B\u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u76F4\u52D5\u5F0F)",
    orderCodeFormat: "CPV 15 {voltage} {manualPin}-{leadLength}",
    categories: [
      {
        id: "bodyWidth",
        name: "\u95A5\u9AD4\u5BEC\u5EA6",
        options: [
          {
            code: "15",
            description: "15mm"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "manualPin",
        name: "\u624B\u52D5\u92B7\u4EE3\u78BC",
        options: [
          {
            code: "P",
            description: "P: \u6709\u624B\u52D5\u92B7"
          }
        ]
      },
      {
        id: "leadLength",
        name: "\u7DDA\u9577",
        options: [
          {
            code: "050",
            description: "0.5m"
          },
          {
            code: "200",
            description: "2.0m"
          }
        ]
      }
    ],
    specs: [
      {
        model: "CPV15",
        flowDiameterMm: 0.8,
        cvPA: 0.024,
        cvAR: 0.03,
        weightG: "33.2(\u95A5\u9AD4)"
      }
    ],
    workingPressureRange: "0~0.8MPa(0~114psi)",
    \u53CD\u61C9\u6642\u9593: "on<10ms; off<10ms",
    accessories: "\u914D\u5957\u7528\u5E95\u5EA7 CPV15M(2\u9023~20\u9023), \u7AEF\u5B50\u7DDA\u53EF\u53E6\u8CFC CPV T 050/200",
    sourceFile: "CPV15\u7CFB\u5217\u5FAE\u578B\u96FB\u78C1\u95A5-202603240403450406.pdf"
  },
  {
    id: "CPSV15",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u5FAE\u578B\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "CPSV15\u7CFB\u5217",
    name: "CPSV15\u7CFB\u5217 \u5FAE\u578B\u96FB\u78C1\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u76F4\u52D5\u5F0F, \u591A\u7A2E\u63A5\u96FB\u5F62\u5F0F)",
    orderCodeFormat: "CPSV {connType} 15 {voltage} - {leadLength}",
    categories: [
      {
        id: "connType",
        name: "\u63A5\u96FB\u5F62\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u63D2\u63A5\u5F0F"
          },
          {
            code: "I",
            description: "I: \u51FA\u7DDA\u5F0F"
          },
          {
            code: "D",
            description: "D: DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "M",
            description: "M: M8\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "15",
            description: "15\u7CFB\u5217"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        optionsRef: "voltageOptions.standard5"
      },
      {
        id: "leadLength",
        name: "\u7AEF\u5B50\u7DDA\u7DDA\u9577",
        options: [
          {
            code: "050",
            description: "0.5m"
          },
          {
            code: "200",
            description: "2.0m"
          }
        ]
      }
    ],
    specs: [
      {
        model: "CPSV15",
        flowDiameterMm: 0.65,
        cvPA: 0.019,
        cvAR: 0.025,
        weightG: "22~36(\u4F9D\u63A5\u96FB\u5F62\u5F0F)"
      }
    ],
    workingPressureRange: "0~0.8MPa(0~114psi)",
    protectionGrade: "IP65",
    sourceFile: "CPSV15\u7CFB\u5217\u5FAE\u578B\u96FB\u78C1\u95A5_\u4E09\u53E3\u4E8C\u4F4D_-202603240401261836.pdf"
  },
  {
    id: "CPV10S",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u5FAE\u578B\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "CPV10S\u7CFB\u5217(\u96C6\u6210\u95A5)",
    name: "CPV10S\u7CFB\u5217 \u96C6\u6210\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, CPV10\u5FAE\u578B\u96FB\u78C1\u95A5\u7684\u96C6\u6210\u95A5\u7D44)",
    orderCodeFormat: "\u5E95\u5EA7: CPV10S {port} {leadCode} {voltage} {manifoldStations}",
    categories: [
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "J03",
            description: "\u03A63.2mm(\u5FEB\u63D2\u63A5\u982D)"
          },
          {
            code: "J04",
            description: "\u03A64.0mm(\u5FEB\u63D2\u63A5\u982D)"
          }
        ]
      },
      {
        id: "leadCode",
        name: "\u51FA\u7DDA\u65B9\u5F0F",
        options: [
          {
            code: "T",
            description: "\u96C6\u4E2D\u51FA\u7DDA"
          },
          {
            code: "L",
            description: "D-Sub\u63D2\u5EA7(\u50C5\u914D\u540824V DC)"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "manifoldStations",
        name: "\u9023\u6578\u4EE3\u865F",
        options: [
          {
            code: "4F",
            description: "4\u9023"
          },
          {
            code: "24F",
            description: "\u2026\u6700\u592724\u9023"
          }
        ]
      }
    ],
    specs: [
      {
        model: "CPV10S",
        \u63A5\u96FB\u65B9\u5F0F: "\u63D2\u63A5\u5F0F, 25pin D-Sub",
        \u5B89\u88DD\u9023\u6578: "4\u9023~24\u9023"
      }
    ],
    note: "\u8A02\u8CFC\u78BC\u5206\u5E95\u5EA7(P\u5B54M5/A\u5B54\u03A63.2mm\u6216\u03A64mm\u5FEB\u63D2)\u3001\u96FB\u78C1\u95A5\u3001\u76F2\u677F\u4E09\u90E8\u5206,\u8A73\u898B\u578B\u9304P18-19",
    sourceFile: "CPV10\u7CFB\u5217\u5FAE\u578B\u96FB\u78C1\u95A5-202603240402288946.pdf (P18-19)"
  },
  {
    id: "CPV15S",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u5FAE\u578B\u96FB\u78C1\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "CPV15S\u7CFB\u5217(\u96C6\u6210\u95A5)",
    name: "CPV15S\u7CFB\u5217 \u96C6\u6210\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, CPV15\u5FAE\u578B\u96FB\u78C1\u95A5\u7684\u96C6\u6210\u95A5\u7D44)",
    orderCodeFormat: "\u5E95\u5EA7: CPV15S {manifoldStations} {thread} | \u96FB\u78C1\u95A5: CPV15 {voltage} {manualPin} | \u76F2\u677F: P-CPV15S-R2",
    categories: [
      {
        id: "manifoldStations",
        name: "\u9023\u6578\u4EE3\u865F",
        options: [
          {
            code: "2F",
            description: "2\u9023"
          },
          {
            code: "20F",
            description: "\u2026\u6700\u592720\u9023"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC(\u5E95\u5EA7P\u5B54/R\u5B54)",
        optionsRef: "threadOptions.standardGT"
      },
      {
        id: "portA",
        name: "A\u5B54\u53E3\u5F91(\u4F9D\u7259\u578B)",
        options: [
          {
            code: "PT/G\u7259",
            description: "\u03A64mm\u5FEB\u63D2\u63A5\u982D"
          },
          {
            code: "NPT\u7259",
            description: '\u03A65/32"\u5FEB\u63D2\u63A5\u982D'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3(\u96FB\u78C1\u95A5)",
        options: [
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "manualPin",
        name: "\u624B\u52D5\u92B7\u4EE3\u78BC",
        options: [
          {
            code: "P",
            description: "P: \u6709\u624B\u52D5\u92B7"
          }
        ]
      }
    ],
    specs: [
      {
        model: "CPV15SB/CPV15SF",
        \u63A5\u96FB\u65B9\u5F0F: "\u63D2\u63A5\u5F0F, 25pin D-Sub, \u6BCF\u7D442\u9023\u4E00\u7D1A",
        \u5B89\u88DD\u9023\u6578: "2\u9023~20\u9023"
      }
    ],
    sourceFile: "CPV15\u7CFB\u5217\u5FAE\u578B\u96FB\u78C1\u95A5-202603240403450406.pdf (P24-27)"
  },
  {
    id: "5a",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "5A\u7CFB\u5217",
    name: "5A\u7CFB\u5217 \u6C23\u63A7\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D, \u5C0D\u61C95V\u7CFB\u5217\u96FB\u63A7\u95A5\u7D50\u69CB)",
    orderCodeFormat: "5A {seriesCode}{controlType} {port} {thread}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "1: 100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          },
          {
            code: "4",
            description: "4: 400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259\u6216\u7121\u6B64\u4EE3\u78BC(M5)"
          }
        ]
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "5A\u7CFB\u5217\u6C23\u63A7\u95A5202303011040044526.pdf (\u51713\u9801)"
  },
  {
    id: "eav",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "EAV\u7CFB\u5217",
    name: "EAV\u7CFB\u5217 \u6A19\u6E96\u6C23\u63A7\u95A5 (ISO\u6A19\u6E96\u5B89\u88DD\u5C3A\u5BF8, \u5C0D\u61C9ESV\u7CFB\u5217\u96FB\u63A7\u95A5\u7D50\u69CB)",
    orderCodeFormat: "EAV {seriesCode} {controlType} {pilotType}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          },
          {
            code: "4",
            description: "4: 400\u7CFB\u5217"
          },
          {
            code: "6",
            description: "6: 600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "pilotType",
        name: "\u5F15\u5C0E\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u5167\u90E8\u5F15\u5C0E\u5F0F"
          },
          {
            code: "W",
            description: "W: \u5916\u90E8\u5F15\u5C0E\u5F0F"
          }
        ]
      }
    ],
    note: "\u53E6\u6709\u642D\u914D\u5E95\u5EA7\u3001\u7AEF\u677F\u7B49\u7D44\u4EF6,\u8A02\u8CFC\u78BC\u7D50\u69CB\u8207ESV\u7CFB\u5217\u5E95\u5EA7\u7D44\u4EF6(ESV{\u7CFB\u5217}{\u578B\u5F0F\u4EE3\u865F})\u76F8\u540C,\u8A73\u898B\u578B\u9304P3-8",
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "EAV\u7CFB\u5217\u6A19\u6E96\u6C23\u63A7\u95A5202303011043369046.pdf (\u51718\u9801)"
  },
  {
    id: "4sa",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "4SA\u7CFB\u5217",
    name: "4SA\u7CFB\u5217 \u6C23\u63A7\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D, Cv: 0.51~3.0, \u5C0D\u61C94SV\u7CFB\u5217\u96FB\u63A7\u95A5\u7D50\u69CB)",
    orderCodeFormat: "4SA {seriesCode} {controlType} {port} {thread}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "1: 100\u7CFB\u5217 (Cv~0.6)"
          },
          {
            code: "2",
            description: "2: 200\u7CFB\u5217 (Cv~1.0)"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217 (Cv~1.8)"
          },
          {
            code: "4",
            description: "4: 400\u7CFB\u5217 (Cv~3.0)"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: "PT1/8"
          },
          {
            code: "08",
            description: "PT1/4"
          },
          {
            code: "10",
            description: "PT3/8"
          },
          {
            code: "15",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "4SA\u7CFB\u5217\u6C23\u63A7\u95A5\u4E94\u53E3\u4E8C\u4F4D_\u4E94\u53E3\u4E09\u4F4D202602240320587106.pdf (\u51714\u9801)"
  },
  {
    id: "6sa",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "6SA\u7CFB\u5217",
    name: "6SA\u7CFB\u5217 \u6C23\u63A7\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D, \u5C0D\u61C96SV\u7CFB\u5217\u96FB\u63A7\u95A5\u7D50\u69CB)",
    orderCodeFormat: "6SA {seriesCode}{controlType} {port} {thread}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "05",
            description: "05: 0500\u7CFB\u5217"
          },
          {
            code: "1",
            description: "1: 100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          },
          {
            code: "4",
            description: "4: 400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5(0500\u7CFB\u5217)"
          },
          {
            code: "06",
            description: "PT1/8(100\u7CFB\u5217)"
          },
          {
            code: "08",
            description: "PT1/4(200\u7CFB\u5217)"
          },
          {
            code: "10",
            description: "PT3/8(300\u7CFB\u5217)"
          },
          {
            code: "15",
            description: "PT1/2(400\u7CFB\u5217)"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "6SA\u7CFB\u5217\u6C23\u63A7\u95A5\u4E94\u53E3\u4E8C\u4F4D_\u4E94\u53E3\u4E09\u4F4D202512110941149896.pdf (\u51714\u9801)"
  },
  {
    id: "7sa",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "7SA\u7CFB\u5217",
    name: "7SA\u7CFB\u5217 \u6C23\u63A7\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D, \u5C0D\u61C97SV\u7CFB\u5217\u96FB\u63A7\u95A5\u7D50\u69CB, \u87BA\u7D0B/\u5FEB\u63D2\u63A5\u7BA1\u53EF\u9078)",
    orderCodeFormat: "7SA {seriesCode}{controlType} {portConnType} {port} {thread}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "05",
            description: "05: 0500\u7CFB\u5217"
          },
          {
            code: "1",
            description: "1: 100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.5port_2or3position"
      },
      {
        id: "portConnType",
        name: "\u63A5\u7BA1\u578B\u5F0F",
        optionsRef: "portConnectionTypeOptions.threadOrQuick"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91(\u87BA\u7D0B)/\u7BA1\u63A5\u53E3\u5F91(\u5FEB\u63D2)",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "04",
            description: "\u03A64mm(\u5FEB\u63D2)"
          },
          {
            code: "06",
            description: "PT1/8 \u6216 \u03A66mm(\u5FEB\u63D2)"
          },
          {
            code: "08",
            description: "PT1/4 \u6216 \u03A68mm(\u5FEB\u63D2)"
          },
          {
            code: "10",
            description: "PT3/8 \u6216 \u03A610mm(\u5FEB\u63D2)"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "7SA\u7CFB\u5217\u6C23\u63A7\u95A5\u4E94\u53E3\u4E8C\u4F4D_\u4E94\u53E3\u4E09\u4F4D202512150946419976.pdf (\u51714\u9801)"
  },
  {
    id: "4sta",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "4STA\u7CFB\u5217",
    name: "4STA\u7CFB\u5217 \u6C23\u63A7\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u5C0D\u61C94STV\u7CFB\u5217\u96FB\u63A7\u95A5\u7D50\u69CB)",
    orderCodeFormat: "4STA {seriesCode}{controlType} {port} {initialState} {thread}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "1: 100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.3port_2position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: "PT1/8"
          },
          {
            code: "08",
            description: "PT1/4"
          },
          {
            code: "10",
            description: "PT3/8"
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        options: [
          {
            code: "NC",
            description: "NC: \u5E38\u9589\u578B"
          },
          {
            code: "NO",
            description: "NO: \u5E38\u958B\u578B(\u96D9\u6C23\u5C0E\u7121\u521D\u59CB\u72C0\u614B\u53EF\u9078)"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "4STA\u7CFB\u5217\u6C23\u63A7\u95A5\u4E09\u53E3\u4E8C\u4F4D202602240321205236.pdf (\u51713\u9801)"
  },
  {
    id: "6sta",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "6STA\u7CFB\u5217",
    name: "6STA\u7CFB\u5217 \u6C23\u63A7\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u5C0D\u61C96STV\u7CFB\u5217\u96FB\u63A7\u95A5\u7D50\u69CB)",
    orderCodeFormat: "6STA {seriesCode}{controlType} {port} {initialState} {thread}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "05",
            description: "05: 0500\u7CFB\u5217"
          },
          {
            code: "1",
            description: "1: 100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        optionsRef: "controlTypeOptions.3port_2position"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: "PT1/8"
          },
          {
            code: "08",
            description: "PT1/4"
          },
          {
            code: "10",
            description: "PT3/8"
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        options: [
          {
            code: "NC",
            description: "NC: \u5E38\u9589\u578B"
          },
          {
            code: "NO",
            description: "NO: \u5E38\u958B\u578B(\u96D9\u6C23\u5C0E\u7121\u521D\u59CB\u72C0\u614B\u53EF\u9078)"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    workingPressureRange: "0.15~0.8MPa(21~114psi)",
    sourceFile: "6STA\u7CFB\u5217\u6C23\u63A7\u95A5\u4E09\u53E3\u4E8C\u4F4D202512110940087246.pdf (\u51714\u9801)"
  },
  {
    id: "hsv",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "HSV\u7CFB\u5217",
    name: "HSV\u7CFB\u5217 \u624B\u6ED1\u95A5 (\u624B\u52D5\u6ED1\u52D5\u64CD\u4F5C\u5F0F)",
    orderCodeFormat: "HSV {controlType} {port} {thread}",
    categories: [
      {
        id: "controlType",
        name: "\u4F4D\u7F6E\u6578/\u64CD\u4F5C\u65B9\u5F0F",
        options: [
          {
            code: "20",
            description: "20: \u4E8C\u4F4D\u7F6E\u624B\u6ED1\u95A5"
          },
          {
            code: "30C",
            description: "30C: \u4E09\u4F4D\u7F6E\u624B\u6ED1\u95A5(\u4E2D\u5C01\u9589\u578B)"
          },
          {
            code: "30E",
            description: "30E: \u4E09\u4F4D\u7F6E\u624B\u6ED1\u95A5(\u4E2D\u6392\u6C23\u578B)"
          }
        ],
        note: "\u6B64\u70BA\u4F9D\u578B\u9304\u5716\u793A\u521D\u6B65\u5224\u8B80\u4E4B\u63A7\u5236\u65B9\u5F0F\u4EE3\u865F,\u5BE6\u969B\u4EE3\u865F\u8ACB\u4EE5\u578B\u9304P1-3\u70BA\u6E96"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    workingPressureRange: "0~0.8MPa(0~114psi)",
    note: "\u624B\u52D5\u6ED1\u52D5\u95A5,\u7121\u9700\u96FB\u6E90\u6216\u6C23\u6E90\u5F15\u5C0E,\u9069\u5408\u624B\u52D5\u63A7\u5236\u5834\u5408\u3002\u8A02\u8CFC\u78BC\u4EE3\u865F\u70BA\u521D\u6B65\u6574\u7406,\u5EFA\u8B70\u4E0B\u55AE\u524D\u6838\u5C0D\u539F\u59CB\u578B\u9304\u3002",
    sourceFile: "HSV\u7CFB\u5217\u624B\u6ED1\u95A5202303011047200906.pdf (\u51713\u9801)"
  },
  {
    id: "4h",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "4H\u7CFB\u5217",
    name: "4H\u7CFB\u5217 \u624B\u52D5\u95A5 (\u624B\u67C4\u6273\u52D5\u64CD\u4F5C\u5F0F, \u4E94\u53E3\u4E8C\u4F4D/\u4E09\u53E3\u4E8C\u4F4D)",
    orderCodeFormat: "4H {seriesCode}{controlType} {port} {handleType} {thread}",
    categories: [
      {
        id: "seriesCode",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "1: 100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u4F4D\u7F6E\u6578",
        options: [
          {
            code: "10",
            description: "10: \u4E8C\u4F4D\u7F6E(\u81EA\u52D5\u56DE\u4F4D\u578B)"
          },
          {
            code: "20",
            description: "20: \u4E8C\u4F4D\u7F6E(\u5B9A\u4F4D\u578B)"
          }
        ],
        note: "\u521D\u6B65\u5224\u8B80,\u5EFA\u8B70\u6838\u5C0D\u578B\u9304"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "handleType",
        name: "\u624B\u67C4\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u6273\u52D5\u5F0F(\u5F48\u7C27\u81EA\u5FA9\u4F4D)"
          },
          {
            code: "D",
            description: "D: \u6273\u52D5\u5F0F(\u5B9A\u4F4D\u5361\u56FA\u578B)"
          }
        ],
        note: "\u521D\u6B65\u5224\u8B80,\u5EFA\u8B70\u6838\u5C0D\u578B\u9304"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    workingPressureRange: "0~0.8MPa(0~114psi)",
    note: "\u624B\u67C4\u64CD\u4F5C,\u7121\u9700\u96FB\u6E90\u3002\u8A02\u8CFC\u78BC\u4EE3\u865F\u70BA\u521D\u6B65\u6574\u7406,\u5EFA\u8B70\u4E0B\u55AE\u524D\u6838\u5C0D\u539F\u59CB\u578B\u9304\u3002",
    sourceFile: "4H\u7CFB\u5217\u624B\u52D5\u95A5202303011045197796.pdf (\u51714\u9801)"
  },
  {
    id: "3f-3fm",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "3F/3FM\u7CFB\u5217",
    name: "3F/3FM\u7CFB\u5217 \u8173\u8E0F\u95A5 (\u4E09\u53E3\u4E8C\u4F4D, \u8173\u8E0F\u64CD\u4F5C\u5F0F)",
    orderCodeFormat: "{code} {port} {initialState} {thread}",
    categories: [
      {
        id: "code",
        name: "\u578B\u5F0F\u4EE3\u865F",
        options: [
          {
            code: "3F",
            description: "3F: \u9644\u4FDD\u8B77\u84CB\u578B"
          },
          {
            code: "3FM",
            description: "3FM: \u7121\u4FDD\u8B77\u84CB\u578B"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        optionsRef: "initialStateOptions.ncNo"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    workingPressureRange: "0~0.8MPa(0~114psi)",
    note: "\u8173\u8E0F\u64CD\u4F5C,\u7121\u9700\u96FB\u6E90,\u9069\u5408\u96D9\u624B\u4F5C\u696D\u6642\u7684\u8173\u8E0F\u63A7\u5236\u5834\u5408\u3002\u8A02\u8CFC\u78BC\u4EE3\u865F\u70BA\u521D\u6B65\u6574\u7406,\u5EFA\u8B70\u4E0B\u55AE\u524D\u6838\u5C0D\u539F\u59CB\u578B\u9304\u3002",
    sourceFile: "3F3FM\u7CFB\u5217\u8173\u8E0F\u95A5_\u4E09\u53E3\u4E8C\u4F4D_202303011052072856.pdf (\u51716\u9801)"
  },
  {
    id: "m3",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "M3\u7CFB\u5217",
    name: "M3\u7CFB\u5217 \u6A5F\u68B0\u95A5 (\u6EFE\u8F2A\u6416\u81C2\u5F0F/\u9802\u687F\u5F0F, \u9650\u4F4D\u89F8\u767C\u7528\u9014)",
    orderCodeFormat: "M3 {actuatorType} {port} {initialState} {thread}",
    categories: [
      {
        id: "actuatorType",
        name: "\u89F8\u767C\u6A5F\u69CB\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u6EFE\u8F2A\u6416\u81C2\u578B(\u96D9\u5411\u89F8\u767C)"
          },
          {
            code: "H",
            description: "H: \u55AE\u5411\u6EFE\u8F2A\u6416\u81C2\u578B"
          },
          {
            code: "P",
            description: "P: \u9802\u687F\u578B"
          },
          {
            code: "L",
            description: "L: \u9577\u884C\u7A0B\u6EFE\u8F2A\u578B"
          }
        ],
        note: "\u521D\u6B65\u5224\u8B80,\u5EFA\u8B70\u6838\u5C0D\u578B\u9304P1-2\u78BA\u8A8D\u5BE6\u969B\u578B\u5F0F\u8207\u4EE3\u865F"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        optionsRef: "initialStateOptions.ncNo"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    workingPressureRange: "0~0.8MPa(0~114psi)",
    note: "\u6A5F\u68B0\u5F0F\u9650\u4F4D\u95A5,\u7531\u6A5F\u69CB(\u51F8\u8F2A\u3001\u884C\u7A0B\u6A94\u584A\u7B49)\u78B0\u89F8\u6EFE\u8F2A\u6216\u9802\u687F\u89F8\u767C,\u7121\u9700\u96FB\u6E90\u6216\u6C23\u6E90\u5F15\u5C0E\u3002\u8A02\u8CFC\u78BC\u4EE3\u865F\u70BA\u521D\u6B65\u6574\u7406,\u5EFA\u8B70\u4E0B\u55AE\u524D\u6838\u5C0D\u539F\u59CB\u578B\u9304\u3002",
    sourceFile: "M3\u7CFB\u5217\u6A5F\u68B0\u95A5202303011048141406.pdf (\u51719\u9801)"
  },
  {
    id: "cm3",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "CM3\u7CFB\u5217",
    name: "CM3\u7CFB\u5217 \u6A5F\u68B0\u95A5 (\u5C0F\u578B\u5316\u6EFE\u8F2A\u6416\u81C2\u5F0F/\u9802\u687F\u5F0F, \u9650\u4F4D\u89F8\u767C\u7528\u9014)",
    orderCodeFormat: "CM3 {actuatorType} {port} {initialState} {thread}",
    categories: [
      {
        id: "actuatorType",
        name: "\u89F8\u767C\u6A5F\u69CB\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u6EFE\u8F2A\u6416\u81C2\u578B(\u96D9\u5411\u89F8\u767C)"
          },
          {
            code: "H",
            description: "H: \u55AE\u5411\u6EFE\u8F2A\u6416\u81C2\u578B"
          },
          {
            code: "P",
            description: "P: \u9802\u687F\u578B"
          }
        ],
        note: "\u521D\u6B65\u5224\u8B80,\u5EFA\u8B70\u6838\u5C0D\u578B\u9304P1-2\u78BA\u8A8D\u5BE6\u969B\u578B\u5F0F\u8207\u4EE3\u865F"
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "initialState",
        name: "\u521D\u59CB\u72C0\u614B",
        optionsRef: "initialStateOptions.ncNo"
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        optionsRef: "threadOptions.standardGT"
      }
    ],
    workingPressureRange: "0~0.8MPa(0~114psi)",
    note: "M3\u7CFB\u5217\u7684\u5C0F\u578B\u5316\u7248\u672C,\u9AD4\u7A4D\u66F4\u7DCA\u6E4A\u3002\u8A02\u8CFC\u78BC\u4EE3\u865F\u70BA\u521D\u6B65\u6574\u7406,\u5EFA\u8B70\u4E0B\u55AE\u524D\u6838\u5C0D\u539F\u59CB\u578B\u9304\u3002",
    sourceFile: "CM3\u7CFB\u5217\u6A5F\u68B0\u95A5202303011050148176.pdf (\u51717\u9801)"
  },
  {
    id: "4stv_base",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "4STV\u7CFB\u5217\u5E95\u5EA7",
    code: "4STV",
    name: "4STV\u7CFB\u5217\u7528\u5E95\u5EA7",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "4STV100M",
            description: "4STV100M: 4STV100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "4STV200M",
            description: "4STV200M: 4STV200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "4STV300M",
            description: "4STV300M: 4STV300\u7CFB\u5217\u5E95\u5EA7"
          }
        ]
      },
      {
        id: "stations",
        name: "\u9023\u6578\u4EE3\u865F",
        options: [
          {
            code: "1F",
            description: "1F: 1\u9023"
          },
          {
            code: "2F",
            description: "2F: 2\u9023"
          },
          {
            code: "3F",
            description: "3F: 3\u9023"
          },
          {
            code: "4F",
            description: "4F: 4\u9023"
          },
          {
            code: "5F",
            description: "5F: 5\u9023"
          },
          {
            code: "6F",
            description: "6F: 6\u9023"
          },
          {
            code: "7F",
            description: "7F: 7\u9023"
          },
          {
            code: "8F",
            description: "8F: 8\u9023"
          },
          {
            code: "9F",
            description: "9F: 9\u9023"
          },
          {
            code: "10F",
            description: "10F: 10\u9023"
          },
          {
            code: "20F",
            description: "20F: 20\u9023"
          },
          {
            code: "30F",
            description: "30F: 30\u9023"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259"
          },
          {
            code: "G",
            description: "G: G\u7259"
          },
          {
            code: "T",
            description: "T: NPT\u7259"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {stations} {thread}"
  },
  {
    id: "6stv_base",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "6STV\u7CFB\u5217\u5E95\u5EA7",
    code: "6STV",
    name: "6STV\u7CFB\u5217\u7528\u5E95\u5EA7",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "6STV0500M",
            description: "6STV0500M: 6STV0500\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6STV100M",
            description: "6STV100M: 6STV100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6STV200M",
            description: "6STV200M: 6STV200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6STV300M",
            description: "6STV300M: 6STV300\u7CFB\u5217\u5E95\u5EA7"
          }
        ]
      },
      {
        id: "stations",
        name: "\u9023\u6578\u4EE3\u865F",
        options: [
          {
            code: "1F",
            description: "1F: 1\u9023"
          },
          {
            code: "2F",
            description: "2F: 2\u9023"
          },
          {
            code: "3F",
            description: "3F: 3\u9023"
          },
          {
            code: "4F",
            description: "4F: 4\u9023"
          },
          {
            code: "5F",
            description: "5F: 5\u9023"
          },
          {
            code: "6F",
            description: "6F: 6\u9023"
          },
          {
            code: "7F",
            description: "7F: 7\u9023"
          },
          {
            code: "8F",
            description: "8F: 8\u9023"
          },
          {
            code: "9F",
            description: "9F: 9\u9023"
          },
          {
            code: "10F",
            description: "10F: 10\u9023"
          },
          {
            code: "20F",
            description: "20F: 20\u9023"
          },
          {
            code: "30F",
            description: "30F: 30\u9023"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259"
          },
          {
            code: "G",
            description: "G: G\u7259"
          },
          {
            code: "T",
            description: "T: NPT\u7259"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {stations} {thread}"
  },
  {
    id: "7sv_base",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "7SV\u7CFB\u5217\u5E95\u5EA7",
    code: "7SV",
    name: "7SV\u7CFB\u5217\u7528\u5E95\u5EA7",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "7SV0500M",
            description: "7SV0500M: 7SV0500\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "7SV100M",
            description: "7SV100M: 7SV100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "7SV200M",
            description: "7SV200M: 7SV200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "7SV300M",
            description: "7SV300M: 7SV300\u7CFB\u5217\u5E95\u5EA7"
          }
        ]
      },
      {
        id: "stations",
        name: "\u9023\u6578\u4EE3\u865F",
        options: [
          {
            code: "1F",
            description: "1F: 1\u9023"
          },
          {
            code: "2F",
            description: "2F: 2\u9023"
          },
          {
            code: "3F",
            description: "3F: 3\u9023"
          },
          {
            code: "4F",
            description: "4F: 4\u9023"
          },
          {
            code: "5F",
            description: "5F: 5\u9023"
          },
          {
            code: "6F",
            description: "6F: 6\u9023"
          },
          {
            code: "7F",
            description: "7F: 7\u9023"
          },
          {
            code: "8F",
            description: "8F: 8\u9023"
          },
          {
            code: "9F",
            description: "9F: 9\u9023"
          },
          {
            code: "10F",
            description: "10F: 10\u9023"
          },
          {
            code: "20F",
            description: "20F: 20\u9023"
          },
          {
            code: "30F",
            description: "30F: 30\u9023"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259"
          },
          {
            code: "G",
            description: "G: G\u7259"
          },
          {
            code: "T",
            description: "T: NPT\u7259"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {stations} {thread}"
  },
  {
    id: "6sv_base",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "6SV\u7CFB\u5217\u5E95\u5EA7",
    code: "6SV",
    name: "6SV\u7CFB\u5217\u7528\u5E95\u5EA7",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "6SV0500M",
            description: "6SV0500M: 6SV0500\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6SV100M",
            description: "6SV100M: 6SV100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6SV200M",
            description: "6SV200M: 6SV200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6SV300M",
            description: "6SV300M: 6SV300\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6SV400M",
            description: "6SV400M: 6SV400\u7CFB\u5217\u5E95\u5EA7"
          }
        ]
      },
      {
        id: "stations",
        name: "\u9023\u6578\u4EE3\u865F",
        options: [
          {
            code: "1F",
            description: "1F: 1\u9023"
          },
          {
            code: "2F",
            description: "2F: 2\u9023"
          },
          {
            code: "3F",
            description: "3F: 3\u9023"
          },
          {
            code: "4F",
            description: "4F: 4\u9023"
          },
          {
            code: "5F",
            description: "5F: 5\u9023"
          },
          {
            code: "6F",
            description: "6F: 6\u9023"
          },
          {
            code: "7F",
            description: "7F: 7\u9023"
          },
          {
            code: "8F",
            description: "8F: 8\u9023"
          },
          {
            code: "9F",
            description: "9F: 9\u9023"
          },
          {
            code: "10F",
            description: "10F: 10\u9023"
          },
          {
            code: "20F",
            description: "20F: 20\u9023"
          },
          {
            code: "30F",
            description: "30F: 30\u9023"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259"
          },
          {
            code: "G",
            description: "G: G\u7259"
          },
          {
            code: "T",
            description: "T: NPT\u7259"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {stations} {thread}"
  },
  {
    id: "blanking_plates",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "\u5E95\u5EA7\u76F2\u677F\u7D44\u4EF6",
    code: "P-",
    name: "\u5E95\u5EA7\u76F2\u677F\u7D44\u4EF6",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "4SV100M",
            description: "4SV100M: 4SV100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "4SV200M",
            description: "4SV200M: 4SV200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "4SV300M",
            description: "4SV300M: 4SV300\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "4SV400M",
            description: "4SV400M: 4SV400\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "4STV100M",
            description: "4STV100M: 4STV100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "4STV200M",
            description: "4STV200M: 4STV200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "4STV300M",
            description: "4STV300M: 4STV300\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6STV0500M",
            description: "6STV0500M: 6STV0500\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6STV100M",
            description: "6STV100M: 6STV100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6STV200M",
            description: "6STV200M: 6STV200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6STV300M",
            description: "6STV300M: 6STV300\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "7SV0500M",
            description: "7SV0500M: 7SV0500\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "7SV100M",
            description: "7SV100M: 7SV100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "7SV200M",
            description: "7SV200M: 7SV200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "7SV300M",
            description: "7SV300M: 7SV300\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6SV0500M",
            description: "6SV0500M: 6SV0500\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6SV100M",
            description: "6SV100M: 6SV100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6SV200M",
            description: "6SV200M: 6SV200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6SV300M",
            description: "6SV300M: 6SV300\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "6SV400M",
            description: "6SV400M: 6SV400\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "CPV10M",
            description: "CPV10M: CPV10\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "CPV15S",
            description: "CPV15S: CPV15S\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "3V2M",
            description: "3V2M: 3V2\u7CFB\u5217\u5E95\u5EA7"
          }
        ]
      }
    ],
    orderCodeFormat: "P-{code}-R2",
    note: '\u898F\u683C\u4EE3\u865F\u5217\u8868\u4E2D\u7684\u300E4SV100M/200M/300M/400M\u300F\u70BA\u539F\u59CB\u8CC7\u6599\u6A19\u793A,\u8207\u672C\u6A94\u6848\u51674V100~400\u7CFB\u5217(orderCodeFormat\u4EE5"4V ..."\u958B\u982D)\u5BE6\u70BA\u540C\u4E00\u7522\u54C1\u7DDA,\u5E95\u5EA7\u4EE3\u865F\u5EFA\u8B70\u4E0B\u55AE\u524D\u518D\u6838\u5C0D\u6B63\u78BA\u524D\u7DB4(4V\u62164SV)\u3002'
  },
  {
    id: "4m",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5",
    group: "4M\u7CFB\u5217",
    code: "4M",
    name: "4M\u7CFB\u5217 NAMUR\u898F\u683C (\u4E94\u53E3\u4E8C\u4F4D)",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "1: 100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "control",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "10: \u96D9\u4F4D\u7F6E\u55AE\u96FB\u63A7"
          },
          {
            code: "20",
            description: "20: \u96D9\u4F4D\u7F6E\u96D9\u96FB\u63A7"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5: M5"
          },
          {
            code: "06",
            description: '06: 1/8"'
          },
          {
            code: "08",
            description: '08: 1/4"'
          },
          {
            code: "10",
            description: '10: 3/8"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "A: AC220V"
          },
          {
            code: "B",
            description: "B: DC24V"
          },
          {
            code: "C",
            description: "C: AC110V"
          },
          {
            code: "E",
            description: "E: AC24V"
          },
          {
            code: "F",
            description: "F: DC12V"
          }
        ]
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "I: \u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC (M5)"
          },
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259"
          },
          {
            code: "G",
            description: "G: G\u7259"
          },
          {
            code: "T",
            description: "T: NPT\u7259"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {series} {control} {port} {voltage} {terminal} {thread}"
  },
  {
    id: "3v-manifold",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "3V\u7CFB\u5217\u5E95\u5EA7",
    code: "",
    name: "3V100~300\u7CFB\u5217\u5E95\u5EA7",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "3V100M",
            description: "3V100M: 100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "3V200M",
            description: "3V200M: 200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "3V300M",
            description: "3V300M: 300\u7CFB\u5217\u5E95\u5EA7"
          }
        ]
      },
      {
        id: "stations",
        name: "\u9023\u6578\u4EE3\u865F",
        options: [
          {
            code: "1F",
            description: "1F: 1\u9023"
          },
          {
            code: "2F",
            description: "2F: 2\u9023"
          },
          {
            code: "3F",
            description: "3F: 3\u9023"
          },
          {
            code: "4F",
            description: "4F: 4\u9023"
          },
          {
            code: "5F",
            description: "5F: 5\u9023"
          },
          {
            code: "6F",
            description: "6F: 6\u9023"
          },
          {
            code: "7F",
            description: "7F: 7\u9023"
          },
          {
            code: "8F",
            description: "8F: 8\u9023"
          },
          {
            code: "9F",
            description: "9F: 9\u9023"
          },
          {
            code: "10F",
            description: "10F: 10\u9023"
          },
          {
            code: "11F",
            description: "11F: 11\u9023"
          },
          {
            code: "12F",
            description: "12F: 12\u9023"
          },
          {
            code: "13F",
            description: "13F: 13\u9023"
          },
          {
            code: "14F",
            description: "14F: 14\u9023"
          },
          {
            code: "15F",
            description: "15F: 15\u9023"
          },
          {
            code: "16F",
            description: "16F: 16\u9023"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259"
          },
          {
            code: "G",
            description: "G: G\u7259"
          },
          {
            code: "T",
            description: "T: NPT\u7259"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {stations} {thread}"
  },
  {
    id: "3v-blanking",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "3V\u7CFB\u5217\u5E95\u5EA7\u76F2\u677F",
    code: "P-",
    name: "3V100~300\u7CFB\u5217\u5E95\u5EA7\u76F2\u677F",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "3V100M",
            description: "3V100M: 100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "3V200M",
            description: "3V200M: 200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "3V300M",
            description: "3V300M: 300\u7CFB\u5217\u5E95\u5EA7"
          }
        ]
      }
    ],
    orderCodeFormat: "{code}{series} - R2"
  },
  {
    id: "4v-manifold",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "4V\u7CFB\u5217\u5E95\u5EA7",
    code: "",
    name: "4V100~400\u7CFB\u5217\u5E95\u5EA7",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "100M",
            description: "100M: 100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "200M",
            description: "200M: 200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "300M",
            description: "300M: 300\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "400M",
            description: "400M: 400\u7CFB\u5217\u5E95\u5EA7"
          }
        ]
      },
      {
        id: "stations",
        name: "\u9023\u6578\u4EE3\u865F",
        options: [
          {
            code: "1F",
            description: "1F: 1\u9023"
          },
          {
            code: "2F",
            description: "2F: 2\u9023"
          },
          {
            code: "3F",
            description: "3F: 3\u9023"
          },
          {
            code: "4F",
            description: "4F: 4\u9023"
          },
          {
            code: "5F",
            description: "5F: 5\u9023"
          },
          {
            code: "6F",
            description: "6F: 6\u9023"
          },
          {
            code: "7F",
            description: "7F: 7\u9023"
          },
          {
            code: "8F",
            description: "8F: 8\u9023"
          },
          {
            code: "9F",
            description: "9F: 9\u9023"
          },
          {
            code: "10F",
            description: "10F: 10\u9023"
          },
          {
            code: "11F",
            description: "11F: 11\u9023"
          },
          {
            code: "12F",
            description: "12F: 12\u9023"
          },
          {
            code: "13F",
            description: "13F: 13\u9023"
          },
          {
            code: "14F",
            description: "14F: 14\u9023"
          },
          {
            code: "15F",
            description: "15F: 15\u9023"
          },
          {
            code: "16F",
            description: "16F: 16\u9023"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259"
          },
          {
            code: "G",
            description: "G: G\u7259"
          },
          {
            code: "T",
            description: "T: NPT\u7259"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {stations} {thread}"
  },
  {
    id: "4v-blanking",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "4V\u7CFB\u5217\u5E95\u5EA7\u76F2\u677F",
    code: "P-",
    name: "4V100~400\u7CFB\u5217\u5E95\u5EA7\u76F2\u677F",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "100M",
            description: "100M: 100\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "200M",
            description: "200M: 200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "300M",
            description: "300M: 300\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "400M",
            description: "400M: 400\u7CFB\u5217\u5E95\u5EA7"
          }
        ]
      }
    ],
    orderCodeFormat: "{code}{series} - R2"
  },
  {
    id: "5v",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5",
    group: "5V\u7CFB\u5217",
    code: "5V",
    name: "5V\u7CFB\u5217\u96FB\u78C1\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "1: 100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          },
          {
            code: "4",
            description: "4: 400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "control",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "10: \u96D9\u4F4D\u7F6E\u55AE\u96FB\u63A7"
          },
          {
            code: "20",
            description: "20: \u96D9\u4F4D\u7F6E\u96D9\u96FB\u63A7"
          },
          {
            code: "30C",
            description: "30C: \u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u5C01\u9589\u578B"
          },
          {
            code: "30E",
            description: "30E: \u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u6392\u6C23\u578B"
          },
          {
            code: "30P",
            description: "30P: \u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u58D3\u529B\u578B"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5: M5"
          },
          {
            code: "06",
            description: '06: 1/8"'
          },
          {
            code: "08",
            description: '08: 1/4"'
          },
          {
            code: "10",
            description: '10: 3/8"'
          },
          {
            code: "15",
            description: '15: 1/2"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "A: AC220V"
          },
          {
            code: "B",
            description: "B: DC24V"
          },
          {
            code: "C",
            description: "C: AC110V"
          },
          {
            code: "E",
            description: "E: AC24V"
          },
          {
            code: "F",
            description: "F: DC12V"
          }
        ]
      },
      {
        id: "length",
        name: "\u7AEF\u5B50\u7DDA\u9577",
        options: [
          {
            code: "050",
            description: "050: 0.5m"
          },
          {
            code: "200",
            description: "200: 2.0m"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259\u6216\u7121\u6B64\u4EE3\u78BC(M5)"
          }
        ]
      }
    ],
    orderCodeFormat: "{code}{series}{control} {port} {voltage} {length} {thread}"
  },
  {
    id: "esv-valve",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5",
    group: "ESV\u7CFB\u5217",
    code: "ESV",
    name: "ISO\u6A19\u6E96\u96FB\u78C1\u95A5 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          },
          {
            code: "4",
            description: "4: 400\u7CFB\u5217"
          },
          {
            code: "6",
            description: "6: 600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "control",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "10: \u96D9\u4F4D\u7F6E\u55AE\u96FB\u63A7"
          },
          {
            code: "20",
            description: "20: \u96D9\u4F4D\u7F6E\u96D9\u96FB\u63A7"
          },
          {
            code: "30C",
            description: "30C: \u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u5C01\u9589\u578B"
          },
          {
            code: "30E",
            description: "30E: \u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u6392\u6C23\u578B"
          },
          {
            code: "30P",
            description: "30P: \u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u58D3\u529B\u578B"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "A: AC220V"
          },
          {
            code: "B",
            description: "B: DC24V"
          },
          {
            code: "C",
            description: "C: AC110V"
          },
          {
            code: "E",
            description: "E: AC24V"
          },
          {
            code: "F",
            description: "F: DC12V"
          }
        ]
      },
      {
        id: "terminal",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "I: \u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "pilot",
        name: "\u5F15\u5C0E\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u5167\u90E8\u5F15\u5C0E\u5F0F"
          },
          {
            code: "W",
            description: "W: \u5916\u90E8\u5F15\u5C0E\u5F0F"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {series} {control} {voltage} {terminal} {pilot}"
  },
  {
    id: "esv-base",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "ESV\u7CFB\u5217\u5E95\u5EA7\u8207\u7AEF\u677F",
    code: "ESV",
    name: "ISO\u6A19\u6E96\u96FB\u78C1\u95A5 \u5E95\u5EA7\u8207\u7AEF\u677F\u7D44\u4EF6",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "20",
            description: "20: 200\u7CFB\u5217"
          },
          {
            code: "30",
            description: "30: 300\u7CFB\u5217"
          },
          {
            code: "40",
            description: "40: 400\u7CFB\u5217"
          },
          {
            code: "60",
            description: "60: 600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u865F",
        options: [
          {
            code: "1M",
            description: "1M: \u55AE\u9AD4\u578B\u5E95\u5EA7"
          },
          {
            code: "2M",
            description: "2M: \u591A\u806F\u578B\u5E95\u5EA7"
          },
          {
            code: "3M",
            description: "3M: \u7AEF\u677F\u7D44\u4EF6"
          },
          {
            code: "4M",
            description: "4M: \u591A\u806F\u578B\u5E95\u5EA7\u8F49\u63A5\u584A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259"
          },
          {
            code: "G",
            description: "G: G\u7259"
          }
        ]
      },
      {
        id: "pilot",
        name: "\u5916\u90E8\u5F15\u5C0E\u6C23\u53E3\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u7368\u7ACB\u5916\u90E8\u5F15\u5C0E\u6C23\u53E3"
          },
          {
            code: "W",
            description: "W: \u96C6\u4E2D\u5916\u90E8\u5F15\u5C0E\u6C23\u53E3"
          }
        ]
      },
      {
        id: "port_pos",
        name: "\u6C23\u53E3\u65B9\u4F4D\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u5074\u9762\u5DE5\u4F5C\u6C23\u53E3 / \u5DE6\u5074\u5DE5\u4F5C\u6C23\u53E3"
          },
          {
            code: "B",
            description: "B: \u5E95\u9762\u5DE5\u4F5C\u6C23\u53E3"
          },
          {
            code: "R",
            description: "R: \u53F3\u5074\u5DE5\u4F5C\u6C23\u53E3"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {series} {type} {thread} {pilot} {port_pos}"
  },
  {
    id: "esv-blanking",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "ESV\u7CFB\u5217\u5E95\u5EA7\u76F2\u677F",
    code: "P-",
    name: "ISO\u6A19\u6E96\u96FB\u78C1\u95A5 \u9644\u4EF6\u8A02\u8CFC\u78BC (\u76F2\u677F)",
    categories: [
      {
        id: "series",
        name: "\u9069\u7528\u7522\u54C1\u4EE3\u865F",
        options: [
          {
            code: "ESV200M",
            description: "ESV200M: 200\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "ESV300M",
            description: "ESV300M: 300\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "ESV400M",
            description: "ESV400M: 400\u7CFB\u5217\u5E95\u5EA7"
          },
          {
            code: "ESV600M",
            description: "ESV600M: 600\u7CFB\u5217\u5E95\u5EA7"
          }
        ]
      }
    ],
    orderCodeFormat: "{code}{series} - R2"
  },
  {
    id: "coil-cd",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "\u666E\u901A\u7DDA\u5708",
    code: "",
    name: "\u666E\u901A\u7DDA\u5708 (080, 092\u7CFB\u5217)",
    categories: [
      {
        id: "code",
        name: "\u7DDA\u5708\u985E\u5225",
        options: [
          {
            code: "CD",
            description: "CD: DIN\u63D2\u5EA7\u5F0F\u7DDA\u5708"
          },
          {
            code: "CL",
            description: "CL: \u51FA\u7DDA\u5F0F\u7DDA\u5708"
          }
        ]
      },
      {
        id: "diameter",
        name: "\u7DDA\u5708\u5167\u5F91",
        options: [
          {
            code: "A080",
            description: "A080: \u5167\u5F91 \u03A68.0mm"
          },
          {
            code: "A092",
            description: "A092: \u5167\u5F91 \u03A69.0mm"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "A: AC220V"
          },
          {
            code: "B",
            description: "B: DC24V"
          },
          {
            code: "C",
            description: "C: AC110V"
          },
          {
            code: "E",
            description: "E: AC24V"
          },
          {
            code: "F",
            description: "F: DC12V"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {diameter} {voltage}"
  },
  {
    id: "coil-cfb",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "\u9632\u7206\u7DDA\u5708",
    code: "CFB",
    name: "\u9632\u7206\u578B\u7DDA\u5708\u90E8\u54C1",
    categories: [
      {
        id: "diameter",
        name: "\u7DDA\u5708\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "092",
            description: "092: \u9069\u7528\u65BC\u9632\u7206\u95A5"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "A: AC220V"
          },
          {
            code: "B",
            description: "B: DC24V"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {diameter} {voltage}"
  },
  {
    id: "b03-valve",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5",
    group: "B03\u9632\u7206\u96FB\u78C1\u95A5",
    code: "B03-",
    name: "B03\u9632\u7206\u578B\u96FB\u78C1\u95A5",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "3V",
            description: "3V: \u4E09\u53E3\u4E8C\u4F4D\u96FB\u78C1\u95A5"
          },
          {
            code: "4V",
            description: "4V: \u4E94\u53E3\u4E8C\u4F4D\u4E94\u53E3\u4E09\u4F4D"
          },
          {
            code: "4M",
            description: "4M: \u4E94\u53E3\u4E8C\u4F4D(NAMUR\u898F\u683C)"
          }
        ]
      },
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "1: 100\u7CFB\u5217 (\u50C53V)"
          },
          {
            code: "2",
            description: "2: 200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3: 300\u7CFB\u5217"
          },
          {
            code: "4",
            description: "4: 400\u7CFB\u5217 (\u50C54V)"
          }
        ]
      },
      {
        id: "control",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "10: \u96D9\u4F4D\u7F6E\u55AE\u96FB\u63A7"
          },
          {
            code: "20",
            description: "20: \u96D9\u4F4D\u7F6E\u96D9\u96FB\u63A7"
          },
          {
            code: "30C",
            description: "30C: \u4E09\u4F4D\u7F6E\u4E2D\u5C01\u578B (\u50C54V)"
          },
          {
            code: "30E",
            description: "30E: \u4E09\u4F4D\u7F6E\u4E2D\u6392\u578B (\u50C54V)"
          },
          {
            code: "30P",
            description: "30P: \u4E09\u4F4D\u7F6E\u4E2D\u58D3\u578B (\u50C54V)"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5: M5"
          },
          {
            code: "06",
            description: '06: 1/8"'
          },
          {
            code: "08",
            description: '08: 1/4"'
          },
          {
            code: "10",
            description: '10: 3/8"'
          },
          {
            code: "15",
            description: '15: 1/2"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "A: AC220V"
          },
          {
            code: "B",
            description: "B: DC24V"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259 \u6216 \u7121\u6B64\u4EE3\u78BC"
          }
        ]
      }
    ],
    orderCodeFormat: "{code}{type} {series} {control} {port} {voltage} {thread}"
  },
  {
    id: "cable-dsub",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5\u5E95\u5EA7\u548C\u914D\u4EF6",
    group: "\u96C6\u6210\u95A5\u7D44\u914D\u5957\u7DDA\u7E9C",
    code: "F-DSUB",
    name: "F-DSUB\u7CFB\u5217\u914D\u5957\u7DDA\u7E9C",
    categories: [
      {
        id: "pins",
        name: "\u91DD\u6578\u4EE3\u865F",
        options: [
          {
            code: "15",
            description: "15: 15PIN"
          },
          {
            code: "25",
            description: "25: 25PIN"
          },
          {
            code: "37",
            description: "37: 37PIN"
          }
        ]
      },
      {
        id: "type",
        name: "\u7DDA\u7AEF\u9023\u63A5\u5668\u578B\u5F0F",
        options: [
          {
            code: "F",
            description: "F: \u5169\u7AEF\u70BA\u540C\u578B\u6BCD\u63A5\u982D"
          },
          {
            code: "M",
            description: "M: \u4E00\u7AEF\u516C\u63A5\u982D\u4E00\u7AEF\u6BCD\u63A5\u982D"
          },
          {
            code: "S",
            description: "S: \u4E00\u7AEF\u6BCD\u63A5\u982D\u4E00\u7AEF\u76F4\u63A5\u51FA\u7DDA"
          }
        ]
      },
      {
        id: "length",
        name: "\u7DDA\u9577",
        options: [
          {
            code: "150",
            description: "150: 1.5m (\u50C515PIN)"
          },
          {
            code: "200",
            description: "200: 2m"
          },
          {
            code: "300",
            description: "300: 3m"
          },
          {
            code: "500",
            description: "500: 5m"
          },
          {
            code: "800",
            description: "800: 8m"
          },
          {
            code: "1000",
            description: "1000: 10m"
          }
        ]
      }
    ],
    orderCodeFormat: "{code} {pins} {type} {length}"
  },
  {
    id: "6D-manifold",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "6DM/6D/6DW\u7CFB\u5217 \u96C6\u6210\u95A5\u7D44\u6D3E\u751F\u7522\u54C1",
    name: "6D/6DM/6DW\u7CFB\u5217 \u96C6\u6210\u95A5\u7D44 (\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    orderCodeFormat: "{seriesCode} {stations}-{port} {voltage} {singleCtrl} {doubleCtrl} {midClosed} {midExhaust} {midPressure} {commModule} {specialValve}",
    note: "\u6B64\u70BA\u8907\u5408\u5F0F\u96C6\u6210\u95A5\u7D44\u8A02\u8CFC\u78BC\u3002\u5305\u542B 6D\u7CFB\u5217(25pin D-SUB), 6DM\u7CFB\u5217(15pin D-SUB), 6DW\u7CFB\u5217(37pin D-SUB)\u3002",
    categories: [
      {
        id: "seriesCode",
        name: "\u2460\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "6D05H",
            description: "6D0500\u7CFB\u5217 \u5074\u51FA\u578B (25pin D-SUB)"
          },
          {
            code: "6D1H",
            description: "6D100\u7CFB\u5217 \u5074\u51FA\u578B (25pin D-SUB)"
          },
          {
            code: "6D2H",
            description: "6D200\u7CFB\u5217 \u5074\u51FA\u578B (25pin D-SUB)"
          },
          {
            code: "6DM05H",
            description: "6D0500\u7CFB\u5217 \u5074\u51FA\u578B (15pin D-SUB)"
          },
          {
            code: "6DM1H",
            description: "6D100\u7CFB\u5217 \u5074\u51FA\u578B (15pin D-SUB)"
          },
          {
            code: "6DM2H",
            description: "6D200\u7CFB\u5217 \u5074\u51FA\u578B (15pin D-SUB)"
          },
          {
            code: "6DW05H",
            description: "6D0500\u7CFB\u5217 \u5074\u51FA\u578B (37pin D-SUB)"
          },
          {
            code: "6DW1H",
            description: "6D100\u7CFB\u5217 \u5074\u51FA\u578B (37pin D-SUB)"
          },
          {
            code: "6DW2H",
            description: "6D200\u7CFB\u5217 \u5074\u51FA\u578B (37pin D-SUB)"
          }
        ]
      },
      {
        id: "stations",
        name: "\u2461\u7E3D\u9023\u6578\u4EE3\u865F",
        options: [
          {
            code: "3F",
            description: "3\u9023"
          },
          {
            code: "4F",
            description: "4\u9023"
          },
          {
            code: "5F",
            description: "5\u9023"
          },
          {
            code: "12F",
            description: "12\u9023"
          },
          {
            code: "21F",
            description: "21\u9023 (\u50C5\u7279\u5B9A\u578B\u865F\u652F\u63F4)"
          }
        ]
      },
      {
        id: "port",
        name: "\u2462\u63A5\u7BA1\u53E3\u5F91(A/B\u53E3)",
        options: [
          {
            code: "J04",
            description: "\u03A64\u5FEB\u63D2\u63A5\u982D\u63A5\u7BA1"
          },
          {
            code: "J06",
            description: "\u03A66\u5FEB\u63D2\u63A5\u982D\u63A5\u7BA1"
          },
          {
            code: "J08",
            description: "\u03A68\u5FEB\u63D2\u63A5\u982D\u63A5\u7BA1"
          },
          {
            code: "J10",
            description: "\u03A610\u5FEB\u63D2\u63A5\u982D\u63A5\u7BA1"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u2463\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "singleCtrl",
        name: "\u2464\u55AE\u63A7\u96FB\u78C1\u95A5\u6578",
        options: [
          {
            code: "",
            description: "\u7121"
          },
          {
            code: "S1",
            description: "1\u500B"
          },
          {
            code: "S2",
            description: "2\u500B"
          },
          {
            code: "S21",
            description: "21\u500B"
          }
        ]
      },
      {
        id: "doubleCtrl",
        name: "\u2465\u96D9\u63A7\u96FB\u78C1\u95A5\u6578",
        options: [
          {
            code: "",
            description: "\u7121"
          },
          {
            code: "D1",
            description: "1\u500B"
          },
          {
            code: "D2",
            description: "2\u500B"
          },
          {
            code: "D12",
            description: "12\u500B"
          }
        ]
      },
      {
        id: "midClosed",
        name: "\u2466\u4E09\u4F4D\u4E2D\u5C01\u5F0F\u96FB\u78C1\u95A5\u6578",
        options: [
          {
            code: "",
            description: "\u7121"
          },
          {
            code: "C1",
            description: "1\u500B"
          },
          {
            code: "C2",
            description: "2\u500B"
          },
          {
            code: "C12",
            description: "12\u500B"
          }
        ]
      },
      {
        id: "midExhaust",
        name: "\u2467\u4E09\u4F4D\u4E2D\u6CC4\u5F0F\u96FB\u78C1\u95A5\u6578",
        options: [
          {
            code: "",
            description: "\u7121"
          },
          {
            code: "E1",
            description: "1\u500B"
          },
          {
            code: "E2",
            description: "2\u500B"
          },
          {
            code: "E12",
            description: "12\u500B"
          }
        ]
      },
      {
        id: "midPressure",
        name: "\u2468\u4E09\u4F4D\u4E2D\u58D3\u5F0F\u96FB\u78C1\u95A5\u6578",
        options: [
          {
            code: "",
            description: "\u7121"
          },
          {
            code: "P1",
            description: "1\u500B"
          },
          {
            code: "P2",
            description: "2\u500B"
          },
          {
            code: "P12",
            description: "12\u500B"
          }
        ]
      },
      {
        id: "commModule",
        name: "\u2469\u9644\u901A\u4FE1\u5354\u8B70\u6A21\u584A\u898F\u683C",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u4E0D\u9644\u901A\u4FE1\u5354\u8B70\u6A21\u584A"
          },
          {
            code: "CPN1",
            description: "\u9644Profinet\u901A\u4FE1\u5354\u8B70\u6A21\u584APNP\u578B"
          },
          {
            code: "CEN1",
            description: "\u9644EtherNet/IP\u901A\u4FE1\u5354\u8B70\u6A21\u584APNP\u578B"
          },
          {
            code: "CEA1",
            description: "\u9644EtherCAT\u901A\u4FE1\u5354\u8B70\u6A21\u584APNP\u578B"
          },
          {
            code: "CLK1",
            description: "\u9644IO-Link\u901A\u4FE1\u5354\u8B70\u6A21\u584APNP\u578B"
          },
          {
            code: "CPN2",
            description: "\u9644Profinet\u901A\u4FE1\u5354\u8B70\u6A21\u584ANPN\u578B"
          },
          {
            code: "CEN2",
            description: "\u9644EtherNet/IP\u901A\u4FE1\u5354\u8B70\u6A21\u584ANPN\u578B"
          },
          {
            code: "CEA2",
            description: "\u9644EtherCAT\u901A\u4FE1\u5354\u8B70\u6A21\u584ANPN\u578B"
          }
        ]
      },
      {
        id: "specialValve",
        name: "\u246A\u7279\u6B8A\u6D3E\u751F\u95A5\u6578\u91CF",
        options: [
          {
            code: "",
            description: "\u7121"
          },
          {
            code: "SE1",
            description: "\u7368\u7ACB\u9032\u6C23\u7684\u55AE\u63A7\u96FB\u78C1\u95A51\u500B (\u53EF\u589E\u6578\u91CF\u5982 SE2)"
          },
          {
            code: "DE1",
            description: "\u7368\u7ACB\u9032\u6C23\u7684\u96D9\u63A7\u96FB\u78C1\u95A51\u500B (\u53EF\u589E\u6578\u91CF\u5982 DE2)"
          },
          {
            code: "EE1",
            description: "\u7368\u7ACB\u9032\u6C23\u7684\u96D9\u63A7\u4E2D\u6392\u5F0F\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "PE1",
            description: "\u7368\u7ACB\u9032\u6C23\u7684\u96D9\u63A7\u4E2D\u58D3\u5F0F\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "SR1",
            description: "\u7368\u7ACB\u6392\u6C23\u7684\u55AE\u63A7\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "DR1",
            description: "\u7368\u7ACB\u6392\u6C23\u7684\u96D9\u63A7\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "ER1",
            description: "\u7368\u7ACB\u6392\u6C23\u7684\u96D9\u63A7\u4E2D\u6392\u5F0F\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "PR1",
            description: "\u7368\u7ACB\u6392\u6C23\u7684\u96D9\u63A7\u4E2D\u58D3\u5F0F\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "SW1",
            description: "\u5916\u90E8\u5148\u5C0E\u55AE\u63A7\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "DW1",
            description: "\u5916\u90E8\u5148\u5C0E\u96D9\u63A7\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "CW1",
            description: "\u5916\u90E8\u5148\u5C0E\u96D9\u63A7\u4E2D\u5C01\u5F0F\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "EW1",
            description: "\u5916\u90E8\u5148\u5C0E\u96D9\u63A7\u4E2D\u6392\u5F0F\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "PW1",
            description: "\u5916\u90E8\u5148\u5C0E\u96D9\u63A7\u4E2D\u58D3\u5F0F\u96FB\u78C1\u95A51\u500B"
          },
          {
            code: "DNC1",
            description: "\u96D9\u4E09\u53E3\u4E8C\u4F4D\u96FB\u78C1\u95A5(NC-NC)1\u500B (\u53EF\u589E\u6578\u91CF\u5982 DNC2)"
          },
          {
            code: "DNO1",
            description: "\u96D9\u4E09\u53E3\u4E8C\u4F4D\u96FB\u78C1\u95A5(NO-NO)1\u500B (\u53EF\u589E\u6578\u91CF\u5982 DNO2)"
          }
        ]
      }
    ]
  },
  {
    id: "6D-single",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "6D\u7CFB\u5217\u55AE\u9AD4",
    name: "6D\u7CFB\u5217 \u96D9\u4E09\u53E3\u4E8C\u4F4D/\u4E0D\u540C\u9032\u6C23\u65B9\u5F0F\u96FB\u78C1\u95A5\u55AE\u9AD4",
    orderCodeFormat: "6D {series} {controlType} {voltage} {pilotType}",
    categories: [
      {
        id: "series",
        name: "\u2460\u898F\u683C\u4EE3\u865F & \u2461\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "05",
            description: "6D 0500\u7CFB\u5217"
          },
          {
            code: "1",
            description: "6D 100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "6D 200\u7CFB\u5217"
          }
        ]
      },
      {
        id: "controlType",
        name: "\u2462\u96FB\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "\u55AE\u4F4D\u7F6E\u55AE\u96FB\u63A7"
          },
          {
            code: "20",
            description: "\u96D9\u4F4D\u7F6E\u96D9\u96FB\u63A7"
          },
          {
            code: "30C",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u5C01\u9589\u578B"
          },
          {
            code: "30E",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u6392\u6C23\u578B"
          },
          {
            code: "30P",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u58D3\u529B\u578B"
          },
          {
            code: "20NC",
            description: "\u96D9\u4E09\u53E3\u4E8C\u4F4D\u96FB\u78C1\u95A5NC-NC"
          },
          {
            code: "20NO",
            description: "\u96D9\u4E09\u53E3\u4E8C\u4F4D\u96FB\u78C1\u95A5NO-NO"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u2463\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "pilotType",
        name: "\u2464\u5F15\u5C0E\u65B9\u5F0F/\u9032\u6392\u6C23\u985E\u578B",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96(\u5167\u90E8\u5F15\u5C0E)"
          },
          {
            code: "-W",
            description: "\u5916\u90E8\u5F15\u5C0E\u5F0F"
          },
          {
            code: "-E",
            description: "\u7368\u7ACB\u9032\u6C23"
          },
          {
            code: "-R",
            description: "\u7368\u7ACB\u6392\u6C23"
          }
        ]
      }
    ]
  },
  {
    id: "4SV",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "4SV\u7CFB\u5217",
    code: "",
    name: "4SV\u7CFB\u5217 \u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\u96FB\u78C1\u95A5",
    format: "{series}{port}{control}{connection}{voltage}{connection_type}{wire_length}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "4SV",
            description: "4SV\u7CFB\u5217\u96FB\u78C1\u95A5"
          }
        ]
      },
      {
        id: "port",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "300\u7CFB\u5217"
          },
          {
            code: "4",
            description: "400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "control",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "\u96D9\u4F4D\u7F6E\u55AE\u96FB\u63A7"
          },
          {
            code: "20",
            description: "\u96D9\u4F4D\u7F6E\u96D9\u96FB\u63A7"
          },
          {
            code: "30C",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u5C01\u9589\u578B"
          },
          {
            code: "30E",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u6392\u6C23\u578B"
          },
          {
            code: "30P",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u58D3\u529B\u578B"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection_type",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          },
          {
            code: "D",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "M",
            description: "M8\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "wire_length",
        name: "\u7AEF\u5B50\u7DDA\u9577",
        options: [
          {
            code: "",
            description: "0.5m"
          },
          {
            code: "200",
            description: "2.0m"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u7AEF\u5B50\u7DDA\u9577\u91DD\u5C0D\u63D2\u5EA7\u5F0F\uFF0C\u53EF\u90780.5m/2m\u7AEF\u5B50\u7DDA\uFF1B\u51FA\u7DDA\u5F0F\u548CM8\u51FA\u7DDA\u5F0F\u7684\u51FA\u7DDA\u9577\u5EA6\u70BA0.5m\u3002",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.23"
  },
  {
    id: "7V",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u96FB\u78C1\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "7V\u7CFB\u5217",
    code: "",
    name: "7V\u7CFB\u5217\u96FB\u78C1\u95A5",
    format: "7V{series}{control}{port}{voltage}{electrical}{length}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "2",
            description: "200\u7CFB\u5217"
          }
        ]
      },
      {
        id: "control",
        name: "\u96FB\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "\u96D9\u4F4D\u7F6E\u55AE\u96FB\u63A7"
          },
          {
            code: "20",
            description: "\u96D9\u4F4D\u7F6E\u96D9\u96FB\u63A7"
          },
          {
            code: "30C",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u5C01\u9589\u578B"
          },
          {
            code: "30E",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u6392\u6C23\u578B"
          },
          {
            code: "30P",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u96FB\u63A7\u4E2D\u4F4D\u58D3\u529B\u578B"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "08",
            description: "M5, PT1/8, PT1/4, PT3/8"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "electrical",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u87BA\u7D0B\u63A5\u7BA1"
          },
          {
            code: "J",
            description: "\u5FEB\u63D2\u63A5\u982D"
          }
        ]
      },
      {
        id: "length",
        name: "\u7AEF\u5B50\u7DDA\u9577",
        options: [
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC"
          },
          {
            code: "050",
            description: "0.5m"
          },
          {
            code: "200",
            description: "2.0m"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5FEB\u63D2\u63A5\u982D\u578B\u96FB\u78C1\u95A5\u5E95\u5EA7\u70BA\u7121\u7259\u578B",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.92"
  },
  {
    id: "3A100",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "3A\u7CFB\u5217",
    code: "",
    name: "3A100\u7CFB\u5217 \u6C23\u63A7\u95A5",
    format: "3A{series}{type}{port}{state}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "100\u7CFB\u5217"
          }
        ]
      },
      {
        id: "type",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "\u96D9\u4F4D\u7F6E\u55AE\u6C23\u63A7"
          },
          {
            code: "20",
            description: "\u96D9\u4F4D\u7F6E\u96D9\u6C23\u63A7"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "state",
        name: "\u521D\u59CB\u72C0\u614B",
        options: [
          {
            code: "NC",
            description: "\u5E38\u9589\u578B"
          },
          {
            code: "NO",
            description: "\u5E38\u958B\u578B"
          },
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5E95\u5EA7\u898F\u683C\u53CA\u8A02\u8CA8\u65B9\u5F0F\u8ACB\u53C3\u8003P131\u9801",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.113"
  },
  {
    id: "3A200",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "3A\u7CFB\u5217",
    code: "",
    name: "3A200\u7CFB\u5217 \u6C23\u63A7\u95A5",
    format: "3A{series}{type}{port}{state}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "2",
            description: "200\u7CFB\u5217"
          }
        ]
      },
      {
        id: "type",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "\u96D9\u4F4D\u7F6E\u55AE\u6C23\u63A7"
          },
          {
            code: "20",
            description: "\u96D9\u4F4D\u7F6E\u96D9\u6C23\u63A7"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "state",
        name: "\u521D\u59CB\u72C0\u614B",
        options: [
          {
            code: "NC",
            description: "\u5E38\u9589\u578B"
          },
          {
            code: "NO",
            description: "\u5E38\u958B\u578B"
          },
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5E95\u5EA7\u898F\u683C\u53CA\u8A02\u8CA8\u65B9\u5F0F\u8ACB\u53C3\u8003P131\u9801",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.114"
  },
  {
    id: "3A300",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E09\u53E3\u4E8C\u4F4D)",
    group: "3A\u7CFB\u5217",
    code: "",
    name: "3A300\u7CFB\u5217 \u6C23\u63A7\u95A5",
    format: "3A{series}{type}{port}{state}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "3",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "type",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "\u96D9\u4F4D\u7F6E\u55AE\u6C23\u63A7"
          },
          {
            code: "20",
            description: "\u96D9\u4F4D\u7F6E\u96D9\u6C23\u63A7"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "state",
        name: "\u521D\u59CB\u72C0\u614B",
        options: [
          {
            code: "NC",
            description: "\u5E38\u9589\u578B"
          },
          {
            code: "NO",
            description: "\u5E38\u958B\u578B"
          },
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5E95\u5EA7\u898F\u683C\u53CA\u8A02\u8CA8\u65B9\u5F0F\u8ACB\u53C3\u8003P131\u9801",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.115"
  },
  {
    id: "4A100",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "4A\u7CFB\u5217",
    code: "",
    name: "4A100\u7CFB\u5217 \u6C23\u63A7\u95A5",
    format: "4A{series}{type}{port}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "100\u7CFB\u5217"
          }
        ]
      },
      {
        id: "type",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "\u96D9\u4F4D\u7F6E\u55AE\u6C23\u63A7"
          },
          {
            code: "20",
            description: "\u96D9\u4F4D\u7F6E\u96D9\u6C23\u63A7"
          },
          {
            code: "30C",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u5C01\u9589\u578B"
          },
          {
            code: "30E",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u6392\u6C23\u578B"
          },
          {
            code: "30P",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u58D3\u529B\u578B"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5E95\u5EA7\u898F\u683C\u53CA\u8A02\u8CA8\u65B9\u5F0F\u8ACB\u53C3\u8003P132\u9801",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.123"
  },
  {
    id: "4A200",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "4A\u7CFB\u5217",
    code: "",
    name: "4A200\u7CFB\u5217 \u6C23\u63A7\u95A5",
    format: "4A{series}{type}{port}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "2",
            description: "200\u7CFB\u5217"
          }
        ]
      },
      {
        id: "type",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "\u96D9\u4F4D\u7F6E\u55AE\u6C23\u63A7"
          },
          {
            code: "20",
            description: "\u96D9\u4F4D\u7F6E\u96D9\u6C23\u63A7"
          },
          {
            code: "30C",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u5C01\u9589\u578B"
          },
          {
            code: "30E",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u6392\u6C23\u578B"
          },
          {
            code: "30P",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u58D3\u529B\u578B"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5E95\u5EA7\u898F\u683C\u53CA\u8A02\u8CA8\u65B9\u5F0F\u8ACB\u53C3\u8003P132\u9801",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.125"
  },
  {
    id: "4A300",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "4A\u7CFB\u5217",
    code: "",
    name: "4A300\u7CFB\u5217 \u6C23\u63A7\u95A5",
    format: "4A{series}{type}{port}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "3",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "type",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "\u96D9\u4F4D\u7F6E\u55AE\u6C23\u63A7"
          },
          {
            code: "20",
            description: "\u96D9\u4F4D\u7F6E\u96D9\u6C23\u63A7"
          },
          {
            code: "30C",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u5C01\u9589\u578B"
          },
          {
            code: "30E",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u6392\u6C23\u578B"
          },
          {
            code: "30P",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u58D3\u529B\u578B"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5E95\u5EA7\u898F\u683C\u53CA\u8A02\u8CA8\u65B9\u5F0F\u8ACB\u53C3\u8003P132\u9801",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.127"
  },
  {
    id: "4A400",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u6C23\u63A7\u95A5(\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D)",
    group: "4A\u7CFB\u5217",
    code: "",
    name: "4A400\u7CFB\u5217 \u6C23\u63A7\u95A5",
    format: "4A{series}{type}{port}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "4",
            description: "400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "type",
        name: "\u6C23\u63A7\u65B9\u5F0F",
        options: [
          {
            code: "10",
            description: "\u96D9\u4F4D\u7F6E\u55AE\u6C23\u63A7"
          },
          {
            code: "20",
            description: "\u96D9\u4F4D\u7F6E\u96D9\u6C23\u63A7"
          },
          {
            code: "30C",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u5C01\u9589\u578B"
          },
          {
            code: "30E",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u6392\u6C23\u578B"
          },
          {
            code: "30P",
            description: "\u4E09\u4F4D\u7F6E\u96D9\u6C23\u63A7\u4E2D\u4F4D\u58D3\u529B\u578B"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5E95\u5EA7\u898F\u683C\u53CA\u8A02\u8CA8\u65B9\u5F0F\u8ACB\u53C3\u8003P132\u9801",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.129"
  },
  {
    id: "4F210",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "4F\u8173\u8E0F\u95A5",
    code: "4F210",
    name: "4F\u7CFB\u5217 \u4E94\u53E3\u4E8C\u4F4D\u8173\u8E0F\u95A5",
    format: "4F210{port}{type}{thread}",
    categories: [
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u9644\u9396\u578B"
          },
          {
            code: "F",
            description: "\u9644\u9396\u53CA\u8B77\u7F69\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u9644\u9396\u578B\u61C9\u5B9A\u671F\u6DFB\u52A0\u6F64\u6ED1\u8102",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.166"
  },
  {
    id: "ASC",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u55AE\u5411\u95A5\u3001\u6B62\u56DE\u95A5",
    group: "ASC\u55AE\u5411\u7BC0\u6D41\u95A5",
    code: "",
    name: "ASC\u7CFB\u5217 \u55AE\u5411\u7BC0\u6D41\u95A5",
    format: "ASC{series}{port}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "100",
            description: "100\u7CFB\u5217"
          },
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "ASC100\u50C5\u63D0\u4F9B06\u53E3\u5F91\uFF1BASC200\u50C5\u63D0\u4F9B08\u53E3\u5F91\uFF1BASC300\u63D0\u4F9B10\u53CA15\u53E3\u5F91",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.167"
  },
  {
    id: "NRV",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u55AE\u5411\u95A5\u3001\u6B62\u56DE\u95A5",
    group: "NRV\u55AE\u5411\u95A5",
    code: "NRV",
    name: "NRV\u7CFB\u5217 \u55AE\u5411\u95A5",
    format: "NRV{port}{thread}",
    categories: [
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5167\u82AF\u63A1\u7528POM\u6CE8\u5851",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.168"
  },
  {
    id: "PCV",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u55AE\u5411\u95A5\u3001\u6B62\u56DE\u95A5",
    group: "PCV\u8A98\u5C0E\u6B62\u56DE\u95A5",
    code: "PCV",
    name: "PCV\u7CFB\u5217 \u8A98\u5C0E\u6B62\u56DE\u95A5",
    format: "PCV{port}{type}{pilot_port}{thread}",
    categories: [
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "type",
        name: "\u5148\u5C0E\u53E3\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u5167\u87BA\u7D0B\u5F0F"
          },
          {
            code: "F",
            description: "\u5FEB\u63D2\u63A5\u982D"
          }
        ]
      },
      {
        id: "pilot_port",
        name: "\u5148\u5C0E\u53E3\u898F\u683C\u5C3A\u5BF8",
        options: [
          {
            code: "M5",
            description: "M5x0.8"
          },
          {
            code: "01",
            description: '1/8"'
          },
          {
            code: "02",
            description: '1/4"'
          },
          {
            code: "06",
            description: "\u03A66"
          },
          {
            code: "08",
            description: "\u03A68"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5148\u5C0E\u53E3\u898F\u683C\u8207\u63A5\u7BA1\u53E3\u5F91\u5C0D\u61C9\u95DC\u4FC2\u8ACB\u53C3\u95B1\u578B\u9304\u8868\u683C",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.169"
  },
  {
    id: "3L",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "3L\u624B\u62C9\u95A5",
    code: "",
    name: "3L\u7CFB\u5217 \u4E09\u53E3\u4E8C\u4F4D\u624B\u62C9\u95A5",
    format: "3L{series}{function}{port}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "function",
        name: "\u529F\u80FD\u4EE3\u865F",
        options: [
          {
            code: "10",
            description: "\u4E8C\u4F4D"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "3L100\u50C5\u63D0\u4F9B06\u53E3\u5F91\uFF1B3L200\u63D0\u4F9B06\u53CA08\u53E3\u5F91\uFF1B3L300\u63D0\u4F9B08\u53CA10\u53E3\u5F91",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.144"
  },
  {
    id: "4L",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "4L\u624B\u62C9\u95A5",
    code: "",
    name: "4L\u7CFB\u5217 \u4E94\u53E3\u4E8C\u4F4D\u624B\u62C9\u95A5",
    format: "4L{series}{function}{port}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "100\u7CFB\u5217"
          },
          {
            code: "2",
            description: "200\u7CFB\u5217"
          },
          {
            code: "3",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "function",
        name: "\u529F\u80FD\u4EE3\u865F",
        options: [
          {
            code: "10",
            description: "\u4E8C\u4F4D"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "4L100\u50C5\u63D0\u4F9B06\u53E3\u5F91\uFF1B4L200\u63D0\u4F9B06\u53CA08\u53E3\u5F91\uFF1B4L300\u63D0\u4F9B08\u53CA10\u53E3\u5F91",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.145"
  },
  {
    id: "ZM3",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "ZM3\u91CD\u8F09\u6A5F\u68B0\u95A5",
    code: "ZM3",
    name: "ZM3\u7CFB\u5217 \u91CD\u8F09\u578B\u6A5F\u68B0\u95A5",
    format: "ZM3{type}{port}{angle}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "R",
            description: "\u6EFE\u8F2A\u69D3\u687F\u578B\u6A5F\u68B0\u95A5"
          },
          {
            code: "J",
            description: "\u53EF\u8ABF\u5F0F\u6EFE\u8F2A\u69D3\u687F\u578B\u6A5F\u68B0\u95A5"
          },
          {
            code: "P",
            description: "\u89F8\u91DD\u53EF\u8ABF\u578B\u6A5F\u68B0\u95A5"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "angle",
        name: "\u6309\u9215\u982D\u958B\u95DC\u6975\u9650\u89D2\u5EA6",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "W",
            description: "\u5927\u89D2\u5EA6\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5982\u9700\u52A0\u6CB9\u6F64\u6ED1\uFF0C\u5EFA\u8B70\u4F7F\u7528ISO VG32\u6216\u540C\u7D1A\u7528\u6CB9",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.163"
  },
  {
    id: "4HV",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "4HV\u624B\u8F49\u95A5",
    code: "",
    name: "4HV\u30014HVL\u7CFB\u5217 \u56DB\u53E3\u4E8C\u4F4D\u3001\u56DB\u53E3\u4E09\u4F4D\u624B\u8F49\u95A5",
    format: "4HV{series}{function}{port}{type}{accessory}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "2",
            description: "2\u7CFB\u5217"
          },
          {
            code: "3",
            description: "3\u7CFB\u5217"
          },
          {
            code: "4",
            description: "4\u7CFB\u5217"
          }
        ]
      },
      {
        id: "function",
        name: "\u4F4D\u7F6E\u6578",
        options: [
          {
            code: "10",
            description: "\u56DB\u53E3\u4E8C\u4F4D"
          },
          {
            code: "30",
            description: "\u56DB\u53E3\u4E09\u4F4D"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          }
        ]
      },
      {
        id: "type",
        name: "\u5B89\u88DD\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u95A5\u9AD4\u5B89\u88DD"
          },
          {
            code: "S",
            description: "\u9762\u677F\u5B89\u88DD"
          }
        ]
      },
      {
        id: "accessory",
        name: "\u9644\u9396\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9396"
          },
          {
            code: "L",
            description: "\u9644\u9396"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u56DB\u53E3\u4E09\u4F4D\u6709\u4E2D\u5C01\u9589\u578B",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.147"
  },
  {
    id: "S3",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "S3\u6A5F\u68B0\u95A5",
    code: "S3",
    name: "S3\u7CFB\u5217 \u4E09\u53E3\u4E8C\u4F4D\u6A5F\u68B0\u95A5",
    format: "S3{type}{port}{color}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "B",
            description: "\u57FA\u672C\u578B\u6A5F\u68B0\u95A5"
          },
          {
            code: "C",
            description: "\u9577\u67C4\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "D",
            description: "\u77ED\u67C4\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "Y",
            description: "\u6416\u81C2\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "R",
            description: "\u6EFE\u8F2A\u69D3\u687F\u578B\u6A5F\u68B0\u95A5"
          },
          {
            code: "L",
            description: "\u55AE\u5411\u6EFE\u8F2A\u69D3\u687F\u578B\u6A5F\u68B0\u95A5"
          },
          {
            code: "V",
            description: "\u5782\u76F4\u6EFE\u8F2A\u578B\u6A5F\u68B0\u95A5"
          },
          {
            code: "PL",
            description: "\u505C\u99D0\u65CB\u8F49\u6309\u9215\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "PP",
            description: "\u51F8\u982D\u6309\u9215\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "PF",
            description: "\u5E73\u982D\u6309\u9215\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "PM",
            description: "\u8611\u83C7\u982D\u6309\u9215\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "HS",
            description: "\u65CB\u9215\u578B\u624B\u52D5\u95A5"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "05",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "color",
        name: "\u6309\u9215\u984F\u8272",
        options: [
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC"
          },
          {
            code: "R",
            description: "\u7D05\u8272"
          },
          {
            code: "G",
            description: "\u7DA0\u8272"
          },
          {
            code: "B",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5982\u9700\u52A0\u6CB9\u6F64\u6ED1\uFF0C\u5EFA\u8B70\u4F7F\u7528ISO VG32\u6216\u540C\u7D1A\u7528\u6CB9",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.149"
  },
  {
    id: "M5",
    category: "\u63A7\u5236\u5143\u4EF6",
    superGroup: "\u624B\u52D5\u95A5\u3001\u8173\u8E0F\u95A5\u3001\u6A5F\u68B0\u95A5",
    group: "M5\u6A5F\u68B0\u95A5",
    code: "",
    name: "M5\u7CFB\u5217 \u4E94\u53E3\u4E8C\u4F4D\u6A5F\u68B0\u95A5",
    format: "M5{type}{series}{port}{color}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "B",
            description: "\u57FA\u672C\u578B\u6A5F\u68B0\u95A5"
          },
          {
            code: "C",
            description: "\u9577\u67C4\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "D",
            description: "\u77ED\u67C4\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "Y",
            description: "\u6416\u81C2\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "R",
            description: "\u6EFE\u8F2A\u69D3\u687F\u578B\u6A5F\u68B0\u95A5"
          },
          {
            code: "L",
            description: "\u55AE\u5411\u6EFE\u8F2A\u69D3\u687F\u578B\u6A5F\u68B0\u95A5"
          },
          {
            code: "PL",
            description: "\u505C\u99D0\u65CB\u8F49\u6309\u9215\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "PP",
            description: "\u51F8\u982D\u6309\u9215\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "PF",
            description: "\u5E73\u982D\u6309\u9215\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "PM",
            description: "\u8611\u83C7\u982D\u6309\u9215\u578B\u624B\u52D5\u95A5"
          },
          {
            code: "HS",
            description: "\u65CB\u9215\u578B\u624B\u52D5\u95A5"
          }
        ]
      },
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "110",
            description: "100\u7CFB\u5217"
          },
          {
            code: "210",
            description: "200\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "color",
        name: "\u6309\u9215\u984F\u8272",
        options: [
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC"
          },
          {
            code: "R",
            description: "\u7D05\u8272"
          },
          {
            code: "B",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u53E6\u6709\u8FF7\u4F60\u578BM5R05/M5B05",
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.155"
  }
];

// src/data/catalog-actuators.json
var catalog_actuators_default = [
  {
    id: "jsi",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "JSI\u7CFB\u5217",
    code: "JSI",
    name: "JSI\u7CFB\u5217 \u6A19\u6E96\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnetic}{mounting}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "JSI",
            description: "\u6A19\u6E96\u5FA9\u52D5\u578B"
          },
          {
            code: "JSID",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u578B"
          },
          {
            code: "JSIJ",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "CR",
            description: "CR\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.68"
  },
  {
    id: "sai",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SAI\u7CFB\u5217",
    code: "SAI",
    name: "SAI\u7CFB\u5217 \u6A19\u6E96\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{piston_rod}{adjustment}{magnetic}{mounting}{seal}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "SAI",
            description: "\u6A19\u6E96\u5FA9\u52D5\u578B"
          },
          {
            code: "SAID",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u578B"
          },
          {
            code: "SAIJ",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "200",
            description: "200mm"
          }
        ]
      },
      {
        id: "piston_rod",
        name: "\u6D3B\u585E\u687F\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "\u4E2D\u78B3\u92FC"
          },
          {
            code: "A",
            description: "SUS420J2"
          },
          {
            code: "B",
            description: "SUS304"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "adjustment",
        name: "\u8ABF\u6574\u884C\u7A0B",
        options: [
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "CR",
            description: "CR\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          },
          {
            code: "FTC",
            description: "FTC\u578B"
          }
        ]
      },
      {
        id: "seal",
        name: "\u5BC6\u5C01\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "TPU"
          },
          {
            code: "H",
            description: "\u6C1F\u6A61\u81A0"
          },
          {
            code: "N",
            description: "NBR"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.22"
  },
  {
    id: "sail",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SAI\u7CFB\u5217",
    code: "SAIL",
    name: "SAIL\u7CFB\u5217 \u5E36\u9396\u578B\u6C23\u7F38",
    format: "{lock_pos}{bore}x{stroke}{magnetic}{mounting}{thread}",
    categories: [
      {
        id: "lock_pos",
        name: "\u9396\u5177\u4F4D\u7F6E",
        options: [
          {
            code: "B",
            description: "\u5F8C\u84CB\u9644\u9396\u578B"
          },
          {
            code: "F",
            description: "\u524D\u84CB\u9644\u9396\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "200",
            description: "200mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "CR",
            description: "CR\u578B"
          },
          {
            code: "FTC",
            description: "FTC\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.24"
  },
  {
    id: "saif",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SAI\u7CFB\u5217",
    code: "SAIF",
    name: "SAIF\u7CFB\u5217 \u5E36\u95A5\u578B\u6C23\u7F38",
    format: "{bore}x{stroke}{magnetic}{mounting}{port_size}{voltage}{connection}{thread}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "CR",
            description: "CR\u578B"
          },
          {
            code: "FTC",
            description: "FTC\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "port_size",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.26"
  },
  {
    id: "bsai",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SAI\u7CFB\u5217",
    code: "B",
    name: "BSAI\u7CFB\u5217 \u62B1\u7DCA\u6C23\u7F38",
    format: "B{type}{bore}x{stroke}{magnetic}{mounting}{thread}",
    categories: [
      {
        id: "type",
        name: "\u62B1\u7DCA\u6C23\u7F38\u4EE3\u78BC",
        options: [
          {
            code: "SAI",
            description: "\u6A19\u6E96\u5FA9\u52D5\u578B"
          },
          {
            code: "SAID",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "CR",
            description: "CR\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.29"
  },
  {
    id: "sau",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SAU\u7CFB\u5217",
    code: "SAU",
    name: "SAU\u7CFB\u5217 \u6A19\u6E96\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnetic}{mounting}{seal}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "SAU",
            description: "\u6A19\u6E96\u5FA9\u52D5\u578B"
          },
          {
            code: "SAUD",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u578B"
          },
          {
            code: "SAUJ",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          }
        ]
      },
      {
        id: "seal",
        name: "\u5BC6\u5C01\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "TPU"
          },
          {
            code: "H",
            description: "\u6C1F\u6A61\u81A0"
          },
          {
            code: "N",
            description: "NBR"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.62"
  },
  {
    id: "sauf",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SAU\u7CFB\u5217",
    code: "SAUF",
    name: "SAUF\u7CFB\u5217 \u5E36\u95A5\u578B\u6C23\u7F38",
    format: "{bore}x{stroke}{magnetic}{mounting}{port_size}{voltage}{connection}{thread}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          }
        ]
      },
      {
        id: "port_size",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.64"
  },
  {
    id: "sc",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SC\u7CFB\u5217",
    code: "SC",
    name: "SC\u7CFB\u5217 \u6A19\u6E96\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnetic}{mounting}{seal}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "SC",
            description: "\u6A19\u6E96\u5FA9\u52D5\u578B"
          },
          {
            code: "SCD",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u578B"
          },
          {
            code: "SCJ",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "seal",
        name: "\u5BC6\u5C01\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "TPU"
          },
          {
            code: "H",
            description: "\u6C1F\u6A61\u81A0"
          },
          {
            code: "N",
            description: "NBR"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.38"
  },
  {
    id: "sct",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SC\u7CFB\u5217",
    code: "SCT",
    name: "SCT\u7CFB\u5217 \u591A\u4F4D\u7F6E\u578B\u6C23\u7F38",
    format: "{series}{bore}x{stroke1}x{stroke2}{magnetic}{mounting}{seal}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "SCT",
            description: "\u591A\u4F4D\u7F6E\u5FA9\u52D5\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke1",
        name: "\u884C\u7A0B1",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "stroke2",
        name: "\u884C\u7A0B2",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          }
        ]
      },
      {
        id: "seal",
        name: "\u5BC6\u5C01\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "TPU"
          },
          {
            code: "H",
            description: "\u6C1F\u6A61\u81A0"
          },
          {
            code: "N",
            description: "NBR"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.42"
  },
  {
    id: "scl",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SC\u7CFB\u5217",
    code: "SCL",
    name: "SCL\u7CFB\u5217 \u5E36\u9396\u578B\u6C23\u7F38",
    format: "{lock_pos}{bore}x{stroke}{magnetic}{mounting}{thread}",
    categories: [
      {
        id: "lock_pos",
        name: "\u9396\u5177\u4F4D\u7F6E",
        options: [
          {
            code: "B",
            description: "\u5F8C\u84CB\u9644\u9396\u578B"
          },
          {
            code: "F",
            description: "\u524D\u84CB\u9644\u9396\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.44"
  },
  {
    id: "scf",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SC\u7CFB\u5217",
    code: "SCF",
    name: "SCF\u7CFB\u5217 \u5E36\u95A5\u578B\u6C23\u7F38",
    format: "{bore}x{stroke}{magnetic}{mounting}{port_size}{voltage}{connection}{thread}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "port_size",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.46"
  },
  {
    id: "bsc",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SC\u7CFB\u5217",
    code: "B",
    name: "BSC\u7CFB\u5217 \u62B1\u7DCA\u6C23\u7F38",
    format: "B{type}{bore}x{stroke}{magnetic}{mounting}{thread}",
    categories: [
      {
        id: "type",
        name: "\u62B1\u7DCA\u6C23\u7F38\u4EE3\u78BC",
        options: [
          {
            code: "SC",
            description: "\u6A19\u6E96\u5FA9\u52D5\u578B"
          },
          {
            code: "SCD",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.49"
  },
  {
    id: "se",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SE\u7CFB\u5217",
    code: "SE",
    name: "SE\u7CFB\u5217 \u6A19\u6E96\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{piston_rod}{adjustment}{magnetic}{mounting}{seal}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "SE",
            description: "\u6A19\u6E96\u5FA9\u52D5\u578B"
          },
          {
            code: "SED",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u578B"
          },
          {
            code: "SEJ",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          }
        ]
      },
      {
        id: "piston_rod",
        name: "\u6D3B\u585E\u687F\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "\u4E2D\u78B3\u92FC"
          },
          {
            code: "A",
            description: "SUS420J2"
          },
          {
            code: "B",
            description: "SUS304"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "adjustment",
        name: "\u8ABF\u6574\u884C\u7A0B",
        options: [
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "CR",
            description: "CR\u578B"
          },
          {
            code: "FTC",
            description: "FTC\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "seal",
        name: "\u5BC6\u5C01\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "TPU"
          },
          {
            code: "H",
            description: "\u6C1F\u6A61\u81A0"
          },
          {
            code: "N",
            description: "NBR"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.13"
  },
  {
    id: "bse",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SE\u7CFB\u5217",
    code: "B",
    name: "BSE\u7CFB\u5217 \u62B1\u7DCA\u6C23\u7F38",
    format: "B{type}{bore}x{stroke}{magnetic}{mounting}{thread}",
    categories: [
      {
        id: "type",
        name: "\u62B1\u7DCA\u6C23\u7F38\u4EE3\u78BC",
        options: [
          {
            code: "SE",
            description: "\u6A19\u6E96\u5FA9\u52D5\u578B"
          },
          {
            code: "SED",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "CR",
            description: "CR\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.16"
  },
  {
    id: "sg",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6A19\u6E96\u6C23\u7F38",
    group: "SG\u3001SGC\u7CFB\u5217",
    code: "SG",
    name: "SG\u3001SGC\u7CFB\u5217 \u6A19\u6E96\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{adjustment}{magnetic}{mounting}{seal}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "SG",
            description: "\u6A19\u6E96\u5FA9\u52D5\u578B(\u92FC\u7BA1)"
          },
          {
            code: "SGC",
            description: "\u6A19\u6E96\u5FA9\u52D5\u578B(\u92C1\u7BA1)"
          },
          {
            code: "SGD",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u578B(\u92FC\u7BA1)"
          },
          {
            code: "SGCD",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u578B(\u92C1\u7BA1)"
          },
          {
            code: "SGJ",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B(\u92FC\u7BA1)"
          },
          {
            code: "SGCJ",
            description: "\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B(\u92C1\u7BA1)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "adjustment",
        name: "\u8ABF\u6574\u884C\u7A0B",
        options: [
          {
            code: "",
            description: "\u7121\u6B64\u4EE3\u78BC"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u57FA\u672C\u578B"
          },
          {
            code: "LB",
            description: "LB\u578B"
          },
          {
            code: "FA",
            description: "FA\u578B"
          },
          {
            code: "FB",
            description: "FB\u578B"
          },
          {
            code: "CA",
            description: "CA\u578B"
          },
          {
            code: "CB",
            description: "CB\u578B"
          },
          {
            code: "CR",
            description: "CR\u578B"
          },
          {
            code: "FTC",
            description: "FTC\u578B"
          },
          {
            code: "TC",
            description: "TC\u578B"
          }
        ]
      },
      {
        id: "seal",
        name: "\u5BC6\u5C01\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "TPU"
          },
          {
            code: "H",
            description: "\u6C1F\u6A61\u81A0"
          },
          {
            code: "N",
            description: "NBR"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.56"
  },
  {
    id: "tsai",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u5E36\u5C0E\u5411\u67B6\u6C23\u7F38",
    group: "TSAI\u7CFB\u5217",
    code: "TSAI",
    name: "TSAI\u7CFB\u5217 \u5C0E\u5411\u6C23\u7F38",
    format: "{series}{bearing}{bore}x{stroke}{magnetic}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "TSAI",
            description: "\u5E36\u5C0E\u5411\u6C23\u7F38"
          }
        ]
      },
      {
        id: "bearing",
        name: "\u8EF8\u627F\u985E\u5225",
        options: [
          {
            code: "M",
            description: "\u92FC\u5957\u8EF8\u627F"
          },
          {
            code: "L",
            description: "\u76F4\u7DDA\u8EF8\u627F"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          },
          {
            code: "600",
            description: "600mm"
          },
          {
            code: "700",
            description: "700mm"
          },
          {
            code: "800",
            description: "800mm"
          },
          {
            code: "900",
            description: "900mm"
          },
          {
            code: "1000",
            description: "1000mm"
          }
        ]
      },
      {
        id: "magnetic",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6A19\u6E96\u6C23\u7F38) P.35"
  },
  {
    id: "f-tsai",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u5E36\u5C0E\u5411\u67B6\u6C23\u7F38",
    group: "TSAI\u7CFB\u5217",
    code: "F",
    name: "\u55AE\u7368\u5C0E\u5411\u67B6",
    format: "{code} - TSAI {bearing} {bore}X{stroke}",
    categories: [
      {
        id: "bearing",
        name: "\u8EF8\u627F\u985E\u5225",
        options: [
          {
            code: "M",
            description: "M: \u9285\u5957\u8EF8\u627F"
          },
          {
            code: "L",
            description: "L: \u76F4\u7DDA\u8EF8\u627F"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          }
        ]
      }
    ]
  },
  {
    id: "hfk",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFK\u7CFB\u5217",
    code: "HFK",
    name: "\u5E36\u5C0E\u8ECC\u5E73\u884C\u578B\u6C23\u52D5\u624B\u6307(\u6EFE\u67F1\u578B)(\u5FA9\u52D5)",
    format: "{code} {bore} {install}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          }
        ]
      },
      {
        id: "install",
        name: "\u5B89\u88DD\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u6A19\u6E96\u578B"
          },
          {
            code: "B",
            description: "B: \u5074\u9762\u5B89\u88DD\u578B"
          },
          {
            code: "N",
            description: "N: \u901A\u5B54\u5B89\u88DD\u578B"
          },
          {
            code: "F",
            description: "F: \u5E95\u90E8\u5B89\u88DD\u578B"
          },
          {
            code: "R",
            description: "R: \u722A\u5BEC\u7A84\u578B"
          },
          {
            code: "W",
            description: "W: \u5074\u9762\u5B89\u88DD\u4E14\u722A\u5BEC\u7A84\u578B"
          },
          {
            code: "M",
            description: "M: \u901A\u5B54\u5B89\u88DD\u4E14\u722A\u5BEC\u7A84\u578B"
          }
        ]
      }
    ]
  },
  {
    id: "hfsk",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFK\u7CFB\u5217",
    code: "HFSK",
    name: "\u5E36\u5C0E\u8ECC\u5E73\u884C\u578B\u6C23\u52D5\u624B\u6307(\u6EFE\u67F1\u578B)(\u55AE\u52D5\u5E38\u9589)",
    format: "{code} {bore} {install}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          }
        ]
      },
      {
        id: "install",
        name: "\u5B89\u88DD\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u6A19\u6E96\u578B"
          },
          {
            code: "B",
            description: "B: \u5074\u9762\u5B89\u88DD\u578B"
          },
          {
            code: "N",
            description: "N: \u901A\u5B54\u5B89\u88DD\u578B"
          },
          {
            code: "F",
            description: "F: \u5E95\u90E8\u5B89\u88DD\u578B"
          },
          {
            code: "R",
            description: "R: \u722A\u5BEC\u7A84\u578B"
          },
          {
            code: "W",
            description: "W: \u5074\u9762\u5B89\u88DD\u4E14\u722A\u5BEC\u7A84\u578B"
          },
          {
            code: "M",
            description: "M: \u901A\u5B54\u5B89\u88DD\u4E14\u722A\u5BEC\u7A84\u578B"
          }
        ]
      }
    ]
  },
  {
    id: "hftk",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFK\u7CFB\u5217",
    code: "HFTK",
    name: "\u5E36\u5C0E\u8ECC\u5E73\u884C\u578B\u6C23\u52D5\u624B\u6307(\u6EFE\u67F1\u578B)(\u55AE\u52D5\u5E38\u958B)",
    format: "{code} {bore} {install}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          }
        ]
      },
      {
        id: "install",
        name: "\u5B89\u88DD\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u6A19\u6E96\u578B"
          },
          {
            code: "B",
            description: "B: \u5074\u9762\u5B89\u88DD\u578B"
          },
          {
            code: "N",
            description: "N: \u901A\u5B54\u5B89\u88DD\u578B"
          },
          {
            code: "F",
            description: "F: \u5E95\u90E8\u5B89\u88DD\u578B"
          },
          {
            code: "R",
            description: "R: \u722A\u5BEC\u7A84\u578B"
          },
          {
            code: "W",
            description: "W: \u5074\u9762\u5B89\u88DD\u4E14\u722A\u5BEC\u7A84\u578B"
          },
          {
            code: "M",
            description: "M: \u901A\u5B54\u5B89\u88DD\u4E14\u722A\u5BEC\u7A84\u578B"
          }
        ]
      }
    ]
  },
  {
    id: "jsck",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    group: "JSCK\u7CFB\u5217",
    code: "JSCK",
    name: "\u5F37\u529B\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    format: "{code}{arm_dir} {bore}X{angle} {arm} {hand} {sensor} {thread}",
    categories: [
      {
        id: "arm_dir",
        name: "\u593E\u7DCA\u81C2\u4F4D\u7F6E",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u593E\u7DCA\u81C2\u6C34\u5E73"
          },
          {
            code: "V",
            description: "V: \u593E\u7DCA\u81C2\u5782\u76F4"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          }
        ]
      },
      {
        id: "angle",
        name: "\u6253\u958B\u89D2\u5EA6",
        options: [
          {
            code: "15",
            description: "15\xB0"
          },
          {
            code: "30",
            description: "30\xB0"
          },
          {
            code: "45",
            description: "45\xB0"
          },
          {
            code: "60",
            description: "60\xB0"
          },
          {
            code: "75",
            description: "75\xB0"
          },
          {
            code: "90",
            description: "90\xB0"
          },
          {
            code: "105",
            description: "105\xB0"
          },
          {
            code: "120",
            description: "120\xB0"
          },
          {
            code: "135",
            description: "135\xB0"
          }
        ]
      },
      {
        id: "arm",
        name: "\u593E\u7DCA\u81C2\u898F\u683C",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u4E0D\u9644\u593E\u7DCA\u81C2"
          },
          {
            code: "AM1R",
            description: "AM1R: \u504F\u7F6E15mm(\u53F3)"
          },
          {
            code: "AM1C",
            description: "AM1C: \u504F\u7F6E15mm(\u4E2D)"
          },
          {
            code: "AM1L",
            description: "AM1L: \u504F\u7F6E15mm(\u5DE6)"
          },
          {
            code: "AM2R",
            description: "AM2R: \u504F\u7F6E15mm(\u53F3)"
          },
          {
            code: "AM2C",
            description: "AM2C: \u504F\u7F6E15mm(\u4E2D)"
          },
          {
            code: "AM2L",
            description: "AM2L: \u504F\u7F6E15mm(\u5DE6)"
          },
          {
            code: "AM3R",
            description: "AM3R: \u504F\u7F6E45mm(\u53F3)"
          },
          {
            code: "AM3C",
            description: "AM3C: \u504F\u7F6E45mm(\u4E2D)"
          },
          {
            code: "AM3L",
            description: "AM3L: \u504F\u7F6E45mm(\u5DE6)"
          },
          {
            code: "AM4R",
            description: "AM4R: \u504F\u7F6E45mm(\u53F3)"
          },
          {
            code: "AM4C",
            description: "AM4C: \u504F\u7F6E45mm(\u4E2D)"
          },
          {
            code: "AM4L",
            description: "AM4L: \u504F\u7F6E45mm(\u5DE6)"
          }
        ]
      },
      {
        id: "hand",
        name: "\u624B\u67C4\u4F4D\u7F6E",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u975E\u624B\u52D5\u578B"
          },
          {
            code: "HL",
            description: "HL: \u624B\u52D5\u5728\u5DE6\u5074"
          },
          {
            code: "HR",
            description: "HR: \u624B\u52D5\u5728\u53F3\u5074"
          }
        ]
      },
      {
        id: "sensor",
        name: "\u50B3\u611F\u5668",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u4E0D\u9644\u50B3\u611F\u5668"
          },
          {
            code: "K",
            description: "K: \u9644\u96FB\u611F\u50B3\u611F\u5668(PNP\u578B)"
          },
          {
            code: "KN",
            description: "KN: \u9644\u96FB\u611F\u50B3\u611F\u5668(NPN\u578B)"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259"
          },
          {
            code: "G",
            description: "G: G\u7259"
          }
        ]
      }
    ]
  },
  {
    id: "jsk",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    group: "JSK\u7CFB\u5217",
    code: "JSK",
    name: "\u5F37\u529B\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    format: "{code}{arm_dir} {bore} {arm} {sensor} {thread}",
    categories: [
      {
        id: "arm_dir",
        name: "\u593E\u7DCA\u81C2\u4F4D\u7F6E",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u593E\u7DCA\u81C2\u6C34\u5E73"
          },
          {
            code: "V",
            description: "V: \u593E\u7DCA\u81C2\u5782\u76F4"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          }
        ]
      },
      {
        id: "arm",
        name: "\u593E\u7DCA\u81C2\u898F\u683C",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u4E0D\u9644\u593E\u7DCA\u81C2"
          },
          {
            code: "AM1R",
            description: "AM1R: \u504F\u7F6E15mm(\u53F3)"
          },
          {
            code: "AM1C",
            description: "AM1C: \u504F\u7F6E15mm(\u4E2D)"
          },
          {
            code: "AM1L",
            description: "AM1L: \u504F\u7F6E15mm(\u5DE6)"
          },
          {
            code: "AM2R",
            description: "AM2R: \u504F\u7F6E15mm(\u53F3)"
          },
          {
            code: "AM2C",
            description: "AM2C: \u504F\u7F6E15mm(\u4E2D)"
          },
          {
            code: "AM2L",
            description: "AM2L: \u504F\u7F6E15mm(\u5DE6)"
          },
          {
            code: "AM3R",
            description: "AM3R: \u504F\u7F6E45mm(\u53F3)"
          },
          {
            code: "AM3C",
            description: "AM3C: \u504F\u7F6E45mm(\u4E2D)"
          },
          {
            code: "AM3L",
            description: "AM3L: \u504F\u7F6E45mm(\u5DE6)"
          },
          {
            code: "AM4R",
            description: "AM4R: \u504F\u7F6E45mm(\u53F3)"
          },
          {
            code: "AM4C",
            description: "AM4C: \u504F\u7F6E45mm(\u4E2D)"
          },
          {
            code: "AM4L",
            description: "AM4L: \u504F\u7F6E45mm(\u5DE6)"
          }
        ]
      },
      {
        id: "sensor",
        name: "\u50B3\u611F\u5668",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u4E0D\u9644\u50B3\u611F\u5668"
          },
          {
            code: "K",
            description: "K: \u9644\u96FB\u611F\u50B3\u611F\u5668(PNP\u578B)"
          },
          {
            code: "KN",
            description: "KN: \u9644\u96FB\u611F\u50B3\u611F\u5668(NPN\u578B)"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: PT\u7259"
          },
          {
            code: "G",
            description: "G: G\u7259"
          }
        ]
      }
    ]
  },
  {
    id: "aqk",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u92B7\u91D8\u6C23\u7F38",
    group: "AQK\u7CFB\u5217",
    code: "AQK",
    name: "\u92B7\u91D8\u6C23\u7F38",
    format: "{code}{bore} {magnet} {body} {relation} {arm} {shim} - {pin_spec}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "50",
            description: "50mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "S: \u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "body",
        name: "\u672C\u9AD4\u5B89\u88DD\u5C3A\u5BF8",
        options: [
          {
            code: "A",
            description: "A: A\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "B",
            description: "B: B\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "C",
            description: "C: C\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "D",
            description: "D: D\u578B\u914D\u7F6E\u95DC\u7CFB"
          }
        ]
      },
      {
        id: "relation",
        name: "\u5B89\u88DD\u9762\u87BA\u5B54\u8207\u92B7\u5B54\u4F4D\u7F6E\u95DC\u7CFB",
        options: [
          {
            code: "A",
            description: "A: A\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "B",
            description: "B: B\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "C",
            description: "C: C\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "D",
            description: "D: D\u578B\u914D\u7F6E\u95DC\u7CFB"
          }
        ]
      },
      {
        id: "arm",
        name: "\u593E\u7DCA\u81C2\u4F4D\u7F6E",
        options: [
          {
            code: "A",
            description: "A: \u593E\u7DCA\u81C2\u8207\u9032\u6C23\u5B54\u540C\u5074(0\xB0)"
          },
          {
            code: "B",
            description: "B: \u593E\u7DCA\u81C2\u8207\u9032\u6C23\u5B5490\xB0"
          },
          {
            code: "C",
            description: "C: \u593E\u7DCA\u81C2\u8207\u9032\u6C23\u5B54180\xB0"
          },
          {
            code: "D",
            description: "D: \u593E\u7DCA\u81C2\u8207\u9032\u6C23\u5B54270\xB0"
          }
        ]
      },
      {
        id: "shim",
        name: "\u8ABF\u6574\u588A\u7247",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u7121\u8ABF\u6574\u588A\u7247"
          },
          {
            code: "2",
            description: "2: \u5E36\u8ABF\u6574\u588A\u72472mm"
          }
        ]
      },
      {
        id: "pin_spec",
        name: "\u5C0E\u5411\u92B7\u91D8\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "141X290",
            description: "141X290: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A614.1, \u9AD8\u5EA629(\u4E0D\u5E36\u588A\u7247)"
          },
          {
            code: "151X290",
            description: "151X290: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A615.1, \u9AD8\u5EA629(\u4E0D\u5E36\u588A\u7247)"
          },
          {
            code: "177X340",
            description: "177X340: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A617.7, \u9AD8\u5EA634(\u4E0D\u5E36\u588A\u7247)"
          },
          {
            code: "191X340",
            description: "191X340: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A619.1, \u9AD8\u5EA634(\u4E0D\u5E36\u588A\u7247)"
          },
          {
            code: "241X340",
            description: "241X340: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A624.1, \u9AD8\u5EA634(\u4E0D\u5E36\u588A\u7247)"
          },
          {
            code: "141X310",
            description: "141X310: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A614.1, \u9AD8\u5EA631(\u5E36\u588A\u7247)"
          },
          {
            code: "151X310",
            description: "151X310: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A615.1, \u9AD8\u5EA631(\u5E36\u588A\u7247)"
          },
          {
            code: "177X360",
            description: "177X360: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A617.7, \u9AD8\u5EA636(\u5E36\u588A\u7247)"
          },
          {
            code: "191X360",
            description: "191X360: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A619.1, \u9AD8\u5EA636(\u5E36\u588A\u7247)"
          },
          {
            code: "241X360",
            description: "241X360: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A624.1, \u9AD8\u5EA636(\u5E36\u588A\u7247)"
          }
        ]
      }
    ]
  },
  {
    id: "baqk",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u92B7\u91D8\u6C23\u7F38",
    group: "BAQK\u7CFB\u5217",
    code: "BAQK",
    name: "\u62B1\u7DCA\u578B\u92B7\u91D8\u6C23\u7F38",
    format: "{code}{bore} {magnet} {body} {relation} {arm} {shim} - {pin_spec}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "50",
            description: "50mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "S: \u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "body",
        name: "\u672C\u9AD4\u5B89\u88DD\u5C3A\u5BF8",
        options: [
          {
            code: "A",
            description: "A: A\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "B",
            description: "B: B\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "C",
            description: "C: C\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "D",
            description: "D: D\u578B\u914D\u7F6E\u95DC\u7CFB"
          }
        ]
      },
      {
        id: "relation",
        name: "\u5B89\u88DD\u9762\u87BA\u5B54\u8207\u92B7\u5B54\u4F4D\u7F6E\u95DC\u7CFB",
        options: [
          {
            code: "A",
            description: "A: A\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "B",
            description: "B: B\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "C",
            description: "C: C\u578B\u914D\u7F6E\u95DC\u7CFB"
          },
          {
            code: "D",
            description: "D: D\u578B\u914D\u7F6E\u95DC\u7CFB"
          }
        ]
      },
      {
        id: "arm",
        name: "\u593E\u7DCA\u81C2\u4F4D\u7F6E",
        options: [
          {
            code: "A",
            description: "A: \u593E\u7DCA\u81C2\u8207\u9032\u6C23\u5B54\u540C\u5074(0\xB0)"
          },
          {
            code: "B",
            description: "B: \u593E\u7DCA\u81C2\u8207\u9032\u6C23\u5B5490\xB0"
          },
          {
            code: "C",
            description: "C: \u593E\u7DCA\u81C2\u8207\u9032\u6C23\u5B54180\xB0"
          },
          {
            code: "D",
            description: "D: \u593E\u7DCA\u81C2\u8207\u9032\u6C23\u5B54270\xB0"
          }
        ]
      },
      {
        id: "shim",
        name: "\u8ABF\u6574\u588A\u7247",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D: \u7121\u8ABF\u6574\u588A\u7247"
          },
          {
            code: "2",
            description: "2: \u5E36\u8ABF\u6574\u588A\u72472mm"
          }
        ]
      },
      {
        id: "pin_spec",
        name: "\u5C0E\u5411\u92B7\u91D8\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "141X290",
            description: "141X290: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A614.1, \u9AD8\u5EA629(\u4E0D\u5E36\u588A\u7247)"
          },
          {
            code: "151X290",
            description: "151X290: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A615.1, \u9AD8\u5EA629(\u4E0D\u5E36\u588A\u7247)"
          },
          {
            code: "177X340",
            description: "177X340: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A617.7, \u9AD8\u5EA634(\u4E0D\u5E36\u588A\u7247)"
          },
          {
            code: "191X340",
            description: "191X340: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A619.1, \u9AD8\u5EA634(\u4E0D\u5E36\u588A\u7247)"
          },
          {
            code: "241X340",
            description: "241X340: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A624.1, \u9AD8\u5EA634(\u4E0D\u5E36\u588A\u7247)"
          },
          {
            code: "141X310",
            description: "141X310: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A614.1, \u9AD8\u5EA631(\u5E36\u588A\u7247)"
          },
          {
            code: "151X310",
            description: "151X310: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A615.1, \u9AD8\u5EA631(\u5E36\u588A\u7247)"
          },
          {
            code: "177X360",
            description: "177X360: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A617.7, \u9AD8\u5EA636(\u5E36\u588A\u7247)"
          },
          {
            code: "191X360",
            description: "191X360: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A619.1, \u9AD8\u5EA636(\u5E36\u588A\u7247)"
          },
          {
            code: "241X360",
            description: "241X360: \u5C0E\u5411\u92B7\u91D8\u76F4\u5F91\u03A624.1, \u9AD8\u5EA636(\u5E36\u588A\u7247)"
          }
        ]
      }
    ]
  },
  {
    id: "f_mq",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u7F38\u9644\u4EF6",
    group: "\u50B3\u611F\u5668\u8207\u5B89\u88DD\u9644\u4EF6",
    code: "F-MQ",
    name: "\u5713\u5F62\u7F38\u9AD4\u7528\u50B3\u611F\u5668\u5B89\u88DD\u9644\u4EF6",
    format: "{code} {spec}",
    categories: [
      {
        id: "code",
        name: "\u985E\u5225\u4EE3\u865F",
        options: [
          {
            code: "F-MQ",
            description: "F-MQ: \u5713\u5F62\u7F38\u9AD4\u7528\u50B3\u611F\u5668\u5B89\u88DD\u9644\u4EF6"
          }
        ]
      },
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "A20",
            description: "A20: \u03A620mm"
          },
          {
            code: "A25",
            description: "A25: \u03A625mm"
          },
          {
            code: "A32",
            description: "A32: \u03A632mm"
          },
          {
            code: "A40",
            description: "A40: \u03A640mm"
          },
          {
            code: "A50",
            description: "A50: \u03A650mm"
          },
          {
            code: "A63",
            description: "A63: \u03A663mm"
          },
          {
            code: "A80",
            description: "A80: \u03A680mm"
          },
          {
            code: "A32T",
            description: "A32T: \u03A632mm"
          },
          {
            code: "A40T",
            description: "A40T: \u03A640mm"
          },
          {
            code: "A50T",
            description: "A50T: \u03A650mm"
          },
          {
            code: "S06",
            description: "S06: \u03A66mm"
          },
          {
            code: "S08",
            description: "S08: \u03A68mm"
          },
          {
            code: "S10",
            description: "S10: \u03A610mm"
          },
          {
            code: "S12",
            description: "S12: \u03A612mm"
          },
          {
            code: "S16",
            description: "S16: \u03A616mm"
          },
          {
            code: "S20",
            description: "S20: \u03A620mm"
          },
          {
            code: "S25",
            description: "S25: \u03A625mm"
          },
          {
            code: "S32",
            description: "S32: \u03A632mm"
          },
          {
            code: "S40",
            description: "S40: \u03A640mm"
          },
          {
            code: "S50",
            description: "S50: \u03A650mm"
          },
          {
            code: "S63",
            description: "S63: \u03A663mm"
          }
        ]
      }
    ]
  },
  {
    id: "f_sc_sh",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u7F38\u9644\u4EF6",
    group: "\u50B3\u611F\u5668\u8207\u5B89\u88DD\u9644\u4EF6",
    code: "F-",
    name: "\u62C9\u6746\u7F38\u7528\u5B89\u88DD\u9644\u4EF6",
    format: "{code}{type} {spec}",
    categories: [
      {
        id: "code",
        name: "\u985E\u5225",
        options: [
          {
            code: "F-",
            description: "F-: \u9644\u4EF6"
          }
        ]
      },
      {
        id: "type",
        name: "\u985E\u578B",
        options: [
          {
            code: "SC",
            description: "SC: \u9069\u7528 SC, SGC"
          },
          {
            code: "SH",
            description: "SH: \u9069\u7528 SC, SGC"
          },
          {
            code: "ACT",
            description: "ACT: \u9069\u7528 ACT"
          }
        ]
      },
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "32",
            description: "32"
          },
          {
            code: "50",
            description: "50"
          },
          {
            code: "63",
            description: "63"
          },
          {
            code: "80",
            description: "80"
          },
          {
            code: "125",
            description: "125"
          },
          {
            code: "160",
            description: "160"
          },
          {
            code: "200",
            description: "200"
          },
          {
            code: "250",
            description: "250"
          }
        ]
      }
    ]
  },
  {
    id: "joint",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u7F38\u9644\u4EF6",
    group: "\u6D3B\u585E\u6746\u7AEF\u9023\u63A5\u9644\u4EF6",
    code: "F-M",
    name: "\u6C23\u7F38\u6D3B\u585E\u6746\u7AEF\u9023\u63A5\u9644\u4EF6",
    format: "{code}{thread} {type}",
    categories: [
      {
        id: "thread",
        name: "\u87BA\u7D0B\u898F\u683C\u8207\u7259\u8DDD",
        options: [
          {
            code: "3X050",
            description: "M3x0.5"
          },
          {
            code: "4X070",
            description: "M4x0.7"
          },
          {
            code: "5X080",
            description: "M5x0.8"
          },
          {
            code: "6X100",
            description: "M6x1.0"
          },
          {
            code: "8X125",
            description: "M8x1.25"
          },
          {
            code: "10X125",
            description: "M10x1.25"
          },
          {
            code: "12X125",
            description: "M12x1.25"
          },
          {
            code: "14X150",
            description: "M14x1.5"
          },
          {
            code: "16X150",
            description: "M16x1.5"
          },
          {
            code: "18X150",
            description: "M18x1.5"
          },
          {
            code: "20X150",
            description: "M20x1.5"
          },
          {
            code: "22X150",
            description: "M22x1.5"
          },
          {
            code: "26X150",
            description: "M26x1.5"
          },
          {
            code: "27X200",
            description: "M27x2.0"
          },
          {
            code: "36X200",
            description: "M36x2.0"
          },
          {
            code: "42X200",
            description: "M42x2.0"
          }
        ]
      },
      {
        id: "type",
        name: "\u9644\u4EF6\u985E\u5225",
        options: [
          {
            code: "I",
            description: "I: I\u63A5\u982D"
          },
          {
            code: "Y",
            description: "Y: Y\u63A5\u982D"
          },
          {
            code: "F",
            description: "F: \u6D6E\u52D5\u63A5\u982D"
          },
          {
            code: "U",
            description: "U: \u9B5A\u773C\u63A5\u982D"
          }
        ]
      }
    ]
  },
  {
    id: "ma",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8FF7\u4F60\u6C23\u7F38",
    group: "MA\u7CFB\u5217",
    code: "",
    name: "MA\u7CFB\u5217 \u4E0D\u92B9\u92FC\u8FF7\u4F60\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{rear_cover}{mounting}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "MA",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "MAC",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u7DE9\u885D\u53EF\u8ABF\u578B)"
          },
          {
            code: "MSA",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "MTA",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "MAD",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u578B)"
          },
          {
            code: "MACD",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u7DE9\u885D\u53EF\u8ABF\u578B)"
          },
          {
            code: "MAJ",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          },
          {
            code: "MACJ",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u7DE9\u885D\u53EF\u8ABF\u578B)"
          },
          {
            code: "MAR",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u53EF\u8ABF\u7DE9\u885D\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "rear_cover",
        name: "\u5F8C\u84CB\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u8A18\u865F"
          },
          {
            code: "CA",
            description: "\u5C3E\u84CB\u578B"
          },
          {
            code: "U",
            description: "U\u578B"
          },
          {
            code: "CM",
            description: "CM\u578B"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "FA",
            description: "\u524D\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "SDB",
            description: "\u5F8C\u6558\u56FA\u5B9A\u67B6"
          },
          {
            code: "LB",
            description: "\u8EF8\u5411\u56FA\u5B9A\u67B6"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.103"
  },
  {
    id: "mbl",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8FF7\u4F60\u6C23\u7F38",
    group: "MBL\u7CFB\u5217",
    code: "",
    name: "MBL\u7CFB\u5217 \u92C1\u5408\u91D1\u8FF7\u4F60\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{rear_cover}{mounting}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "MBL",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "MBLC",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u7DE9\u885D\u53EF\u8ABF\u578B)"
          },
          {
            code: "MSBL",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "MTBL",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "MBLD",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u578B)"
          },
          {
            code: "MBLCD",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u7DE9\u885D\u53EF\u8ABF\u578B)"
          },
          {
            code: "MBLJ",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          },
          {
            code: "MBLCJ",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u7DE9\u885D\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "rear_cover",
        name: "\u5F8C\u84CB\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u8A18\u865F"
          },
          {
            code: "CA",
            description: "\u5C3E\u84CB\u578B"
          },
          {
            code: "U",
            description: "U\u578B"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "FA",
            description: "\u524D\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "SDB",
            description: "\u5F8C\u6558\u56FA\u5B9A\u67B6"
          },
          {
            code: "LB",
            description: "\u8EF8\u5411\u56FA\u5B9A\u67B6"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.111"
  },
  {
    id: "mf",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8FF7\u4F60\u6C23\u7F38",
    group: "MF\u7CFB\u5217",
    code: "",
    name: "MF\u7CFB\u5217 \u4E0D\u92B9\u92FC\u8FF7\u4F60\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{rear_cover}{mounting}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "MF",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "MFC",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u7DE9\u885D\u53EF\u8ABF\u578B)"
          },
          {
            code: "MSF",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "MTF",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "MFD",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u578B)"
          },
          {
            code: "MFCD",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u7DE9\u885D\u53EF\u8ABF\u578B)"
          },
          {
            code: "MFJ",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          },
          {
            code: "MFCJ",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u7DE9\u885D\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "rear_cover",
        name: "\u5F8C\u84CB\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u8A18\u865F"
          },
          {
            code: "CA",
            description: "\u5C3E\u84CB\u578B"
          },
          {
            code: "U",
            description: "U\u578B"
          },
          {
            code: "CM",
            description: "CM\u578B"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "FA",
            description: "\u524D\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "SDB",
            description: "\u5F8C\u6558\u56FA\u5B9A\u67B6"
          },
          {
            code: "LB",
            description: "\u8EF8\u5411\u56FA\u5B9A\u67B6"
          },
          {
            code: "TC",
            description: "\u4E2D\u9593\u8033\u8EF8\u652F\u67B6"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.91"
  },
  {
    id: "mg",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8FF7\u4F60\u6C23\u7F38",
    group: "MG\u7CFB\u5217",
    code: "",
    name: "MG\u7CFB\u5217 \u4E0D\u92B9\u92FC\u8FF7\u4F60\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{rear_cover}{mounting}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "MG",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "MGC",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u7DE9\u885D\u53EF\u8ABF\u578B)"
          },
          {
            code: "MSG",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "MTG",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "MGD",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u578B)"
          },
          {
            code: "MGCD",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u7DE9\u885D\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "rear_cover",
        name: "\u5F8C\u84CB\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u8A18\u865F"
          },
          {
            code: "FA",
            description: "\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "LB",
            description: "\u8EF8\u5411\u56FA\u5B9A\u67B6"
          },
          {
            code: "CB",
            description: "\u96D9\u8033\u74B0\u578B"
          },
          {
            code: "SDB",
            description: "\u6558\u56FA\u5B9A\u67B6"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "FA",
            description: "\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "LB",
            description: "\u8EF8\u5411\u56FA\u5B9A\u67B6"
          },
          {
            code: "CB",
            description: "\u96D9\u8033\u74B0\u578B"
          },
          {
            code: "SDB",
            description: "\u6558\u56FA\u5B9A\u67B6"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.97"
  },
  {
    id: "mi",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8FF7\u4F60\u6C23\u7F38",
    group: "MI\u7CFB\u5217",
    code: "",
    name: "MI\u7CFB\u5217 \u4E0D\u92B9\u92FC\u8FF7\u4F60\u6C23\u7F38(ISO6432)",
    format: "{series}{bore}x{stroke}{magnet}{rear_cover}{mounting}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "MI",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "MIC",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u5FA9\u52D5\u7DE9\u885D\u53EF\u8ABF\u578B)"
          },
          {
            code: "MSI",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "MTI",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "MID",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u578B)"
          },
          {
            code: "MICD",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u7DE9\u885D\u53EF\u8ABF\u578B)"
          },
          {
            code: "MIJ",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          },
          {
            code: "MICJ",
            description: "\u8FF7\u4F60\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u7DE9\u885D\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "rear_cover",
        name: "\u5F8C\u84CB\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u8A18\u865F"
          },
          {
            code: "CA",
            description: "\u5C3E\u84CB\u578B"
          },
          {
            code: "U",
            description: "U\u578B"
          },
          {
            code: "R",
            description: "R\u578B"
          },
          {
            code: "CM",
            description: "CM\u578B"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "FA",
            description: "\u524D\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "SDB",
            description: "\u5F8C\u6558\u56FA\u5B9A\u67B6"
          },
          {
            code: "LB",
            description: "\u8EF8\u5411\u56FA\u5B9A\u67B6"
          },
          {
            code: "TC",
            description: "\u4E2D\u9593\u8033\u8EF8\u652F\u67B6"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.74"
  },
  {
    id: "pb",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8FF7\u4F60\u6C23\u7F38",
    group: "PB\u7CFB\u5217",
    code: "",
    name: "PB\u7CFB\u5217 \u7B46\u5F62\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{rear_cover}{mounting}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PB",
            description: "\u7B46\u5F62\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "PSB",
            description: "\u7B46\u5F62\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "PTB",
            description: "\u7B46\u5F62\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "PBD",
            description: "\u7B46\u5F62\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u578B)"
          },
          {
            code: "PBJ",
            description: "\u7B46\u5F62\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "rear_cover",
        name: "\u5F8C\u84CB\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u8A18\u865F"
          },
          {
            code: "CB",
            description: "\u96D9\u8033\u74B0\u578B"
          },
          {
            code: "U",
            description: "U\u578B"
          },
          {
            code: "R",
            description: "R\u578B"
          },
          {
            code: "PBD",
            description: "PBD\u578B"
          },
          {
            code: "PBJ",
            description: "PBJ\u578B"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "FA",
            description: "\u524D\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "LB",
            description: "\u8EF8\u5411\u56FA\u5B9A\u67B6"
          },
          {
            code: "CJ",
            description: "\u8173\u5EA7\u578B"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.83"
  },
  {
    id: "pbr",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8FF7\u4F60\u6C23\u7F38",
    group: "PBR\u7CFB\u5217",
    code: "",
    name: "PBR\u7CFB\u5217 \u7B46\u5F62\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{rear_cover}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PBR",
            description: "\u7B46\u5F62\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "PSBR",
            description: "\u7B46\u5F62\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "PTBR",
            description: "\u7B46\u5F62\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "rear_cover",
        name: "\u5F8C\u84CB\u578B\u5F0F",
        options: [
          {
            code: "PBR",
            description: "PBR\u578B"
          },
          {
            code: "PSBR",
            description: "PSBR\u578B"
          },
          {
            code: "PTBR",
            description: "PTBR\u578B"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.87"
  },
  {
    id: "tmic",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u5E36\u5C0E\u5411\u67B6\u6C23\u7F38",
    group: "TMI/TMIC\u7CFB\u5217",
    code: "",
    name: "TMI/TMIC\u7CFB\u5217 \u5E36\u5C0E\u5411\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "TMIC",
            description: "\u5E36\u5C0E\u5411\u6C23\u7F38(\u53EF\u8ABF\u7DE9\u885D\u578B)"
          },
          {
            code: "TMI",
            description: "\u5E36\u5C0E\u5411\u6C23\u7F38"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "\u8EF8\u627F\u985E\u5225: M\u70BA\u92FC\u5957\u8EF8\u627F, L\u70BA\u76F4\u7DDA\u8EF8\u627F\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.80"
  },
  {
    id: "ace",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8D85\u8584\u6C23\u7F38",
    group: "ACE\u7CFB\u5217\u7DCA\u6E4A\u578B",
    code: "",
    name: "ACE\u7CFB\u5217 \u7DCA\u6E4A\u578B\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{port_type}{mounting_type}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "ACE",
            description: "\u7DCA\u6E4A\u578B\u6C23\u7F38(\u8907\u52D5\u578B)"
          },
          {
            code: "ASE",
            description: "\u7DCA\u6E4A\u578B\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "ATE",
            description: "\u7DCA\u6E4A\u578B\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "TACE",
            description: "\u7DCA\u6E4A\u578B\u6C23\u7F38(\u8907\u52D5\u5E36\u5C0E\u687F\u578B)"
          },
          {
            code: "TACED",
            description: "\u7DCA\u6E4A\u578B\u6C23\u7F38(\u8907\u52D5\u5E36\u5C0E\u687F\u578B)"
          },
          {
            code: "ACED",
            description: "\u7DCA\u6E4A\u578B\u6C23\u7F38(\u96D9\u8EF8\u8907\u52D5\u578B)"
          },
          {
            code: "ACEJ",
            description: "\u7DCA\u6E4A\u578B\u6C23\u7F38(\u96D9\u8EF8\u8907\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "5",
            description: "5mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "35",
            description: "35mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "45",
            description: "45mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "port_type",
        name: "\u6D3B\u585E\u687F\u7259\u578B",
        options: [
          {
            code: "",
            description: "\u5167\u7259\u578B"
          },
          {
            code: "B",
            description: "\u5916\u7259\u578B"
          }
        ]
      },
      {
        id: "mounting_type",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "FA",
            description: "\u524D\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "FB",
            description: "\u5F8C\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "CA",
            description: "\u55AE\u8033\u56FA\u5B9A\u5EA7"
          },
          {
            code: "CB",
            description: "\u96D9\u8033\u56FA\u5B9A\u5EA7"
          },
          {
            code: "LB",
            description: "\u8EF8\u5411\u56FA\u5B9A\u5EA7"
          },
          {
            code: "CR",
            description: "\u55AE\u8033\u9023\u63A5\u5EA7"
          },
          {
            code: "FTC",
            description: "\u524D\u84CB\u8033\u8EF8\u652F\u67B6"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.117"
  },
  {
    id: "acq",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8D85\u8584\u6C23\u7F38",
    group: "ACQ\u7CFB\u5217",
    code: "",
    name: "ACQ\u7CFB\u5217 \u8D85\u8584\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{port_type}{mounting_type}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "ACQ",
            description: "\u8D85\u8584\u6C23\u7F38(\u8907\u52D5\u578B)"
          },
          {
            code: "ASQ",
            description: "\u8D85\u8584\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "ATQ",
            description: "\u8D85\u8584\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "ACQD",
            description: "\u8D85\u8584\u6C23\u7F38(\u96D9\u8EF8\u8907\u52D5\u578B)"
          },
          {
            code: "ACQJ",
            description: "\u8D85\u8584\u6C23\u7F38(\u96D9\u8EF8\u8907\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "5",
            description: "5mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "port_type",
        name: "\u6D3B\u585E\u687F\u7259\u578B",
        options: [
          {
            code: "",
            description: "\u5167\u7259\u578B"
          },
          {
            code: "B",
            description: "\u5916\u7259\u578B"
          }
        ]
      },
      {
        id: "mounting_type",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "FA",
            description: "\u524D\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "FB",
            description: "\u5F8C\u6CD5\u862D\u9023\u63A5\u677F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.125"
  },
  {
    id: "acq-large",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8D85\u8584\u6C23\u7F38",
    group: "ACQ\u7CFB\u5217(\u5927\u7F38\u5F91)",
    code: "",
    name: "ACQ\u7CFB\u5217 \u5927\u7F38\u5F91\u8D85\u8584\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{port_type}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "ACQ",
            description: "\u8D85\u8584\u6C23\u7F38(\u8907\u52D5\u578B)"
          },
          {
            code: "ACQD",
            description: "\u8D85\u8584\u6C23\u7F38(\u96D9\u8EF8\u8907\u52D5\u578B)"
          },
          {
            code: "ACQJ",
            description: "\u8D85\u8584\u6C23\u7F38(\u96D9\u8EF8\u8907\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "140",
            description: "140mm"
          },
          {
            code: "160",
            description: "160mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "port_type",
        name: "\u6D3B\u585E\u687F\u7259\u578B",
        options: [
          {
            code: "",
            description: "\u5167\u7259\u578B"
          },
          {
            code: "B",
            description: "\u5916\u7259\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5927\u7F38\u5F91\u7CFB\u5217\u50C5\u63D0\u4F9B\u8907\u52D5\u578B\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.129"
  },
  {
    id: "acq-long",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8D85\u8584\u6C23\u7F38",
    group: "ACQ\u7CFB\u5217(\u9577\u884C\u7A0B)",
    code: "",
    name: "ACQ\u7CFB\u5217 \u9577\u884C\u7A0B\u8D85\u8584\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{port_type}{mounting_type}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "ACQ",
            description: "\u8D85\u8584\u6C23\u7F38(\u8907\u52D5\u578B)"
          },
          {
            code: "ACQD",
            description: "\u8D85\u8584\u6C23\u7F38(\u96D9\u8EF8\u8907\u52D5\u578B)"
          },
          {
            code: "ACQJ",
            description: "\u8D85\u8584\u6C23\u7F38(\u96D9\u8EF8\u8907\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "port_type",
        name: "\u6D3B\u585E\u687F\u7259\u578B",
        options: [
          {
            code: "",
            description: "\u5167\u7259\u578B"
          },
          {
            code: "B",
            description: "\u5916\u7259\u578B"
          }
        ]
      },
      {
        id: "mounting_type",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "FA",
            description: "\u524D\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "FB",
            description: "\u5F8C\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "LB",
            description: "\u8EF8\u5411\u56FA\u5B9A\u5EA7"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u9577\u884C\u7A0B\u578B\u9069\u7528\u65BC\u8F03\u9577\u884C\u7A0B\u9700\u6C42\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.131"
  },
  {
    id: "tacq",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8D85\u8584\u6C23\u7F38",
    group: "ACQ\u7CFB\u5217(\u5E36\u5C0E\u687F)",
    code: "",
    name: "ACQ\u7CFB\u5217 \u5E36\u5C0E\u687F\u8D85\u8584\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{port_type}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "TACQ",
            description: "\u8D85\u8584\u6C23\u7F38(\u8907\u52D5\u5E36\u5C0E\u687F\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "5",
            description: "5mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "35",
            description: "35mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "45",
            description: "45mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "port_type",
        name: "\u6D3B\u585E\u687F\u7259\u578B",
        options: [
          {
            code: "",
            description: "\u5167\u7259\u578B"
          },
          {
            code: "B",
            description: "\u5916\u7259\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u5E36\u5C0E\u687F\u7D50\u69CB\uFF0C\u5177\u6709\u826F\u597D\u7684\u6297\u5F4E\u66F2\u53CA\u6297\u626D\u8F49\u6027\u80FD\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.133"
  },
  {
    id: "act",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8D85\u8584\u6C23\u7F38",
    group: "ACT\u7CFB\u5217",
    code: "",
    name: "ACT\u7CFB\u5217 \u8D85\u8584\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{port_type}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "ACT",
            description: "\u8D85\u8584\u6C23\u7F38(\u8907\u52D5\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "140",
            description: "140mm"
          },
          {
            code: "160",
            description: "160mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "250",
            description: "250mm"
          },
          {
            code: "300",
            description: "300mm"
          },
          {
            code: "350",
            description: "350mm"
          },
          {
            code: "400",
            description: "400mm"
          },
          {
            code: "450",
            description: "450mm"
          },
          {
            code: "500",
            description: "500mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "port_type",
        name: "\u6D3B\u585E\u687F\u7259\u578B",
        options: [
          {
            code: "",
            description: "\u5167\u7259\u578B"
          },
          {
            code: "B",
            description: "\u5916\u7259\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "ACT\u7CFB\u5217\u70BA\u5927\u7F38\u5F91\u8D85\u8584\u6C23\u7F38\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.138"
  },
  {
    id: "sda",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u8D85\u8584\u6C23\u7F38",
    group: "SDA\u7CFB\u5217",
    code: "",
    name: "SDA\u7CFB\u5217 \u8D85\u8584\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{port_type}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "SDA",
            description: "\u8D85\u8584\u6C23\u7F38(\u8907\u52D5\u578B)"
          },
          {
            code: "SSA",
            description: "\u8D85\u8584\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "STA",
            description: "\u8D85\u8584\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "SDAD",
            description: "\u8D85\u8584\u6C23\u7F38(\u96D9\u8EF8\u8907\u52D5\u578B)"
          },
          {
            code: "SDAJ",
            description: "\u8D85\u8584\u6C23\u7F38(\u96D9\u8EF8\u8907\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "5",
            description: "5mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "35",
            description: "35mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "45",
            description: "45mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "70",
            description: "70mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "85",
            description: "85mm"
          },
          {
            code: "90",
            description: "90mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "110",
            description: "110mm"
          },
          {
            code: "120",
            description: "120mm"
          },
          {
            code: "130",
            description: "130mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "port_type",
        name: "\u6D3B\u585E\u687F\u7259\u578B",
        options: [
          {
            code: "",
            description: "\u5167\u7259\u578B"
          },
          {
            code: "B",
            description: "\u5916\u7259\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    note: "SDA\u7CFB\u5217\u70BA\u8D85\u8584\u6C23\u7F38\uFF0C\u53E6\u6709SDAT(\u8907\u52D5\u591A\u4F4D\u7F6E\u578B)\u8207SDAW(\u8907\u52D5\u96D9\u8EF8\u591A\u4F4D\u7F6E\u578B)\u8A02\u8CFC\u78BC\u683C\u5F0F\u7565\u6709\u4E0D\u540C\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.139"
  },
  {
    id: "hgs",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u7CBE\u5BC6\u6ED1\u53F0\u6C23\u7F38",
    group: "HGS\u7CFB\u5217",
    code: "HGS",
    name: "HGS\u7CFB\u5217 \u5FAE\u578B\u7CBE\u5BC6\u6ED1\u81FA\u6C23\u7F38",
    format: "HGS{bore}x{stroke}{magnet}{adjustment}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "5",
            description: "5mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3\u53CA\u50B3\u611F\u5668\u56FA\u5B9A\u5EA7"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3\u53CA\u50B3\u611F\u5668\u56FA\u5B9A\u5EA7"
          }
        ]
      },
      {
        id: "adjustment",
        name: "\u884C\u7A0B\u8ABF\u6574\u88DD\u7F6E",
        options: [
          {
            code: "",
            description: "\u7121"
          },
          {
            code: "J",
            description: "\u9644\u884C\u7A0B\u8ABF\u6574\u88DD\u7F6E"
          }
        ]
      }
    ],
    note: "\u7F38\u5F9110\u300112\u53EF\u9078\u6CB9\u58D3\u7DE9\u885D\u5668\u9032\u884C\u66FF\u63DB\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.175"
  },
  {
    id: "hlf",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u7CBE\u5BC6\u6ED1\u53F0\u6C23\u7F38",
    group: "HLF\u7CFB\u5217",
    code: "HLF",
    name: "HLF\u7CFB\u5217 \u8D85\u8584\u578B\u7CBE\u5BC6\u6ED1\u81FA\u6C23\u7F38",
    format: "HLF{bore}x{stroke}{magnet}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.188"
  },
  {
    id: "hlh",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u7CBE\u5BC6\u6ED1\u53F0\u6C23\u7F38",
    group: "HLH\u7CFB\u5217",
    code: "HLH",
    name: "HLH\u7CFB\u5217 \u5074\u8ECC\u578B\u7CBE\u5BC6\u6ED1\u81FA\u6C23\u7F38",
    format: "HLH{bore}x{stroke}{magnet}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "5",
            description: "5mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.202"
  },
  {
    id: "hlq",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u7CBE\u5BC6\u6ED1\u53F0\u6C23\u7F38",
    group: "HLQ/HLQL\u7CFB\u5217",
    code: "",
    name: "HLQ\u3001HLQL\u7CFB\u5217 \u96D9\u8EF8\u578B\u7CBE\u5BC6\u6ED1\u81FA\u6C23\u7F38(\u5FAA\u74B0\u6EFE\u73E0)",
    format: "{type}{bore}x{stroke}{magnet}{external}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "HLQ",
            description: "\u96D9\u8EF8\u578B\u7CBE\u5BC6\u6ED1\u81FA\u6C23\u7F38(\u5FAA\u74B0\u6EFE\u73E0)(\u6A19\u6E96\u578B)"
          },
          {
            code: "HLQL",
            description: "\u96D9\u8EF8\u578B\u7CBE\u5BC6\u6ED1\u81FA\u6C23\u7F38(\u5FAA\u74B0\u6EFE\u73E0)(\u5C0D\u7A31\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "external",
        name: "\u5916\u90E8\u589E\u584A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5916\u90E8\u589E\u584A(\u57FA\u672C\u578B)"
          },
          {
            code: "A",
            description: "\u5169\u7AEF\u884C\u7A0B\u8ABF\u6574\u87BA\u7D72"
          },
          {
            code: "B",
            description: "\u5169\u7AEF\u6CB9\u58D3\u7DE9\u885D\u5668"
          },
          {
            code: "AS",
            description: "\u524D\u7AEF\u884C\u7A0B\u8ABF\u6574\u87BA\u7D72"
          },
          {
            code: "BS",
            description: "\u524D\u7AEF\u6CB9\u58D3\u7DE9\u885D\u5668"
          },
          {
            code: "AF",
            description: "\u5F8C\u7AEF\u884C\u7A0B\u8ABF\u6574\u87BA\u7D72"
          },
          {
            code: "BF",
            description: "\u5F8C\u7AEF\u6CB9\u58D3\u7DE9\u885D\u5668"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u7F38\u5F916\u7121\u6CB9\u58D3\u7DE9\u885D\u5668\u578B(\u7121B\u578B\u3001BS\u578B\u3001BF\u578B\u53EF\u9078)\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.211"
  },
  {
    id: "hls",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u7CBE\u5BC6\u6ED1\u53F0\u6C23\u7F38",
    group: "HLS/HLSL\u7CFB\u5217",
    code: "",
    name: "HLS\u3001HLSL\u7CFB\u5217 \u96D9\u8EF8\u578B\u7CBE\u5BC6\u6ED1\u81FA\u6C23\u7F38(\u6EFE\u67F1\u578B)",
    format: "{type}{bore}x{stroke}{magnet}{external}{thread}",
    categories: [
      {
        id: "type",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "HLS",
            description: "\u96D9\u8EF8\u578B\u7CBE\u5BC6\u6ED1\u81FA\u6C23\u7F38(\u6EFE\u67F1\u578B)(\u6A19\u6E96\u578B)"
          },
          {
            code: "HLSL",
            description: "\u96D9\u8EF8\u578B\u7CBE\u5BC6\u6ED1\u81FA\u6C23\u7F38(\u6EFE\u67F1\u578B)(\u5C0D\u7A31\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "external",
        name: "\u5916\u90E8\u589E\u584A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5916\u90E8\u589E\u584A(\u57FA\u672C\u578B)"
          },
          {
            code: "A",
            description: "\u5169\u7AEF\u884C\u7A0B\u8ABF\u6574\u87BA\u7D72"
          },
          {
            code: "B",
            description: "\u5169\u7AEF\u6CB9\u58D3\u7DE9\u885D\u5668"
          },
          {
            code: "AS",
            description: "\u524D\u7AEF\u884C\u7A0B\u8ABF\u6574\u87BA\u7D72"
          },
          {
            code: "BS",
            description: "\u524D\u7AEF\u6CB9\u58D3\u7DE9\u885D\u5668"
          },
          {
            code: "AF",
            description: "\u5F8C\u7AEF\u884C\u7A0B\u8ABF\u6574\u87BA\u7D72"
          },
          {
            code: "BF",
            description: "\u5F8C\u7AEF\u6CB9\u58D3\u7DE9\u885D\u5668"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u7F38\u5F916\u7121\u6CB9\u58D3\u7DE9\u885D\u5668\u578B(\u7121B\u578B\u3001BS\u578B\u3001BF\u578B\u53EF\u9078)\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.228"
  },
  {
    id: "stw",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u7CBE\u5BC6\u6ED1\u53F0\u6C23\u7F38",
    group: "STW\u7CFB\u5217",
    code: "STW",
    name: "STW\u7CFB\u5217 \u6ED1\u81FA\u6C23\u7F38",
    format: "STW{type}{bore}x{stroke}{magnet}{thread}",
    categories: [
      {
        id: "type",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "A",
            description: "\u56FA\u5B9A\u677F\u56FA\u5B9A\u578B"
          },
          {
            code: "B",
            description: "\u672C\u9AD4\u56FA\u5B9A\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.194"
  },
  {
    id: "tcl",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u4E09\u8EF8\u6C23\u7F38",
    group: "TCL/TCM\u7CFB\u5217",
    code: "TC",
    name: "TCL\u3001TCM\u7CFB\u5217 \u4E09\u8EF8\u6C23\u7F38",
    format: "TC{bearing}{series}{bore}-{stroke}{adjustment}{magnet}{thread}",
    categories: [
      {
        id: "bearing",
        name: "\u8EF8\u627F\u4EE3\u865F",
        options: [
          {
            code: "L",
            description: "L:\u76F4\u7DDA\u8EF8\u627F"
          },
          {
            code: "M",
            description: "M:\u9285\u5957\u8EF8\u627F"
          }
        ]
      },
      {
        id: "series",
        name: "\u985E\u5225\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7A7A\u767D:\u6A19\u6E96\u578B"
          },
          {
            code: "J",
            description: "J:\u884C\u7A0B\u53EF\u8ABF\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "5",
            description: "5mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "70",
            description: "70mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "90",
            description: "90mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          },
          {
            code: "225",
            description: "225mm"
          },
          {
            code: "250",
            description: "250mm"
          }
        ]
      },
      {
        id: "adjustment",
        name: "\u8ABF\u6574\u884C\u7A0B",
        options: [
          {
            code: "",
            description: "\u7121\u4EE3\u78BC"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "TC\u7CFB\u5217\u5168\u9644\u78C1\u3002\u63A5\u7BA1\u70BAM5\u7259\u6642\uFF0C\u6B64\u9805\u4EE3\u78BC\u70BA\u7A7A\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.169"
  },
  {
    id: "tn",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u96D9\u8EF8\u6C23\u7F38",
    group: "TN\u7CFB\u5217",
    code: "TN",
    name: "TN\u7CFB\u5217 \u96D9\u8EF8\u6C23\u7F38",
    format: "TN{bore}{stroke}{magnet}{thread}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "70",
            description: "70mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "90",
            description: "90mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    note: "TN\u7CFB\u5217\u5168\u9644\u78C1\u3002\u63A5\u7BA1\u70BAM5\u7259\u6642\uFF0C\u6B64\u9805\u4EE3\u78BC\u70BA\u7A7A\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.163"
  },
  {
    id: "tr",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u96D9\u8EF8\u6C23\u7F38",
    group: "TR\u7CFB\u5217",
    code: "TR",
    name: "TR\u7CFB\u5217 \u96D9\u8EF8\u6C23\u7F38",
    format: "TR{bore}{stroke}{magnet}{thread}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "70",
            description: "70mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "90",
            description: "90mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          },
          {
            code: "175",
            description: "175mm"
          },
          {
            code: "200",
            description: "200mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "TR\u7CFB\u5217\u5168\u9644\u78C1\u3002\u63A5\u7BA1\u70BAM5\u7259\u6642\uFF0C\u6B64\u9805\u4EE3\u78BC\u70BA\u7A7A\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.165"
  },
  {
    id: "rmh",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u78C1\u8026\u5408\u7121\u6746\u6C23\u7F38",
    group: "RMH\u7CFB\u5217",
    code: "RMH",
    name: "RMH\u7CFB\u5217 \u78C1\u8026\u5408\u7121\u687F\u6C23\u7F38",
    format: "RMH{bore}S{magnet}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      }
    ],
    note: "\u578B\u865F\u4E2D\u7A7A\u767D\u8868\u793A\u516C\u5236M\u7259\u6216PT\u7259\uFF0C\u03A610\\\u03A616\u7F38\u5F91\u7947\u6709\u516C\u5236M\u7259\uFF0C\u8A02\u8CFCG\u7259\u6216NPT\u7259\u898F\u683C\u6642\u9700\u52A0\u8A3BG\u6216T\u4EE3\u78BC\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.259"
  },
  {
    id: "rms",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u78C1\u8026\u5408\u7121\u6746\u6C23\u7F38",
    group: "RMS\u7CFB\u5217",
    code: "RMS",
    name: "RMS\u7CFB\u5217 \u78C1\u8026\u5408\u7121\u687F\u6C23\u7F38",
    format: "RMS{bore}x{stroke}{fixed_type}{thread}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "200",
            description: "\u884C\u7A0B\u6578\u503C"
          }
        ]
      },
      {
        id: "fixed_type",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "P",
            description: "\u5C3A\u5BF8\u898F\u683CP\u578B"
          },
          {
            code: "F",
            description: "\u5C3A\u5BF8\u898F\u683CF\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "RMSF40\u578B\u7121FA\u5B89\u88DD\u9644\u4EF6\uFF1B\u7259\u578B\u4EE3\u78BC\u4E2D\u7A7A\u767D\u8868\u793A\u516C\u5236M\u7259\u6216PT\u7259\uFF0C\u03A610\\\u03A616\u7F38\u5F91\u7947\u6709\u516C\u5236M\u7259\uFF0C\u8A02\u8CFCG\u7259\u6216NPT\u7259\u898F\u683C\u6642\u9700\u52A0\u8A3BG\u6216T\u4EE3\u78BC\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.246"
  },
  {
    id: "rmt",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u78C1\u8026\u5408\u7121\u6746\u6C23\u7F38",
    group: "RMT\u7CFB\u5217",
    code: "RMT",
    name: "RMT\u7CFB\u5217 \u78C1\u8026\u5408\u7121\u687F\u6C23\u7F38(\u5C0E\u687F\u578B)",
    format: "RMT{bore}x{stroke}S{cushion}{thread}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "20",
            description: "\u884C\u7A0B\u6578\u503C"
          }
        ]
      },
      {
        id: "cushion",
        name: "\u7DE9\u885D\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u8ABF\u6574\u87BA\u7D722\u500B"
          },
          {
            code: "A",
            description: "\u6CB9\u58D3\u7DE9\u885D\u56682\u500B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u7259\u578B\u4EE3\u78BC\u4E2D\u7A7A\u767D\u8868\u793A\u516C\u5236M\u7259\u6216PT\u7259\uFF0C\u03A616\u7F38\u5F91\u7947\u6709\u516C\u5236M\u7259\uFF0C\u8A02\u8CFCG\u7259\u6216NPT\u7259\u898F\u683C\u6642\u9700\u52A0\u8A3BG\u6216T\u4EE3\u78BC\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.250"
  },
  {
    id: "rmtl",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u78C1\u8026\u5408\u7121\u6746\u6C23\u7F38",
    group: "RMTL\u7CFB\u5217",
    code: "RMTL",
    name: "RMTL\u7CFB\u5217 \u78C1\u8026\u5408\u7121\u687F\u6C23\u7F38(\u7CBE\u5BC6\u5C0E\u687F\u578B)",
    format: "RMTL{bore}x{stroke}S{cushion}{thread}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "20",
            description: "\u884C\u7A0B\u6578\u503C"
          }
        ]
      },
      {
        id: "cushion",
        name: "\u7DE9\u885D\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u8ABF\u6574\u87BA\u7D722\u500B"
          },
          {
            code: "A",
            description: "\u6CB9\u58D3\u7DE9\u885D\u56682\u500B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "M5"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u9078\u64C7\u6CB9\u58D3\u7DE9\u885D\u5668\u7DE9\u885D\u6642\uFF0C\u5169\u500B\u8ABF\u6574\u87BA\u7D72\u4E00\u540C\u9644\u5E36\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.255"
  },
  {
    id: "hrq",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u56DE\u8F49\u6C23\u7F38",
    group: "HRQ\u7CFB\u5217",
    code: "HRQ",
    name: "HRQ\u7CFB\u5217 \u56DE\u8F49\u6C23\u7F38",
    format: "HRQ{size}{cushion}{thread}",
    categories: [
      {
        id: "size",
        name: "\u898F\u683C",
        options: [
          {
            code: "2",
            description: "2"
          },
          {
            code: "3",
            description: "3"
          },
          {
            code: "7",
            description: "7"
          },
          {
            code: "10",
            description: "10"
          },
          {
            code: "20",
            description: "20"
          },
          {
            code: "30",
            description: "30"
          },
          {
            code: "50",
            description: "50"
          },
          {
            code: "70",
            description: "70"
          },
          {
            code: "100",
            description: "100"
          },
          {
            code: "200",
            description: "200"
          }
        ]
      },
      {
        id: "cushion",
        name: "\u7DE9\u885D\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u56FA\u5B9A\u7DE9\u885D"
          },
          {
            code: "A",
            description: "\u6CB9\u58D3\u7DE9\u885D\u5668\u7DE9\u885D"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "HRQ2/3/7\u50C5\u6709\u8ABF\u6574\u87BA\u7D72\u56FA\u5B9A\u7DE9\u885D\u65B9\u5F0F\uFF0C\u7121\u6CB9\u58D3\u7DE9\u885D\u5668\u7DE9\u885D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.264"
  },
  {
    id: "hrs",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u56DE\u8F49\u6C23\u7F38",
    group: "HRS\u7CFB\u5217",
    code: "HRS",
    name: "HRS\u7CFB\u5217 \u56DE\u8F49\u6C23\u7F38",
    format: "HRS{size}{angle}{thread}",
    categories: [
      {
        id: "size",
        name: "\u898F\u683C",
        options: [
          {
            code: "10",
            description: "10"
          },
          {
            code: "15",
            description: "15"
          },
          {
            code: "20",
            description: "20"
          },
          {
            code: "30",
            description: "30"
          },
          {
            code: "40",
            description: "40"
          }
        ]
      },
      {
        id: "angle",
        name: "\u64FA\u52D5\u89D2\u5EA6",
        options: [
          {
            code: "90",
            description: "90\xB0"
          },
          {
            code: "180",
            description: "180\xB0"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "HRS\u7CFB\u5217\u5168\u90E8\u70BA\u9644\u588A\u7DE9\u885D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.273"
  },
  {
    id: "md",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u5C0F\u578B\u591A\u4F4D\u7F6E\u3001\u81EA\u7531\u5B89\u88DD\u6C23\u7F38",
    group: "MD/MK\u7CFB\u5217",
    code: "",
    name: "MD\u7CFB\u5217 \u591A\u4F4D\u7F6E\u56FA\u5B9A\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "MD",
            description: "\u591A\u578B\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "MSD",
            description: "\u591A\u578B\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "MTD",
            description: "\u591A\u578B\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "MDD",
            description: "\u591A\u578B\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u578B)"
          },
          {
            code: "MDJ",
            description: "\u591A\u578B\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.149"
  },
  {
    id: "mk",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u5C0F\u578B\u591A\u4F4D\u7F6E\u3001\u81EA\u7531\u5B89\u88DD\u6C23\u7F38",
    group: "MD/MK\u7CFB\u5217",
    code: "",
    name: "MK\u7CFB\u5217 \u591A\u4F4D\u7F6E\u56FA\u5B9A\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "MK",
            description: "\u591A\u578B\u6C23\u7F38(\u5FA9\u52D5\u6B62\u56DE\u8F49\u578B)"
          },
          {
            code: "MSK",
            description: "\u591A\u578B\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u6B62\u56DE\u8F49\u578B)"
          },
          {
            code: "MTK",
            description: "\u591A\u578B\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u6B62\u56DE\u8F49\u578B)"
          },
          {
            code: "MKD",
            description: "\u591A\u578B\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u6B62\u56DE\u8F49\u578B)"
          },
          {
            code: "MKJ",
            description: "\u591A\u578B\u6C23\u7F38(\u96D9\u8EF8\u5FA9\u52D5\u884C\u7A0B\u53EF\u8ABF\u6B62\u56DE\u8F49\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\uFF1B\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.152"
  },
  {
    id: "mpe",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u5C0F\u578B\u591A\u4F4D\u7F6E\u3001\u81EA\u7531\u5B89\u88DD\u6C23\u7F38",
    group: "MPE\u7CFB\u5217",
    code: "",
    name: "MPE\u7CFB\u5217 \u87BA\u7D0B\u578B\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{rod_type}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "MPE",
            description: "\u6A19\u6E96\u578B\u87BA\u7D0B\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          },
          {
            code: "MPEF",
            description: "\u57CB\u5165\u5B89\u88DD\u578B\u87BA\u7D0B\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "5",
            description: "5mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          }
        ]
      },
      {
        id: "rod_type",
        name: "\u6D3B\u585E\u687F\u7259\u578B",
        options: [
          {
            code: "",
            description: "\u5916\u7259\u578B"
          },
          {
            code: "N",
            description: "\u7121\u7259\u578B"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.159"
  },
  {
    id: "mpg",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u5C0F\u578B\u591A\u4F4D\u7F6E\u3001\u81EA\u7531\u5B89\u88DD\u6C23\u7F38",
    group: "MPG\u7CFB\u5217",
    code: "",
    name: "MPG\u7CFB\u5217 \u9762\u677F\u578B\u6C23\u7F38",
    format: "{series}{bore}x{stroke}{magnet}{rod_type}{mounting}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "MPG",
            description: "\u6A19\u6E96\u9762\u677F\u578B\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "MPGH",
            description: "\u9278\u93C8\u5B89\u88DD\u578B\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "rod_type",
        name: "\u6D3B\u585E\u687F\u7259\u578B",
        options: [
          {
            code: "",
            description: "\u5916\u7259\u578B"
          },
          {
            code: "N",
            description: "\u7121\u7259\u578B"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "LB",
            description: "\u8EF8\u5411\u56FA\u5B9A\u67B6"
          },
          {
            code: "FA",
            description: "\u524D\u6CD5\u862D\u9023\u63A5\u677F"
          },
          {
            code: "SDB",
            description: "\u5F8C\u9278\u56FA\u5B9A\u67B6"
          }
        ]
      }
    ],
    note: "MPGH\u7CFB\u5217\u50C5\u9069\u7528\u65BC\u9278\u93C8\u5B89\u88DD\u578B\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.155"
  },
  {
    id: "mu",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u5C0F\u578B\u591A\u4F4D\u7F6E\u3001\u81EA\u7531\u5B89\u88DD\u6C23\u7F38",
    group: "MU\u7CFB\u5217",
    code: "",
    name: "MU\u7CFB\u5217 \u5C0F\u578B\u81EA\u7531\u5B89\u88DD\u6C23\u7F38",
    format: "{series}{mounting}{bore}x{stroke}{magnet}{rod_type}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "MU",
            description: "\u5C0F\u578B\u81EA\u7531\u5B89\u88DD\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "MSU",
            description: "\u5C0F\u578B\u81EA\u7531\u5B89\u88DD\u6C23\u7F38(\u55AE\u52D5\u62BC\u51FA\u578B)"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u672C\u9AD4\u5B89\u88DD\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u5B89\u88DD"
          },
          {
            code: "R",
            description: "\u6A6B\u5411\u5B89\u88DD"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "rod_type",
        name: "\u6D3B\u585E\u687F\u7259\u578B",
        options: [
          {
            code: "",
            description: "\u5167\u7259\u578B"
          },
          {
            code: "B",
            description: "\u5916\u7259\u578B"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u62BC\u51FA\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u687F\u4F38\u51FA\uFF0C\u524D\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u687F\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u7E2E\u56DE\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.145"
  },
  {
    id: "jck",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    group: "JCK\u7CFB\u5217",
    code: "JCK",
    name: "JCK\u7CFB\u5217 \u5F37\u529B\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    format: "JCK{series}{bore}{stroke}{arm_type}{sensor}{thread}{port_position}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u5F37\u529B\u710A\u63A5\u593E\u7DCA\u6C23\u7F38"
          },
          {
            code: "V",
            description: "\u593E\u7DCA\u81C2\u5782\u76F4"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u6253\u958B\u89D2\u5EA6",
        options: [
          {
            code: "15",
            description: "15\xB0"
          },
          {
            code: "30",
            description: "30\xB0"
          },
          {
            code: "45",
            description: "45\xB0"
          },
          {
            code: "60",
            description: "60\xB0"
          },
          {
            code: "75",
            description: "75\xB0"
          },
          {
            code: "90",
            description: "90\xB0"
          },
          {
            code: "105",
            description: "105\xB0"
          },
          {
            code: "120",
            description: "120\xB0"
          },
          {
            code: "135",
            description: "135\xB0"
          }
        ]
      },
      {
        id: "arm_type",
        name: "\u593E\u7DCA\u81C2\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "AM1",
            description: "AM1: \u504F\u7F6E15mm"
          },
          {
            code: "AM3",
            description: "AM3: \u504F\u7F6E45mm"
          },
          {
            code: "AM2",
            description: "AM2: \u504F\u7F6E15mm"
          },
          {
            code: "AM4",
            description: "AM4: \u504F\u7F6E45mm"
          }
        ]
      },
      {
        id: "sensor",
        name: "\u50B3\u611F\u5668\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u50B3\u611F\u5668"
          },
          {
            code: "K",
            description: "\u9644\u96FB\u611F\u50B3\u611F\u5668(PNP\u578B)"
          },
          {
            code: "KN",
            description: "\u9644\u96FB\u611F\u50B3\u611F\u5668(NPN\u578B)"
          },
          {
            code: "KA",
            description: "\u9644\u6C23\u52D5\u50B3\u611F\u5668"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      },
      {
        id: "port_position",
        name: "\u6C23\u5B54\u4F4D\u7F6E",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96"
          },
          {
            code: "B",
            description: "B\u4F4D\u7F6E"
          }
        ]
      }
    ],
    note: "JCK80\u593E\u7DCA\u81C2AM1\u548CAM2\u504F\u7F6E20mm",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.20"
  },
  {
    id: "jck-m",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    group: "JCK\u624B\u52D5\u7CFB\u5217",
    code: "JCK",
    name: "JCK\u7CFB\u5217 \u624B\u52D5\u578B\u5F37\u529B\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    format: "JCK{series}{bore}{stroke}{arm_type}{handle}{sensor}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u5F37\u529B\u710A\u63A5\u593E\u7DCA\u6C23\u7F38"
          },
          {
            code: "V",
            description: "\u593E\u7DCA\u81C2\u5782\u76F4"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u6253\u958B\u89D2\u5EA6",
        options: [
          {
            code: "15",
            description: "15\xB0"
          },
          {
            code: "30",
            description: "30\xB0"
          },
          {
            code: "45",
            description: "45\xB0"
          },
          {
            code: "60",
            description: "60\xB0"
          },
          {
            code: "75",
            description: "75\xB0"
          },
          {
            code: "90",
            description: "90\xB0"
          },
          {
            code: "105",
            description: "105\xB0"
          },
          {
            code: "120",
            description: "120\xB0"
          }
        ]
      },
      {
        id: "arm_type",
        name: "\u593E\u7DCA\u81C2\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "AM1",
            description: "AM1: \u504F\u7F6E15mm"
          },
          {
            code: "AM3",
            description: "AM3: \u504F\u7F6E45mm"
          },
          {
            code: "AM2",
            description: "AM2: \u504F\u7F6E15mm"
          },
          {
            code: "AM4",
            description: "AM4: \u504F\u7F6E45mm"
          }
        ]
      },
      {
        id: "handle",
        name: "\u624B\u67C4\u4F4D\u7F6E\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u975E\u624B\u52D5\u578B"
          },
          {
            code: "HL",
            description: "\u624B\u52D5\u5728\u5DE6\u5074"
          },
          {
            code: "HR",
            description: "\u624B\u52D5\u5728\u53F3\u5074"
          }
        ]
      },
      {
        id: "sensor",
        name: "\u50B3\u611F\u5668\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u50B3\u611F\u5668"
          },
          {
            code: "K",
            description: "\u9644\u96FB\u611F\u50B3\u611F\u5668(PNP\u578B)"
          },
          {
            code: "KN",
            description: "\u9644\u96FB\u611F\u50B3\u611F\u5668(NPN\u578B)"
          },
          {
            code: "KA",
            description: "\u9644\u6C23\u52D5\u50B3\u611F\u5668"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "KA\u578B\u6C23\u52D5\u50B3\u611F\u5668\u4E0D\u53EF\u55AE\u7368\u8A02\u8CFC\u4E14\u712180\u578B",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.8"
  },
  {
    id: "mck",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    group: "MCK\u7CFB\u5217",
    code: "MCK",
    name: "MCK\u7CFB\u5217 \u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    format: "MCK{opening}{bore}{stroke}{accessory}{thread}",
    categories: [
      {
        id: "opening",
        name: "\u958B\u53E3\u578B\u865F",
        options: [
          {
            code: "A",
            description: "\u958B\u53E3A\u578B"
          },
          {
            code: "B",
            description: "\u958B\u53E3B\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "125",
            description: "125mm"
          },
          {
            code: "150",
            description: "150mm"
          }
        ]
      },
      {
        id: "accessory",
        name: "\u9644\u4EF6\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9644\u4EF6"
          },
          {
            code: "Y",
            description: "\u5E36Y\u63A5\u982D(\u6709M6\u87BA\u5B54)"
          },
          {
            code: "YW",
            description: "\u5E36Y\u63A5\u982D(\u7121M6\u87BA\u5B54)"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "\u5728\u5F37\u78C1\u5834\u74B0\u5883\u4E2D\uFF0C\u61C9\u9078\u7528\u6297\u5E79\u64FE\u578B\u50B3\u611F\u5668",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.43"
  },
  {
    id: "ack",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u65CB\u8F49\u593E\u7DCA\u6C23\u7F38",
    group: "ACK\u7CFB\u5217",
    code: "",
    name: "ACK\u7CFB\u5217\u8F49\u89D2\u6C23\u7F38",
    format: "{series}{direction}{bore}{angle}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "ACK",
            description: "\u8F49\u89D2\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "ACKD",
            description: "\u8F49\u89D2\u6C23\u7F38(\u96D9\u908A\u58D3\u677F\uFF0C\u50C5\u4F9B90\xB0\u9078\u7528)"
          }
        ]
      },
      {
        id: "direction",
        name: "\u8F49\u5411\u4EE3\u865F",
        options: [
          {
            code: "L",
            description: "\u4E0B\u58D3\u5DE6\u65CB"
          },
          {
            code: "R",
            description: "\u4E0B\u58D3\u53F3\u65CB"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "angle",
        name: "\u8F49\u89D2\u4EE3\u865F",
        options: [
          {
            code: "90",
            description: "90\xB0"
          },
          {
            code: "180",
            description: "180\xB0"
          }
        ]
      }
    ],
    note: "\u7576\u63A5\u7BA1\u70BAM5\u7259\u6642\uFF0C\u6B64\u9805\u4EE3\u78BC\u70BA\u7A7A\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.340"
  },
  {
    id: "qck",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u65CB\u8F49\u593E\u7DCA\u6C23\u7F38",
    group: "QCK\u7CFB\u5217",
    code: "QCK",
    name: "QCK\u7CFB\u5217\u56DE\u8F49\u593E\u7DCA\u6C23\u7F38",
    format: "QCK{direction}{bore}x{stroke}{magnet}{rod_end}{mounting}{thread}",
    categories: [
      {
        id: "direction",
        name: "\u8F49\u5411\u4EE3\u865F",
        options: [
          {
            code: "L",
            description: "\u5DE6\u65CB"
          },
          {
            code: "R",
            description: "\u53F3\u65CB"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u593E\u7DCA\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "50",
            description: "50mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "rod_end",
        name: "\u6D3B\u585E\u687F\u7AEF\u90E8\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u9310\u5EA6\u578B(\u5E36\u64FA\u81C2)"
          },
          {
            code: "M",
            description: "\u6241\u4F4D\u578B(\u4E0D\u5E36\u64FA\u81C2)"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u56FA\u5B9A\u5F62\u5F0F",
        options: [
          {
            code: "",
            description: "\u7121\u5B89\u88DD\u9644\u4EF6"
          },
          {
            code: "FB",
            description: "\u5F8C\u84CB\u6CD5\u862D\u9023\u63A5\u677F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "\u63A5\u7BA1\u5F4E\u578B\u6709PT\u7259\u3001G\u7259\u53EF\u9078\uFF1B\u53E6\u6709\u611F\u61C9\u5668\u9078\u914D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.347"
  },
  {
    id: "qdk",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u65CB\u8F49\u593E\u7DCA\u6C23\u7F38",
    group: "QDK\u7CFB\u5217",
    code: "QDK",
    name: "QDK\u7CFB\u5217\u5E73\u9762\u56DE\u8F49\u593E\u7DCA\u6C23\u7F38",
    format: "QDK{direction}{bore}x{stroke}{magnet}{mounting}{thread}",
    categories: [
      {
        id: "direction",
        name: "\u8F49\u5411\u4EE3\u865F",
        options: [
          {
            code: "L",
            description: "\u5DE6\u65CB"
          },
          {
            code: "R",
            description: "\u53F3\u65CB"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u593E\u7DCA\u884C\u7A0B",
        options: [
          {
            code: "5",
            description: "5mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "mounting",
        name: "\u524D\u84CB\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u7A7F\u677F\u578B"
          },
          {
            code: "U",
            description: "\u5E73\u9762\u578B"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "\u7576\u63A5\u7BA1\u70BAM5\u7259\u6642\uFF0C\u6B64\u9805\u4EE3\u78BC\u70BA\u7A7A\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.344"
  },
  {
    id: "hfc",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFC\u7CFB\u5217",
    code: "",
    name: "HFC\u7CFB\u5217 \u5E73\u884C\u958B\u9589\u578B\u6C23\u52D5\u624B\u6307",
    format: "{series}{type}{bore}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "HFC",
            description: "\u5FA9\u52D5\u5E73\u884C\u958B\u9589\u578B\u6C23\u52D5\u624B\u6307"
          }
        ]
      },
      {
        id: "type",
        name: "\u593E\u722A\u53EF\u9078\u7A2E\u985E",
        options: [
          {
            code: "I",
            description: "\u5169\u722A"
          },
          {
            code: "Y",
            description: "\u4E09\u722A"
          },
          {
            code: "X",
            description: "\u56DB\u722A"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      }
    ],
    note: "HFC\u5168\u7CFB\u5217\u5747\u70BA\u9644\u78C1\u578B\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6C23\u52D5\u624B\u6307) P.327"
  },
  {
    id: "hfcq",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFCQ\u7CFB\u5217",
    code: "HFCQ",
    name: "HFCQ\u7CFB\u5217 \u5E73\u884C\u958B\u9589\u4E2D\u7A7A\u578B\u6C23\u52D5\u624B\u6307",
    format: "HFCQ{bore}{push_type}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "push_type",
        name: "\u63A8\u687F\u6A5F\u69CB",
        options: [
          {
            code: "",
            description: "\u7121"
          },
          {
            code: "E",
            description: "\u6C23\u7F38\u5F0F\u63A8\u687F"
          },
          {
            code: "V",
            description: "\u5F48\u7C27\u5F0F\u63A8\u687F"
          }
        ]
      }
    ],
    note: "\u63A8\u687F\u6A5F\u69CB\u9069\u7528\u65BC\u7F38\u5F91\u03A632~\u03A663\uFF1BHFCQ\u5168\u7CFB\u5217\u5747\u70BA\u9644\u78C1\u578B\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6C23\u52D5\u624B\u6307) P.283"
  },
  {
    id: "hfd",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFD\u7CFB\u5217",
    code: "HFD",
    name: "HFD\u7CFB\u5217 \u8584\u578B\u6C23\u52D5\u624B\u6307",
    format: "HFD{bore}X{stroke}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "80",
            description: "80mm"
          }
        ]
      }
    ],
    note: "HFD\u5168\u7CFB\u5217\u5747\u70BA\u9644\u78C1\u578B\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6C23\u52D5\u624B\u6307) P.275"
  },
  {
    id: "hfkl",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFKL\u7CFB\u5217",
    code: "",
    name: "HFKL\u7CFB\u5217 \u5E36\u5C0E\u8ECC\u5E73\u884C\u578B\u9577\u884C\u7A0B\u6EFE\u67F1\u578B\u6C23\u52D5\u624B\u6307",
    format: "{series}{bore}{type}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "HFKL",
            description: "\u5E36\u5C0E\u8ECC\u5E73\u884C\u578B\u6C23\u52D5\u624B\u6307(\u6A19\u6E96\u5FA9\u52D5\u6EFE\u67F1\u578B)"
          },
          {
            code: "HFSKL",
            description: "\u5E36\u5C0E\u8ECC\u5E73\u884C\u578B\u6C23\u52D5\u624B\u6307(\u55AE\u52D5\u5E38\u9589\u6EFE\u67F1\u578B)"
          },
          {
            code: "HFTKL",
            description: "\u5E36\u5C0E\u8ECC\u5E73\u884C\u578B\u6C23\u52D5\u624B\u6307(\u55AE\u52D5\u5E38\u958B\u6EFE\u67F1\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          }
        ]
      },
      {
        id: "type",
        name: "\u593E\u722A\u53EF\u9078\u7A2E\u985E",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "B",
            description: "\u5074\u9762\u5B89\u88DD\u578B"
          },
          {
            code: "N",
            description: "\u901A\u5B54\u5B89\u88DD\u578B"
          },
          {
            code: "F",
            description: "\u5E95\u90E8\u5B89\u88DD\u578B"
          },
          {
            code: "R",
            description: "\u722A\u5BEC\u7A84\u578B"
          },
          {
            code: "W",
            description: "\u5074\u9762\u5B89\u88DD\u4E14\u722A\u5BEC\u7A84\u578B"
          },
          {
            code: "M",
            description: "\u901A\u5B54\u5B89\u88DD\u4E14\u722A\u5BEC\u7A84\u578B"
          }
        ]
      }
    ],
    note: "HFK\u7CFB\u5217\u5747\u70BA\u9644\u78C1\u578B\uFF0C\u6240\u914D\u50B3\u611F\u5668\u9700\u53E6\u5916\u8A02\u8CFC\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6C23\u52D5\u624B\u6307) P.304"
  },
  {
    id: "hfkp",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFKP\u7CFB\u5217",
    code: "HFKP",
    name: "HFKP\u7CFB\u5217 \u9632\u5875\u5E36\u5C0E\u8ECC\u5E73\u884C\u578B\u6EFE\u67F1\u578B\u6C23\u52D5\u624B\u6307",
    format: "HFKP{bore}{type}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          }
        ]
      },
      {
        id: "type",
        name: "\u593E\u722A\u53EF\u9078\u7A2E\u985E",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          }
        ]
      }
    ],
    note: "HFKP\u5168\u7CFB\u5217\u5747\u70BA\u9644\u78C1\u578B\uFF0C\u6240\u914D\u50B3\u611F\u5668\u9700\u53E6\u5916\u8A02\u8CFC\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6C23\u52D5\u624B\u6307) P.310"
  },
  {
    id: "hfp",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFP\u7CFB\u5217",
    code: "",
    name: "HFP\u7CFB\u5217 \u6A5F\u68B0\u5F0F\u5E73\u884C\u6C23\u52D5\u624B\u6307",
    format: "{series}{bore}{type}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "HFP",
            description: "\u6A19\u6E96\u5FA9\u52D5\u6A5F\u68B0\u5F0F\u5E73\u884C\u6C23\u52D5\u624B\u6307"
          },
          {
            code: "HFTP",
            description: "\u55AE\u52D5\u5E38\u958B\u6A5F\u68B0\u5F0F\u5E73\u884C\u6C23\u52D5\u624B\u6307"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          }
        ]
      },
      {
        id: "type",
        name: "\u593E\u722A\u53EF\u9078\u7A2E\u985E",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "N",
            description: "\u901A\u5B54\u5B89\u88DD\u578B"
          }
        ]
      }
    ],
    note: "HFP\u5168\u7CFB\u5217\u5747\u70BA\u9644\u78C1\u578B\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6C23\u52D5\u624B\u6307) P.317"
  },
  {
    id: "hfy",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFY\u7CFB\u5217",
    code: "",
    name: "HFY\u7CFB\u5217 Y\u578B\u6C23\u52D5\u624B\u6307",
    format: "{series}{bore}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "HFY",
            description: "\u6A19\u6E96\u5FA9\u52D5Y\u578B\u6C23\u52D5\u624B\u6307"
          },
          {
            code: "HFTY",
            description: "\u55AE\u52D5\u5E38\u958BY\u578B\u6C23\u52D5\u624B\u6307"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          }
        ]
      }
    ],
    note: "HFY\u5168\u7CFB\u5217\u5747\u70BA\u9644\u78C1\u578B\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6C23\u52D5\u624B\u6307) P.321"
  },
  {
    id: "hfr",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFR\u7CFB\u5217",
    code: "HFR",
    name: "HFR\u7CFB\u5217 180\xB0\u958B\u9589\u578B\u6C23\u52D5\u624B\u6307",
    format: "HFR{bore}{type}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          }
        ]
      },
      {
        id: "type",
        name: "\u5B89\u88DD\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "N",
            description: "\u958B\u9589\u65B9\u5411\u901A\u5B54\u5B89\u88DD\u578B"
          }
        ]
      }
    ],
    note: "HFR\u5168\u7CFB\u5217\u5747\u70BA\u9644\u78C1\u578B\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6C23\u52D5\u624B\u6307) P.326"
  },
  {
    id: "hft",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFT\u7CFB\u5217",
    code: "HFT",
    name: "HFT\u7CFB\u5217 \u5927\u53E3\u5F91\u958B\u53E3\u593E",
    format: "HFT{bore}{stroke}{magnet}{thread}",
    categories: [
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "60",
            description: "60mm"
          },
          {
            code: "80",
            description: "80mm"
          },
          {
            code: "100",
            description: "100mm"
          },
          {
            code: "150",
            description: "150mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    note: "\u63A5\u7BA1\u7259\u578B\u6709PT\u7259\u3001G\u7259\u3001NPT\u7259\u53EF\u9078\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6C23\u52D5\u624B\u6307) P.334"
  },
  {
    id: "hfz",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u624B\u6307",
    group: "HFZ\u7CFB\u5217",
    code: "",
    name: "HFZ\u7CFB\u5217 \u5E36\u5C0E\u8ECC\u5E73\u884C\u578B\u6EFE\u73E0\u578B\u6C23\u52D5\u624B\u6307",
    format: "{series}{bore}{type}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "HFZ",
            description: "\u6A19\u6E96\u5FA9\u52D5\u6EFE\u73E0\u578B"
          },
          {
            code: "HFSZ",
            description: "\u55AE\u52D5\u5E38\u9589\u6EFE\u73E0\u578B"
          },
          {
            code: "HFTZ",
            description: "\u55AE\u52D5\u5E38\u958B\u6EFE\u73E0\u578B"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          }
        ]
      },
      {
        id: "type",
        name: "\u593E\u722A\u53EF\u9078\u7A2E\u985E",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "B",
            description: "\u5074\u9762\u5B89\u88DD\u578B"
          },
          {
            code: "N",
            description: "\u901A\u5B54\u5B89\u88DD\u578B"
          },
          {
            code: "F",
            description: "\u5E95\u90E8\u5B89\u88DD\u578B"
          }
        ]
      }
    ],
    note: "HFZ\u7CFB\u5217\u5747\u70BA\u9644\u78C1\u578B\uFF0C\u6240\u914D\u50B3\u611F\u5668\u9700\u53E6\u5916\u8A02\u8CFC\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304(\u6C23\u52D5\u624B\u6307) P.301"
  },
  {
    id: "npm",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6253\u5200\u6C23\u7F38",
    group: "NPM\u7CFB\u5217",
    code: "",
    name: "NPM\u7CFB\u5217 \u6253\u5200\u6C23\u7F38",
    format: "{series}{output}{spec}{voltage}{connection}{switch}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "NPM",
            description: "\u6253\u5200\u6C23\u7F38"
          }
        ]
      },
      {
        id: "output",
        name: "\u51FA\u529B",
        options: [
          {
            code: "35T",
            description: "\u51FA\u529B3.5\u5678"
          },
          {
            code: "45T",
            description: "\u51FA\u529B4.5\u5678"
          },
          {
            code: "60T",
            description: "\u51FA\u529B6.0\u5678"
          }
        ]
      },
      {
        id: "spec",
        name: "\u6DB2\u58D3\u7F38\u5F91X\u6253\u5200\u884C\u7A0B",
        options: [
          {
            code: "63X13",
            description: "\u6DB2\u58D3\u7F38\u5F9163mm\uFF1B\u6253\u5200\u884C\u7A0B13mm"
          },
          {
            code: "63X15",
            description: "\u6DB2\u58D3\u7F38\u5F9163mm\uFF1B\u6253\u5200\u884C\u7A0B15mm"
          },
          {
            code: "70X15",
            description: "\u6DB2\u58D3\u7F38\u5F9170mm\uFF1B\u6253\u5200\u884C\u7A0B15mm"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u6A19\u6E96\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "switch",
        name: "\u5FAE\u52D5\u958B\u95DC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u5FAE\u52D5\u958B\u95DC"
          },
          {
            code: "L",
            description: "2\u500B\u5FAE\u52D5\u958B\u95DC"
          }
        ]
      }
    ],
    note: "\u6253\u5200\u7F38\u4E3B\u9AD4\u898F\u683C\u5171\u56DB\u6B3E\uFF0C\u5FAE\u52D5\u958B\u95DC\u3001\u96FB\u58D3\u548C\u63A5\u96FB\u65B9\u5F0F\u53EF\u9078\u3002\u6211\u53F8\u4F7F\u7528\u96FB\u78C1\u95A5\u578B\u865F\u70BA4M310\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.387"
  },
  {
    id: "jch",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u92B7\u91D8\u6C23\u7F38",
    group: "JCH\u7CFB\u5217",
    code: "",
    name: "JCH\u7CFB\u5217 \u96D9\u4F38\u7E2E\u92B7",
    format: "{series}{bore}{stroke}{pin_type}{sensor}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "JCH",
            description: "\u96D9\u4F38\u7E2E\u92B7"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "60",
            description: "60mm"
          }
        ]
      },
      {
        id: "pin_type",
        name: "\u92B7\u91D8\u985E\u578B",
        options: [
          {
            code: "A",
            description: "A\u578B"
          },
          {
            code: "B",
            description: "B\u578B"
          }
        ]
      },
      {
        id: "sensor",
        name: "\u50B3\u611F\u5668\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u50B3\u611F\u5668"
          },
          {
            code: "K",
            description: "\u9644\u96FB\u611F\u50B3\u611F\u5668(PNP\u578B)"
          },
          {
            code: "KN",
            description: "\u9644\u96FB\u611F\u50B3\u611F\u5668(NPN\u578B)"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.70"
  },
  {
    id: "jcp",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u92B7\u91D8\u6C23\u7F38",
    group: "JCP\u7CFB\u5217",
    code: "",
    name: "JCP\u7CFB\u5217 \u55AE\u4F38\u7E2E\u92B7",
    format: "{series}{bore}{stroke}{pin_type}{sensor}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "JCP",
            description: "\u55AE\u4F38\u7E2E\u92B7"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "60",
            description: "60mm"
          }
        ]
      },
      {
        id: "pin_type",
        name: "\u92B7\u91D8\u985E\u578B",
        options: [
          {
            code: "A",
            description: "A\u578B"
          },
          {
            code: "B",
            description: "B\u578B"
          },
          {
            code: "C",
            description: "C\u578B"
          },
          {
            code: "D",
            description: "D\u578B"
          }
        ]
      },
      {
        id: "sensor",
        name: "\u50B3\u611F\u5668\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u50B3\u611F\u5668"
          },
          {
            code: "K",
            description: "\u9644\u96FB\u611F\u50B3\u611F\u5668(PNP\u578B)"
          },
          {
            code: "KN",
            description: "\u9644\u96FB\u611F\u50B3\u611F\u5668(NPN\u578B)"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.67"
  },
  {
    id: "jqk",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u92B7\u91D8\u6C23\u7F38",
    group: "JQK\u7CFB\u5217",
    code: "",
    name: "JQK\u7CFB\u5217 \u5E95\u677F\u593E\u7DCA\u7F38",
    format: "{series}{bore}{direction}-{pin_diameter}{height}{clamping_thickness}{sensor}{thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "JQK",
            description: "\u5E95\u677F\u593E\u7DCA\u7F38"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "direction",
        name: "\u62C9\u6746\u65B9\u5411",
        options: [
          {
            code: "",
            description: "\u6B63\u5411"
          },
          {
            code: "R",
            description: "\u53CD\u5411"
          }
        ]
      },
      {
        id: "pin_diameter",
        name: "\u5C0E\u5411\u92B7\u76F4\u5F91",
        options: [
          {
            code: "17",
            description: "\u03A617"
          },
          {
            code: "19",
            description: "\u03A619"
          },
          {
            code: "24",
            description: "\u03A624"
          },
          {
            code: "29",
            description: "\u03A629"
          }
        ]
      },
      {
        id: "height",
        name: "\u51F8\u81FA\u9AD8\u5EA6",
        options: [
          {
            code: "L45",
            description: "45mm"
          }
        ]
      },
      {
        id: "clamping_thickness",
        name: "\u593E\u7DCA\u539A\u5EA6",
        options: [
          {
            code: "T16",
            description: "1.6mm"
          }
        ]
      },
      {
        id: "sensor",
        name: "\u50B3\u611F\u5668\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u50B3\u611F\u5668"
          },
          {
            code: "K",
            description: "\u9644\u96FB\u611F\u50B3\u611F\u5668(PNP\u578B)"
          },
          {
            code: "KN",
            description: "\u9644\u96FB\u611F\u50B3\u611F\u5668(NPN\u578B)"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.65"
  },
  {
    id: "twg",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u963B\u64CB\u6C23\u7F38",
    group: "TWG\u7CFB\u5217",
    code: "",
    name: "TWG\u7CFB\u5217 \u963B\u64CB\u6C23\u7F38",
    format: "{series}{bore}{stroke}{magnet}{cushion}{function}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "TWG",
            description: "\u963B\u64CB\u6C23\u7F38(\u9AD8\u5EA6\u53EF\u8ABF\u5FA9\u52D5\u578B)"
          },
          {
            code: "TTG",
            description: "\u963B\u64CB\u6C23\u7F38(\u9AD8\u5EA6\u53EF\u8ABF\u55AE\u52D5\u5F15\u5165\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "cushion",
        name: "\u963B\u64CB\u65B9\u5F0F",
        options: [
          {
            code: "C",
            description: "\u5713\u67F1\u578B"
          },
          {
            code: "B",
            description: "\u6241\u67F1\u578B"
          },
          {
            code: "R",
            description: "\u6EFE\u8F2A\u578B"
          },
          {
            code: "K",
            description: "\u6746\u5F0F\u6EFE\u8F2A\u578B(\u5E36\u53EF\u8ABF\u6CB9\u58D3\u7DE9\u885D\u5668)"
          }
        ]
      },
      {
        id: "function",
        name: "\u81EA\u9396\u529F\u80FD",
        options: [
          {
            code: "",
            description: "\u7121\u81EA\u9396"
          },
          {
            code: "F",
            description: "\u5E36\u81EA\u9396"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u6746\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u6746\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.395"
  },
  {
    id: "twh",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u963B\u64CB\u6C23\u7F38",
    group: "TWH/TWM\u7CFB\u5217",
    code: "",
    name: "TWH\u3001TWM\u7CFB\u5217 \u963B\u64CB\u6C23\u7F38",
    format: "{series}{bore}{stroke}{magnet}{cushion}{function}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "TWH",
            description: "\u963B\u64CB\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "TDH",
            description: "\u963B\u64CB\u6C23\u7F38(\u5167\u7F6E\u5F48\u7C27\u5FA9\u52D5\u578B)"
          },
          {
            code: "TTH",
            description: "\u963B\u64CB\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          },
          {
            code: "TWM",
            description: "\u963B\u64CB\u6C23\u7F38(\u5FA9\u52D5\u578B)"
          },
          {
            code: "TDM",
            description: "\u963B\u64CB\u6C23\u7F38(\u5167\u7F6E\u5F48\u7C27\u5FA9\u52D5\u578B)"
          },
          {
            code: "TTM",
            description: "\u963B\u64CB\u6C23\u7F38(\u55AE\u52D5\u5F15\u5165\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "63",
            description: "63mm"
          },
          {
            code: "80",
            description: "80mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "63",
            description: "63mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "cushion",
        name: "\u963B\u64CB\u65B9\u5F0F",
        options: [
          {
            code: "L",
            description: "\u6746\u5F0F\u6EFE\u8F2A\u578B(\u4E0D\u53EF\u8ABF\u6CB9\u58D3\u7DE9\u885D\u5668)"
          },
          {
            code: "K",
            description: "\u6746\u5F0F\u6EFE\u8F2A\u578B(\u53EF\u8ABF\u6CB9\u58D3\u7DE9\u885D\u5668)"
          }
        ]
      },
      {
        id: "function",
        name: "\u81EA\u9396\u529F\u80FD",
        options: [
          {
            code: "",
            description: "\u7121\u81EA\u9396"
          },
          {
            code: "F",
            description: "\u5E36\u81EA\u9396"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u6746\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u6746\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002\u7F38\u5F9120\u300125\u6CB9\u58D3\u7DE9\u885D\u5668\u70BA\u4E0D\u53EF\u8ABF\uFF1B32\u4EE5\u4E0A\u6CB9\u58D3\u7DE9\u885D\u5668\u70BA\u53EF\u8ABF\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.391"
  },
  {
    id: "twq",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u963B\u64CB\u6C23\u7F38",
    group: "TWQ\u7CFB\u5217",
    code: "",
    name: "TWQ\u7CFB\u5217 \u963B\u64CB\u6C23\u7F38",
    format: "{series}{bore}{stroke}{magnet}{cushion}{function}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "TWQ",
            description: "\u963B\u64CB\u6C23\u7F38(\u9AD8\u5EA6\u53EF\u8ABF\u5FA9\u52D5\u578B)"
          },
          {
            code: "TTQ",
            description: "\u963B\u64CB\u6C23\u7F38(\u9AD8\u5EA6\u53EF\u8ABF\u55AE\u52D5\u5F15\u5165\u578B)"
          }
        ]
      },
      {
        id: "bore",
        name: "\u7F38\u5F91",
        options: [
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "32",
            description: "32mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          }
        ]
      },
      {
        id: "magnet",
        name: "\u78C1\u77F3\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u78C1\u77F3"
          },
          {
            code: "S",
            description: "\u9644\u78C1\u77F3"
          }
        ]
      },
      {
        id: "cushion",
        name: "\u963B\u64CB\u65B9\u5F0F",
        options: [
          {
            code: "C",
            description: "\u5713\u67F1\u578B"
          },
          {
            code: "B",
            description: "\u6241\u67F1\u578B"
          },
          {
            code: "R",
            description: "\u6EFE\u8F2A\u578B"
          },
          {
            code: "K",
            description: "\u6746\u5F0F\u6EFE\u8F2A\u578B(\u5E36\u53EF\u8ABF\u6CB9\u58D3\u7DE9\u885D\u5668)"
          }
        ]
      },
      {
        id: "function",
        name: "\u81EA\u9396\u529F\u80FD",
        options: [
          {
            code: "",
            description: "\u7121\u81EA\u9396"
          },
          {
            code: "F",
            description: "\u5E36\u81EA\u9396"
          }
        ]
      }
    ],
    note: "\u55AE\u52D5\u5F15\u5165\u578B\u662F\u6307\u901A\u6C23\u6642\u6D3B\u585E\u6746\u7E2E\u56DE\uFF0C\u5F8C\u7F6E\u5F48\u7C27\u88AB\u58D3\u7E2E\uFF0C\u65B7\u6C23\u6642\u6D3B\u585E\u6746\u5728\u5F48\u7C27\u5FA9\u4F4D\u529B\u4F5C\u7528\u4E0B\u4F38\u51FA\u5FA9\u4F4D\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.402"
  },
  {
    id: "dms",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u7F38\u9644\u4EF6",
    group: "\u50B3\u611F\u5668\u8207\u5B89\u88DD\u9644\u4EF6",
    code: "",
    name: "DMS\u7CFB\u5217\u96FB\u5B50\u5F0F\u50B3\u611F\u5668",
    format: "{series}-{spec}-{type}-{length}{special}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "DMS",
            description: "\u96FB\u5B50\u5F0F\u50B3\u611F\u5668"
          }
        ]
      },
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "G",
            description: "G\u578B"
          },
          {
            code: "H",
            description: "H\u578B"
          },
          {
            code: "E",
            description: "E\u578B"
          },
          {
            code: "J",
            description: "J\u578B"
          }
        ]
      },
      {
        id: "type",
        name: "\u8F38\u51FA\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u4E8C\u7DDA\u5F0F"
          },
          {
            code: "N",
            description: "NPN\u4E09\u7DDA\u5F0F"
          },
          {
            code: "P",
            description: "PNP\u4E09\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "length",
        name: "\u63A5\u7DDA\u578B\u5F0F",
        options: [
          {
            code: "020",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u95772m"
          },
          {
            code: "030",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u95773m"
          },
          {
            code: "050",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u95775m"
          },
          {
            code: "100",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u957710m"
          },
          {
            code: "M08",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+0.5m\u7DDA\u9577"
          },
          {
            code: "M08010",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+1m\u7DDA\u9577"
          },
          {
            code: "M08020",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+2m\u7DDA\u9577"
          },
          {
            code: "M08030",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+3m\u7DDA\u9577"
          },
          {
            code: "M12",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+0.5m\u7DDA\u9577"
          },
          {
            code: "M12010",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+1m\u7DDA\u9577"
          },
          {
            code: "M12020",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+2m\u7DDA\u9577"
          },
          {
            code: "M12030",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+3m\u7DDA\u9577"
          }
        ]
      },
      {
        id: "special",
        name: "\u7279\u898F\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E00\u822C\u578B"
          },
          {
            code: "RW",
            description: "\u9632\u6C34\u8010\u6CB9\u6297\u6493\u66F2\u578B"
          }
        ]
      }
    ],
    note: "\u5168\u7CFB\u5217M08\u3001M12\u5FEB\u901F\u516C\u63A5\u982D\u7121\u9632\u6C34\u8010\u6CB9\u6297\u6493\u66F2\u578B\u53EF\u9078\u3002M08\u3001M12\u5FEB\u901F\u516C\u63A5\u982D\u914D\u5957\u4E4B\u6BCD\u63A5\u982D\u9700\u53E6\u5916\u8A02\u8CFC\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.408"
  },
  {
    id: "ems",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u7F38\u9644\u4EF6",
    group: "\u50B3\u611F\u5668\u8207\u5B89\u88DD\u9644\u4EF6",
    code: "",
    name: "EMS\u7CFB\u5217\u96FB\u5B50\u5F0F\u50B3\u611F\u5668",
    format: "{series}-{spec}--{length}{special}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "EMS",
            description: "\u96FB\u5B50\u5F0F\u50B3\u611F\u5668"
          }
        ]
      },
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "G",
            description: "G\u578B"
          },
          {
            code: "H",
            description: "H\u578B"
          }
        ]
      },
      {
        id: "length",
        name: "\u63A5\u7DDA\u578B\u5F0F",
        options: [
          {
            code: "020",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u95772m"
          },
          {
            code: "030",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u95773m"
          },
          {
            code: "050",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u95775m"
          },
          {
            code: "100",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u957710m"
          },
          {
            code: "M08",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+0.5m\u7DDA\u9577"
          },
          {
            code: "M08010",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+1m\u7DDA\u9577"
          },
          {
            code: "M08020",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+2m\u7DDA\u9577"
          },
          {
            code: "M08030",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+3m\u7DDA\u9577"
          },
          {
            code: "M12",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+0.5m\u7DDA\u9577"
          },
          {
            code: "M12010",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+1m\u7DDA\u9577"
          },
          {
            code: "M12020",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+2m\u7DDA\u9577"
          },
          {
            code: "M12030",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+3m\u7DDA\u9577"
          }
        ]
      },
      {
        id: "special",
        name: "\u7279\u898F\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E00\u822C\u578B"
          },
          {
            code: "RW",
            description: "\u9632\u6C34\u8010\u6CB9\u6297\u6493\u66F2\u578B"
          }
        ]
      }
    ],
    note: "\u5168\u7CFB\u5217M08\u3001M12\u5FEB\u901F\u516C\u63A5\u982D\u7121\u9632\u6C34\u8010\u6CB9\u6297\u6493\u66F2\u578B\u53EF\u9078\u3002M08\u3001M12\u5FEB\u901F\u516C\u63A5\u982D\u914D\u5957\u4E4B\u6BCD\u63A5\u982D\u9700\u53E6\u5916\u8A02\u8CFC\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.409"
  },
  {
    id: "cms",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u7F38\u9644\u4EF6",
    group: "\u50B3\u611F\u5668\u8207\u5B89\u88DD\u9644\u4EF6",
    code: "",
    name: "CMS\u7CFB\u5217\u78C1\u7C27\u5F0F\u50B3\u611F\u5668",
    format: "{series}-{spec}-{length}{special}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "CMS",
            description: "\u78C1\u7C27\u5F0F\u50B3\u611F\u5668"
          }
        ]
      },
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "G",
            description: "G\u578B"
          },
          {
            code: "H",
            description: "H\u578B"
          },
          {
            code: "E",
            description: "E\u578B"
          },
          {
            code: "J",
            description: "J\u578B"
          }
        ]
      },
      {
        id: "length",
        name: "\u63A5\u7DDA\u578B\u5F0F",
        options: [
          {
            code: "020",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u95772m"
          },
          {
            code: "030",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u95773m"
          },
          {
            code: "050",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u95775m"
          },
          {
            code: "100",
            description: "\u76F4\u63A5\u51FA\u7DDA \u7DDA\u957710m"
          },
          {
            code: "M08",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+0.5m\u7DDA\u9577"
          },
          {
            code: "M08010",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+1m\u7DDA\u9577"
          },
          {
            code: "M08020",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+2m\u7DDA\u9577"
          },
          {
            code: "M08030",
            description: "M8\u5FEB\u901F\u516C\u63A5\u982D+3m\u7DDA\u9577"
          },
          {
            code: "M12",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+0.5m\u7DDA\u9577"
          },
          {
            code: "M12010",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+1m\u7DDA\u9577"
          },
          {
            code: "M12020",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+2m\u7DDA\u9577"
          },
          {
            code: "M12030",
            description: "M12\u5FEB\u901F\u516C\u63A5\u982D+3m\u7DDA\u9577"
          }
        ]
      },
      {
        id: "special",
        name: "\u7279\u898F\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u4E00\u822C\u578B"
          },
          {
            code: "H",
            description: "\u9AD8\u6EAB\u578B"
          }
        ]
      }
    ],
    note: "\u9AD8\u6EAB\u578B\u7121M08\u3001M12\u5FEB\u901F\u516C\u63A5\u982D\u53EF\u9078\u3002M08\u3001M12\u5FEB\u901F\u516C\u63A5\u982D\u914D\u5957\u4E4B\u6BCD\u63A5\u982D\u9700\u53E6\u5916\u8A02\u8CFC\u3002",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.410"
  },
  {
    id: "prsu",
    category: "\u57F7\u884C\u5143\u4EF6",
    superGroup: "\u6C23\u7F38\u9644\u4EF6",
    group: "\u50B3\u611F\u5668\u8207\u5B89\u88DD\u9644\u4EF6",
    code: "",
    name: "PRSU\u7CFB\u5217\u69FD\u578B\u5149\u96FB\u50B3\u611F\u5668",
    format: "{series}-{spec}-{type}-{length}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "PRSU",
            description: "\u69FD\u578B\u5149\u96FB\u50B3\u611F\u5668"
          }
        ]
      },
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "T",
            description: "T\u578B"
          },
          {
            code: "F",
            description: "F\u578B"
          },
          {
            code: "R",
            description: "R\u578B"
          },
          {
            code: "K",
            description: "K\u578B"
          },
          {
            code: "L",
            description: "L\u578B"
          },
          {
            code: "Y",
            description: "Y\u578B"
          }
        ]
      },
      {
        id: "type",
        name: "\u8F38\u51FA\u578B\u5F0F",
        options: [
          {
            code: "N",
            description: "NPN"
          },
          {
            code: "P",
            description: "PNP"
          }
        ]
      },
      {
        id: "length",
        name: "\u63A5\u7DDA\u578B\u5F0F",
        options: [
          {
            code: "020",
            description: "\u7DDA\u95772m"
          },
          {
            code: "030",
            description: "\u7DDA\u95773m"
          },
          {
            code: "050",
            description: "\u7DDA\u95775m"
          }
        ]
      }
    ],
    note: "",
    sourceFile: "\u57F7\u884C\u5143\u4EF6\u578B\u9304 P.423"
  }
];

// src/data/catalog-air-prep.json
var catalog_air_prep_default = [
  {
    id: "SDR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u5176\u5B83\u7CFB\u5217",
    group: "SDR\u8ABF\u58D3\u95A5",
    code: "SDR",
    name: "SDR\u7CFB\u5217 \u8ABF\u58D3\u95A5",
    format: "SDR{series}{port}{type}{bracket}{gauge}{scale}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "100",
            description: "100\u7CFB\u5217"
          },
          {
            code: "200",
            description: "200\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.3"
  },
  {
    id: "SM-ARH",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u5176\u5B83\u7CFB\u5217",
    group: "SM-ARH\u6F54\u6DE8\u6E1B\u58D3\u95A5",
    code: "SM-ARH",
    name: "SM-ARH\u7CFB\u5217 \u6F54\u6DE8\u6E1B\u58D3\u95A5",
    format: "SM-ARH{series}{port}{bracket}{gauge}{direction}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "direction",
        name: "\u58D3\u529B\u8868\u65B9\u5411",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u65B9\u5411"
          },
          {
            code: "R",
            description: "\u80CC\u5074\u65B9\u5411"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.5"
  },
  {
    id: "SR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u5176\u5B83\u7CFB\u5217",
    group: "SR\u8ABF\u58D3\u95A5",
    code: "SR",
    name: "SR\u7CFB\u5217 \u8ABF\u58D3\u95A5",
    format: "SR{series}{port}{type}{bracket}{gauge}{scale}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          },
          {
            code: "4",
            description: "kgf/cm\xB2"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.8"
  },
  {
    id: "GVF",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u771F\u7A7A\u7CFB\u5217",
    group: "\u771F\u7A7A\u904E\u6FFE\u5668",
    code: "GVF",
    name: "GVF\u7CFB\u5217 \u771F\u7A7A\u904E\u6FFE\u5668",
    format: "GVF{series}{cup}{port}{bracket}{precision}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          },
          {
            code: "C",
            description: "\u91D1\u5C6C\u676F"
          },
          {
            code: "N",
            description: "\u5C3C\u9F8D\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.11"
  },
  {
    id: "GVR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u771F\u7A7A\u7CFB\u5217",
    group: "\u771F\u7A7A\u8ABF\u58D3\u95A5",
    code: "GVR",
    name: "GVR\u7CFB\u5217 \u771F\u7A7A\u8ABF\u58D3\u95A5",
    format: "GVR{series}{port}{bracket}{gauge}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          }
        ]
      },
      {
        id: "bracket",
        name: "\u5B89\u88DD\u9644\u4EF6",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u58D3\u529B\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u58D3\u529B\u8868"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.14"
  },
  {
    id: "DPH",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u58D3\u529B\u50B3\u611F\u5668",
    group: "DPH\u96FB\u5B50\u5F0F\u6578\u986F",
    code: "DPH",
    name: "DPH\u7CFB\u5217 \u96FB\u5B50\u5F0F\u6578\u986F\u58D3\u529B\u50B3\u611F\u5668",
    format: "DPH{output}{connection}{range}{length}{port}",
    categories: [
      {
        id: "output",
        name: "\u8F38\u51FA\u578B\u5F0F",
        options: [
          {
            code: "N2",
            description: "NPN+\u985E\u6BD4\u96FB\u58D3\u8F38\u51FA(1-5V)"
          },
          {
            code: "P2",
            description: "PNP+\u985E\u6BD4\u96FB\u58D3\u8F38\u51FA(1-5V)"
          },
          {
            code: "N3",
            description: "NPN+\u985E\u6BD4\u96FB\u6D41\u8F38\u51FA(4-20mA)"
          },
          {
            code: "P3",
            description: "PNP+\u985E\u6BD4\u96FB\u6D41\u8F38\u51FA(4-20mA)"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u7AEF\u5B50\u5F0F\u63A5\u96FB"
          },
          {
            code: "B",
            description: "\u5F8C\u51FA\u7DDA\u5F0F\u63A5\u96FB"
          }
        ]
      },
      {
        id: "range",
        name: "\u91CF\u6E2C\u58D3\u529B\u7BC4\u570D",
        options: [
          {
            code: "01",
            description: "-100kPa~100kPa"
          },
          {
            code: "10",
            description: "-100kPa~1000kPa"
          }
        ]
      },
      {
        id: "length",
        name: "\u51FA\u7DDA\u9577\u5EA6",
        options: [
          {
            code: "020",
            description: "\u7DDA\u95772m"
          },
          {
            code: "030",
            description: "\u7DDA\u95773m"
          },
          {
            code: "050",
            description: "\u7DDA\u95775m"
          }
        ]
      },
      {
        id: "port",
        name: "\u58D3\u529B\u6C23\u5B54\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u5916\u7259PT1/8; \u5167\u7259M5"
          },
          {
            code: "T",
            description: "\u5916\u7259NPT1/8; \u5167\u725910-32UNF"
          },
          {
            code: "G",
            description: "\u5916\u7259G1/8; \u5167\u7259M5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.15"
  },
  {
    id: "DPS",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u58D3\u529B\u50B3\u611F\u5668",
    group: "DPS\u7CFB\u5217",
    code: "DPS",
    name: "DPS\u7CFB\u5217 \u96FB\u5B50\u5F0F\u6578\u986F\u58D3\u529B\u50B3\u611F\u5668",
    format: "DPS{output}{connection}{range}{length}{port}",
    categories: [
      {
        id: "output",
        name: "\u8F38\u51FA\u578B\u5F0F",
        options: [
          {
            code: "N1",
            description: "NPN"
          },
          {
            code: "P1",
            description: "PNP"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u7AEF\u5B50\u5F0F\u63A5\u96FB"
          },
          {
            code: "B",
            description: "\u5F8C\u51FA\u7DDA\u5F0F\u63A5\u96FB"
          },
          {
            code: "D",
            description: "\u4E0B\u51FA\u7DDA\u5F0F\u63A5\u96FB"
          }
        ]
      },
      {
        id: "range",
        name: "\u91CF\u6E2C\u58D3\u529B\u7BC4\u570D",
        options: [
          {
            code: "01",
            description: "-100kPa~100kPa"
          },
          {
            code: "10",
            description: "-100kPa~1000kPa"
          }
        ]
      },
      {
        id: "length",
        name: "\u51FA\u7DDA\u9577\u5EA6",
        options: [
          {
            code: "020",
            description: "\u7DDA\u95772m"
          },
          {
            code: "030",
            description: "\u7DDA\u95773m"
          },
          {
            code: "050",
            description: "\u7DDA\u95775m"
          },
          {
            code: "M08",
            description: "M8\u5FEB\u901F\u63A5\u982D+300mm"
          }
        ]
      },
      {
        id: "port",
        name: "\u58D3\u529B\u6C23\u5B54\u578B\u5F0F",
        options: [
          {
            code: "",
            description: "\u5916\u7259PT1/8; \u5167\u7259M5"
          },
          {
            code: "T",
            description: "\u5916\u7259NPT1/8; \u5167\u725910-32UNF"
          },
          {
            code: "G",
            description: "\u5916\u7259G1/8; \u5167\u7259M5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.21"
  },
  {
    id: "AC-BC",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "A\u3001B\u7CFB\u5217",
    group: "\u4E09\u806F\u4EF6(F+R+L)",
    code: "AC",
    name: "AC\u3001BC\u7CFB\u5217\u4E09\u806F\u4EF6",
    format: "AC{series}{port}{drain}{type}{gauge}{scale}{precision}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1500C",
            description: "1500\u7CFB\u5217"
          },
          {
            code: "2000C",
            description: "2000\u7CFB\u5217"
          },
          {
            code: "3000C",
            description: "3000\u7CFB\u5217"
          },
          {
            code: "4000C10",
            description: "4000\u7CFB\u5217"
          },
          {
            code: "4000C",
            description: "4000\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "1500C",
            description: '1/8"'
          },
          {
            code: "2000C",
            description: '1/4"'
          },
          {
            code: "3000C",
            description: '3/8"'
          },
          {
            code: "4000C10",
            description: '3/8"'
          },
          {
            code: "4000C",
            description: '1/2"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          },
          {
            code: "4",
            description: "kgf/cm\xB2"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.25"
  },
  {
    id: "AF-BF",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "A\u3001B\u7CFB\u5217",
    group: "\u904E\u6FFE\u5668",
    code: "AF",
    name: "AF\u3001BF\u7CFB\u5217\u904E\u6FFE\u5668",
    format: "AF{series}{port}{drain}{precision}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1500C",
            description: "1500\u7CFB\u5217"
          },
          {
            code: "2000C",
            description: "2000\u7CFB\u5217"
          },
          {
            code: "3000C",
            description: "3000\u7CFB\u5217"
          },
          {
            code: "4000C10",
            description: "4000\u7CFB\u5217"
          },
          {
            code: "4000C",
            description: "4000\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "1500C",
            description: '1/8"'
          },
          {
            code: "2000C",
            description: '1/4"'
          },
          {
            code: "3000C",
            description: '3/8"'
          },
          {
            code: "4000C10",
            description: '3/8"'
          },
          {
            code: "4000C",
            description: '1/2"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.28"
  },
  {
    id: "AFC-BFC",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "A\u3001B\u7CFB\u5217",
    group: "\u4E8C\u806F\u4EF6(F.R+L)",
    code: "AFC",
    name: "AFC\u3001BFC\u7CFB\u5217\u4E8C\u806F\u4EF6",
    format: "AFC{series}{port}{drain}{type}{gauge}{scale}{precision}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1500C",
            description: "1500\u7CFB\u5217"
          },
          {
            code: "2000C",
            description: "2000\u7CFB\u5217"
          },
          {
            code: "3000C",
            description: "3000\u7CFB\u5217"
          },
          {
            code: "4000C10",
            description: "4000\u7CFB\u5217"
          },
          {
            code: "4000C",
            description: "4000\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "1500C",
            description: '1/8"'
          },
          {
            code: "2000C",
            description: '1/4"'
          },
          {
            code: "3000C",
            description: '3/8"'
          },
          {
            code: "4000C10",
            description: '3/8"'
          },
          {
            code: "4000C",
            description: '1/2"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          },
          {
            code: "4",
            description: "kgf/cm\xB2"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.31"
  },
  {
    id: "AFR-BFR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "A\u3001B\u7CFB\u5217",
    group: "\u8ABF\u58D3\u904E\u6FFE\u5668",
    code: "AFR",
    name: "AFR\u3001BFR\u7CFB\u5217\u8ABF\u58D3\u904E\u6FFE\u5668",
    format: "AFR{series}{port}{mount}{drain}{type}{bracket}{gauge}{scale}{precision}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1500C",
            description: "1500\u7CFB\u5217"
          },
          {
            code: "2000C",
            description: "2000\u7CFB\u5217"
          },
          {
            code: "3000C",
            description: "3000\u7CFB\u5217"
          },
          {
            code: "4000C10",
            description: "4000\u7CFB\u5217"
          },
          {
            code: "4000C",
            description: "4000\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "1500C",
            description: '1/8"'
          },
          {
            code: "2000C",
            description: '1/4"'
          },
          {
            code: "3000C",
            description: '3/8"'
          },
          {
            code: "4000C10",
            description: '3/8"'
          },
          {
            code: "4000C",
            description: '1/2"'
          }
        ]
      },
      {
        id: "mount",
        name: "\u58D3\u529B\u8868\u5B89\u88DD\u87BA\u7D0B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u55AE\u5074"
          },
          {
            code: "D",
            description: "\u96D9\u5074"
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          },
          {
            code: "4",
            description: "kgf/cm\xB2"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.34"
  },
  {
    id: "AL-BL",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "A\u3001B\u7CFB\u5217",
    group: "\u7D66\u6CB9\u5668",
    code: "AL",
    name: "AL\u3001BL\u7CFB\u5217\u7D66\u6CB9\u5668",
    format: "AL{series}{port}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1500C",
            description: "1500\u7CFB\u5217"
          },
          {
            code: "2000C",
            description: "2000\u7CFB\u5217"
          },
          {
            code: "3000C",
            description: "3000\u7CFB\u5217"
          },
          {
            code: "4000C10",
            description: "4000\u7CFB\u5217"
          },
          {
            code: "4000C",
            description: "4000\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "1500C",
            description: '1/8"'
          },
          {
            code: "2000C",
            description: '1/4"'
          },
          {
            code: "3000C",
            description: '3/8"'
          },
          {
            code: "4000C10",
            description: '3/8"'
          },
          {
            code: "4000C",
            description: '1/2"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.37"
  },
  {
    id: "AR-BR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "A\u3001B\u7CFB\u5217",
    group: "\u8ABF\u58D3\u95A5",
    code: "AR",
    name: "AR\u3001BR\u7CFB\u5217\u8ABF\u58D3\u95A5",
    format: "AR{series}{port}{mount}{type}{bracket}{gauge}{scale}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "1500C",
            description: "1500\u7CFB\u5217"
          },
          {
            code: "2000C",
            description: "2000\u7CFB\u5217"
          },
          {
            code: "3000C",
            description: "3000\u7CFB\u5217"
          },
          {
            code: "4000C10",
            description: "4000\u7CFB\u5217"
          },
          {
            code: "4000C",
            description: "4000\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "1500C",
            description: '1/8"'
          },
          {
            code: "2000C",
            description: '1/4"'
          },
          {
            code: "3000C",
            description: '3/8"'
          },
          {
            code: "4000C10",
            description: '3/8"'
          },
          {
            code: "4000C",
            description: '1/2"'
          }
        ]
      },
      {
        id: "mount",
        name: "\u58D3\u529B\u8868\u5B89\u88DD\u87BA\u7D0B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u55AE\u5074"
          },
          {
            code: "D",
            description: "\u96D9\u5074"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          },
          {
            code: "4",
            description: "kgf/cm\xB2"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.39"
  },
  {
    id: "GC",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "G\u7CFB\u5217",
    group: "\u4E09\u806F\u4EF6(F+R+L)",
    code: "GC",
    name: "GC\u7CFB\u5217\u4E09\u806F\u4EF6",
    format: "GC{series}{port}{drain}{type}{gauge}{gauge_type}{scale}{precision}{thread}{check_valve}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3\u6392\u6C34"
          },
          {
            code: "M",
            description: "\u624B\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "gauge_type",
        name: "\u58D3\u529B\u8868\u578B\u5F0F",
        options: [
          {
            code: "F",
            description: "\u65B9\u5F62\u8868"
          },
          {
            code: "C",
            description: "\u5713\u5F62\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          },
          {
            code: "K",
            description: "\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.41"
  },
  {
    id: "GF",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "G\u7CFB\u5217",
    group: "\u904E\u6FFE\u5668",
    code: "GF",
    name: "GF\u7CFB\u5217\u904E\u6FFE\u5668",
    format: "GF{series}{port}{drain}{bracket}{precision}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3\u6392\u6C34"
          },
          {
            code: "M",
            description: "\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.43"
  },
  {
    id: "GFC",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "G\u7CFB\u5217",
    group: "\u4E8C\u806F\u4EF6(F.R+L)",
    code: "GFC",
    name: "GFC\u7CFB\u5217\u4E8C\u806F\u4EF6",
    format: "GFC{series}{port}{drain}{type}{gauge}{gauge_type}{scale}{precision}{thread}{check_valve}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3\u6392\u6C34"
          },
          {
            code: "M",
            description: "\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "gauge_type",
        name: "\u58D3\u529B\u8868\u578B\u5F0F",
        options: [
          {
            code: "F",
            description: "\u65B9\u5F62\u8868"
          },
          {
            code: "C",
            description: "\u5713\u5F62\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          },
          {
            code: "K",
            description: "\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.45"
  },
  {
    id: "GFR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "G\u7CFB\u5217",
    group: "\u8ABF\u58D3\u904E\u6FFE\u5668",
    code: "GFR",
    name: "GFR\u7CFB\u5217\u8ABF\u58D3\u904E\u6FFE\u5668",
    format: "GFR{series}{port}{drain}{type}{bracket}{gauge}{gauge_type}{scale}{precision}{thread}{check_valve}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3\u6392\u6C34"
          },
          {
            code: "M",
            description: "\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "gauge_type",
        name: "\u58D3\u529B\u8868\u578B\u5F0F",
        options: [
          {
            code: "F",
            description: "\u65B9\u5F62\u8868"
          },
          {
            code: "C",
            description: "\u5713\u5F62\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          },
          {
            code: "K",
            description: "\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.47"
  },
  {
    id: "GL",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "G\u7CFB\u5217",
    group: "\u7D66\u6CB9\u5668",
    code: "GL",
    name: "GL\u7CFB\u5217\u7D66\u6CB9\u5668",
    format: "GL{series}{port}{bracket}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.49"
  },
  {
    id: "GR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "G\u7CFB\u5217",
    group: "\u8ABF\u58D3\u95A5",
    code: "GR",
    name: "GR\u7CFB\u5217\u8ABF\u58D3\u95A5",
    format: "GR{series}{port}{type}{bracket}{gauge}{gauge_type}{scale}{thread}{check_valve}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "gauge_type",
        name: "\u58D3\u529B\u8868\u578B\u5F0F",
        options: [
          {
            code: "F",
            description: "\u65B9\u5F62\u8868"
          },
          {
            code: "C",
            description: "\u5713\u5F62\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          },
          {
            code: "K",
            description: "\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.51"
  },
  {
    id: "GPF",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GP\u7CFB\u5217",
    group: "\u6CB9\u9727\u5206\u96E2\u5668",
    code: "GPF",
    name: "GPF\u7CFB\u5217\u6CB9\u9727\u5206\u96E2\u5668",
    format: "GPF{series}{cup}{port}{drain}{bracket}{precision}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          },
          {
            code: "C",
            description: "\u91D1\u5C6C\u676F"
          },
          {
            code: "N",
            description: "\u5C3C\u9F8D\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "M",
            description: "0.3\u03BCm"
          },
          {
            code: "D",
            description: "0.01\u03BCm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.53"
  },
  {
    id: "GPFR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GP\u7CFB\u5217",
    group: "\u8ABF\u58D3\u7CBE\u5BC6\u904E\u6FFE\u5668",
    code: "GPFR",
    name: "GPFR\u7CFB\u5217\u8ABF\u58D3\u7CBE\u5BC6\u904E\u6FFE\u5668",
    format: "GPFR{series}{cup}{port}{drain}{type}{bracket}{gauge}{precision}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          },
          {
            code: "C",
            description: "\u91D1\u5C6C\u676F"
          },
          {
            code: "N",
            description: "\u5C3C\u9F8D\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u8868\u5361\u6263"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "M",
            description: "0.3\u03BCm"
          },
          {
            code: "D",
            description: "0.01\u03BCm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.55"
  },
  {
    id: "GPR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GP\u7CFB\u5217",
    group: "\u7CBE\u5BC6\u8ABF\u58D3\u95A5",
    code: "GPR",
    name: "GPR\u7CFB\u5217\u7CBE\u5BC6\u8ABF\u58D3\u95A5",
    format: "GPR{series}{port}{range}{bracket}{gauge}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "range",
        name: "\u8A2D\u5B9A\u58D3\u529B\u7BC4\u570D",
        options: [
          {
            code: "L",
            description: "0.005~0.2MPa"
          },
          {
            code: "M",
            description: "0.01~0.4MPa"
          },
          {
            code: "H",
            description: "0.01~0.8MPa"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u58D3\u529B\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u58D3\u529B\u8868"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.58"
  },
  {
    id: "GA200",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u5206\u6C23\u584A",
    code: "GA200",
    name: "GA\u7CFB\u5217\u5206\u6C23\u584A",
    format: "GA200{port}{thread}",
    categories: [
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.63"
  },
  {
    id: "GAC100",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u4E09\u806F\u4EF6(100\u7CFB\u5217)",
    code: "GAC100",
    name: "GAC100\u7CFB\u5217\u4E09\u806F\u4EF6",
    format: "GAC100{cup}{port}{drain}{type}{gauge}{precision}{thread}{check_valve}",
    categories: [
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u5713\u8868\u5361\u6263"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.65"
  },
  {
    id: "GAC",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u4E09\u806F\u4EF6(F+R+L)",
    code: "GAC",
    name: "GAC\u7CFB\u5217\u4E09\u806F\u4EF6",
    format: "GAC{series}{cup}{port}{drain}{type}{gauge}{precision}{thread}{check_valve}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "500",
            description: "500\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          },
          {
            code: "C",
            description: "\u91D1\u5C6C\u676F"
          },
          {
            code: "N",
            description: "\u5C3C\u9F8D\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u8868\u5361\u6263"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          },
          {
            code: "K",
            description: "\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.66"
  },
  {
    id: "GAF100",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u904E\u6FFE\u5668(100\u7CFB\u5217)",
    code: "GAF100",
    name: "GAF100\u7CFB\u5217\u904E\u6FFE\u5668",
    format: "GAF100{cup}{port}{drain}{bracket}{precision}{thread}",
    categories: [
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.68"
  },
  {
    id: "GAF",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u904E\u6FFE\u5668",
    code: "GAF",
    name: "GAF\u7CFB\u5217\u904E\u6FFE\u5668",
    format: "GAF{series}{cup}{port}{drain}{bracket}{precision}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "500",
            description: "500\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          },
          {
            code: "C",
            description: "\u91D1\u5C6C\u676F"
          },
          {
            code: "N",
            description: "\u5C3C\u9F8D\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.69"
  },
  {
    id: "GAFC100",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u4E8C\u806F\u4EF6(100\u7CFB\u5217)",
    code: "GAFC100",
    name: "GAFC100\u7CFB\u5217\u4E8C\u806F\u4EF6",
    format: "GAFC100{cup}{port}{drain}{type}{gauge}{precision}{thread}{check_valve}",
    categories: [
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u5713\u8868\u5361\u6263"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.71"
  },
  {
    id: "GAFC",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u4E8C\u806F\u4EF6(F.R+L)",
    code: "GAFC",
    name: "GAFC\u7CFB\u5217\u4E8C\u806F\u4EF6",
    format: "GAFC{series}{cup}{port}{drain}{type}{gauge}{precision}{thread}{check_valve}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "500",
            description: "500\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          },
          {
            code: "C",
            description: "\u91D1\u5C6C\u676F"
          },
          {
            code: "N",
            description: "\u5C3C\u9F8D\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u8868\u5361\u6263"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          },
          {
            code: "K",
            description: "\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.72"
  },
  {
    id: "GAFR100",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u8ABF\u58D3\u904E\u6FFE\u5668(100\u7CFB\u5217)",
    code: "GAFR100",
    name: "GAFR100\u7CFB\u5217\u8ABF\u58D3\u904E\u6FFE\u5668",
    format: "GAFR100{cup}{port}{drain}{type}{bracket}{gauge}{precision}{thread}{check_valve}",
    categories: [
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u5713\u8868\u5361\u6263"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.74"
  },
  {
    id: "GAFR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u8ABF\u58D3\u904E\u6FFE\u5668",
    code: "GAFR",
    name: "GAFR\u7CFB\u5217\u8ABF\u58D3\u904E\u6FFE\u5668",
    format: "GAFR{series}{cup}{port}{drain}{type}{bracket}{gauge}{precision}{thread}{check_valve}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "500",
            description: "500\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          },
          {
            code: "C",
            description: "\u91D1\u5C6C\u676F"
          },
          {
            code: "N",
            description: "\u5C3C\u9F8D\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "drain",
        name: "\u6392\u6C34\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "\u5DEE\u58D3+\u624B\u52D5\u6392\u6C34"
          },
          {
            code: "A",
            description: "\u81EA\u52D5\u6392\u6C34"
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u8868\u5361\u6263"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          },
          {
            code: "K",
            description: "\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.75"
  },
  {
    id: "GAL100",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u7D66\u6CB9\u5668(100\u7CFB\u5217)",
    code: "GAL100",
    name: "GAL100\u7CFB\u5217\u7D66\u6CB9\u5668",
    format: "GAL100{cup}{port}{bracket}{thread}",
    categories: [
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.77"
  },
  {
    id: "GAL",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u7D66\u6CB9\u5668",
    code: "GAL",
    name: "GAL\u7CFB\u5217\u7D66\u6CB9\u5668",
    format: "GAL{series}{cup}{port}{bracket}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "500",
            description: "500\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "cup",
        name: "\u676F\u9AD4\u6750\u8CEA",
        options: [
          {
            code: "",
            description: "PC\u676F"
          },
          {
            code: "C",
            description: "\u91D1\u5C6C\u676F"
          },
          {
            code: "N",
            description: "\u5C3C\u9F8D\u676F"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.78"
  },
  {
    id: "GTC-GTFC-GTFR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "GT\u7D44\u5408(GTC/GTFC/GTFR)",
    code: "GTC200",
    name: "GTC\u3001GTFC\u3001GTFR\u7CFB\u5217(\u77ED\u6B3EPC\u676F)",
    format: "GTC200{port}{type}{bracket}{gauge}{precision}{thread}{check_valve}",
    categories: [
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u8868\u5361\u6263"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "precision",
        name: "\u904E\u6FFE\u7CBE\u5EA6",
        options: [
          {
            code: "",
            description: "40\u03BCm\u7D1A"
          },
          {
            code: "W",
            description: "5\u03BCm\u7D1A"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          },
          {
            code: "K",
            description: "\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.81"
  },
  {
    id: "GAR100",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u8ABF\u58D3\u95A5(100\u7CFB\u5217)",
    code: "GAR100",
    name: "GAR100\u7CFB\u5217\u8ABF\u58D3\u95A5",
    format: "GAR100{port}{type}{bracket}{gauge}{thread}{check_valve}",
    categories: [
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5"
          },
          {
            code: "06",
            description: '1/8"'
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u5713\u8868\u5361\u6263"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.83"
  },
  {
    id: "GAR",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "GA\u7CFB\u5217",
    group: "\u8ABF\u58D3\u95A5",
    code: "GAR",
    name: "GAR\u7CFB\u5217\u8ABF\u58D3\u95A5",
    format: "GAR{series}{port}{type}{bracket}{gauge}{thread}{check_valve}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          },
          {
            code: "500",
            description: "500\u7CFB\u5217"
          },
          {
            code: "600",
            description: "600\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          },
          {
            code: "20",
            description: '3/4"'
          },
          {
            code: "25",
            description: '1"'
          }
        ]
      },
      {
        id: "type",
        name: "\u578B\u5F0F\u4EE3\u78BC",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u578B"
          },
          {
            code: "L",
            description: "\u4F4E\u58D3\u578B"
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u8868\u5361\u6263"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      },
      {
        id: "check_valve",
        name: "\u9006\u6D41\u95A5\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u4E0D\u9644\u9006\u6D41\u95A5"
          },
          {
            code: "K",
            description: "\u9644\u9006\u6D41\u95A5"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.84"
  },
  {
    id: "GV-Slow",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u5176\u5B83\u7CFB\u5217",
    group: "GV\u7DE9\u555F\u52D5\u95A5",
    code: "GV",
    name: "GV\u7CFB\u5217\u6162\u555F\u95A5",
    format: "GV{series}{port}{bracket}{gauge}{gauge_type}{scale}{voltage}{connection}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "gauge",
        name: "\u58D3\u529B\u8868\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u8868"
          },
          {
            code: "N",
            description: "\u4E0D\u9644\u8868"
          }
        ]
      },
      {
        id: "gauge_type",
        name: "\u58D3\u529B\u8868\u578B\u5F0F",
        options: [
          {
            code: "F",
            description: "\u65B9\u5F62\u8868"
          },
          {
            code: "C",
            description: "\u5713\u5F62\u8868"
          }
        ]
      },
      {
        id: "scale",
        name: "\u523B\u5EA6\u55AE\u4F4D",
        options: [
          {
            code: "1",
            description: "MPa"
          },
          {
            code: "2",
            description: "psi"
          },
          {
            code: "3",
            description: "bar"
          }
        ]
      },
      {
        id: "voltage",
        name: "\u7DDA\u5708\u96FB\u58D3",
        options: [
          {
            code: "A",
            description: "AC220V"
          },
          {
            code: "B",
            description: "DC24V"
          },
          {
            code: "C",
            description: "AC110V"
          },
          {
            code: "E",
            description: "AC24V"
          },
          {
            code: "F",
            description: "DC12V"
          }
        ]
      },
      {
        id: "connection",
        name: "\u63A5\u96FB\u65B9\u5F0F",
        options: [
          {
            code: "",
            description: "DIN\u63D2\u5EA7\u5F0F"
          },
          {
            code: "I",
            description: "\u51FA\u7DDA\u5F0F"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.86"
  },
  {
    id: "GZ",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u5176\u5B83\u7CFB\u5217",
    group: "GZ\u7CFB\u5217",
    code: "GZ",
    name: "GZ\u7CFB\u5217\u622A\u6B62\u95A5",
    format: "GZ{series}{port}{bracket}{thread}",
    categories: [
      {
        id: "series",
        name: "\u7CFB\u5217\u4EE3\u865F",
        options: [
          {
            code: "200",
            description: "200\u7CFB\u5217"
          },
          {
            code: "300",
            description: "300\u7CFB\u5217"
          },
          {
            code: "400",
            description: "400\u7CFB\u5217"
          }
        ]
      },
      {
        id: "port",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "06",
            description: '1/8"'
          },
          {
            code: "08",
            description: '1/4"'
          },
          {
            code: "10",
            description: '3/8"'
          },
          {
            code: "15",
            description: '1/2"'
          }
        ]
      },
      {
        id: "bracket",
        name: "\u652F\u67B6\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "\u9644\u652F\u67B6"
          },
          {
            code: "J",
            description: "\u4E0D\u9644\u652F\u67B6"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ],
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.88"
  },
  {
    id: "F-G-Gauge",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u58D3\u529B\u8868",
    group: "GS/GF/GU\u7CFB\u5217 \u58D3\u529B\u8868",
    code: "",
    name: "GS\u3001GF\u3001GU\u7CFB\u5217 \u58D3\u529B\u8868",
    format: "F-G{installation}{dial}{display}{unit}",
    categories: [
      {
        id: "installation",
        name: "\u5B89\u88DD\u578B\u5F0F",
        options: [
          {
            code: "S",
            description: "\u6A19\u6E96\u5B89\u88DD"
          },
          {
            code: "F",
            description: "\u9762\u677F\u5B89\u88DD"
          },
          {
            code: "U",
            description: "\u5D4C\u5165\u5F0F\u5B89\u88DD"
          }
        ]
      },
      {
        id: "dial",
        name: "\u8868\u76E4\u898F\u683C",
        options: [
          {
            code: "30",
            description: "\u5916\u5F9130"
          },
          {
            code: "40",
            description: "\u5916\u5F9140"
          },
          {
            code: "50",
            description: "\u5916\u5F9150"
          },
          {
            code: "60",
            description: "\u5916\u5F9160"
          }
        ]
      },
      {
        id: "display",
        name: "\u6700\u5927\u986F\u793A\u58D3\u529B\u503C",
        options: [
          {
            code: "04",
            description: "0.4MPa (\u4F4E\u58D3\u578B)"
          },
          {
            code: "10",
            description: "1.0MPa (\u6A19\u6E96\u578B)"
          }
        ]
      },
      {
        id: "unit",
        name: "\u58D3\u529B\u523B\u5EA6\u55AE\u4F4D\u8207\u7259\u578B",
        options: [
          {
            code: "M",
            description: "MPa (PT\u7259)"
          },
          {
            code: "B",
            description: "bar (G\u7259)"
          },
          {
            code: "P",
            description: "psi (NPT\u7259)"
          },
          {
            code: "Z",
            description: "kgf/cm\xB2 & psi (PT\u7259)"
          }
        ]
      }
    ],
    note: "\u8A02\u8CFC\u78BC\u7BC4\u4F8B F-GS4010M\u3002\u8868\u76E4/\u53E3\u5F91\u5C0D\u61C9\uFF1AGS-30/40/50\u3001GF-40/50/60\u3001GU-40/50/60\u3002",
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.287"
  },
  {
    id: "F-GP-Gauge",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u58D3\u529B\u8868",
    group: "GP\u7CFB\u5217 \u58D3\u529B\u8868",
    code: "",
    name: "GP\u7CFB\u5217 \u58D3\u529B\u8868",
    format: "F-GP{dial}{display}{unit}",
    categories: [
      {
        id: "dial",
        name: "\u8868\u76E4\u898F\u683C",
        options: [
          {
            code: "30",
            description: "\u5916\u5F9130"
          },
          {
            code: "40",
            description: "\u5916\u5F9140"
          }
        ]
      },
      {
        id: "display",
        name: "\u6700\u5927\u986F\u793A\u58D3\u529B\u503C",
        options: [
          {
            code: "02",
            description: "0.2MPa (\u4F4E\u58D3\u578B)"
          },
          {
            code: "04",
            description: "0.4MPa (\u4F4E\u58D3\u578B)"
          },
          {
            code: "10",
            description: "1.0MPa (\u6A19\u6E96\u578B)"
          }
        ]
      },
      {
        id: "unit",
        name: "\u58D3\u529B\u523B\u5EA6\u55AE\u4F4D\u8207\u7259\u578B",
        options: [
          {
            code: "G",
            description: "MPa & bar (G\u7259)"
          },
          {
            code: "P",
            description: "MPa & psi (PT\u7259)"
          },
          {
            code: "T",
            description: "bar & psi (NPT\u7259)"
          }
        ]
      }
    ],
    note: "\u8A02\u8CFC\u78BC\u7BC4\u4F8B F-GP4010P\u3002",
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.287"
  },
  {
    id: "F-GV-Gauge",
    category: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6",
    superGroup: "\u771F\u7A7A\u7CFB\u5217",
    group: "GV\u7CFB\u5217 \u771F\u7A7A\u58D3\u529B\u8868",
    code: "",
    name: "F-GV\u7CFB\u5217 \u771F\u7A7A\u58D3\u529B\u8868",
    format: "F-GV{dial}{display}{unit}",
    categories: [
      {
        id: "dial",
        name: "\u8868\u76E4\u898F\u683C",
        options: [
          {
            code: "40",
            description: "\u5916\u5F9140"
          }
        ]
      },
      {
        id: "display",
        name: "\u6700\u5927\u986F\u793A\u58D3\u529B\u503C",
        options: [
          {
            code: "10",
            description: "-100kPa"
          }
        ]
      },
      {
        id: "unit",
        name: "\u58D3\u529B\u523B\u5EA6\u55AE\u4F4D\u8207\u7259\u578B",
        options: [
          {
            code: "G",
            description: "kPa & psi (G\u7259)"
          },
          {
            code: "P",
            description: "kPa & psi (PT\u7259)"
          },
          {
            code: "T",
            description: "kPa & psi (NPT\u7259)"
          }
        ]
      }
    ],
    note: "\u8A02\u8CFC\u78BC\u7BC4\u4F8B F-GV4010P\u3002",
    sourceFile: "\u6C23\u6E90\u8655\u7406\u5143\u4EF6\u578B\u9304 P.273"
  }
];

// src/data/catalog-auxiliary.json
var catalog_auxiliary_default = [
  {
    id: "PC",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u5FEB\u901F\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PC\u7CFB\u5217 \u87BA\u7D0B\u76F4\u901A",
    format: "{spec} {tube_od} {thread_spec}{color}{thread_type}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PC",
            description: "\u87BA\u7D0B\u76F4\u901A"
          },
          {
            code: "POC",
            description: "\u5713\u87BA\u7D0B\u76F4\u901A"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread_spec",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272)"
          }
        ]
      },
      {
        id: "thread_type",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.259"
  },
  {
    id: "PC-M",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u5FEB\u901F\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E(\u8FF7\u4F60)",
    code: "",
    name: "PC\u8FF7\u4F60\u7CFB\u5217 \u87BA\u7D0B\u76F4\u901A",
    format: "{spec} {tube_od} {thread_spec}{color}{thread_type}-{type_suffix}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PC",
            description: "\u87BA\u7D0B\u76F4\u901A"
          },
          {
            code: "PL",
            description: "L\u578B\u87BA\u7D0B\u4E8C\u901A"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "3.2",
            description: "$3.2mm"
          },
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          }
        ]
      },
      {
        id: "thread_spec",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M3",
            description: "M3X0.5"
          },
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272)"
          }
        ]
      },
      {
        id: "thread_type",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "type_suffix",
        name: "\u985E\u578B\u4EE3\u865F",
        options: [
          {
            code: "M",
            description: "\u8FF7\u4F60\u578B"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.260"
  },
  {
    id: "PL",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u5FEB\u901F\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PL\u7CFB\u5217 L\u578B\u87BA\u7D0B\u4E8C\u901A",
    format: "{spec} {tube_od} {thread_spec}{color}{thread_type}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PHW",
            description: "F\u578B\u87BA\u7D0B\u53EF\u65CB\u4E09\u901A"
          },
          {
            code: "PL",
            description: "L\u578B\u87BA\u7D0B\u4E8C\u901A"
          },
          {
            code: "PHF",
            description: "\u4E32\u806F\u8098\u7BC0"
          },
          {
            code: "PLL",
            description: "L\u578B\u52A0\u9577\u87BA\u7D0B\u4E8C\u901A"
          },
          {
            code: "PEB",
            description: "T\u578B\u6B63\u87BA\u7D0B\u4E09\u901A"
          },
          {
            code: "PLF",
            description: "L\u578B\u5167\u87BA\u7D0B\u4E8C\u901A"
          },
          {
            code: "PED",
            description: "T\u578B\u5074\u87BA\u7D0B\u4E09\u901A"
          },
          {
            code: "PCF",
            description: "\u5167\u87BA\u7D0B\u76F4\u901A"
          },
          {
            code: "PYB",
            description: "Y\u578B\u87BA\u7D0B\u4E09\u901A"
          },
          {
            code: "PMF",
            description: "\u5167\u7259\u7A7F\u677F\u76F4\u901A"
          },
          {
            code: "PZB",
            description: "\u5341\u5B57\u87BA\u7D0B\u56DB\u901A"
          },
          {
            code: "PH",
            description: "\u5916\u516D\u89D2\u8098\u7BC0"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread_spec",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272 / \u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272 / \u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      },
      {
        id: "thread_type",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.261"
  },
  {
    id: "PKD",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u5FEB\u901F\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "PKD",
    name: "PKD\u7CFB\u5217 \u6E1B\u5F91\u87BA\u7D0B\u4E94\u901A",
    format: "{code} {tube_od_1}-{tube_od_2} {thread_spec}{color}{thread_type}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PKD",
            description: "\u6E1B\u5F91\u87BA\u7D0B\u4E94\u901A"
          }
        ]
      },
      {
        id: "tube_od_1",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          }
        ]
      },
      {
        id: "tube_od_2",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          }
        ]
      },
      {
        id: "thread_spec",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272 / \u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272 / \u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      },
      {
        id: "thread_type",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.261"
  },
  {
    id: "BPC",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u5FEB\u901F\u63A5\u982D",
    group: "\u5168\u91D1\u5C6C\u985E",
    code: "",
    name: "BPC\u7CFB\u5217 \u5168\u91D1\u5C6C\u87BA\u7D0B\u76F4\u901A",
    format: "{spec} {tube_od} {thread_spec}{thread_type}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "BPC",
            description: "\u5168\u91D1\u5C6C\u87BA\u7D0B\u76F4\u901A"
          },
          {
            code: "BPCF",
            description: "\u5168\u91D1\u5C6C\u5167\u87BA\u7D0B\u76F4\u901A"
          },
          {
            code: "BPOC",
            description: "\u5168\u91D1\u5C6C\u5713\u87BA\u7D0B\u76F4\u901A"
          },
          {
            code: "BPMF",
            description: "\u5168\u91D1\u5C6C\u5167\u7259\u7A7F\u677F\u76F4\u901A"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "$8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread_spec",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "thread_type",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    workingPressureRange: "0~9kgf/cm\xB2(0~0.9MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: 0~150\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272, [\u6CE8]\u9AD8\u6EAB\u5834\u5408\u4F7F\u7528\u6642,\u9700\u78BA\u8A8D\u8EDF\u7BA1\u6216PU\u7BA1\u8010\u6EAB\u7B49\u7D1A\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.265"
  },
  {
    id: "BPM",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u5FEB\u901F\u63A5\u982D",
    group: "\u5168\u91D1\u5C6C\u985E",
    code: "BPM",
    name: "BPM\u7CFB\u5217 \u5168\u91D1\u5C6C\u7A7F\u677F\u76F4\u901A",
    format: "{code} {tube_od}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "BPM",
            description: "\u5168\u91D1\u5C6C\u7A7F\u677F\u76F4\u901A"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      }
    ],
    workingPressureRange: "0~9kgf/cm\xB2(0~0.9MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: 0~150\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272, [\u6CE8]\u9AD8\u6EAB\u5834\u5408\u4F7F\u7528\u6642,\u9700\u78BA\u8A8D\u8EDF\u7BA1\u6216PU\u7BA1\u8010\u6EAB\u7B49\u7D1A\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.265"
  },
  {
    id: "PE",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u5FEB\u901F\u63A5\u982D",
    group: "\u63D2\u7BA1-\u63D2\u7BA1\u985E",
    code: "",
    name: "PE\u7CFB\u5217 T\u578B\u4E09\u901A",
    format: "{spec} {tube_od}{color}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PM",
            description: "\u7A7F\u677F\u76F4\u901A"
          },
          {
            code: "PE",
            description: "T\u578B\u4E09\u901A"
          },
          {
            code: "PP",
            description: "\u7BA1\u585E"
          },
          {
            code: "PV",
            description: "L\u578B\u4E8C\u901A"
          },
          {
            code: "PLM",
            description: "\u76F4\u89D2\u7A7F\u677F"
          },
          {
            code: "PY",
            description: "Y\u578B\u4E09\u901A"
          },
          {
            code: "PZ",
            description: "\u5341\u5B57\u56DB\u901A"
          },
          {
            code: "PU",
            description: "\u76F4\u901A"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272 / \u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272 / \u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.267"
  },
  {
    id: "PEG",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u5FEB\u901F\u63A5\u982D",
    group: "\u63D2\u7BA1-\u63D2\u7BA1\u985E(\u6E1B\u5F91/\u591A\u901A)",
    code: "",
    name: "PEG\u7CFB\u5217 T\u578B\u6B63\u6E1B\u5F91\u4E09\u901A",
    format: "{spec} {tube_od_1}-{tube_od_2}{color}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PG",
            description: "\u6E1B\u5F91\u76F4\u901A"
          },
          {
            code: "PZG",
            description: "\u5341\u5B57\u6E1B\u5F91\u56DB\u901A"
          },
          {
            code: "PEW",
            description: "T\u578B\u5074\u6E1B\u5F91\u4E09\u901A"
          },
          {
            code: "PYW",
            description: "Y\u578B\u6E1B\u5F91\u4E09\u901A"
          },
          {
            code: "PGJ",
            description: "\u63D2\u6746\u6E1B\u5F91\u76F4\u901A"
          },
          {
            code: "PEG",
            description: "T\u578B\u6B63\u6E1B\u5F91\u4E09\u901A"
          },
          {
            code: "PKG",
            description: "\u6E1B\u5F91\u4E94\u901A"
          },
          {
            code: "PHK",
            description: "\u53EF\u65CB\u6E1B\u5F91\u4E94\u901A"
          },
          {
            code: "PHD",
            description: "\u53EF\u65CB\u6E1B\u5F91\u516D\u901A"
          }
        ]
      },
      {
        id: "tube_od_1",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "$8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "tube_od_2",
        name: "\u63A5\u7BA1\u53E3\u5F91II",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272 / \u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272 / \u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.267"
  },
  {
    id: "BB",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u91D1\u5C6C\u87BA\u7D0B\u63A5\u982D",
    group: "\u87BA\u7D0B-\u87BA\u7D0B\u985E",
    code: "",
    name: "BB\u7CFB\u5217 \u96D9\u5916\u87BA\u7D0B\u76F4\u901A",
    format: "{spec} {thread_spec_1} {thread_spec_2}{thread_type}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "BB",
            description: "\u96D9\u5916\u87BA\u7D0B\u76F4\u901A"
          },
          {
            code: "BD",
            description: "\u5167\u5916\u87BA\u7D0B\u76F4\u901A [\u6CE81]"
          },
          {
            code: "BU",
            description: "\u96D9\u5167\u87BA\u7D0B\u76F4\u901A"
          },
          {
            code: "BZ",
            description: "\u5916\u516D\u89D2\u5835\u982D[\u6CE82]"
          }
        ]
      },
      {
        id: "thread_spec_1",
        name: "\u9023\u63A5\u87BA\u7D0BI",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "thread_spec_2",
        name: "\u9023\u63A5\u87BA\u7D0BII",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "thread_type",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 3.0MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: 0~150\u2103, [\u6CE81] BD\u7CFB\u5217\u4E2D,\u9023\u63A5\u87BA\u7D0BI\u6307\u5167\u87BA\u7D0B\u898F\u683C,\u9023\u63A5\u87BA\u7D0BII\u6307\u5916\u87BA\u7D0B\u898F\u683C; [\u6CE82]BZ\u7CFB\u5217\u4E2D,\u7121\u9023\u63A5\u87BA\u7D0BII\u4EE3\u78BC\u9805,\u4E14\u9023\u63A5\u87BA\u7D0B\u6307\u5916\u87BA\u7D0B\u898F\u683C\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.271"
  },
  {
    id: "BKC",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u91D1\u5C6C\u87BA\u7D0B\u63A5\u982D",
    group: "\u9396\u6BCD\u76F4\u901A",
    code: "BKC",
    name: "BKC\u7CFB\u5217 \u9396\u6BCD\u76F4\u901A",
    format: "{code} {tube_od_out} {tube_od_in}-{thread_spec}{thread_type}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "BKC",
            description: "\u9396\u6BCD\u76F4\u901A"
          }
        ]
      },
      {
        id: "tube_od_out",
        name: "\u63A5\u7BA1\u5916\u5F91",
        options: [
          {
            code: "04",
            description: "4mm"
          },
          {
            code: "06",
            description: "6mm"
          },
          {
            code: "08",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "tube_od_in",
        name: "\u63A5\u7BA1\u5167\u5F91",
        options: [
          {
            code: "25",
            description: "2.5mm"
          },
          {
            code: "04",
            description: "4mm"
          },
          {
            code: "05",
            description: "5mm"
          },
          {
            code: "06",
            description: "6mm"
          },
          {
            code: "65",
            description: "6.5mm"
          },
          {
            code: "75",
            description: "7.5mm"
          },
          {
            code: "08",
            description: "8mm"
          },
          {
            code: "09",
            description: "9mm"
          }
        ]
      },
      {
        id: "thread_spec",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M3",
            description: "M3X0.5"
          },
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "thread_type",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 3.0MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: 0~150\u2103, [\u6CE8]\u4F7F\u75288\xD75.5\u7BA1\u5B50\u53EF\u7528BKC0806\u7684\u9396\u6BCD\u76F4\u901A\u63A5\u982D; \u9AD8\u6EAB\u5834\u5408\u4F7F\u7528\u6642,\u9700\u78BA\u8A8D\u8EDF\u7BA1\u6216PU\u7BA1\u8010\u6EAB\u7B49\u7D1A\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.272"
  },
  {
    id: "BSL",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u6D88\u8072\u5668",
    group: "BSL/BSLM/BESL/PAL\u7CFB\u5217",
    code: "",
    name: "BSL\u7CFB\u5217 \u901A\u7528\u578B\u6D88\u8072\u5668",
    format: "{spec} {thread_spec}{color}",
    categories: [
      {
        id: "spec",
        name: "\u6D88\u8072\u5668\u985E\u578B",
        options: [
          {
            code: "BSL",
            description: "\u901A\u7528\u578B\u6D88\u8072\u5668"
          },
          {
            code: "BSLM",
            description: "\u5FAE\u578B\u6D88\u8072\u5668"
          },
          {
            code: "BESL",
            description: "\u7BC0\u6D41\u578B\u6D88\u8072\u5668"
          },
          {
            code: "PAL",
            description: "\u5851\u6599\u6D88\u8072\u5668"
          },
          {
            code: "PALM",
            description: "\u8FF7\u4F60\u578B\u5851\u6599\u6D88\u8072\u5668"
          }
        ]
      },
      {
        id: "thread_spec",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272 / \u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272 / \u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.311"
  },
  {
    id: "PPA",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u6D88\u8072\u5668",
    group: "PPA\u7BA1\u585E\u5F0F",
    code: "PPA",
    name: "PPA\u7CFB\u5217 \u7BA1\u585E\u5F0F\u6D88\u8072\u5668",
    format: "{code} {tube_od}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PPA",
            description: "\u7BA1\u585E\u5F0F\u6D88\u8072\u5668"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "6",
            description: "\u03A66"
          },
          {
            code: "8",
            description: "\u03A68"
          },
          {
            code: "10",
            description: "\u03A610"
          },
          {
            code: "12",
            description: "\u03A612"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.313"
  },
  {
    id: "PHV",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u624B\u95A5",
    group: "PHV\u7CFB\u5217",
    code: "PHV",
    name: "PHV\u7CFB\u5217 \u624B\u95A5",
    format: "{code} {tube_od} {valve_spec}{color}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PHV",
            description: "\u624B\u95A5"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "valve_spec",
        name: "\u95A5\u898F\u683C",
        options: [
          {
            code: "A",
            description: "\u4E09\u901A"
          },
          {
            code: "B",
            description: "\u4E8C\u901A"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272/\u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272/\u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: '\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272, [\u6CE8]"\u53E3"\u4EE3\u8868A/B\u5169\u7A2E,A\u70BA\u4E09\u901A,B\u70BA\u5169\u901A\u3002\u5169\u7A2E\u898F\u683C\u5916\u5F62\u5C3A\u5BF8\u76F8\u540C\u3002',
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.321"
  },
  {
    id: "PSL",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u8ABF\u901F\u95A5",
    group: "PSL/PSS\u7CFB\u5217",
    code: "",
    name: "PSL\u7CFB\u5217 L\u578B",
    format: "{spec} {tube_od} {thread_spec} {throttle_type}{color}{thread_type_suffix}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PSL",
            description: "L\u578B"
          },
          {
            code: "PSS",
            description: "\u842C\u5411\u578B"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread_spec",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "throttle_type",
        name: "\u7BC0\u6D41\u65B9\u5F0F",
        options: [
          {
            code: "A",
            description: '\u6392\u6C23\u7BC0\u6D41\u578B (\u8ABF\u7BC0\u5E3D\u6A19\u8B58\u7B26"A")'
          },
          {
            code: "B",
            description: '\u9032\u6C23\u7BC0\u6D41\u578B (\u8ABF\u7BC0\u5E3D\u6A19\u8B58\u7B26"B")'
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272 / \u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272 / \u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      },
      {
        id: "thread_type_suffix",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.314"
  },
  {
    id: "PSA",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u8ABF\u901F\u95A5",
    group: "PSA\u7CFB\u5217",
    code: "PSA",
    name: "PSA\u7CFB\u5217 \u76F4\u901A\u578B",
    format: "{code} {tube_od}{color}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PSA",
            description: "\u76F4\u901A\u578B"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272 / \u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272 / \u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.314"
  },
  {
    id: "PTL",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u8ABF\u901F\u95A5",
    group: "PTL/PTS\u63A8\u9396\u7CFB\u5217",
    code: "",
    name: "PTL\u7CFB\u5217 \u63A8\u9396L\u578B\u8ABF\u901F\u95A5",
    format: "{spec} {tube_od} {thread_spec} {throttle_type}{color}{thread_type_suffix}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PTL",
            description: "\u63A8\u9396L\u578B\u8ABF\u901F\u95A5"
          },
          {
            code: "PTS",
            description: "\u63A8\u9396\u842C\u5411\u578B\u8ABF\u901F\u95A5"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "$6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "$10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread_spec",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "throttle_type",
        name: "\u7BC0\u6D41\u65B9\u5F0F",
        options: [
          {
            code: "A",
            description: '\u6392\u6C23\u7BC0\u6D41\u578B (\u8ABF\u7BC0\u5E3D\u6A19\u8B58\u7B26"A")'
          },
          {
            code: "B",
            description: '\u9032\u6C23\u7BC0\u6D41\u578B (\u8ABF\u7BC0\u5E3D\u6A19\u8B58\u7B26"B")'
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272 / \u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272 / \u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      },
      {
        id: "thread_type_suffix",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.320"
  },
  {
    id: "PTA",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u8ABF\u901F\u95A5",
    group: "PTA\u7CFB\u5217",
    code: "PTA",
    name: "PTA\u7CFB\u5217 \u76F4\u901A\u578B",
    format: "{code} {tube_od}{color}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PTA",
            description: "\u76F4\u901A\u578B"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "$8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272 / \u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272 / \u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.320"
  },
  {
    id: "PTL-M",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u8ABF\u901F\u95A5",
    group: "PTL\u8FF7\u4F60\u7CFB\u5217",
    code: "",
    name: "PTL\u8FF7\u4F60\u7CFB\u5217 \u63A8\u9396\u578B\u8ABF\u901F\u95A5",
    format: "{spec} {tube_od} {thread_spec} {throttle_type}{color}{thread_type_suffix}-{type_suffix}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PTL",
            description: "\u63A8\u9396\u578B\u8ABF\u901F\u95A5"
          }
        ]
      },
      {
        id: "tube_od",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          }
        ]
      },
      {
        id: "thread_spec",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          }
        ]
      },
      {
        id: "throttle_type",
        name: "\u7BC0\u6D41\u65B9\u5F0F",
        options: [
          {
            code: "A",
            description: '\u6392\u6C23\u7BC0\u6D41\u578B (\u8ABF\u7BC0\u5E3D\u6A19\u8B58\u7B26"A")'
          },
          {
            code: "B",
            description: '\u9032\u6C23\u7BC0\u6D41\u578B (\u8ABF\u7BC0\u5E3D\u6A19\u8B58\u7B26"B")'
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272 (\u63A5\u53E3:\u7070\u8272 / \u672C\u9AD4:\u7070\u8272)"
          },
          {
            code: "D",
            description: "\u9ED1\u8272 (\u63A5\u53E3:\u9ED1\u8272 / \u672C\u9AD4:\u9ED1\u8272)"
          }
        ]
      },
      {
        id: "thread_type_suffix",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "type_suffix",
        name: "\u985E\u578B\u4EE3\u865F",
        options: [
          {
            code: "M",
            description: "\u8FF7\u4F60\u578B"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u8CA0\u58D3: -750mmHg(10Torr), \u4FDD\u8B49\u8010\u58D3\u529B: 1.5MPa, \u4F7F\u7528\u6EAB\u5EA6\u7BC4\u570D: -20~70\u2103, \u9069\u7528\u8EDF\u7BA1: \u5C3C\u9F8D\u8EDF\u7BA1\u6216PU\u7BA1, \u984F\u8272: \u7070\u8272/\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.318"
  },
  {
    id: "PC-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PC\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PC",
            description: "\u87BA\u7D0B\u76F4\u901A"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u672C\u9AD4\u6750\u8CEA\u70BA\u4E0D\u92B9\u92FC304,\u4E14\u6240\u6709\u6750\u6599\u5747\u4E0D\u542B\u9285,\u53EF\u7528\u4E8E\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.283"
  },
  {
    id: "POC-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "POC\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "POC",
            description: "\u5713\u87BA\u7D0B\u76F4\u901A"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u672C\u9AD4\u6750\u8CEA\u70BA\u4E0D\u92B9\u92FC304,\u4E14\u6240\u6709\u6750\u6599\u5747\u4E0D\u542B\u9285,\u53EF\u7528\u4E8E\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.283"
  },
  {
    id: "PHW-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PHW\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PHW",
            description: "F\u578B\u87BA\u7D0B\u53EF\u65CB\u4E09\u901A"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "\u03A68mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.284"
  },
  {
    id: "PZB-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PZB\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PZB",
            description: "\u5341\u5B57\u87BA\u7D0B\u56DB\u901A"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "\u03A68mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.284"
  },
  {
    id: "PHF-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PHF\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PHF",
            description: "\u4E32\u806F\u8098\u7BC0"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "\u03A68mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.284"
  },
  {
    id: "PL-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PL\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PL",
            description: "L\u578B\u87BA\u7D0B\u4E8C\u901A"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "\u03A68mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.284"
  },
  {
    id: "PEB-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PEB\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PEB",
            description: "T\u578B\u6B63\u87BA\u7D0B\u4E09\u901A"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "\u03A68mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.284"
  },
  {
    id: "PLL-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PLL\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PLL",
            description: "L\u578B\u52A0\u9577\u87BA\u7D0B\u4E8C\u901A"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "\u03A68mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.284"
  },
  {
    id: "PED-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PED\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PED",
            description: "T\u578B\u5074\u87BA\u7D0B\u4E09\u901A"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "\u03A68mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.284"
  },
  {
    id: "PH-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PH\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PH",
            description: "\u5916\u516D\u89D2\u8098\u7BC0"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "\u03A68mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.284"
  },
  {
    id: "PYB-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PYB\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PYB",
            description: "Y\u578B\u87BA\u7D0B\u4E09\u901A"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "\u03A68mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.284"
  },
  {
    id: "PKD-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u63D2\u7BA1-\u87BA\u7D0B\u985E",
    code: "",
    name: "PKD\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD1}-{tubeOD2}{thread}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PKD",
            description: "\u6E1B\u5F91\u87BA\u7D0B\u4E94\u901A"
          }
        ]
      },
      {
        id: "tubeOD1",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          }
        ]
      },
      {
        id: "tubeOD2",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.284"
  },
  {
    id: "BB-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u87BA\u7D0B-\u87BA\u7D0B\u985E",
    code: "",
    name: "BB\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{thread1}{thread2}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "BB",
            description: "\u96D9\u5916\u87BA\u7D0B\u76F4\u901A"
          }
        ]
      },
      {
        id: "thread1",
        name: "\u9023\u63A5\u87BA\u7D0BI",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "thread2",
        name: "\u9023\u63A5\u87BA\u7D0BII",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u5168\u91D1\u5C6C\u63A5\u982D\u9069\u7528\u4E8E\u9AD8\u6EAB\u74B0\u5883,\u4E0D\u92B9\u92FC304\u6750\u8CEA\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.288"
  },
  {
    id: "BD-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u87BA\u7D0B-\u87BA\u7D0B\u985E",
    code: "",
    name: "BD\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{thread1}{thread2}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "BD",
            description: "\u5167\u5916\u87BA\u7D0B\u76F4\u901A"
          }
        ]
      },
      {
        id: "thread1",
        name: "\u9023\u63A5\u87BA\u7D0BI",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "thread2",
        name: "\u9023\u63A5\u87BA\u7D0BII",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "[\u6CE81] BD\u7CFB\u5217\u4E2D,\u9023\u63A5\u87BA\u7D0BI\u6307\u5167\u87BA\u7D0B\u898F\u683C,\u9023\u63A5\u87BA\u7D0BII\u6307\u5916\u87BA\u7D0B\u898F\u683C; \u5168\u91D1\u5C6C\u63A5\u982D\u9069\u7528\u4E8E\u9AD8\u6EAB\u74B0\u5883,\u4E0D\u92B9\u92FC304\u6750\u8CEA\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.288"
  },
  {
    id: "BU-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u87BA\u7D0B-\u87BA\u7D0B\u985E",
    code: "",
    name: "BU\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{thread1}{thread2}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "BU",
            description: "\u96D9\u5167\u87BA\u7D0B\u76F4\u901A"
          }
        ]
      },
      {
        id: "thread1",
        name: "\u9023\u63A5\u87BA\u7D0BI",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "thread2",
        name: "\u9023\u63A5\u87BA\u7D0BII",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u5168\u91D1\u5C6C\u63A5\u982D\u9069\u7528\u4E8E\u9AD8\u6EAB\u74B0\u5883,\u4E0D\u92B9\u92FC304\u6750\u8CEA\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.288"
  },
  {
    id: "BZ-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u87BA\u7D0B-\u87BA\u7D0B\u985E",
    code: "",
    name: "BZ\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{thread1}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "BZ",
            description: "\u5916\u516D\u89D2\u5835\u982D"
          }
        ]
      },
      {
        id: "thread1",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "[\u6CE82]BZ\u7CFB\u5217\u4E2D,\u7121\u9023\u63A5\u87BA\u7D0BII\u4EE3\u78BC\u9805,\u4E14\u9023\u63A5\u87BA\u7D0B\u6307\u5916\u87BA\u7D0B\u898F\u683C; \u5168\u91D1\u5C6C\u63A5\u982D\u9069\u7528\u4E8E\u9AD8\u6EAB\u74B0\u5883,\u4E0D\u92B9\u92FC304\u6750\u8CEA\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.288"
  },
  {
    id: "BKC-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    group: "\u9396\u6BCD\u76F4\u901A",
    code: "",
    name: "BKC\u7CFB\u5217 \u4E0D\u92B9\u92FC\u7BA1\u63A5\u982D",
    format: "{spec}{tubeOD}{tubeID}-{thread}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "BKC",
            description: "\u9396\u6BCD\u76F4\u901A"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u5916\u5F91",
        options: [
          {
            code: "04",
            description: "4mm"
          },
          {
            code: "06",
            description: "6mm"
          },
          {
            code: "08",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "tubeID",
        name: "\u63A5\u7BA1\u5167\u5F91",
        options: [
          {
            code: "25",
            description: "2.5mm"
          },
          {
            code: "04",
            description: "\u03A64mm"
          },
          {
            code: "05",
            description: "\u03A65mm"
          },
          {
            code: "06",
            description: "\u03A66mm"
          },
          {
            code: "65",
            description: "\u03A66.5mm"
          },
          {
            code: "75",
            description: "\u03A67.5mm"
          },
          {
            code: "08",
            description: "\u03A68mm"
          },
          {
            code: "09",
            description: "9mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M3",
            description: "M3X0.5"
          },
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "[\u6CE8]\u4F7F\u75288\xD75.5\u7BA1\u5B50\u53EF\u7528BKC0806\u7684\u9396\u6BCD\u76F4\u901A\u63A5\u982D; [\u6CE8]\u9AD8\u6EAB\u5834\u5408\u4F7F\u7528\u6642,\u9700\u78BA\u8A8D\u8EDF\u7BA1\u6216PU\u7BA1\u8010\u6EAB\u7B49\u7D1A; \u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.289"
  },
  {
    id: "PSL-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u8ABF\u901F\u95A5",
    group: "PSL/PSS\u7CFB\u5217",
    code: "",
    name: "PSL\u7CFB\u5217 \u4E0D\u92B9\u92FC\u8ABF\u901F\u95A5",
    format: "{spec}{tubeOD}{thread}{throttleType}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PSL",
            description: "L\u578B"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "throttleType",
        name: "\u7BC0\u6D41\u65B9\u5F0F",
        options: [
          {
            code: "A",
            description: "\u6392\u6C23\u7BC0\u6D41\u578B"
          },
          {
            code: "B",
            description: "\u9032\u6C23\u7BC0\u6D41\u578B"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883; \u6392\u6C23\u7BC0\u6D41\u578B\u548C\u9032\u6C23\u7BC0\u6D41\u578B\u53EF\u9078,\u7528\u4E8E\u5404\u7A2E\u578B\u865F\u4E4B\u57F7\u884C\u5143\u4EF6; \u87BA\u7D0B\u7AEF\u81EA\u5E36PT\u87BA\u7D0B\u81A0,\u80FD\u6709\u6548\u5BC6\u5C01\u87BA\u7D0B\u9023\u63A5\u90E8\u4F4D\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.331"
  },
  {
    id: "PSS-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u8ABF\u901F\u95A5",
    group: "PSL/PSS\u7CFB\u5217",
    code: "",
    name: "PSS\u7CFB\u5217 \u4E0D\u92B9\u92FC\u8ABF\u901F\u95A5",
    format: "{spec}{tubeOD}{thread}{throttleType}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PSS",
            description: "\u842C\u5411\u578B"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "throttleType",
        name: "\u7BC0\u6D41\u65B9\u5F0F",
        options: [
          {
            code: "A",
            description: "\u6392\u6C23\u7BC0\u6D41\u578B"
          },
          {
            code: "B",
            description: "\u9032\u6C23\u7BC0\u6D41\u578B"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883; \u6392\u6C23\u7BC0\u6D41\u578B\u548C\u9032\u6C23\u7BC0\u6D41\u578B\u53EF\u9078,\u7528\u4E8E\u5404\u7A2E\u578B\u865F\u4E4B\u57F7\u884C\u5143\u4EF6; \u87BA\u7D0B\u7AEF\u81EA\u5E36PT\u87BA\u7D0B\u81A0,\u80FD\u6709\u6548\u5BC6\u5C01\u87BA\u7D0B\u9023\u63A5\u90E8\u4F4D; \u842C\u5411\u578B\u8ABF\u901F\u95A5(PSS)\u63D2\u7BA1\u65B9\u5411\u53EF360\xB0\u8ABF\u6574\u63D2\u7BA1\u65B9\u5411\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.331"
  },
  {
    id: "PSA-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u8ABF\u901F\u95A5",
    group: "PSA\u7CFB\u5217",
    code: "",
    name: "PSA\u7CFB\u5217 \u4E0D\u92B9\u92FC\u8ABF\u901F\u95A5",
    format: "{spec}{tubeOD}{color}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PSA",
            description: "\u76F4\u901A\u578B"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883; \u87BA\u7D0B\u7AEF\u81EA\u5E36PT\u87BA\u7D0B\u81A0,\u80FD\u6709\u6548\u5BC6\u5C01\u87BA\u7D0B\u9023\u63A5\u90E8\u4F4D\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.331"
  },
  {
    id: "PTL-Mini-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u8ABF\u901F\u95A5",
    group: "PTL\u8FF7\u4F60\u7CFB\u5217",
    code: "",
    name: "PTL\u8FF7\u4F60\u7CFB\u5217 \u4E0D\u92B9\u92FC\u63A8\u9396\u578B\u8ABF\u901F\u95A5",
    format: "{spec}{tubeOD}{thread}{throttleType}{color}{threadType}{type}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PTL",
            description: "\u63A8\u9396\u578B\u8ABF\u901F\u95A5"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "4",
            description: "4mm"
          },
          {
            code: "6",
            description: "6mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          }
        ]
      },
      {
        id: "throttleType",
        name: "\u7BC0\u6D41\u65B9\u5F0F",
        options: [
          {
            code: "A",
            description: "\u6392\u6C23\u7BC0\u6D41\u578B"
          },
          {
            code: "B",
            description: "\u9032\u6C23\u7BC0\u6D41\u578B"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "type",
        name: "\u985E\u578B\u4EE3\u865F",
        options: [
          {
            code: "M",
            description: "\u8FF7\u4F60\u578B"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "SUS304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883; \u87BA\u7D0B\u7AEF\u81EA\u5E36PT\u87BA\u7D0B\u81A0,\u80FD\u6709\u6548\u5BC6\u5C01\u87BA\u7D0B\u9023\u63A5\u90E8\u4F4D\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.335"
  },
  {
    id: "PTL-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u8ABF\u901F\u95A5",
    group: "PTL\u63A8\u9396\u7CFB\u5217",
    code: "",
    name: "PTL\u7CFB\u5217 \u4E0D\u92B9\u92FC\u63A8\u9396\u578B\u8ABF\u901F\u95A5",
    format: "{spec}{tubeOD}{thread}{throttleType}{color}{threadType}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PTL",
            description: "\u63A8\u9396\u578B\u8ABF\u901F\u95A5"
          }
        ]
      },
      {
        id: "tubeOD",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "6",
            description: "6mm"
          },
          {
            code: "8",
            description: "8mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "throttleType",
        name: "\u7BC0\u6D41\u65B9\u5F0F",
        options: [
          {
            code: "A",
            description: "\u6392\u6C23\u7BC0\u6D41\u578B"
          },
          {
            code: "B",
            description: "\u9032\u6C23\u7BC0\u6D41\u578B"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u7070\u8272"
          },
          {
            code: "D",
            description: "\u9ED1\u8272"
          }
        ]
      },
      {
        id: "threadType",
        name: "\u7259\u578B\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "PT\u7259"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "SUS304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883; \u87BA\u7D0B\u7AEF\u81EA\u5E36PT\u87BA\u7D0B\u81A0,\u80FD\u6709\u6548\u5BC6\u5C01\u87BA\u7D0B\u9023\u63A5\u90E8\u4F4D\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.336"
  },
  {
    id: "BSL-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u6D88\u8072\u5668",
    group: "\u6D88\u8072\u5668",
    code: "",
    name: "BSL\u7CFB\u5217 \u4E0D\u92B9\u92FC\u6D88\u8072\u5668",
    format: "{spec}{thread}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u6D88\u8072\u5668\u985E\u578B",
        options: [
          {
            code: "BSL",
            description: "\u901A\u7528\u578B\u6D88\u8072\u5668"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883; \u6D88\u8072\u6027\u80FD\u512A\u8D8A; \u5B89\u88DD\u65B9\u4FBF\u53C8\u5FEB\u6377,\u87BA\u7D0B\u9023\u63A5\u90E8\u4EFD\u5B89\u5168\u53EF\u9760\u53C8\u8010\u7528; \u7BC0\u6D41\u578B\u6D88\u8072\u5668\u6613\u4E8E\u5FAE\u8ABF\u6392\u6C23\u91CF\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.290"
  },
  {
    id: "BSLM-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u6D88\u8072\u5668",
    group: "\u6D88\u8072\u5668",
    code: "",
    name: "BSLM\u7CFB\u5217 \u4E0D\u92B9\u92FC\u6D88\u8072\u5668",
    format: "{spec}{thread}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u6D88\u8072\u5668\u985E\u578B",
        options: [
          {
            code: "BSLM",
            description: "\u5FAE\u578B\u6D88\u8072\u5668"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883; \u6D88\u8072\u6027\u80FD\u512A\u8D8A; \u5B89\u88DD\u65B9\u4FBF\u53C8\u5FEB\u6377,\u87BA\u7D0B\u9023\u63A5\u90E8\u4EFD\u5B89\u5168\u53EF\u9760\u53C8\u8010\u7528; \u7BC0\u6D41\u578B\u6D88\u8072\u5668\u6613\u4E8E\u5FAE\u8ABF\u6392\u6C23\u91CF\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.290"
  },
  {
    id: "BESL-S",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u4E0D\u92B9\u92FC\u6D88\u8072\u5668",
    group: "\u6D88\u8072\u5668",
    code: "",
    name: "BESL\u7CFB\u5217 \u4E0D\u92B9\u92FC\u6D88\u8072\u5668",
    format: "{spec}{thread}-{material}",
    categories: [
      {
        id: "spec",
        name: "\u6D88\u8072\u5668\u985E\u578B",
        options: [
          {
            code: "BESL",
            description: "\u7BC0\u6D41\u578B\u6D88\u8072\u5668"
          }
        ]
      },
      {
        id: "thread",
        name: "\u9023\u63A5\u87BA\u7D0B",
        options: [
          {
            code: "M5",
            description: "M5X0.8"
          },
          {
            code: "01",
            description: "PT1/8"
          },
          {
            code: "02",
            description: "PT1/4"
          },
          {
            code: "03",
            description: "PT3/8"
          },
          {
            code: "04",
            description: "PT1/2"
          }
        ]
      },
      {
        id: "material",
        name: "\u6750\u8CEA\u4EE3\u865F",
        options: [
          {
            code: "S",
            description: "\u4E0D\u92B9\u92FC304"
          }
        ]
      }
    ],
    workingPressureRange: "0~10kgf/cm\xB2(0~1.0MPa)",
    note: "\u4E0D\u92B9\u92FC304\u6750\u8CEA\u7522\u54C1\u9069\u5408\u7981\u9285\u74B0\u5883; \u6D88\u8072\u6027\u80FD\u512A\u8D8A; \u5B89\u88DD\u65B9\u4FBF\u53C8\u5FEB\u6377,\u87BA\u7D0B\u9023\u63A5\u90E8\u4EFD\u5B89\u5168\u53EF\u9760\u53C8\u8010\u7528; \u7BC0\u6D41\u578B\u6D88\u8072\u5668\u6613\u4E8E\u5FAE\u8ABF\u6392\u6C23\u91CF\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.290"
  },
  {
    id: "AQC",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u7BA1\u6750\u5DE5\u5177",
    group: "\u6C23\u7BA1\u526A",
    code: "AQC",
    name: "\u6C23\u7BA1\u526A",
    format: "{code}-{color}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "AQC",
            description: "\u6C23\u7BA1\u526A"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "BL",
            description: "\u85CD\u8272"
          }
        ]
      }
    ],
    workingPressureRange: "",
    note: "",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.459"
  },
  {
    id: "AG",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u7BA1\u6750\u5DE5\u5177",
    group: "\u6C23\u69CD",
    code: "AG",
    name: "\u6C23\u69CD",
    format: "{code}-{color}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "AG",
            description: "\u6C23\u69CD"
          },
          {
            code: "AGL",
            description: "\u9577\u5634\u6C23\u69CD"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "B",
            description: "\u85CD\u8272"
          },
          {
            code: "R",
            description: "\u7D05\u8272"
          }
        ]
      }
    ],
    workingPressureRange: "",
    note: "",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.459"
  },
  {
    id: "UCS-Tube",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "PU\u7BA1",
    group: "UCS/UCE\u6372\u7BA1\u7CFB\u5217",
    code: "",
    name: "UCS\u7CFB\u5217 PU\u7BA1",
    format: "{spec} {od} {id_} {color} {length} {jointType} {jointForm}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "UCS",
            description: "\u805A\u916F"
          }
        ]
      },
      {
        id: "od",
        name: "\u5916\u5F91\u4EE3\u865F",
        options: [
          {
            code: "040",
            description: "\u03A64.0mm"
          },
          {
            code: "060",
            description: "\u03A66.0mm"
          },
          {
            code: "080",
            description: "\u03A68.0mm"
          },
          {
            code: "100",
            description: "\u03A610.0mm"
          },
          {
            code: "120",
            description: "\u03A612.0mm"
          }
        ]
      },
      {
        id: "id_",
        name: "\u5167\u5F91\u4EE3\u865F",
        options: [
          {
            code: "040",
            description: "\u03A64.0mm"
          },
          {
            code: "050",
            description: "\u03A65.0mm"
          },
          {
            code: "055",
            description: "\u03A65.5mm"
          },
          {
            code: "065",
            description: "\u03A66.5mm"
          },
          {
            code: "080",
            description: "\u03A68.0mm"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F[\u6CE81]",
        options: [
          {
            code: "BU",
            description: "\u85CD\u8272"
          },
          {
            code: "BK",
            description: "\u9ED1\u8272"
          },
          {
            code: "GE",
            description: "\u6A59\u8272"
          },
          {
            code: "C",
            description: "\u900F\u660E"
          },
          {
            code: "WH",
            description: "\u767D\u8272"
          },
          {
            code: "CB",
            description: "\u900F\u660E\u85CD"
          },
          {
            code: "R",
            description: "\u7D05\u8272"
          },
          {
            code: "Y",
            description: "\u9EC3\u8272"
          },
          {
            code: "GN",
            description: "\u7DA0\u8272"
          },
          {
            code: "BR",
            description: "\u68D5\u8272"
          },
          {
            code: "CR",
            description: "\u900F\u660E\u7D05"
          },
          {
            code: "CG",
            description: "\u900F\u660E\u7DA0"
          },
          {
            code: "CY",
            description: "\u900F\u660E\u9EC3"
          },
          {
            code: "CE",
            description: "\u900F\u660E\u6A59"
          }
        ]
      },
      {
        id: "length",
        name: "\u9577\u5EA6\u4EE3\u865F",
        options: [
          {
            code: "030M",
            description: "3m"
          },
          {
            code: "060M",
            description: "6m"
          },
          {
            code: "090M",
            description: "9m"
          },
          {
            code: "120M",
            description: "12m"
          },
          {
            code: "150M",
            description: "15m"
          }
        ]
      },
      {
        id: "jointType",
        name: "\u63A5\u982D\u985E\u578B",
        options: [
          {
            code: "A",
            description: "\u4E00\u7AEF\u957730cm,\u53E6\u4E00\u7AEF\u957710cm"
          },
          {
            code: "B",
            description: "\u4E8C\u7AEF\u63A5\u982D\u7BA1\u9577\u5747\u70BA10cm"
          },
          {
            code: "C",
            description: "\u4E8C\u7AEF\u63A5\u982D\u7BA1\u9577\u5747\u70BA0cm"
          }
        ]
      },
      {
        id: "jointForm",
        name: "\u63A5\u982D\u5F62\u5F0F",
        options: [
          {
            code: "1",
            description: "\u4E0D\u9644\u63A5\u982D"
          },
          {
            code: "2",
            description: "\u9644\u6BCD\u2014\u2014\u516C\u63A5\u982D"
          },
          {
            code: "3",
            description: "\u9644\u516C\u2014\u2014\u516C\u63A5\u982D"
          }
        ]
      }
    ],
    workingPressureRange: "UCS: 0.8~1.0 MPa (23\xB0C)",
    note: "\u2460\u85CD\u8272\u3001\u9ED1\u8272\u3001\u6A59\u8272\u3001\u900F\u660E\u70BA\u6A19\u6E96\u8272,\u5176\u5B83\u984F\u8272\u9700\u7279\u5225\u8A02\u5236\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.292"
  },
  {
    id: "PU-Tube",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "PU\u7BA1",
    group: "US98A/UE95A\u7CFB\u5217",
    code: "",
    name: "US98A\u3001UE95A\u7CFB\u5217 PU\u7BA1",
    format: "{spec} {od} {id_} {length} {color}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "US98A",
            description: "\u805A\u916F,\u786C\u5EA698A\xB12"
          },
          {
            code: "UE95A",
            description: "\u805A\u919A,\u786C\u5EA695A\xB12"
          }
        ]
      },
      {
        id: "od",
        name: "\u5916\u5F91\u4EE3\u865F",
        options: [
          {
            code: "032",
            description: "\u03A63.2mm"
          },
          {
            code: "040",
            description: "\u03A64.0mm"
          },
          {
            code: "060",
            description: "\u03A66.0mm"
          },
          {
            code: "080",
            description: "\u03A68.0mm"
          },
          {
            code: "100",
            description: "\u03A610.0mm"
          },
          {
            code: "120",
            description: "\u03A612.0mm"
          },
          {
            code: "160",
            description: "\u03A616.0mm"
          }
        ]
      },
      {
        id: "id_",
        name: "\u5167\u5F91\u4EE3\u865F",
        options: [
          {
            code: "020",
            description: "\u03A62.0mm"
          },
          {
            code: "025",
            description: "\u03A62.5mm"
          },
          {
            code: "040",
            description: "\u03A64.0mm"
          },
          {
            code: "050",
            description: "\u03A65.0mm"
          },
          {
            code: "055",
            description: "\u03A65.5mm"
          },
          {
            code: "060",
            description: "\u03A66.0mm"
          },
          {
            code: "065",
            description: "\u03A66.5mm"
          },
          {
            code: "080",
            description: "\u03A68.0mm"
          },
          {
            code: "100",
            description: "\u03A610.0mm"
          },
          {
            code: "110",
            description: "\u03A611.0mm"
          },
          {
            code: "120",
            description: "\u03A612.0mm"
          }
        ]
      },
      {
        id: "length",
        name: "\u9577\u5EA6\u4EE3\u865F",
        options: [
          {
            code: "100M",
            description: "100m/\u5377"
          },
          {
            code: "200M",
            description: "200m/\u5377"
          },
          {
            code: "20M",
            description: "20m/\u5377"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F[\u6CE81]",
        options: [
          {
            code: "BU",
            description: "\u85CD\u8272"
          },
          {
            code: "BK",
            description: "\u9ED1\u8272"
          },
          {
            code: "GE",
            description: "\u6A59\u8272"
          },
          {
            code: "C",
            description: "\u900F\u660E"
          },
          {
            code: "WH",
            description: "\u767D\u8272"
          },
          {
            code: "CB",
            description: "\u900F\u660E\u85CD"
          },
          {
            code: "R",
            description: "\u7D05\u8272"
          },
          {
            code: "Y",
            description: "\u9EC3\u8272"
          },
          {
            code: "GN",
            description: "\u7DA0\u8272"
          },
          {
            code: "BR",
            description: "\u68D5\u8272"
          },
          {
            code: "CR",
            description: "\u900F\u660E\u7D05"
          },
          {
            code: "CG",
            description: "\u900F\u660E\u7DA0"
          },
          {
            code: "CY",
            description: "\u900F\u660E\u9EC3"
          },
          {
            code: "CE",
            description: "\u900F\u660E\u6A59"
          },
          {
            code: "GA",
            description: "\u7070\u8272"
          }
        ]
      }
    ],
    workingPressureRange: "US98A: 0.4~1.0 MPa / UE95A: 0.8~1.0 MPa (23\xB0C)",
    note: "\u2460\u85CD\u8272\u3001\u9ED1\u8272\u3001\u6A59\u8272\u3001\u900F\u660E\u70BA\u6A19\u6E96\u8272,\u5176\u5B83\u984F\u8272\u9700\u7279\u5225\u8A02\u5236\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.253"
  },
  {
    id: "PA-Tube",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u5C3C\u9F8D\u7BA1",
    group: "PA12/PA6\u7CFB\u5217",
    code: "PA",
    name: "PA12\u3001PA6\u7CFB\u5217 \u5C3C\u9F8D\u7BA1",
    format: "{spec} {od} {id_} {length} {color}",
    categories: [
      {
        id: "spec",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PA6",
            description: "\u5C3C\u9F8D6"
          },
          {
            code: "PA12",
            description: "\u5C3C\u9F8D12"
          }
        ]
      },
      {
        id: "od",
        name: "\u5916\u5F91\u4EE3\u865F",
        options: [
          {
            code: "040",
            description: "\u03A64.0mm"
          },
          {
            code: "060",
            description: "\u03A66.0mm"
          },
          {
            code: "080",
            description: "\u03A68.0mm"
          },
          {
            code: "100",
            description: "\u03A610.0mm"
          },
          {
            code: "120",
            description: "\u03A612.0mm"
          }
        ]
      },
      {
        id: "id_",
        name: "\u5167\u5F91\u4EE3\u865F",
        options: [
          {
            code: "025",
            description: "\u03A62.5mm"
          },
          {
            code: "040",
            description: "\u03A64.0mm"
          },
          {
            code: "060",
            description: "\u03A66.0mm"
          },
          {
            code: "075",
            description: "\u03A67.5mm"
          },
          {
            code: "090",
            description: "\u03A69.0mm"
          }
        ]
      },
      {
        id: "length",
        name: "\u9577\u5EA6\u4EE3\u865F",
        options: [
          {
            code: "200M",
            description: "200m/\u5377"
          },
          {
            code: "100M",
            description: "100m/\u5377"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "BU",
            description: "\u85CD\u8272"
          },
          {
            code: "BK",
            description: "\u9ED1\u8272"
          },
          {
            code: "GE",
            description: "\u6A59\u8272"
          },
          {
            code: "N",
            description: "\u672C\u8272"
          },
          {
            code: "WH",
            description: "\u767D\u8272"
          },
          {
            code: "GN",
            description: "\u7DA0\u8272"
          },
          {
            code: "R",
            description: "\u7D05\u8272"
          },
          {
            code: "Y",
            description: "\u9EC3\u8272"
          }
        ]
      }
    ],
    workingPressureRange: "PA6: 2.0~3.5MPa / PA12: 1.5~2.5MPa (23\xB0C\uFF0C\u4F9D\u7BA1\u5F91)",
    note: "",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.255"
  },
  {
    id: "UN54D",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u963B\u71C3\u7BA1",
    group: "UN54D\u7CFB\u5217",
    code: "UN54D",
    name: "UN54D\u7CFB\u5217 \u963B\u71C3\u7BA1",
    format: "{code} {od} {id_} {length} {color}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "UN54D",
            description: "\u963B\u71C3\u7BA1\u786C\u5EA654D\xB13"
          }
        ]
      },
      {
        id: "od",
        name: "\u5916\u5F91\u4EE3\u865F",
        options: [
          {
            code: "060",
            description: "\u03A66.0mm"
          },
          {
            code: "080",
            description: "\u03A68.0mm"
          },
          {
            code: "100",
            description: "\u03A610.0mm"
          },
          {
            code: "120",
            description: "\u03A612.0mm"
          }
        ]
      },
      {
        id: "id_",
        name: "\u5167\u5F91\u4EE3\u865F",
        options: [
          {
            code: "040",
            description: "\u03A64.0mm"
          },
          {
            code: "050",
            description: "\u03A65.0mm"
          },
          {
            code: "065",
            description: "\u03A66.5mm"
          },
          {
            code: "080",
            description: "\u03A68.0mm"
          }
        ]
      },
      {
        id: "length",
        name: "\u9577\u5EA6\u4EE3\u865F",
        options: [
          {
            code: "100M",
            description: "100m/\u5377"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "BU",
            description: "\u85CD\u8272"
          },
          {
            code: "BK",
            description: "\u9ED1\u8272"
          },
          {
            code: "GN",
            description: "\u7DA0\u8272"
          },
          {
            code: "WH",
            description: "\u767D\u8272"
          },
          {
            code: "R",
            description: "\u7D05\u8272"
          },
          {
            code: "Y",
            description: "\u9EC3\u8272"
          }
        ]
      }
    ],
    workingPressureRange: "1.0MPa (23\xB0C)",
    note: "",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.256"
  },
  {
    id: "UWS98A",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u96D9\u5C64\u963B\u71C3\u7BA1",
    group: "UWS98A\u7CFB\u5217",
    code: "UWS98A",
    name: "UWS98A\u7CFB\u5217 \u96D9\u5C64\u963B\u71C3\u7BA1",
    format: "{code} {od_inner} {id_inner}{length} {color}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "UWS98A",
            description: "\u96D9\u5C64\u963B\u71C3\u7BA1"
          }
        ]
      },
      {
        id: "od_inner",
        name: "\u5916\u5F91(\u5167\u5C64)\u4EE3\u865F",
        options: [
          {
            code: "060",
            description: "\u03A66.0mm"
          },
          {
            code: "080",
            description: "\u03A68.0mm"
          },
          {
            code: "100",
            description: "\u03A610.0mm"
          },
          {
            code: "120",
            description: "\u03A612.0mm"
          }
        ]
      },
      {
        id: "id_inner",
        name: "\u5167\u5F91\u4EE3\u865F",
        options: [
          {
            code: "040",
            description: "\u03A64.0mm"
          },
          {
            code: "050",
            description: "\u03A65.0mm"
          },
          {
            code: "065",
            description: "\u03A66.5mm"
          },
          {
            code: "080",
            description: "\u03A68.0mm"
          }
        ]
      },
      {
        id: "length",
        name: "\u9577\u5EA6\u4EE3\u865F",
        options: [
          {
            code: "050M",
            description: "50m/\u5377"
          },
          {
            code: "100M",
            description: "100m/\u5377"
          }
        ]
      },
      {
        id: "color",
        name: "\u984F\u8272\u4EE3\u865F",
        options: [
          {
            code: "BU",
            description: "\u85CD\u8272"
          },
          {
            code: "BK",
            description: "\u9ED1\u8272"
          },
          {
            code: "GN",
            description: "\u7DA0\u8272"
          },
          {
            code: "WH",
            description: "\u767D\u8272"
          },
          {
            code: "R",
            description: "\u7D05\u8272"
          },
          {
            code: "Y",
            description: "\u9EC3\u8272"
          }
        ]
      }
    ],
    workingPressureRange: "1.0MPa (23\xB0C)",
    note: "\u5167\u5C64PU\u7BA1\u5747\u70BA\u9ED1\u8272",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.295"
  },
  {
    id: "HR",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u6CB9\u58D3\u7DE9\u885D\u5668",
    group: "HR\u6CB9\u58D3\u7A69\u901F\u5668",
    code: "HR",
    name: "HR\u7CFB\u5217 \u6CB9\u58D3\u7A69\u901F\u5668",
    format: "{code}{stroke}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "HR",
            description: "\u53EF\u8ABF\u5F0F\u6CB9\u58D3\u7A69\u901F\u5668"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "60",
            description: "60mm"
          }
        ]
      }
    ],
    workingPressureRange: null,
    note: null,
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.458"
  },
  {
    id: "ACA",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u6CB9\u58D3\u7DE9\u885D\u5668",
    group: "ACA\u81EA\u52D5\u88DC\u511F\u5F0F",
    code: "ACA",
    name: "ACA\u7CFB\u5217 \u6CB9\u58D3\u7DE9\u885D\u5668",
    format: "{code}{bodyThread}{stroke}-{speed}{cap}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "ACA",
            description: "\u6A19\u6E96\u81EA\u52D5\u88DC\u511F\u5F0F\u6CB9\u58D3\u7DE9\u885D\u5668"
          }
        ]
      },
      {
        id: "bodyThread",
        name: "\u672C\u9AD4\u5916\u7259",
        options: [
          {
            code: "08",
            description: "M8"
          },
          {
            code: "10",
            description: "M10"
          },
          {
            code: "12",
            description: "M12"
          },
          {
            code: "14",
            description: "M14"
          },
          {
            code: "16",
            description: "M16"
          },
          {
            code: "20",
            description: "M20"
          },
          {
            code: "25",
            description: "M25"
          },
          {
            code: "27",
            description: "M27"
          },
          {
            code: "33",
            description: "M33"
          },
          {
            code: "36",
            description: "M36"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "3",
            description: "3mm"
          },
          {
            code: "7",
            description: "7mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          },
          {
            code: "15",
            description: "15mm"
          },
          {
            code: "16",
            description: "16mm"
          },
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "30",
            description: "30mm"
          },
          {
            code: "40",
            description: "40mm"
          },
          {
            code: "50",
            description: "50mm"
          }
        ]
      },
      {
        id: "speed",
        name: "\u901F\u5EA6\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "\u9AD8\u901F(\u8F15\u8CA0\u8F09)"
          },
          {
            code: "2",
            description: "\u4E2D\u901F(\u4E2D\u8CA0\u8F09)"
          },
          {
            code: "3",
            description: "\u4F4E\u901F(\u91CD\u8CA0\u8F09)"
          }
        ]
      },
      {
        id: "cap",
        name: "\u9632\u649E\u5E3D\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u5851\u6599\u9632\u649E\u5E3D"
          },
          {
            code: "N",
            description: "\u7121\u9632\u649E\u5E3D"
          }
        ]
      }
    ],
    workingPressureRange: null,
    note: null,
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.419"
  },
  {
    id: "ACJ",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u6CB9\u58D3\u7DE9\u885D\u5668",
    group: "ACJ\u53EF\u8ABF\u5F0F",
    code: "ACJ",
    name: "ACJ\u7CFB\u5217 \u6CB9\u58D3\u7DE9\u885D\u5668 (M10, M12, M14)",
    format: "{code}{bodyThread}{stroke}{cap}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "ACJ",
            description: "\u53EF\u8ABF\u81EA\u52D5\u88DC\u511F\u5F0F\u6CB9\u58D3\u7DE9\u885D\u5668"
          }
        ]
      },
      {
        id: "bodyThread",
        name: "\u672C\u9AD4\u5916\u7259",
        options: [
          {
            code: "10",
            description: "M10"
          },
          {
            code: "12",
            description: "M12"
          },
          {
            code: "14",
            description: "M14"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "7",
            description: "7mm"
          },
          {
            code: "10",
            description: "10mm"
          },
          {
            code: "12",
            description: "12mm"
          }
        ]
      },
      {
        id: "cap",
        name: "\u9632\u649E\u5E3D\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u5851\u6599\u9632\u649E\u5E3D"
          },
          {
            code: "F",
            description: "\u9435\u8CEA\u9632\u649E\u5E3D"
          },
          {
            code: "N",
            description: "\u7121\u9632\u649E\u5E3D"
          }
        ]
      }
    ],
    workingPressureRange: null,
    note: "\u6B64\u7CFB\u5217\u7121\u901F\u5EA6\u4EE3\u865F\u9078\u9805\u3002",
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.419"
  },
  {
    id: "ACJ-L",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u6CB9\u58D3\u7DE9\u885D\u5668",
    group: "ACJ\u53EF\u8ABF\u5F0F",
    code: "ACJ",
    name: "ACJ\u7CFB\u5217 \u6CB9\u58D3\u7DE9\u885D\u5668 (M20\u4EE5\u4E0A)",
    format: "{code}{bodyThread}{stroke}-{speed}{cap}",
    categories: [
      {
        id: "code",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "ACJ",
            description: "\u53EF\u8ABF\u81EA\u52D5\u88DC\u511F\u5F0F\u6CB9\u58D3\u7DE9\u885D\u5668"
          }
        ]
      },
      {
        id: "bodyThread",
        name: "\u672C\u9AD4\u5916\u7259",
        options: [
          {
            code: "20",
            description: "M20"
          },
          {
            code: "25",
            description: "M25"
          },
          {
            code: "27",
            description: "M27"
          },
          {
            code: "33",
            description: "M33"
          },
          {
            code: "36",
            description: "M36"
          },
          {
            code: "42",
            description: "M42"
          }
        ]
      },
      {
        id: "stroke",
        name: "\u884C\u7A0B",
        options: [
          {
            code: "20",
            description: "20mm"
          },
          {
            code: "25",
            description: "25mm"
          },
          {
            code: "50",
            description: "50mm"
          },
          {
            code: "75",
            description: "75mm"
          }
        ]
      },
      {
        id: "speed",
        name: "\u901F\u5EA6\u4EE3\u865F",
        options: [
          {
            code: "1",
            description: "\u9AD8\u901F(\u8F15\u8CA0\u8F09)"
          },
          {
            code: "2",
            description: "\u4E2D\u901F(\u4E2D\u8CA0\u8F09)"
          },
          {
            code: "3",
            description: "\u4F4E\u901F(\u91CD\u8CA0\u8F09)"
          }
        ]
      },
      {
        id: "cap",
        name: "\u9632\u649E\u5E3D\u4EE3\u865F",
        options: [
          {
            code: "",
            description: "\u5851\u6599\u9632\u649E\u5E3D"
          },
          {
            code: "F",
            description: "\u9435\u8CEA\u9632\u649E\u5E3D"
          },
          {
            code: "N",
            description: "\u7121\u9632\u649E\u5E3D"
          }
        ]
      }
    ],
    workingPressureRange: null,
    note: null,
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.419"
  },
  {
    id: "F-ACA",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u6CB9\u58D3\u7DE9\u885D\u5668",
    group: "\u5B89\u88DD\u9644\u4EF6",
    code: "F-ACA",
    name: "ACA\u3001ACJ\u7CFB\u5217 \u9644\u4EF6",
    format: "{code}{spec}{thread}{accessory}",
    categories: [
      {
        id: "code",
        name: "\u9644\u4EF6\u4EE3\u865F",
        options: [
          {
            code: "F-ACA",
            description: "\u9644\u4EF6"
          }
        ]
      },
      {
        id: "spec",
        name: "\u7DE9\u885D\u5668\u4EE3\u865F",
        options: [
          {
            code: "08",
            description: "08"
          },
          {
            code: "10",
            description: "10"
          },
          {
            code: "12",
            description: "12"
          },
          {
            code: "14",
            description: "14"
          },
          {
            code: "16",
            description: "16"
          },
          {
            code: "20",
            description: "20"
          },
          {
            code: "25",
            description: "25"
          },
          {
            code: "27",
            description: "27"
          },
          {
            code: "33",
            description: "33"
          },
          {
            code: "36",
            description: "36"
          },
          {
            code: "42",
            description: "42"
          }
        ]
      },
      {
        id: "thread",
        name: "\u5167\u7259\u898F\u683C",
        options: [
          {
            code: "M8",
            description: "M8"
          },
          {
            code: "M10",
            description: "M10"
          },
          {
            code: "M12",
            description: "M12"
          },
          {
            code: "M14",
            description: "M14"
          },
          {
            code: "M16",
            description: "M16"
          },
          {
            code: "M20",
            description: "M20"
          },
          {
            code: "M25",
            description: "M25"
          },
          {
            code: "M27",
            description: "M27"
          },
          {
            code: "M33",
            description: "M33"
          },
          {
            code: "M36",
            description: "M36"
          },
          {
            code: "M42",
            description: "M42"
          }
        ]
      },
      {
        id: "accessory",
        name: "\u9644\u4EF6\u4EE3\u865F",
        options: [
          {
            code: "LM",
            description: "\u5B9A\u4F4D\u505C\u6B62\u87BA\u5E3D"
          },
          {
            code: "FA",
            description: "\u6CD5\u862D"
          }
        ]
      }
    ],
    workingPressureRange: null,
    note: null,
    sourceFile: "\u8F14\u52A9\u5143\u4EF6\u578B\u9304 P.421"
  },
  {
    id: "PWC-PWL",
    category: "\u8F14\u52A9\u5143\u4EF6",
    superGroup: "\u6C23\u52D5\u6307\u793A\u71C8",
    group: "\u6307\u793A\u71C8",
    name: "\u6C23\u52D5\u6307\u793A\u71C8 (PWC/PWL)",
    format: "{series} {port1} {port2} {color} {thread}",
    categories: [
      {
        id: "series",
        name: "\u898F\u683C\u4EE3\u865F",
        options: [
          {
            code: "PWC",
            description: "PWC: \u4E09\u901A\u6A19\u6E96\u578B"
          },
          {
            code: "PWL",
            description: "PWL: \u4E09\u901A\u5E36\u63D2\u7BA1"
          }
        ]
      },
      {
        id: "port1",
        name: "\u63A5\u7BA1\u53E3\u5F91 (PWL\u7528)",
        options: [
          {
            code: "",
            description: "\u7121(\u9069\u7528PWC)"
          },
          {
            code: "4",
            description: "\u03A64 (PWL)"
          },
          {
            code: "6",
            description: "\u03A66 (PWL)"
          },
          {
            code: "8",
            description: "\u03A68 (PWL)"
          }
        ]
      },
      {
        id: "port2",
        name: "\u63A5\u7BA1\u53E3\u5F91",
        options: [
          {
            code: "M5",
            description: "M5x0.8"
          },
          {
            code: "01",
            description: "1/8"
          },
          {
            code: "02",
            description: "1/4"
          }
        ]
      },
      {
        id: "color",
        name: "\u6307\u793A\u71C8",
        options: [
          {
            code: "R",
            description: "\u7D05\u8272"
          },
          {
            code: "GN",
            description: "\u7DA0\u8272"
          }
        ]
      },
      {
        id: "thread",
        name: "\u7259\u578B\u4EE3\u78BC",
        options: [
          {
            code: "",
            description: "PT\u7259(M5\u6642\u70BA\u7A7A)"
          },
          {
            code: "G",
            description: "G\u7259"
          },
          {
            code: "T",
            description: "NPT\u7259"
          }
        ]
      }
    ]
  }
];

// src/data/index.ts
function resolveOptions(ref) {
  const parts = ref.split(".");
  let current = shared_options_default;
  for (const part of parts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      return [];
    }
  }
  return current;
}
var toSeriesArray = (m) => Array.isArray(m) ? m : m && m.series || [];
var rawCatalogs = [
  ...toSeriesArray(catalog_fluid_valves_default),
  ...toSeriesArray(catalog_solenoid_valves_default),
  ...toSeriesArray(catalog_actuators_default),
  ...toSeriesArray(catalog_air_prep_default),
  ...toSeriesArray(catalog_auxiliary_default)
];
var defaultCatalog = rawCatalogs.map((series) => {
  return {
    ...series,
    categories: series.categories?.map((cat) => {
      if (cat.optionsRef) {
        return {
          ...cat,
          options: resolveOptions(cat.optionsRef)
        };
      }
      return cat;
    }) || []
  };
});

// src/server/crossref.ts
var seriesById = /* @__PURE__ */ new Map();
for (const s of defaultCatalog) {
  if (s && s.id) seriesById.set(s.id, s);
}
function buildCatalogIndex() {
  return defaultCatalog.map((s) => ({
    id: s.id,
    code: s.code || void 0,
    name: s.name,
    category: s.category,
    superGroup: s.superGroup,
    group: s.group,
    format: s.format || s.orderCodeFormat || void 0,
    parameters: (s.categories || []).map((c) => c.name)
  }));
}

// src/server/companyCrossref.ts
var variantCodeToId = /* @__PURE__ */ new Map();
for (const s of defaultCatalog) {
  const seriesCat = (s.categories || []).find((c) => c.id === "series" || c.id === "type" || c.id === "spec");
  for (const opt of seriesCat?.options || []) {
    const c = (opt.code || "").toUpperCase().replace(/[^A-Z0-9-]/g, "");
    if (c.length >= 2 && !variantCodeToId.has(c)) variantCodeToId.set(c, s.id);
  }
}

// src/server/crossReferenceService.ts
var aiClient = null;
function getAi() {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
var FALLBACK_MODELS = ["gemini-3.1-flash-lite", "gemini-2.5-flash", "gemini-3-flash-preview"];
var catalogIndex = buildCatalogIndex();
var catalogIndexJson = JSON.stringify(catalogIndex);
var slimIndexJson = JSON.stringify(
  catalogIndex.map(({ id, code, name, category, group }) => ({ id, code, name, category, group }))
);
var modelCooldown = /* @__PURE__ */ new Map();
var COOLDOWN_MS = 90 * 1e3;
var isCoolingDown = (m) => (modelCooldown.get(m) || 0) > Date.now();
async function generateWithRetry(params) {
  const ai = getAi();
  const primary = params.model;
  const rawChain = [primary, ...FALLBACK_MODELS.filter((m) => m !== primary)];
  const modelChain = [...rawChain.filter((m) => !isCoolingDown(m)), ...rawChain.filter(isCoolingDown)];
  let lastError = null;
  for (const model of modelChain) {
    let retries = 2;
    let delay = 1500;
    while (retries > 0) {
      try {
        const config = /2\.5-flash/.test(model) ? { ...params.config, thinkingConfig: { thinkingBudget: 0 } } : params.config;
        return await ai.models.generateContent({ ...params, model, config });
      } catch (error) {
        lastError = error;
        const errStr = String(error.message || "").toLowerCase();
        const quotaOrGone = error.status === 429 || errStr.includes("429") || errStr.includes("quota") || error.status === 404 || errStr.includes("not found") || errStr.includes("no longer available");
        const overloaded = error.status === 503 || errStr.includes("503") || errStr.includes("high demand") || errStr.includes("overloaded");
        if (quotaOrGone) {
          modelCooldown.set(model, Date.now() + COOLDOWN_MS);
          console.log(`Model ${model} unavailable (quota/404), cooling down ${COOLDOWN_MS / 1e3}s, falling back...`);
          break;
        }
        if (overloaded && retries > 1) {
          console.log(`Model ${model} busy (503). Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay += 3e3;
          retries--;
          continue;
        }
        if (overloaded) {
          modelCooldown.set(model, Date.now() + COOLDOWN_MS);
          console.log(`Model ${model} still busy, cooling down ${COOLDOWN_MS / 1e3}s, falling back...`);
          break;
        }
        throw error;
      }
    }
  }
  throw lastError || new Error("All Gemini models failed");
}

// src/server/learnCatalogService.ts
var MAX_IMAGE_BYTES = 3.5 * 1024 * 1024;
async function learnCatalog(reqBody) {
  try {
    const { brand, seriesHint, text, image } = reqBody || {};
    if (!text && !(image && image.data)) {
      return { status: 400, body: { error: "\u8ACB\u63D0\u4F9B\u578B\u9304\u9801\u7684\u6587\u5B57\u5167\u5BB9\u6216\u5716\u7247" } };
    }
    if (image?.data && image.data.length > MAX_IMAGE_BYTES * 1.4) {
      return { status: 400, body: { error: "\u5716\u7247\u592A\u5927 (\u8D85\u904E\u7D04 3.5MB)\uFF0C\u8ACB\u88C1\u5207\u5230\u8A02\u8CFC\u78BC\u8AAA\u660E\u7684\u5340\u57DF\u6216\u58D3\u7E2E\u5F8C\u518D\u4E0A\u50B3" } };
    }
    const prompt = `You are a pneumatic/automation components catalog analyst.
The user provides a page from a competitor's product catalog${brand ? ` (brand: ${brand})` : ""}${seriesHint ? ` (series: ${seriesHint})` : ""} that explains the ORDERING CODE structure (\u578B\u865F\u8868\u793A\u65B9\u6CD5 / \u8A02\u8CFC\u78BC\u8AAA\u660E) of a product series.

Your task: extract a complete, position-by-position DECODING TABLE of the ordering code, so that any part number of this series can later be decoded exactly.

Requirements for the "decode" field (Traditional Chinese):
1. State the overall code format first (e.g. "SY[\u7CFB\u5217][\u6A5F\u80FD]20-[\u96FB\u58D3][\u63A5\u7DDA]...").
2. Then list EVERY position/segment with ALL its option codes and meanings, exactly as printed in the catalog. Include voltage codes, port sizes, thread types, wiring, options, etc.
3. Do NOT guess or add options that are not visible in the provided content. If part of the table is cut off or unreadable, add a line "\uFF08\u6CE8\u610F: ...\u6BB5\u843D\u578B\u9304\u4E2D\u672A\u63D0\u4F9B/\u770B\u4E0D\u6E05\u695A\uFF09".
4. If the page shows a worked example part number, include it at the end as \u7BC4\u4F8B.

Also provide:
- "brand": the competitor brand name
- "seriesName": the series name (e.g. "SY3000/5000/7000 \u96FB\u78C1\u95A5")
- "pattern": the part-number prefix(es) this table applies to, comma-separated, uppercase (e.g. "SY3,SY5,SY7,SY9" or "CQ2,CDQ2"). These are used to auto-apply this table when a part number starts with them.
- "productType": short Traditional Chinese description of what this product is (e.g. "\u4E94\u53E3\u96FB\u78C1\u95A5").

${text ? `CATALOG TEXT PROVIDED BY USER:
"""
${String(text).slice(0, 2e4)}
"""
` : "The catalog page is provided as an image."}
Respond in JSON. All descriptive text in Traditional Chinese.`;
    const parts = [{ text: prompt }];
    if (image?.data) {
      parts.push({
        inlineData: {
          data: image.data,
          mimeType: image.mimeType || "image/png"
        }
      });
    }
    const response = await generateWithRetry({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: [{ role: "user", parts }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type2.OBJECT,
          properties: {
            brand: { type: Type2.STRING, description: "\u7AF6\u54C1\u54C1\u724C" },
            seriesName: { type: Type2.STRING, description: "\u7CFB\u5217\u540D\u7A31" },
            pattern: { type: Type2.STRING, description: "\u9069\u7528\u7684\u578B\u865F\u5B57\u9996\uFF0C\u9017\u865F\u5206\u9694\u3001\u5927\u5BEB (\u5982 SY3,SY5,SY7)" },
            productType: { type: Type2.STRING, description: "\u7522\u54C1\u7A2E\u985E\u7C21\u8FF0 (\u7E41\u9AD4\u4E2D\u6587)" },
            decode: { type: Type2.STRING, description: "\u5B8C\u6574\u7684\u9010\u4F4D\u89E3\u78BC\u8868 (\u7E41\u9AD4\u4E2D\u6587)" }
          },
          required: ["brand", "seriesName", "pattern", "productType", "decode"]
        }
      }
    });
    if (!response || !response.text) {
      throw new Error("No response from AI");
    }
    return { status: 200, body: JSON.parse(response.text) };
  } catch (error) {
    console.error("Error in learnCatalog:", error);
    let errorMessage = error.message || "\u672A\u77E5\u932F\u8AA4";
    const errStr = String(errorMessage).toLowerCase();
    if (errStr.includes("api key not valid") || errStr.includes("api_key_invalid")) {
      errorMessage = "Gemini API Key \u7121\u6548\u3002\u8ACB\u6AA2\u67E5\u90E8\u7F72\u5E73\u53F0\u7684\u74B0\u5883\u8B8A\u6578\u8A2D\u5B9A\u3002";
    } else if (error.status === 429 || errStr.includes("429") || errStr.includes("quota")) {
      errorMessage = "Gemini API \u984D\u5EA6\u5DF2\u8017\u76E1\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66\u3002";
    } else if (error.status === 503 || errStr.includes("503") || errStr.includes("unavailable")) {
      errorMessage = "AI \u4F3A\u670D\u5668\u9AD8\u8CA0\u8F09\u4E2D\uFF0C\u8ACB\u7A0D\u5019\u518D\u8A66\u3002";
    }
    return { status: 500, body: { error: errorMessage } };
  }
}

// src/server/vercelHandlers/learn-catalog.ts
async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed\uFF0C\u8ACB\u4F7F\u7528 POST" });
  }
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: "\u7121\u6CD5\u89E3\u6790\u8ACB\u6C42\u5167\u5BB9 (\u9700\u8981 JSON)" });
    }
  }
  const { status, body: result } = await learnCatalog(body || {});
  return res.status(status).json(result);
}
export {
  handler as default
};
