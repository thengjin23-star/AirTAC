/**
 * /api/store 的框架無關處理邏輯 (Express 與 Vercel Function 共用)。
 * 提供團隊共用的 confirmed / rules / corrections 讀寫。
 */
import {
  StoreKind, listAll, put, putMany, remove, clear, isConfigured, storeBackend, normalizeModel, selfTest,
  ensureCorrectionsMigrated,
} from './store';
import { accessRequired, checkAccess, ACCESS_DENIED } from './access';

const VALID: StoreKind[] = ['confirmed', 'rules', 'corrections'];
/** 單次批次寫入上限 (Upstash 單一請求約 1MB，200 筆對照約 60KB，留足餘裕) */
const BULK_LIMIT = 500;

export interface StoreOutcome { status: number; body: any; }

function parseKind(k: any): StoreKind | null {
  return VALID.includes(k) ? k as StoreKind : null;
}

/** 把一筆資料轉成 [field, 儲存值]；corrections 以正規化型號為鍵。 */
function toEntry(kind: StoreKind, item: any): [string, any] | null {
  if (!item || typeof item !== 'object') return null;
  if (kind === 'corrections') {
    const competitorModel = String(item.competitorModel || '').trim();
    const airtacCode = String(item.airtacCode || '').trim();
    const field = normalizeModel(competitorModel);
    if (!field || !airtacCode) return null;
    return [field, { ...item, competitorModel, airtacCode, key: field, updatedAt: Date.now() }];
  }
  const field = String(item.id || '');
  return field ? [field, item] : null;
}

/**
 * @param method  GET | PUT | DELETE
 * @param query   { kind, id?, clear?, bulk? }
 * @param body    PUT: 單筆物件 (需含 id；corrections 需含 competitorModel + airtacCode)；bulk=1 時為陣列
 * @param headers 請求標頭 (選用存取碼驗證)
 */
export async function handleStore(method: string, query: any, body: any, headers?: any): Promise<StoreOutcome> {
  // 端到端連線自我測試 (實際讀寫一筆探測資料)。
  // 必須排在 status 探測之前：selftest 請求沒有 kind，會被下方 kind===undefined 的
  // status 分支搶先攔截，導致回傳沒有 ok 欄位、前端誤判為「連線失敗」。
  if (method === 'GET' && (query.selftest === '1' || query.selftest === 'true')) {
    const r = await selfTest();
    return { status: 200, body: { configured: isConfigured(), accessRequired: accessRequired(), ...r } };
  }

  // 前端探測: 是否已設定雲端 (不需存取碼，讓狀態橫幅能正常顯示)
  if (method === 'GET' && (query.kind === undefined || query.kind === 'status')) {
    return { status: 200, body: { configured: isConfigured(), backend: storeBackend(), accessRequired: accessRequired() } };
  }

  if (!checkAccess(headers)) return ACCESS_DENIED;

  const kind = parseKind(query.kind);
  if (!kind) return { status: 400, body: { error: 'invalid kind' } };

  if (!isConfigured()) {
    // 未設定雲端 → 明確告知前端改用 localStorage
    return { status: 200, body: { configured: false, items: [] } };
  }

  try {
    if (kind === 'corrections') await ensureCorrectionsMigrated();

    if (method === 'GET') {
      const items = await listAll(kind);
      return { status: 200, body: { configured: true, items } };
    }
    if (method === 'PUT' || method === 'POST') {
      const payload = typeof body === 'string' ? JSON.parse(body) : body;
      // 批次寫入 (匯入歷史 Excel 用)：一次 HSET 多筆，取代上千次逐筆請求
      if (query.bulk === '1' || query.bulk === 'true') {
        if (!Array.isArray(payload)) return { status: 400, body: { error: 'bulk body must be an array' } };
        if (payload.length > BULK_LIMIT) return { status: 413, body: { error: `一次最多 ${BULK_LIMIT} 筆` } };
        const entries = payload.map(it => toEntry(kind, it)).filter((e): e is [string, any] => e !== null);
        await putMany(kind, entries);
        return { status: 200, body: { configured: true, ok: true, written: entries.length, skipped: payload.length - entries.length } };
      }
      const entry = toEntry(kind, payload);
      if (!entry) return { status: 400, body: { error: kind === 'corrections' ? 'missing competitorModel/airtacCode' : 'missing id' } };
      await put(kind, entry[0], entry[1]);
      return { status: 200, body: { configured: true, ok: true, field: entry[0] } };
    }
    if (method === 'DELETE') {
      if (query.clear === 'true' || query.clear === '1') { await clear(kind); return { status: 200, body: { ok: true, cleared: true } }; }
      const id = String(query.id || '');
      if (!id) return { status: 400, body: { error: 'id required' } };
      await remove(kind, id);
      return { status: 200, body: { ok: true } };
    }
    return { status: 405, body: { error: 'method not allowed' } };
  } catch (e: any) {
    console.error('store error:', e.message || e);
    return { status: 500, body: { error: e.message || 'store error' } };
  }
}
