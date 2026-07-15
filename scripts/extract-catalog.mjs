/**
 * 用 Gemini Files API 從 AirTAC 原廠型錄 PDF 抽取結構化的系列資料，
 * 輸出符合 app catalog JSON schema 的檔案。
 * 用法: node extract-catalog.mjs <pdf路徑> <輸出.json> <superGroup提示>
 */
import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync } from 'fs';

const [, , pdfPath, outPath, superGroupHint] = process.argv;
const apiKey = readFileSync('/home/user/AirTAC/.env.local', 'utf8').match(/GEMINI_API_KEY=(.+)/)[1].trim();
const ai = new GoogleGenAI({ apiKey });

console.log('上傳:', pdfPath);
let file = await ai.files.upload({ file: pdfPath, config: { mimeType: 'application/pdf' } });
while (file.state === 'PROCESSING') {
  await new Promise(r => setTimeout(r, 3000));
  file = await ai.files.get({ name: file.name });
}
if (file.state !== 'ACTIVE') throw new Error('File state: ' + file.state);
console.log('上傳完成:', file.uri);

const prompt = `你是氣動元件型錄資料工程師。這份 PDF 是 AirTAC (亞德客) 原廠「輔助元件」型錄的一部分${superGroupHint ? `，主要內容為「${superGroupHint}」` : ''}。

任務：把型錄中【每一個有「成品訂購碼」說明的系列】完整轉成 JSON 陣列，schema 如下 (與範例完全一致的結構)：

[
 {
  "id": "PA-Tube",                    // 唯一識別字串，用系列代號，英數與連字號
  "category": "輔助元件",              // 固定值
  "superGroup": "尼龍管",              // 產品大類 (型錄頁首「輔助元件——XXX」的 XXX)
  "group": "PA12、PA6系列",            // 系列群組名 (型錄的「XX系列」標題)
  "code": "PA",                        // 訂購碼開頭的固定代號；若 format 中已含 {spec} 等可變開頭則填空字串
  "name": "PA12、PA6系列 尼龍管",       // 系列完整名稱
  "format": "{spec}{od}{id_}{length}{color}",  // 訂購碼格式模板，每個可變段用 {參數id}，固定字元直接寫
  "categories": [                      // 依訂購碼順序列出每個參數
   {
    "id": "spec",                      // 英文小寫參數 id，需與 format 中的佔位符一致
    "name": "規格代號",                 // 型錄上的參數名稱
    "options": [
     { "code": "PA6", "description": "尼龍6" },
     { "code": "PA12", "description": "尼龍12" }
    ]
   }
  ],
  "workingPressureRange": "PA6: 2.0~3.5MPa / PA12: 1.5~2.5MPa (23°C，依管徑)",  // 若型錄有提供
  "note": "顏色中藍、黑、橙為標準色",     // 型錄上的重要備註
  "sourceFile": "輔助元件型錄 P.255"     // 型錄頁碼
 }
]

嚴格規則：
1. 只轉「成品訂購碼」的結構；尺寸圖、外部規格表(逐型號尺寸重量表)不要轉。
2. options 的 code 必須與型錄印刷完全一致 (含大小寫)；「空白/無記號」選項的 code 用空字串 ""，description 說明其意義。
3. format 模板要能重組出範例訂購碼：把型錄範例 (如 PA12 060 040 100M BU) 逐段對應到 {參數}。段與段之間若型錄示意是直接相連就不要加空格；若有 "-" 就寫進 format。
4. 每個訂購碼參數都要有自己的 category，一個都不能漏 (含顏色、長度、牙型、材質等)。
5. 同一頁若有多個獨立訂購碼 (如 氣管剪 AQC、氣槍 AG)，各自建一個系列條目。
6. 不要發明型錄上沒有的選項；表格印不清楚就在 note 註明。
7. id 不可重複；不銹鋼版本系列 id 加 "-S" 尾碼 (如 "PC-S")。
8. 所有中文用繁體。
9. 只輸出 JSON 陣列，不要其他文字。`;

const model = process.env.EXTRACT_MODEL || 'gemini-2.5-flash';
console.log('解析模型:', model);
const resp = await ai.models.generateContent({
  model,
  contents: [{ role: 'user', parts: [{ fileData: { fileUri: file.uri, mimeType: 'application/pdf' } }, { text: prompt }] }],
  config: { responseMimeType: 'application/json', maxOutputTokens: 65536, temperature: 0 },
});

const text = resp.text;
const data = JSON.parse(text);
if (!Array.isArray(data)) throw new Error('回傳不是陣列');
writeFileSync(outPath, JSON.stringify(data, null, 1));
console.log(`✓ ${outPath}: ${data.length} 個系列 —`, data.map(s => s.id).join(', '));
