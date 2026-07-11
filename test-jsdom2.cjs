const fs = require('fs');
const { JSDOM } = require("jsdom");
const jsCode = fs.readFileSync(fs.readdirSync('dist/assets').filter(f => f.endsWith('.js')).map(f => 'dist/assets/'+f)[0], 'utf8');

const dom = new JSDOM(`<!DOCTYPE html><html lang="en"><body><div id="root"></div></body></html>`, { runScripts: "dangerously", url: "http://localhost/" });

dom.window.Object.defineProperty(dom.window, "fetch", {
  get: () => undefined,
  set: (val) => {
    console.error("TRYING TO SET FETCH!");
    console.error(new Error().stack);
  },
  configurable: false
});

try {
  dom.window.eval(jsCode);
} catch (e) {
  console.log("Error:", e);
}
