const fs = require('fs');

let content = fs.readFileSync('src/components/ProductDatabase.tsx', 'utf-8');

// Update states
content = content.replace(
  /const superGroups = Array\.from\(new Set\(catalogs\.map\(c => c\.superGroup\)\.filter\(Boolean\)\)\);/,
  `const categories = Array.from(new Set(catalogs.map(c => c.category).filter(Boolean)));
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');
  
  const superGroups = Array.from(new Set(catalogs.filter(c => c.category === selectedCategory).map(c => c.superGroup).filter(Boolean)));`
);

content = content.replace(
  /const handleSuperGroupChange = \(superGroup: string\) => \{/,
  `const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newSuperGroups = Array.from(new Set(catalogs.filter(c => c.category === category).map(c => c.superGroup).filter(Boolean)));
    if (newSuperGroups.length > 0) {
      const firstSuperGroup = newSuperGroups[0];
      setSelectedSuperGroup(firstSuperGroup);
      const newGroups = Array.from(new Set(catalogs.filter(c => c.superGroup === firstSuperGroup).map(c => c.group)));
      if (newGroups.length > 0) {
        const firstGroup = newGroups[0];
        setSelectedGroup(firstGroup);
        const newModels = catalogs.filter(c => c.superGroup === firstSuperGroup && c.group === firstGroup);
        if (newModels.length > 0) {
          setSelectedSeriesId(newModels[0].id);
          setSelections({});
        }
      }
    }
  };

  const handleSuperGroupChange = (superGroup: string) => {`
);

// Add the new dropdown to UI
content = content.replace(
  /(\s*)<div>\s*<label className="block text-sm font-medium text-slate-700 mb-2">產品大類 \(超大類別\)/,
  `$1<div>
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
            </div>$1<div>
              <label className="block text-sm font-medium text-slate-700 mb-2">產品大類 (超大類別)`
);

// And also replace grid-cols-1 md:grid-cols-3 to md:grid-cols-4 for the layout
content = content.replace(/grid-cols-1 md:grid-cols-3 gap-6 mb-8/, 'grid-cols-1 md:grid-cols-4 gap-6 mb-8');

// Replace local storage version to force state refresh
content = content.replace(/airtac_catalogs_v16/g, 'airtac_catalogs_v17');

fs.writeFileSync('src/components/ProductDatabase.tsx', content);
console.log('Updated UI!');
