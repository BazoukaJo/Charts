/**
 * Smoke tests for ChartsOverview pure helpers (continent grouping, shares, squarify).
 * Run from charts/: node scripts/overview-smoke-test.mjs
 *
 * Note: apps/web is "type": "module", so dashboard-overview.js is not a CJS export —
 * we evaluate it in a VM sandbox (same IIFE the browser runs).
 */
import fs from "fs";
import path from "path";
import assert from "assert";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const overviewPath = path.join(__dirname, "..", "dashboard-overview.js");
const code = fs.readFileSync(overviewPath, "utf8");

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  document: undefined,
  fetch: undefined,
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.runInNewContext(code, sandbox, { filename: overviewPath });
const ChartsOverview = sandbox.ChartsOverview;
if (!ChartsOverview || typeof ChartsOverview.squarify !== "function") {
  throw new Error("Failed to evaluate ChartsOverview from " + overviewPath);
}

let failed = 0;
function check(name, fn) {
  try {
    fn();
    console.log("ok  -", name);
  } catch (err) {
    failed++;
    console.error("FAIL -", name);
    console.error("   ", err.message);
  }
}

check("continent map covers all listed countries uniquely", () => {
  const map = ChartsOverview.CONTINENT_BY_COUNTRY;
  const continents = new Set(ChartsOverview.CONTINENTS);
  Object.keys(map).forEach((c) => {
    assert.ok(continents.has(map[c]), c + " → " + map[c]);
  });
  assert.strictEqual(map.Indonesia, "Asia");
  assert.strictEqual(map.Pakistan, "Asia");
  assert.strictEqual(map.Nigeria, "Africa");
  assert.strictEqual(map.Bangladesh, "Asia");
  assert.strictEqual(map.Ethiopia, "Africa");
  assert.strictEqual(map["United States"], "North America");
  assert.strictEqual(map.Brazil, "South America");
  assert.strictEqual(map.Australia, "Oceania");
  assert.strictEqual(map.France, "Europe");
});

check("countriesInContinent filters correctly", () => {
  sandbox.COUNTRIES = [
    "Nigeria",
    "France",
    "China",
    "Brazil",
    "Canada",
    "Australia",
  ];
  const africa = ChartsOverview.countriesInContinent("Africa");
  assert.deepStrictEqual(africa, ["Nigeria"]);
  const all = ChartsOverview.countriesInContinent("All");
  assert.strictEqual(all.length, 6);
});

check("getShareValues ratios sum to 1", () => {
  sandbox.DATA = {
    gdp: {
      A: [1, 2, 3],
      B: [1, 1, 1],
      C: [0, 0, 6],
    },
    demographics: {
      populationTotal: {
        A: [10, 20],
        B: [30, 30],
        C: [40, 50],
      },
    },
  };
  const shares = ChartsOverview.getShareValues(["A", "B", "C"], "population");
  const sum = shares.reduce((s, r) => s + r.share, 0);
  assert.ok(Math.abs(sum - 1) < 1e-9, "share sum " + sum);
  assert.strictEqual(shares.find((r) => r.name === "C").value, 50);
  const gdp = ChartsOverview.getShareValues(["A", "B", "C"], "gdp");
  assert.strictEqual(gdp.find((r) => r.name === "C").value, 6);
  assert.ok(Math.abs(gdp.reduce((s, r) => s + r.share, 0) - 1) < 1e-9);
});

check("squarify fills area and preserves values", () => {
  const items = [
    { name: "a", value: 60, color: "#111" },
    { name: "b", value: 30, color: "#222" },
    { name: "c", value: 10, color: "#333" },
  ];
  const rects = ChartsOverview.squarify(items, 0, 0, 100, 100);
  assert.strictEqual(rects.length, 3);
  const area = rects.reduce((s, r) => s + r.width * r.height, 0);
  assert.ok(Math.abs(area - 10000) < 1, "area " + area);
  const byName = Object.fromEntries(rects.map((r) => [r.name, r]));
  assert.ok(byName.a.value === 60);
  assert.ok(byName.a.width * byName.a.height > byName.b.width * byName.b.height);
});

check("geojson asset exists and includes key ISO codes", () => {
  const geoPath = path.join(__dirname, "..", "world-map.geojson");
  assert.ok(fs.existsSync(geoPath), "world-map.geojson missing");
  const geo = JSON.parse(fs.readFileSync(geoPath, "utf8"));
  const isos = new Set(geo.features.map((f) => f.properties.iso));
  ["USA", "CHN", "IDN", "NGA", "PAK", "BGD", "ETH", "FRA"].forEach((iso) => {
    assert.ok(isos.has(iso), "missing " + iso);
  });
});

if (failed) {
  console.error("\n" + failed + " test(s) failed");
  process.exit(1);
}
console.log("\nAll overview smoke tests passed.");
