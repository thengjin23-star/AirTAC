const fs = require('fs');
const jsCode = fs.readFileSync(fs.readdirSync('dist/assets').filter(f => f.endsWith('.js')).map(f => 'dist/assets/'+f)[0], 'utf8');
const index = jsCode.indexOf('fetch=');
if (index !== -1) {
  console.log('Found fetch=', jsCode.substring(index - 50, index + 50));
}
const index2 = jsCode.indexOf('.fetch=');
if (index2 !== -1) {
  console.log('Found .fetch=', jsCode.substring(index2 - 50, index2 + 50));
}
const index3 = jsCode.indexOf('fetch =');
if (index3 !== -1) {
  console.log('Found fetch =', jsCode.substring(index3 - 50, index3 + 50));
}
