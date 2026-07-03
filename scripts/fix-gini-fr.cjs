const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "dashboard-i18n.js");
let s = fs.readFileSync(p, "utf8");
s = s.replace(
  /Le graphique du coefficient de Gini se trouve dans l[\u2019']onglet Qualité de vie — ancré WDI/,
  "Le graphique du coefficient de Gini se trouve dans l'onglet <strong>Qualité de vie</strong> — ancré WDI",
);
fs.writeFileSync(p, s);
console.log("Updated gini FR string");
