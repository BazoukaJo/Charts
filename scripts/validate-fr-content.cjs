const fs = require("fs");
const path = require("path");
const vm = require("vm");
const code = fs.readFileSync(
  path.join(__dirname, "..", "dashboard-i18n-fr-content.js"),
  "utf8",
);
const sandbox = {};
sandbox.window = sandbox;
vm.runInNewContext(code, sandbox);
console.log("I18N_HIST_FR:", sandbox.I18N_HIST_FR.length);
console.log("I18N_SPEC_LISTS_FR:", sandbox.I18N_SPEC_LISTS_FR.length);
