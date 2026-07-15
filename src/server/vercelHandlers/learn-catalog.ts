/**
 * Vercel Serverless Function: 學習對手型錄 (原始碼，實際部署 api/learn-catalog.js)。
 * 修改後執行 npm run build:api 重新產生 bundle。
 */
import { learnCatalog } from "../learnCatalogService";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed，請使用 POST" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: "無法解析請求內容 (需要 JSON)" });
    }
  }

  const { status, body: result } = await learnCatalog(body || {});
  return res.status(status).json(result);
}
