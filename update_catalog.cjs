const fs = require('fs');

let content = fs.readFileSync('src/data/catalog.ts', 'utf-8');

content = content.replace(
  'export interface CatalogSeries {',
  'export interface CatalogSeries {\n  superGroup: string;'
);

const superGroups = [
  { match: /group: 'SAI系列標準氣缸.*?'/, sg: '標準氣缸', newG: "group: 'SAI系列'" },
  { match: /group: 'TSAI系列帶導向架氣缸'/, sg: '帶導向架氣缸', newG: "group: 'TSAI系列'" },
  { match: /group: 'SE系列標準氣缸.*?'/, sg: '標準氣缸', newG: "group: 'SE系列'" },
  { match: /group: 'JSI系列標準氣缸.*?'/, sg: '標準氣缸', newG: "group: 'JSI系列'" },
  { match: /group: 'SG、SGC系列標準氣缸'/, sg: '標準氣缸', newG: "group: 'SG、SGC系列'" },
  { match: /group: 'MI系列不鏽鋼迷你氣缸.*?'/, sg: '迷你氣缸', newG: "group: 'MI系列'" },
  { match: /group: 'PB系列筆形氣缸'/, sg: '迷你氣缸', newG: "group: 'PB系列'" },
  { match: /group: 'PBR系列筆形氣缸'/, sg: '迷你氣缸', newG: "group: 'PBR系列'" },
  { match: /group: 'TMI\/TMIC系列帶導向架氣缸'/, sg: '帶導向架氣缸', newG: "group: 'TMI/TMIC系列'" },
  { match: /group: 'MF系列不鏽鋼迷你氣缸.*?'/, sg: '迷你氣缸', newG: "group: 'MF系列'" },
  { match: /group: 'MA系列不鏽鋼迷你氣缸'/, sg: '迷你氣缸', newG: "group: 'MA系列'" },
  { match: /group: 'MG系列不鏽鋼迷你氣缸'/, sg: '迷你氣缸', newG: "group: 'MG系列'" },
  { match: /group: 'MBL系列鋁合金迷你氣缸'/, sg: '迷你氣缸', newG: "group: 'MBL系列'" }
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
