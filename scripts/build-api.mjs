/**
 * 把 Vercel Serverless Function 預先 bundle 成單一自足的 .js 檔。
 *
 * 背景：Vercel 的函式打包器不會編譯 api/ 之外被引用的 TypeScript 模組，
 * 部署後會出現 ERR_MODULE_NOT_FOUND (Cannot find module '/var/task/src/...')。
 * 因此改為在本地把匹配邏輯 + 型錄 JSON 全部 bundle 進 api/*.js 再 commit，
 * Vercel 拿到的就是零相對依賴的現成檔案。
 *
 * 使用方式：npm run build:api (修改 src/server 或型錄 JSON 後記得重跑)
 */
import { build } from 'esbuild';

const shared = {
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  // npm 套件 (@google/genai 等) 留給 Vercel 從 node_modules 解析，只 bundle 專案內程式碼與 JSON
  packages: 'external',
  banner: {
    js: '// 此檔案由 scripts/build-api.mjs 自動產生，請勿手動編輯。\n// 原始碼在 src/server/vercelHandlers/，修改後執行 npm run build:api 重新產生。',
  },
  logLevel: 'info',
};

await build({
  ...shared,
  entryPoints: ['src/server/vercelHandlers/cross-reference.ts'],
  outfile: 'api/cross-reference.js',
});

await build({
  ...shared,
  entryPoints: ['src/server/vercelHandlers/health.ts'],
  outfile: 'api/health.js',
});

await build({
  ...shared,
  entryPoints: ['src/server/vercelHandlers/learn-catalog.ts'],
  outfile: 'api/learn-catalog.js',
});

console.log('✓ api/*.js bundles generated');
