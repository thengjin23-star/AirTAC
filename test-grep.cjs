const fs = require('fs');
const jsCode = fs.readFileSync(fs.readdirSync('dist/assets').filter(f => f.endsWith('.js')).map(f => 'dist/assets/'+f)[0], 'utf8');
const regex = /fetch\s*=/g;
let match;
while ((match = regex.exec(jsCode)) !== null) {
  console.log('Found fetch= :', jsCode.substring(match.index - 30, match.index + 50));
}
