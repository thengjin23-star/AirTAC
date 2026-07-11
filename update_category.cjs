const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

// The cylinder accessories might have category: '輔助元件'
// we want them to have category: '執行元件'

content = content.replace(/category:\s*'輔助元件'/g, "category: '執行元件'");

fs.writeFileSync('src/data/catalog.ts', content);
console.log('Category updated');
