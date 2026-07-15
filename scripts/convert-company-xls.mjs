/**
 * 把公司提供的「競品對照表」Excel 轉成 src/data/company-crossref.json。
 *
 * 用法: node scripts/convert-company-xls.mjs <xls路徑>
 * 產出格式: [{ sheet, section, airtac, note, sensor, competitors: { 品牌: "型號字串" } }]
 * 之後表格更新時重跑本腳本 + npm run build 即可同步。
 */
import XLSX from 'xlsx';
import { writeFileSync } from 'fs';

const src = process.argv[2];
if (!src) {
  console.error('用法: node scripts/convert-company-xls.mjs <xls路徑>');
  process.exit(1);
}

const wb = XLSX.readFile(src);
const entries = [];

const normBrand = (h) => {
  const s = String(h || '').replace(/型號|註\d+|\s+/g, '').trim();
  const map = {
    'SMC1': 'SMC', 'SMC2': 'SMC', 'Mindman1': 'Mindman', 'Mindman2': 'Mindman',
    'Cheilc': 'Chelic', 'Chelic': 'Chelic', 'FESTO': 'Festo', '小金井': 'Koganei',
    'HIWIN上銀': 'HIWIN', 'PMI銀泰': 'PMI', 'CPC直得': 'CPC', 'MISUMI三住': 'MISUMI',
    'POSU穩速': 'POSU',
  };
  return map[s] || s;
};

const isSectionRow = (row) => {
  const first = String(row[0] || '').trim();
  return /^[一二三四五六七八九十]+、/.test(first);
};

const cleanCell = (v) => String(v ?? '').trim().replace(/^X$/i, '');

function parseSheet(sheetName, { brandCols, airtacCol, noteCol, sensorCol, sectionInFirstCol }) {
  const ws = wb.Sheets[sheetName];
  if (!ws) return;
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  let section = '';
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const first = String(row[0] || '').trim();
    if (first.startsWith('註')) continue;
    if (isSectionRow(row)) {
      section = first.replace(/^[一二三四五六七八九十]+、/, '').trim();
      // 線軌分頁的分類列同時就是資料列
      if (!sectionInFirstCol) continue;
    }
    const airtac = cleanCell(row[airtacCol]);
    if (!airtac) continue;
    const competitors = {};
    for (const [colIdx, brand] of brandCols) {
      const v = cleanCell(row[colIdx]);
      if (v) competitors[brand] = competitors[brand] ? `${competitors[brand]} / ${v}` : v;
    }
    entries.push({
      sheet: sheetName,
      section: sectionInFirstCol && isSectionRow(row) ? first.replace(/^[一二三四五六七八九十]+、/, '').trim() : section,
      airtac,
      note: noteCol !== undefined ? cleanCell(row[noteCol]) : '',
      sensor: sensorCol !== undefined ? cleanCell(row[sensorCol]) : '',
      competitors,
    });
  }
}

// 各分頁欄位配置 (依實際表頭)
parseSheet('氣缸', {
  brandCols: [[1, 'SMC'], [2, 'Mindman'], [3, 'CKD'], [4, 'Chelic'], [5, 'Koganei'], [6, 'Festo'], [7, '長拓'], [8, '隆運'], [9, 'Parker'], [10, 'Norgren'], [11, '元基']],
  airtacCol: 12, noteCol: 13, sensorCol: 14,
});
parseSheet('閥類', {
  brandCols: [[1, 'SMC'], [2, 'Mindman'], [3, 'Festo'], [4, 'CKD'], [5, 'Chelic'], [6, 'Koganei'], [7, 'Parker'], [8, 'TPC'], [9, 'Burkert'], [10, 'Norgren']],
  airtacCol: 11, noteCol: 12,
});
parseSheet('三點組合', {
  brandCols: [[1, 'SMC'], [2, 'Festo'], [3, 'PISCO'], [4, 'CKD'], [5, '長拓'], [6, 'Mindman'], [7, 'Chelic'], [8, 'POSU']],
  airtacCol: 9, noteCol: 10,
});
parseSheet('其他', {
  brandCols: [[2, 'SMC'], [3, 'SMC'], [4, 'Mindman'], [5, 'Mindman'], [6, 'Chelic']],
  airtacCol: 1,
});
parseSheet('線軌跟導軌', {
  brandCols: [[1, 'THK'], [2, 'HIWIN'], [3, 'PMI'], [4, 'CPC'], [5, 'MISUMI'], [6, '高明鐵']],
  airtacCol: 7, sectionInFirstCol: true,
});

writeFileSync('/home/user/AirTAC/src/data/company-crossref.json', JSON.stringify(entries, null, 1));
console.log(`✓ 轉換完成: ${entries.length} 筆對照，各分頁:`,
  Object.entries(entries.reduce((a, e) => { a[e.sheet] = (a[e.sheet] || 0) + 1; return a; }, {})));
