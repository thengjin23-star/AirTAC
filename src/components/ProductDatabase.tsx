import React, { useMemo, useState } from 'react';
import { Download, Trash2, Settings, Copy, Check, Code2, Search, RotateCcw, FileText } from 'lucide-react';
import { CatalogSeries, defaultCatalog } from '../data/index';
import * as XLSX from 'xlsx';

const STORAGE_KEY = 'airtac_catalogs_v32';

export function ProductDatabase() {
  const [catalogs, setCatalogs] = useState<CatalogSeries[]>(() => {
    try {
      const saved = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        const parsed: CatalogSeries[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return defaultCatalog.map(defSeries => {
            if (!defSeries) return defSeries;
            const savedSeries = parsed.find(p => p && p.id === defSeries.id);
            if (savedSeries && Array.isArray(savedSeries.categories)) {
              return {
                ...defSeries,
                categories: defSeries.categories.map(defCat => {
                  if (!defCat) return defCat;
                  const savedCat = savedSeries.categories.find(c => c && c.id === defCat.id);
                  return savedCat && Array.isArray(savedCat.options) ? { ...defCat, options: savedCat.options } : defCat;
                })
              };
            }
            return defSeries;
          }).filter(Boolean);
        }
      }
    } catch (e) {
      console.error('Failed to parse saved catalogs', e);
    }
    return defaultCatalog.filter(Boolean);
  });

  // Safe filtering of catalogs to avoid null/undefined errors
  const activeCatalogs = catalogs.filter(Boolean);

  // 1. Super Categories
  const categories = Array.from(new Set(activeCatalogs.map(c => c.category).filter(Boolean)));
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');

  const superGroups = Array.from(new Set(activeCatalogs.filter(c => c.category === selectedCategory).map(c => c.superGroup).filter(Boolean)));
  const [selectedSuperGroup, setSelectedSuperGroup] = useState<string>(superGroups[0] || '');

  // 2. Groups (Series) within selected Super Category
  const groupsInSuperGroup = Array.from(new Set(activeCatalogs.filter(c => c.superGroup === selectedSuperGroup).map(c => c.group)));
  const [selectedGroup, setSelectedGroup] = useState<string>(groupsInSuperGroup[0] || '');

  // 3. Models (Products) within selected Group
  const modelsInGroup = activeCatalogs.filter(c => c.superGroup === selectedSuperGroup && c.group === selectedGroup);
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>(modelsInGroup[0]?.id || '');

  // State for the configurator
  const [selections, setSelections] = useState<Record<string, string>>({});

  // Series search for the rules-database tab strip
  const [seriesQuery, setSeriesQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const selectedSeries = activeCatalogs.find(c => c.id === selectedSeriesId) || modelsInGroup[0] || activeCatalogs[0];

  /** 選定某個系列時，同步分類/大類/系列下拉選單，保持三層選單與內容一致。 */
  const syncToSeries = (seriesId: string) => {
    const s = activeCatalogs.find(c => c.id === seriesId);
    if (!s) return;
    setSelectedCategory(s.category);
    setSelectedSuperGroup(s.superGroup);
    setSelectedGroup(s.group);
    setSelectedSeriesId(s.id);
    setSelections({});
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newSuperGroups = Array.from(new Set(activeCatalogs.filter(c => c.category === category).map(c => c.superGroup).filter(Boolean)));
    if (newSuperGroups.length > 0) {
      const firstSuperGroup = newSuperGroups[0];
      setSelectedSuperGroup(firstSuperGroup);
      const newGroups = Array.from(new Set(activeCatalogs.filter(c => c.superGroup === firstSuperGroup).map(c => c.group)));
      if (newGroups.length > 0) {
        const firstGroup = newGroups[0];
        setSelectedGroup(firstGroup);
        const newModels = activeCatalogs.filter(c => c.superGroup === firstSuperGroup && c.group === firstGroup);
        if (newModels.length > 0) {
          setSelectedSeriesId(newModels[0].id);
          setSelections({});
        }
      }
    }
  };

  const handleSuperGroupChange = (superGroup: string) => {
    setSelectedSuperGroup(superGroup);
    const newGroups = Array.from(new Set(activeCatalogs.filter(c => c.superGroup === superGroup).map(c => c.group)));
    if (newGroups.length > 0) {
      const firstGroup = newGroups[0];
      setSelectedGroup(firstGroup);
      const newModels = activeCatalogs.filter(c => c.superGroup === superGroup && c.group === firstGroup);
      if (newModels.length > 0) {
        setSelectedSeriesId(newModels[0].id);
        setSelections({});
      }
    }
  };

  const handleGroupChange = (group: string) => {
    setSelectedGroup(group);
    const newModels = activeCatalogs.filter(c => c.superGroup === selectedSuperGroup && c.group === group);
    if (newModels.length > 0) {
      setSelectedSeriesId(newModels[0].id);
      setSelections({});
    }
  };

  const handleExport = () => {
    const workbook = XLSX.utils.book_new();
    const usedNames = new Set<string>();

    // Export each series as a separate sheet, mapping its rules
    activeCatalogs.forEach(series => {
      const rows: any[] = [];

      const maxOptions = Math.max(...series.categories.map(c => c.options ? c.options.length : 0), 0);

      for (let i = 0; i < maxOptions; i++) {
        const row: any = {};
        series.categories.forEach(cat => {
          const opt = cat.options ? cat.options[i] : undefined;
          row[`${cat.name}代碼`] = opt ? (opt.code === '' ? '(空白)' : opt.code) : '';
          row[`${cat.name}說明`] = opt ? opt.description : '';
        });
        rows.push(row);
      }

      // Excel sheet 名稱限 31 字元且不可重複
      let sheetName = (series.code || series.id).replace(/[\\/?*\[\]:]/g, '-').slice(0, 28) || series.id.slice(0, 28);
      let suffix = 1;
      while (usedNames.has(sheetName)) {
        sheetName = `${sheetName.slice(0, 25)}_${suffix++}`;
      }
      usedNames.add(sheetName);

      const worksheet = XLSX.utils.json_to_sheet(rows);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

    XLSX.writeFile(workbook, 'AirTAC_Ordering_Rules.xlsx');
  };

  const handleResetDefaults = () => {
    if (!window.confirm('確定要捨棄所有本機修改，恢復為預設型錄資料嗎？')) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setCatalogs(defaultCatalog.filter(Boolean));
  };

  const generateOrderingCode = () => {
    if (!selectedSeries) return '';
    let code = selectedSeries.format || selectedSeries.orderCodeFormat || '';

    // Check if there is a category with id 'code'. If not, replace {code} with series code
    const hasCodeCategory = selectedSeries.categories.some(c => c.id === 'code');
    if (!hasCodeCategory) {
      code = code.replace('{code}', selectedSeries.code !== undefined ? selectedSeries.code : (selectedSeries.id || ''));
    }

    selectedSeries.categories.forEach(cat => {
      const val = selections[cat.id];
      code = code.replace(`{${cat.id}}`, val !== undefined ? val : (cat.options?.[0]?.code || ''));
    });

    // Clean up formatting
    code = code.replace(/\s+/g, ' ')
               .replace(/-\s*-/g, '-')
               .replace(/\s+-/g, '-')
               .replace(/-\s+/g, '-')
               .trim();
    if (code.endsWith('-')) code = code.slice(0, -1);

    return code;
  };

  const handleSelectionChange = (categoryId: string, value: string) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: value
    }));
  };

  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogs));
      }
    } catch (e) {
      console.warn('Failed to save catalogs to localStorage:', e);
      // Self-healing: Clean up older airtac keys to free up space
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const keysToRemove: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('airtac_catalogs_') && key !== STORAGE_KEY) {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach(k => {
            try {
              localStorage.removeItem(k);
            } catch (err) {}
          });
          // Try saving one more time after cleanup
          localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogs));
        }
      } catch (retryError) {
        console.error('Retry saving after cleanup also failed:', retryError);
      }
    }
  }, [catalogs]);

  /** 分頁列顯示的系列：有搜尋字串時全庫模糊搜尋，否則只顯示目前群組內的系列。 */
  const tabSeries = useMemo(() => {
    const q = seriesQuery.trim().toLowerCase();
    if (!q) {
      return activeCatalogs.filter(c => c.superGroup === selectedSuperGroup && c.group === selectedGroup);
    }
    return activeCatalogs
      .filter(c =>
        (c.code || '').toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        (c.name || '').toLowerCase().includes(q) ||
        (c.group || '').toLowerCase().includes(q)
      )
      .slice(0, 40);
  }, [seriesQuery, activeCatalogs, selectedSuperGroup, selectedGroup]);

  const orderingCode = generateOrderingCode();

  return (
    <div className="space-y-6">
      {/* Configurator Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-6 border-b border-slate-100 bg-[#005a9c]/5">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-[#005a9c] p-2 rounded-lg text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">訂購碼產生器</h2>
              <p className="text-slate-500 text-sm">透過下拉選單動態配置，自動生成符合規範的訂購碼</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">產品類別 (大項目)</label>
              <select
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">產品大類 (超大類別)</label>
              <select
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
                value={selectedSuperGroup}
                onChange={(e) => handleSuperGroupChange(e.target.value)}
              >
                {superGroups.map(sg => (
                  <option key={sg} value={sg}>{sg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">產品系列</label>
              <select
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
                value={selectedGroup}
                onChange={(e) => handleGroupChange(e.target.value)}
              >
                {groupsInSuperGroup.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">產品型號 (品項)</label>
              <select
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
                value={selectedSeriesId}
                onChange={(e) => {
                  setSelectedSeriesId(e.target.value);
                  setSelections({});
                }}
              >
                {modelsInGroup.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.code || cat.id} - {cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 系列摘要資訊 */}
          {selectedSeries && (selectedSeries.format || selectedSeries.orderCodeFormat || selectedSeries.workingPressureRange || selectedSeries.note || selectedSeries.sourceFile) && (
            <div className="mb-6 bg-slate-50/70 rounded-xl border border-slate-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-500">
              {(selectedSeries.format || selectedSeries.orderCodeFormat) && (
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold text-slate-600 shrink-0">訂購碼格式:</span>
                  <span className="font-mono break-all">{selectedSeries.format || selectedSeries.orderCodeFormat}</span>
                </div>
              )}
              {selectedSeries.workingPressureRange && (
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold text-slate-600 shrink-0">使用壓力範圍:</span>
                  <span>{selectedSeries.workingPressureRange}</span>
                </div>
              )}
              {selectedSeries.note && (
                <div className="flex items-start gap-1.5 md:col-span-2">
                  <span className="font-semibold text-slate-600 shrink-0">備註:</span>
                  <span>{selectedSeries.note}</span>
                </div>
              )}
              {selectedSeries.sourceFile && (
                <div className="flex items-start gap-1.5 md:col-span-2">
                  <FileText className="w-3.5 h-3.5 shrink-0 mt-px" />
                  <span className="font-semibold text-slate-600 shrink-0">型錄來源:</span>
                  <span className="font-mono break-all">{selectedSeries.sourceFile}</span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {selectedSeries.categories.map(category => (
              <div key={category.id}>
                <label className="block text-sm font-medium text-slate-700 mb-2">{category.name}</label>
                <select
                  className="w-full bg-white border border-slate-200 text-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
                  value={selections[category.id] !== undefined ? selections[category.id] : (category.options?.[0]?.code || '')}
                  onChange={(e) => handleSelectionChange(category.id, e.target.value)}
                >
                  {(category.options || []).map((opt, idx) => (
                    <option key={idx} value={opt.code}>
                      {opt.code === '' ? '(空白)' : opt.code} - {opt.description}
                    </option>
                  ))}
                </select>
                {category.note && <p className="text-[11px] text-slate-400 mt-1 leading-snug">{category.note}</p>}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 rounded-xl border border-slate-200 text-center">
            <p className="text-sm text-slate-500 mb-2 font-medium tracking-wide">生成的完整訂購碼</p>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-3xl font-bold text-[#005a9c] tracking-wider font-mono break-all">
                {orderingCode}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(orderingCode).then(() => {
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 1500);
                  }).catch(() => {});
                }}
                className={`p-2 rounded-lg transition-colors shrink-0 ${copiedCode ? 'text-green-600 bg-green-50' : 'text-slate-400 hover:text-[#005a9c] hover:bg-blue-50'}`}
                title={copiedCode ? '已複製' : '複製訂購碼'}
              >
                {copiedCode ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Database Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
             <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">全局資料庫選項管理</h2>
              <p className="text-slate-500 text-sm mt-0.5">分頁總覽各系列產品，提供類似 Excel 的直覺編輯體驗 (修改僅存於本機瀏覽器)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDefaults}
              className="px-4 py-2 bg-white text-slate-600 hover:text-red-600 hover:border-red-200 border border-slate-200 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm"
              title="捨棄本機修改，恢復預設型錄"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              恢復預設值
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm"
            >
              <Download className="w-4 h-4 mr-1.5" />
              匯出全局規格 Excel
            </button>
          </div>
        </div>

        {/* 系列搜尋 + 分頁列 */}
        <div className="px-4 pt-3 bg-slate-50/50 border-b border-slate-200">
          <div className="relative max-w-sm mb-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={seriesQuery}
              onChange={(e) => setSeriesQuery(e.target.value)}
              placeholder={`搜尋全部 ${activeCatalogs.length} 個系列 (代碼/名稱)…`}
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c] placeholder-slate-400"
            />
          </div>
          <div className="flex overflow-x-auto scrollbar-thin -mx-2 px-2">
            {tabSeries.length === 0 && (
              <span className="text-sm text-slate-400 px-3 py-3">找不到符合「{seriesQuery}」的系列</span>
            )}
            {tabSeries.map(series => (
              <button
                key={series.id}
                onClick={() => syncToSeries(series.id)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  selectedSeriesId === series.id
                    ? 'border-[#005a9c] text-[#005a9c] bg-white shadow-sm'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
                title={series.name}
              >
                {series.code || series.id}
                {seriesQuery && <span className="ml-1.5 text-[10px] text-slate-400">{series.group}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto max-h-[600px] relative bg-white">
          <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 sticky top-0 z-10 shadow-sm">
              <tr>
                {selectedSeries.categories.map(cat => (
                  <th key={cat.id} colSpan={2} className="px-4 py-2 font-medium border-b border-r border-slate-200 text-center bg-slate-100">
                    <div className="flex items-center justify-center">
                      <span>{cat.name}</span>
                      <button
                        onClick={() => {
                          const newCatalogs = [...catalogs];
                          const s = newCatalogs.find(x => x.id === selectedSeries.id)!;
                          const c = s.categories.find(x => x.id === cat.id)!;
                          if (!c.options) c.options = [];
                          c.options.push({ code: '', description: '新增選項' });
                          setCatalogs(newCatalogs);
                        }}
                        className="ml-2 text-xs text-[#005a9c] hover:text-[#004880] font-medium bg-blue-50 px-2 py-0.5 rounded border border-blue-200 transition-colors hover:bg-blue-100"
                      >
                        + 新增
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
              <tr>
                {selectedSeries.categories.map(cat => (
                  <React.Fragment key={`${cat.id}-header`}>
                    <th className="px-3 py-2 font-medium border-b border-r border-slate-200 bg-slate-50 w-[100px]">代碼</th>
                    <th className="px-3 py-2 font-medium border-b border-r border-slate-200 bg-slate-50 min-w-[150px]">說明</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: Math.max(...selectedSeries.categories.map(c => c.options?.length || 0), 0) }).map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50/50">
                  {selectedSeries.categories.map(cat => {
                    const opt = cat.options ? cat.options[rowIndex] : undefined;
                    return (
                      <React.Fragment key={`${cat.id}-${rowIndex}`}>
                        <td className="px-2 py-1 border-r border-slate-100 relative group">
                          {opt ? (
                            <input
                              className="w-full font-mono border border-transparent hover:border-slate-300 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c] rounded px-1.5 py-1 text-slate-700 transition-colors bg-transparent focus:bg-white"
                              value={opt.code}
                              onChange={(e) => {
                                const newCatalogs = [...catalogs];
                                const s = newCatalogs.find(x => x.id === selectedSeries.id)!;
                                const c = s.categories.find(x => x.id === cat.id)!;
                                if (c.options && c.options[rowIndex]) {
                                  c.options[rowIndex].code = e.target.value;
                                }
                                setCatalogs(newCatalogs);
                              }}
                              placeholder="(空白)"
                            />
                          ) : <span className="text-transparent select-none block w-full h-full">-</span>}
                        </td>
                        <td className="px-2 py-1 border-r border-slate-200 relative group">
                          {opt ? (
                            <div className="flex items-center justify-between">
                              <input
                                className="w-full border border-transparent hover:border-slate-300 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c] rounded px-1.5 py-1 text-slate-700 transition-colors bg-transparent focus:bg-white"
                                value={opt.description}
                                onChange={(e) => {
                                  const newCatalogs = [...catalogs];
                                  const s = newCatalogs.find(x => x.id === selectedSeries.id)!;
                                  const c = s.categories.find(x => x.id === cat.id)!;
                                  if (c.options && c.options[rowIndex]) {
                                    c.options[rowIndex].description = e.target.value;
                                  }
                                  setCatalogs(newCatalogs);
                                }}
                              />
                              <button
                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 ml-1 p-1 rounded hover:bg-red-50 transition-opacity flex-shrink-0"
                                onClick={() => {
                                  const newCatalogs = [...catalogs];
                                  const s = newCatalogs.find(x => x.id === selectedSeries.id)!;
                                  const c = s.categories.find(x => x.id === cat.id)!;
                                  if (c.options) {
                                    c.options = c.options.filter((_, i) => i !== rowIndex);
                                  }
                                  setCatalogs(newCatalogs);
                                }}
                                title="刪除"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : <span className="text-transparent select-none block w-full h-full">-</span>}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
