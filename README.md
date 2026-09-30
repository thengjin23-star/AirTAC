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

## 團隊存取碼（選填，強烈建議）

網站部署在公開網址，任何拿到網址的人都能使用 AI 分析（耗用 Gemini 額度），甚至清空團隊資料庫。
在 Vercel → Settings → Environment Variables 新增 `ACCESS_TOKEN`（任意一串只有同事知道的字），Redeploy 後：

- AI 分析、學習型錄、確認清單 / 參考資料庫 / 知識庫的讀寫都需要存取碼
- 同事第一次操作時會跳出輸入框，輸入一次後該瀏覽器會記住
- 不設定則維持開放（與舊版相同）

## 匹配準確率評測（回歸測試）

`eval/cases.json` 收錄 48 個真實競品型號與正確答案（依公司對照表），修改匹配邏輯、知識庫或型錄後可跑：

```bash
npx tsx scripts/eval-matching.ts            # 全部 (需 .env.local 的 GEMINI_API_KEY，約 60 次 Gemini 呼叫)
npx tsx scripts/eval-matching.ts SY         # 只跑型號含 SY 的案例
```

會輸出「系列正確 / 系列+參數正確 / 型錄驗證通過」比例。發現 AI 對錯的型號時，把它與正確答案加進 `cases.json`，之後每次修改都能確認沒有退步。
