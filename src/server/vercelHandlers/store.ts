/**
 * Vercel Serverless Function: 團隊共用儲存 (原始碼，實際部署 api/store.js)。
 * 修改後執行 npm run build:api 重新產生 bundle。
 */
import { handleStore } from '../storeService';

export default async function handler(req: any, res: any) {
  const url = new URL(req.url, 'http://localhost');
  const query: any = Object.fromEntries(url.searchParams.entries());
  const { status, body } = await handleStore(req.method || 'GET', query, req.body);
  return res.status(status).json(body);
}
