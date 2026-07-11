const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf8');

const targetGroups = [
  "ESV系列底座與端板", "ESV系列底座盲板", "普通線圈", "防爆線圈", "集成閥組配套線纜"
];

let items = [];
const regex = /\{\s*id:\s*["'][^"']+["'][\s\S]*?(?=\},\s*\{|\}\s*\];)/g;

let match;
let lastIndex = 0;
let newContent = "";

while ((match = regex.exec(content)) !== null) {
  let item = match[0];
  let isTarget = false;
  
  for (let group of targetGroups) {
    if (item.includes(`group: "${group}"`) || item.includes(`group: '${group}'`)) {
      isTarget = true;
      break;
    }
  }

  if (isTarget) {
    item = item.replace(/superGroup:\s*["']電磁閥["']/, 'superGroup: "電磁閥底座和配件"');
  }

  newContent += content.substring(lastIndex, match.index) + item;
  lastIndex = regex.lastIndex;
}

newContent += content.substring(lastIndex);

fs.writeFileSync('src/data/catalog.ts', newContent);
