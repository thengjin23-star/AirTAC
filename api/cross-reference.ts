/**
 * Vercel Serverless Function 版的交叉比對 API。
 *
 * Vercel 不會執行 server.ts 的 Express 伺服器，因此把 /api/cross-reference
 * 以檔案路由的形式提供。核心邏輯與 Express 版共用 crossReferenceService。
 *
 * 部署需求：在 Vercel 專案的 Settings → Environment Variables 加入
 * GEMINI_API_KEY，否則會回傳「尚未設定 GEMINI_API_KEY」的錯誤。
 */
import { crossReference } from "../src/server/crossReferenceService";

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
