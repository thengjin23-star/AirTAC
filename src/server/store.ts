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

/**
 * 正規化競品型號作為 correction 的鍵 (去空白/破折號/底線、轉大寫)。
 * 刻意「不含品牌」：品牌字串來源不一致 (自動偵測時請求沒有品牌、AI 回 "SMC (日本)"、
 * Excel 寫 "smc")，放進鍵會造成存得進去卻永遠查不到。品牌另存在資料欄位內。
 */
export function normalizeModel(model: string): string {
  return String(model || '').toUpperCase().replace(/[\s\-–—_]+/g, '');
}

/** 一次寫入多筆 (field → value)。單一 HSET 命令，避免上千次往返。 */
export async function putMany(kind: StoreKind, entries: [string, any][]): Promise<void> {
  if (entries.length === 0) return;
  if (useRedis()) {
    const args: (string | number)[] = ['HSET', KEYS[kind]];
    for (const [f, v] of entries) args.push(f, JSON.stringify(v));
    await redis(args);
    return;
  }
  if (useMemory()) for (const [f, v] of entries) memory[kind].set(f, v);
}

/**
 * 一次性遷移：舊版 corrections 的鍵是「品牌::型號」，改成只有型號。
 * 以 airtac:meta 的旗標記錄已完成，之後每個 serverless 實例只多一次 HGET。
 */
const META_KEY = 'airtac:meta';
let migrationDone = false;
export async function ensureCorrectionsMigrated(): Promise<void> {
  if (migrationDone || !isConfigured()) return;
  try {
    if (useRedis()) {
      if (await redis(['HGET', META_KEY, 'corrections_v2'])) { migrationDone = true; return; }
      const flat: string[] = (await redis(['HGETALL', KEYS.corrections])) || [];
      const current = new Map<string, any>();
      for (let i = 0; i < flat.length; i += 2) {
        try { current.set(flat[i], JSON.parse(flat[i + 1])); } catch (e) { /* skip bad */ }
      }
      const writes: [string, any][] = [];
      const deletes: string[] = [];
      for (const [field, val] of current) {
        if (!field.includes('::')) continue;
        const newKey = normalizeModel(val?.competitorModel || field.split('::').pop() || '');
        deletes.push(field);
        if (!newKey) continue;
        const existing = current.get(newKey) || writes.find(w => w[0] === newKey)?.[1];
        if (existing && (existing.updatedAt || 0) > (val.updatedAt || 0)) continue; // 保留較新的
        const idx = writes.findIndex(w => w[0] === newKey);
        if (idx >= 0) writes.splice(idx, 1);
        writes.push([newKey, { ...val, key: newKey }]);
      }
      if (writes.length) await putMany('corrections', writes);
      if (deletes.length) await redis(['HDEL', KEYS.corrections, ...deletes]);
      await redis(['HSET', META_KEY, 'corrections_v2', String(Date.now())]);
      if (writes.length || deletes.length) console.log(`corrections migrated: ${writes.length} rewritten, ${deletes.length} legacy keys removed`);
    } else if (useMemory()) {
      for (const [field, val] of Array.from(memory.corrections.entries())) {
        if (!field.includes('::')) continue;
        memory.corrections.delete(field);
        const newKey = normalizeModel(val?.competitorModel || '');
        if (newKey) memory.corrections.set(newKey, { ...val, key: newKey });
      }
    }
    migrationDone = true;
  } catch (e: any) {
    console.error('corrections migration failed:', e?.message || e);
  }
}

/**
 * 找「相近型號」的過去對照：以正規化鍵的英數字首 (3 碼) 做 HSCAN MATCH，
 * 再依與輸入的共同字首長度排序。讓參考資料庫越大，AI 越能學到公司慣用的對應。
 */
export async function findSimilarCorrections(model: string, max = 6): Promise<any[]> {
  const key = normalizeModel(model);
  const prefix = (key.match(/^[A-Z0-9]+/)?.[0] || '').slice(0, 3);
  if (prefix.length < 2) return [];
  const pool: any[] = [];
  if (useRedis()) {
    let cursor = '0';
    let iter = 0;
    do {
      const res = await redis(['HSCAN', KEYS.corrections, cursor, 'MATCH', `${prefix}*`, 'COUNT', 1000]);
      cursor = String(res?.[0] ?? '0');
      const flat: string[] = res?.[1] || [];
      for (let i = 1; i < flat.length; i += 2) {
        try { pool.push(JSON.parse(flat[i])); } catch (e) { /* skip */ }
      }
      iter++;
    } while (cursor !== '0' && iter < 6 && pool.length < 500);
  } else if (useMemory()) {
    for (const [f, v] of memory.corrections) if (f.startsWith(prefix)) pool.push(v);
  }
  const common = (a: string, b: string) => { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return i; };
  return pool
    .map(v => ({ v, k: normalizeModel(v?.competitorModel || v?.key || '') }))
    .filter(({ k }) => k && k !== key)
    .map(({ v, k }) => ({ v, score: common(k, key) }))
    .filter(({ score }) => score >= 3)
    .sort((a, b) => b.score - a.score || (b.v.updatedAt || 0) - (a.v.updatedAt || 0))
    .slice(0, max)
    .map(({ v }) => v);
}
