const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf8');

const targetGroups = [
  "4SV系列底座", "4STV系列底座", "6STV系列底座", "7SV系列底座", "6SV系列底座", 
  "CPV10S系列底座", "CPV15S系列底座", "3V2M系列底座", "底座盲板組件", 
  "3V系列底座", "3V系列底座盲板", "4V系列底座", "4V系列底座盲板", 
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
    item = item.replace(/superGroup:\s*["']電磁閥["']/, 'superGroup: "電磁閥底座與配件"');
  }

  // Also replace any existing "電磁閥底座與配件" to "電磁閥底座和配件" just to match user's wording perfectly if we want. Let's just use "電磁閥底座和配件"
  if (isTarget) {
     item = item.replace(/superGroup:\s*["']電磁閥底座與配件["']/, 'superGroup: "電磁閥底座和配件"');
  }
  
  newContent += content.substring(lastIndex, match.index) + item;
  lastIndex = regex.lastIndex;
}

newContent += content.substring(lastIndex);

// global replace of "電磁閥底座與配件" to "電磁閥底座和配件" to be safe
newContent = newContent.replace(/電磁閥底座與配件/g, "電磁閥底座和配件");

fs.writeFileSync('src/data/catalog.ts', newContent);
