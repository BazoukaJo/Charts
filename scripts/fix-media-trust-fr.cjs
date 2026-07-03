const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "dashboard-i18n.js");
let s = fs.readFileSync(p, "utf8");
s = s.replace(
  /les scores de confiance sont ancrés au Trust Barometer d[\u2019']Edelman/,
  "les scores de confiance sont ancrés au <strong>Trust Barometer d'Edelman</strong>",
);
fs.writeFileSync(p, s);
console.log("Updated mediaTrustSpeech FR");
