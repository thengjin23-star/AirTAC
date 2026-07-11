const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

// Add category to the interface
content = content.replace(
  'export interface CatalogSeries {\n  superGroup: string;\n  id: string;',
  'export interface CatalogSeries {\n  category: string;\n  superGroup: string;\n  id: string;'
);

// We need to figure out how to add category: '執行元件' to everything, except maybe '氣缸附件' which goes to '輔助元件'.
// Using regex to add category property based on superGroup

content = content.replace(/superGroup:\s*'([^']+)',/g, (match, superGroup) => {
  let category = '執行元件';
  if (superGroup === '氣缸附件') {
    category = '輔助元件';
  }
  return `category: '${category}',\n    ${match}`;
});

fs.writeFileSync('src/data/catalog.ts', content);
console.log('Added categories');
