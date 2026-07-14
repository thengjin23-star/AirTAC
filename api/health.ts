/**
 * 部署診斷端點：用瀏覽器直接開 /api/health 即可確認
 * (1) Serverless Function 是否能正常執行
 * (2) Node 版本
 * (3) GEMINI_API_KEY 環境變數是否已設定 (不會洩漏 key 內容)
 * (4) 型錄資料是否成功載入
 */
export default async function handler(req: any, res: any) {
  let catalogSeriesCount = -1;
  let catalogError: string | null = null;
  try {
    const { defaultCatalog } = await import("../src/data/index");
    catalogSeriesCount = defaultCatalog.length;
  } catch (e: any) {
    catalogError = String(e && e.message ? e.message : e);
  }

  res.status(200).json({
    ok: true,
    node: process.version,
    hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY),
    catalogSeriesCount,
    catalogError,
    time: new Date().toISOString(),
  });
}
