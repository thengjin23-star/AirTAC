import { defaultCatalog } from './src/data/catalog';
const ids = new Set();
defaultCatalog.forEach((c, i) => {
  if (ids.has(c.id)) {
    console.error("Duplicate series id:", c.id);
  }
  ids.add(c.id);
  
  const catIds = new Set();
  c.categories.forEach((cat) => {
    if (catIds.has(cat.id)) {
      console.error("Duplicate category id in series", c.id, ":", cat.id);
    }
    catIds.add(cat.id);
  });
});
console.log("Check complete.");
