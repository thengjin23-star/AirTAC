import { defaultCatalog } from './src/data/catalog';
console.log("Loaded defaultCatalog length:", defaultCatalog.length);
defaultCatalog.forEach((c, i) => {
  if (!c.id || !c.category || !c.superGroup || !c.group || !c.categories) {
    console.error("Missing fields at index", i, c.id);
  }
});
