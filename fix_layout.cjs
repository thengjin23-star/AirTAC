const fs = require('fs');
let content = fs.readFileSync('src/components/ProductDatabase.tsx', 'utf-8');
content = content.replace(/grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8/, 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8');
content = content.replace(/airtac_catalogs_v17/g, 'airtac_catalogs_v18');
fs.writeFileSync('src/components/ProductDatabase.tsx', content);
console.log('Fixed layout');
