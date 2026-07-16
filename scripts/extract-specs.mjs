/**
 * 從閥類型錄 PDF 專門抽取「規格表」的 Cv/流量等數據 (不動訂購碼結構)。
 * 用法: node scripts/extract-specs.mjs <pdf> <out.json> [hint]
 * 產出: [{ series: "2V", specs: [{model, port, cv, orifice, workingPressure, weightG}] }]
 * 之後由 merge-specs 把 specs 併進 catalog 對應系列。
 */
import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync } from 'fs';

const [, , pdfPath, outPath, hint] = process.argv;
const apiKey = readFileSync('/home/user/AirTAC/.env.local', 'utf8').match(/GEMINI_API_KEY=(.+)/)[1].trim();
const ai = new GoogleGenAI({ apiKey });

console.log('上傳:', pdfPath);
let file = await ai.files.upload({ file: pdfPath, config: { mimeType: 'application/pdf' } });
while (file.state === 'PROCESSING') { await new Promise(r => setTimeout(r, 3000)); file = await ai.files.get({ name: file.name }); }
if (file.state !== 'ACTIVE') throw new Error('File state: ' + file.state);

const prompt = `你是氣動閥類型錄資料工程師。這份 PDF 是 AirTAC 閥類型錄${hint ? ` (${hint})` : ''}。

任務: 只擷取每個系列的「規格表」中與流量/Cv 有關的技術數據 (不要訂購碼結構、不要尺寸圖)。

輸出 JSON 陣列，每個系列一筆:
[
 {
  "series": "2V",                     // 系列代號 (與訂購碼系列一致，如 2V/2P/2J/2SA/3A200/4A200)
  "specs": [                          // 規格表逐列 (通常一列一個口徑/型號)
   {
    "model": "2V025-06",              // 該列的代表型號
    "port": "1/8\"",                  // 接管口徑
    "orifice": "6mm",                 // 孔徑(口徑) 若有
    "cv": "0.42",                     // 流量係數 Cv (最重要!!) 若型錄用其他流量單位(如有效截面積S mm²、Kv、C值)也一併抓,放在對應欄位
    "flowS": "",                      // 有效截面積 S (mm²) 若有
    "workingPressure": "0.15~0.8MPa", // 使用壓力範圍 若有
    "weightG": "120"                  // 重量(g) 若有
   }
  ]
 }
]

規則:
1. 只要有 Cv 或流量相關數據的系列才輸出;沒有規格表的系列跳過。
2. cv 值務必精準抄錄型錄數字 (可為範圍如 "0.2~0.25")。若型錄標的是「有效截面積 S」或「Kv」而非 Cv,填到 flowS 或另建欄位,cv 留空。
3. series 代號要能對應訂購碼系列 (如型錄寫 4A210/4A220 則 series 用 "4A200"; 2V025/2V130 則 series 用 "2V"；3A210 則 "3A200")。同一系列的多個口徑列全部收進同一 specs 陣列。
4. 不要發明數據;型錄沒有的欄位留空字串。
5. 只輸出 JSON 陣列。`;

const resp = await ai.models.generateContent({
  model: process.env.EXTRACT_MODEL || 'gemini-3.1-flash-lite',
  contents: [{ role: 'user', parts: [{ fileData: { fileUri: file.uri, mimeType: 'application/pdf' } }, { text: prompt }] }],
  config: { responseMimeType: 'application/json', maxOutputTokens: 65536, temperature: 0 },
});

const data = JSON.parse(resp.text);
writeFileSync(outPath, JSON.stringify(data, null, 1));
console.log(`✓ ${outPath}: ${data.length} 系列 —`, data.map(s => `${s.series}(${s.specs?.length || 0})`).join(', '));
