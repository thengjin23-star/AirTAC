/**
 * 前端雲端儲存封裝 (漸進增強)。
 *
 * - 有設定雲端 (Vercel KV/Upstash) → 全公司共用，資料存雲端
 * - 沒設定 → 自動退回 localStorage，app 照常運作
 *
 * 使用方式：呼叫 loadConfirmed()/saveConfirmed()... 元件不需關心後端。
 * 每次寫入同時更新 localStorage 作為離線快取。
 */

import { apiFetch } from './http';

export type StoreKind = 'confirmed' | 'rules';

let cloudConfigured: boolean | null = null;
let probing: Promise<boolean> | null = null;

/** 探測雲端是否設定 (結果快取；同時多個呼叫共用同一個請求)。 */
export async function isCloudConfigured(): Promise<boolean> {
  if (cloudConfigured !== null) return cloudConfigured;
  if (!probing) {
    probing = (async () => {
      try {
        const r = await apiFetch('/api/store?kind=status');
        const j = await r.json();
        cloudConfigured = Boolean(j.configured);
      } catch (e) {
        cloudConfigured = false;
      } finally {
        probing = null;
      }
      return cloudConfigured;
    })();
  }
  return probing;
}

/** 清掉探測快取，強制下次重新向後端確認 (供「重新檢查」按鈕使用)。 */
export function resetCloudProbe() {
  cloudConfigured = null;
}

/** 端到端連線自我測試：請後端實際寫入→讀回→刪除一筆探測資料，確認真的能共用。 */
export async function cloudSelfTest(): Promise<{ configured: boolean; ok: boolean; backend: string; error?: string }> {
  try {
    const r = await apiFetch('/api/store?selftest=1');
    const j = await r.json();
    if (typeof j.configured === 'boolean') cloudConfigured = j.configured;
    return { configured: Boolean(j.configured), ok: Boolean(j.ok), backend: j.backend || 'none', error: j.error };
  } catch (e: any) {
    return { configured: false, ok: false, backend: 'none', error: e?.message || String(e) };
  }
}

const LS_KEY: Record<StoreKind, string> = {
  confirmed: 'airtac_confirmed_list_v1',
  rules: 'airtac_learned_rules_v1',
};

function readLocal<T>(kind: StoreKind): T[] {
  try {
    const raw = localStorage.getItem(LS_KEY[kind]);
    if (raw) { const p = JSON.parse(raw); if (Array.isArray(p)) return p; }
  } catch (e) {}
  return [];
}
function writeLocal(kind: StoreKind, items: any[]) {
  try { localStorage.setItem(LS_KEY[kind], JSON.stringify(items)); } catch (e) {}
}

/** 載入某類全部 (雲端優先，退回本機)。 */
export async function loadItems<T = any>(kind: StoreKind): Promise<{ items: T[]; cloud: boolean }> {
  if (await isCloudConfigured()) {
    try {
      const r = await apiFetch(`/api/store?kind=${kind}`);
      const j = await r.json();
      if (j.configured && Array.isArray(j.items)) {
        writeLocal(kind, j.items); // 同步到本機快取
        return { items: j.items, cloud: true };
      }
    } catch (e) { /* 雲端失敗 → 退回本機 */ }
  }
  return { items: readLocal<T>(kind), cloud: false };
}

/** 新增/更新一筆 (需含 id)。 */
export async function putItem(kind: StoreKind, item: any): Promise<void> {
  // 先更新本機快取
  const local = readLocal(kind).filter((x: any) => x.id !== item.id);
  local.push(item);
  writeLocal(kind, local);
  if (await isCloudConfigured()) {
    try {
      await apiFetch(`/api/store?kind=${kind}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item),
      });
    } catch (e) {}
  }
}

/** 刪除一筆。 */
export async function deleteItem(kind: StoreKind, id: string): Promise<void> {
  writeLocal(kind, readLocal(kind).filter((x: any) => x.id !== id));
  if (await isCloudConfigured()) {
    try { await apiFetch(`/api/store?kind=${kind}&id=${encodeURIComponent(id)}`, { method: 'DELETE' }); } catch (e) {}
  }
}

/** 清空某類。 */
export async function clearItems(kind: StoreKind): Promise<void> {
  writeLocal(kind, []);
  if (await isCloudConfigured()) {
    try { await apiFetch(`/api/store?kind=${kind}&clear=true`, { method: 'DELETE' }); } catch (e) {}
  }
}

/** 已對照參考資料庫的一筆 (competitor → AirTAC)。 */
export interface CorrectionRow {
  key?: string;
  competitorModel: string;
  brand?: string;
  airtacCode: string;
  seriesId?: string;
  description?: string;
  note?: string;
  updatedAt?: number;
}

/** 自我學習：把一筆確認的對照記為修正 (只在雲端有設定時送出)。 */
export async function saveCorrection(correction: {
  competitorModel: string; brand?: string; airtacCode: string; seriesId?: string; description?: string; note?: string;
}): Promise<void> {
  if (!(await isCloudConfigured())) return; // 本機模式不做自我學習 (無共用意義)
  try {
    await apiFetch('/api/store?kind=corrections', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(correction),
    });
  } catch (e) {}
}

/** 讀取整個「已對照參考資料庫」(corrections)。僅雲端模式有資料。 */
export async function loadCorrections(): Promise<{ items: CorrectionRow[]; cloud: boolean }> {
  if (await isCloudConfigured()) {
    try {
      const r = await apiFetch('/api/store?kind=corrections');
      const j = await r.json();
      if (j.configured && Array.isArray(j.items)) return { items: j.items, cloud: true };
    } catch (e) { /* 退回空 */ }
  }
  return { items: [], cloud: false };
}

/** 刪除參考資料庫中的一筆 (以正規化後的 key)。 */
export async function deleteCorrection(key: string): Promise<void> {
  if (!(await isCloudConfigured())) return;
  try { await apiFetch(`/api/store?kind=corrections&id=${encodeURIComponent(key)}`, { method: 'DELETE' }); } catch (e) {}
}

/** 清空整個參考資料庫。 */
export async function clearCorrections(): Promise<void> {
  if (!(await isCloudConfigured())) return;
  try { await apiFetch('/api/store?kind=corrections&clear=true', { method: 'DELETE' }); } catch (e) {}
}

/**
 * 批次匯入歷史對照：每 200 筆一個請求寫入雲端 corrections (伺服器端一次 HSET)。
 * onProgress 供 UI 顯示進度。回傳成功/略過/失敗筆數。
 */
export async function importCorrections(
  rows: CorrectionRow[],
  onProgress?: (done: number, total: number) => void,
): Promise<{ ok: number; fail: number; error?: string }> {
  if (!(await isCloudConfigured())) return { ok: 0, fail: rows.length, error: '未連接團隊雲端' };
  const CHUNK = 200;
  let ok = 0, fail = 0;
  let error: string | undefined;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    try {
      const r = await apiFetch('/api/store?kind=corrections&bulk=1', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(chunk),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok) { ok += j.written ?? chunk.length; fail += j.skipped ?? 0; }
      else { fail += chunk.length; error = j.error || `HTTP ${r.status}`; }
    } catch (e: any) {
      fail += chunk.length;
      error = e?.message || String(e);
    }
    onProgress?.(Math.min(i + CHUNK, rows.length), rows.length);
  }
  return { ok, fail, error };
}
