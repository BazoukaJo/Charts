const fs = require("fs");
const path = require("path");
const vm = require("vm");
const i18n = fs.readFileSync(
  path.join(__dirname, "..", "dashboard-i18n.js"),
  "utf8",
);
const sandbox = { window: {}, DashboardPhase1: undefined, DashboardPhase2: undefined };
sandbox.window = sandbox;
vm.runInNewContext(i18n, sandbox);
const ids = sandbox.DashboardI18n.chartIds;
const missing = ids.filter(function (id) {
  return (
    !sandbox.DashboardI18n.MSGS.en["ct." + id] ||
    !sandbox.DashboardI18n.MSGS.fr["ct." + id]
  );
});
console.log("chartIds:", ids.length);
console.log("missing ct keys:", missing.length, missing.slice(0, 10));
