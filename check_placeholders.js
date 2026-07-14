import fs from 'fs';
const data = JSON.parse(fs.readFileSync('src/data/catalog-air-prep.json', 'utf8'));

const allSeries = [...(data.series || data)];

allSeries.forEach(series => {
  const format = series.orderCodeFormat || series.format || '';
  if (!format) return;
  
  const placeholders = [...format.matchAll(/\{([^}]+)\}/g)].map(m => m[1]);
  const catIds = series.categories ? series.categories.map(c => c.id) : [];
  
  const missing = placeholders.filter(p => p !== 'code' && !catIds.includes(p));
  if (missing.length > 0) {
    console.log(`Series ${series.id} has missing categories for placeholders: ${missing.join(', ')}`);
  }
});
