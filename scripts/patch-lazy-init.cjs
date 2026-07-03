const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(file, "utf8");

const start = html.indexOf("function initializeAllCharts(");
const end = html.indexOf("\nfunction updateAllCharts()", start);
if (start === -1 || end === -1) {
  console.error("Could not find initializeAllCharts block");
  process.exit(1);
}

let block = html.slice(start, end);

if (block.includes("function ic(")) {
  console.log("Already patched");
  process.exit(0);
}

block = block.replace(
  "function initializeAllCharts() {",
  `function initializeAllCharts(filterTab) {
    if (!window.__chartTabMap) {
        window.__chartTabMap = {};
        document.querySelectorAll('div[id^="tab-"]').forEach(function (tab) {
            tab.querySelectorAll('canvas[id]').forEach(function (c) {
                window.__chartTabMap[c.id] = tab.id;
            });
        });
    }
    function ic(chartId, data, options) {
        if (charts[chartId]) return charts[chartId];
        if (filterTab && window.__chartTabMap[chartId] !== filterTab) return null;
        return createChart(chartId, data, options);
    }`,
);

block = block.replace(/\bcreateChart\(/g, "ic(");
// Restore createChart inside ic() wrapper
block = block.replace(
  /return ic\(chartId, data, options\);/,
  "return createChart(chartId, data, options);",
);
block = block.replace(
  "DashboardPhase1.initPhase1Charts(ic,",
  "DashboardPhase1.initPhase1Charts(ic,",
);
block = block.replace(
  "DashboardPhase2.initPhase2Charts(ic,",
  "DashboardPhase2.initPhase2Charts(ic,",
);

html = html.slice(0, start) + block + html.slice(end);
fs.writeFileSync(file, html);
console.log("Patched initializeAllCharts for lazy tab init");
