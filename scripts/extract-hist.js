const fs = require("fs");
const html = fs.readFileSync(
  require("path").join(__dirname, "..", "index.html"),
  "utf8",
);
const blocks = [];
const re =
  /<div class="historical-context historical-context--below-chart">([\s\S]*?)<\/div>/g;
let m;
while ((m = re.exec(html)) !== null) blocks.push(m[1].trim());
console.log("blocks", blocks.length);
blocks.forEach((b, i) => {
  const h3 = (b.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1];
  console.log(
    i,
    h3 ? h3.replace(/<[^>]+>/g, "").trim().slice(0, 90) : "?",
  );
});
