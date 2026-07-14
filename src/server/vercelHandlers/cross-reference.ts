/**
 * Vercel Serverless Function 版的交叉比對 API (原始碼)。
 *
 * 注意：Vercel 實際部署的是 api/cross-reference.js —— 由
 * `npm run build:api` 用 esbuild 把這個檔案連同所有依賴
 * (匹配邏輯 + 型錄 JSON) bundle 成單一自足檔案。
 * 改完這裡的程式碼後務必重跑 build:api 並把 api/*.js 一起 commit。
 *
 * 部署需求：在 Vercel 專案的 Settings → Environment Variables 加入
 * GEMINI_API_KEY，否則會回傳「尚未設定 GEMINI_API_KEY」的錯誤。
 */
import { crossReference } from "../crossReferenceService";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed，請使用 POST" });
  }

  // Vercel 已自動解析 JSON body；若 Content-Type 不對則可能是字串
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: "無法解析請求內容 (需要 JSON)" });
    }
  }

  const { status, body: result } = await crossReference(body || {});
  return res.status(status).json(result);
}
