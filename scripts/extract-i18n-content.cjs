const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

function extractBlocks(className) {
  const marker = `class="${className}"`;
  const blocks = [];
  let i = 0;
  while (i < html.length) {
    const start = html.indexOf(`<div ${marker}>`, i);
    if (start === -1) break;
    let pos = start + 5;
    let depth = 1;
    while (pos < html.length && depth > 0) {
      const nextOpen = html.indexOf("<div", pos);
      const nextClose = html.indexOf("</div>", pos);
      if (nextClose === -1) break;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        pos = nextOpen + 4;
      } else {
        depth--;
        pos = nextClose + 6;
      }
    }
    const innerStart = html.indexOf(">", start) + 1;
    const innerEnd = pos - 6;
    blocks.push(html.slice(innerStart, innerEnd).trim());
    i = pos;
  }
  return blocks;
}

const hist = extractBlocks("historical-context historical-context--below-chart");
const outDir = path.join(__dirname, "..", "scripts");
fs.writeFileSync(
  path.join(outDir, "hist-blocks-en.json"),
  JSON.stringify(hist, null, 2),
);
console.log("historical blocks:", hist.length);

// Extract speculation list HTML strings from injectEventSpeculationBlocks
const fnStart = html.indexOf("function injectEventSpeculationBlocks()");
const listsStart = html.indexOf("const lists = [", fnStart);
const listsEnd = html.indexOf("];", listsStart);
const listsBody = html.slice(listsStart + "const lists = ".length, listsEnd + 1);
let lists;
try {
  lists = Function("return " + listsBody)();
} catch (e) {
  console.error("Failed to parse lists:", e.message);
  process.exit(1);
}
fs.writeFileSync(
  path.join(outDir, "spec-lists-en.json"),
  JSON.stringify(lists, null, 2),
);
console.log("speculation lists:", lists.length);
