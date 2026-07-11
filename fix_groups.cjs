const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

const superGroups = [
  { match: /group: 'SC系列標準氣缸'/, sg: '標準氣缸', newG: "group: 'SC系列'" },
  { match: /group: 'SAU系列無拉杆氣缸'/, sg: '標準氣缸', newG: "group: 'SAU系列'" }
];

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('group: ')) {
    for (const sg of superGroups) {
      if (sg.match.test(lines[i])) {
        // Replace group line
        lines[i] = lines[i].replace(sg.match, sg.newG);
        // Insert superGroup before group
        lines.splice(i, 0, "    superGroup: '" + sg.sg + "',");
        i++; // skip newly inserted line
        break;
      }
    }
  }
}

fs.writeFileSync('src/data/catalog.ts', lines.join('\n'));
console.log('Done');
