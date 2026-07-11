const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}
const files = walk('./src');
const imports = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (!match[1].startsWith('.')) {
      imports.add(match[1]);
    }
  }
});
console.log(Array.from(imports));
