/**
 * /api/store 的框架無關處理邏輯 (Express 與 Vercel Function 共用)。
 * 提供團隊共用的 confirmed / rules / corrections 讀寫。
 */
import { StoreKind, listAll, put, remove, clear, isConfigured, storeBackend, normalizeModel, selfTest } from './store';

const VALID: StoreKind[] = ['confirmed', 'rules', 'corrections'];

export interface StoreOutcome { status: number; body: any; }

function parseKind(k: any): StoreKind | null {
  return VALID.includes(k) ? k as StoreKind : null;
}

/**
 * @param method  GET | PUT | DELETE
 * @param query   { kind, id?, clear? }
 * @param body    PUT: 單筆物件 (需含 id 或 corrections 用 model)
 */
export async function handleStore(method: string, query: any, body: any): Promise<StoreOutcome> {
  // 前端探測: 是否已設定雲端
  if (method === 'GET' && (query.kind === undefined || query.kind === 'status')) {
    return { status: 200, body: { configured: isConfigured(), backend: storeBackend() } };
  }

  // 端到端連線自我測試 (實際讀寫一筆探測資料)
  if (method === 'GET' && (query.selftest === '1' || query.selftest === 'true')) {
    const r = await selfTest();
    return { status: 200, body: { configured: isConfigured(), ...r } };
  }

  const kind = parseKind(query.kind);
  if (!kind) return { status: 400, body: { error: 'invalid kind' } };

  if (!isConfigured()) {
    // 未設定雲端 → 明確告知前端改用 localStorage
    return { status: 200, body: { configured: false, items: [] } };
  }

  try {
    if (method === 'GET') {
      const items = await listAll(kind);
      return { status: 200, body: { configured: true, items } };
    }
    if (method === 'PUT' || method === 'POST') {
      const item = typeof body === 'string' ? JSON.parse(body) : body;
      if (!item || typeof item !== 'object') return { status: 400, body: { error: 'body required' } };
      // field 鍵: corrections 用正規化型號, 其餘用 id
      const field = kind === 'corrections'
        ? normalizeModel(item.competitorModel, item.brand)
        : String(item.id || '');
      if (!field) return { status: 400, body: { error: 'missing id/model' } };
      const stored = kind === 'corrections' ? { ...item, key: field, updatedAt: Date.now() } : item;
      await put(kind, field, stored);
      return { status: 200, body: { configured: true, ok: true, field } };
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
