import { defaultCatalog } from './src/data/catalog';
defaultCatalog.forEach((c, i) => {
  c.categories.forEach((cat, j) => {
    if (!cat.options) {
      console.error("Missing options at index", i, "category", j, c.id);
    }
  });
});
console.log("Check complete.");
