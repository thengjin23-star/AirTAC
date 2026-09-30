/**
 * 選用的「團隊存取碼」保護。
 *
 * 網站部署在公開網址上，若不設防，任何人拿到網址都能：
 *   - 清空團隊的確認清單 / 參考資料庫 (DELETE /api/store?clear=true)
 *   - 大量呼叫 AI 分析，耗光 Gemini 額度
 *
 * 在部署平台設定環境變數 ACCESS_TOKEN (任意字串，例如公司內部密語) 後，
 * 上述 API 都必須帶 `x-access-token` 標頭才能使用；前端第一次會跳出輸入框，
 * 輸入一次後記在該瀏覽器。未設定 ACCESS_TOKEN 則維持全開放 (與舊版相容)。
 */
import crypto from "crypto";

export function accessRequired(): boolean {
  return Boolean(process.env.ACCESS_TOKEN);
}

function headerValue(headers: any, name: string): string | undefined {
  if (!headers) return undefined;
  const v = typeof headers.get === "function" ? headers.get(name) : headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(v) ? v[0] : v;
}

/** 常數時間比對 (先雜湊成等長再比)，避免以回應時間猜測存取碼。 */
function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function checkAccess(headers: any): boolean {
  const expected = process.env.ACCESS_TOKEN;
  if (!expected) return true;
  const got = headerValue(headers, "x-access-token");
  return typeof got === "string" && got.length > 0 && safeEqual(got, expected);
}

export const ACCESS_DENIED = {
  status: 401,
  body: { error: "需要團隊存取碼才能使用 (請向管理者索取)", needToken: true },
};
