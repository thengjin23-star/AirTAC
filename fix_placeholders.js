import fs from 'fs';
const file = 'src/data/catalog-solenoid-valves.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Fix 3V2M
const v3v2m = data.series.find(x => x.id === '3V2M');
if (v3v2m) {
  v3v2m.orderCodeFormat = v3v2m.orderCodeFormat.replace('{連數}', '{manifoldStations}').replace('{排氣類型}', '{exhaustType}');
}

// Fix CPV10S
const cpv10s = data.series.find(x => x.id === 'CPV10S');
if (cpv10s) {
  // Add leadCode category
  cpv10s.categories.splice(1, 0, {
    "id": "leadCode",
    "name": "出線方式",
    "options": [
      { "code": "T", "description": "集中出線" },
      { "code": "L", "description": "D-Sub插座(僅配合24V DC)" }
    ]
  });
}

// Fix CPV15S
const cpv15s = data.series.find(x => x.id === 'CPV15S');
if (cpv15s) {
  cpv15s.orderCodeFormat = cpv15s.orderCodeFormat.replace('{連數}', '{manifoldStations}');
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Placeholders fixed.');
