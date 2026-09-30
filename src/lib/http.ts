/**
 * 前端呼叫自家 API 的共用 fetch：
 * - 自動帶上團隊存取碼 (x-access-token)，存在這台瀏覽器的 localStorage
 * - 伺服器回 401 needToken → 跳出輸入框請使用者輸入一次，存起來後自動重送
 * 伺服器未設定 ACCESS_TOKEN 時，這一切都不會發生 (與舊版行為相同)。
 */
const TOKEN_KEY = 'airtac_access_token';

export function getAccessToken(): string {
  try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; }
}
export function setAccessToken(token: string) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch (e) { /* ignore */ }
}

// 同時多個請求被拒時只跳一次輸入框 (批量分析 / 批次匯入)
let pendingPrompt: Promise<string> | null = null;
function askForToken(retry: boolean): Promise<string> {
  if (!pendingPrompt) {
    pendingPrompt = new Promise<string>(resolve => {
      // 讓目前的事件循環先完成，避免在 render 中跳出對話框
      setTimeout(() => {
        const msg = retry
          ? '團隊存取碼不正確，請重新輸入：'
          : '此系統已啟用團隊存取碼保護，請輸入存取碼（向管理者索取，輸入一次後這台電腦會記住）：';
        const v = (window.prompt(msg) || '').trim();
        if (v) setAccessToken(v);
        resolve(v);
        pendingPrompt = null;
      }, 0);
    });
  }
  return pendingPrompt;
}

export async function apiFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const withToken = (token: string): RequestInit => {
    const headers = new Headers(init.headers || {});
    if (token) headers.set('x-access-token', token);
    return { ...init, headers };
  };

  let token = getAccessToken();
  let resp = await fetch(input, withToken(token));
  // 最多重試兩次 (第一次沒存過存取碼 / 存的存取碼已失效)
  for (let attempt = 0; attempt < 2 && resp.status === 401; attempt++) {
    const body = await resp.clone().json().catch(() => ({}));
    if (!body?.needToken) break;
    // 並行的其他請求可能剛讓使用者輸入過新存取碼 → 直接用它重送，不要再跳一次輸入框
    const stored = getAccessToken();
    const next = stored && stored !== token ? stored : await askForToken(Boolean(token));
    if (!next) break;
    token = next;
    resp = await fetch(input, withToken(token));
  }
  return resp;
}
