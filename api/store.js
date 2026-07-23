// 此檔案由 scripts/build-api.mjs 自動產生，請勿手動編輯。
// 原始碼在 src/server/vercelHandlers/，修改後執行 npm run build:api 重新產生。

// src/server/store.ts
var KEYS = {
  confirmed: "airtac:confirmed",
  rules: "airtac:rules",
  corrections: "airtac:corrections"
};
function redisUrl() {
  return process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
}
function redisToken() {
  return process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
}
function useRedis() {
  return Boolean(redisUrl() && redisToken());
}
function useMemory() {
  return !useRedis() && process.env.LOCAL_MEMORY_STORE === "1";
}
var memory = {
  confirmed: /* @__PURE__ */ new Map(),
  rules: /* @__PURE__ */ new Map(),
  corrections: /* @__PURE__ */ new Map()
};
function storeBackend() {
  return useRedis() ? "redis" : useMemory() ? "memory" : "none";
}
function isConfigured() {
  return useRedis() || useMemory();
}
async function redis(cmd) {
  const resp = await fetch(redisUrl(), {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd)
  });
  if (!resp.ok) throw new Error(`Redis ${cmd[0]} \u5931\u6557: ${resp.status} ${await resp.text().catch(() => "")}`);
  const data = await resp.json();
  if (data.error) throw new Error(`Redis ${cmd[0]}: ${data.error}`);
  return data.result;
}
async function listAll(kind) {
  if (useRedis()) {
    const flat = await redis(["HGETALL", KEYS[kind]]) || [];
    const out = [];
    for (let i = 1; i < flat.length; i += 2) {
      try {
        out.push(JSON.parse(flat[i]));
      } catch (e) {
      }
    }
    return out;
  }
  if (useMemory()) return Array.from(memory[kind].values());
  return [];
}
async function put(kind, field, value) {
  if (useRedis()) {
    await redis(["HSET", KEYS[kind], field, JSON.stringify(value)]);
    return;
  }
  if (useMemory()) {
    memory[kind].set(field, value);
    return;
  }
}
async function remove(kind, field) {
  if (useRedis()) {
    await redis(["HDEL", KEYS[kind], field]);
    return;
  }
  if (useMemory()) {
    memory[kind].delete(field);
    return;
  }
}
async function clear(kind) {
  if (useRedis()) {
    await redis(["DEL", KEYS[kind]]);
    return;
  }
  if (useMemory()) {
    memory[kind].clear();
    return;
  }
}
async function selfTest() {
  const backend = storeBackend();
  if (backend === "none") return { ok: false, backend };
  try {
    if (useRedis()) {
      const key = "airtac:__selftest";
      const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      await redis(["HSET", key, "probe", token]);
      const got = await redis(["HGET", key, "probe"]);
      await redis(["DEL", key]);
      if (got !== token) return { ok: false, backend, error: "\u5BEB\u5165\u5F8C\u8B80\u56DE\u7D50\u679C\u4E0D\u4E00\u81F4" };
    }
    return { ok: true, backend };
  } catch (e) {
    return { ok: false, backend, error: e?.message || String(e) };
  }
}
function normalizeModel(model, brand) {
  const m = String(model || "").toUpperCase().replace(/[\s\-–—_]+/g, "");
  const b = String(brand || "").toUpperCase().replace(/\s+/g, "");
  return b && b !== "AUTO" ? `${b}::${m}` : m;
}

// src/server/storeService.ts
var VALID = ["confirmed", "rules", "corrections"];
function parseKind(k) {
  return VALID.includes(k) ? k : null;
}
async function handleStore(method, query, body) {
  if (method === "GET" && (query.selftest === "1" || query.selftest === "true")) {
    const r = await selfTest();
    return { status: 200, body: { configured: isConfigured(), ...r } };
  }
  if (method === "GET" && (query.kind === void 0 || query.kind === "status")) {
    return { status: 200, body: { configured: isConfigured(), backend: storeBackend() } };
  }
  const kind = parseKind(query.kind);
  if (!kind) return { status: 400, body: { error: "invalid kind" } };
  if (!isConfigured()) {
    return { status: 200, body: { configured: false, items: [] } };
  }
  try {
    if (method === "GET") {
      const items = await listAll(kind);
      return { status: 200, body: { configured: true, items } };
    }
    if (method === "PUT" || method === "POST") {
      const item = typeof body === "string" ? JSON.parse(body) : body;
      if (!item || typeof item !== "object") return { status: 400, body: { error: "body required" } };
      const field = kind === "corrections" ? normalizeModel(item.competitorModel, item.brand) : String(item.id || "");
      if (!field) return { status: 400, body: { error: "missing id/model" } };
      const stored = kind === "corrections" ? { ...item, key: field, updatedAt: Date.now() } : item;
      await put(kind, field, stored);
      return { status: 200, body: { configured: true, ok: true, field } };
    }
    if (method === "DELETE") {
      if (query.clear === "true" || query.clear === "1") {
        await clear(kind);
        return { status: 200, body: { ok: true, cleared: true } };
      }
      const id = String(query.id || "");
      if (!id) return { status: 400, body: { error: "id required" } };
      await remove(kind, id);
      return { status: 200, body: { ok: true } };
    }
    return { status: 405, body: { error: "method not allowed" } };
  } catch (e) {
    console.error("store error:", e.message || e);
    return { status: 500, body: { error: e.message || "store error" } };
  }
}

// src/server/vercelHandlers/store.ts
async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const query = Object.fromEntries(url.searchParams.entries());
  const { status, body } = await handleStore(req.method || "GET", query, req.body);
  return res.status(status).json(body);
}
export {
  handler as default
};
