const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "dashboard-i18n.js");
let s = fs.readFileSync(p, "utf8");
const insertEn =
  " Les onglets étendus ajoutent ~90 séries WDI supplémentaires (gouvernance WGI, pauvreté, dette, IDE, énergie, travail, brevets, etc.) selon les mêmes règles de fusion.";
const insertBadge =
  " ; <strong>Partiel (Edelman)</strong> pour les ancrages confiance médias à partir de 2012";
if (!s.includes("Les onglets étendus ajoutent")) {
  s = s.replace(
    /immigration par habitant\)\. La balance commerciale est exportations moins importations\./,
    "immigration par habitant)." + insertEn + " La balance commerciale est exportations moins importations.",
  );
}
if (!s.includes("Partiel (Edelman)</strong> pour les ancrages")) {
  s = s.replace(
    /<strong>WDI partiel<\/strong> si la requête a échoué pour cette série\. <strong>Si vous ouvrez/,
    "<strong>WDI partiel</strong> si la requête a échoué pour cette série" +
      insertBadge +
      ". <strong>Si vous ouvrez",
  );
}
fs.writeFileSync(p, s);
console.log("Updated FR provenance");
