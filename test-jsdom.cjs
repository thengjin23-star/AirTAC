const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<body>
  <div id="root"></div>
  <script type="module" src="http://localhost:3000/@vite/client"></script>
  <script type="module" src="http://localhost:3000/src/main.tsx"></script>
</body>
</html>`, { runScripts: "dangerously", resources: "usable", url: "http://localhost:3000/" });

dom.window.Object.defineProperty(dom.window, "fetch", {
  get: () => undefined,
  set: (val) => {
    console.error("TRYING TO SET FETCH");
    console.error(new Error().stack);
  },
  configurable: false
});

dom.window.addEventListener("error", (event) => {
  console.error("Window error:", event.error);
});
setTimeout(() => {
  console.log("Done waiting");
}, 5000);
