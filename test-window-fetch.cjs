const fs = require('fs');
const jsCode = fs.readFileSync(fs.readdirSync('dist/assets').filter(f => f.endsWith('.js')).map(f => 'dist/assets/'+f)[0], 'utf8');

const _window = {
  get fetch() { return undefined; },
  set fetch(val) { throw new TypeError("Cannot set property fetch of #<Window> which has only a getter"); }
};
global.window = _window;
global.self = _window;
global.document = { createElement: () => ({ style: {} }), querySelector: () => ({}), getElementById: () => ({ appendChild: () => {}, render: () => {} }) };
global.navigator = { userAgent: '' };

try {
  eval(jsCode);
} catch (e) {
  console.log(e.stack);
}
