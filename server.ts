import { config as dotenvConfig } from "dotenv";
// 本地開發時從 .env.local / .env 讀取 GEMINI_API_KEY (AI Studio 部署時由平台自動注入)
dotenvConfig({ path: [".env.local", ".env"], quiet: true });

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { crossReference } from "./src/server/crossReferenceService";
import { learnCatalog } from "./src/server/learnCatalogService";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 型錄學習支援上傳圖片 (base64)，放寬 body 限制
  app.use(express.json({ limit: "8mb" }));

  // API route for cross-referencing (核心邏輯在 crossReferenceService，與 Vercel Function 共用)
  app.post("/api/cross-reference", async (req, res) => {
    const { status, body } = await crossReference(req.body);
    res.status(status).json(body);
  });

  // 學習對手型錄：解析訂購碼說明頁 → 回傳逐位解碼表
  app.post("/api/learn-catalog", async (req, res) => {
    const { status, body } = await learnCatalog(req.body);
    res.status(status).json(body);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Note: use path.resolve for absolute path
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Express global error:", err);
    res.status(500).json({ error: "內部伺服器錯誤 (Internal Server Error)" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
