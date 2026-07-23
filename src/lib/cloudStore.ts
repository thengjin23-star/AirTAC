/**
 * 前端雲端儲存封裝 (漸進增強)。
 *
 * - 有設定雲端 (Vercel KV/Upstash) → 全公司共用，資料存雲端
 * - 沒設定 → 自動退回 localStorage，app 照常運作
 *
 * 使用方式：呼叫 loadConfirmed()/saveConfirmed()... 元件不需關心後端。
 * 每次寫入同時更新 localStorage 作為離線快取。
 */

export type StoreKind = 'confirmed' | 'rules';

let cloudConfigured: boolean | null = null;

/** 探測雲端是否設定 (結果快取)。 */
export async function isCloudConfigured(): Promise<boolean> {
  if (cloudConfigured !== null) return cloudConfigured;
  try {
    const r = await fetch('/api/store?kind=status');
    const j = await r.json();
    cloudConfigured = Boolean(j.configured);
  } catch (e) {
    cloudConfigured = false;
  }
  return cloudConfigured;
}

export function cloudBackendLabel(): boolean {
  return cloudConfigured === true;
}

/** 清掉探測快取，強制下次重新向後端確認 (供「重新檢查」按鈕使用)。 */
export function resetCloudProbe() {
  cloudConfigured = null;
}

export interface CloudStatus {
  configured: boolean;
  backend: 'redis' | 'memory' | 'none';
}

/** 取得雲端狀態 (是否設定 + 後端種類)，同時更新探測快取。 */
export async function fetchCloudStatus(): Promise<CloudStatus> {
  try {
    const r = await fetch('/api/store?kind=status');
    const j = await r.json();
    cloudConfigured = Boolean(j.configured);
    return { configured: cloudConfigured, backend: j.backend || 'none' };
  } catch (e) {
    cloudConfigured = false;
    return { configured: false, backend: 'none' };
  }
}

/** 端到端連線自我測試：請後端實際寫入→讀回→刪除一筆探測資料，確認真的能共用。 */
export async function cloudSelfTest(): Promise<{ configured: boolean; ok: boolean; backend: string; error?: string }> {
  try {
    const r = await fetch('/api/store?selftest=1');
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
      const r = await fetch(`/api/store?kind=${kind}`);
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
      await fetch(`/api/store?kind=${kind}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item),
      });
    } catch (e) {}
  }
}

/** 刪除一筆。 */
export async function deleteItem(kind: StoreKind, id: string): Promise<void> {
  writeLocal(kind, readLocal(kind).filter((x: any) => x.id !== id));
  if (await isCloudConfigured()) {
    try { await fetch(`/api/store?kind=${kind}&id=${encodeURIComponent(id)}`, { method: 'DELETE' }); } catch (e) {}
  }
}

/** 清空某類。 */
export async function clearItems(kind: StoreKind): Promise<void> {
  writeLocal(kind, []);
  if (await isCloudConfigured()) {
    try { await fetch(`/api/store?kind=${kind}&clear=true`, { method: 'DELETE' }); } catch (e) {}
  }
}

/** 自我學習：把一筆確認的對照記為修正 (只在雲端有設定時送出)。 */
export async function saveCorrection(correction: {
  competitorModel: string; brand?: string; airtacCode: string; seriesId?: string; description?: string; note?: string;
}): Promise<void> {
  if (!(await isCloudConfigured())) return; // 本機模式不做自我學習 (無共用意義)
  try {
    await fetch('/api/store?kind=corrections', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(correction),
    });
  } catch (e) {}
}
