import { defaultCatalog } from './src/data/catalog';
let maxLen = 0;
defaultCatalog.forEach((c) => {
  c.categories.forEach((cat) => {
    if (cat.options.length > maxLen) {
      maxLen = cat.options.length;
    }
  });
});
console.log("Max options length:", maxLen);
