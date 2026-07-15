/**
 * 「學習對手型錄」服務：使用者上傳競品型錄的訂購碼說明頁 (圖片或文字)，
 * 由 Gemini 解析出該系列的「逐位解碼表」，回傳給前端存進使用者知識庫
 * (localStorage)。之後分析同系列型號時，前端會自動把解碼表帶上，
 * 匹配準確率等同於內建知識庫。
 */
import { Type } from "@google/genai";
import { generateWithRetry } from "./crossReferenceService";

export interface LearnCatalogOutcome {
  status: number;
  body: any;
}

const MAX_IMAGE_BYTES = 3.5 * 1024 * 1024; // Vercel request 上限 4.5MB，留安全空間

export async function learnCatalog(reqBody: any): Promise<LearnCatalogOutcome> {
  try {
    const { brand, seriesHint, text, image } = reqBody || {};

    if (!text && !(image && image.data)) {
      return { status: 400, body: { error: "請提供型錄頁的文字內容或圖片" } };
    }
    if (image?.data && image.data.length > MAX_IMAGE_BYTES * 1.4) {
      return { status: 400, body: { error: "圖片太大 (超過約 3.5MB)，請裁切到訂購碼說明的區域或壓縮後再上傳" } };
    }

    const prompt = `You are a pneumatic/automation components catalog analyst.
The user provides a page from a competitor's product catalog${brand ? ` (brand: ${brand})` : ''}${seriesHint ? ` (series: ${seriesHint})` : ''} that explains the ORDERING CODE structure (型號表示方法 / 訂購碼說明) of a product series.

Your task: extract a complete, position-by-position DECODING TABLE of the ordering code, so that any part number of this series can later be decoded exactly.

Requirements for the "decode" field (Traditional Chinese):
1. State the overall code format first (e.g. "SY[系列][機能]20-[電壓][接線]...").
2. Then list EVERY position/segment with ALL its option codes and meanings, exactly as printed in the catalog. Include voltage codes, port sizes, thread types, wiring, options, etc.
3. Do NOT guess or add options that are not visible in the provided content. If part of the table is cut off or unreadable, add a line "（注意: ...段落型錄中未提供/看不清楚）".
4. If the page shows a worked example part number, include it at the end as 範例.

Also provide:
- "brand": the competitor brand name
- "seriesName": the series name (e.g. "SY3000/5000/7000 電磁閥")
- "pattern": the part-number prefix(es) this table applies to, comma-separated, uppercase (e.g. "SY3,SY5,SY7,SY9" or "CQ2,CDQ2"). These are used to auto-apply this table when a part number starts with them.
- "productType": short Traditional Chinese description of what this product is (e.g. "五口電磁閥").

${text ? `CATALOG TEXT PROVIDED BY USER:\n"""\n${String(text).slice(0, 20000)}\n"""\n` : 'The catalog page is provided as an image.'}
Respond in JSON. All descriptive text in Traditional Chinese.`;

    const parts: any[] = [{ text: prompt }];
    if (image?.data) {
      parts.push({
        inlineData: {
          data: image.data,
          mimeType: image.mimeType || 'image/png',
        },
      });
    }

    const response = await generateWithRetry({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: [{ role: 'user', parts }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brand: { type: Type.STRING, description: "競品品牌" },
            seriesName: { type: Type.STRING, description: "系列名稱" },
            pattern: { type: Type.STRING, description: "適用的型號字首，逗號分隔、大寫 (如 SY3,SY5,SY7)" },
            productType: { type: Type.STRING, description: "產品種類簡述 (繁體中文)" },
            decode: { type: Type.STRING, description: "完整的逐位解碼表 (繁體中文)" }
          },
          required: ["brand", "seriesName", "pattern", "productType", "decode"]
        }
      }
    });

    if (!response || !response.text) {
      throw new Error("No response from AI");
    }

    return { status: 200, body: JSON.parse(response.text) };
  } catch (error: any) {
    console.error("Error in learnCatalog:", error);
    let errorMessage = error.message || "未知錯誤";
    const errStr = String(errorMessage).toLowerCase();
    if (errStr.includes("api key not valid") || errStr.includes("api_key_invalid")) {
      errorMessage = "Gemini API Key 無效。請檢查部署平台的環境變數設定。";
    } else if (error.status === 429 || errStr.includes("429") || errStr.includes("quota")) {
      errorMessage = "Gemini API 額度已耗盡，請稍後再試。";
    } else if (error.status === 503 || errStr.includes("503") || errStr.includes("unavailable")) {
      errorMessage = "AI 伺服器高負載中，請稍候再試。";
    }
    return { status: 500, body: { error: errorMessage } };
  }
}
