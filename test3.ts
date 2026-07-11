import { defaultCatalog } from './src/data/catalog';
defaultCatalog.forEach((c, i) => {
  if (c.code === undefined) {
    console.error("Missing code at index", i, c.id);
  }
  if (c.format === undefined) {
    console.error("Missing format at index", i, c.id);
  }
});
console.log("Check complete.");
