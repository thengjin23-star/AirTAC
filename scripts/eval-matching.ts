/**
 * 匹配準確率評測 (回歸測試)。
 *
 * 用法:  npx tsx scripts/eval-matching.ts [篩選字串] [--concurrency=2] [--out=結果.json]
 * 需要 .env.local 內的 GEMINI_API_KEY；每筆約 1~2 次 Gemini 呼叫 (免費額度請留意)。
 *
 * 評分 (以第一筆推薦、且與 UI 顯示一致的訂購碼為準):
 *   series  = 推薦系列在 cases.json 的可接受清單內 (正確答案來自公司對照表)
 *   params  = must 片段全部出現、mustNot 片段皆未出現 (比對時去除空白/破折號、轉大寫)
 *   verified= 通過型錄驗證
 */
import { config } from "dotenv";
config({ path: [".env.local", ".env"], quiet: true });
import { readFileSync, writeFileSync } from "fs";

interface Case { input: string; brand?: string; series: string[]; must?: string[]; mustNot?: string[]; why?: string }

const args = process.argv.slice(2);
const filter = args.find(a => !a.startsWith("--"));
const conc = Number(args.find(a => a.startsWith("--concurrency="))?.split("=")[1] || 2);
const out = args.find(a => a.startsWith("--out="))?.split("=")[1];

const { crossReference } = await import("../src/server/crossReferenceService");
const cases: Case[] = JSON.parse(readFileSync("eval/cases.json", "utf8")).filter((c: Case) => !filter || c.input.includes(filter));
const norm = (s: string) => String(s || "").toUpperCase().replace(/[\s\-_]+/g, "");

const results: any[] = new Array(cases.length);
let next = 0;
async function worker() {
  while (next < cases.length) {
    const i = next++;
    const c = cases[i];
    const t0 = Date.now();
    const r = await crossReference({ competitorModel: c.input, brand: c.brand });
    const ms = Date.now() - t0;
    const recs = r.body?.airtacRecommendations || [];
    const top = recs[0];
    const v = top?.validation;
    const code = top ? ((v?.serverGeneratedCode && !v.catalogVerified) ? v.serverGeneratedCode : (top.fullOrderingCode || top.baseModel)) : "";
    const n = norm(code);
    const seriesOk = Boolean(top && c.series.includes(top.seriesId));
    const anySeries = recs.some((x: any) => c.series.includes(x.seriesId));
    const paramsOk = (c.must || []).every(m => n.includes(norm(m))) && !(c.mustNot || []).some(m => n.includes(norm(m)));
    results[i] = { input: c.input, status: r.status, ms, expected: c.series, got: top?.seriesId, code, seriesOk, anySeries, paramsOk: seriesOk && paramsOk, verified: Boolean(v?.catalogVerified), error: r.body?.error, warnings: v?.warnings };
    const mark = (b: boolean) => (b ? "✓" : "✗");
    console.log(`${mark(seriesOk)}${mark(seriesOk && paramsOk)}${mark(Boolean(v?.catalogVerified))} ${c.input.padEnd(22)} → ${String(top?.seriesId).padEnd(7)} ${code.padEnd(28)} ${(ms / 1000).toFixed(1)}s${r.status !== 200 ? "  ERR " + r.body?.error : ""}${!seriesOk ? `  (expected ${c.series.join("/")})` : ""}`);
  }
}
await Promise.all(Array.from({ length: conc }, worker));

const ok = results.filter(r => r.status === 200);
const pct = (k: string) => `${ok.filter(r => r[k]).length}/${ok.length} (${Math.round((ok.filter(r => r[k]).length / Math.max(ok.length, 1)) * 100)}%)`;
console.log(`\n系列正確(第一筆): ${pct("seriesOk")}   系列出現在推薦中: ${pct("anySeries")}   系列+參數正確: ${pct("paramsOk")}   型錄驗證通過: ${pct("verified")}   錯誤: ${results.length - ok.length}   平均 ${(ok.reduce((a, r) => a + r.ms, 0) / Math.max(ok.length, 1) / 1000).toFixed(1)}s`);
if (out) writeFileSync(out, JSON.stringify(results, null, 1));
