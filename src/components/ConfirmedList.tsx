import React, { useState } from 'react';
import { Download, Trash2, ClipboardList, Copy, Check, AlertTriangle, Cloud, HardDrive } from 'lucide-react';
import type { ConfirmedItem } from '../types';
import * as XLSX from 'xlsx';

const MATCH_TYPE_BADGE: Record<string, string> = {
  '直接替換': 'bg-green-50 text-green-700 border-green-200',
  '相似替代': 'bg-amber-50 text-amber-700 border-amber-200',
};

/** 確認清單：所有經人工確認的對照項目，支援編輯備註/訂購碼、刪除與匯出 Excel */
export function ConfirmedList({ items, onUpdate, onRemove, onClear, cloudMode }: {
  items: ConfirmedItem[];
  onUpdate: (id: string, patch: Partial<ConfirmedItem>) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  cloudMode?: boolean;
}) {
  const [copiedAll, setCopiedAll] = useState(false);

  const updateItem = onUpdate;
  const removeItem = onRemove;

  const clearAll = () => {
    if (window.confirm(`確定要清空全部 ${items.length} 筆確認清單嗎？此動作無法復原。`)) {
      onClear();
    }
  };

  const exportExcel = () => {
    const rows = items.map((it, idx) => ({
      '序號': idx + 1,
      '競品品牌': it.brand,
      '競品型號': it.competitorModel,
      'AirTAC 訂購碼': it.airtacCode,
      '產品描述': it.description,
      '匹配類型': it.matchType,
      '匹配度(%)': it.matchPercentage ?? '',
      '備註': it.note,
      '確認時間': new Date(it.confirmedAt).toLocaleString('zh-TW'),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 6 }, { wch: 10 }, { wch: 26 }, { wch: 26 },
      { wch: 30 }, { wch: 10 }, { wch: 10 }, { wch: 30 }, { wch: 20 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '對照確認清單');
    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `AirTAC_對照確認清單_${dateStr}.xlsx`);
  };

  const copyAsTable = () => {
    const header = ['競品品牌', '競品型號', 'AirTAC 訂購碼', '產品描述', '匹配類型', '備註'].join('\t');
    const lines = items.map(it => [it.brand, it.competitorModel, it.airtacCode, it.description, it.matchType, it.note].join('\t'));
    navigator.clipboard.writeText([header, ...lines].join('\n')).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    }).catch(() => {});
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="bg-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">確認清單是空的</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          到「型號自動匹配」分頁分析競品型號後，檢查 AI 給的訂購碼（可直接修改），按「確認並加入清單」，確認過的項目就會集中到這裡，最後一次匯出 Excel。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="bg-[#005a9c]/10 p-2 rounded-lg text-[#005a9c]">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">對照確認清單 ({items.length})</h2>
            <p className="text-slate-500 text-sm mt-0.5">已人工確認的對照結果，可在此繼續修改訂購碼與備註</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={copyAsTable} className="px-3.5 py-2 bg-white text-slate-600 border border-slate-200 hover:border-[#005a9c] hover:text-[#005a9c] rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            {copiedAll ? <Check className="w-4 h-4 mr-1.5 text-green-600" /> : <Copy className="w-4 h-4 mr-1.5" />}
            複製為表格
          </button>
          <button onClick={exportExcel} className="px-3.5 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <Download className="w-4 h-4 mr-1.5" />
            匯出 Excel
          </button>
          <button onClick={clearAll} className="px-3.5 py-2 bg-white text-slate-500 hover:text-red-600 hover:border-red-200 border border-slate-200 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <Trash2 className="w-4 h-4 mr-1.5" />
            清空
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold w-10">#</th>
              <th className="px-4 py-3 font-semibold">競品型號</th>
              <th className="px-4 py-3 font-semibold">AirTAC 訂購碼</th>
              <th className="px-4 py-3 font-semibold hidden lg:table-cell">描述</th>
              <th className="px-4 py-3 font-semibold">類型</th>
              <th className="px-4 py-3 font-semibold hidden md:table-cell">備註</th>
              <th className="px-4 py-3 font-semibold w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((it, idx) => (
              <tr key={it.id} className="hover:bg-slate-50/50 align-top">
                <td className="px-4 py-3 text-slate-400 tabular-nums">{idx + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-mono text-slate-700 break-all">{it.competitorModel}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{it.brand}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <input
                      value={it.airtacCode}
                      onChange={(e) => updateItem(it.id, { airtacCode: e.target.value })}
                      className="font-mono font-semibold text-[#005a9c] bg-transparent border border-transparent hover:border-slate-300 focus:border-[#005a9c] focus:bg-white focus:ring-1 focus:ring-[#005a9c]/30 rounded px-2 py-1 w-full min-w-[140px] transition-colors outline-none"
                    />
                  </div>
                  {it.matchPercentage !== undefined && (
                    <div className="text-[11px] text-slate-400 mt-0.5 pl-2">匹配度 {it.matchPercentage}%</div>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 hidden lg:table-cell max-w-[220px]">{it.description}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border whitespace-nowrap ${MATCH_TYPE_BADGE[it.matchType] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                    {it.matchType}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <input
                    value={it.note}
                    onChange={(e) => updateItem(it.id, { note: e.target.value })}
                    placeholder="備註…"
                    className="text-xs text-slate-600 bg-transparent border border-transparent hover:border-slate-300 focus:border-[#005a9c] focus:bg-white rounded px-2 py-1 w-full min-w-[120px] transition-colors outline-none placeholder-slate-300"
                  />
                  {it.note === '訂購碼經人工修改' && (
                    <span className="text-[10px] text-amber-500 flex items-center mt-0.5"><AlertTriangle className="w-3 h-3 mr-0.5" />人工修改過</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => removeItem(it.id)} className="text-slate-300 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors" title="刪除此筆">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-1.5">
        {cloudMode ? (
          <><Cloud className="w-3.5 h-3.5 text-[#005a9c]" /> <span className="text-[#005a9c] font-medium">雲端共用模式</span>：全公司共用同一份清單，跨裝置同步。</>
        ) : (
          <><HardDrive className="w-3.5 h-3.5" /> 本機模式：清單只存在此瀏覽器，換裝置不會同步；重要清單請匯出 Excel。</>
        )}
      </div>
    </div>
  );
}
