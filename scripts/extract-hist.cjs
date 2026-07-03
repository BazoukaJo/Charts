const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const blocks = [];
const re =
  /<div class="historical-context historical-context--below-chart">([\s\S]*?)<\/div>/g;
let m;
while ((m = re.exec(html)) !== null) blocks.push(m[1].trim());
const out = path.join(__dirname, "..", "scripts", "hist-blocks-en.json");
fs.writeFileSync(out, JSON.stringify(blocks, null, 2));
console.log("Wrote", blocks.length, "blocks to", out);
