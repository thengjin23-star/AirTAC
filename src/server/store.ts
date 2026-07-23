/**
 * 團隊共用雲端儲存 (漸進增強)。
 *
 * 後端優先序：
 *   1. Upstash Redis REST (Vercel KV) — 若 env 有 KV_REST_API_URL/TOKEN
 *      或 UPSTASH_REDIS_REST_URL/TOKEN → 全公司共用
 *   2. 本機記憶體 (LOCAL_MEMORY_STORE=1) — 供本機開發/測試,單一程序內有效
 *   3. 皆無 → isConfigured()=false,前端自動退回 localStorage (app 照常運作)
 *
 * 三種資料都以 Redis HASH 儲存 (field 為 id/型號,方便逐筆增刪)：
 *   airtac:confirmed   (field=item.id)        團隊確認清單
 *   airtac:rules       (field=rule.id)        團隊對手型錄知識庫
 *   airtac:corrections (field=正規化競品型號)  自我學習修正紀錄
 */

export type StoreKind = 'confirmed' | 'rules' | 'corrections';
const KEYS: Record<StoreKind, string> = {
  confirmed: 'airtac:confirmed',
  rules: 'airtac:rules',
  corrections: 'airtac:corrections',
};

// 延遲讀取 env (避免 ESM import 提升導致早於 dotenv 載入)
function redisUrl() { return process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || ''; }
function redisToken() { return process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ''; }
function useRedis() { return Boolean(redisUrl() && redisToken()); }
function useMemory() { return !useRedis() && process.env.LOCAL_MEMORY_STORE === '1'; }

/** 本機記憶體後端 (dev/測試用) */
const memory: Record<StoreKind, Map<string, any>> = {
  confirmed: new Map(),
  rules: new Map(),
  corrections: new Map(),
};

export function storeBackend(): 'redis' | 'memory' | 'none' {
  return useRedis() ? 'redis' : useMemory() ? 'memory' : 'none';
}
export function isConfigured(): boolean {
  return useRedis() || useMemory();
}

/** 對 Upstash REST 送一個命令陣列, 回傳 result。 */
async function redis(cmd: (string | number)[]): Promise<any> {
  const resp = await fetch(redisUrl(), {
    method: 'POST',
    headers: { Authorization: `Bearer ${redisToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!resp.ok) throw new Error(`Redis ${cmd[0]} 失敗: ${resp.status} ${await resp.text().catch(() => '')}`);
  const data = await resp.json();
  if (data.error) throw new Error(`Redis ${cmd[0]}: ${data.error}`);
  return data.result;
}

/** 讀取某類全部資料 (陣列)。 */
export async function listAll(kind: StoreKind): Promise<any[]> {
  if (useRedis()) {
    const flat: string[] = (await redis(['HGETALL', KEYS[kind]])) || [];
    const out: any[] = [];
    for (let i = 1; i < flat.length; i += 2) {
      try { out.push(JSON.parse(flat[i])); } catch (e) { /* skip bad */ }
    }
    return out;
  }
  if (useMemory()) return Array.from(memory[kind].values());
  return [];
}

/** 新增/更新一筆 (以 field 為鍵)。 */
export async function put(kind: StoreKind, field: string, value: any): Promise<void> {
  if (useRedis()) { await redis(['HSET', KEYS[kind], field, JSON.stringify(value)]); return; }
  if (useMemory()) { memory[kind].set(field, value); return; }
}

/** 刪除一筆。 */
export async function remove(kind: StoreKind, field: string): Promise<void> {
  if (useRedis()) { await redis(['HDEL', KEYS[kind], field]); return; }
  if (useMemory()) { memory[kind].delete(field); return; }
}

/** 清空某類。 */
export async function clear(kind: StoreKind): Promise<void> {
  if (useRedis()) { await redis(['DEL', KEYS[kind]]); return; }
  if (useMemory()) { memory[kind].clear(); return; }
}

/** 讀單筆 (corrections 查詢用)。 */
export async function get(kind: StoreKind, field: string): Promise<any | null> {
  if (useRedis()) {
    const v = await redis(['HGET', KEYS[kind], field]);
    if (!v) return null;
    try { return JSON.parse(v); } catch (e) { return null; }
  }
  if (useMemory()) return memory[kind].get(field) ?? null;
  return null;
}

/**
 * 端到端連線自我測試：實際對後端寫入→讀回→刪除一筆探測資料，
 * 確認團隊雲端不只是「有設定」，而是真的能讀寫 (抓出 token 失效/網路阻擋等問題)。
 */
export async function selfTest(): Promise<{ ok: boolean; backend: 'redis' | 'memory' | 'none'; error?: string }> {
  const backend = storeBackend();
  if (backend === 'none') return { ok: false, backend };
  try {
    if (useRedis()) {
      const key = 'airtac:__selftest';
      const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      await redis(['HSET', key, 'probe', token]);
      const got = await redis(['HGET', key, 'probe']);
      await redis(['DEL', key]);
      if (got !== token) return { ok: false, backend, error: '寫入後讀回結果不一致' };
    }
    return { ok: true, backend };
  } catch (e: any) {
    return { ok: false, backend, error: e?.message || String(e) };
  }
}

/** 正規化競品型號作為 correction 的鍵 (去空白/破折號、轉大寫)。 */
export function normalizeModel(model: string, brand?: string): string {
  const m = String(model || '').toUpperCase().replace(/[\s\-–—_]+/g, '');
  const b = String(brand || '').toUpperCase().replace(/\s+/g, '');
  return b && b !== 'AUTO' ? `${b}::${m}` : m;
}
