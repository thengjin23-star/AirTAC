/**
 * 對照確認清單的專業格式 Excel 匯出。
 * 使用 xlsx-js-style (支援儲存格樣式的 SheetJS 分支)：
 * 標題列、品牌藍表頭、全框線、斑馬紋、匹配類型色塊、自動篩選。
 */
import * as XLSX from 'xlsx-js-style';
import type { ConfirmedItem } from '../types';

const BRAND = '005A9C';        // 亞德客品牌藍
const BORDER_C = 'C9D4E0';
const ZEBRA = 'F3F7FB';

const thin = { style: 'thin' as const, color: { rgb: BORDER_C } };
const allBorders = { top: thin, bottom: thin, left: thin, right: thin };

const HEADERS = ['序號', '競品品牌', '競品型號', 'AirTAC 訂購碼', '產品描述', '匹配類型', '匹配度(%)', '備註', '確認時間'];

/** 匹配類型 → [字色, 底色] */
function matchTypeColors(t: string): [string, string] {
  if (t?.includes('直接')) return ['1F7A3F', 'DCF2E4'];
  if (t?.includes('相似')) return ['92600A', 'FCF0D8'];
  if (t?.includes('無')) return ['B42318', 'FBE4E2'];
  return ['334155', 'FFFFFF'];
}

export function buildConfirmedWorkbook(items: ConfirmedItem[]): XLSX.WorkBook {
  const now = new Date();
  const aoa: any[][] = [];

  // Row 1: 標題
  aoa.push([{
    v: 'AirTAC 競品對照確認清單', t: 's',
    s: {
      font: { bold: true, sz: 15, color: { rgb: 'FFFFFF' }, name: 'Microsoft JhengHei' },
      fill: { fgColor: { rgb: BRAND } },
      alignment: { horizontal: 'center', vertical: 'center' },
    },
  }, ...Array(HEADERS.length - 1).fill({ v: '', s: { fill: { fgColor: { rgb: BRAND } } } })]);

  // Row 2: 匯出資訊
  aoa.push([{
    v: `匯出日期：${now.toLocaleString('zh-TW')}    共 ${items.length} 筆    ※ 選型結果僅供參考，訂購前請與亞德客官方型錄核對`,
    t: 's',
    s: {
      font: { sz: 9, color: { rgb: '64748B' }, name: 'Microsoft JhengHei' },
      alignment: { horizontal: 'left', vertical: 'center' },
    },
  }, ...Array(HEADERS.length - 1).fill({ v: '', s: {} })]);

  // Row 3: 表頭
  aoa.push(HEADERS.map(h => ({
    v: h, t: 's',
    s: {
      font: { bold: true, sz: 10.5, color: { rgb: 'FFFFFF' }, name: 'Microsoft JhengHei' },
      fill: { fgColor: { rgb: '2E6DA4' } },
      alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
      border: allBorders,
    },
  })));

  // 資料列
  items.forEach((it, idx) => {
    const zebra = idx % 2 === 1;
    const base = {
      font: { sz: 10, name: 'Microsoft JhengHei', color: { rgb: '1E293B' } },
      alignment: { vertical: 'center' as const, wrapText: true },
      border: allBorders,
      ...(zebra ? { fill: { fgColor: { rgb: ZEBRA } } } : {}),
    };
    const mono = (bold = false, color = '1E293B') => ({
      ...base,
      font: { sz: 10, name: 'Consolas', bold, color: { rgb: color } },
    });
    const center = { ...base, alignment: { horizontal: 'center' as const, vertical: 'center' as const } };
    const [mtColor, mtFill] = matchTypeColors(it.matchType);

    aoa.push([
      { v: idx + 1, t: 'n', s: center },
      { v: it.brand || '', t: 's', s: center },
      { v: it.competitorModel, t: 's', s: mono() },
      { v: it.airtacCode, t: 's', s: mono(true, BRAND) },
      { v: it.description || '', t: 's', s: base },
      {
        v: it.matchType || '', t: 's',
        s: {
          ...center,
          font: { sz: 10, bold: true, name: 'Microsoft JhengHei', color: { rgb: mtColor } },
          fill: { fgColor: { rgb: mtFill } },
        },
      },
      it.matchPercentage !== undefined
        ? { v: it.matchPercentage, t: 'n', s: { ...center, font: { ...center.font, sz: 10, name: 'Consolas' } } }
        : { v: '', t: 's', s: center },
      { v: it.note || '', t: 's', s: { ...base, font: { sz: 9.5, name: 'Microsoft JhengHei', color: { rgb: '64748B' } } } },
      { v: new Date(it.confirmedAt).toLocaleString('zh-TW'), t: 's', s: { ...center, font: { sz: 9, name: 'Microsoft JhengHei', color: { rgb: '64748B' } } } },
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: HEADERS.length - 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: HEADERS.length - 1 } },
  ];
  ws['!cols'] = [
    { wch: 6 }, { wch: 10 }, { wch: 24 }, { wch: 24 },
    { wch: 34 }, { wch: 11 }, { wch: 10 }, { wch: 28 }, { wch: 18 },
  ];
  ws['!rows'] = [{ hpt: 30 }, { hpt: 16 }, { hpt: 22 }, ...items.map(() => ({ hpt: 20 }))];
  ws['!autofilter'] = { ref: `A3:${XLSX.utils.encode_col(HEADERS.length - 1)}${aoa.length}` } as any;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '對照確認清單');
  return wb;
}

export function exportConfirmedExcel(items: ConfirmedItem[]) {
  const wb = buildConfirmedWorkbook(items);
  const dateStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `AirTAC_對照確認清單_${dateStr}.xlsx`);
}
