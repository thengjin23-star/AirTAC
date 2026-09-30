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
function normalizeModel(model) {
  return String(model || "").toUpperCase().replace(/[\s\-–—_]+/g, "");
}
async function putMany(kind, entries) {
  if (entries.length === 0) return;
  if (useRedis()) {
    const args = ["HSET", KEYS[kind]];
    for (const [f, v] of entries) args.push(f, JSON.stringify(v));
    await redis(args);
    return;
  }
  if (useMemory()) for (const [f, v] of entries) memory[kind].set(f, v);
}
var META_KEY = "airtac:meta";
var migrationDone = false;
async function ensureCorrectionsMigrated() {
  if (migrationDone || !isConfigured()) return;
  try {
    if (useRedis()) {
      if (await redis(["HGET", META_KEY, "corrections_v2"])) {
        migrationDone = true;
        return;
      }
      const flat = await redis(["HGETALL", KEYS.corrections]) || [];
      const current = /* @__PURE__ */ new Map();
      for (let i = 0; i < flat.length; i += 2) {
        try {
          current.set(flat[i], JSON.parse(flat[i + 1]));
        } catch (e) {
        }
      }
      const writes = [];
      const deletes = [];
      for (const [field, val] of current) {
        if (!field.includes("::")) continue;
        const newKey = normalizeModel(val?.competitorModel || field.split("::").pop() || "");
        deletes.push(field);
        if (!newKey) continue;
        const existing = current.get(newKey) || writes.find((w) => w[0] === newKey)?.[1];
        if (existing && (existing.updatedAt || 0) > (val.updatedAt || 0)) continue;
        const idx = writes.findIndex((w) => w[0] === newKey);
        if (idx >= 0) writes.splice(idx, 1);
        writes.push([newKey, { ...val, key: newKey }]);
      }
      if (writes.length) await putMany("corrections", writes);
      if (deletes.length) await redis(["HDEL", KEYS.corrections, ...deletes]);
      await redis(["HSET", META_KEY, "corrections_v2", String(Date.now())]);
      if (writes.length || deletes.length) console.log(`corrections migrated: ${writes.length} rewritten, ${deletes.length} legacy keys removed`);
    } else if (useMemory()) {
      for (const [field, val] of Array.from(memory.corrections.entries())) {
        if (!field.includes("::")) continue;
        memory.corrections.delete(field);
        const newKey = normalizeModel(val?.competitorModel || "");
        if (newKey) memory.corrections.set(newKey, { ...val, key: newKey });
      }
    }
    migrationDone = true;
  } catch (e) {
    console.error("corrections migration failed:", e?.message || e);
  }
}

// src/server/access.ts
import crypto from "crypto";
function accessRequired() {
  return Boolean(process.env.ACCESS_TOKEN);
}
function headerValue(headers, name) {
  if (!headers) return void 0;
  const v = typeof headers.get === "function" ? headers.get(name) : headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(v) ? v[0] : v;
}
function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}
function checkAccess(headers) {
  const expected = process.env.ACCESS_TOKEN;
  if (!expected) return true;
  const got = headerValue(headers, "x-access-token");
  return typeof got === "string" && got.length > 0 && safeEqual(got, expected);
}
var ACCESS_DENIED = {
  status: 401,
  body: { error: "\u9700\u8981\u5718\u968A\u5B58\u53D6\u78BC\u624D\u80FD\u4F7F\u7528 (\u8ACB\u5411\u7BA1\u7406\u8005\u7D22\u53D6)", needToken: true }
};

// src/server/storeService.ts
var VALID = ["confirmed", "rules", "corrections"];
var BULK_LIMIT = 500;
function parseKind(k) {
  return VALID.includes(k) ? k : null;
}
function toEntry(kind, item) {
  if (!item || typeof item !== "object") return null;
  if (kind === "corrections") {
    const competitorModel = String(item.competitorModel || "").trim();
    const airtacCode = String(item.airtacCode || "").trim();
    const field2 = normalizeModel(competitorModel);
    if (!field2 || !airtacCode) return null;
    return [field2, { ...item, competitorModel, airtacCode, key: field2, updatedAt: Date.now() }];
  }
  const field = String(item.id || "");
  return field ? [field, item] : null;
}
async function handleStore(method, query, body, headers) {
  if (method === "GET" && (query.selftest === "1" || query.selftest === "true")) {
    const r = await selfTest();
    return { status: 200, body: { configured: isConfigured(), accessRequired: accessRequired(), ...r } };
  }
  if (method === "GET" && (query.kind === void 0 || query.kind === "status")) {
    return { status: 200, body: { configured: isConfigured(), backend: storeBackend(), accessRequired: accessRequired() } };
  }
  if (!checkAccess(headers)) return ACCESS_DENIED;
  const kind = parseKind(query.kind);
  if (!kind) return { status: 400, body: { error: "invalid kind" } };
  if (!isConfigured()) {
    return { status: 200, body: { configured: false, items: [] } };
  }
  try {
    if (kind === "corrections") await ensureCorrectionsMigrated();
    if (method === "GET") {
      const items = await listAll(kind);
      return { status: 200, body: { configured: true, items } };
    }
    if (method === "PUT" || method === "POST") {
      const payload = typeof body === "string" ? JSON.parse(body) : body;
      if (query.bulk === "1" || query.bulk === "true") {
        if (!Array.isArray(payload)) return { status: 400, body: { error: "bulk body must be an array" } };
        if (payload.length > BULK_LIMIT) return { status: 413, body: { error: `\u4E00\u6B21\u6700\u591A ${BULK_LIMIT} \u7B46` } };
        const entries = payload.map((it) => toEntry(kind, it)).filter((e) => e !== null);
        await putMany(kind, entries);
        return { status: 200, body: { configured: true, ok: true, written: entries.length, skipped: payload.length - entries.length } };
      }
      const entry = toEntry(kind, payload);
      if (!entry) return { status: 400, body: { error: kind === "corrections" ? "missing competitorModel/airtacCode" : "missing id" } };
      await put(kind, entry[0], entry[1]);
      return { status: 200, body: { configured: true, ok: true, field: entry[0] } };
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
  const { status, body } = await handleStore(req.method || "GET", query, req.body, req.headers);
  return res.status(status).json(body);
}
export {
  handler as default
};
