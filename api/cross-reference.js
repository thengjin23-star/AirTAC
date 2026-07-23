// 此檔案由 scripts/build-api.mjs 自動產生，請勿手動編輯。
// 原始碼在 src/server/vercelHandlers/，修改後執行 npm run build:api 重新產生。

// src/server/crossReferenceService.ts
import crypto from "crypto";
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.230",
    specs: [
      {
        model: "2JS150-10",
        port: "G3/8",
        orifice: "15mm",
        kv: "4.4",
        weightG: "700"
      },
      {
        model: "2JS150-15",
        port: "G1/2",
        orifice: "15mm",
        kv: "4.8",
        weightG: "700"
      },
      {
        model: "2JS200-20",
        port: "G3/4",
        orifice: "20mm",
        kv: "7.9",
        weightG: "900"
      },
      {
        model: "2JS200-20",
        port: "G3/4",
        orifice: "20mm",
        kv: "8",
        weightG: "950"
      },
      {
        model: "2JS250-25",
        port: "G1",
        orifice: "25mm",
        kv: "19",
        weightG: "1900"
      },
      {
        model: "2JS250-25",
        port: "G1",
        orifice: "25mm",
        kv: "20",
        weightG: "2500"
      },
      {
        model: "2JS320-32",
        port: "G1 1/4",
        orifice: "32mm",
        kv: "27",
        weightG: "2500"
      },
      {
        model: "2JS320-32",
        port: "G1 1/4",
        orifice: "32mm",
        kv: "28",
        weightG: "3000"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.197",
    specs: [
      {
        model: "2KLA030-06",
        port: "PT1/8",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        weightG: "243.5"
      },
      {
        model: "2KLA030-08",
        port: "PT1/4",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        weightG: "233.5"
      },
      {
        model: "2KLA030-06",
        port: "PT1/8",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        weightG: "243.5"
      },
      {
        model: "2KLA030-08",
        port: "PT1/4",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        weightG: "233.5"
      },
      {
        model: "2KLA050-10",
        port: "PT3/8",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        weightG: "528"
      },
      {
        model: "2KLA050-15",
        port: "PT1/2",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        weightG: "508"
      },
      {
        model: "2KLA050-10",
        port: "PT3/8",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        weightG: "528"
      },
      {
        model: "2KLA050-15",
        port: "PT1/2",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        weightG: "508"
      },
      {
        model: "2KLA150-15",
        port: "PT1/2",
        orifice: "15.0mm",
        cv: "5.50",
        flowS: "100.0",
        weightG: "569"
      },
      {
        model: "2KLA200-20",
        port: "PT3/4",
        orifice: "20.0mm",
        cv: "9.50",
        flowS: "170.0",
        weightG: "722"
      },
      {
        model: "2KLA250-25",
        port: "PT1",
        orifice: "25.0mm",
        cv: "12.50",
        flowS: "220.0",
        weightG: "1026"
      },
      {
        model: "2KLA320-32",
        port: "PT1 1/4",
        orifice: "35.0mm",
        cv: "23.00",
        flowS: "420.0",
        weightG: "2261"
      },
      {
        model: "2KLA400-40",
        port: "PT1 1/2",
        orifice: "40.0mm",
        cv: "31.00",
        flowS: "560.0",
        weightG: "2641"
      },
      {
        model: "2KLA500-50",
        port: "PT2",
        orifice: "50.0mm",
        cv: "49.00",
        flowS: "880.0",
        weightG: "3508"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.189",
    specs: [
      {
        model: "2KSA030-06",
        port: "PT1/8",
        orifice: "1.5mm",
        cv: "0.10",
        flowS: "1.8",
        workingPressure: "0.05~0.7MPa",
        weightG: "245"
      },
      {
        model: "2KSA030-08",
        port: "PT1/4",
        orifice: "1.5mm",
        cv: "0.10",
        flowS: "1.8",
        workingPressure: "0.05~0.7MPa",
        weightG: "235"
      },
      {
        model: "2KSA030-06",
        port: "PT1/8",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "245"
      },
      {
        model: "2KSA030-08",
        port: "PT1/4",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "235"
      },
      {
        model: "2KSA030-06",
        port: "PT1/8",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "245"
      },
      {
        model: "2KSA030-08",
        port: "PT1/4",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "235"
      },
      {
        model: "2KSA050-10",
        port: "PT3/8",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "530"
      },
      {
        model: "2KSA050-15",
        port: "PT1/2",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "510"
      },
      {
        model: "2KSA050-10",
        port: "PT3/8",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "530"
      },
      {
        model: "2KSA050-15",
        port: "PT1/2",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "510"
      },
      {
        model: "2KSA050-10",
        port: "PT3/8",
        orifice: "7.0mm",
        cv: "1.40",
        flowS: "25.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "530"
      },
      {
        model: "2KSA050-15",
        port: "PT1/2",
        orifice: "7.0mm",
        cv: "1.40",
        flowS: "25.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "510"
      },
      {
        model: "2KSA150-15",
        port: "PT1/2",
        orifice: "15.0mm",
        cv: "5.50",
        flowS: "100.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "575"
      },
      {
        model: "2KSA200-20",
        port: "PT3/4",
        orifice: "20.0mm",
        cv: "9.50",
        flowS: "170.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "735"
      },
      {
        model: "2KSA250-25",
        port: "PT1",
        orifice: "25.0mm",
        cv: "12.50",
        flowS: "220.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "1035"
      },
      {
        model: "2KSA320-32",
        port: "PT1 1/4",
        orifice: "35.0mm",
        cv: "23.00",
        flowS: "420.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "2287"
      },
      {
        model: "2KSA400-40",
        port: "PT1 1/2",
        orifice: "40.0mm",
        cv: "31.00",
        flowS: "560.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "2677"
      },
      {
        model: "2KSA500-50",
        port: "PT2",
        orifice: "50.0mm",
        cv: "49.00",
        flowS: "880.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "3557"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.181",
    specs: [
      {
        model: "2KWA030-06",
        port: "PT1/8",
        orifice: "1.5mm",
        cv: "0.10",
        flowS: "1.8",
        weightG: "245"
      },
      {
        model: "2KWA030-08",
        port: "PT1/4",
        orifice: "1.5mm",
        cv: "0.10",
        flowS: "1.8",
        weightG: "235"
      },
      {
        model: "2KWA030-06",
        port: "PT1/8",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        weightG: "245"
      },
      {
        model: "2KWA030-08",
        port: "PT1/4",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        weightG: "235"
      },
      {
        model: "2KWA030-06",
        port: "PT1/8",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        weightG: "245"
      },
      {
        model: "2KWA030-08",
        port: "PT1/4",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        weightG: "235"
      },
      {
        model: "2KWA050-10",
        port: "PT3/8",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        weightG: "530"
      },
      {
        model: "2KWA050-15",
        port: "PT1/2",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        weightG: "510"
      },
      {
        model: "2KWA050-10",
        port: "PT3/8",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        weightG: "530"
      },
      {
        model: "2KWA050-15",
        port: "PT1/2",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        weightG: "510"
      },
      {
        model: "2KWA050-10",
        port: "PT3/8",
        orifice: "7.0mm",
        cv: "1.40",
        flowS: "25.0",
        weightG: "530"
      },
      {
        model: "2KWA050-15",
        port: "PT1/2",
        orifice: "7.0mm",
        cv: "1.40",
        flowS: "25.0",
        weightG: "510"
      },
      {
        model: "2KWA150-15",
        port: "PT1/2",
        orifice: "15.0mm",
        cv: "5.50",
        flowS: "100.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "575"
      },
      {
        model: "2KWA200-20",
        port: "PT3/4",
        orifice: "20.0mm",
        cv: "9.50",
        flowS: "170.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "735"
      },
      {
        model: "2KWA250-25",
        port: "PT1",
        orifice: "25.0mm",
        cv: "12.50",
        flowS: "220.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "1035"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.193",
    specs: [
      {
        model: "2LA030-06",
        port: "PT1/8",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        weightG: "244.5"
      },
      {
        model: "2LA030-08",
        port: "PT1/4",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        weightG: "234.5"
      },
      {
        model: "2LA030-06",
        port: "PT1/8",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        weightG: "244.5"
      },
      {
        model: "2LA030-08",
        port: "PT1/4",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        weightG: "234.5"
      },
      {
        model: "2LA050-10",
        port: "PT3/8",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        weightG: "529"
      },
      {
        model: "2LA050-15",
        port: "PT1/2",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        weightG: "509"
      },
      {
        model: "2LA050-10",
        port: "PT3/8",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        weightG: "529"
      },
      {
        model: "2LA050-15",
        port: "PT1/2",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        weightG: "509"
      },
      {
        model: "2LA150-15",
        port: "PT1/2",
        orifice: "15.0mm",
        cv: "5.50",
        flowS: "100.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "570"
      },
      {
        model: "2LA200-20",
        port: "PT3/4",
        orifice: "20.0mm",
        cv: "9.50",
        flowS: "170.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "723"
      },
      {
        model: "2LA250-25",
        port: "PT1",
        orifice: "25.0mm",
        cv: "12.50",
        flowS: "220.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "1027"
      },
      {
        model: "2LA320-32",
        port: "PT1 1/4",
        orifice: "35.0mm",
        cv: "23.00",
        flowS: "420.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "2262"
      },
      {
        model: "2LA400-40",
        port: "PT1 1/2",
        orifice: "40.0mm",
        cv: "31.00",
        flowS: "560.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "2642"
      },
      {
        model: "2LA500-50",
        port: "PT2",
        orifice: "50.0mm",
        cv: "49.00",
        flowS: "880.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "3508"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.185",
    specs: [
      {
        model: "2SA030-06",
        port: "PT1/8",
        orifice: "1.5mm",
        cv: "0.10",
        flowS: "1.8",
        workingPressure: "0.05~0.7MPa",
        weightG: "245"
      },
      {
        model: "2SA030-08",
        port: "PT1/4",
        orifice: "1.5mm",
        cv: "0.10",
        flowS: "1.8",
        workingPressure: "0.05~0.7MPa",
        weightG: "235"
      },
      {
        model: "2SA030-06",
        port: "PT1/8",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "245"
      },
      {
        model: "2SA030-08",
        port: "PT1/4",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "235"
      },
      {
        model: "2SA030-06",
        port: "PT1/8",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "245"
      },
      {
        model: "2SA030-08",
        port: "PT1/4",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "235"
      },
      {
        model: "2SA050-10",
        port: "PT3/8",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "530"
      },
      {
        model: "2SA050-15",
        port: "PT1/2",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "510"
      },
      {
        model: "2SA050-10",
        port: "PT3/8",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "530"
      },
      {
        model: "2SA050-15",
        port: "PT1/2",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "510"
      },
      {
        model: "2SA050-10",
        port: "PT3/8",
        orifice: "7.0mm",
        cv: "1.40",
        flowS: "25.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "530"
      },
      {
        model: "2SA050-15",
        port: "PT1/2",
        orifice: "7.0mm",
        cv: "1.40",
        flowS: "25.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "510"
      },
      {
        model: "2SA050-10",
        port: "PT3/8",
        orifice: "10.0mm",
        cv: "2.20",
        flowS: "40.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "530"
      },
      {
        model: "2SA050-15",
        port: "PT1/2",
        orifice: "10.0mm",
        cv: "2.20",
        flowS: "40.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "510"
      },
      {
        model: "2SA150-15",
        port: "PT1/2",
        orifice: "15.0mm",
        cv: "5.50",
        flowS: "100.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "575"
      },
      {
        model: "2SA200-20",
        port: "PT3/4",
        orifice: "20.0mm",
        cv: "9.50",
        flowS: "170.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "735"
      },
      {
        model: "2SA250-25",
        port: "PT1",
        orifice: "25.0mm",
        cv: "12.50",
        flowS: "220.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "1035"
      },
      {
        model: "2SA320-32",
        port: "PT1 1/4",
        orifice: "35.0mm",
        cv: "23.00",
        flowS: "420.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "2288"
      },
      {
        model: "2SA400-40",
        port: "PT1 1/2",
        orifice: "40.0mm",
        cv: "31.00",
        flowS: "560.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "2678"
      },
      {
        model: "2SA500-50",
        port: "PT2",
        orifice: "50.0mm",
        cv: "49.00",
        flowS: "880.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "3558"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.206",
    specs: [
      {
        model: "2V025-06",
        port: '1/8"',
        orifice: "2.5mm",
        cv: "0.23",
        workingPressure: "0.05~1.0MPa"
      },
      {
        model: "2V025-08",
        port: '1/4"',
        orifice: "2.5mm",
        cv: "0.25",
        workingPressure: "0.05~1.0MPa"
      },
      {
        model: "2V130-10",
        port: '3/8"',
        orifice: "13mm",
        cv: "6.20",
        workingPressure: "0.05~1.0MPa"
      },
      {
        model: "2V130-15",
        port: '1/2"',
        orifice: "13mm",
        cv: "6.20",
        workingPressure: "0.05~1.0MPa"
      },
      {
        model: "2V250-20",
        port: '3/4"',
        orifice: "25mm",
        cv: "13.00",
        workingPressure: "0.05~1.0MPa"
      },
      {
        model: "2V250-25",
        port: '1"',
        orifice: "25mm",
        cv: "13.00",
        workingPressure: "0.05~1.0MPa"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.208",
    specs: [
      {
        model: "2P025-06",
        port: "G1/8",
        orifice: "2.5mm",
        cv: "0.23",
        workingPressure: "0~0.7MPa"
      },
      {
        model: "2P025-08",
        port: "G1/4",
        orifice: "2.5mm",
        cv: "0.23",
        workingPressure: "0~0.7MPa"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.178",
    specs: [
      {
        model: "2WA030-06",
        port: "PT1/8",
        orifice: "1.5mm",
        cv: "0.10",
        flowS: "1.8",
        weightG: "245"
      },
      {
        model: "2WA030-08",
        port: "PT1/4",
        orifice: "1.5mm",
        cv: "0.10",
        flowS: "1.8",
        weightG: "235"
      },
      {
        model: "2WA030-06",
        port: "PT1/8",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        weightG: "245"
      },
      {
        model: "2WA030-08",
        port: "PT1/4",
        orifice: "2.0mm",
        cv: "0.18",
        flowS: "3.0",
        weightG: "235"
      },
      {
        model: "2WA030-06",
        port: "PT1/8",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        weightG: "245"
      },
      {
        model: "2WA030-08",
        port: "PT1/4",
        orifice: "3.0mm",
        cv: "0.33",
        flowS: "6.0",
        weightG: "235"
      },
      {
        model: "2WA050-10",
        port: "PT3/8",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        weightG: "530"
      },
      {
        model: "2WA050-15",
        port: "PT1/2",
        orifice: "4.0mm",
        cv: "0.55",
        flowS: "10.0",
        weightG: "510"
      },
      {
        model: "2WA050-10",
        port: "PT3/8",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        weightG: "530"
      },
      {
        model: "2WA050-15",
        port: "PT1/2",
        orifice: "5.0mm",
        cv: "0.83",
        flowS: "15.0",
        weightG: "510"
      },
      {
        model: "2WA050-10",
        port: "PT3/8",
        orifice: "7.0mm",
        cv: "1.40",
        flowS: "25.0",
        weightG: "530"
      },
      {
        model: "2WA050-15",
        port: "PT1/2",
        orifice: "7.0mm",
        cv: "1.40",
        flowS: "25.0",
        weightG: "510"
      },
      {
        model: "2WA150-15",
        port: "PT1/2",
        orifice: "15.0mm",
        cv: "5.50",
        flowS: "100.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "575"
      },
      {
        model: "2WA200-20",
        port: "PT3/4",
        orifice: "20.0mm",
        cv: "9.50",
        flowS: "170.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "735"
      },
      {
        model: "2WA250-25",
        port: "PT1",
        orifice: "25.0mm",
        cv: "12.50",
        flowS: "220.0",
        workingPressure: "0.05~0.7MPa",
        weightG: "1035"
      }
    ]
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
    sourceFile: "5A\u7CFB\u5217\u6C23\u63A7\u95A5202303011040044526.pdf (\u51713\u9801)",
    specs: [
      {
        model: "5A110-M5",
        port: "M5",
        cv: "0.6",
        flowS: "10.2",
        workingPressure: "0.15~0.8MPa",
        weightG: "85"
      },
      {
        model: "5A120-M5",
        port: "M5",
        cv: "0.6",
        flowS: "10.2",
        workingPressure: "0.15~0.8MPa",
        weightG: "140"
      },
      {
        model: "5A130-M5",
        port: "M5",
        cv: "0.51",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "165"
      },
      {
        model: "5A110-06",
        port: "PT1/8",
        cv: "0.6",
        flowS: "10.2",
        workingPressure: "0.15~0.8MPa",
        weightG: "85"
      },
      {
        model: "5A120-06",
        port: "PT1/8",
        cv: "0.6",
        flowS: "10.2",
        workingPressure: "0.15~0.8MPa",
        weightG: "140"
      },
      {
        model: "5A130-06",
        port: "PT1/8",
        cv: "0.51",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "165"
      },
      {
        model: "5A210-06",
        port: "PT1/8",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "185"
      },
      {
        model: "5A220-06",
        port: "PT1/8",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "285"
      },
      {
        model: "5A230-06",
        port: "PT1/8",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "5A210-08",
        port: "PT1/4",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "185"
      },
      {
        model: "5A220-08",
        port: "PT1/4",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "285"
      },
      {
        model: "5A230-08",
        port: "PT1/4",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "5A310-08",
        port: "PT1/4",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "275"
      },
      {
        model: "5A320-08",
        port: "PT1/4",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "5A330-08",
        port: "PT1/4",
        cv: "1.35",
        flowS: "23.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "505"
      },
      {
        model: "5A310-10",
        port: "PT3/8",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "275"
      },
      {
        model: "5A320-10",
        port: "PT3/8",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "5A330-10",
        port: "PT3/8",
        cv: "1.35",
        flowS: "23.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "505"
      },
      {
        model: "5A410-15",
        port: "PT1/2",
        cv: "2.82",
        flowS: "48.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "555"
      },
      {
        model: "5A420-15",
        port: "PT1/2",
        cv: "2.82",
        flowS: "48.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "685"
      },
      {
        model: "5A430-15",
        port: "PT1/2",
        cv: "2.35",
        flowS: "40.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "735"
      }
    ]
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
    sourceFile: "EAV\u7CFB\u5217\u6A19\u6E96\u6C23\u63A7\u95A5202303011043369046.pdf (\u51718\u9801)",
    specs: [
      {
        model: "200\u7CFB\u5217",
        cv: "1.8",
        flowS: "32",
        workingPressure: "0.2~1.0MPa"
      },
      {
        model: "300\u7CFB\u5217",
        cv: "2.32",
        flowS: "42",
        workingPressure: "0.2~1.0MPa"
      },
      {
        model: "400\u7CFB\u5217",
        cv: "3.85",
        flowS: "69",
        workingPressure: "0.2~1.0MPa"
      },
      {
        model: "600\u7CFB\u5217",
        cv: "6.0",
        flowS: "108",
        workingPressure: "0.2~1.0MPa"
      }
    ]
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
    sourceFile: "4SA\u7CFB\u5217\u6C23\u63A7\u95A5\u4E94\u53E3\u4E8C\u4F4D_\u4E94\u53E3\u4E09\u4F4D202602240320587106.pdf (\u51714\u9801)",
    specs: [
      {
        model: "4SA110",
        port: "M5/PT1/8",
        cv: "0.6",
        flowS: "10.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "69"
      },
      {
        model: "4SA120",
        port: "M5/PT1/8",
        cv: "0.6",
        flowS: "10.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "81"
      },
      {
        model: "4SA130",
        port: "M5/PT1/8",
        cv: "0.51",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "90"
      },
      {
        model: "4SA210",
        port: "PT1/8/PT1/4",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "123"
      },
      {
        model: "4SA220",
        port: "PT1/8/PT1/4",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "149"
      },
      {
        model: "4SA230",
        port: "PT1/8/PT1/4",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "168.5"
      },
      {
        model: "4SA310",
        port: "PT1/4/PT3/8",
        cv: "1.8",
        flowS: "31.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "216"
      },
      {
        model: "4SA320",
        port: "PT1/4/PT3/8",
        cv: "1.8",
        flowS: "31.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "254"
      },
      {
        model: "4SA330",
        port: "PT1/4/PT3/8",
        cv: "1.4",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "280"
      },
      {
        model: "4SA410",
        port: "PT1/2",
        cv: "3.2",
        flowS: "57.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "436.5"
      },
      {
        model: "4SA420",
        port: "PT1/2",
        cv: "3.2",
        flowS: "57.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "519"
      },
      {
        model: "4SA430",
        port: "PT1/2",
        cv: "3.0",
        flowS: "54.1",
        workingPressure: "0.15~0.8MPa",
        weightG: "566.5"
      }
    ]
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
    sourceFile: "6SA\u7CFB\u5217\u6C23\u63A7\u95A5\u4E94\u53E3\u4E8C\u4F4D_\u4E94\u53E3\u4E09\u4F4D202512110941149896.pdf (\u51714\u9801)",
    specs: [
      {
        model: "6SA0510",
        port: "M5",
        cv: "0.25",
        flowS: "4.25",
        workingPressure: "0.15~0.8MPa",
        weightG: "22.5"
      },
      {
        model: "6SA0520",
        port: "M5",
        cv: "0.25",
        flowS: "4.25",
        workingPressure: "0.15~0.8MPa",
        weightG: "26.5"
      },
      {
        model: "6SA0530",
        port: "M5",
        cv: "0.2",
        flowS: "3.7",
        workingPressure: "0.15~0.8MPa",
        weightG: "28.5"
      },
      {
        model: "6SA110",
        port: "M5/PT1/8",
        cv: "0.7",
        flowS: "12.3",
        workingPressure: "0.15~0.8MPa",
        weightG: "54"
      },
      {
        model: "6SA120",
        port: "M5/PT1/8",
        cv: "0.7",
        flowS: "12.3",
        workingPressure: "0.15~0.8MPa",
        weightG: "62.5"
      },
      {
        model: "6SA130",
        port: "M5/PT1/8",
        cv: "0.5",
        flowS: "10.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "67.5"
      },
      {
        model: "6SA210",
        port: "PT1/8/PT1/4",
        cv: "1.05",
        flowS: "17.9",
        workingPressure: "0.15~0.8MPa",
        weightG: "101.5"
      },
      {
        model: "6SA220",
        port: "PT1/8/PT1/4",
        cv: "1.05",
        flowS: "17.9",
        workingPressure: "0.15~0.8MPa",
        weightG: "121"
      },
      {
        model: "6SA230",
        port: "PT1/8/PT1/4",
        cv: "0.9",
        flowS: "16.2",
        workingPressure: "0.15~0.8MPa",
        weightG: "130"
      },
      {
        model: "6SA310",
        port: "PT1/4/PT3/8",
        cv: "2.25",
        flowS: "38.4",
        workingPressure: "0.15~0.8MPa",
        weightG: "247.5"
      },
      {
        model: "6SA320",
        port: "PT1/4/PT3/8",
        cv: "2.25",
        flowS: "38.4",
        workingPressure: "0.15~0.8MPa",
        weightG: "286.5"
      },
      {
        model: "6SA330",
        port: "PT1/4/PT3/8",
        cv: "1.8",
        flowS: "30.5",
        workingPressure: "0.15~0.8MPa",
        weightG: "332"
      },
      {
        model: "6SA410",
        port: "PT1/2",
        cv: "3.2",
        flowS: "57.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "396"
      },
      {
        model: "6SA420",
        port: "PT1/2",
        cv: "3.2",
        flowS: "57.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "458.5"
      },
      {
        model: "6SA430",
        port: "PT1/2",
        cv: "3.0",
        flowS: "54.1",
        workingPressure: "0.15~0.8MPa",
        weightG: "535"
      }
    ]
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
    sourceFile: "7SA\u7CFB\u5217\u6C23\u63A7\u95A5\u4E94\u53E3\u4E8C\u4F4D_\u4E94\u53E3\u4E09\u4F4D202512150946419976.pdf (\u51714\u9801)",
    specs: [
      {
        model: "7SA0510",
        port: "M5",
        cv: "0.25",
        flowS: "4.25",
        workingPressure: "0.15~0.8MPa",
        weightG: "22.5"
      },
      {
        model: "7SA0520",
        port: "M5",
        cv: "0.25",
        flowS: "4.25",
        workingPressure: "0.15~0.8MPa",
        weightG: "26.5"
      },
      {
        model: "7SA0530",
        port: "M5",
        cv: "0.2",
        flowS: "3.7",
        workingPressure: "0.15~0.8MPa",
        weightG: "28.5"
      },
      {
        model: "7SA110",
        port: "M5/PT1/8",
        cv: "0.7",
        flowS: "12.3",
        workingPressure: "0.15~0.8MPa",
        weightG: "54"
      },
      {
        model: "7SA120",
        port: "M5/PT1/8",
        cv: "0.7",
        flowS: "12.3",
        workingPressure: "0.15~0.8MPa",
        weightG: "62.5"
      },
      {
        model: "7SA130",
        port: "M5/PT1/8",
        cv: "0.5",
        flowS: "10.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "67.5"
      },
      {
        model: "7SA210",
        port: "PT1/8/PT1/4",
        cv: "1.05",
        flowS: "17.9",
        workingPressure: "0.15~0.8MPa",
        weightG: "101.5"
      },
      {
        model: "7SA220",
        port: "PT1/8/PT1/4",
        cv: "1.05",
        flowS: "17.9",
        workingPressure: "0.15~0.8MPa",
        weightG: "121"
      },
      {
        model: "7SA230",
        port: "PT1/8/PT1/4",
        cv: "0.9",
        flowS: "16.2",
        workingPressure: "0.15~0.8MPa",
        weightG: "130"
      },
      {
        model: "7SA310",
        port: "PT1/4/PT3/8",
        cv: "2.25",
        flowS: "38.4",
        workingPressure: "0.15~0.8MPa",
        weightG: "247.5"
      },
      {
        model: "7SA320",
        port: "PT1/4/PT3/8",
        cv: "2.25",
        flowS: "38.4",
        workingPressure: "0.15~0.8MPa",
        weightG: "286.5"
      },
      {
        model: "7SA330",
        port: "PT1/4/PT3/8",
        cv: "1.8",
        flowS: "30.5",
        workingPressure: "0.15~0.8MPa",
        weightG: "332"
      }
    ]
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
    sourceFile: "4STA\u7CFB\u5217\u6C23\u63A7\u95A5\u4E09\u53E3\u4E8C\u4F4D202602240321205236.pdf (\u51713\u9801)",
    specs: [
      {
        model: "4STA110",
        port: "M5/PT1/8",
        cv: "0.6",
        flowS: "10.2",
        workingPressure: "0.15~0.8MPa",
        weightG: "58.5"
      },
      {
        model: "4STA120",
        port: "M5/PT1/8",
        cv: "0.6",
        flowS: "10.2",
        workingPressure: "0.15~0.8MPa",
        weightG: "70.5"
      },
      {
        model: "4STA210",
        port: "PT1/8/PT1/4",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "111.5"
      },
      {
        model: "4STA220",
        port: "PT1/8/PT1/4",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "137"
      },
      {
        model: "4STA310",
        port: "PT1/4/PT3/8",
        cv: "1.8",
        flowS: "31.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "180"
      },
      {
        model: "4STA320",
        port: "PT1/4/PT3/8",
        cv: "1.8",
        flowS: "31.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "218"
      }
    ]
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
    sourceFile: "6STA\u7CFB\u5217\u6C23\u63A7\u95A5\u4E09\u53E3\u4E8C\u4F4D202512110940087246.pdf (\u51714\u9801)",
    specs: [
      {
        model: "6STA0510",
        port: "M5",
        cv: "0.25",
        flowS: "4.25",
        workingPressure: "0.15~0.8MPa",
        weightG: "18.5"
      },
      {
        model: "6STA0520",
        port: "M5",
        cv: "0.25",
        flowS: "4.25",
        workingPressure: "0.15~0.8MPa",
        weightG: "22.5"
      },
      {
        model: "6STA110",
        port: "M5/PT1/8",
        cv: "0.7",
        flowS: "12.3",
        workingPressure: "0.15~0.8MPa",
        weightG: "45"
      },
      {
        model: "6STA120",
        port: "M5/PT1/8",
        cv: "0.7",
        flowS: "12.3",
        workingPressure: "0.15~0.8MPa",
        weightG: "53.5"
      },
      {
        model: "6STA210",
        port: "PT1/8/PT1/4",
        cv: "1.05",
        flowS: "17.9",
        workingPressure: "0.15~0.8MPa",
        weightG: "94"
      },
      {
        model: "6STA220",
        port: "PT1/8/PT1/4",
        cv: "1.05",
        flowS: "17.9",
        workingPressure: "0.15~0.8MPa",
        weightG: "113.5"
      },
      {
        model: "6STA310",
        port: "PT1/4/PT3/8",
        cv: "2.25",
        flowS: "38.4",
        workingPressure: "0.15~0.8MPa",
        weightG: "180"
      },
      {
        model: "6STA320",
        port: "PT1/4/PT3/8",
        cv: "2.25",
        flowS: "38.4",
        workingPressure: "0.15~0.8MPa",
        weightG: "218"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.113",
    specs: [
      {
        model: "3A110-M5",
        port: "M5",
        cv: "0.6",
        flowS: "10.2",
        workingPressure: "0.15~0.8MPa"
      },
      {
        model: "3A120-M5",
        port: "M5",
        cv: "0.6",
        flowS: "10.2",
        workingPressure: "0.15~0.8MPa"
      },
      {
        model: "3A110-06",
        port: "PT1/8",
        cv: "0.6",
        flowS: "10.2",
        workingPressure: "0.15~0.8MPa"
      },
      {
        model: "3A120-06",
        port: "PT1/8",
        cv: "0.6",
        flowS: "10.2",
        workingPressure: "0.15~0.8MPa"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.114",
    specs: [
      {
        model: "3A210-06",
        port: "PT1/8",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa"
      },
      {
        model: "3A220-06",
        port: "PT1/8",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa"
      },
      {
        model: "3A210-08",
        port: "PT1/4",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa"
      },
      {
        model: "3A220-08",
        port: "PT1/4",
        cv: "1.0",
        flowS: "17.0",
        workingPressure: "0.15~0.8MPa"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.115",
    specs: [
      {
        model: "3A310-08",
        port: "PT1/4",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa"
      },
      {
        model: "3A320-08",
        port: "PT1/4",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa"
      },
      {
        model: "3A310-10",
        port: "PT3/8",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa"
      },
      {
        model: "3A320-10",
        port: "PT3/8",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.123",
    specs: [
      {
        model: "4A110-M5",
        port: "M5",
        cv: "0.6",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "140"
      },
      {
        model: "4A120-M5",
        port: "M5",
        cv: "0.6",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "165"
      },
      {
        model: "4A130C-M5",
        port: "M5",
        cv: "0.6",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "165"
      },
      {
        model: "4A130E-M5",
        port: "M5",
        cv: "0.6",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "165"
      },
      {
        model: "4A130P-M5",
        port: "M5",
        cv: "0.6",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "165"
      },
      {
        model: "4A110-06",
        port: "PT1/8",
        cv: "0.51",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "140"
      },
      {
        model: "4A120-06",
        port: "PT1/8",
        cv: "0.51",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "165"
      },
      {
        model: "4A130C-06",
        port: "PT1/8",
        cv: "0.51",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "165"
      },
      {
        model: "4A130E-06",
        port: "PT1/8",
        cv: "0.51",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "165"
      },
      {
        model: "4A130P-06",
        port: "PT1/8",
        cv: "0.51",
        flowS: "8.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "165"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.125",
    specs: [
      {
        model: "4A210-06",
        port: "PT1/8",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "185"
      },
      {
        model: "4A220-06",
        port: "PT1/8",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "285"
      },
      {
        model: "4A230C-06",
        port: "PT1/8",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "4A230E-06",
        port: "PT1/8",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "4A230P-06",
        port: "PT1/8",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "4A210-08",
        port: "PT1/4",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "185"
      },
      {
        model: "4A220-08",
        port: "PT1/4",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "285"
      },
      {
        model: "4A230C-08",
        port: "PT1/4",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "4A230E-08",
        port: "PT1/4",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "4A230P-08",
        port: "PT1/4",
        cv: "0.8",
        flowS: "13.6",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.127",
    specs: [
      {
        model: "4A310-08",
        port: "PT1/4",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "275"
      },
      {
        model: "4A320-08",
        port: "PT1/4",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "4A330C-08",
        port: "PT1/4",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "505"
      },
      {
        model: "4A330E-08",
        port: "PT1/4",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "505"
      },
      {
        model: "4A330P-08",
        port: "PT1/4",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "505"
      },
      {
        model: "4A310-10",
        port: "PT3/8",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "275"
      },
      {
        model: "4A320-10",
        port: "PT3/8",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "365"
      },
      {
        model: "4A330C-10",
        port: "PT3/8",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "505"
      },
      {
        model: "4A330E-10",
        port: "PT3/8",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "505"
      },
      {
        model: "4A330P-10",
        port: "PT3/8",
        cv: "1.65",
        flowS: "28.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "505"
      }
    ]
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
    sourceFile: "\u63A7\u5236\u5143\u4EF6\u578B\u9304 P.129",
    specs: [
      {
        model: "4A410-15",
        port: "PT1/2",
        cv: "2.82",
        flowS: "48.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "555"
      },
      {
        model: "4A420-15",
        port: "PT1/2",
        cv: "2.82",
        flowS: "48.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "685"
      },
      {
        model: "4A430C-15",
        port: "PT1/2",
        cv: "2.35",
        flowS: "40.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "735"
      },
      {
        model: "4A430E-15",
        port: "PT1/2",
        cv: "2.35",
        flowS: "40.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "735"
      },
      {
        model: "4A430P-15",
        port: "PT1/2",
        cv: "2.35",
        flowS: "40.0",
        workingPressure: "0.15~0.8MPa",
        weightG: "735"
      }
    ]
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
function getSeriesDetails(ids) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const id of ids) {
    const s = seriesById.get(id);
    if (s && !seen.has(s.id)) {
      seen.add(s.id);
      out.push(s);
    }
  }
  return out;
}
function isValidSeriesId(id) {
  return seriesById.has(id);
}
var KNOWLEDGE_BASE = [
  // --- SMC 氣缸 ---
  {
    brand: "SMC",
    pattern: /^C?D?Q2/i,
    competitorSeries: "CQ2/CDQ2 \u8584\u578B\u6C23\u7F38",
    airtacSeriesIds: ["acq", "sda", "acqd", "acqj"],
    note: "SMC CQ2 \u8584\u578B\u6C23\u7F38\u5C0D\u61C9 AirTAC ACQ (\u512A\u5148) \u6216 SDA \u7CFB\u5217\uFF0C\u7F38\u5F91\u884C\u7A0B\u76F4\u63A5\u6CBF\u7528\u3002",
    decode: `SMC CQ2 \u8A02\u8CFC\u78BC\u89E3\u78BC (\u683C\u5F0F: C(D)Q2[\u5B89\u88DD\u578B\u5F0F][\u7F38\u5F91]-[\u884C\u7A0B][\u52D5\u4F5C]+\u5C3E\u78BC):
- \u958B\u982D CDQ2 = \u5167\u5EFA\u78C1\u77F3(\u53EF\u88DD\u78C1\u6027\u958B\u95DC)\u7248\u672C\u7684 CQ2\uFF1BCQ2 \u958B\u982D\u82E5\u5C3E\u78BC\u7121\u78C1\u77F3\u6A19\u8A18\u5247\u7121\u78C1\u77F3
- \u5B89\u88DD\u578B\u5F0F: B=\u901A\u5B54\u57FA\u672C\u578B, A=\u5169\u7AEF\u7259\u5B54\u578B, L=\u8173\u5EA7\u578B, F=\u524D\u6CD5\u862D, G=\u5F8C\u6CD5\u862D, D=\u96D9\u8033\u74B0
- \u7F38\u5F91: 12/16/20/25/32/40/50/63/80/100 (mm)
- \u884C\u7A0B: \u6578\u5B57\u76F4\u63A5\u70BA mm
- \u52D5\u4F5C: D=\u5FA9\u52D5(\u96D9\u4F5C\u7528), S=\u55AE\u52D5\u62BC\u51FA, T=\u55AE\u52D5\u5F15\u5165; DZ/DM/DCM \u7B49\u7D44\u5408\u4E2D D \u4E4B\u5F8C\u7684\u5B57\u6BCD\u5C6C\u5176\u4ED6\u9078\u9805
- \u5E38\u898B\u5C3E\u78BC: Z=\u9644\u78C1\u77F3(\u820A\u5BEB\u6CD5), M9B\u7B49=\u96A8\u9644\u78C1\u6027\u958B\u95DC\u578B\u865F
\u2192 AirTAC ACQ \u5C0D\u61C9: \u7F38\u5F91/\u884C\u7A0B\u76F4\u63A5\u6CBF\u7528 (ACQ \u7F38\u5F91\u7BC4\u570D 12~100)\uFF1B\u9644\u78C1\u77F3\u2192\u78C1\u77F3\u4EE3\u78BC S\uFF1B\u5B89\u88DD\u4EE5\u901A\u5B54\u70BA\u6A19\u6E96\u3002CDQ2B40-30DZ \u2192 ACQ40X30S`
  },
  { brand: "SMC", pattern: /^C?D?QS/i, competitorSeries: "CQS \u5C0F\u578B\u8584\u578B\u6C23\u7F38", airtacSeriesIds: ["acq", "sda", "ace"], note: "SMC CQS \u5C0F\u7F38\u5F91\u8584\u578B\u6C23\u7F38\u5C0D\u61C9 AirTAC ACQ \u5C0F\u7F38\u5F91\u6216 ACE \u7DCA\u6E4A\u578B\u3002" },
  { brand: "SMC", pattern: /^C?D?J2/i, competitorSeries: "CJ2 \u91DD\u578B\u6C23\u7F38(ISO6432)", airtacSeriesIds: ["mi", "ma", "mf"], note: "SMC CJ2 \u8FF7\u4F60\u6C23\u7F38\u5C0D\u61C9 AirTAC MI (\u4E0D\u92B9\u92FC\u8FF7\u4F60\u7F38) \u6216 MA \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^C?D?M2/i, competitorSeries: "CM2 \u5713\u5F62\u6C23\u7F38", airtacSeriesIds: ["ma", "mi", "mbl"], note: "SMC CM2 \u5713\u5F62\u6C23\u7F38(20~40mm)\u5C0D\u61C9 AirTAC MA/MI \u4E0D\u92B9\u92FC\u8FF7\u4F60\u7F38\u3002" },
  { brand: "SMC", pattern: /^MB\d?/i, competitorSeries: "MB \u6A19\u6E96\u6C23\u7F38(ISO15552)", airtacSeriesIds: ["se", "sai", "sc"], note: "SMC MB \u6A19\u6E96\u6C23\u7F38\u5C0D\u61C9 AirTAC SE \u6216 SAI (ISO15552) \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^C?D?A2/i, competitorSeries: "CA2 \u6A19\u6E96\u6C23\u7F38", airtacSeriesIds: ["sc", "se", "sau"], note: "SMC CA2 \u62C9\u687F\u5F0F\u6A19\u6E96\u6C23\u7F38\u5C0D\u61C9 AirTAC SC \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^MGP/i, competitorSeries: "MGP \u5E36\u5C0E\u687F\u8584\u578B\u6C23\u7F38", airtacSeriesIds: ["tcl", "tcm", "tclj", "tcmj"], note: "SMC MGP \u4E09\u8EF8\u5E36\u5C0E\u687F\u6C23\u7F38\u5C0D\u61C9 AirTAC TCL (\u76F4\u7DDA\u8EF8\u627F) / TCM (\u9285\u5957\u8EF8\u627F)\u3002MGPL\u2192TCL\u3001MGPM\u2192TCM\u3002" },
  { brand: "SMC", pattern: /^CXS/i, competitorSeries: "CXS \u96D9\u806F\u6C23\u7F38", airtacSeriesIds: ["tn", "tr"], note: "SMC CXS \u96D9\u806F\u6C23\u7F38\u5C0D\u61C9 AirTAC TN \u96D9\u8EF8\u6C23\u7F38\u3002" },
  { brand: "SMC", pattern: /^MXQ/i, competitorSeries: "MXQ \u6C23\u52D5\u6ED1\u53F0", airtacSeriesIds: ["hlq", "hlql", "hls"], note: "SMC MXQ \u7CBE\u5BC6\u6ED1\u53F0\u5C0D\u61C9 AirTAC HLQ (\u5FAA\u74B0\u6EFE\u73E0) \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^MXS/i, competitorSeries: "MXS \u6C23\u52D5\u6ED1\u53F0", airtacSeriesIds: ["hls", "hlsl", "hlq"], note: "SMC MXS \u7CBE\u5BC6\u6ED1\u53F0\u5C0D\u61C9 AirTAC HLS (\u6EFE\u67F1\u578B) \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^MHZ2?/i, competitorSeries: "MHZ2 \u5E73\u884C\u958B\u9589\u6C23\u722A", airtacSeriesIds: ["hfz", "hfk", "hfsz", "hftz"], note: "SMC MHZ2 \u5E73\u884C\u6C23\u722A\u5C0D\u61C9 AirTAC HFZ (\u6EFE\u73E0\u5C0E\u8ECC\u5E73\u884C\u6C23\u722A)\uFF0CMHZL2 \u9577\u884C\u7A0B\u5C0D\u61C9 HFKL\u3002" },
  { brand: "SMC", pattern: /^MHY2?/i, competitorSeries: "MHY2 180\xB0\u958B\u9589\u6C23\u722A", airtacSeriesIds: ["hfr"], note: "SMC MHY2 180\xB0\u958B\u9589\u6C23\u722A\u5C0D\u61C9 AirTAC HFR \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^MHC2?/i, competitorSeries: "MHC2 \u652F\u9EDE\u958B\u9589\u6C23\u722A", airtacSeriesIds: ["hfy", "hfty"], note: "SMC MHC2 \u652F\u9EDE\u958B\u9589(Y\u578B)\u6C23\u722A\u5C0D\u61C9 AirTAC HFY \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^MHS/i, competitorSeries: "MHS \u591A\u722A\u6C23\u722A", airtacSeriesIds: ["hfp", "hfc"], note: "SMC MHS \u6C23\u722A\u53EF\u6BD4\u5C0D AirTAC HFP/HFC \u5E73\u884C\u958B\u9589\u578B\u6C23\u722A\u3002" },
  { brand: "SMC", pattern: /^CRB|^MSQ|^CRQ/i, competitorSeries: "CRB/MSQ \u64FA\u52D5\u6C23\u7F38", airtacSeriesIds: ["hrq", "hrs"], note: "SMC \u64FA\u52D5\u6C23\u7F38(\u8449\u7247\u5F0FCRB\u3001\u9F52\u689D\u5F0FMSQ)\u5C0D\u61C9 AirTAC HRQ \u56DE\u8F49\u6C23\u7F38(\u9F52\u689D\u9F52\u8F2A\u5F0F)\u3002" },
  { brand: "SMC", pattern: /^MK\d?/i, competitorSeries: "MK \u56DE\u8F49\u593E\u7DCA\u6C23\u7F38", airtacSeriesIds: ["ack", "ackd", "qck", "qdk"], note: "SMC MK \u56DE\u8F49\u593E\u7DCA\u6C23\u7F38\u5C0D\u61C9 AirTAC ACK \u8F49\u89D2\u7F38\u6216 QCK \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^RS[QDH]/i, competitorSeries: "RSQ/RSD \u963B\u64CB\u6C23\u7F38", airtacSeriesIds: ["twq", "twg", "twh", "twm"], note: "SMC RSQ \u963B\u64CB\u6C23\u7F38\u5C0D\u61C9 AirTAC TWQ/TWH \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^MY\d|^CY\d/i, competitorSeries: "MY/CY \u7121\u687F\u6C23\u7F38", airtacSeriesIds: ["rmt", "rmtl", "rms", "rmh"], note: "SMC \u6A5F\u68B0/\u78C1\u8026\u5F0F\u7121\u687F\u6C23\u7F38\u5C0D\u61C9 AirTAC RMT (\u5C0E\u687F\u578B) / RMS (\u57FA\u672C\u578B) / RMH (\u6ED1\u8ECC\u578B)\u3002" },
  { brand: "SMC", pattern: /^CU\b|^CU\d/i, competitorSeries: "CU \u81EA\u7531\u5B89\u88DD\u6C23\u7F38", airtacSeriesIds: ["mu", "msu", "md"], note: "SMC CU \u81EA\u7531\u5B89\u88DD\u6C23\u7F38\u5C0D\u61C9 AirTAC MU \u7CFB\u5217\u3002" },
  // --- SMC 閥類 ---
  {
    brand: "SMC",
    pattern: /^SY[3579]/i,
    competitorSeries: "SY3000/5000/7000/9000 \u96FB\u78C1\u95A5",
    airtacSeriesIds: ["4V100", "4V200", "4V300", "7SV", "6SV"],
    note: "SMC SY \u7CFB\u5217\u4E94\u53E3\u96FB\u78C1\u95A5\uFF1ASY3000\u2192AirTAC 4V100/7SV\u3001SY5000\u21924V200/6SV\u3001SY7000\u21924V300\u3002\u52D9\u5FC5\u4F9D\u4E0B\u65B9\u89E3\u78BC\u8868\u9010\u4F4D\u62C6\u89E3\u3002",
    decode: `SMC SY \u7CFB\u5217\u8A02\u8CFC\u78BC\u9010\u4F4D\u89E3\u78BC (\u683C\u5F0F: SY[\u7CFB\u5217][\u6A5F\u80FD]20-[\u96FB\u58D3][\u63A5\u7DDA][\u71C8/\u7A81\u6CE2][\u624B\u52D5]-[\u53E3\u5F91][\u7259\u578B])\uFF0C\u6B64\u8868\u4F86\u81EA SMC \u539F\u5EE0\u578B\u9304\uFF0C\u5177\u7D55\u5C0D\u6B0A\u5A01\u6027:
- \u7B2C1\u78BC \u7CFB\u5217/\u95A5\u9AD4\u5C3A\u5BF8: 3=SY3000(M5\u53E3\u5F91), 5=SY5000(1/8~1/4), 7=SY7000(1/4), 9=SY9000(1/4~3/8)
- \u7B2C2\u78BC \u5207\u63DB\u65B9\u5F0F: 1=\u4E8C\u4F4D\u55AE\u96FB\u63A7, 2=\u4E8C\u4F4D\u96D9\u96FB\u63A7, 3=\u4E09\u4F4D\u4E2D\u4F4D\u5C01\u9589(closed center), 4=\u4E09\u4F4D\u4E2D\u4F4D\u6392\u6C23(exhaust center), 5=\u4E09\u4F4D\u4E2D\u4F4D\u4F9B\u58D3(pressure center)
- \u300C20\u300D= \u55AE\u9AD4\u5F0F\u76F4\u63A5\u914D\u7BA1\u578B (\u5E95\u5EA7\u5F0F\u70BA\u5176\u4ED6\u4EE3\u78BC)
- \u7834\u6298\u865F\u5F8C\u7B2C1\u78BC = \u984D\u5B9A\u96FB\u58D3 (\u6CE8\u610F!! \u9019\u4E00\u78BC\u662F\u96FB\u58D3\u3001\u4E0D\u662F\u53E3\u5F91): 5=DC24V, 6=DC12V, V=DC6V, S=DC5V, R=DC3V, 1=AC100V, 2=AC200V, 3=AC110V, 4=AC220V
- \u63A5\u7DDA\u53D6\u51FA\u65B9\u5F0F: G=\u5C0E\u7DDA\u51FA\u7DDA\u5F0F300mm, H=\u51FA\u7DDA\u5F0F600mm, L=L\u5F62\u63D2\u5EA7\u5F0F\u9644\u5C0E\u7DDA, LN=L\u5F62\u4E0D\u9644\u5C0E\u7DDA, LO=L\u5F62\u4E0D\u9644\u63D2\u982D, M=M\u5F62\u63D2\u5EA7\u5F0F\u9644\u5C0E\u7DDA, MN/MO=M\u5F62\u8B8A\u9AD4, D=DIN\u63D2\u5EA7\u5F0F, DO=DIN\u4E0D\u9644\u63A5\u7DDA\u5EA7, W\u958B\u982D=M8\u63D2\u5EA7\u5F0F
- \u6307\u793A\u71C8/\u7A81\u6CE2\u4FDD\u8B77(\u7DCA\u63A5\u5728\u63A5\u7DDA\u4EE3\u78BC\u5F8C): \u7121\u8A18\u865F=\u7686\u7121, S=\u9644\u7A81\u6CE2\u4FDD\u8B77, Z=\u9644\u6307\u793A\u71C8+\u7A81\u6CE2\u4FDD\u8B77, R=\u7A81\u6CE2\u4FDD\u8B77(\u7121\u6975\u6027), U=\u6307\u793A\u71C8+\u7A81\u6CE2\u4FDD\u8B77(\u7121\u6975\u6027)
- \u624B\u52D5\u64CD\u4F5C: \u7121\u8A18\u865F=\u975E\u9396\u5B9A\u6309\u9215\u5F0F, D=\u8D77\u5B50\u58D3\u4E0B\u65CB\u8F49\u9396\u5B9A\u5F0F, E=\u624B\u52D5\u58D3\u4E0B\u65CB\u8F49\u9396\u5B9A\u5F0F
- \u7B2C\u4E8C\u500B\u7834\u6298\u865F\u5F8C = A\xB7B\u53E3\u63A5\u7BA1\u53E3\u5F91: M5=M5\xD70.8(SY3000), 01=1/8"(SY5000), 02=1/4"(SY5000/SY7000), 03=3/8"(SY9000), C4=\u03A64\u5FEB\u63D2, C6=\u03A66\u5FEB\u63D2, C8=\u03A68\u5FEB\u63D2, C10=\u03A610\u5FEB\u63D2, C12=\u03A612\u5FEB\u63D2, N\u958B\u982D=\u82F1\u5236\u5FEB\u63D2
- \u7259\u578B(\u7DCA\u63A5\u5728\u53E3\u5F91\u5F8C): \u7121\u8A18\u865F=Rc(PT\u7259), F=G\u7259, N=NPT\u7259, T=NPTF\u7259
\u7BC4\u4F8B: SY5320-5LOZE-01 = SY5000\u7CFB\u5217 + \u4E09\u4F4D\u4E2D\u4F4D\u5C01\u9589(\u96D9\u96FB\u63A7) + DC24V + L\u5F62\u63D2\u5EA7\u4E0D\u9644\u63D2\u982D(LO) + \u6307\u793A\u71C8+\u7A81\u6CE2\u4FDD\u8B77(Z) + \u624B\u52D5\u65CB\u8F49\u9396\u5B9A(E) + \u53E3\u5F911/8"(01) + Rc\u7259 \u2192 AirTAC 4V230C-06B (30C=\u4E09\u4F4D\u4E2D\u4F4D\u5C01\u9589, 06=1/8", B=DC24V, DIN\u63D2\u5EA7\u5F0F\u8207PT\u7259\u70BA\u7A7A\u767D\u4EE3\u78BC)\u3002
\u5C0D\u61C9 AirTAC 4V \u7CFB\u5217\u7684\u8F49\u63DB\u898F\u5247:
- \u6A5F\u80FD: 1\u219210(\u4E8C\u4F4D\u55AE\u96FB\u63A7), 2\u219220(\u4E8C\u4F4D\u96D9\u96FB\u63A7), 3\u219230C(\u4E2D\u4F4D\u5C01\u9589), 4\u219230E(\u4E2D\u4F4D\u6392\u6C23), 5\u219230P(\u4E2D\u4F4D\u58D3\u529B)
- \u53E3\u5F91(4V200): 01(1/8")\u219206, 02(1/4")\u219208; (4V300): 02(1/4")\u219208, 03(3/8")\u219210; (4V100): M5\u2192M5, 01(1/8)\u219206
- \u96FB\u58D3: 5(DC24V)\u2192B, 6(DC12V)\u2192F, 1(AC100V)\u2192C(AC110V\u6700\u63A5\u8FD1,\u9700\u5099\u8A3B), 2(AC200V)\u2192A(AC220V\u6700\u63A5\u8FD1,\u9700\u5099\u8A3B), 3(AC110V)\u2192C, 4(AC220V)\u2192A
- \u63A5\u7DDA: G/H/L/M(\u51FA\u7DDA\u8207\u63D2\u5EA7\u9644\u7DDA\u985E)\u2192I(\u51FA\u7DDA\u5F0F), D(DIN\u63D2\u5EA7)\u2192\u7A7A\u767D(DIN\u63D2\u5EA7\u5F0F); SMC \u5FEB\u63D2\u63A5\u982D\u53E3\u5F91(C4/C6\u7B49)AirTAC 4V\u7121\u5167\u5EFA\u5FEB\u63D2,\u9700\u5099\u8A3B\u53E6\u914D PC \u7CFB\u5217\u5FEB\u63D2\u63A5\u982D
- \u7259\u578B: \u7121\u8A18\u865F(Rc)\u2192\u7A7A\u767D(PT\u7259), F(G\u7259)\u2192G, N(NPT)\u2192T; \u6307\u793A\u71C8(Z/U): AirTAC DIN\u63D2\u5EA7\u578B\u6A19\u914D\u6307\u793A\u71C8,\u7121\u7368\u7ACB\u4EE3\u78BC,\u65BC\u5099\u8A3B\u8AAA\u660E\u5373\u53EF`
  },
  { brand: "SMC", pattern: /^VF[35]|^VZ[35]/i, competitorSeries: "VF/VZ \u96FB\u78C1\u95A5", airtacSeriesIds: ["4V100", "4V200", "4V300"], note: "SMC VF/VZ \u4E94\u53E3\u96FB\u78C1\u95A5\u5C0D\u61C9 AirTAC 4V \u7CFB\u5217\uFF0C\u4F9D\u53E3\u5F91\u9078 100/200/300\u3002" },
  { brand: "SMC", pattern: /^VQ[Zz]?/i, competitorSeries: "VQ \u76F4\u52D5\u96FB\u78C1\u95A5", airtacSeriesIds: ["4V100", "CPV10", "CPV15", "7SV"], note: "SMC VQ \u5C0F\u578B\u96FB\u78C1\u95A5\u4F9D\u5C3A\u5BF8\u5C0D\u61C9 AirTAC CPV10/CPV15 \u5FAE\u578B\u95A5\u6216 4V100\u3002" },
  {
    brand: "SMC",
    pattern: /^VT3|^VV3|^VT0|^V100/i,
    competitorSeries: "VT \u4E09\u53E3\u96FB\u78C1\u95A5",
    airtacSeriesIds: ["3V1", "3V2", "3V2M", "3V100"],
    note: "SMC VT307 \u7B49\u4E09\u53E3\u4E8C\u4F4D\u76F4\u52D5\u95A5\u5C0D\u61C9 AirTAC 3V2 (\u516C\u53F8\u5C0D\u7167\u8868)\uFF1BVV307 \u5E36\u5E95\u5EA7\u5C0D\u61C9 3V2M\u3002",
    decode: `SMC VT307 \u8A02\u8CFC\u78BC\u89E3\u78BC (\u683C\u5F0F: VT307-[\u96FB\u58D3][\u63A5\u7DDA]-[\u53E3\u5F91]):
- \u96FB\u58D3 (\u8207 SY \u7CFB\u5217\u540C\u4E00\u5957\u4EE3\u78BC): 1=AC100V, 2=AC200V, 3=AC110V, 4=AC220V, 5=DC24V, 6=DC12V, V=DC6V, S=DC5V, R=DC3V
- \u63A5\u7DDA: G=\u51FA\u7DDA\u5F0F(grommet)300mm, H=\u51FA\u7DDA\u5F0F600mm, L=L\u5F62\u63D2\u5EA7, M=M\u5F62\u63D2\u5EA7, D=DIN\u63D2\u5EA7; \u5F8C\u7DB4\u6578\u5B571=\u5E36\u6307\u793A\u71C8
- \u53E3\u5F91: 01=1/8", 02=1/4"
\u7BC4\u4F8B: VT307-5G1-01 = DC24V + \u51FA\u7DDA\u5F0F\u5E36\u71C8 + 1/8"
\u2192 AirTAC 3V2 \u5C0D\u61C9: \u96FB\u58D3 5(DC24V)\u2192B, 6(DC12V)\u2192F, 1(AC100V)\u2192C(\u6700\u63A5\u8FD1AC110V), 4(AC220V)\u2192A; \u53E3\u5F91 01(1/8")\u219206, 02(1/4")\u219208; \u51FA\u7DDA\u5F0F\u2192I`
  },
  { brand: "SMC", pattern: /^VX2?\d/i, competitorSeries: "VX \u6D41\u9AD4\u96FB\u78C1\u95A5", airtacSeriesIds: ["fluid-2v", "fluid-2p", "fluid-direct-nc", "fluid-direct-no"], note: "SMC VX \u4E8C\u53E3\u6D41\u9AD4\u95A5\u5C0D\u61C9 AirTAC 2V (\u6C23\u9AD4) / 2P (\u5851\u81A0) / 2SA\xB72WA (\u6C34\u6C23\u6CB9) \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^VXZ|^VXD/i, competitorSeries: "VXZ/VXD \u5148\u5C0E\u6D41\u9AD4\u95A5", airtacSeriesIds: ["fluid-pilot-nc", "fluid-pilot-no", "fluid-2j"], note: "SMC \u5148\u5C0E\u5F0F\u6D41\u9AD4\u95A5\u5C0D\u61C9 AirTAC 2SA/2WA \u5148\u5C0E\u578B\u6216 2J \u89D2\u5EA7\u95A5\u3002" },
  // --- SMC 氣源處理/輔助 ---
  { brand: "SMC", pattern: /^AC\d{2}/i, competitorSeries: "AC FRL\u7D44\u5408", airtacSeriesIds: ["GC", "GAC", "GFC", "GAFC", "AC-BC"], note: "SMC AC \u7CFB\u5217\u4E09\u806F\u4EF6/\u4E8C\u806F\u4EF6\u5C0D\u61C9 AirTAC GC (\u4E09\u806F) / GFC (\u4E8C\u806F) \u7CFB\u5217\uFF0C\u53E3\u5F91\u5C0D\u9F4A\u3002" },
  { brand: "SMC", pattern: /^AW\d{2}/i, competitorSeries: "AW \u8ABF\u58D3\u904E\u6FFE\u5668", airtacSeriesIds: ["GFR", "GAFR", "AFR-BFR"], note: "SMC AW \u8ABF\u58D3\u904E\u6FFE\u5668(\u6FFE\u58D3\u4E00\u9AD4)\u5C0D\u61C9 AirTAC GFR \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^AF\d{2}/i, competitorSeries: "AF \u904E\u6FFE\u5668", airtacSeriesIds: ["GF", "GAF", "AF-BF"], note: "SMC AF \u7A7A\u6C23\u904E\u6FFE\u5668\u5C0D\u61C9 AirTAC GF \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^AR\d{2}/i, competitorSeries: "AR \u8ABF\u58D3\u95A5", airtacSeriesIds: ["GR", "GAR", "AR-BR"], note: "SMC AR \u8ABF\u58D3\u95A5\u5C0D\u61C9 AirTAC GR \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^AL\d{2}/i, competitorSeries: "AL \u7D66\u6CB9\u5668", airtacSeriesIds: ["GL", "GAL", "AL-BL"], note: "SMC AL \u7D66\u6CB9\u5668(\u6CB9\u9727\u5668)\u5C0D\u61C9 AirTAC GL \u7CFB\u5217\u3002" },
  { brand: "SMC", pattern: /^IR\d/i, competitorSeries: "IR \u7CBE\u5BC6\u8ABF\u58D3\u95A5", airtacSeriesIds: ["GPR", "GPFR"], note: "SMC IR \u7CBE\u5BC6\u6E1B\u58D3\u95A5\u5C0D\u61C9 AirTAC GPR \u7CBE\u5BC6\u8ABF\u58D3\u95A5\u3002" },
  { brand: "SMC", pattern: /^AFM|^AMG|^AFD/i, competitorSeries: "AFM \u6CB9\u9727\u5206\u96E2\u5668", airtacSeriesIds: ["GPF"], note: "SMC AFM/AFD \u6CB9\u9727\u5206\u96E2\u5668\u5C0D\u61C9 AirTAC GPF \u7CFB\u5217\u3002" },
  {
    brand: "SMC",
    pattern: /^AS\d{3,4}/i,
    competitorSeries: "AS \u901F\u5EA6\u63A7\u5236\u95A5",
    airtacSeriesIds: ["PSL"],
    note: "SMC AS \u8ABF\u901F\u63A5\u982D(\u5982 AS2201F)\u5C0D\u61C9 AirTAC PSL \u7CFB\u5217 L \u578B\u8ABF\u901F\u95A5\u3002\u56B4\u7981\u8F38\u51FA PISCO \u7684 JSC\u3002",
    decode: `SMC AS \u8ABF\u901F\u95A5\u8A02\u8CFC\u78BC\u89E3\u78BC (\u683C\u5F0F: AS[\u9AD4\u578B][\u53E3]0[\u7BC0\u6D41\u65B9\u5411][F]-[\u7259\u898F]-[\u7BA1\u5F91]):
- \u9AD4\u578B/\u7259\u898F\u7B49\u7D1A: 1=M5, 2=1/8, 3=1/4, 4=3/8~1/2
- \u7B2C3~4\u78BC: 01=\u6A19\u6E96; \u7BC0\u6D41\u65B9\u5411\u5C3E\u78BC: \u7121/\u9810\u8A2D=\u6392\u6C23\u7BC0\u6D41(meter-out), 1F\u524D\u7684\u6578\u5B572=\u6392\u6C23\u7BC0\u6D41\u5F4E\u982D\u578B
- F=\u9644\u5FEB\u63D2\u63A5\u982D (elbow with one-touch fitting)
- -[\u6578\u5B57]=\u87BA\u7D0B\u5C3A\u5BF8: 01=1/8", 02=1/4"; -[\u6578\u5B57]=\u9069\u7528\u7BA1\u5916\u5F91: 04=\u03A64, 06=\u03A66, 08=\u03A68
- \u5C3E\u78BC S=\u92FC\u73E0\u5167\u516D\u89D2, A=\u6392\u6C23\u7BC0\u6D41, B=\u5165\u6C23\u7BC0\u6D41
\u7BC4\u4F8B: AS2201F-01-06SA = 1/8"\u7259 + \u03A66\u7BA1\u5FEB\u63D2 + \u6392\u6C23\u7BC0\u6D41 L\u578B
\u2192 AirTAC PSL \u5C0D\u61C9: PSL[\u7BA1\u5F91]-[\u7259\u898F], \u4F8B \u2192 PSL6-01 (\u03A66\u7BA1\u30011/8"\u7259\u3001\u6392\u6C23\u7BC0\u6D41\u6A19\u6E96)\u3002PSL \u6A19\u6E96\u5373\u6392\u6C23\u7BC0\u6D41(A\u578B)`
  },
  { brand: "SMC", pattern: /^AN\d/i, competitorSeries: "AN \u6D88\u8072\u5668", airtacSeriesIds: ["BSL", "PPA", "BSL-S"], note: "SMC AN \u6D88\u8072\u5668\u5C0D\u61C9 AirTAC BSL \u7CFB\u5217 (spec \u53EF\u9078 BSL/BSLM/BESL/PAL)\uFF1B\u7BA1\u585E\u5F0F\u5C0D\u61C9 PPA\uFF1B\u4E0D\u92B9\u92FC\u7248\u5C0D\u61C9 BSL-S\u3002" },
  {
    brand: "SMC",
    pattern: /^KQ2?([HLTUYE])/i,
    competitorSeries: "KQ2 \u5FEB\u63D2\u63A5\u982D",
    airtacSeriesIds: ["PC", "PL", "PE", "PEG", "PC-S", "PL-S"],
    note: "SMC KQ2 \u5FEB\u63D2\u63A5\u982D\u5C0D\u61C9 AirTAC \u5FEB\u901F\u63A5\u982D\uFF1A\u76F4\u901A\u516C\u7259\u2192PC\u3001\u5F4E\u982D/\u7259\u578B\u985E\u2192PL \u7CFB\u5217\u7684 spec \u9078\u9805\u3001\u63D2\u7BA1\u5C0D\u63D2\u7BA1\u985E\u2192PE \u7CFB\u5217\u7684 spec \u9078\u9805\u3001\u6E1B\u5F91/\u591A\u901A\u2192PEG\u3002\u4E0D\u92B9\u92FC\u7248\u9078 -S \u7CFB\u5217\u3002",
    decode: `SMC KQ2 \u8A02\u8CFC\u78BC\u89E3\u78BC (\u683C\u5F0F: KQ2[\u5F62\u72C0][\u7BA1\u5F91]-[\u7259\u898F/\u7B2C\u4E8C\u7BA1\u5F91]+\u5C3E\u78BC):
- \u5F62\u72C0: H=\u76F4\u901A\u516C\u7259\u63A5\u982D, L=L\u578B\u5F4E\u982D\u516C\u7259, T=T\u578B\u4E09\u901A, U=Y\u578B\u4E8C\u53C9, E=\u9694\u677F\u76F4\u901A, F=\u6BCD\u7259\u76F4\u901A, W=\u5EF6\u9577\u5F4E\u982D
- \u7BA1\u5F91: 04=\u03A64, 06=\u03A66, 08=\u03A68, 10=\u03A610, 12=\u03A612 (mm)
- \u7259\u898F: M5=M5\u7259, 01=1/8", 02=1/4", 03=3/8", 04=1/2"; \u524D\u7DB4 N (\u5982 -01N)=NPT\u7259; \u5C3E\u78BC S=\u5167\u516D\u89D2\u578B
\u2192 AirTAC \u5C0D\u61C9: \u5F62\u72C0 H\u2192PC \u7CFB\u5217, L(\u5F4E\u982D)\u2192PL \u7CFB\u5217(spec \u9078 PL), T(\u7259\u4E09\u901A)\u2192PL \u7CFB\u5217(spec \u9078 PEB/PED), \u63D2\u7BA1\u4E09\u901A\u2192PE \u7CFB\u5217(spec \u9078 PE), U/Y\u2192PE \u7CFB\u5217(spec \u9078 PY), \u7BA1\u5C0D\u7BA1\u76F4\u901A\u2192PE \u7CFB\u5217(spec \u9078 PU); \u8A02\u8CFC\u78BC = [\u5F62\u72C0\u4EE3\u865F][\u7BA1\u5F91] [\u7259\u898F], \u4F8B KQ2L06-01S \u2192 PL 6 01 (\u03A66\u7BA1\u30011/8"\u7259)\u3002NPT \u7259\u9700\u5099\u8A3B`
  },
  { brand: "SMC", pattern: /^RB\d{2}/i, competitorSeries: "RB \u6CB9\u58D3\u7DE9\u885D\u5668", airtacSeriesIds: ["ACA", "ACJ", "ACJ-L", "HR"], note: "SMC RB \u6CB9\u58D3\u7DE9\u885D\u5668\u5C0D\u61C9 AirTAC ACA (\u81EA\u52D5\u88DC\u511F\u5F0F) / ACJ (\u53EF\u8ABF\u5F0F, M10~M14) / ACJ-L (\u53EF\u8ABF\u5F0F, M20\u4EE5\u4E0A)\uFF0C\u4F9D\u672C\u9AD4\u87BA\u7D0B\u5C3A\u5BF8\u5C0D\u61C9\u3002" },
  {
    brand: "SMC",
    pattern: /^D-[A-Z]\d|^D-M9/i,
    competitorSeries: "D- \u78C1\u6027\u958B\u95DC",
    airtacSeriesIds: ["cms", "dms", "ems"],
    note: "SMC D- \u7CFB\u5217\u78C1\u6027\u958B\u95DC\uFF1A\u6709\u63A5\u9EDE(\u78C1\u7C27\u5F0F)\u5C0D\u61C9 CMS\uFF0C\u7121\u63A5\u9EDE(\u96FB\u5B50\u5F0F)\u5C0D\u61C9 DMS/EMS\u3002",
    decode: `SMC D- \u78C1\u6027\u958B\u95DC\u89E3\u78BC:
- D-A9\u25A1/A5\u25A1/A6\u25A1 = \u6709\u63A5\u9EDE\u78C1\u7C27\u5F0F (reed): A93=2\u7DDA\u5F0F, A96=3\u7DDA\u5F0F
- D-M9\u25A1 = \u7121\u63A5\u9EDE\u96FB\u5B50\u5F0F (solid state): M9B=2\u7DDA\u5F0F, M9N=3\u7DDA\u5F0FNPN, M9P=3\u7DDA\u5F0FPNP
- \u5C3E\u78BC V=\u5782\u76F4\u51FA\u7DDA, W=\u96D9\u8272\u6307\u793A, \u6578\u5B57L=\u5C0E\u7DDA\u9577(\u5982 L=3m, Z=5m, \u7121\u8A18\u865F=0.5m)
\u2192 AirTAC \u5C0D\u61C9: \u78C1\u7C27\u5F0F(A9\u25A1)\u2192CMS \u7CFB\u5217; \u96FB\u5B50\u5F0F(M9\u25A1)\u2192DMS \u7CFB\u5217 (2\u7DDA/3\u7DDA\u4F9D\u578B\u9304\u9078\u9805\u5C0D\u61C9); \u51FA\u7DDA\u9577\u4F9D AirTAC \u9078\u9805\u9078\u6700\u63A5\u8FD1`
  },
  { brand: "SMC", pattern: /^T[USH]\d{4}|^TU\d/i, competitorSeries: "TU \u6C23\u7BA1", airtacSeriesIds: ["PU-Tube", "UCS-Tube", "PA-Tube", "UWS98A", "UN54D"], note: "SMC TU \u805A\u6C28\u916F\u6C23\u7BA1\u5C0D\u61C9 AirTAC US98A/UE95A PU\u7BA1\uFF1B\u6372\u7BA1\u5C0D\u61C9 UCS/UCE\uFF1B\u5C3C\u9F8D\u7BA1\u5C0D\u61C9 PA12/PA6\uFF1B\u963B\u71C3\u7BA1\u5C0D\u61C9 UN54D/UWS98A\u3002" },
  // --- Festo ---
  { brand: "Festo", pattern: /^DSNU|^ESNU/i, competitorSeries: "DSNU \u5713\u5F62\u6C23\u7F38(ISO6432)", airtacSeriesIds: ["mi", "ma", "mf"], note: "Festo DSNU \u5713\u5F62\u8FF7\u4F60\u7F38\u5C0D\u61C9 AirTAC MI/MA \u7CFB\u5217(ISO6432)\u3002" },
  { brand: "Festo", pattern: /^DSBC|^DNC/i, competitorSeries: "DSBC/DNC \u6A19\u6E96\u6C23\u7F38(ISO15552)", airtacSeriesIds: ["sai", "se", "sc"], note: "Festo DSBC/DNC \u6A19\u6E96\u7F38\u5C0D\u61C9 AirTAC SAI (ISO15552) \u6216 SE \u7CFB\u5217\u3002" },
  { brand: "Festo", pattern: /^ADVU|^ADN|^AEVC|^ADVC/i, competitorSeries: "ADVU/ADN \u7DCA\u6E4A\u6C23\u7F38", airtacSeriesIds: ["acq", "sda", "ace", "act"], note: "Festo ADVU/ADN \u7DCA\u6E4A\u578B\u6C23\u7F38\u5C0D\u61C9 AirTAC ACQ/SDA \u8D85\u8584\u7F38\u3002" },
  { brand: "Festo", pattern: /^DFM/i, competitorSeries: "DFM \u5E36\u5C0E\u687F\u6C23\u7F38", airtacSeriesIds: ["tcl", "tcm", "tsai"], note: "Festo DFM \u5E36\u5C0E\u687F\u6C23\u7F38\u5C0D\u61C9 AirTAC TCL/TCM \u4E09\u8EF8\u7F38\u3002" },
  { brand: "Festo", pattern: /^SLT|^DGSL/i, competitorSeries: "SLT/DGSL \u8FF7\u4F60\u6ED1\u53F0", airtacSeriesIds: ["hlq", "hls", "hlf"], note: "Festo \u8FF7\u4F60\u6ED1\u53F0\u5C0D\u61C9 AirTAC HLQ/HLS \u7CBE\u5BC6\u6ED1\u53F0\u3002" },
  { brand: "Festo", pattern: /^HGP|^DHPS/i, competitorSeries: "HGP/DHPS \u5E73\u884C\u6C23\u722A", airtacSeriesIds: ["hfz", "hfk", "hfp"], note: "Festo \u5E73\u884C\u6C23\u722A\u5C0D\u61C9 AirTAC HFZ/HFK \u7CFB\u5217\u3002" },
  { brand: "Festo", pattern: /^DSM|^DRVS|^DRRD/i, competitorSeries: "DSM/DRVS \u64FA\u52D5\u6C23\u7F38", airtacSeriesIds: ["hrq", "hrs"], note: "Festo \u64FA\u52D5\u7F38\u5C0D\u61C9 AirTAC HRQ \u7CFB\u5217\u3002" },
  { brand: "Festo", pattern: /^DFSP|^STA[F]?/i, competitorSeries: "STA/DFSP \u963B\u64CB\u6C23\u7F38", airtacSeriesIds: ["twq", "twh", "twg"], note: "Festo \u963B\u64CB\u6C23\u7F38\u5C0D\u61C9 AirTAC TWQ/TWH \u7CFB\u5217\u3002" },
  { brand: "Festo", pattern: /^VUVS|^MFH|^JMFH|^VUVG/i, competitorSeries: "VUVS/MFH \u96FB\u78C1\u95A5", airtacSeriesIds: ["4V200", "4V300", "6SV", "7SV"], note: "Festo \u4E94\u53E3\u96FB\u78C1\u95A5\u5C0D\u61C9 AirTAC 4V \u6216 6SV/7SV \u7CFB\u5217\uFF0C\u4F9D\u53E3\u5F91\u8207\u6D41\u91CF\u3002" },
  { brand: "Festo", pattern: /^GRLA|^GRL[ZO]?|^GR-/i, competitorSeries: "GRLA \u8ABF\u901F\u95A5", airtacSeriesIds: ["PSL"], note: "Festo GRLA \u8ABF\u901F\u63A5\u982D\u5C0D\u61C9 AirTAC PSL \u7CFB\u5217\u3002" },
  { brand: "Festo", pattern: /^QS[LTMYF]?/i, competitorSeries: "QS \u5FEB\u63D2\u63A5\u982D", airtacSeriesIds: ["PC", "PL", "PE", "PEG"], note: "Festo QS \u5FEB\u63D2\u63A5\u982D\uFF1AQS\u76F4\u901A\u516C\u7259\u2192PC\u3001QSL\u5F4E\u982D\u2192PL(spec\u9078L\u578B)\u3001QST\u4E09\u901A\u2192PE(spec\u9078PE)\u3001\u6E1B\u5F91\u2192PEG\u3002" },
  { brand: "Festo", pattern: /^MS[4-9]|^FRC|^LFR/i, competitorSeries: "MS/FRC \u6C23\u6E90\u8655\u7406", airtacSeriesIds: ["GC", "GFC", "GFR", "GF", "GR"], note: "Festo MS/FRC \u7CFB\u5217 FRL \u5C0D\u61C9 AirTAC G \u7CFB\u5217\u6C23\u6E90\u8655\u7406(GFR/GC\u7B49)\u3002" },
  { brand: "Festo", pattern: /^U-\d|^AMTE/i, competitorSeries: "U \u6D88\u8072\u5668", airtacSeriesIds: ["BSL"], note: "Festo U \u7CFB\u5217\u6D88\u8072\u5668\u5C0D\u61C9 AirTAC BSL\u3002" },
  // --- Mindman (金器) ---
  { brand: "Mindman", pattern: /^MCQV|^MCQA|^MCQI/i, competitorSeries: "MCQV/MCQA \u8584\u578B\u6C23\u7F38", airtacSeriesIds: ["acq", "sda"], note: "Mindman MCQ \u7CFB\u5217\u8584\u578B\u7F38\u5C0D\u61C9 AirTAC ACQ/SDA\u3002" },
  { brand: "Mindman", pattern: /^MCMI|^MCMJ|^MCJA/i, competitorSeries: "MCMI \u8FF7\u4F60\u6C23\u7F38", airtacSeriesIds: ["mi", "ma", "mf"], note: "Mindman MCMI \u8FF7\u4F60\u7F38(ISO6432)\u5C0D\u61C9 AirTAC MI/MA\u3002" },
  { brand: "Mindman", pattern: /^MCGB|^MCGA|^MCMA/i, competitorSeries: "MCGB/MCMA \u6A19\u6E96\u6C23\u7F38", airtacSeriesIds: ["sc", "se", "sai"], note: "Mindman \u6A19\u6E96\u6C23\u7F38\u5C0D\u61C9 AirTAC SC/SE \u7CFB\u5217\u3002" },
  { brand: "Mindman", pattern: /^MCGS/i, competitorSeries: "MCGS \u5E36\u5C0E\u687F\u6C23\u7F38", airtacSeriesIds: ["tcl", "tcm"], note: "Mindman MCGS \u5E36\u5C0E\u687F\u7F38\u5C0D\u61C9 AirTAC TCL/TCM\u3002" },
  { brand: "Mindman", pattern: /^MCHA|^MCHB/i, competitorSeries: "MCH \u6C23\u722A", airtacSeriesIds: ["hfz", "hfy", "hfp"], note: "Mindman \u6C23\u722A\u5C0D\u61C9 AirTAC HF \u7CFB\u5217\uFF0C\u4F9D\u958B\u9589\u5F62\u5F0F\u9078\u64C7\u3002" },
  { brand: "Mindman", pattern: /^MVSC|^MVSD|^MVSE/i, competitorSeries: "MVSC \u96FB\u78C1\u95A5", airtacSeriesIds: ["4V100", "4V200", "4V300"], note: "Mindman MVSC \u96FB\u78C1\u95A5\u5C0D\u61C9 AirTAC 4V \u7CFB\u5217(MVSC-220\u21924V210 \u7B49)\u3002" },
  { brand: "Mindman", pattern: /^MACP|^MAFR|^MACT/i, competitorSeries: "MACP \u6C23\u6E90\u8655\u7406", airtacSeriesIds: ["GFR", "GC", "GFC"], note: "Mindman \u6C23\u6E90\u8655\u7406(\u8ABF\u58D3\u904E\u6FFE\u5668\u7B49)\u5C0D\u61C9 AirTAC GFR/GC \u7CFB\u5217\u3002" },
  // --- PISCO ---
  { brand: "PISCO", pattern: /^JSC/i, competitorSeries: "JSC \u8ABF\u901F\u95A5", airtacSeriesIds: ["PSL"], note: "PISCO JSC \u8ABF\u901F\u63A5\u982D\u5C0D\u61C9 AirTAC PSL \u7CFB\u5217\u3002" },
  { brand: "PISCO", pattern: /^P[CLBEUY]\d/i, competitorSeries: "PC/PL \u5FEB\u63D2\u63A5\u982D", airtacSeriesIds: ["PC", "PL", "PE", "PEG"], note: "PISCO \u5FEB\u63D2\u63A5\u982D\u547D\u540D\u8207 AirTAC \u5E7E\u4E4E\u76F8\u540C\uFF1APC\u76F4\u901A\u2192PC\u3001PL\u5F4E\u982D\u2192PL\u3001PE\u4E09\u901A/PU\u76F4\u901A(\u7BA1\u5C0D\u7BA1)/PY\u2192PE \u7CFB\u5217 spec \u9078\u9805\u3001\u6E1B\u5F91\u985E\u2192PEG\u3002" },
  { brand: "PISCO", pattern: /^SL[WM]?\d/i, competitorSeries: "SL \u6D88\u8072\u5668", airtacSeriesIds: ["BSL"], note: "PISCO \u6D88\u8072\u5668\u5C0D\u61C9 AirTAC BSL\u3002" },
  // --- CKD (常見，雖不在下拉清單也支援自動偵測) ---
  { brand: "CKD", pattern: /^SSD/i, competitorSeries: "SSD \u8584\u578B\u6C23\u7F38", airtacSeriesIds: ["acq", "sda"], note: "CKD SSD \u8584\u578B\u7F38\u5C0D\u61C9 AirTAC ACQ/SDA\u3002" },
  { brand: "CKD", pattern: /^CMK2|^SCM/i, competitorSeries: "CMK2/SCM \u6C23\u7F38", airtacSeriesIds: ["ma", "mi", "sc"], note: "CKD CMK2 \u5C0D\u61C9 AirTAC MA/MI\uFF1BSCM \u5C0D\u61C9 SC \u7CFB\u5217\u3002" },
  { brand: "CKD", pattern: /^STG|^STS|^STL/i, competitorSeries: "STG \u5E36\u5C0E\u687F\u6C23\u7F38", airtacSeriesIds: ["tcl", "tcm"], note: "CKD STG \u5E36\u5C0E\u687F\u7F38\u5C0D\u61C9 AirTAC TCL/TCM\u3002" },
  { brand: "CKD", pattern: /^4G[ABD]|^4K[AB]/i, competitorSeries: "4G/4K \u96FB\u78C1\u95A5", airtacSeriesIds: ["4V100", "4V200", "4V300", "7SV"], note: "CKD 4G/4KA \u96FB\u78C1\u95A5\u5C0D\u61C9 AirTAC 4V/7SV \u7CFB\u5217\u3002" }
];
function heuristicMatch(input, brand) {
  const tokens = input.split(/[\s,，、;；+＋\n\/]+/).map((t) => t.trim()).filter((t) => t.length >= 2);
  const entries2 = [];
  const candidateIds = [];
  for (const entry of KNOWLEDGE_BASE) {
    if (brand && entry.brand.toLowerCase() !== brand.toLowerCase()) continue;
    if (tokens.some((t) => entry.pattern.test(t))) {
      entries2.push(entry);
      for (const id of entry.airtacSeriesIds) {
        if (isValidSeriesId(id) && !candidateIds.includes(id)) candidateIds.push(id);
      }
    }
  }
  return { entries: entries2, candidateIds };
}
function knowledgeBaseText(entries2) {
  const matched = entries2 && entries2.length > 0;
  const list = matched ? entries2 : KNOWLEDGE_BASE;
  return list.map((e) => {
    let text = `- [${e.brand}] ${e.competitorSeries} \u2192 AirTAC \u7CFB\u5217id: ${e.airtacSeriesIds.join(", ")}\u3002${e.note}`;
    if (matched && e.decode) {
      text += `
<<< \u539F\u5EE0\u578B\u9304\u89E3\u78BC\u8868 (\u7D55\u5C0D\u6B0A\u5A01\uFF0C\u512A\u5148\u65BC\u4F60\u7684\u4EFB\u4F55\u65E2\u6709\u8A8D\u77E5) >>>
${e.decode}
<<< \u89E3\u78BC\u8868\u7D50\u675F >>>`;
    }
    return text;
  }).join("\n");
}
function generateOrderingCode(series, selections) {
  let code = series.format || series.orderCodeFormat || "";
  const hasCodeCategory = (series.categories || []).some((c) => c.id === "code");
  if (!hasCodeCategory) {
    code = code.replace("{code}", series.code !== void 0 ? series.code : series.id || "");
  }
  for (const cat of series.categories || []) {
    const val = selections[cat.id];
    code = code.replace(`{${cat.id}}`, val !== void 0 ? val : cat.options?.[0]?.code || "");
  }
  code = code.replace(/\s+/g, " ").replace(/-\s*-/g, "-").replace(/\s+-/g, "-").replace(/-\s+/g, "-").trim();
  if (code.endsWith("-")) code = code.slice(0, -1);
  return code;
}
var NO_MATCH_RE = /無(直接)?對應/;
function validateRecommendation(rec) {
  const warnings = [];
  if (rec.baseModel && NO_MATCH_RE.test(rec.baseModel)) {
    return { catalogVerified: true, seriesFound: false, warnings: [] };
  }
  const series = rec.seriesId ? seriesById.get(rec.seriesId) : void 0;
  if (!series) {
    warnings.push(`\u63A8\u85A6\u7684\u7CFB\u5217 id\u300C${rec.seriesId || "(\u672A\u63D0\u4F9B)"}\u300D\u4E0D\u5728\u578B\u9304\u8CC7\u6599\u5EAB\u4E2D\uFF0C\u8ACB\u4EBA\u5DE5\u78BA\u8A8D\u6B64\u578B\u865F\u662F\u5426\u5B58\u5728\u3002`);
    return { catalogVerified: false, seriesFound: false, warnings };
  }
  const selections = {};
  for (const sel of rec.selectedOptions || []) {
    const cat = (series.categories || []).find((c) => c.id === sel.categoryId);
    if (!cat) {
      warnings.push(`\u53C3\u6578\u300C${sel.categoryId}\u300D\u4E0D\u5B58\u5728\u65BC ${series.name} \u7684\u578B\u9304\u5B9A\u7FA9\u4E2D\u3002`);
      continue;
    }
    const opt = (cat.options || []).find((o) => o.code === sel.code);
    if (!opt) {
      const valid = (cat.options || []).map((o) => o.code === "" ? "(\u7A7A\u767D)" : o.code).join(", ");
      warnings.push(`\u300C${cat.name}\u300D\u4EE3\u78BC\u300C${sel.code === "" ? "(\u7A7A\u767D)" : sel.code}\u300D\u4E0D\u5728\u578B\u9304\u5408\u6CD5\u9078\u9805\u5167 (\u53EF\u9078: ${valid})\u3002`);
      continue;
    }
    selections[sel.categoryId] = sel.code;
  }
  const serverGeneratedCode = generateOrderingCode(series, selections);
  const normalize = (s) => s.replace(/[\s\-–—]+/g, "").toUpperCase();
  if (rec.fullOrderingCode && serverGeneratedCode && normalize(rec.fullOrderingCode) !== normalize(serverGeneratedCode)) {
    warnings.push(`AI \u7522\u751F\u7684\u8A02\u8CFC\u78BC\u300C${rec.fullOrderingCode}\u300D\u8207\u4F9D\u578B\u9304\u898F\u5247\u91CD\u5EFA\u7684\u300C${serverGeneratedCode}\u300D\u4E0D\u4E00\u81F4\uFF0C\u8ACB\u4EE5\u578B\u9304\u9A57\u8B49\u7248\u672C\u70BA\u6E96\u3002`);
  }
  return {
    catalogVerified: warnings.length === 0,
    seriesFound: true,
    warnings,
    serverGeneratedCode
  };
}

// src/data/company-crossref.json
var company_crossref_default = [
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SE",
    note: "\u53F0\u7063\u4E0D\u8CA9\u552E\uFF0CISO15552\uFF0C\u53EF\u7528SI\u66FF\u4EE3",
    sensor: "DMSE / CMSE",
    competitors: {
      SMC: "MB1",
      Mindman: "MCQV2",
      CKD: "SCW",
      Festo: "DNC/DNCB/DNG",
      \u9577\u62D3: "AQ2",
      Norgren: "KA/RA/8000"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SE-A",
    note: "\u53F0\u7063\u4E0D\u8CA9\u552E\uFF0C\u4E0D\u93FD\u92FCSUS420\uFF0CISO15552\uFF0C\u53EF\u7528SI\u66FF\u4EE3",
    sensor: "DMSE / CMSE",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SE-B",
    note: "\u53F0\u7063\u4E0D\u8CA9\u552E\uFF0C\u4E0D\u93FD\u92FCSUS304\uFF0CISO15552\uFF0C\u53EF\u7528SI\u66FF\u4EE3",
    sensor: "DMSE / CMSE",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SI",
    note: "\u7C73\u5B57\u578B\u6C23\u7F38  ISO15552 \u898F\u683C",
    sensor: "",
    competitors: {
      SMC: "C95",
      Mindman: "MCQI2",
      CKD: "SCW",
      Chelic: "DN",
      Festo: "DNC/DNCB/DNG",
      \u9686\u904B: "DNB",
      Norgren: "KA/RA/8000"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SI-A",
    note: "\u7C73\u5B57\u578B\u6C23\u7F38 \u4E0D\u93FD\u92FCSUS420",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SI-B",
    note: "\u7C73\u5B57\u578B\u6C23\u7F38 \u4E0D\u93FD\u92FCSUS304",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SIL",
    note: "\u7C73\u5B57\u578B\u5E36\u9396\u5F0F\u6C23\u7F38 ISO \u898F\u683C",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SIF",
    note: "\u7C73\u5B57\u578B\u5E36\u95A5\u5F0F\u6C23\u7F38 ISO \u898F\u683C",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SGC",
    note: "\u53F0\u7063\u4E0D\u8CA9\u552E\uFF0CISO15552\uFF0C\u53EF\u7528SI\u66FF\u4EE3",
    sensor: "",
    competitors: {
      SMC: "CS1",
      Mindman: "MCQV",
      Chelic: "DU",
      Norgren: "RA/8000"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SU",
    note: "\u53F0\u7063\u4E0D\u8CA9\u552E\uFF0CAirTAC\u898F\u683C\uFF0C\u53EF\u7528SC\u66FF\u4EE3",
    sensor: "",
    competitors: {
      Festo: "DSBC"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SC",
    note: "\u62C9\u687F\u5F0F\u6C23\u7F38\uFF0CAirTAC\u898F\u683C  (\xD832~\xD8100)",
    sensor: "F-DMSC\u25A1  +  DMSG / CMSG",
    competitors: {
      SMC: "CA1/CA2",
      CKD: "SCA2",
      Festo: "DSBG",
      \u9577\u62D3: "AS",
      \u5143\u57FA: "WA"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SC",
    note: "\u62C9\u687F\u5F0F\u6C23\u7F38\uFF0CAirTAC\u898F\u683C  (\xD8125~\xD8250)\uFF0CISO6430",
    sensor: "F-DMSC\u25A1  +  DMSG / CMSG",
    competitors: {
      Mindman: "MCQA",
      Koganei: "LDA"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SCL",
    note: "\u62C9\u687F\u5F0F\u5E36\u9396\u5F0F\u6C23\u7F38\uFF0CAirTAC\u898F\u683C",
    sensor: "F-DMSC\u25A1  +  DMSG / CMSG",
    competitors: {
      SMC: "CBA2"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SCF",
    note: "\u62C9\u687F\u5F0F\u5E36\u95A5\u5F0F\u6C23\u7F38\uFF0CAirTAC\u898F\u683C",
    sensor: "F-DMSC\u25A1  +  DMSG / CMSG",
    competitors: {
      SMC: "CBA2"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "JSI",
    note: "\u53F0\u7063\u4E0D\u8CA9\u552E\uFF0C\u7C73\u5B57\u578B\u6C23\u7F38 JSI \u898F\u683C",
    sensor: "",
    competitors: {
      SMC: "MB",
      CKD: "SCA2",
      Chelic: "DMB"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "BSE",
    note: "\u62B1\u7DCA\u6C23\u7F38",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "BSC",
    note: "\u62B1\u7DCA\u6C23\u7F38",
    sensor: "",
    competitors: {
      SMC: "MNB",
      \u9686\u904B: "BNK"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SI\u56FA\u5B9A\u5EA7",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "SC\u56FA\u5B9A\u5EA7",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6A19\u6E96\u6C23\u7F38 / \u65B9\u578B\u6C23\u7F38",
    airtac: "MCQA\u56FA\u5B9A\u5EA7",
    note: "\u91DD\u5C0DMindman MCQA\uFF0C\u53EF\u4F7F\u7528\u6211\u53F8JSI+\u975E\u6A19\u56FA\u5B9A\u5EA7",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MI",
    note: "\u4E0D\u93FD\u92FC  ISO6432 \u898F\u683C (\u9650\xD88~\xD825)",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "C85",
      Mindman: "MCMI",
      Chelic: "SDA",
      Festo: "DSN/DSNU",
      \u9577\u62D3: "MSR",
      \u9686\u904B: "DS",
      Norgren: "RM/8000"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MIC",
    note: "\u4E0D\u93FD\u92FC  ISO6432 \u898F\u683C (\u9650\xD88~\xD825)  \u5E36\u7DE9\u885D",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "C85",
      Mindman: "MCMI",
      Chelic: "SDA",
      \u9686\u904B: "DS"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "PB",
    note: "\u4E0D\u93FD\u92FC  JSI \u898F\u683C",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "CJ1/CJ2",
      Mindman: "MCMJ",
      CKD: "SCP*3",
      Chelic: "SBA",
      Festo: "EG-PK(\u50C5\u03A64)",
      Norgren: "MC"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "PBR",
    note: "\u4E0D\u93FD\u92FC  JSI \u898F\u683C\uFF0C\u524D\u84CB\u5B89\u88DD\u578B",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "CJ2R"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MF",
    note: "\u4E0D\u93FD\u92FC  JSI \u898F\u683C",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "CM2",
      Mindman: "MCMB",
      Chelic: "SDX",
      \u9577\u62D3: "MSR",
      Norgren: "RT/57200/M"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MFC",
    note: "\u4E0D\u93FD\u92FC  JSI \u898F\u683C\uFF0C\u5E36\u7DE9\u885D",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "CM2",
      Mindman: "MCMB",
      Norgren: "RT/57200/M"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MG",
    note: "\u4E0D\u93FD\u92FC  JSI \u898F\u683C",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "CG1",
      Mindman: "MCCG"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MGC",
    note: "\u4E0D\u93FD\u92FC  JSI \u898F\u683C\uFF0C\u5E36\u7DE9\u885D",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "CG1",
      Mindman: "MCCG"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MA",
    note: "\u4E0D\u93FD\u92FC  AirTAC\u898F\u683C",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      Mindman: "MCMA",
      \u9577\u62D3: "MSR",
      Norgren: "RT/57200/M"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MAC",
    note: "\u4E0D\u93FD\u92FC  AirTAC\u898F\u683C\uFF0C\u5E36\u7DE9\u885D",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      Mindman: "MCMA"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MAR",
    note: "\u4E0D\u93FD\u92FC  AirTAC\u898F\u683C\uFF0C\u524D\u84CB\u5B89\u88DD\u578B\uFF0C\u5E36\u7DE9\u885D",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "CM2R",
      Mindman: "MCMBR",
      Chelic: "DB-2",
      \u9577\u62D3: "AF"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MAL",
    note: "\u92C1\u5408\u91D1 AirTAC\u898F\u683C",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "CM2",
      Chelic: "FDA",
      \u9577\u62D3: "DA",
      Norgren: "RT/57200/M",
      \u5143\u57FA: "WK"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MBL",
    note: "\u92C1\u5408\u91D1",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MBLC",
    note: "\u92C1\u5408\u91D1\u3001\u5E36\u7DE9\u885D",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8FF7\u4F60\u6C23\u7F38 / \u7B46\u578B\u6C23\u7F38",
    airtac: "MPE",
    note: "\u87BA\u7D0B\u6C23\u7F38",
    sensor: "",
    competitors: {
      Mindman: "MCMJP",
      Koganei: "NSA",
      \u9577\u62D3: "AA"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8D85\u8584\u6C23\u7F38",
    airtac: "ACE",
    note: "\u7DCA\u6E4A\u578B ISO21287",
    sensor: "DMSE / CMSE",
    competitors: {
      SMC: "C55",
      Mindman: "MCJI",
      Chelic: "JE",
      Festo: "AEN"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8D85\u8584\u6C23\u7F38",
    airtac: "TACE",
    note: "\u5E36\u5C0E\u687F\u9762\u677F+\u7DCA\u6E4A\u578B ISO21287",
    sensor: "DMSE / CMSE",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8D85\u8584\u6C23\u7F38",
    airtac: "ACP",
    note: "\u7DCA\u6E4A\u578B DIN\u6A19\u6E96",
    sensor: "DMSE / CMSE",
    competitors: {
      Chelic: "JE",
      Festo: "ADVU",
      Norgren: "RM/92000/M"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8D85\u8584\u6C23\u7F38",
    airtac: "ACQ",
    note: "\u6CBB\u5177\u7F38 JSI \u898F\u683C\u3001\u4E0D\u9644\u78C1\u77F3  (\xD812~\xD8100)",
    sensor: "",
    competitors: {
      SMC: "CQ2",
      Mindman: "MCJQ",
      CKD: "SSD2",
      \u9577\u62D3: "JR",
      \u9686\u904B: "DJA",
      Norgren: "RM/92000/M"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8D85\u8584\u6C23\u7F38",
    airtac: "ACQS",
    note: "\u6CBB\u5177\u7F38 JSI \u898F\u683C\u3001\u9644\u78C1\u77F3      (\xD812~\xD8100)",
    sensor: "DMSG / CMSG / DMSJ / CMSJ",
    competitors: {
      SMC: "CQ2",
      Mindman: "MCJQ",
      CKD: "SSD2",
      \u9577\u62D3: "JR",
      Norgren: "RM/92000/M"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8D85\u8584\u6C23\u7F38",
    airtac: "ACQS",
    note: "\u6CBB\u5177\u7F38 JSI \u898F\u683C\u3001\u9644\u78C1\u77F3      (\xD8125\u3001\xD8140\u3001\xD8100)",
    sensor: "DMSG / CMSG / DMSJ / CMSJ",
    competitors: {
      \u9577\u62D3: "JR"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8D85\u8584\u6C23\u7F38",
    airtac: "TACQ",
    note: "\u5E36\u5C0E\u687F\u9762\u677F+\u6CBB\u5177\u7F38 JSI \u898F\u683C\u3001\u9644\u78C1\u77F3      (\xD812~\xD8100)",
    sensor: "DMSG / CMSG / DMSJ / CMSJ",
    competitors: {
      SMC: "CQM",
      Mindman: "MCGI",
      CKD: "SSG",
      Chelic: "CTJ",
      Festo: "ADVUL"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8D85\u8584\u6C23\u7F38",
    airtac: "SDA",
    note: "\u6CBB\u5177\u7F38 AirTAC\u898F\u683C\u3001\u4E0D\u9644\u78C1\u77F3  (\xD812~\xD8100)",
    sensor: "",
    competitors: {
      Mindman: "MCJA",
      Chelic: "JD",
      Norgren: "RM/92000/M",
      \u5143\u57FA: "WJ"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u8D85\u8584\u6C23\u7F38",
    airtac: "SDAS",
    note: "\u6CBB\u5177\u7F38 AirTAC\u898F\u683C\u3001\u9644\u78C1\u77F3  (\xD812~\xD8100)",
    sensor: "DMSG / CMSG / DMSJ / CMSJ",
    competitors: {
      Mindman: "MCJA",
      Chelic: "JD",
      Norgren: "RM/92000/M",
      \u5143\u57FA: "WJ"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u591A\u4F4D\u7F6E\u3001\u96D9\u8EF8\u3001\u4E09\u8EF8\u6C23\u7F38",
    airtac: "MD",
    note: "\u591A\u4F4D\u7F6E\u56FA\u5B9A\u6C23\u7F38",
    sensor: "DMSG / CMSG",
    competitors: {
      SMC: "CU",
      Mindman: "MCFA",
      CKD: "SMG",
      Chelic: "NQ",
      Festo: "DMM"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u591A\u4F4D\u7F6E\u3001\u96D9\u8EF8\u3001\u4E09\u8EF8\u6C23\u7F38",
    airtac: "MK",
    note: "\u591A\u4F4D\u7F6E\u56FA\u5B9A\u6B62\u56DE\u8F49\u6C23\u7F38",
    sensor: "DMSG / CMSG",
    competitors: {
      SMC: "CUK",
      Mindman: "MCFA-K",
      CKD: "SMD2",
      Chelic: "NQT",
      Festo: "DMML",
      \u9577\u62D3: "JUK",
      \u9686\u904B: "DUQ"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u591A\u4F4D\u7F6E\u3001\u96D9\u8EF8\u3001\u4E09\u8EF8\u6C23\u7F38",
    airtac: "MU",
    note: "\u5C0F\u578B\u81EA\u7531\u5B89\u88DD\u6C23\u7F38",
    sensor: "DMSH / CMSH",
    competitors: {
      SMC: "CUJ",
      Mindman: "MCFB",
      CKD: "MDC2",
      Chelic: "NU"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u591A\u4F4D\u7F6E\u3001\u96D9\u8EF8\u3001\u4E09\u8EF8\u6C23\u7F38",
    airtac: "MPG",
    note: "\u9762\u677F\u578B\u6C23\u7F38",
    sensor: "DMSH / CMSH",
    competitors: {
      SMC: "CJP2",
      Mindman: "MCMJP",
      Chelic: "NB"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u591A\u4F4D\u7F6E\u3001\u96D9\u8EF8\u3001\u4E09\u8EF8\u6C23\u7F38",
    airtac: "MPE",
    note: "\u87BA\u7D0B\u578B\u6C23\u7F38  \u5C1A\u672A\u4E0A\u5E02",
    sensor: "",
    competitors: {
      SMC: "CJP",
      Mindman: "MCMJP",
      CKD: "CAT",
      Chelic: "NA",
      Festo: "EGZ(\u03A66/10/16)"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u591A\u4F4D\u7F6E\u3001\u96D9\u8EF8\u3001\u4E09\u8EF8\u6C23\u7F38",
    airtac: "TN",
    note: "\u96D9\u8EF8\u6C23\u7F38\uFF08\u96D9\u5074\u9644\u78C1\uFF09",
    sensor: "DMSJ / CMSJ",
    competitors: {
      Mindman: "MCDA",
      Chelic: "TD",
      Festo: "DPZ/DPZC",
      \u9686\u904B: "GS"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u591A\u4F4D\u7F6E\u3001\u96D9\u8EF8\u3001\u4E09\u8EF8\u6C23\u7F38",
    airtac: "TR",
    note: "\u96D9\u8EF8\u6C23\u7F38\uFF08\u96D9\u5074\u9644\u78C1\uFF09",
    sensor: "DMSG / CMSG",
    competitors: {
      SMC: "CXS",
      CKD: "STR2",
      Chelic: "TDX",
      \u9686\u904B: "GS"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u591A\u4F4D\u7F6E\u3001\u96D9\u8EF8\u3001\u4E09\u8EF8\u6C23\u7F38",
    airtac: "TCL",
    note: "\u9644\u5C0E\u687F\u7F38\u76F4\u7DDA\u8EF8\u627F",
    sensor: "DMSG / CMSG",
    competitors: {
      SMC: "MGPL",
      Mindman: "MCGS",
      CKD: "STG-B",
      Chelic: "TB"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u591A\u4F4D\u7F6E\u3001\u96D9\u8EF8\u3001\u4E09\u8EF8\u6C23\u7F38",
    airtac: "TCM",
    note: "\u9644\u5C0E\u687F\u7F38\u9285\u5957\u8EF8\u627F",
    sensor: "DMSG / CMSG",
    competitors: {
      SMC: "MGPM",
      Mindman: "MCGS",
      CKD: "STG-M",
      Chelic: "TB"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6ED1\u53F0\u6C23\u7F38",
    airtac: "STW",
    note: "\u6ED1\u53F0\u6C23\u7F38",
    sensor: "DMSG / CMSG",
    competitors: {
      SMC: "CXWM",
      Mindman: "MCDB",
      Chelic: "STU/STM",
      Koganei: "SU",
      Festo: "SPZ"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6ED1\u53F0\u6C23\u7F38",
    airtac: "HLH",
    note: "\u5074\u8ECC\u578B\u7CBE\u5BC6\u6ED1\u53F0\u7F38",
    sensor: "DMSH / CMSH",
    competitors: {
      SMC: "MXH",
      Mindman: "MCSH",
      Chelic: "MQX",
      Festo: "SLS",
      \u9577\u62D3: "DH"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6ED1\u53F0\u6C23\u7F38",
    airtac: "HLQ",
    note: "\u96D9\u8EF8\u578B\u7CBE\u5BC6\u6ED1\u53F0\u7F38(\u5FAA\u74B0\u6EFE\u73E0)",
    sensor: "DMSH / CMSH",
    competitors: {
      SMC: "MXQ",
      CKD: "LCR/LCG"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6ED1\u53F0\u6C23\u7F38",
    airtac: "HLS",
    note: "\u96D9\u8EF8\u578B\u7CBE\u5BC6\u6ED1\u53F0\u7F38(\u6EFE\u67F1\u578B)",
    sensor: "DMSH / CMSH",
    competitors: {
      SMC: "MXS",
      Mindman: "MCSS",
      CKD: "LCM",
      Chelic: "MDX"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u7121\u687F\u6C23\u7F38",
    airtac: "RMS",
    note: "\u7121\u687F\u7F38 (\u4E0D\u9644\u78C1\u77F3)",
    sensor: "",
    competitors: {
      SMC: "CY3B",
      Mindman: "MCRPM",
      CKD: "MRL2",
      Chelic: "MRD",
      Festo: "DGO",
      Parker: "P1Z"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u7121\u687F\u6C23\u7F38",
    airtac: "RMT",
    note: "\u5C0E\u687F\u578B\u7121\u687F\u7F38",
    sensor: "DMSG / CMSG",
    competitors: {
      SMC: "CY1S",
      Mindman: "MCRPMS",
      Chelic: "MRU"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u7121\u687F\u6C23\u7F38",
    airtac: "RMTL",
    note: "\u7CBE\u5BC6\u5C0E\u687F\u578B\u7121\u687F\u7F38",
    sensor: "DMSG / CMSG",
    competitors: {
      SMC: "CY1L",
      Mindman: "MCRPMS",
      Chelic: "MRH",
      Festo: "SLM"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u65CB\u8F49\u6C23\u7F38",
    airtac: "HRQ",
    note: "\u56DE\u8F49\u6C23\u7F38",
    sensor: "DMSH / CMSH",
    competitors: {
      SMC: "MSQ",
      Mindman: "MCRQ",
      CKD: "GRC",
      Chelic: "RTB"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u65CB\u8F49\u6C23\u7F38",
    airtac: "ACK",
    note: "\u8F49\u89D2\u6C23\u7F38 \uFF080~180\xB0\uFF09",
    sensor: "",
    competitors: {
      Mindman: "MAS",
      Chelic: "HSR(L)",
      \u9686\u904B: "TAD"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u65CB\u8F49\u6C23\u7F38",
    airtac: "QCK",
    note: "\u56DE\u8F49\u593E\u7DCA\u6C23\u7F38\uFF080~90\xB0\uFF09",
    sensor: "DMSG / CMSG / DMSJ / CMSJ",
    competitors: {
      SMC: "MK",
      Mindman: "MCKC",
      CKD: "RCC2",
      Chelic: "SCR(L)",
      Festo: "CLR",
      \u9686\u904B: "TAS"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u65CB\u8F49\u6C23\u7F38",
    airtac: "QCK",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u65CB\u8F49\u6C23\u7F38",
    airtac: "QDK",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6C23\u52D5\u624B\u6307 (\u4E8C\u722A\u5E73\u884C\u3001\u4E09\u722A\u3001\u56DB\u722A)",
    airtac: "HFZ",
    note: "\u5E73\u884C\u5F0F\u593E\u722A\u7F38 (\u5C0E\u8ECC\u5F0F)",
    sensor: "DMSG / CMSG / DMSH / CMSH",
    competitors: {
      SMC: "MHZ2",
      Mindman: "MCHC",
      Chelic: "HDZ",
      \u9577\u62D3: "KP"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6C23\u52D5\u624B\u6307 (\u4E8C\u722A\u5E73\u884C\u3001\u4E09\u722A\u3001\u56DB\u722A)",
    airtac: "HFP",
    note: "\u5E73\u884C\u5F0F\u593E\u722A\u7F38 (\u6A5F\u68B0\u5F0F)",
    sensor: "DMSG / CMSG",
    competitors: {
      Mindman: "MCHB",
      Chelic: "HDP",
      Koganei: "NHB",
      \u9686\u904B: "CTU"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6C23\u52D5\u624B\u6307 (\u4E8C\u722A\u5E73\u884C\u3001\u4E09\u722A\u3001\u56DB\u722A)",
    airtac: "HFY",
    note: "Y\u578B\u593E\u722A\u7F38 (\u652F\u9EDE\u5F0F)",
    sensor: "DMSG / CMSG",
    competitors: {
      SMC: "MHC2",
      Mindman: "MCHA",
      Chelic: "HDS",
      Festo: "HGW",
      \u9686\u904B: "CTV"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6C23\u52D5\u624B\u6307 (\u4E8C\u722A\u5E73\u884C\u3001\u4E09\u722A\u3001\u56DB\u722A)",
    airtac: "HFR",
    note: "180\u2218\u593E\u722A\u7F38",
    sensor: "DMSH / CMSH",
    competitors: {
      SMC: "MHY2",
      Mindman: "MCHY",
      Chelic: "HDM",
      Festo: "DHRS",
      \u9686\u904B: "CTM"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6C23\u52D5\u624B\u6307 (\u4E8C\u722A\u5E73\u884C\u3001\u4E09\u722A\u3001\u56DB\u722A)",
    airtac: "HFC",
    note: "\u5713\u7F38\u4E8C\u722A\u3001\u4E09\u722A\u3001\u56DB\u722A",
    sensor: "DMSH / CMSH",
    competitors: {
      SMC: "MHS",
      Mindman: "HCHG",
      Chelic: "HQD"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6C23\u52D5\u624B\u6307 (\u4E8C\u722A\u5E73\u884C\u3001\u4E09\u722A\u3001\u56DB\u722A)",
    airtac: "HFK",
    note: "\u5E36\u5C0E\u8ECC\u3001\u6EFE\u67F1\u578B",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6C23\u52D5\u624B\u6307 (\u4E8C\u722A\u5E73\u884C\u3001\u4E09\u722A\u3001\u56DB\u722A)",
    airtac: "HFT",
    note: "\u5927\u53E3\u5F91\u3001\u958B\u53E3\u593E",
    sensor: "",
    competitors: {
      \u9686\u904B: "CHU"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    airtac: "JCK",
    note: "\u5F37\u529B\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    sensor: "DS1-KP",
    competitors: {
      SMC: "CKZ3"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    airtac: "MCK",
    note: "\u710A\u63A5\u593E\u7DCA\u6C23\u7F38",
    sensor: "F-DMSC\u25A1  +  DMSG / CMSG",
    competitors: {
      SMC: "CKG1",
      Mindman: "MCKA",
      CKD: "CAC3-G4",
      Chelic: "DCK2",
      \u9577\u62D3: "AKS"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u963B\u64CB\u6C23\u7F38",
    airtac: "TWH",
    note: "\u963B\u64CB\u7F38",
    sensor: "DMSG / CMSG / DMSJ / CMSJ",
    competitors: {
      SMC: "RS2H",
      Mindman: "MSB",
      Chelic: "STF",
      Festo: "STA"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u963B\u64CB\u6C23\u7F38",
    airtac: "TWM",
    note: "\u963B\u64CB\u7F38",
    sensor: "DMSG / CMSG / DMSJ / CMSJ",
    competitors: {
      SMC: "RS2H",
      Mindman: "MSB",
      Chelic: "STF",
      Festo: "STA"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u963B\u64CB\u6C23\u7F38",
    airtac: "TWG",
    note: "\u963B\u64CB\u7F38",
    sensor: "F-DMSM-\u25A1   +  DMSG / CMSG",
    competitors: {
      SMC: "RS2H",
      Mindman: "MSB",
      Festo: "STA"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u963B\u64CB\u6C23\u7F38",
    airtac: "TWQ",
    note: "\u963B\u64CB\u7F38",
    sensor: "DMSG / CMSG / DMSJ / CMSJ",
    competitors: {
      SMC: "RS2H",
      Mindman: "MSB",
      Chelic: "ST",
      Festo: "STA"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u963B\u64CB\u6C23\u7F38",
    airtac: "\u7DE9\u885D\u5668",
    note: "\u963B\u64CB\u6C23\u7F38\u5C08\u7528\u898F\u683C",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u6253\u5200\u7F38",
    airtac: "NPM",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "Y\u63A5\u982D\u3001I\u63A5\u982D\u3001\u9B5A\u773C\u63A5\u982D\u3001\u6D6E\u52D5\u63A5\u982D\u3001\u4FEE\u7406\u5305",
    airtac: "Y\u63A5\u982D",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "Y\u63A5\u982D\u3001I\u63A5\u982D\u3001\u9B5A\u773C\u63A5\u982D\u3001\u6D6E\u52D5\u63A5\u982D\u3001\u4FEE\u7406\u5305",
    airtac: "I\u63A5\u982D",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "Y\u63A5\u982D\u3001I\u63A5\u982D\u3001\u9B5A\u773C\u63A5\u982D\u3001\u6D6E\u52D5\u63A5\u982D\u3001\u4FEE\u7406\u5305",
    airtac: "\u6D6E\u52D5\u63A5\u982D",
    note: "",
    sensor: "",
    competitors: {
      SMC: "JA",
      Mindman: "MFC",
      Chelic: "CJ"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "Y\u63A5\u982D\u3001I\u63A5\u982D\u3001\u9B5A\u773C\u63A5\u982D\u3001\u6D6E\u52D5\u63A5\u982D\u3001\u4FEE\u7406\u5305",
    airtac: "\u9B5A\u773C\u63A5\u982D",
    note: "",
    sensor: "",
    competitors: {
      Mindman: "PHS"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "Y\u63A5\u982D\u3001I\u63A5\u982D\u3001\u9B5A\u773C\u63A5\u982D\u3001\u6D6E\u52D5\u63A5\u982D\u3001\u4FEE\u7406\u5305",
    airtac: "\u4FEE\u7406\u53051",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "Y\u63A5\u982D\u3001I\u63A5\u982D\u3001\u9B5A\u773C\u63A5\u982D\u3001\u6D6E\u52D5\u63A5\u982D\u3001\u4FEE\u7406\u5305",
    airtac: "\u4FEE\u7406\u53052",
    note: "",
    sensor: "",
    competitors: {
      Chelic: "\u611F\u61C9\u958B\u95DC"
    }
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u92B7\u91D8\u6C23\u7F38",
    airtac: "AOK",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u52A0\u50F9\u539F\u5247",
    airtac: "B01",
    note: "\u79FB\u5370\u6A5F\u884C\u696D",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u52A0\u50F9\u539F\u5247",
    airtac: "B02",
    note: "\u710A\u63A5\u884C\u696D",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u52A0\u50F9\u539F\u5247",
    airtac: "B06",
    note: "\u96FB\u6C60\u884C\u696D",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u52A0\u50F9\u539F\u5247",
    airtac: "B07",
    note: "TCM\u710A\u63A5\u5C08\u7528",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u52A0\u50F9\u539F\u5247",
    airtac: "B52-G",
    note: "PC\u676F+\u9644\u9006\u6D41\u95A5",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u52A0\u50F9\u539F\u5247",
    airtac: "B52-G",
    note: "PC\u676F+\u4E0D\u9644\u9006\u6D41\u95A5",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u52A0\u50F9\u539F\u5247",
    airtac: "B52-G",
    note: "\u91D1\u5C6C\u676F+\u9006\u6D41\u95A5",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u52A0\u50F9\u539F\u5247",
    airtac: "B52-G",
    note: "\u91D1\u5C6C\u676F+\u4E0D\u9644\u9006\u6D41\u95A5",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u52A0\u50F9\u539F\u5247",
    airtac: "B52-GS",
    note: "\u58D3\u529B\u8868(\u6A19\u6E96\u578B/\u4F4E\u58D3\u578B)",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u52A0\u50F9\u539F\u5247",
    airtac: "B52-U",
    note: "\u9B5A\u773C\u63A5\u982D",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u6C23\u7F38",
    section: "\u5C08\u7528\u884C\u696D\u8207\u6A19\u6E96\u54C1\u9762\u50F9\u76F8\u540C",
    airtac: "B52",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D\uFF0C\u76F4\u52D5\u5F0F",
    airtac: "3V1",
    note: "\u76F4\u52D5\u5F0F\u4E09\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u738710\u6B21/\u79D2\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A\uFF0C\u53EF\u4E32\u9023\u5F0F\u6A23",
    sensor: "",
    competitors: {
      SMC: "VX31",
      Mindman: "MVDC",
      CKD: "3MA0/3MB0",
      Chelic: "SV310"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D\uFF0C\u76F4\u52D5\u5F0F",
    airtac: "3V2",
    note: "\u76F4\u52D5\u5F0F\u4E09\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u738710\u6B21/\u79D2\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "VT307"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D\uFF0C\u76F4\u52D5\u5F0F",
    airtac: "3V2M",
    note: "",
    sensor: "",
    competitors: {
      SMC: "VV307"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D\uFF0C\u76F4\u52D5\u5F0F",
    airtac: "3V3",
    note: "\u76F4\u52D5\u5F0F\u4E09\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u738710\u6B21/\u79D2\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "VT317"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "3V100",
    note: "\u5148\u5C0E\u5F0F\u4E09\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "SYJ300",
      Mindman: "MVSC-180-3E1",
      CKD: "3GA1~3",
      Chelic: "SKU500~800"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "3V200",
    note: "\u5148\u5C0E\u5F0F\u4E09\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "SYJ500",
      Mindman: "MVSC-220-3E1",
      CKD: "3GA1~3",
      Chelic: "SKU500~800"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "3V300",
    note: "\u5148\u5C0E\u5F0F\u4E09\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "SYJ700",
      Mindman: "MVSC-300-3E1",
      CKD: "3GA1~3",
      Chelic: "SKU500~800"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "3V\u5E95\u5EA7",
    note: "1F~16F",
    sensor: "",
    competitors: {
      Mindman: "\u5E95\u5EA7\u65BC\u4EE5\u4E0A\u8CC7\u6599",
      Chelic: "SKU500~800"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "4V100",
    note: "\u5148\u5C0E\u5F0F\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF09\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "VFS1000",
      Mindman: "MVSC-180",
      CKD: "4GA1~3",
      Chelic: "SV500"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "4V200",
    note: "\u5148\u5C0E\u5F0F\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF09\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "VFS2000",
      Mindman: "MVSC-220",
      CKD: "4GA1~3",
      Chelic: "SV600"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "4V300",
    note: "\u5148\u5C0E\u5F0F\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73874\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF09\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "VFS3000",
      Mindman: "MVSC-300",
      CKD: "4GA1~3",
      Chelic: "SV800"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "4V400",
    note: "\u5148\u5C0E\u5F0F\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73873\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF09\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      Mindman: "MVSC-460",
      CKD: "4GA1~3",
      Chelic: "SV900"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "4M",
    note: "NAMUR \u578B\uFF0C\u5148\u5C0E\u5F0F\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u5206\u672C\u9AD4 3\u6B21/\u79D2\uFF09\uFF0C\u7121\u4E09\u4F4D\u7F6E\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      Mindman: "MVSN",
      Chelic: "SN"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "4V\u5E95\u5EA7",
    note: "1F~16F",
    sensor: "",
    competitors: {
      Mindman: "\u5E95\u5EA7\u65BC\u4EE5\u4E0A\u8CC7\u6599"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "HD4V",
    note: "\u5148\u5C0E\u5F0F\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF09\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "5V",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "7V050",
    note: "",
    sensor: "",
    competitors: {
      SMC: "SY3*00"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "7V100",
    note: "\u5148\u5C0E\u5F0F\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73878\u6B21/\u79D2\uFF083\u4F4D\u7F6E5\u6B21/\u79D2\uFF09\uFF0C\u8010\u71B1B\u7D1A\uFF0C\u4F4E\u529F\u73870.6W",
    sensor: "",
    competitors: {
      SMC: "SY5*00",
      Mindman: "MVSY-156",
      CKD: "O",
      Chelic: "SR500",
      Koganei: "O",
      Parker: "O",
      TPC: "O"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "7V200",
    note: "\u5148\u5C0E\u5F0F\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73878\u6B21/\u79D2\uFF083\u4F4D\u7F6E5\u6B21/\u79D2\uFF09\uFF0C\u8010\u71B1B\u7D1A\uFF0C\u4F4E\u529F\u73870.6W",
    sensor: "",
    competitors: {
      SMC: "SY7*00",
      Mindman: "MVSY188",
      CKD: "O",
      Chelic: "SR700",
      Koganei: "O",
      Parker: "O",
      TPC: "O"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "7MV100",
    note: "\u5148\u5C0E\u5F0F\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73878\u6B21/\u79D2\uFF083\u4F4D\u7F6E5\u6B21/\u79D2\uFF09\uFF0C\u8010\u71B1B\u7D1A\uFF0C\u4F4E\u529F\u73870.6W",
    sensor: "",
    competitors: {
      SMC: "SY5*40",
      Mindman: "MVSY-156",
      CKD: "O",
      Chelic: "SRB500",
      Koganei: "O",
      Parker: "O",
      TPC: "O"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "7MV200",
    note: "\u5148\u5C0E\u5F0F\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73878\u6B21/\u79D2\uFF083\u4F4D\u7F6E5\u6B21/\u79D2\uFF09\uFF0C\u8010\u71B1B\u7D1A\uFF0C\u4F4E\u529F\u73870.6W",
    sensor: "",
    competitors: {
      SMC: "SY7*40",
      Mindman: "MVSY188",
      CKD: "O",
      Chelic: "SRB700",
      Koganei: "O",
      Parker: "O",
      TPC: "O"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "7V\u5E95\u5EA7",
    note: "1F~16F",
    sensor: "",
    competitors: {
      Mindman: "\u5E95\u5EA7\u65BC\u4EE5\u4E0A\u8CC7\u6599",
      CKD: "O",
      Koganei: "O",
      Parker: "O",
      TPC: "O"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "ISO\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "ESV200",
    note: "ISO\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5 \u9023\u63A5\u9762\u5B89\u88DD\u5C3A\u5BF8\u70BAISO5599-1\uFF0C\u5DE5\u4F5C\u58D3\u529B\u53EF\u70BA0\u6216\u771F\u7A7A \uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "VQ7-6",
      Mindman: "MVSI",
      Festo: "MN1H"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "ISO\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "ESV300",
    note: "ISO\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5 \u9023\u63A5\u9762\u5B89\u88DD\u5C3A\u5BF8\u70BAISO5599-1\uFF0C\u5DE5\u4F5C\u58D3\u529B\u53EF\u70BA0\u6216\u771F\u7A7A\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "VQ7-6",
      Mindman: "MVSI",
      Festo: "MN1H"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "ISO\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "ESV400",
    note: "ISO\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5 \u9023\u63A5\u9762\u5B89\u88DD\u5C3A\u5BF8\u70BAISO5599-1\uFF0C\u5DE5\u4F5C\u58D3\u529B\u53EF\u70BA0\u6216\u771F\u7A7A\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "VQ7-6",
      Mindman: "MVSI",
      Festo: "MN1H"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "ISO\u96FB\u78C1\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D\uFF0C\u5F15\u5C0E\u5F0F(\u5148\u5C0E\u5F0F)",
    airtac: "ESV600",
    note: "ISO\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5 \u9023\u63A5\u9762\u5B89\u88DD\u5C3A\u5BF8\u70BAISO5599-1\uFF0C\u5DE5\u4F5C\u58D3\u529B\u53EF\u70BA0\u6216\u771F\u7A7A\uFF0CIP65\uFF0C\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "VQ7-6",
      Mindman: "MVSI",
      Festo: "MDH/JMDH"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D",
    airtac: "3A100",
    note: "\u5916\u90E8\u6C23\u63A7\u4E09\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF0C\u92C1\u5408\u91D1\u672C\u9AD4",
    sensor: "",
    competitors: {
      SMC: "VZA2*2",
      Mindman: "MVAA-180-3A"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D",
    airtac: "3A200",
    note: "\u5916\u90E8\u6C23\u63A7\u4E09\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF0C\u92C1\u5408\u91D1\u672C\u9AD4",
    sensor: "",
    competitors: {
      SMC: "VZA4*2",
      Mindman: "MVAA-220-3A"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D",
    airtac: "3A300",
    note: "\u5916\u90E8\u6C23\u63A7\u4E09\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF0C\u92C1\u5408\u91D1\u672C\u9AD4",
    sensor: "",
    competitors: {
      SMC: "VPA5*2",
      Mindman: "MVAA-300-3A"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E09\u53E3\u4E8C\u4F4D",
    airtac: "3A\u5E95\u5EA7",
    note: "",
    sensor: "",
    competitors: {
      Mindman: "\u5E95\u5EA7\u65BC\u4EE5\u4E0A\u8CC7\u6599"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "4A100",
    note: "\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF09M5:Cv=0.31~0.28 / 06:Cv=0.67~0.5",
    sensor: "",
    competitors: {
      SMC: "SYA5*20",
      Mindman: "MVAA-180",
      Chelic: "PV-500"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "4A200",
    note: "\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF0906:Cv=0.78~0.67 / 08:Cv=0.89~0.67",
    sensor: "",
    competitors: {
      SMC: "SYA7*20",
      Mindman: "MVAA-220",
      Chelic: "PV-600"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "4A300",
    note: "\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF0908:Cv=1.4~1 / 10:Cv=1.68~1",
    sensor: "",
    competitors: {
      SMC: "VFA3*20",
      Mindman: "MVAA-300",
      Chelic: "PV-800"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "4A400",
    note: "\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73873\u6B21/\u79D2 ; 15:Cv=2.79~1.68",
    sensor: "",
    competitors: {
      SMC: "VFA5*20",
      Mindman: "MVAA-460",
      Chelic: "PV-900"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "4A\u5E95\u5EA7",
    note: "",
    sensor: "",
    competitors: {
      Mindman: "\u5E95\u5EA7\u65BC\u4EE5\u4E0A\u8CC7\u6599",
      Chelic: "PV-\u5E95\u5EA7"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "5A",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "7A1*0",
    note: "\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF09Cv=0.55~0.48",
    sensor: "",
    competitors: {
      SMC: "SYA5*20",
      CKD: "O",
      Chelic: "PM",
      Koganei: "O",
      Parker: "O",
      TPC: "O"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "7A2*0",
    note: "\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF09Cv=0.83~0.65",
    sensor: "",
    competitors: {
      SMC: "SYA5*40",
      CKD: "O",
      Chelic: "PM",
      Koganei: "O",
      Parker: "O",
      TPC: "O"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "7MA1*0",
    note: "\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF09Cv=0.55~0.48",
    sensor: "",
    competitors: {
      SMC: "SYA7*20",
      CKD: "O",
      Chelic: "PMB",
      Koganei: "O",
      Parker: "O",
      TPC: "O"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "7MA2*0",
    note: "\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5\uFF0C\u4F5C\u52D5\u983B\u73875\u6B21/\u79D2\uFF083\u4F4D\u7F6E3\u6B21/\u79D2\uFF09Cv=0.83~0.65",
    sensor: "",
    competitors: {
      SMC: "SYA7*40",
      CKD: "O",
      Chelic: "PMB",
      Koganei: "O",
      Parker: "O",
      TPC: "O"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "ISO\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "EAV200",
    note: "ISO\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5 \u9023\u63A5\u9762\u5B89\u88DD\u5C3A\u5BF8\u70BAISO5599-1\uFF0C\u5DE5\u4F5C\u58D3\u529B\u53EF\u70BA0\u6216\u771F\u7A7A",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u95A5\u985E",
    section: "ISO\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "EAV300",
    note: "ISO\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5 \u9023\u63A5\u9762\u5B89\u88DD\u5C3A\u5BF8\u70BAISO5599-1\uFF0C\u5DE5\u4F5C\u58D3\u529B\u53EF\u70BA0\u6216\u771F\u7A7A",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u95A5\u985E",
    section: "ISO\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "EAV400",
    note: "ISO\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5 \u9023\u63A5\u9762\u5B89\u88DD\u5C3A\u5BF8\u70BAISO5599-1\uFF0C\u5DE5\u4F5C\u58D3\u529B\u53EF\u70BA0\u6216\u771F\u7A7A",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u95A5\u985E",
    section: "ISO\u6C23\u63A7\u95A5\uFF0C\u4E94\u53E3\u4E8C\u4F4D\u3001\u4E94\u53E3\u4E09\u4F4D",
    airtac: "EAV600",
    note: "ISO\u5916\u90E8\u6C23\u63A7\u4E94\u53E3\u95A5 \u9023\u63A5\u9762\u5B89\u88DD\u5C3A\u5BF8\u70BAISO5599-1\uFF0C\u5DE5\u4F5C\u58D3\u529B\u53EF\u70BA0\u6216\u771F\u7A7A",
    sensor: "",
    competitors: {
      Festo: "MDH/JMDH"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "4H",
    note: "\u624B\u52D5\u5F0F\u4E94\u53E3\u95A5 Cv0.67~1.0 \uFF0C\u53EF\u9762\u677F\u56FA\u5B9A\u6216\u672C\u9AD4\u56FA\u5B9A",
    sensor: "",
    competitors: {
      SMC: "VZM400",
      Mindman: "MVHB",
      Chelic: "HVL"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "3L",
    note: "\u624B\u62C9\u5F0F\u4E09\u53E3\u95A5 Cv0.67~1.67 \uFF0C\u53EF\u9762\u677F\u56FA\u5B9A\u6216\u672C\u9AD4\u56FA\u5B9A",
    sensor: "",
    competitors: {
      SMC: "VM200",
      Mindman: "MVHD"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "4L",
    note: "\u624B\u62C9\u5F0F\u4E94\u53E3\u95A5 Cv0.67~1.67 \uFF0C\u53EF\u9762\u677F\u56FA\u5B9A\u6216\u672C\u9AD4\u56FA\u5B9A",
    sensor: "",
    competitors: {
      SMC: "VZM500",
      Mindman: "MVHD"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "HSV",
    note: "\u624B\u6ED1\u5F0F\u4E09\u53E3\u95A5 Cv1.28~21.78",
    sensor: "",
    competitors: {
      Mindman: "MVHS",
      CKD: "H2V/H3V",
      Chelic: "MAV/MBV/MCV"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "4HV",
    note: "\u624B\u8F49\u5F0F\u56DB\u53E3\u95A5 Cv0.78~5.27",
    sensor: "",
    competitors: {
      Mindman: "MVHC",
      Chelic: "HVM  /   HVT"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "S3",
    note: "\u6A5F\u68B0\u5F0F\u4E09\u53E3\u95A5 Cv0.14~0.67",
    sensor: "",
    competitors: {
      SMC: "VM200",
      Mindman: "MVMC",
      Chelic: "MV200"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "M3",
    note: "\u6A5F\u68B0\u5F0F\u4E09\u53E3\u95A5 Cv0.14~0.67",
    sensor: "",
    competitors: {
      SMC: "VM400",
      Mindman: "MVMB-3",
      Chelic: "MV200"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "M5",
    note: "\u6A5F\u68B0\u5F0F\u4E94\u53E3\u95A5 Cv0.14~0.67",
    sensor: "",
    competitors: {
      SMC: "VZM400",
      Mindman: "MVMB-4",
      Chelic: "MV230 / MV250"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "CM3",
    note: "\u6A5F\u68B0\u5F0F\u4E09\u53E3\u95A5 Cv0.11 / 0.14 / 0.84 \uFF08 HD\u578B\u70BA\u4E94\u53E3\u4E09\u4F4D\u95A5\uFF09",
    sensor: "",
    competitors: {
      SMC: "VM100.200\nVM130-X41",
      Mindman: "EPA",
      Chelic: "MV150"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "ZM3",
    note: "\u91CD\u8F09\u578B\u6A5F\u68B0\u5F0F\u4E09\u53E3\u95A5 Cv=0.34",
    sensor: "",
    competitors: {
      SMC: "VM800",
      Festo: "RW/O-3"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "3F . 3FM",
    note: "\u8173\u8E0F\u5F0F\u4E09\u53E3\u95A5",
    sensor: "",
    competitors: {
      SMC: "VM230-02-40",
      Mindman: "MVFA",
      Chelic: "FVA"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "4F210",
    note: "\u8173\u8E0F\u5F0F\u4E94\u53E3\u95A5",
    sensor: "",
    competitors: {
      Mindman: "MVFA",
      Chelic: "FVS"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "ASC",
    note: "\u55AE\u5411\u7BC0\u6D41\u95A5",
    sensor: "",
    competitors: {
      SMC: "AS",
      Mindman: "MSC",
      Chelic: "ASC/BSC/CSC"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "NRV",
    note: "\u55AE\u5411\u95A5(\u9006\u6B62\u95A5\uFF09",
    sensor: "",
    competitors: {
      SMC: "AK",
      Mindman: "MJBV"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u4EBA\u63A7\u95A5\u3001\u6A5F\u68B0\u95A5\u3001\u5176\u4ED6\u95A5\u985E",
    airtac: "PCV",
    note: "\u8A98\u5C0E\u6B62\u56DE\u95A5",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2S",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u76F4\u52D5\u5E38\u9589\u578B\u6D41\u9AD4\u95A5 Cv=0.1~2.2  \u8010\u71B1B\u7D1A IP65 \u672C\u9AD4SUS304/\u5BC6\u5C01\u6750FPM-F",
    sensor: "",
    competitors: {
      SMC: "VX2",
      Mindman: "MSUS",
      CKD: "AB/D/P/G",
      Chelic: "SBS"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2S150~500",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u5148\u5C0E\u5E38\u9589\u578B\u6D41\u9AD4\u95A5 Cv=5.5~49 \u8010\u71B1B\u7D1A IP65 \u672C\u9AD4SUS304/\u5BC6\u5C01\u6750FPM-F",
    sensor: "",
    competitors: {
      SMC: "VXD21~23",
      CKD: "AB/D/P/G"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2KS",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u76F4\u52D5\u5E38\u958B\u578B\u6D41\u9AD4\u95A5 (030:Cv=0.1~0.55)(050:Cv=0.34~1.4)\u8010\u71B1B\u7D1A IP65 \u672C\u9AD4SUS304/\u5BC6\u5C01\u6750FPM-F",
    sensor: "",
    competitors: {
      SMC: "VX2",
      Mindman: "MSUS",
      CKD: "AB/D/P/G"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2KS150~500",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u5148\u5C0E\u5E38\u958B\u578B\u6D41\u9AD4\u95A5 Cv=5.5~49 \u8010\u71B1B\u7D1A IP65 \u672C\u9AD4SUS304/\u5BC6\u5C01\u6750FPM-F",
    sensor: "",
    competitors: {
      SMC: "VXD21~23",
      CKD: "AB/D/P/G"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2W",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u76F4\u52D5\u5E38\u9589\u578B\u6D41\u9AD4\u95A5 (030:Cv=0.1~1.1)(050:Cv=0.34~2.2) \u8010\u71B1B\u7D1A IP65 \u672C\u9AD4\u9EC3\u9285/\u5BC6\u5C01\u6750FPM-F",
    sensor: "",
    competitors: {
      SMC: "VXE2",
      Mindman: "MZS",
      CKD: "AB/D/P/G",
      Chelic: "SUD"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2W150~250",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u5148\u5C0E\u5E38\u958B\u578B\u6D41\u9AD4\u95A5 (Cv=5.5~12.5)  \u8010\u71B1B\u7D1A IP65 \u672C\u9AD4\u9EC3\u9285/\u5BC6\u5C01\u6750FPM-F",
    sensor: "",
    competitors: {
      SMC: "VXE2",
      CKD: "AB/D/P/G",
      Chelic: "SUW"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2KW",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u76F4\u52D5\u5E38\u958B\u578B\u6D41\u9AD4\u95A5 (030:Cv=0.1~0.55)(050:Cv=0.34~1.4) \u8010\u71B1B\u7D1A IP65 \u672C\u9AD4\u9EC3\u9285/\u5BC6\u5C01\u6750FPM-F",
    sensor: "",
    competitors: {
      SMC: "VXED2.VXH",
      Mindman: "MZS",
      CKD: "AB/D/P/G"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2KW150~250",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u5148\u5C0E\u5E38\u958B\u578B\u6D41\u9AD4\u95A5 (Cv=5.5~12.5)  \u8010\u71B1B\u7D1A IP65 \u672C\u9AD4\u9EC3\u9285/\u5BC6\u5C01\u6750FPM-F",
    sensor: "",
    competitors: {
      SMC: "VXED2",
      CKD: "AB/D/P/G"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2L",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u76F4\u52D5\u5E38\u9589\u578B\u6D41\u9AD4\u95A5 (030:Cv=0.18~3.3)(050:Cv=0.55~0.83) \u8010\u71B1H\u7D1A IP65 \u672C\u9AD4SUS304/\u5BC6\u5C01\u6750PTFE \u8010\u71B1183\u2103",
    sensor: "",
    competitors: {
      SMC: "VCS2.VXH",
      Mindman: "MSUS",
      CKD: "AB/D/P/G",
      Chelic: "SAS"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2L150~500",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u5148\u5C0E\u5E38\u9589\u578B\u6D41\u9AD4\u95A5  Cv=5.5~49.0 (\u6709\u6548\u65B7\u9762\u7A4D100\uFF5E880mm2)\u8010\u71B1H\u7D1A IP65 \u672C\u9AD4SUS304/\u5BC6\u5C01\u6750PTFE \u8010\u71B1183\u2103",
    sensor: "",
    competitors: {
      SMC: "VND.VXP.VXR",
      CKD: "AB/D/P/G",
      Chelic: "SAS"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2KL",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u76F4\u52D5\u5E38\u958B\u578B\u6D41\u9AD4\u95A5(030:Cv=0.18~0.33)(050:Cv=0.55~0.83)\u8010\u71B1H\u7D1A IP65 \u672C\u9AD4SUS304/\u5BC6\u5C01\u6750PTFE \u8010\u71B1183\u2103",
    sensor: "",
    competitors: {
      SMC: "VND.VXH",
      Mindman: "MSUS-NO",
      CKD: "AB/D/P/G"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2KL150~500",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u5148\u5C0E\u5E38\u958B\u578B\u6D41\u9AD4\u95A5Cv=5.5~49 \u8010\u71B1H\u7D1A IP65 \u672C\u9AD4SUS304/\u5BC6\u5C01\u6750PTFE \u8010\u71B1183\u2103",
    sensor: "",
    competitors: {
      SMC: "VND.VXP.VXR",
      CKD: "AB/D/P/G"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2V025",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u76F4\u52D5\u5E38\u9589\u578B\u6D41\u9AD4\u95A5Cv=0.23~13  \u8010\u71B1B\u7D1A  \u672C\u9AD4\u9EC3\u9285/\u5BC6\u5C01\u6750Viton \u52F5\u78C1\u6642\u95930.05\u79D2\u4EE5\u4E0B",
    sensor: "",
    competitors: {
      SMC: "VXP",
      CKD: "AB/D/P/G"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2V130.250",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u819C\u7247\u5148\u5C0E\u578B\u6D41\u9AD4\u95A5Cv=6.2~13  \u8010\u71B1B\u7D1A \u672C\u9AD4\u9EC3\u9285/\u5BC6\u5C01\u6750NBR \u52F5\u78C1\u6642\u95930.05\u79D2\u4EE5\u4E0B",
    sensor: "",
    competitors: {
      SMC: "VXP",
      CKD: "AB/D/P/G"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2P025",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u76F4\u52D5\u5E38\u9589\u6D41\u9AD4\u95A5/\u95A5\u9AD4\u5C3C\u9F8D66/\u5BC6\u5C01\u6750Viton\uFF0CIP65\u8010\u71B1B\u7D1A",
    sensor: "",
    competitors: {
      SMC: "VDW"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "2J",
    note: "\u4E8C\u53E3\u4E8C\u4F4D\u89D2\u5EA7\u95A5/\u95A5\u9AD4SUS316L\u53CASUS304/\u5BC6\u5C01\u6750Teflon",
    sensor: "",
    competitors: {
      Mindman: "MY",
      Burkert: "2000\u7CFB\u5217",
      Norgren: "54530/84510/84730/84750"
    }
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "\u56FA\u5B9A\u5EA7\u914D\u4EF6",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "CPV15",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u95A5\u985E",
    section: "\u6D41\u9AD4\u63A7\u5236\u96FB\u78C1\u95A5\uFF0C\u4E8C\u53E3\u4E8C\u4F4D",
    airtac: "CPV15S",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GC200~600",
    note: "\u904E\u6FFE+\u8ABF\u58D3+\u7D66\u6CB9 \uFF0C\u4E09\u806F\u5F0F\uFF0C2\u5206\u7121\u81EA\u52D5\u6392\u6C34",
    sensor: "",
    competitors: {
      SMC: "AC20~40",
      CKD: "C1000,C3000,C4000,C8000",
      Mindman: "MACT300~500",
      Chelic: "NC100~500",
      POSU: "PC2000~4000"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GFC200~600",
    note: "\u904E\u6FFE+\u8ABF\u58D3+\u7D66\u6CB9 \uFF0C\u4E8C\u806F\u5F0F\uFF0C2\u5206\u7121\u81EA\u52D5\u6392\u6C34",
    sensor: "",
    competitors: {
      SMC: "AC20A~40A",
      CKD: "C1010,C2010,C3010,C4010,C8010",
      Mindman: "MACP200~500",
      Chelic: "NFC100~500",
      POSU: "PC2010~4010"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GFR200~600",
    note: "\u8ABF\u58D3\u904E\u6FFE\u5668 \uFF0C\u55AE\u806F\u5F0F\uFF0C2\u5206\u7121\u81EA\u52D5\u6392\u6C34",
    sensor: "",
    competitors: {
      SMC: "AW20~40",
      CKD: "W1000,W3000,W4000,W8000",
      Mindman: "MAFR100~500",
      Chelic: "NFR100~500",
      POSU: "PW2000~4000"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GF200~600",
    note: "\u904E\u6FFE\u5668",
    sensor: "",
    competitors: {
      SMC: "AF20~40",
      CKD: "F1000,F3000,F4000,F8000",
      Mindman: "MAF200~900",
      Chelic: "NF100~500"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GR200~600",
    note: "\u8ABF\u58D3\u95A5(\u8ABF\u58D3\u7BC4\u570D0.05~0.9MPa; \u4F4E\u58D3\u578B0.05~0.4MPa)",
    sensor: "",
    competitors: {
      SMC: "AR20~40",
      CKD: "R1000,R3000,R4000,R8000",
      Mindman: "MAF200~900",
      Chelic: "NR100~500"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GL200~600",
    note: "\u7D66\u6CB9\u5668",
    sensor: "",
    competitors: {
      SMC: "AL20~40",
      CKD: "L1000,L3000,L4000,L8000",
      Mindman: "MAL200~900",
      Chelic: "NL100~500"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "G\u7CFB\u5217\u91D1\u5C6C\u676F",
    note: "\u904E\u6FFE+\u8ABF\u58D3+\u7D66\u6CB9 \uFF0C\u4E8C\u806F\u5F0F\uFF0C2\u5206\u7121\u81EA\u52D5\u6392\u6C34",
    sensor: "",
    competitors: {
      Mindman: "MACP310~410"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GV",
    note: "\u6162\u555F\u95A5",
    sensor: "",
    competitors: {
      CKD: "V1000,V3000",
      Mindman: "MAVS"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GZ",
    note: "\u622A\u6B62\u95A5",
    sensor: "",
    competitors: {
      Mindman: "MVHT"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GA\u5206\u6C23\u584A/\u652F\u67B6",
    note: "\u914D\u4EF6",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "G\u7CFB\u5217\u9006\u6D41\u95A5",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GPF",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "G\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "GPR",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "AC",
    note: "\u904E\u6FFE+\u8ABF\u58D3+\u7D66\u6CB9 \uFF0C\u4E09\u806F\u5F0F\uFF0C\u7121\u81EA\u52D5\u6392\u6C34",
    sensor: "",
    competitors: {
      Chelic: "AC150~AC200"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "BC",
    note: "\u904E\u6FFE+\u8ABF\u58D3+\u7D66\u6CB9 \uFF0C\u4E09\u806F\u5F0F",
    sensor: "",
    competitors: {
      Chelic: "BC200~CC600"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "AFC",
    note: "\u904E\u6FFE+\u8ABF\u58D3+\u7D66\u6CB9 \uFF0C\u4E8C\u806F\u5F0F\uFF0C\u7121\u81EA\u52D5\u6392\u6C34",
    sensor: "",
    competitors: {
      Chelic: "AFC150~AFC200"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "BFC",
    note: "\u904E\u6FFE+\u8ABF\u58D3+\u7D66\u6CB9 \uFF0C\u4E8C\u806F\u5F0F",
    sensor: "",
    competitors: {
      Chelic: "BFC200~CFC600"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "AFR",
    note: "\u8ABF\u58D3\u904E\u6FFE\u5668 \uFF0C\u55AE\u806F\u5F0F\uFF0C\u7121\u81EA\u52D5\u6392\u6C34",
    sensor: "",
    competitors: {
      Chelic: "AFR150~AFR200"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "BFR",
    note: "\u8ABF\u58D3\u904E\u6FFE\u5668 \uFF0C\u55AE\u806F\u5F0F",
    sensor: "",
    competitors: {
      Chelic: "BFR200~BFR600"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "AF",
    note: "\u904E\u6FFE\u5668\uFF0C\u7121\u81EA\u52D5\u6392\u6C34",
    sensor: "",
    competitors: {
      Chelic: "AF150~AF200"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "BF",
    note: "\u904E\u6FFE\u5668",
    sensor: "",
    competitors: {
      Chelic: "BF200~CF600"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "AR",
    note: "\u8ABF\u58D3\u95A5(\u8ABF\u58D3\u7BC4\u570D0.05~0.9MPa; \u4F4E\u58D3\u578B0.05~0.4MPa)",
    sensor: "",
    competitors: {
      Chelic: "AR150~AR200"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "BR",
    note: "\u8ABF\u58D3\u95A5(\u8ABF\u58D3\u7BC4\u570D0.05~0.9MPa; \u4F4E\u58D3\u578B0.05~0.4MPa)",
    sensor: "",
    competitors: {
      Chelic: "BR200~CR600"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "AL",
    note: "\u7D66\u6CB9\u5668",
    sensor: "",
    competitors: {
      Chelic: "AL150~AL200"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "A\u3001B\u7CFB\u5217 \u4E09\u9EDE\u7D44\u5408 \u76F8\u95DC",
    airtac: "BL",
    note: "\u7D66\u6CB9\u5668",
    sensor: "",
    competitors: {
      Chelic: "BL200~CL600"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "SR",
    note: "\u8ABF\u58D3\u95A5(\u8ABF\u58D3\u7BC4\u570D0.05~0.9MPa; \u4F4E\u58D3\u578B0.05~0.4MPa)",
    sensor: "",
    competitors: {
      Mindman: "MAR200~900"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "SDR",
    note: "\u8ABF\u58D3\u95A5(\u8ABF\u58D3\u7BC4\u570D0.05~0.9MPa; \u4F4E\u58D3\u578B0.05~0.4MPa)",
    sensor: "",
    competitors: {
      Mindman: "MAR200~900"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "ADW",
    note: "\u672B\u7AEF\u6392\u6C34\u5668",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "GS",
    note: "\u5713\u578B\u58D3\u529B\u9336\uFF0C\u6A19\u6E96\u578B",
    sensor: "",
    competitors: {
      SMC: "G43",
      Mindman: "PG"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "GF",
    note: "\u5713\u578B\u58D3\u529B\u9336\uFF0C\u9762\u677F\u5B89\u88DD",
    sensor: "",
    competitors: {
      SMC: "G49"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "GU",
    note: "\u5713\u578B\u58D3\u529B\u9336\uFF0C\u5D01\u5165\u5F0F\u5B89\u88DD",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "DPS",
    note: "\u6578\u4F4D\u5F0F\u58D3\u529B\u958B\u95DC\uFF0C-100~100KPa / -100~1000KPa\uFF0CNPN / PNP",
    sensor: "",
    competitors: {
      SMC: "ISE30A",
      Mindman: "MP42",
      Chelic: "PS"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "DPC",
    note: "\u7121\u986F\u793A\u6578\u4F4D\u5F0F\u58D3\u529B\u958B\u95DC\uFF0C-100~100KPa / -100~1000KPa\uFF0CNPN / PNP",
    sensor: "",
    competitors: {
      SMC: "PS1000",
      Festo: "SDE5",
      PISCO: "SEU11",
      CKD: "PPE-P10",
      \u9577\u62D3: "SE",
      Mindman: "MP10",
      Chelic: "PS-05"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "PK",
    note: "\u6A5F\u68B0\u5F0F\u58D3\u529B\u958B\u95DC\uFF0C0.1~1.0 MPa",
    sensor: "",
    competitors: {
      Mindman: "MPS"
    }
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "CTZ-2519C",
    note: "\u9006\u6B62\u578B\u5206\u6C23\u584A 1/4",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "CTZ-2518C",
    note: "\u9006\u6B62\u578B\u5206\u6C23\u584A 3/8",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u4E09\u9EDE\u7D44\u5408",
    section: "\u8ABF\u58D3\u95A5\u3001\u58D3\u529B\u8868\u3001\u58D3\u529B\u958B\u95DC",
    airtac: "CTZ-2517C",
    note: "\u9006\u6B62\u578B\u5206\u6C23\u584A 1/2",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u5176\u4ED6",
    section: "",
    airtac: "\u81EA\u88FD\u63A5\u982D",
    note: "",
    sensor: "",
    competitors: {
      SMC: "AS\u8ABF\u901F\u63A5\u982D / KQ2\u5FEB\u901F\u63A5\u982D",
      Mindman: "PISCO\u8ABF\u901F\u63A5\u982D / PISCO\u5FEB\u901F\u63A5\u982D",
      Chelic: "SQ\u5FEB\u901F\u63A5\u982D"
    }
  },
  {
    sheet: "\u5176\u4ED6",
    section: "",
    airtac: "\u6CB9\u58D3\u7DE9\u885D\u5668",
    note: "",
    sensor: "",
    competitors: {
      Chelic: "SA"
    }
  },
  {
    sheet: "\u5176\u4ED6",
    section: "",
    airtac: "PU\u87BA\u65CB\u7BA1",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u5176\u4ED6",
    section: "",
    airtac: "PU\u7BA1",
    note: "",
    sensor: "",
    competitors: {
      Chelic: "PU\u7BA1"
    }
  },
  {
    sheet: "\u5176\u4ED6",
    section: "",
    airtac: "\u9285\u63A5\u982D",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u5176\u4ED6",
    section: "",
    airtac: "\u5C3C\u9F8D\u7BA1",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u5176\u4ED6",
    section: "",
    airtac: "CMS",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u5176\u4ED6",
    section: "",
    airtac: "DMS",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u7DDA\u8ECC\u8DDF\u5C0E\u8ECC",
    section: "\u6A19\u6E96\u578B\u7DDA\u6027\u6ED1\u8ECC",
    airtac: "LSH",
    note: "",
    sensor: "",
    competitors: {
      THK: "HSR",
      HIWIN: "HG",
      PMI: "MSA",
      CPC: "HRC"
    }
  },
  {
    sheet: "\u7DDA\u8ECC\u8DDF\u5C0E\u8ECC",
    section: "\u4F4E\u5B89\u88DD\u578B\u7DDA\u6027\u6ED1\u8ECC",
    airtac: "LSD",
    note: "",
    sensor: "",
    competitors: {
      THK: "SR",
      HIWIN: "EG",
      PMI: "MSB",
      CPC: "ARC"
    }
  },
  {
    sheet: "\u7DDA\u8ECC\u8DDF\u5C0E\u8ECC",
    section: "\u5FAE\u578B\u7DDA\u6027\u6ED1\u8ECC",
    airtac: "LRM",
    note: "",
    sensor: "",
    competitors: {
      THK: "SRS",
      HIWIN: "MG",
      PMI: "MSC",
      CPC: "MR",
      MISUMI: "SSEB"
    }
  },
  {
    sheet: "\u7DDA\u8ECC\u8DDF\u5C0E\u8ECC",
    section: "\u5FAE\u578B\u7DDA\u6027\u6ED1\u8ECC(\u5BEC\u578B)",
    airtac: "LRW",
    note: "",
    sensor: "",
    competitors: {}
  },
  {
    sheet: "\u7DDA\u8ECC\u8DDF\u5C0E\u8ECC",
    section: "\u4EA4\u53C9\u6EFE\u67F1\u5C0E\u8ECC",
    airtac: "LGC",
    note: "",
    sensor: "",
    competitors: {
      \u9AD8\u660E\u9435: "GRD\u3001GRV"
    }
  }
];

// src/server/companyCrossref.ts
var entries = company_crossref_default;
function cellTokens(cell) {
  return cell.split(/[\/,，、\s]+/).map((t) => t.trim().split("~")[0]).map((t) => t.replace(/[^A-Za-z0-9-]/g, "").toUpperCase()).filter((t) => t.length >= 2);
}
var alphaPrefix = (t) => t.match(/^[A-Z]+/)?.[0] || "";
function matchCompanyTable(input, brand) {
  const inputTokens = input.split(/[\s,，、;；+＋\n\/]+/).map((t) => t.trim().toUpperCase().replace(/[^A-Z0-9-]/g, "")).filter((t) => t.length >= 2);
  if (inputTokens.length === 0) return [];
  const strong = [];
  const weak = [];
  for (const entry of entries) {
    for (const [entryBrand, cell] of Object.entries(entry.competitors)) {
      if (brand && entryBrand.toLowerCase() !== brand.toLowerCase()) continue;
      for (const token of cellTokens(cell)) {
        const hitStrong = inputTokens.some((it) => it.startsWith(token));
        if (hitStrong) {
          strong.push({ entry, brand: entryBrand, matchedModel: token, strong: true });
          break;
        }
        const ap = alphaPrefix(token);
        if (ap.length >= 2 && inputTokens.some((it) => it.startsWith(ap) && /\d/.test(it.charAt(ap.length)))) {
          weak.push({ entry, brand: entryBrand, matchedModel: token, strong: false });
          break;
        }
      }
    }
  }
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const m of [...strong, ...weak]) {
    if (!seen.has(m.entry)) {
      seen.add(m.entry);
      out.push(m);
    }
  }
  return out.slice(0, 8);
}
var variantCodeToId = /* @__PURE__ */ new Map();
for (const s of defaultCatalog) {
  const seriesCat = (s.categories || []).find((c) => c.id === "series" || c.id === "type" || c.id === "spec");
  for (const opt of seriesCat?.options || []) {
    const c = (opt.code || "").toUpperCase().replace(/[^A-Z0-9-]/g, "");
    if (c.length >= 2 && !variantCodeToId.has(c)) variantCodeToId.set(c, s.id);
  }
}
function companyMatchCatalogIds(matches) {
  const ids = [];
  const add = (id) => {
    if (!ids.includes(id)) ids.push(id);
  };
  for (const m of matches) {
    for (const raw of m.entry.airtac.split(/[\/,，、\s]+/)) {
      const token = raw.trim().split("~")[0].toUpperCase().replace(/[^A-Z0-9-]/g, "");
      if (token.length < 2) continue;
      const ap = alphaPrefix(token);
      if (variantCodeToId.has(token)) add(variantCodeToId.get(token));
      else if (ap.length >= 2 && variantCodeToId.has(ap)) add(variantCodeToId.get(ap));
      for (const s of defaultCatalog) {
        const code = (s.code || "").toUpperCase().replace(/\s+/g, "");
        const id = s.id.toUpperCase();
        if (code === token || id === token || ap.length >= 2 && (code === ap || id === ap)) {
          add(s.id);
        }
      }
    }
  }
  return ids;
}
function companyMatchesText(matches) {
  if (matches.length === 0) return "";
  return matches.map((m) => {
    const comps = Object.entries(m.entry.competitors).map(([b, v]) => `${b}: ${v}`).join(" | ");
    const extra = [m.entry.note && `\u5099\u8A3B: ${m.entry.note}`, m.entry.sensor && `\u642D\u914D\u611F\u6E2C\u5668: ${m.entry.sensor}`].filter(Boolean).join("\uFF1B");
    return `- [\u516C\u53F8\u5C0D\u7167\u8868/${m.entry.sheet}/${m.entry.section}] ${comps} \u2192 AirTAC\u300C${m.entry.airtac}\u300D${extra ? `\uFF08${extra}\uFF09` : ""}`;
  }).join("\n");
}

// src/server/store.ts
var KEYS = {
  confirmed: "airtac:confirmed",
  rules: "airtac:rules",
  corrections: "airtac:corrections"
};
function redisUrl() {
  return process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
}
function redisToken() {
  return process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
}
function useRedis() {
  return Boolean(redisUrl() && redisToken());
}
function useMemory() {
  return !useRedis() && process.env.LOCAL_MEMORY_STORE === "1";
}
var memory = {
  confirmed: /* @__PURE__ */ new Map(),
  rules: /* @__PURE__ */ new Map(),
  corrections: /* @__PURE__ */ new Map()
};
function isConfigured() {
  return useRedis() || useMemory();
}
async function redis(cmd) {
  const resp = await fetch(redisUrl(), {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd)
  });
  if (!resp.ok) throw new Error(`Redis ${cmd[0]} \u5931\u6557: ${resp.status} ${await resp.text().catch(() => "")}`);
  const data = await resp.json();
  if (data.error) throw new Error(`Redis ${cmd[0]}: ${data.error}`);
  return data.result;
}
async function get(kind, field) {
  if (useRedis()) {
    const v = await redis(["HGET", KEYS[kind], field]);
    if (!v) return null;
    try {
      return JSON.parse(v);
    } catch (e) {
      return null;
    }
  }
  if (useMemory()) return memory[kind].get(field) ?? null;
  return null;
}
function normalizeModel(model, brand) {
  const m = String(model || "").toUpperCase().replace(/[\s\-–—_]+/g, "");
  const b = String(brand || "").toUpperCase().replace(/\s+/g, "");
  return b && b !== "AUTO" ? `${b}::${m}` : m;
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
var MATCH_MODEL = () => process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
var CLASSIFIER_MODEL = () => process.env.GEMINI_CLASSIFIER_MODEL || "gemini-3.1-flash-lite";
var FALLBACK_MODELS = ["gemini-3.1-flash-lite", "gemini-2.5-flash", "gemini-3-flash-preview"];
var catalogIndex = buildCatalogIndex();
var catalogIndexJson = JSON.stringify(catalogIndex);
var slimIndexJson = JSON.stringify(
  catalogIndex.map(({ id, code, name, category, group }) => ({ id, code, name, category, group }))
);
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function mentionedSeriesIds(text) {
  if (!text || !text.trim()) return [];
  const hay = ` ${text.toUpperCase()} `;
  const out = [];
  for (const s of catalogIndex) {
    const id = String(s.id || "").toUpperCase();
    const code = String(s.code || "").toUpperCase();
    const idHit = id.length >= 2 && new RegExp(`(^|[^A-Z0-9])${escapeRegExp(id)}([^A-Z0-9]|$)`).test(hay);
    const codeHit = code.length >= 2 && new RegExp(`(^|[^A-Z0-9])${escapeRegExp(code)}[A-Z]?([0-9]|[^A-Z0-9]|$)`).test(hay);
    if (idHit || codeHit) out.push(s.id);
  }
  return out;
}
var cache = /* @__PURE__ */ new Map();
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
async function selectCandidateSeries(competitorModel, brand, heuristicIds, hints, customRules) {
  const prompt = `You are a pneumatic components classification expert for AirTAC (\u4E9E\u5FB7\u5BA2).
A user provided a competitor's model (or an assembly of models): "${competitorModel}"${brand ? ` from brand "${brand}"` : ""}.

Below is a COMPACT INDEX of the entire AirTAC catalog (id, name, category, ordering-code format, parameter names):
=== CATALOG INDEX ===
${catalogIndexJson}
=====================

${customRules ? `USER'S CUSTOM INSTRUCTION (HIGHEST PRIORITY \u2014 the user is explicitly steering the match; if it names or implies a specific AirTAC series/product type, you MUST include those series ids in your selection even if heuristics suggest otherwise):
"""
${customRules}
"""

` : ""}${hints ? `KNOWN CROSS-REFERENCE RULES (industry knowledge, prioritize these):
${hints}
` : ""}${heuristicIds.length > 0 ? `Heuristic pre-match suggests these series ids are likely relevant: ${heuristicIds.join(", ")}
` : ""}
Your task: identify what kind of product(s) the competitor model is, and select the AirTAC series from the index that are the MOST LIKELY equivalents. Rules:
1. Return ONLY series ids that exist in the index above ("id" field, exact string).
2. Select every series needed to cover ALL parts if the input is an assembly (e.g. cylinder + sensor + fitting).
3. Include 2-6 closely related alternatives per part (e.g. both ACQ and SDA for a compact cylinder) so the next stage can compare details.
4. ADJUSTABLE STROKE: if the competitor cylinder is an adjustable-stroke type (\u884C\u7A0B\u53EF\u8ABF, often a trailing "J"), also include the AirTAC adjustable-stroke variant series so the next stage can pick it.
5. If the user's custom instruction points to a product type/series, that takes precedence over heuristic suggestions.
6. If nothing in the catalog could possibly match, return an empty array.
Respond in JSON.`;
  const response = await generateWithRetry({
    model: CLASSIFIER_MODEL(),
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          competitorBrand: { type: Type.STRING, description: "\u5224\u65B7\u51FA\u7684\u7AF6\u722D\u5C0D\u624B\u54C1\u724C" },
          productType: { type: Type.STRING, description: "\u7522\u54C1\u7A2E\u985E\u7684\u7E41\u9AD4\u4E2D\u6587\u7C21\u8FF0 (\u5982: \u8584\u578B\u6C23\u7F38+\u78C1\u6027\u958B\u95DC)" },
          candidateSeriesIds: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "\u5F9E\u7D22\u5F15\u4E2D\u6311\u51FA\u7684 AirTAC \u5019\u9078\u7CFB\u5217 id (\u5B8C\u5168\u4E00\u81F4\u7684\u5B57\u4E32)"
          }
        },
        required: ["competitorBrand", "productType", "candidateSeriesIds"]
      }
    }
  });
  if (!response || !response.text) return { ids: [] };
  try {
    const parsed = JSON.parse(response.text);
    const ids = Array.isArray(parsed.candidateSeriesIds) ? parsed.candidateSeriesIds.filter((id) => typeof id === "string" && isValidSeriesId(id)) : [];
    return { ids, brandGuess: parsed.competitorBrand, productType: parsed.productType };
  } catch (e) {
    console.error("Failed to parse classifier response:", response.text?.slice(0, 500));
    return { ids: [] };
  }
}
function learnedRulesText(rules) {
  return rules.filter((r) => r && typeof r.decode === "string" && r.decode.trim()).slice(0, 10).map((r) => `- [\u4F7F\u7528\u8005\u77E5\u8B58\u5EAB${r.brand ? `/${r.brand}` : ""}] ${r.seriesName || ""}
<<< \u539F\u5EE0\u578B\u9304\u89E3\u78BC\u8868 (\u7D55\u5C0D\u6B0A\u5A01\uFF0C\u512A\u5148\u65BC\u4F60\u7684\u4EFB\u4F55\u65E2\u6709\u8A8D\u77E5) >>>
${String(r.decode).slice(0, 6e3)}
<<< \u89E3\u78BC\u8868\u7D50\u675F >>>`).join("\n");
}
async function crossReference(reqBody) {
  try {
    const { competitorModel, brand, customRules, learnedRules } = reqBody || {};
    if (!competitorModel) {
      return { status: 400, body: { error: "competitorModel is required" } };
    }
    let teamCorrection = null;
    if (isConfigured()) {
      try {
        teamCorrection = await get("corrections", normalizeModel(competitorModel, brand));
      } catch (e) {
        console.error("correction lookup failed:", e.message || e);
      }
    }
    const rulesHash = customRules || Array.isArray(learnedRules) && learnedRules.length > 0 || teamCorrection ? crypto.createHash("sha1").update(String(customRules || "") + JSON.stringify(learnedRules || []) + JSON.stringify(teamCorrection?.updatedAt || "")).digest("hex").slice(0, 12) : "none";
    const cacheKey = `${brand || "auto"}-${competitorModel.trim().toUpperCase()}-${rulesHash}`;
    if (!customRules && cache.has(cacheKey)) {
      console.log(`Cache hit for ${cacheKey}`);
      return { status: 200, body: JSON.parse(cache.get(cacheKey)) };
    }
    const heuristic = heuristicMatch(competitorModel, brand);
    let hints = knowledgeBaseText(heuristic.entries.length > 0 ? heuristic.entries : void 0);
    if (teamCorrection && teamCorrection.airtacCode) {
      hints = `\u203B\u203B \u5718\u968A\u5DF2\u78BA\u8A8D\u904E\u6B64\u7AF6\u54C1\u578B\u865F\u7684\u5C0D\u7167 (\u6700\u9AD8\u6B0A\u5A01\uFF0C\u512A\u5148\u65BC\u4E00\u5207\u5176\u4ED6\u4F86\u6E90)\uFF1A
\u7AF6\u54C1\u300C${competitorModel}\u300D\u2192 AirTAC\u300C${teamCorrection.airtacCode}\u300D${teamCorrection.seriesId ? ` (\u7CFB\u5217 ${teamCorrection.seriesId})` : ""}${teamCorrection.description ? `\uFF0C${teamCorrection.description}` : ""}${teamCorrection.note ? `\u3002\u5099\u8A3B\uFF1A${teamCorrection.note}` : ""}
\u9664\u975E\u4F7F\u7528\u8005\u7684\u81EA\u8A02\u898F\u5247\u53E6\u6709\u6307\u793A\uFF0C\u5426\u5247\u8ACB\u76F4\u63A5\u4EE5\u6B64\u5C0D\u7167\u70BA\u4E3B\u8981\u63A8\u85A6\u3002

${hints}`;
    }
    const companyMatches = matchCompanyTable(competitorModel, brand);
    const companyIds = companyMatchCatalogIds(companyMatches);
    if (companyMatches.length > 0) {
      hints = `\u203B \u4EE5\u4E0B\u70BA\u516C\u53F8\u5167\u90E8\u5C0D\u7167\u8868\u547D\u4E2D\u7D50\u679C\uFF0C\u6B0A\u5A01\u6027\u6700\u9AD8\uFF08\u9AD8\u65BC\u5F8C\u9762\u7684\u696D\u754C\u77E5\u8B58\uFF09:
${companyMatchesText(companyMatches)}

${hints}`;
    }
    if (Array.isArray(learnedRules) && learnedRules.length > 0) {
      const lrText = learnedRulesText(learnedRules);
      if (lrText) hints = `${lrText}
${hints}`;
    }
    const ruleSeriesIds = mentionedSeriesIds(customRules).filter(isValidSeriesId);
    let candidateIds = [];
    for (const id of ruleSeriesIds) if (!candidateIds.includes(id)) candidateIds.push(id);
    if (teamCorrection?.seriesId && isValidSeriesId(teamCorrection.seriesId) && !candidateIds.includes(teamCorrection.seriesId)) candidateIds.push(teamCorrection.seriesId);
    for (const id of companyIds) if (!candidateIds.includes(id)) candidateIds.push(id);
    for (const id of heuristic.candidateIds) {
      if (!candidateIds.includes(id)) candidateIds.push(id);
    }
    let classifierInfo = {};
    if (candidateIds.length < 2 || customRules) {
      try {
        const stage1 = await selectCandidateSeries(competitorModel, brand, candidateIds, hints, customRules);
        for (const id of stage1.ids) {
          if (!candidateIds.includes(id)) candidateIds.push(id);
        }
        classifierInfo = stage1;
      } catch (e) {
        console.error("Stage-1 classifier failed, falling back to heuristics:", e.message || e);
      }
    } else {
      console.log(`Stage-1 skipped: ${candidateIds.length} candidates from knowledge base / company table`);
    }
    candidateIds = candidateIds.slice(0, 15);
    const candidateSeries = getSeriesDetails(candidateIds);
    const candidateJson = JSON.stringify(candidateSeries);
    console.log(`Cross-reference "${competitorModel}": ${candidateIds.length} candidate series [${candidateIds.join(", ")}]`);
    const catalogSection = candidateSeries.length > 0 ? `=== AIRTAC CANDIDATE SERIES (FULL CATALOG DATA) ===
${candidateJson}
===================================================
You may ONLY recommend series whose FULL DATA is provided above. If none of them genuinely fits the competitor product, output "\u7121\u76F4\u63A5\u5C0D\u61C9\u578B\u865F".` : `No candidate series were found in the AirTAC catalog for this model. Here is the compact index of everything AirTAC offers:
${slimIndexJson}
If truly nothing matches, set baseModel to "\u7121\u76F4\u63A5\u5C0D\u61C9\u578B\u865F".`;
    const prompt = `You are a pneumatic components expert and sales assistant strictly for AirTAC (\u4E9E\u5FB7\u5BA2).
A user has provided a competitor's product model or a combination/assembly of models: "${competitorModel}"${brand ? ` from brand "${brand}"` : ""}.

${customRules ? `USER PROVIDED CUSTOM RULES OR KNOWLEDGE \u2014 HIGHEST PRIORITY, OVERRIDES EVERYTHING ELSE (including team corrections, the company table, industry hints, and your own prior beliefs). If the user tells you to use a specific AirTAC series or to change a previous answer, you MUST follow it and pick that series from the candidate data below; do NOT fall back to a previously matched series:
"""
${customRules}
"""

` : ""}${hints ? `INDUSTRY CROSS-REFERENCE KNOWLEDGE (trusted hints):
${hints}

` : ""}${catalogSection}

CRITICAL RULES FOR AIRTAC EQUIVALENTS:
1. NEVER HALLUCINATE AirTAC models. Only recommend series whose full data appears in the candidate series above. If no candidate fits, set "baseModel" to "\u7121\u76F4\u63A5\u5C0D\u61C9\u578B\u865F".
2. MISUMI RULE: MISUMI pneumatic components are often identical to or OEM manufactured by SMC. Find the underlying SMC equivalent first, then map to AirTAC.
3. SPEED CONTROLLER RULE: SMC "AS" series corresponds to AirTAC "PSL" series. NEVER output "JSC" (it is a PISCO product).
4. DECODING TABLES ARE ABSOLUTE: if the knowledge above contains a \u539F\u5EE0\u578B\u9304\u89E3\u78BC\u8868 for the competitor's series, you MUST decode the part number strictly position-by-position according to that table. The table OVERRIDES any of your own prior beliefs about what a suffix means. Do NOT reinterpret a decoded position (e.g. if the table says a digit is voltage, it is voltage \u2014 not port size).
5. UNKNOWN SUFFIX RULE: if a segment of the competitor's part number is NOT covered by a decoding table and you are not confident about its meaning, DO NOT silently guess. List it in the top-level \`uncertainties\` array (e.g. "\u5C3E\u78BC X \u7684\u610F\u7FA9\u7121\u6CD5\u78BA\u8A8D\uFF0CAirTAC \u8A02\u8CFC\u78BC\u672A\u53CD\u6620\u6B64\u9078\u9805\uFF0C\u8ACB\u4EBA\u5DE5\u6838\u5C0D") and pick the most standard AirTAC option, reflecting the doubt in a lower matchPercentage.
6. If the competitor product is an integrated assembly and AirTAC sells the features separately, recommend the combination of separate AirTAC models (one recommendation per part).
7. ORDERING CODE GENERATION: AirTAC ordering codes MUST strictly follow the \`format\` template of the series and use ONLY option codes from that series' \`categories\`. NEVER invent or append extra letters that are not defined option codes. Show your reasoning in \`reasoningForOrderingCode\`.
8. For EVERY recommendation you MUST also return machine-readable fields: "seriesId" = the exact catalog id of the chosen series, and "selectedOptions" = the exact option codes you chose for each category id (use "" for blank codes). The server re-validates these against the catalog, so they must be exact.
9. THOROUGH DISASSEMBLY: break down the competitor's model segment by segment in \`preAnalysis.competitorModelDisassembly\`. When a decoding table exists, every line must come from the table.
10. RIGOROUS MAPPING: establish the exact AirTAC naming rule mapping using ONLY the catalog's categories in \`preAnalysis.airtacRuleMapping\`.
11. matchPercentage must honestly reflect spec coverage: 100 = perfect drop-in replacement; deduct for differences in bore/stroke availability, mounting, thread, electrical specs, dimensions, and for every uncertainty.
12. If the model number is completely unrecognizable, say so explicitly and use "\u7121\u76F4\u63A5\u5C0D\u61C9\u578B\u865F".
13. VALVE FLOW (Cv) RULE: for solenoid/pneumatic/fluid valves, flow capacity is a critical spec. The candidate series data includes a \`specs\` array with \`cv\` (flow coefficient) values. You MUST compare the competitor valve's port size / flow class against the AirTAC candidate's \`cv\` in \`specs\`, prefer the candidate whose Cv is closest, mention the Cv comparison in \`reasoningForOrderingCode\`, and if Cv differs noticeably add it to \`uncertainties\` and lower matchPercentage. Never ignore Cv when matching valves.
14. WIRE/LEAD LENGTH RULE: for lead-wire type valves (e.g. 6SV/7SV series that have a \`leadLength\` category), the ordering code ends with the lead length code. If the competitor specifies a lead/cable length, select the matching \`leadLength\` option; otherwise use the standard (blank/0.5m) and note it. Do not drop the lead length position for series that define it.
15. ADJUSTABLE-STROKE (\u884C\u7A0B\u53EF\u8ABF) RULE: many AirTAC cylinders offer an adjustable-stroke variant. If the competitor cylinder is an adjustable-stroke type \u2014 signalled by a trailing "J", "-J", or wording like \u884C\u7A0B\u53EF\u8ABF/adjustable stroke/stroke adjustable \u2014 you MUST reflect it in the AirTAC ordering code, NEVER silently drop it. Two encodings exist in the catalog, use whichever the chosen series defines: (a) a variant code inside the \u898F\u683C\u4EE3\u865F/series category ending in J (e.g. SC\u2192SCJ, SE\u2192SEJ, SAI\u2192SAIJ, SAU\u2192SAUJ, SG\u2192SGJ, MA\u2192MAJ) \u2014 select that J variant instead of the standard one; (b) a dedicated adjustment/{adjustment} category (e.g. HGS's "J", or the \u8ABF\u6574\u884C\u7A0B mm value, or TCL's adjustment position) \u2014 select the adjustable option there. If the adjustable range (mm) is unknown, still pick the adjustable variant and note the exact range in \`uncertainties\`. Confirm the J/adjustment position actually appears in the generated \`fullOrderingCode\`.

Your task:
1. Identify the competitor's brand(s).
2. Analyze and list the key specifications of the competitor product(s).
3. Complete the pre-analysis (disassembly + AirTAC rule mapping).
4. Recommend the equivalent AirTAC model(s) from the candidate series with matchType (\u76F4\u63A5\u66FF\u63DB, \u76F8\u4F3C\u66FF\u4EE3, or \u7121\u76F4\u63A5\u5C0D\u61C9\u578B\u865F), full ordering code, seriesId + selectedOptions, configurable options with suggestions, and matchPercentage.
5. Provide an overall explanation of the matching strategy and any spec differences the user must verify.

OUTPUT LENGTH: be precise but CONCISE \u2014 each disassembly/mapping line under 40 Chinese characters; reasoningForOrderingCode under 150 characters; configurableOptions "options" field is a short summary, not a full list. Brevity speeds up the response without losing accuracy.

Return JSON matching the schema. ALL text output MUST be accurate Traditional Chinese (\u7E41\u9AD4\u4E2D\u6587).`;
    const response = await generateWithRetry({
      model: MATCH_MODEL(),
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            preAnalysis: {
              type: Type.OBJECT,
              description: "\u5339\u914D\u524D\u7684\u5168\u9762\u5206\u6790\uFF0C\u5305\u542B\u5C0D\u624B\u578B\u865F\u62C6\u89E3\u8207\u4E9E\u5FB7\u5BA2\u578B\u865F\u5C0D\u61C9\u898F\u5247\u5206\u6790",
              properties: {
                competitorModelDisassembly: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "\u5C0D\u7AF6\u722D\u5C0D\u624B\u578B\u865F\u7684\u9010\u5B57/\u9010\u6BB5\u62C6\u89E3\u5206\u6790"
                },
                airtacRuleMapping: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "\u4E9E\u5FB7\u5BA2\u5C0D\u61C9\u578B\u865F\u7684\u9078\u578B\u898F\u5247\u8207\u908F\u8F2F\u63A8\u5C0E"
                }
              },
              required: ["competitorModelDisassembly", "airtacRuleMapping"]
            },
            competitorBrand: { type: Type.STRING, description: "\u7AF6\u722D\u5C0D\u624B\u7684\u54C1\u724C" },
            competitorSpecs: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "\u7AF6\u722D\u5C0D\u624B\u578B\u865F\u7684\u5B8C\u6574\u898F\u683C\u89E3\u6790\uFF0C\u591A\u90E8\u4EF6\u8ACB\u5206\u5225\u5217\u51FA"
            },
            airtacRecommendations: {
              type: Type.ARRAY,
              description: "\u4E9E\u5FB7\u5BA2(AirTAC)\u5C0D\u61C9\u5EFA\u8B70\u578B\u865F\u8207\u914D\u4EF6\u6E05\u55AE",
              items: {
                type: Type.OBJECT,
                properties: {
                  baseModel: { type: Type.STRING, description: "\u4E9E\u5FB7\u5BA2\u57FA\u790E\u578B\u865F\u6216\u7CFB\u5217 (\u5982: 4V\u7CFB\u5217, PL\u7CFB\u5217)\uFF0C\u82E5\u7121\u76F4\u63A5\u5C0D\u61C9\u8ACB\u586B'\u7121\u76F4\u63A5\u5C0D\u61C9\u578B\u865F'" },
                  seriesId: { type: Type.STRING, description: "\u6240\u9078\u7CFB\u5217\u5728\u578B\u9304\u8CC7\u6599\u4E2D\u7684\u7CBE\u78BA id (\u5982: acq, 4V200, Fittings-PL)\u3002\u7121\u5C0D\u61C9\u6642\u586B\u7A7A\u5B57\u4E32" },
                  reasoningForOrderingCode: { type: Type.STRING, description: "\u9010\u6B65\u63A8\u6F14\u5982\u4F55\u5F9E\u7AF6\u722D\u5C0D\u624B\u898F\u683C\u63A8\u5C0E\u51FA\u4E9E\u5FB7\u5BA2\u7684\u5B8C\u6574\u8A02\u8CFC\u78BC\uFF0C\u5217\u51FA\u5404\u9805\u53C3\u6578\u5982\u4F55\u5C0D\u61C9" },
                  fullOrderingCode: { type: Type.STRING, description: "\u5B8C\u6574\u7684\u8A02\u8CFC\u78BC (\u4F8B\u5982: 4V210-08, PL601)" },
                  description: { type: Type.STRING, description: "\u7522\u54C1\u985E\u578B\u63CF\u8FF0 (\u5982: \u96D9\u4F5C\u7528\u6C23\u7F38, L\u578B\u63A5\u982D)" },
                  matchType: { type: Type.STRING, description: "\u5C0D\u61C9\u7A2E\u985E", enum: ["\u76F4\u63A5\u66FF\u63DB", "\u76F8\u4F3C\u66FF\u4EE3", "\u7121\u76F4\u63A5\u5C0D\u61C9\u578B\u865F", "\u7121\u5C0D\u61C9\u578B\u865F"] },
                  matchPercentage: { type: Type.NUMBER, description: "\u5339\u914D\u7A0B\u5EA6\u767E\u5206\u6BD4 (0-100)" },
                  selectedOptions: {
                    type: Type.ARRAY,
                    description: "\u6B64\u63A8\u85A6\u6240\u9078\u7684\u578B\u9304\u9078\u9805 (\u6A5F\u5668\u53EF\u9A57\u8B49)\u3002categoryId \u8207 code \u5FC5\u9808\u8207\u5019\u9078\u7CFB\u5217\u578B\u9304\u8CC7\u6599\u5B8C\u5168\u4E00\u81F4",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        categoryId: { type: Type.STRING, description: "\u578B\u9304\u4E2D categories[].id" },
                        code: { type: Type.STRING, description: "\u6240\u9078 options[].code\uFF0C\u7A7A\u767D\u4EE3\u78BC\u7528\u7A7A\u5B57\u4E32" }
                      },
                      required: ["categoryId", "code"]
                    }
                  },
                  configurableOptions: {
                    type: Type.ARRAY,
                    description: "\u8A72\u578B\u865F\u9700\u8981\u4F7F\u7528\u8005\u6311\u9078\u7684\u7D30\u90E8\u898F\u683C\u8207\u53C3\u6578",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        parameter: { type: Type.STRING, description: "\u53C3\u6578\u540D\u7A31 (\u4F8B\u5982: \u7F38\u5F91, \u884C\u7A0B, \u63A5\u7BA1\u53E3\u5F91, \u96FB\u58D3)" },
                        options: { type: Type.STRING, description: "\u8A72\u578B\u865F\u53EF\u9078\u7684\u7BC4\u570D\u6216\u8AAA\u660E" },
                        suggestion: { type: Type.STRING, description: "\u6839\u64DA\u5C0D\u624B\u898F\u683C\u7D66\u4E88\u7684\u76F4\u63A5\u6311\u9078\u5EFA\u8B70" }
                      },
                      required: ["parameter", "options", "suggestion"]
                    }
                  }
                },
                required: ["baseModel", "seriesId", "reasoningForOrderingCode", "fullOrderingCode", "description", "matchType", "matchPercentage", "selectedOptions", "configurableOptions"]
              }
            },
            explanation: { type: Type.STRING, description: "\u6574\u9AD4\u642D\u914D\u8AAA\u660E\u3001\u6CE8\u610F\u4E8B\u9805\u6216\u7D44\u5408\u5EFA\u8B70" },
            uncertainties: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "\u7121\u6CD5\u5F9E\u5C0D\u624B\u578B\u865F\u78BA\u5B9A\u3001\u9700\u8981\u4EBA\u5DE5\u6838\u5C0D\u7684\u4E8B\u9805\u6E05\u55AE (\u6C92\u6709\u5C31\u56DE\u50B3\u7A7A\u9663\u5217)"
            }
          },
          required: ["preAnalysis", "competitorBrand", "competitorSpecs", "airtacRecommendations", "explanation", "uncertainties"]
        }
      }
    });
    if (!response || !response.text) {
      throw new Error("No response from AI");
    }
    const result = JSON.parse(response.text);
    if (Array.isArray(result.airtacRecommendations)) {
      for (const rec of result.airtacRecommendations) {
        rec.validation = validateRecommendation(rec);
      }
    }
    result.candidateSeries = candidateSeries.map((s) => ({
      id: s.id,
      code: s.code || void 0,
      name: s.name,
      group: s.group
    }));
    if (classifierInfo.productType) {
      result.productType = classifierInfo.productType;
    }
    if (teamCorrection && teamCorrection.airtacCode && !customRules) {
      result.teamCorrection = {
        airtacCode: teamCorrection.airtacCode,
        confirmedAt: teamCorrection.updatedAt || teamCorrection.confirmedAt
      };
      const norm = (s) => String(s || "").replace(/[\s\-–—]+/g, "").toUpperCase();
      const recs = Array.isArray(result.airtacRecommendations) ? result.airtacRecommendations : result.airtacRecommendations = [];
      const already = recs.find((r) => norm(r.fullOrderingCode) === norm(teamCorrection.airtacCode) || norm(r.baseModel) === norm(teamCorrection.airtacCode));
      if (already) {
        already.matchType = "\u76F4\u63A5\u66FF\u63DB";
        already.matchPercentage = 100;
        already.fromTeamCorrection = true;
        recs.splice(recs.indexOf(already), 1);
        recs.unshift(already);
      } else {
        recs.unshift({
          baseModel: teamCorrection.seriesId || teamCorrection.airtacCode,
          seriesId: teamCorrection.seriesId || "",
          fullOrderingCode: teamCorrection.airtacCode,
          description: teamCorrection.description || "\u5718\u968A\u78BA\u8A8D\u7684\u5C0D\u7167\u578B\u865F",
          matchType: "\u76F4\u63A5\u66FF\u63DB",
          matchPercentage: 100,
          reasoningForOrderingCode: `\u6B64\u5C0D\u7167\u7531\u5718\u968A\u4EBA\u5DE5\u78BA\u8A8D\u904E${teamCorrection.note ? `\uFF08\u5099\u8A3B\uFF1A${teamCorrection.note}\uFF09` : ""}\uFF0C\u5DF2\u4F5C\u70BA\u6B0A\u5A01\u7B54\u6848\u512A\u5148\u63A1\u7528\u3002`,
          selectedOptions: [],
          configurableOptions: [],
          fromTeamCorrection: true,
          validation: { catalogVerified: true, seriesFound: true, warnings: [] }
        });
      }
    }
    const finalText = JSON.stringify(result);
    cache.set(cacheKey, finalText);
    if (cache.size > 500) {
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }
    return { status: 200, body: result };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    let errorMessage = error.message || "\u672A\u77E5\u932F\u8AA4";
    try {
      const errStr = String(errorMessage).toLowerCase();
      if (errStr.includes("api key not valid") || errStr.includes("api_key_invalid")) {
        errorMessage = "Gemini API Key \u7121\u6548\u3002\u8ACB\u6AA2\u67E5\u90E8\u7F72\u5E73\u53F0\u7684\u74B0\u5883\u8B8A\u6578\u662F\u5426\u5DF2\u6B63\u78BA\u8A2D\u5B9A GEMINI_API_KEY\u3002";
      } else if (!process.env.GEMINI_API_KEY) {
        errorMessage = "\u4F3A\u670D\u5668\u5C1A\u672A\u8A2D\u5B9A GEMINI_API_KEY \u74B0\u5883\u8B8A\u6578\u3002\u8ACB\u5728\u90E8\u7F72\u5E73\u53F0 (AI Studio Secrets \u6216 Vercel \u5C08\u6848\u8A2D\u5B9A) \u52A0\u5165\u5F8C\u91CD\u65B0\u90E8\u7F72\u3002";
      } else if (error.status === 429 || errStr.includes("429") || errStr.includes("quota")) {
        errorMessage = "\u60A8\u7684 Gemini API \u514D\u8CBB\u984D\u5EA6\u5DF2\u8017\u76E1 (Quota Exceeded)\u3002\u8ACB\u6AA2\u67E5\u60A8\u7684 API Key \u984D\u5EA6\uFF0C\u6216\u5347\u7D1A\u8A08\u8CBB\u65B9\u6848\u3002";
      } else if (error.status === 503 || errStr.includes("503") || errStr.includes("high demand") || errStr.includes("unavailable")) {
        errorMessage = "\u76EE\u524D AI \u4F3A\u670D\u5668\u8655\u65BC\u9AD8\u8CA0\u8F09\u72C0\u614B (503 High Demand)\u3002\u8ACB\u7A0D\u5019\u518D\u8A66\u3002";
      }
    } catch (e) {
    }
    return { status: 500, body: { error: errorMessage } };
  }
}

// src/server/vercelHandlers/cross-reference.ts
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
  const { status, body: result } = await crossReference(body || {});
  return res.status(status).json(result);
}
export {
  handler as default
};
