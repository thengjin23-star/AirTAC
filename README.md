<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/f37d7481-3979-43d2-a6ff-1be1f7b596ef

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 團隊雲端共用（重要）

「確認清單、對手知識庫、自我學習修正」預設只存在**各自瀏覽器的 localStorage**，
同事之間**不會互通**。要讓全公司共用同一份資料、跨裝置同步，必須掛上一個共用後端：

1. 在 **Vercel** 打開本專案 → **Storage** → **Create Database** → 選 **Upstash for Redis**（有免費方案）→ 建立並 **Connect** 到本專案。
2. Vercel 會自動注入 `KV_REST_API_URL` 與 `KV_REST_API_TOKEN`（Upstash 原生的 `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` 亦支援）。
3. 到 **Deployments** 對最新版按 **Redeploy** 讓環境變數生效。
4. 打開網頁，頂端橫幅會由琥珀色「本機模式」變成綠色「團隊雲端共用運作正常」即代表成功。

沒設定時 app 仍可正常使用，只是每個人各自存本機。頁面頂端的**雲端狀態橫幅**會即時顯示目前是共用還是本機，並提供「重新檢查」與設定步驟。
本機開發若想測試共用功能，可在 `.env.local` 設 `LOCAL_MEMORY_STORE=1`（單一程序記憶體後端）。
