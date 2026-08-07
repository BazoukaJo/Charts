/**
 * Phase 1 expansion: governance, inequality, investment, energy/industry,
 * humanitarian, education & health extensions, Edelman media trust anchors.
 */
(function (global) {
  "use strict";

  function countriesRef() {
    return typeof COUNTRIES !== "undefined" ? COUNTRIES : [];
  }
  function codesRef() {
    return typeof COUNTRY_CODES !== "undefined" ? COUNTRY_CODES : {};
  }
  function yearsRef() {
    return typeof YEARS !== "undefined" ? YEARS : [];
  }
  function europeRef() {
    return typeof EUROPE_COUNTRIES !== "undefined" ? EUROPE_COUNTRIES : [];
  }

  function rnd(min, max) {
    return (min + max) / 2;
  }

  function genMetricSeries(baseByCountry, field, opts) {
    opts = opts || {};
    var trendByCode = opts.trendByCode || {};
    var defaultTrend = opts.defaultTrend || 0;
    var min = opts.min != null ? opts.min : 0;
    var max = opts.max != null ? opts.max : 100;
    var digits = opts.digits != null ? opts.digits : 1;
    var shockFn = opts.shockFn || function () { return 0; };
    var result = {};

    countriesRef().forEach(function (country) {
      var code = codesRef()[country];
      var base = baseByCountry[country] || {};
      var start = base[field] != null ? base[field] : opts.fallback || 50;
      var trend = trendByCode[code] != null ? trendByCode[code] : defaultTrend;
      result[country] = yearsRef().map(function (year, idx) {
        var v = start + (idx - 20) * trend + shockFn(code, year, idx);
        v = Math.max(min, Math.min(max, v * rnd(0.97, 1.03)));
        return parseFloat(v.toFixed(digits));
      });
    });
    return result;
  }

  var BASE1990 = {
    "United States": { ruleOfLaw: 1.4, govEff: 1.5, regQual: 1.4, voice: 1.5, womenParl: 6, poverty: 0.5, inflation: 3.2, debt: 55, fdiIn: 1.2, fdiOut: 1.8, capForm: 19, marketCap: 85, remitt: 0.1, co2Total: 5000, energyUse: 7600, fossilFuel: 85, elecRenew: 8, pm25: 12, industryPct: 22, mfgPct: 16, hiTech: 28, oda: 0.02, netMigr: 900, milPers: 1.8, protected: 13, eduPrim: 98, eduTer: 55, eduSpend: 5.0, under5: 12, matMort: 12 },
    "Canada": { ruleOfLaw: 1.6, govEff: 1.7, regQual: 1.6, voice: 1.6, womenParl: 18, poverty: 0.3, inflation: 2.8, debt: 72, fdiIn: 2.5, fdiOut: 2.8, capForm: 21, marketCap: 70, remitt: 0.05, co2Total: 450, energyUse: 8200, fossilFuel: 72, elecRenew: 62, pm25: 8, industryPct: 26, mfgPct: 14, hiTech: 18, oda: 0.01, netMigr: 220, milPers: 0.5, protected: 9, eduPrim: 99, eduTer: 52, eduSpend: 5.5, under5: 8, matMort: 6 },
    "Norway": { ruleOfLaw: 1.9, govEff: 1.9, regQual: 1.8, voice: 1.8, womenParl: 35, poverty: 0.1, inflation: 2.5, debt: 35, fdiIn: 1.5, fdiOut: 3.2, capForm: 22, marketCap: 45, remitt: 0.02, co2Total: 45, energyUse: 5800, fossilFuel: 58, elecRenew: 98, pm25: 6, industryPct: 34, mfgPct: 10, hiTech: 12, oda: 0.9, netMigr: 25, milPers: 0.8, protected: 17, eduPrim: 99, eduTer: 58, eduSpend: 6.8, under5: 5, matMort: 4 },
    "Sweden": { ruleOfLaw: 1.8, govEff: 1.8, regQual: 1.7, voice: 1.8, womenParl: 38, poverty: 0.2, inflation: 2.6, debt: 45, fdiIn: 3.5, fdiOut: 4.0, capForm: 20, marketCap: 90, remitt: 0.03, co2Total: 55, energyUse: 5600, fossilFuel: 32, elecRenew: 55, pm25: 7, industryPct: 24, mfgPct: 15, hiTech: 22, oda: 0.95, netMigr: 45, milPers: 0.4, protected: 10, eduPrim: 99, eduTer: 62, eduSpend: 6.5, under5: 4, matMort: 4 },
    "Finland": { ruleOfLaw: 1.9, govEff: 1.9, regQual: 1.8, voice: 1.8, womenParl: 33, poverty: 0.1, inflation: 2.4, debt: 18, fdiIn: 2.0, fdiOut: 3.5, capForm: 19, marketCap: 55, remitt: 0.02, co2Total: 55, energyUse: 6200, fossilFuel: 45, elecRenew: 42, pm25: 6, industryPct: 28, mfgPct: 16, hiTech: 25, oda: 0.4, netMigr: 8, milPers: 0.9, protected: 12, eduPrim: 99, eduTer: 55, eduSpend: 6.2, under5: 5, matMort: 5 },
    "United Kingdom": { ruleOfLaw: 1.6, govEff: 1.5, regQual: 1.5, voice: 1.5, womenParl: 9, poverty: 0.4, inflation: 3.5, debt: 38, fdiIn: 2.8, fdiOut: 3.5, capForm: 17, marketCap: 95, remitt: 0.08, co2Total: 550, energyUse: 3400, fossilFuel: 78, elecRenew: 8, pm25: 10, industryPct: 18, mfgPct: 12, hiTech: 32, oda: 0.35, netMigr: 180, milPers: 0.5, protected: 28, eduPrim: 99, eduTer: 48, eduSpend: 5.0, under5: 7, matMort: 8 },
    "France": { ruleOfLaw: 1.4, govEff: 1.4, regQual: 1.3, voice: 1.4, womenParl: 6, poverty: 0.3, inflation: 3.0, debt: 35, fdiIn: 1.8, fdiOut: 2.5, capForm: 18, marketCap: 45, remitt: 0.05, co2Total: 380, energyUse: 3900, fossilFuel: 68, elecRenew: 12, pm25: 12, industryPct: 20, mfgPct: 13, hiTech: 28, oda: 0.45, netMigr: 85, milPers: 0.9, protected: 22, eduPrim: 99, eduTer: 42, eduSpend: 5.8, under5: 6, matMort: 9 },
    "Germany": { ruleOfLaw: 1.6, govEff: 1.6, regQual: 1.5, voice: 1.5, womenParl: 13, poverty: 0.2, inflation: 2.8, debt: 42, fdiIn: 1.5, fdiOut: 2.8, capForm: 20, marketCap: 35, remitt: 0.06, co2Total: 820, energyUse: 4200, fossilFuel: 78, elecRenew: 6, pm25: 11, industryPct: 28, mfgPct: 22, hiTech: 38, oda: 0.35, netMigr: 350, milPers: 0.6, protected: 38, eduPrim: 99, eduTer: 42, eduSpend: 4.8, under5: 6, matMort: 7 },
    "Italy": { ruleOfLaw: 0.8, govEff: 0.6, regQual: 0.5, voice: 1.0, womenParl: 8, poverty: 0.5, inflation: 4.5, debt: 95, fdiIn: 0.8, fdiOut: 1.2, capForm: 19, marketCap: 18, remitt: 0.12, co2Total: 420, energyUse: 2800, fossilFuel: 82, elecRenew: 16, pm25: 18, industryPct: 24, mfgPct: 18, hiTech: 22, oda: 0.15, netMigr: 45, milPers: 0.7, protected: 22, eduPrim: 98, eduTer: 38, eduSpend: 4.5, under5: 7, matMort: 6 },
    "Japan": { ruleOfLaw: 1.5, govEff: 1.6, regQual: 1.3, voice: 1.2, womenParl: 2, poverty: 0.2, inflation: 1.5, debt: 65, fdiIn: 0.2, fdiOut: 1.5, capForm: 28, marketCap: 85, remitt: 0.02, co2Total: 1150, energyUse: 3800, fossilFuel: 82, elecRenew: 10, pm25: 14, industryPct: 30, mfgPct: 22, hiTech: 42, oda: 0.25, netMigr: 45, milPers: 0.4, protected: 29, eduPrim: 99, eduTer: 38, eduSpend: 3.8, under5: 5, matMort: 8 },
    "China": { ruleOfLaw: -0.2, govEff: 0.8, regQual: -0.1, voice: -1.2, womenParl: 21, poverty: 60, inflation: 5.5, debt: 22, fdiIn: 4.5, fdiOut: 0.5, capForm: 35, marketCap: 8, remitt: 0.05, co2Total: 2500, energyUse: 900, fossilFuel: 88, elecRenew: 18, pm25: 42, industryPct: 42, mfgPct: 32, hiTech: 15, oda: 0.01, netMigr: -350, milPers: 0.5, protected: 15, eduPrim: 98, eduTer: 4, eduSpend: 2.2, under5: 45, matMort: 95 },
    "India": { ruleOfLaw: 0.2, govEff: 0.3, regQual: -0.2, voice: 0.5, womenParl: 8, poverty: 45, inflation: 8.5, debt: 72, fdiIn: 0.8, fdiOut: 0.2, capForm: 24, marketCap: 12, remitt: 2.8, co2Total: 650, energyUse: 450, fossilFuel: 72, elecRenew: 15, pm25: 55, industryPct: 28, mfgPct: 16, hiTech: 8, oda: 0.15, netMigr: -250, milPers: 0.4, protected: 5, eduPrim: 85, eduTer: 6, eduSpend: 3.2, under5: 115, matMort: 450 },
    "Brazil": { ruleOfLaw: -0.1, govEff: 0.1, regQual: 0.0, voice: 0.6, womenParl: 7, poverty: 15, inflation: 25, debt: 35, fdiIn: 2.5, fdiOut: 0.8, capForm: 18, marketCap: 8, remitt: 0.05, co2Total: 280, energyUse: 1100, fossilFuel: 55, elecRenew: 45, pm25: 18, industryPct: 28, mfgPct: 15, hiTech: 12, oda: 0.02, netMigr: 25, milPers: 0.5, protected: 29, eduPrim: 95, eduTer: 18, eduSpend: 4.5, under5: 55, matMort: 120 },
    "Russia": { ruleOfLaw: -0.8, govEff: -0.2, regQual: -0.5, voice: -1.0, womenParl: 8, poverty: 2, inflation: 20, debt: 12, fdiIn: 1.2, fdiOut: 1.8, capForm: 22, marketCap: 5, remitt: 0.15, co2Total: 1600, energyUse: 4500, fossilFuel: 88, elecRenew: 16, pm25: 12, industryPct: 38, mfgPct: 18, hiTech: 8, oda: 0.02, netMigr: 80, milPers: 1.2, protected: 11, eduPrim: 98, eduTer: 42, eduSpend: 3.5, under5: 28, matMort: 45 },
    "South Africa": { ruleOfLaw: 0.2, govEff: 0.3, regQual: 0.2, voice: 0.8, womenParl: 25, poverty: 18, inflation: 12, debt: 38, fdiIn: 1.5, fdiOut: 0.8, capForm: 16, marketCap: 150, remitt: 0.08, co2Total: 420, energyUse: 2800, fossilFuel: 88, elecRenew: 6, pm25: 28, industryPct: 26, mfgPct: 14, hiTech: 8, oda: 0.5, netMigr: 35, milPers: 0.4, protected: 8, eduPrim: 95, eduTer: 12, eduSpend: 6.2, under5: 65, matMort: 300 },
    "Australia": { ruleOfLaw: 1.7, govEff: 1.6, regQual: 1.5, voice: 1.5, womenParl: 15, poverty: 0.3, inflation: 3.0, debt: 28, fdiIn: 3.5, fdiOut: 2.5, capForm: 24, marketCap: 75, remitt: 0.04, co2Total: 350, energyUse: 5500, fossilFuel: 92, elecRenew: 8, pm25: 8, industryPct: 24, mfgPct: 10, hiTech: 15, oda: 0.25, netMigr: 120, milPers: 0.6, protected: 18, eduPrim: 99, eduTer: 58, eduSpend: 5.2, under5: 6, matMort: 6 },
    "South Korea": { ruleOfLaw: 1.0, govEff: 1.2, regQual: 0.9, voice: 0.8, womenParl: 1, poverty: 0.5, inflation: 5.5, debt: 12, fdiIn: 0.5, fdiOut: 1.2, capForm: 32, marketCap: 25, remitt: 0.08, co2Total: 480, energyUse: 4200, fossilFuel: 82, elecRenew: 2, pm25: 24, industryPct: 38, mfgPct: 28, hiTech: 48, oda: 0.08, netMigr: 15, milPers: 1.4, protected: 6, eduPrim: 99, eduTer: 38, eduSpend: 4.0, under5: 8, matMort: 14 },
    "Mexico": { ruleOfLaw: -0.3, govEff: 0.0, regQual: -0.2, voice: 0.4, womenParl: 12, poverty: 8, inflation: 18, debt: 28, fdiIn: 2.8, fdiOut: 0.5, capForm: 20, marketCap: 12, remitt: 2.5, co2Total: 380, energyUse: 1600, fossilFuel: 88, elecRenew: 12, pm25: 22, industryPct: 32, mfgPct: 18, hiTech: 18, oda: 0.08, netMigr: -180, milPers: 0.4, protected: 12, eduPrim: 98, eduTer: 18, eduSpend: 4.8, under5: 28, matMort: 55 },
    "Argentina": { ruleOfLaw: -0.2, govEff: -0.1, regQual: -0.3, voice: 0.6, womenParl: 6, poverty: 5, inflation: 35, debt: 45, fdiIn: 1.5, fdiOut: 0.3, capForm: 16, marketCap: 8, remitt: 0.05, co2Total: 150, energyUse: 2200, fossilFuel: 88, elecRenew: 28, pm25: 14, industryPct: 28, mfgPct: 16, hiTech: 10, oda: 0.02, netMigr: 5, milPers: 0.5, protected: 8, eduPrim: 98, eduTer: 28, eduSpend: 4.2, under5: 22, matMort: 55 },
    "Malaysia": { ruleOfLaw: 0.5, govEff: 1.0, regQual: 0.6, voice: 0.2, womenParl: 3, poverty: 2, inflation: 4.5, debt: 35, fdiIn: 5.5, fdiOut: 1.2, capForm: 28, marketCap: 180, remitt: 0.15, co2Total: 180, energyUse: 2800, fossilFuel: 92, elecRenew: 18, pm25: 18, industryPct: 38, mfgPct: 24, hiTech: 42, oda: 0.02, netMigr: 120, milPers: 0.8, protected: 18, eduPrim: 98, eduTer: 8, eduSpend: 4.5, under5: 12, matMort: 28 },
    "New Zealand": { ruleOfLaw: 1.8, govEff: 1.7, regQual: 1.6, voice: 1.6, womenParl: 21, poverty: 0.2, inflation: 2.5, debt: 35, fdiIn: 2.5, fdiOut: 2.0, capForm: 22, marketCap: 45, remitt: 0.03, co2Total: 35, energyUse: 4500, fossilFuel: 68, elecRenew: 72, pm25: 6, industryPct: 22, mfgPct: 12, hiTech: 12, oda: 0.25, netMigr: 35, milPers: 0.5, protected: 32, eduPrim: 99, eduTer: 52, eduSpend: 6.0, under5: 7, matMort: 8 },
    "United Arab Emirates": { ruleOfLaw: 0.6, govEff: 1.2, regQual: 0.8, voice: -0.8, womenParl: 0, poverty: 0.1, inflation: 3.5, debt: 8, fdiIn: 8.0, fdiOut: 4.5, capForm: 28, marketCap: 45, remitt: 0.02, co2Total: 120, energyUse: 7500, fossilFuel: 98, elecRenew: 2, pm25: 35, industryPct: 48, mfgPct: 12, hiTech: 8, oda: 0.15, netMigr: 180, milPers: 0.8, protected: 15, eduPrim: 95, eduTer: 22, eduSpend: 3.5, under5: 8, matMort: 5 },
    "Israel": { ruleOfLaw: 1.0, govEff: 1.1, regQual: 0.9, voice: 0.8, womenParl: 12, poverty: 0.5, inflation: 12, debt: 65, fdiIn: 4.5, fdiOut: 3.5, capForm: 22, marketCap: 85, remitt: 0.08, co2Total: 65, energyUse: 3200, fossilFuel: 92, elecRenew: 6, pm25: 18, industryPct: 22, mfgPct: 14, hiTech: 55, oda: 0.05, netMigr: 45, milPers: 2.2, protected: 25, eduPrim: 98, eduTer: 48, eduSpend: 6.5, under5: 5, matMort: 5 },
    "Iran": { ruleOfLaw: -0.8, govEff: -0.2, regQual: -0.6, voice: -1.5, womenParl: 3, poverty: 5, inflation: 22, debt: 12, fdiIn: 0.5, fdiOut: 0.2, capForm: 28, marketCap: 5, remitt: 0.05, co2Total: 420, energyUse: 2800, fossilFuel: 98, elecRenew: 5, pm25: 28, industryPct: 35, mfgPct: 18, hiTech: 5, oda: 0.02, netMigr: -80, milPers: 1.5, protected: 7, eduPrim: 92, eduTer: 22, eduSpend: 4.0, under5: 35, matMort: 25 },
    "Cuba": { ruleOfLaw: -0.5, govEff: 0.2, regQual: -0.8, voice: -1.2, womenParl: 27, poverty: 0.5, inflation: 8, debt: 35, fdiIn: 0.2, fdiOut: 0.05, capForm: 12, marketCap: 0, remitt: 2.5, co2Total: 28, energyUse: 1100, fossilFuel: 92, elecRenew: 4, pm25: 12, industryPct: 32, mfgPct: 18, hiTech: 2, oda: 0.08, netMigr: -35, milPers: 1.8, protected: 22, eduPrim: 98, eduTer: 18, eduSpend: 12, under5: 8, matMort: 40 },
    "Romania": { ruleOfLaw: 0.2, govEff: 0.1, regQual: 0.0, voice: 0.5, womenParl: 4, poverty: 2, inflation: 28, debt: 8, fdiIn: 2.5, fdiOut: 0.2, capForm: 22, marketCap: 2, remitt: 1.2, co2Total: 95, energyUse: 2200, fossilFuel: 78, elecRenew: 28, pm25: 16, industryPct: 32, mfgPct: 20, hiTech: 8, oda: 0.08, netMigr: -45, milPers: 1.0, protected: 28, eduPrim: 98, eduTer: 22, eduSpend: 3.2, under5: 22, matMort: 45 },
    "Saudi Arabia": { ruleOfLaw: 0.0, govEff: 0.5, regQual: 0.2, voice: -1.5, womenParl: 0, poverty: 0.5, inflation: 4, debt: 45, fdiIn: 5.0, fdiOut: 2.5, capForm: 22, marketCap: 35, remitt: 0.02, co2Total: 380, energyUse: 6800, fossilFuel: 99, elecRenew: 1, pm25: 42, industryPct: 48, mfgPct: 12, hiTech: 5, oda: 0.02, netMigr: 120, milPers: 1.5, protected: 15, eduPrim: 92, eduTer: 18, eduSpend: 5.5, under5: 22, matMort: 18 },
    "Bangladesh": { ruleOfLaw: -0.5, govEff: -0.3, regQual: -0.4, voice: -0.2, womenParl: 10, poverty: 42, inflation: 8, debt: 35, fdiIn: 0.3, fdiOut: 0.05, capForm: 18, marketCap: 2, remitt: 4.5, co2Total: 25, energyUse: 180, fossilFuel: 72, elecRenew: 8, pm25: 65, industryPct: 22, mfgPct: 12, hiTech: 2, oda: 2.5, netMigr: -180, milPers: 0.3, protected: 4, eduPrim: 72, eduTer: 4, eduSpend: 2, under5: 135, matMort: 550 },
    "Ethiopia": { ruleOfLaw: -0.8, govEff: -0.6, regQual: -0.9, voice: -1, womenParl: 8, poverty: 48, inflation: 12, debt: 55, fdiIn: 0.5, fdiOut: 0.02, capForm: 14, marketCap: 0, remitt: 1.5, co2Total: 8, energyUse: 280, fossilFuel: 92, elecRenew: 85, pm25: 35, industryPct: 12, mfgPct: 5, hiTech: 0, oda: 8, netMigr: -35, milPers: 0.5, protected: 18, eduPrim: 35, eduTer: 1, eduSpend: 2.5, under5: 160, matMort: 870 },
    "Indonesia": { ruleOfLaw: -0.4, govEff: 0, regQual: -0.2, voice: -0.3, womenParl: 12, poverty: 35, inflation: 8, debt: 32, fdiIn: 1.5, fdiOut: 0.2, capForm: 28, marketCap: 12, remitt: 0.5, co2Total: 220, energyUse: 550, fossilFuel: 78, elecRenew: 18, pm25: 28, industryPct: 38, mfgPct: 22, hiTech: 8, oda: 0.5, netMigr: -80, milPers: 0.4, protected: 12, eduPrim: 95, eduTer: 8, eduSpend: 1.5, under5: 85, matMort: 320 },
    "Nigeria": { ruleOfLaw: -1, govEff: -0.8, regQual: -0.9, voice: -0.5, womenParl: 5, poverty: 45, inflation: 18, debt: 55, fdiIn: 2.5, fdiOut: 0.2, capForm: 16, marketCap: 8, remitt: 1.2, co2Total: 85, energyUse: 720, fossilFuel: 95, elecRenew: 18, pm25: 48, industryPct: 32, mfgPct: 8, hiTech: 1, oda: 1.5, netMigr: -45, milPers: 0.3, protected: 12, eduPrim: 78, eduTer: 5, eduSpend: 1.2, under5: 180, matMort: 800 },
    "Pakistan": { ruleOfLaw: -0.6, govEff: -0.4, regQual: -0.5, voice: -0.6, womenParl: 5, poverty: 38, inflation: 10, debt: 65, fdiIn: 0.8, fdiOut: 0.1, capForm: 18, marketCap: 8, remitt: 3.5, co2Total: 85, energyUse: 420, fossilFuel: 72, elecRenew: 28, pm25: 58, industryPct: 24, mfgPct: 14, hiTech: 2, oda: 1.8, netMigr: -150, milPers: 0.9, protected: 10, eduPrim: 55, eduTer: 4, eduSpend: 2.2, under5: 125, matMort: 380 },
    "Somalia": { ruleOfLaw: -1.8, govEff: -1.5, regQual: -1.6, voice: -1.5, womenParl: 12, poverty: 55, inflation: 15, debt: 55, fdiIn: 0.2, fdiOut: 0.05, capForm: 8, marketCap: 0, remitt: 8.0, co2Total: 2, energyUse: 350, fossilFuel: 95, elecRenew: 2, pm25: 28, industryPct: 8, mfgPct: 3, hiTech: 0, oda: 12, netMigr: -25, milPers: 0.8, protected: 10, eduPrim: 22, eduTer: 2, eduSpend: 0.5, under5: 115, matMort: 730 },
    "Ukraine": { ruleOfLaw: -0.5, govEff: -0.3, regQual: -0.4, voice: 0.2, womenParl: 5, poverty: 2, inflation: 22, debt: 18, fdiIn: 1.2, fdiOut: 0.2, capForm: 18, marketCap: 0.5, remitt: 2.8, co2Total: 350, energyUse: 2800, fossilFuel: 72, elecRenew: 8, pm25: 18, industryPct: 28, mfgPct: 14, hiTech: 5, oda: 0.5, netMigr: -120, milPers: 1.2, protected: 8, eduPrim: 98, eduTer: 38, eduSpend: 4.5, under5: 12, matMort: 18 },
    "Venezuela": { ruleOfLaw: -1.2, govEff: -1.0, regQual: -1.1, voice: -0.5, womenParl: 12, poverty: 8, inflation: 35, debt: 28, fdiIn: 2.5, fdiOut: 0.2, capForm: 18, marketCap: 2, remitt: 0.08, co2Total: 145, energyUse: 2400, fossilFuel: 92, elecRenew: 62, pm25: 16, industryPct: 38, mfgPct: 14, hiTech: 2, oda: 0.02, netMigr: -25, milPers: 0.8, protected: 55, eduPrim: 92, eduTer: 28, eduSpend: 4.8, under5: 22, matMort: 95 }
  };

  function generatePhase1Data() {
    return {
      governance: {
        ruleOfLaw: genMetricSeries(BASE1990, "ruleOfLaw", { min: -2.5, max: 2.5, digits: 2, defaultTrend: 0.01 }),
        govEffectiveness: genMetricSeries(BASE1990, "govEff", { min: -2.5, max: 2.5, digits: 2, defaultTrend: 0.01 }),
        regulatoryQuality: genMetricSeries(BASE1990, "regQual", { min: -2.5, max: 2.5, digits: 2, defaultTrend: 0.01 }),
        voiceAccountability: genMetricSeries(BASE1990, "voice", { min: -2.5, max: 2.5, digits: 2, defaultTrend: 0.005 }),
        womenParliament: genMetricSeries(BASE1990, "womenParl", { min: 0, max: 55, digits: 1, defaultTrend: 0.35, trendByCode: { SAU: 0.15, KOR: 0.08, JPN: 0.05 } })
      },
      inequality: {
        povertyHeadcount: genMetricSeries(BASE1990, "poverty", { min: 0, max: 75, digits: 1, defaultTrend: -0.8, trendByCode: { CHN: -2.5, IND: -1.2, SOM: 0.2 } }),
        inflation: genMetricSeries(BASE1990, "inflation", { min: -2, max: 120, digits: 1, defaultTrend: -0.05, shockFn: function (code, year) { return (year === 2022 && code !== 'VEN') ? 4 : (code === 'VEN' && year >= 2016 ? 15 : 0); } }),
        publicDebt: genMetricSeries(BASE1990, "debt", { min: 0, max: 180, digits: 1, defaultTrend: 0.8, trendByCode: { JPN: 1.5, ITA: 1.2, USA: 0.6 } })
      },
      investment: {
        fdiInflows: genMetricSeries(BASE1990, "fdiIn", { min: 0, max: 15, digits: 2, defaultTrend: 0.02 }),
        fdiOutflows: genMetricSeries(BASE1990, "fdiOut", { min: 0, max: 12, digits: 2, defaultTrend: 0.03 }),
        capitalFormation: genMetricSeries(BASE1990, "capForm", { min: 5, max: 45, digits: 1, defaultTrend: 0.05 }),
        remittances: genMetricSeries(BASE1990, "remitt", { min: 0, max: 15, digits: 2, defaultTrend: 0.02, trendByCode: { MEX: 0.08, IND: 0.06, PHL: 0, SOM: 0.15 } }),
        marketCap: genMetricSeries(BASE1990, "marketCap", { min: 0, max: 200, digits: 1, defaultTrend: 1.2, trendByCode: { CHN: 2.5, USA: 1.8, IND: 1.5 } })
      },
      energyIndustry: {
        co2Total: genMetricSeries(BASE1990, "co2Total", { min: 0, max: 12000, digits: 0, defaultTrend: 25, trendByCode: { CHN: 120, USA: 15, DEU: -8, GBR: -5 } }),
        energyUse: genMetricSeries(BASE1990, "energyUse", { min: 100, max: 9000, digits: 0, defaultTrend: 15, trendByCode: { CHN: 80, IND: 25, USA: -5 } }),
        fossilFuelShare: genMetricSeries(BASE1990, "fossilFuel", { min: 5, max: 99, digits: 1, defaultTrend: -0.08, trendByCode: { CHN: 0.05, NOR: -0.5, SWE: -0.4 } }),
        elecRenewable: genMetricSeries(BASE1990, "elecRenew", { min: 0, max: 100, digits: 1, defaultTrend: 0.35, trendByCode: { NOR: 0.8, DEU: 0.6, CHN: 0.5 } }),
        pm25: genMetricSeries(BASE1990, "pm25", { min: 2, max: 80, digits: 1, defaultTrend: -0.08, trendByCode: { CHN: -0.5, IND: -0.15 } }),
        industryGdp: genMetricSeries(BASE1990, "industryPct", { min: 5, max: 55, digits: 1, defaultTrend: -0.05, trendByCode: { CHN: 0.15, ARE: 0.1 } }),
        manufacturingGdp: genMetricSeries(BASE1990, "mfgPct", { min: 2, max: 35, digits: 1, defaultTrend: -0.04, trendByCode: { CHN: 0.12, KOR: 0.05 } }),
        hiTechExports: genMetricSeries(BASE1990, "hiTech", { min: 0, max: 65, digits: 1, defaultTrend: 0.25, trendByCode: { KOR: 0.8, CHN: 0.5, ISR: 0.6 } }),
        protectedAreas: genMetricSeries(BASE1990, "protected", { min: 0, max: 45, digits: 1, defaultTrend: 0.15 })
      },
      humanitarian: {
        odaReceived: genMetricSeries(BASE1990, "oda", { min: 0, max: 18, digits: 2, defaultTrend: -0.02, trendByCode: { SOM: 0.25, UKR: 0.8 } }),
        netMigration: genMetricSeries(BASE1990, "netMigr", { min: -500, max: 1200, digits: 0, defaultTrend: 2, trendByCode: { USA: 8, DEU: 12, UKR: -15 } }),
        militaryPersonnel: genMetricSeries(BASE1990, "milPers", { min: 0.1, max: 3.5, digits: 2, defaultTrend: -0.01, trendByCode: { ISR: 0.02, KOR: 0.01, USA: -0.015 } })
      },
      educationExt: {
        primaryEnrollment: genMetricSeries(BASE1990, "eduPrim", { min: 15, max: 102, digits: 1, defaultTrend: 0.08, trendByCode: { SOM: 0.35, IND: 0.15 } }),
        tertiaryEnrollment: genMetricSeries(BASE1990, "eduTer", { min: 1, max: 95, digits: 1, defaultTrend: 0.35, trendByCode: { CHN: 0.8, KOR: 0.5, SOM: 0.08 } }),
        eduSpending: genMetricSeries(BASE1990, "eduSpend", { min: 0.3, max: 14, digits: 1, defaultTrend: 0.02 })
      },
      healthExt: {
        under5Mortality: genMetricSeries(BASE1990, "under5", { min: 2, max: 200, digits: 1, defaultTrend: -1.5, trendByCode: { SOM: -0.5, IND: -2.5, CHN: -2.8 } }),
        maternalMortality: genMetricSeries(BASE1990, "matMort", { min: 2, max: 800, digits: 0, defaultTrend: -8, trendByCode: { SOM: -5, IND: -12, SOM: -3 } })
      }
    };
  }

  /** Edelman Trust Barometer anchors: traditional (legacy) & digital (search+social avg), 0–100 → scaled to 0–10. */
  var EDELMAN_ANCHORS = {
    USA: { legacy: { 2012: 6.5, 2015: 6.2, 2018: 5.8, 2020: 5.7, 2022: 5.6, 2024: 5.8 }, digital: { 2012: 4.2, 2015: 4.0, 2018: 3.8, 2020: 3.6, 2022: 3.5, 2024: 4.0 } },
    GBR: { legacy: { 2012: 5.8, 2015: 5.5, 2018: 5.2, 2020: 5.0, 2022: 4.9, 2024: 5.1 }, digital: { 2012: 3.9, 2015: 3.7, 2018: 3.5, 2020: 3.4, 2022: 3.3, 2024: 3.75 } },
    DEU: { legacy: { 2012: 6.0, 2015: 5.8, 2018: 5.5, 2020: 5.4, 2022: 5.3, 2024: 5.2 }, digital: { 2012: 4.1, 2015: 4.0, 2018: 3.9, 2020: 3.8, 2022: 3.8, 2024: 4.0 } },
    FRA: { legacy: { 2012: 5.5, 2015: 5.2, 2018: 5.0, 2020: 4.8, 2022: 4.7, 2024: 4.8 }, digital: { 2012: 3.6, 2015: 3.5, 2018: 3.4, 2020: 3.3, 2022: 3.2, 2024: 3.55 } },
    CAN: { legacy: { 2012: 6.2, 2015: 6.0, 2018: 5.8, 2020: 5.7, 2022: 5.6, 2024: 5.8 }, digital: { 2012: 4.0, 2015: 3.9, 2018: 3.8, 2020: 3.7, 2022: 3.6, 2024: 3.9 } },
    AUS: { legacy: { 2012: 6.0, 2015: 5.8, 2018: 5.6, 2020: 5.4, 2022: 5.3, 2024: 5.4 }, digital: { 2012: 4.0, 2015: 3.9, 2018: 3.8, 2020: 3.7, 2022: 3.6, 2024: 3.9 } },
    JPN: { legacy: { 2012: 5.8, 2015: 5.6, 2018: 5.5, 2020: 5.4, 2022: 5.3, 2024: 5.5 }, digital: { 2012: 4.2, 2015: 4.1, 2018: 4.0, 2020: 3.9, 2022: 3.9, 2024: 4.15 } },
    CHN: { legacy: { 2012: 6.8, 2015: 6.9, 2018: 7.0, 2020: 7.0, 2022: 7.1, 2024: 7.1 }, digital: { 2012: 6.0, 2015: 6.2, 2018: 6.4, 2020: 6.5, 2022: 6.6, 2024: 6.5 } },
    IND: { legacy: { 2012: 6.0, 2015: 6.1, 2018: 6.2, 2020: 6.1, 2022: 6.0, 2024: 6.2 }, digital: { 2012: 4.5, 2015: 4.6, 2018: 4.7, 2020: 4.6, 2022: 4.5, 2024: 4.65 } },
    BRA: { legacy: { 2012: 5.5, 2015: 5.3, 2018: 5.1, 2020: 5.0, 2022: 4.9, 2024: 5.2 }, digital: { 2012: 3.8, 2015: 3.7, 2018: 3.6, 2020: 3.5, 2022: 3.5, 2024: 3.8 } },
    NOR: { legacy: { 2012: 6.8, 2015: 6.7, 2018: 6.6, 2020: 6.5, 2022: 6.4, 2024: 6.5 }, digital: { 2012: 4.5, 2015: 4.4, 2018: 4.3, 2020: 4.2, 2022: 4.1, 2024: 4.35 } },
    SWE: { legacy: { 2012: 6.6, 2015: 6.5, 2018: 6.4, 2020: 6.3, 2022: 6.2, 2024: 6.2 }, digital: { 2012: 4.3, 2015: 4.2, 2018: 4.1, 2020: 4.0, 2022: 3.9, 2024: 4.15 } },
    FIN: { legacy: { 2012: 6.7, 2015: 6.6, 2018: 6.5, 2020: 6.4, 2022: 6.3, 2024: 6.3 }, digital: { 2012: 4.2, 2015: 4.1, 2018: 4.0, 2020: 3.9, 2022: 3.8, 2024: 4.0 } },
    KOR: { legacy: { 2012: 5.2, 2015: 5.0, 2018: 4.8, 2020: 4.7, 2022: 4.6, 2024: 4.8 }, digital: { 2012: 3.8, 2015: 3.7, 2018: 3.6, 2020: 3.5, 2022: 3.5, 2024: 3.85 } },
    MEX: { legacy: { 2012: 5.0, 2015: 4.8, 2018: 4.6, 2020: 4.5, 2022: 4.4, 2024: 4.8 }, digital: { 2012: 3.5, 2015: 3.4, 2018: 3.3, 2020: 3.2, 2022: 3.2, 2024: 3.5 } },
    ZAF: { legacy: { 2012: 5.2, 2015: 5.0, 2018: 4.8, 2020: 4.6, 2022: 4.5, 2024: 5.0 }, digital: { 2012: 3.6, 2015: 3.5, 2018: 3.4, 2020: 3.3, 2022: 3.2, 2024: 3.55 } },
    ITA: { legacy: { 2012: 5.4, 2015: 5.2, 2018: 5.0, 2020: 4.8, 2022: 4.7, 2024: 5.0 }, digital: { 2012: 3.5, 2015: 3.4, 2018: 3.3, 2020: 3.2, 2022: 3.1, 2024: 3.4 } },
    RUS: { legacy: { 2012: 4.8, 2015: 4.5, 2018: 4.2, 2020: 4.0, 2022: 3.8, 2024: 4.5 }, digital: { 2012: 3.8, 2015: 3.7, 2018: 3.6, 2020: 3.5, 2022: 3.4, 2024: 3.85 } },
    ARE: { legacy: { 2012: 5.8, 2015: 5.9, 2018: 6.0, 2020: 6.0, 2022: 6.0, 2024: 6.0 }, digital: { 2012: 4.8, 2015: 4.9, 2018: 5.0, 2020: 5.0, 2022: 5.0, 2024: 5.05 } },
    ISR: { legacy: { 2012: 5.5, 2015: 5.4, 2018: 5.3, 2020: 5.2, 2022: 5.1, 2024: 5.2 }, digital: { 2012: 3.9, 2015: 3.8, 2018: 3.7, 2020: 3.6, 2022: 3.6, 2024: 3.85 } },
    NZL: { legacy: { 2012: 6.0, 2015: 5.9, 2018: 5.8, 2020: 5.7, 2022: 5.6, 2024: 5.6 }, digital: { 2012: 4.0, 2015: 3.9, 2018: 3.8, 2020: 3.7, 2022: 3.6, 2024: 3.85 } },
    MYS: { legacy: { 2012: 5.6, 2015: 5.5, 2018: 5.5, 2020: 5.4, 2022: 5.4, 2024: 5.5 }, digital: { 2012: 4.0, 2015: 4.0, 2018: 4.0, 2020: 3.9, 2022: 3.9, 2024: 4.1 } },
    ARG: { legacy: { 2012: 4.8, 2015: 4.5, 2018: 4.2, 2020: 4.0, 2022: 3.9, 2024: 4.5 }, digital: { 2012: 3.4, 2015: 3.3, 2018: 3.2, 2020: 3.1, 2022: 3.0, 2024: 3.35 } },
    SAU: { legacy: { 2012: 5.5, 2015: 5.6, 2018: 5.7, 2020: 5.8, 2022: 5.8, 2024: 5.8 }, digital: { 2012: 4.5, 2015: 4.6, 2018: 4.7, 2020: 4.8, 2022: 4.8, 2024: 4.9 } },
    UKR: { legacy: { 2012: 4.2, 2015: 3.8, 2018: 3.5, 2020: 3.2, 2022: 2.8, 2024: 3.8 }, digital: { 2012: 3.5, 2015: 3.4, 2018: 3.3, 2020: 3.2, 2022: 3.0, 2024: 3.5 } },
    IRN: { legacy: { 2012: 5.0, 2015: 4.8, 2018: 4.6, 2020: 4.5, 2022: 4.4, 2024: 4.5 }, digital: { 2012: 4.0, 2015: 3.9, 2018: 3.8, 2020: 3.7, 2022: 3.6, 2024: 3.9 } },
    ROU: { legacy: { 2012: 4.5, 2015: 4.3, 2018: 4.1, 2020: 4.0, 2022: 3.9, 2024: 4.2 }, digital: { 2012: 3.2, 2015: 3.1, 2018: 3.0, 2020: 2.9, 2022: 2.8, 2024: 3.0 } },
    CUB: { legacy: { 2012: 5.0, 2015: 4.8, 2018: 4.6, 2020: 4.5, 2022: 4.4, 2024: 4.5 }, digital: { 2012: 3.0, 2015: 2.9, 2018: 2.8, 2020: 2.7, 2022: 2.6, 2024: 2.75 } },
    VEN: { legacy: { 2012: 4.8, 2015: 4.2, 2018: 3.8, 2020: 3.5, 2022: 3.2, 2024: 4.0 }, digital: { 2012: 3.2, 2015: 3.0, 2018: 2.8, 2020: 2.6, 2022: 2.5, 2024: 2.9 } },
    SOM: { legacy: { 2012: 3.2, 2015: 3.0, 2018: 2.8, 2020: 2.6, 2022: 2.5, 2024: 2.8 }, digital: { 2012: 2.5, 2015: 2.4, 2018: 2.3, 2020: 2.2, 2022: 2.1, 2024: 2.35 } }
  };

  function interpolateAnchors(anchorMap, year) {
    if (!anchorMap) return null;
    var years = Object.keys(anchorMap).map(Number).sort(function (a, b) { return a - b; });
    if (year < years[0] || year > years[years.length - 1]) return null;
    if (anchorMap[year] != null) return anchorMap[year];
    var lo = years[0];
    var hi = years[years.length - 1];
    for (var i = 0; i < years.length - 1; i++) {
      if (year >= years[i] && year <= years[i + 1]) {
        lo = years[i];
        hi = years[i + 1];
        break;
      }
    }
    var t = (year - lo) / (hi - lo);
    return anchorMap[lo] + t * (anchorMap[hi] - anchorMap[lo]);
  }

  function mergeEdelmanMediaTrust(data) {
    if (!data || !data.social) return;
    countriesRef().forEach(function (country) {
      var iso = codesRef()[country];
      var anchors = EDELMAN_ANCHORS[iso];
      if (!anchors) return;
      yearsRef().forEach(function (year, idx) {
        var leg = interpolateAnchors(anchors.legacy, year);
        var dig = interpolateAnchors(anchors.digital, year);
        if (leg != null && Number.isFinite(leg)) {
          data.social.legacyMediaRating[country][idx] = parseFloat(leg.toFixed(1));
        }
        if (dig != null && Number.isFinite(dig)) {
          data.social.newMediaRating[country][idx] = parseFloat(dig.toFixed(1));
        }
      });
    });
    global.__edelmanMediaMerged = true;
  }

  function buildPhase1EuropeAggregate(data, weightedCountrySeries, sumCountrySeries, popByCountry) {
    function w(src, digits) {
      return weightedCountrySeries(src, europeRef(), popByCountry, digits);
    }
    function s(src, digits) {
      return sumCountrySeries(src, europeRef(), digits);
    }

    ["ruleOfLaw", "govEffectiveness", "regulatoryQuality", "voiceAccountability", "womenParliament"].forEach(function (f) {
      data.governance[f].Europe = w(data.governance[f], f === "womenParliament" ? 1 : 2);
    });
    ["povertyHeadcount", "inflation", "publicDebt"].forEach(function (f) {
      data.inequality[f].Europe = w(data.inequality[f], 1);
    });
    ["fdiInflows", "fdiOutflows", "capitalFormation", "remittances", "marketCap"].forEach(function (f) {
      data.investment[f].Europe = w(data.investment[f], 2);
    });
    data.energyIndustry.co2Total.Europe = s(data.energyIndustry.co2Total, 0);
    ["energyUse", "fossilFuelShare", "elecRenewable", "pm25", "industryGdp", "manufacturingGdp", "hiTechExports", "protectedAreas"].forEach(function (f) {
      data.energyIndustry[f].Europe = w(data.energyIndustry[f], 1);
    });
    data.humanitarian.odaReceived.Europe = w(data.humanitarian.odaReceived, 2);
    data.humanitarian.netMigration.Europe = s(data.humanitarian.netMigration, 0);
    data.humanitarian.militaryPersonnel.Europe = w(data.humanitarian.militaryPersonnel, 2);
    ["primaryEnrollment", "tertiaryEnrollment", "eduSpending"].forEach(function (f) {
      data.educationExt[f].Europe = w(data.educationExt[f], 1);
    });
    data.healthExt.under5Mortality.Europe = w(data.healthExt.under5Mortality, 1);
    data.healthExt.maternalMortality.Europe = w(data.healthExt.maternalMortality, 0);
  }

  function getWdiMap() {
    return {
      giniWdi: "SI.POV.GINI",
      poverty: "SI.POV.DDAY",
      inflation: "FP.CPI.TOTL.ZG",
      debt: "GC.DOD.TOTL.GD.ZS",
      fdiIn: "BX.KLT.DINV.WD.GD.ZS",
      fdiOut: "BM.KLT.DINV.WD.GD.ZS",
      capForm: "NE.GDI.TOTL.ZS",
      marketCap: "CM.MKT.LCAP.GD.ZS",
      remitt: "BX.TRF.PWKR.CD.DT.GD.ZS",
      co2Total: "EN.ATM.CO2E.KT",
      energyUse: "EG.USE.PCAP.KG.OE",
      fossilFuel: "EG.FOS.FUEL.ZS",
      elecRenew: "EG.ELC.RNEW.ZS",
      pm25: "EN.ATM.PM25.MC.M3",
      industryPct: "NV.IND.TOTL.ZS",
      mfgPct: "NV.IND.MANF.ZS",
      hiTech: "TX.VAL.TECH.MF.ZS",
      oda: "DT.ODA.ODAT.XP.ZS",
      netMigr: "SM.POP.NETM",
      milPers: "MS.MIL.TOTL.TF.ZS",
      protected: "ER.PTD.TOTL.ZS",
      eduPrim: "SE.PRM.ENRR",
      eduTer: "SE.TER.ENRR",
      eduSpend: "SE.XPD.TOTL.GD.ZS",
      under5: "SH.DYN.MORT",
      matMort: "SH.STA.MMRT",
      ruleLaw: "RL.EST",
      govEff: "GE.EST",
      regQual: "RQ.EST",
      voice: "VA.EST",
      womenParl: "SG.GEN.PARL.ZS",
      physicians: "SH.MED.PHYS.ZS",
      beds: "SH.MED.BEDS.ZS"
    };
  }

  function mergePhase1WdiIntoData(data, rows, overlay, filled) {
    if (!data || !rows) return;
    var countryList = countriesRef();
    for (var c = 0; c < countryList.length; c++) {
      var country = countryList[c];
      var iso = codesRef()[country];
      overlay(data.qualityOfLife.gini[country], filled(rows.giniWdi, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.inequality.povertyHeadcount[country], filled(rows.poverty, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.inequality.inflation[country], filled(rows.inflation, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.inequality.publicDebt[country], filled(rows.debt, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.investment.fdiInflows[country], filled(rows.fdiIn, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.investment.fdiOutflows[country], filled(rows.fdiOut, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.investment.capitalFormation[country], filled(rows.capForm, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.investment.remittances[country], filled(rows.remitt, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.investment.marketCap[country], filled(rows.marketCap, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.energyIndustry.co2Total[country], filled(rows.co2Total, iso, null), function (v) { return Math.round(v); });
      overlay(data.energyIndustry.energyUse[country], filled(rows.energyUse, iso, null), function (v) { return Math.round(v); });
      overlay(data.energyIndustry.fossilFuelShare[country], filled(rows.fossilFuel, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.energyIndustry.elecRenewable[country], filled(rows.elecRenew, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.energyIndustry.pm25[country], filled(rows.pm25, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.energyIndustry.industryGdp[country], filled(rows.industryPct, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.energyIndustry.manufacturingGdp[country], filled(rows.mfgPct, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.energyIndustry.hiTechExports[country], filled(rows.hiTech, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.energyIndustry.protectedAreas[country], filled(rows.protected, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.humanitarian.odaReceived[country], filled(rows.oda, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.humanitarian.netMigration[country], filled(rows.netMigr, iso, null), function (v) { return Math.round(v); });
      overlay(data.humanitarian.militaryPersonnel[country], filled(rows.milPers, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.educationExt.primaryEnrollment[country], filled(rows.eduPrim, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.educationExt.tertiaryEnrollment[country], filled(rows.eduTer, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.educationExt.eduSpending[country], filled(rows.eduSpend, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.healthExt.under5Mortality[country], filled(rows.under5, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.healthExt.maternalMortality[country], filled(rows.matMort, iso, null), function (v) { return Math.round(v); });
      overlay(data.governance.ruleOfLaw[country], filled(rows.ruleLaw, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.governance.govEffectiveness[country], filled(rows.govEff, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.governance.regulatoryQuality[country], filled(rows.regQual, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.governance.voiceAccountability[country], filled(rows.voice, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.governance.womenParliament[country], filled(rows.womenParl, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.healthAccess.physicians[country], filled(rows.physicians, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.healthAccess.beds[country], filled(rows.beds, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
    }
  }

  function extendData(data) {
    var p1 = generatePhase1Data();
    data.governance = p1.governance;
    data.inequality = p1.inequality;
    data.investment = p1.investment;
    data.energyIndustry = p1.energyIndustry;
    data.humanitarian = p1.humanitarian;
    data.educationExt = p1.educationExt;
    data.healthExt = p1.healthExt;
    mergeEdelmanMediaTrust(data);
  }

  var PHASE1_CHART_BINDINGS = [
    ["ruleOfLawChart", "governance", "ruleOfLaw"],
    ["govEffectivenessChart", "governance", "govEffectiveness"],
    ["regulatoryQualityChart", "governance", "regulatoryQuality"],
    ["voiceAccountabilityChart", "governance", "voiceAccountability"],
    ["womenParliamentChart", "governance", "womenParliament"],
    ["povertyHeadcountChart", "inequality", "povertyHeadcount"],
    ["inflationChart", "inequality", "inflation"],
    ["publicDebtChart", "inequality", "publicDebt"],
    ["fdiInflowsChart", "investment", "fdiInflows"],
    ["fdiOutflowsChart", "investment", "fdiOutflows"],
    ["capitalFormationChart", "investment", "capitalFormation"],
    ["remittancesChart", "investment", "remittances"],
    ["marketCapChart", "investment", "marketCap"],
    ["co2TotalChart", "energyIndustry", "co2Total"],
    ["energyUseChart", "energyIndustry", "energyUse"],
    ["fossilFuelChart", "energyIndustry", "fossilFuelShare"],
    ["elecRenewableChart", "energyIndustry", "elecRenewable"],
    ["pm25Chart", "energyIndustry", "pm25"],
    ["industryGdpChart", "energyIndustry", "industryGdp"],
    ["manufacturingGdpChart", "energyIndustry", "manufacturingGdp"],
    ["hiTechExportsChart", "energyIndustry", "hiTechExports"],
    ["protectedAreasChart", "energyIndustry", "protectedAreas"],
    ["odaReceivedChart", "humanitarian", "odaReceived"],
    ["netMigrationChart", "humanitarian", "netMigration"],
    ["militaryPersonnelChart", "humanitarian", "militaryPersonnel"],
    ["eduPrimaryChart", "educationExt", "primaryEnrollment"],
    ["eduTertiaryChart", "educationExt", "tertiaryEnrollment"],
    ["eduSpendingChart", "educationExt", "eduSpending"],
    ["under5MortalityChart", "healthExt", "under5Mortality"],
    ["maternalMortalityChart", "healthExt", "maternalMortality"]
  ];

  var PHASE1_WDI_BADGE_SPECS = [
    { id: "giniChart", keys: ["giniWdi"] },
    { id: "povertyHeadcountChart", keys: ["poverty"] },
    { id: "inflationChart", keys: ["inflation"] },
    { id: "publicDebtChart", keys: ["debt"] },
    { id: "fdiInflowsChart", keys: ["fdiIn"] },
    { id: "fdiOutflowsChart", keys: ["fdiOut"] },
    { id: "capitalFormationChart", keys: ["capForm"] },
    { id: "remittancesChart", keys: ["remitt"] },
    { id: "marketCapChart", keys: ["marketCap"] },
    { id: "co2TotalChart", keys: ["co2Total"] },
    { id: "energyUseChart", keys: ["energyUse"] },
    { id: "fossilFuelChart", keys: ["fossilFuel"] },
    { id: "elecRenewableChart", keys: ["elecRenew"] },
    { id: "pm25Chart", keys: ["pm25"] },
    { id: "industryGdpChart", keys: ["industryPct"] },
    { id: "manufacturingGdpChart", keys: ["mfgPct"] },
    { id: "hiTechExportsChart", keys: ["hiTech"] },
    { id: "protectedAreasChart", keys: ["protected"] },
    { id: "odaReceivedChart", keys: ["oda"] },
    { id: "netMigrationChart", keys: ["netMigr"] },
    { id: "militaryPersonnelChart", keys: ["milPers"] },
    { id: "eduPrimaryChart", keys: ["eduPrim"] },
    { id: "eduTertiaryChart", keys: ["eduTer"] },
    { id: "eduSpendingChart", keys: ["eduSpend"] },
    { id: "under5MortalityChart", keys: ["under5"] },
    { id: "maternalMortalityChart", keys: ["matMort"] },
    { id: "ruleOfLawChart", keys: ["ruleLaw"] },
    { id: "govEffectivenessChart", keys: ["govEff"] },
    { id: "regulatoryQualityChart", keys: ["regQual"] },
    { id: "voiceAccountabilityChart", keys: ["voice"] },
    { id: "womenParliamentChart", keys: ["womenParl"] },
    { id: "physiciansChart", keys: ["physicians"] },
    { id: "hospitalBedsChart", keys: ["beds"] }
  ];

  var PHASE1_EXTERNAL_ANCHOR_IDS = [
    "giniChart", "povertyHeadcountChart", "inflationChart", "publicDebtChart",
    "fdiInflowsChart", "fdiOutflowsChart", "capitalFormationChart", "remittancesChart", "marketCapChart",
    "co2TotalChart", "energyUseChart", "fossilFuelChart", "elecRenewableChart", "pm25Chart",
    "industryGdpChart", "manufacturingGdpChart", "hiTechExportsChart", "protectedAreasChart",
    "odaReceivedChart", "netMigrationChart", "militaryPersonnelChart",
    "eduPrimaryChart", "eduTertiaryChart", "eduSpendingChart",
    "under5MortalityChart", "maternalMortalityChart",
    "ruleOfLawChart", "govEffectivenessChart", "regulatoryQualityChart", "voiceAccountabilityChart", "womenParliamentChart",
    "physiciansChart", "hospitalBedsChart",
    "legacyMediaRatingChart", "newMediaRatingChart",
    "govLegacyMediaTrustChart", "govNewMediaTrustChart"
  ];

  var PHASE1_TAB_QUALITY_MAP = {
    governance: ["ruleOfLawChart", "govEffectivenessChart", "regulatoryQualityChart", "voiceAccountabilityChart", "womenParliamentChart", "govLegacyMediaTrustChart", "govNewMediaTrustChart", "eduPrimaryChart", "eduTertiaryChart", "eduSpendingChart"],
    inequality: ["povertyHeadcountChart", "inflationChart", "publicDebtChart", "giniChart"],
    investment: ["fdiInflowsChart", "fdiOutflowsChart", "capitalFormationChart", "remittancesChart", "marketCapChart"],
    energyIndustry: ["co2TotalChart", "energyUseChart", "fossilFuelChart", "elecRenewableChart", "pm25Chart", "industryGdpChart", "manufacturingGdpChart", "hiTechExportsChart", "protectedAreasChart"],
    humanitarian: ["odaReceivedChart", "netMigrationChart", "militaryPersonnelChart"]
  };

  function initPhase1Charts(createChartFn, getChartDataFn, getOptionsFn, data) {
    PHASE1_CHART_BINDINGS.forEach(function (b) {
      createChartFn(b[0], getChartDataFn(data[b[1]][b[2]]), getOptionsFn(b[0]));
    });
  }

  function updatePhase1Charts(chartsMap, getChartDataFn, data) {
    PHASE1_CHART_BINDINGS.forEach(function (b) {
      var ch = chartsMap[b[0]];
      if (ch) {
        ch.data = getChartDataFn(data[b[1]][b[2]]);
        ch.update();
      }
    });
  }

  global.DashboardPhase1 = {
    generatePhase1Data: generatePhase1Data,
    extendData: extendData,
    mergeEdelmanMediaTrust: mergeEdelmanMediaTrust,
    buildPhase1EuropeAggregate: buildPhase1EuropeAggregate,
    getWdiMap: getWdiMap,
    mergePhase1WdiIntoData: mergePhase1WdiIntoData,
    PHASE1_CHART_BINDINGS: PHASE1_CHART_BINDINGS,
    PHASE1_WDI_BADGE_SPECS: PHASE1_WDI_BADGE_SPECS,
    PHASE1_EXTERNAL_ANCHOR_IDS: PHASE1_EXTERNAL_ANCHOR_IDS,
    PHASE1_TAB_QUALITY_MAP: PHASE1_TAB_QUALITY_MAP,
    initPhase1Charts: initPhase1Charts,
    updatePhase1Charts: updatePhase1Charts
  };
})(typeof window !== "undefined" ? window : globalThis);
