/**
 * Phase 2 expansion: macro, labor, health, environment, demographics, trade & tech extensions.
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

  function genSeries(baseByCountry, field, opts) {
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

  var B = {
    "United States": { gdpGrowth: 3.2, currentAccount: -2.5, taxRevenue: 22, tradeGdp: 22, incomeBottom20: 5.5, incomeTop10: 28, poverty365: 1.2, controlCorruption: 1.3, politicalStability: 0.5, hiv: 0.4, tuberculosis: 3.5, suicide: 12, alcohol: 9.5, co2Intensity: 0.35, arableLand: 18, freshwater: 1500, elecAccess: 100, cleanFuel: 100, popGrowth: 1.0, urbanPop: 75, ageDependency: 52, schoolLife: 16, domesticCredit: 195, youthUnemployment: 12, vulnerableEmployment: 8, femaleLFPR: 56, maleLFPR: 69, researchers: 4200, patents: 280000, serviceExports: 550, militarySpendWdi: 3.5 },
    "Canada": { gdpGrowth: 3.0, currentAccount: -2.8, taxRevenue: 32, tradeGdp: 62, incomeBottom20: 5.8, incomeTop10: 24, poverty365: 0.8, controlCorruption: 1.6, politicalStability: 1.0, hiv: 0.2, tuberculosis: 5, suicide: 11, alcohol: 8.2, co2Intensity: 0.42, arableLand: 5, freshwater: 1100, elecAccess: 100, cleanFuel: 100, popGrowth: 1.2, urbanPop: 82, ageDependency: 48, schoolLife: 16, domesticCredit: 165, youthUnemployment: 14, vulnerableEmployment: 10, femaleLFPR: 61, maleLFPR: 70, researchers: 2800, patents: 22000, serviceExports: 85, militarySpendWdi: 1.2 },
    "Norway": { gdpGrowth: 2.8, currentAccount: 8, taxRevenue: 38, tradeGdp: 72, incomeBottom20: 7.5, incomeTop10: 22, poverty365: 0.2, controlCorruption: 2.0, politicalStability: 1.2, hiv: 0.1, tuberculosis: 4, suicide: 10, alcohol: 7.5, co2Intensity: 0.18, arableLand: 2.5, freshwater: 380, elecAccess: 100, cleanFuel: 100, popGrowth: 0.8, urbanPop: 83, ageDependency: 52, schoolLife: 18, domesticCredit: 145, youthUnemployment: 10, vulnerableEmployment: 8, femaleLFPR: 60, maleLFPR: 68, researchers: 3800, patents: 3500, serviceExports: 45, militarySpendWdi: 1.6 },
    "Sweden": { gdpGrowth: 2.5, currentAccount: 4.5, taxRevenue: 42, tradeGdp: 88, incomeBottom20: 7.2, incomeTop10: 23, poverty365: 0.3, controlCorruption: 1.9, politicalStability: 1.0, hiv: 0.1, tuberculosis: 5, suicide: 14, alcohol: 9.0, co2Intensity: 0.15, arableLand: 6, freshwater: 420, elecAccess: 100, cleanFuel: 100, popGrowth: 0.5, urbanPop: 88, ageDependency: 55, schoolLife: 18, domesticCredit: 155, youthUnemployment: 18, vulnerableEmployment: 9, femaleLFPR: 62, maleLFPR: 68, researchers: 4100, patents: 5500, serviceExports: 75, militarySpendWdi: 1.1 },
    "Finland": { gdpGrowth: 2.2, currentAccount: 0.5, taxRevenue: 42, tradeGdp: 78, incomeBottom20: 7.0, incomeTop10: 23, poverty365: 0.2, controlCorruption: 2.0, politicalStability: 1.1, hiv: 0.1, tuberculosis: 4, suicide: 15, alcohol: 10.5, co2Intensity: 0.22, arableLand: 7, freshwater: 520, elecAccess: 100, cleanFuel: 100, popGrowth: 0.3, urbanPop: 85, ageDependency: 58, schoolLife: 18, domesticCredit: 135, youthUnemployment: 16, vulnerableEmployment: 8, femaleLFPR: 58, maleLFPR: 65, researchers: 4500, patents: 4200, serviceExports: 35, militarySpendWdi: 1.5 },
    "United Kingdom": { gdpGrowth: 2.5, currentAccount: -3.5, taxRevenue: 28, tradeGdp: 58, incomeBottom20: 5.2, incomeTop10: 28, poverty365: 0.8, controlCorruption: 1.5, politicalStability: 0.4, hiv: 0.2, tuberculosis: 8, suicide: 7, alcohol: 10.5, co2Intensity: 0.18, arableLand: 25, freshwater: 250, elecAccess: 100, cleanFuel: 100, popGrowth: 0.4, urbanPop: 84, ageDependency: 55, schoolLife: 17, domesticCredit: 175, youthUnemployment: 14, vulnerableEmployment: 11, femaleLFPR: 57, maleLFPR: 68, researchers: 3200, patents: 28000, serviceExports: 320, militarySpendWdi: 2.1 },
    "France": { gdpGrowth: 2.8, currentAccount: -0.5, taxRevenue: 42, tradeGdp: 58, incomeBottom20: 6.5, incomeTop10: 25, poverty365: 0.5, controlCorruption: 1.2, politicalStability: 0.3, hiv: 0.4, tuberculosis: 7, suicide: 12, alcohol: 12.5, co2Intensity: 0.14, arableLand: 33, freshwater: 680, elecAccess: 100, cleanFuel: 100, popGrowth: 0.5, urbanPop: 81, ageDependency: 58, schoolLife: 16, domesticCredit: 145, youthUnemployment: 22, vulnerableEmployment: 12, femaleLFPR: 52, maleLFPR: 64, researchers: 3800, patents: 18000, serviceExports: 280, militarySpendWdi: 1.9 },
    "Germany": { gdpGrowth: 2.2, currentAccount: 6.5, taxRevenue: 36, tradeGdp: 88, incomeBottom20: 6.8, incomeTop10: 24, poverty365: 0.4, controlCorruption: 1.5, politicalStability: 0.8, hiv: 0.1, tuberculosis: 6, suicide: 10, alcohol: 11.5, co2Intensity: 0.22, arableLand: 34, freshwater: 520, elecAccess: 100, cleanFuel: 100, popGrowth: 0.1, urbanPop: 77, ageDependency: 52, schoolLife: 17, domesticCredit: 125, youthUnemployment: 8, vulnerableEmployment: 9, femaleLFPR: 55, maleLFPR: 68, researchers: 4200, patents: 35000, serviceExports: 220, militarySpendWdi: 1.3 },
    "Italy": { gdpGrowth: 2.5, currentAccount: 0.5, taxRevenue: 38, tradeGdp: 58, incomeBottom20: 6.0, incomeTop10: 26, poverty365: 1.5, controlCorruption: 0.2, politicalStability: 0.2, hiv: 0.3, tuberculosis: 7, suicide: 6, alcohol: 10.0, co2Intensity: 0.2, arableLand: 28, freshwater: 580, elecAccess: 100, cleanFuel: 100, popGrowth: 0.2, urbanPop: 71, ageDependency: 55, schoolLife: 16, domesticCredit: 115, youthUnemployment: 32, vulnerableEmployment: 15, femaleLFPR: 42, maleLFPR: 63, researchers: 2100, patents: 12000, serviceExports: 140, militarySpendWdi: 1.4 },
    "Japan": { gdpGrowth: 4.5, currentAccount: 3.0, taxRevenue: 28, tradeGdp: 32, incomeBottom20: 6.2, incomeTop10: 22, poverty365: 0.6, controlCorruption: 1.2, politicalStability: 0.9, hiv: 0.05, tuberculosis: 15, suicide: 18, alcohol: 8.5, co2Intensity: 0.28, arableLand: 12, freshwater: 640, elecAccess: 100, cleanFuel: 100, popGrowth: 0.5, urbanPop: 92, ageDependency: 68, schoolLife: 15, domesticCredit: 195, youthUnemployment: 5, vulnerableEmployment: 12, femaleLFPR: 52, maleLFPR: 72, researchers: 5200, patents: 280000, serviceExports: 180, militarySpendWdi: 1.0 },
    "China": { gdpGrowth: 9.5, currentAccount: 2.5, taxRevenue: 18, tradeGdp: 38, incomeBottom20: 4.5, incomeTop10: 32, poverty365: 25, controlCorruption: -0.3, politicalStability: -0.2, hiv: 0.08, tuberculosis: 58, suicide: 8, alcohol: 7.0, co2Intensity: 0.85, arableLand: 11, freshwater: 550, elecAccess: 100, cleanFuel: 72, popGrowth: 1.2, urbanPop: 35, ageDependency: 38, schoolLife: 12, domesticCredit: 155, youthUnemployment: 12, vulnerableEmployment: 42, femaleLFPR: 62, maleLFPR: 78, researchers: 1200, patents: 450000, serviceExports: 280, militarySpendWdi: 1.7 },
    "India": { gdpGrowth: 5.5, currentAccount: -1.5, taxRevenue: 12, tradeGdp: 42, incomeBottom20: 4.2, incomeTop10: 30, poverty365: 45, controlCorruption: -0.2, politicalStability: -0.8, hiv: 0.3, tuberculosis: 195, suicide: 12, alcohol: 4.5, co2Intensity: 0.55, arableLand: 52, freshwater: 680, elecAccess: 55, cleanFuel: 42, popGrowth: 2.0, urbanPop: 28, ageDependency: 48, schoolLife: 11, domesticCredit: 52, youthUnemployment: 22, vulnerableEmployment: 75, femaleLFPR: 28, maleLFPR: 78, researchers: 250, patents: 15000, serviceExports: 180, militarySpendWdi: 2.4 },
    "Brazil": { gdpGrowth: 3.5, currentAccount: -2.5, taxRevenue: 28, tradeGdp: 28, incomeBottom20: 3.2, incomeTop10: 42, poverty365: 12, controlCorruption: -0.4, politicalStability: -0.5, hiv: 0.5, tuberculosis: 42, suicide: 6, alcohol: 8.5, co2Intensity: 0.32, arableLand: 32, freshwater: 530, elecAccess: 98, cleanFuel: 88, popGrowth: 1.8, urbanPop: 75, ageDependency: 45, schoolLife: 13, domesticCredit: 68, youthUnemployment: 18, vulnerableEmployment: 38, femaleLFPR: 52, maleLFPR: 75, researchers: 850, patents: 5500, serviceExports: 35, militarySpendWdi: 1.3 },
    "Russia": { gdpGrowth: 2.5, currentAccount: 5.5, taxRevenue: 22, tradeGdp: 48, incomeBottom20: 5.5, incomeTop10: 28, poverty365: 2, controlCorruption: -1.0, politicalStability: -0.8, hiv: 1.0, tuberculosis: 68, suicide: 25, alcohol: 12.5, co2Intensity: 0.65, arableLand: 9, freshwater: 420, elecAccess: 100, cleanFuel: 95, popGrowth: 0.2, urbanPop: 74, ageDependency: 42, schoolLife: 14, domesticCredit: 48, youthUnemployment: 16, vulnerableEmployment: 18, femaleLFPR: 58, maleLFPR: 72, researchers: 2800, patents: 28000, serviceExports: 55, militarySpendWdi: 4.2 },
    "South Africa": { gdpGrowth: 2.8, currentAccount: -2.0, taxRevenue: 24, tradeGdp: 62, incomeBottom20: 3.5, incomeTop10: 52, poverty365: 28, controlCorruption: 0.0, politicalStability: -0.5, hiv: 18, tuberculosis: 520, suicide: 14, alcohol: 9.5, co2Intensity: 0.75, arableLand: 10, freshwater: 280, elecAccess: 85, cleanFuel: 78, popGrowth: 2.2, urbanPop: 65, ageDependency: 52, schoolLife: 12, domesticCredit: 135, youthUnemployment: 48, vulnerableEmployment: 22, femaleLFPR: 48, maleLFPR: 62, researchers: 420, patents: 850, serviceExports: 18, militarySpendWdi: 1.1 },
    "Australia": { gdpGrowth: 3.5, currentAccount: -4.5, taxRevenue: 28, tradeGdp: 42, incomeBottom20: 5.5, incomeTop10: 26, poverty365: 0.5, controlCorruption: 1.6, politicalStability: 1.0, hiv: 0.1, tuberculosis: 6, suicide: 11, alcohol: 10.5, co2Intensity: 0.38, arableLand: 6, freshwater: 620, elecAccess: 100, cleanFuel: 100, popGrowth: 1.5, urbanPop: 86, ageDependency: 52, schoolLife: 17, domesticCredit: 155, youthUnemployment: 12, vulnerableEmployment: 10, femaleLFPR: 60, maleLFPR: 72, researchers: 2800, patents: 4500, serviceExports: 45, militarySpendWdi: 1.9 },
    "South Korea": { gdpGrowth: 8.5, currentAccount: 2.5, taxRevenue: 22, tradeGdp: 78, incomeBottom20: 5.8, incomeTop10: 24, poverty365: 0.5, controlCorruption: 0.4, politicalStability: 0.2, hiv: 0.05, tuberculosis: 72, suicide: 24, alcohol: 10.5, co2Intensity: 0.48, arableLand: 15, freshwater: 680, elecAccess: 100, cleanFuel: 100, popGrowth: 1.2, urbanPop: 82, ageDependency: 38, schoolLife: 16, domesticCredit: 145, youthUnemployment: 10, vulnerableEmployment: 22, femaleLFPR: 52, maleLFPR: 72, researchers: 4800, patents: 180000, serviceExports: 120, militarySpendWdi: 2.5 },
    "Mexico": { gdpGrowth: 3.8, currentAccount: -2.8, taxRevenue: 18, tradeGdp: 72, incomeBottom20: 3.8, incomeTop10: 38, poverty365: 15, controlCorruption: -0.6, politicalStability: -1.0, hiv: 0.2, tuberculosis: 22, suicide: 5, alcohol: 8.5, co2Intensity: 0.38, arableLand: 13, freshwater: 720, elecAccess: 98, cleanFuel: 85, popGrowth: 2.2, urbanPop: 72, ageDependency: 48, schoolLife: 12, domesticCredit: 32, youthUnemployment: 10, vulnerableEmployment: 28, femaleLFPR: 42, maleLFPR: 78, researchers: 650, patents: 2800, serviceExports: 28, militarySpendWdi: 0.5 },
    "Argentina": { gdpGrowth: 2.5, currentAccount: -1.5, taxRevenue: 26, tradeGdp: 32, incomeBottom20: 4.2, incomeTop10: 32, poverty365: 8, controlCorruption: -0.2, politicalStability: -0.2, hiv: 0.4, tuberculosis: 28, suicide: 8, alcohol: 9.5, co2Intensity: 0.32, arableLand: 14, freshwater: 780, elecAccess: 100, cleanFuel: 95, popGrowth: 1.5, urbanPop: 88, ageDependency: 52, schoolLife: 14, domesticCredit: 22, youthUnemployment: 22, vulnerableEmployment: 25, femaleLFPR: 48, maleLFPR: 72, researchers: 850, patents: 1200, serviceExports: 12, militarySpendWdi: 0.8 },
    "Malaysia": { gdpGrowth: 6.5, currentAccount: 5.0, taxRevenue: 16, tradeGdp: 145, incomeBottom20: 4.5, incomeTop10: 32, poverty365: 2, controlCorruption: 0.2, politicalStability: 0.2, hiv: 0.4, tuberculosis: 92, suicide: 6, alcohol: 4.5, co2Intensity: 0.42, arableLand: 5, freshwater: 820, elecAccess: 100, cleanFuel: 82, popGrowth: 2.5, urbanPop: 55, ageDependency: 42, schoolLife: 13, domesticCredit: 135, youthUnemployment: 12, vulnerableEmployment: 18, femaleLFPR: 48, maleLFPR: 78, researchers: 1200, patents: 2800, serviceExports: 42, militarySpendWdi: 1.0 },
    "New Zealand": { gdpGrowth: 3.2, currentAccount: -5.5, taxRevenue: 32, tradeGdp: 52, incomeBottom20: 5.8, incomeTop10: 26, poverty365: 0.4, controlCorruption: 1.8, politicalStability: 1.1, hiv: 0.1, tuberculosis: 6, suicide: 12, alcohol: 10.0, co2Intensity: 0.22, arableLand: 6, freshwater: 1800, elecAccess: 100, cleanFuel: 100, popGrowth: 1.2, urbanPop: 87, ageDependency: 52, schoolLife: 17, domesticCredit: 145, youthUnemployment: 12, vulnerableEmployment: 9, femaleLFPR: 62, maleLFPR: 75, researchers: 3200, patents: 1800, serviceExports: 18, militarySpendWdi: 1.1 },
    "United Arab Emirates": { gdpGrowth: 5.5, currentAccount: 8, taxRevenue: 2, tradeGdp: 165, incomeBottom20: 4.5, incomeTop10: 38, poverty365: 0.2, controlCorruption: 0.8, politicalStability: 0.8, hiv: 0.05, tuberculosis: 8, suicide: 5, alcohol: 3.5, co2Intensity: 0.55, arableLand: 0.5, freshwater: 180, elecAccess: 100, cleanFuel: 100, popGrowth: 4.5, urbanPop: 78, ageDependency: 18, schoolLife: 14, domesticCredit: 95, youthUnemployment: 8, vulnerableEmployment: 8, femaleLFPR: 42, maleLFPR: 88, researchers: 850, patents: 450, serviceExports: 85, militarySpendWdi: 5.5 },
    "Israel": { gdpGrowth: 4.5, currentAccount: 1.5, taxRevenue: 32, tradeGdp: 58, incomeBottom20: 5.2, incomeTop10: 28, poverty365: 1.5, controlCorruption: 0.8, politicalStability: -0.8, hiv: 0.2, tuberculosis: 5, suicide: 6, alcohol: 4.5, co2Intensity: 0.32, arableLand: 14, freshwater: 280, elecAccess: 100, cleanFuel: 100, popGrowth: 2.5, urbanPop: 92, ageDependency: 62, schoolLife: 16, domesticCredit: 95, youthUnemployment: 10, vulnerableEmployment: 12, femaleLFPR: 58, maleLFPR: 68, researchers: 8200, patents: 8500, serviceExports: 55, militarySpendWdi: 5.2 },
    "Iran": { gdpGrowth: 4.0, currentAccount: 2.5, taxRevenue: 8, tradeGdp: 42, incomeBottom20: 4.5, incomeTop10: 32, poverty365: 8, controlCorruption: -1.0, politicalStability: -1.2, hiv: 0.1, tuberculosis: 18, suicide: 5, alcohol: 0.5, co2Intensity: 0.52, arableLand: 10, freshwater: 720, elecAccess: 100, cleanFuel: 95, popGrowth: 2.8, urbanPop: 68, ageDependency: 42, schoolLife: 13, domesticCredit: 38, youthUnemployment: 28, vulnerableEmployment: 32, femaleLFPR: 18, maleLFPR: 72, researchers: 1200, patents: 850, serviceExports: 12, militarySpendWdi: 2.8 },
    "Cuba": { gdpGrowth: 2.5, currentAccount: -2.0, taxRevenue: 35, tradeGdp: 52, incomeBottom20: 5.5, incomeTop10: 22, poverty365: 2, controlCorruption: -0.5, politicalStability: 0.5, hiv: 0.2, tuberculosis: 8, suicide: 8, alcohol: 6.5, co2Intensity: 0.28, arableLand: 28, freshwater: 580, elecAccess: 98, cleanFuel: 92, popGrowth: 0.8, urbanPop: 77, ageDependency: 42, schoolLife: 14, domesticCredit: 12, youthUnemployment: 8, vulnerableEmployment: 15, femaleLFPR: 48, maleLFPR: 72, researchers: 650, patents: 280, serviceExports: 8, militarySpendWdi: 3.2 },
    "Romania": { gdpGrowth: 3.5, currentAccount: -5.5, taxRevenue: 26, tradeGdp: 72, incomeBottom20: 5.5, incomeTop10: 28, poverty365: 3, controlCorruption: -0.2, politicalStability: 0.0, hiv: 0.1, tuberculosis: 95, suicide: 12, alcohol: 14.5, co2Intensity: 0.42, arableLand: 39, freshwater: 420, elecAccess: 100, cleanFuel: 95, popGrowth: 0.0, urbanPop: 55, ageDependency: 48, schoolLife: 14, domesticCredit: 28, youthUnemployment: 22, vulnerableEmployment: 15, femaleLFPR: 45, maleLFPR: 68, researchers: 1200, patents: 850, serviceExports: 18, militarySpendWdi: 1.8 },
    "Saudi Arabia": { gdpGrowth: 4.5, currentAccount: 5.5, taxRevenue: 5, tradeGdp: 68, incomeBottom20: 4.5, incomeTop10: 35, poverty365: 1, controlCorruption: 0.2, politicalStability: 0.2, hiv: 0.05, tuberculosis: 12, suicide: 4, alcohol: 0.2, co2Intensity: 0.48, arableLand: 1.5, freshwater: 220, elecAccess: 100, cleanFuel: 100, popGrowth: 3.5, urbanPop: 82, ageDependency: 38, schoolLife: 13, domesticCredit: 52, youthUnemployment: 28, vulnerableEmployment: 8, femaleLFPR: 22, maleLFPR: 78, researchers: 650, patents: 1200, serviceExports: 35, militarySpendWdi: 8.5 },
    "Somalia": { gdpGrowth: 1.5, currentAccount: -8, taxRevenue: 4, tradeGdp: 42, incomeBottom20: 3.0, incomeTop10: 38, poverty365: 55, controlCorruption: -1.8, politicalStability: -2.5, hiv: 0.2, tuberculosis: 280, suicide: 8, alcohol: 0.5, co2Intensity: 0.15, arableLand: 2, freshwater: 85, elecAccess: 32, cleanFuel: 8, popGrowth: 2.8, urbanPop: 22, ageDependency: 98, schoolLife: 4, domesticCredit: 8, youthUnemployment: 35, vulnerableEmployment: 82, femaleLFPR: 32, maleLFPR: 58, researchers: 12, patents: 2, serviceExports: 0.5, militarySpendWdi: 1.5 },
    "Ukraine": { gdpGrowth: 1.5, currentAccount: -3.5, taxRevenue: 28, tradeGdp: 82, incomeBottom20: 5.5, incomeTop10: 28, poverty365: 2, controlCorruption: -0.8, politicalStability: -1.5, hiv: 0.8, tuberculosis: 72, suicide: 18, alcohol: 10.5, co2Intensity: 0.55, arableLand: 55, freshwater: 420, elecAccess: 100, cleanFuel: 92, popGrowth: -0.2, urbanPop: 68, ageDependency: 48, schoolLife: 14, domesticCredit: 42, youthUnemployment: 18, vulnerableEmployment: 12, femaleLFPR: 52, maleLFPR: 65, researchers: 850, patents: 2800, serviceExports: 22, militarySpendWdi: 3.5 },
    "Venezuela": { gdpGrowth: 2.0, currentAccount: 2.5, taxRevenue: 18, tradeGdp: 52, incomeBottom20: 4.0, incomeTop10: 35, poverty365: 18, controlCorruption: -1.2, politicalStability: -1.8, hiv: 0.3, tuberculosis: 32, suicide: 5, alcohol: 8.5, co2Intensity: 0.32, arableLand: 4, freshwater: 580, elecAccess: 95, cleanFuel: 88, popGrowth: 2.5, urbanPop: 88, ageDependency: 45, schoolLife: 12, domesticCredit: 28, youthUnemployment: 15, vulnerableEmployment: 32, femaleLFPR: 42, maleLFPR: 75, researchers: 420, patents: 280, serviceExports: 5, militarySpendWdi: 1.2 }
  };

  function generatePhase2Data() {
    return {
      macroExt: {
        gdpGrowth: genSeries(B, "gdpGrowth", { min: -15, max: 15, digits: 1, defaultTrend: -0.02 }),
        currentAccount: genSeries(B, "currentAccount", { min: -12, max: 12, digits: 1, defaultTrend: 0 }),
        taxRevenue: genSeries(B, "taxRevenue", { min: 0, max: 50, digits: 1, defaultTrend: 0.05 }),
        tradeGdp: genSeries(B, "tradeGdp", { min: 10, max: 180, digits: 1, defaultTrend: 0.15 })
      },
      inequalityExt: {
        incomeBottom20: genSeries(B, "incomeBottom20", { min: 2, max: 12, digits: 1, defaultTrend: 0.02 }),
        incomeTop10: genSeries(B, "incomeTop10", { min: 18, max: 58, digits: 1, defaultTrend: 0.08 }),
        poverty365: genSeries(B, "poverty365", { min: 0, max: 65, digits: 1, defaultTrend: -0.35, trendByCode: { CHN: -1.2, IND: -0.8 } })
      },
      governanceExt: {
        controlCorruption: genSeries(B, "controlCorruption", { min: -2.5, max: 2.5, digits: 2, defaultTrend: 0.01 }),
        politicalStability: genSeries(B, "politicalStability", { min: -2.5, max: 2.5, digits: 2, defaultTrend: 0 })
      },
      healthExt2: {
        hiv: genSeries(B, "hiv", { min: 0, max: 22, digits: 2, defaultTrend: -0.02 }),
        tuberculosis: genSeries(B, "tuberculosis", { min: 0, max: 600, digits: 0, defaultTrend: -1.5 }),
        suicide: genSeries(B, "suicide", { min: 0, max: 30, digits: 1, defaultTrend: -0.05 }),
        alcohol: genSeries(B, "alcohol", { min: 0, max: 16, digits: 1, defaultTrend: 0.02 })
      },
      environmentExt: {
        co2Intensity: genSeries(B, "co2Intensity", { min: 0.05, max: 1.2, digits: 2, defaultTrend: -0.005 }),
        arableLand: genSeries(B, "arableLand", { min: 0.2, max: 58, digits: 1, defaultTrend: -0.05 }),
        freshwater: genSeries(B, "freshwater", { min: 50, max: 2000, digits: 0, defaultTrend: 2 }),
        elecAccess: genSeries(B, "elecAccess", { min: 15, max: 100, digits: 1, defaultTrend: 0.25, trendByCode: { IND: 0.8, SOM: 0.35 } }),
        cleanFuel: genSeries(B, "cleanFuel", { min: 5, max: 100, digits: 1, defaultTrend: 0.3, trendByCode: { IND: 0.6, CHN: 0.5 } })
      },
      demographicsExt: {
        popGrowth: genSeries(B, "popGrowth", { min: -1, max: 5, digits: 2, defaultTrend: -0.02 }),
        urbanPop: genSeries(B, "urbanPop", { min: 15, max: 95, digits: 1, defaultTrend: 0.35 }),
        ageDependency: genSeries(B, "ageDependency", { min: 18, max: 100, digits: 1, defaultTrend: 0.08 }),
        schoolLife: genSeries(B, "schoolLife", { min: 3, max: 20, digits: 1, defaultTrend: 0.08 })
      },
      investmentExt: {
        domesticCredit: genSeries(B, "domesticCredit", { min: 5, max: 220, digits: 0, defaultTrend: 1.5 })
      },
      labor: {
        youthUnemployment: genSeries(B, "youthUnemployment", { min: 2, max: 55, digits: 1, defaultTrend: -0.05 }),
        vulnerableEmployment: genSeries(B, "vulnerableEmployment", { min: 5, max: 88, digits: 1, defaultTrend: -0.12 }),
        femaleLFPR: genSeries(B, "femaleLFPR", { min: 12, max: 68, digits: 1, defaultTrend: 0.15 }),
        maleLFPR: genSeries(B, "maleLFPR", { min: 55, max: 92, digits: 1, defaultTrend: -0.05 })
      },
      techExt: {
        researchers: genSeries(B, "researchers", { min: 5, max: 8500, digits: 0, defaultTrend: 25 }),
        patents: genSeries(B, "patents", { min: 0, max: 500000, digits: 0, defaultTrend: 800 })
      },
      tradeExt: {
        serviceExports: genSeries(B, "serviceExports", { min: 0, max: 600, digits: 1, defaultTrend: 2.5 })
      },
      militaryExt: {
        militarySpendWdi: genSeries(B, "militarySpendWdi", { min: 0.3, max: 10, digits: 2, defaultTrend: -0.01 })
      }
    };
  }

  function getWdiMap() {
    return {
      gdpGrowth: "NY.GDP.MKTP.KD.ZG",
      currentAccount: "BN.CAB.XOKA.GD.ZS",
      taxRevenue: "GC.TAX.TOTL.GD.ZS",
      tradeGdp: "NE.TRD.GNFS.ZS",
      incomeBottom20: "SI.DST.FRST.20",
      incomeTop10: "SI.DST.10TH.10",
      poverty365: "SI.POV.LMIC",
      controlCorruption: "CC.EST",
      politicalStability: "PV.EST",
      hiv: "SH.DYN.AIDS.ZS",
      tuberculosis: "SH.TBS.INCD",
      suicide: "SH.SURO.RATE.P5",
      alcohol: "SH.ALC.PCAP.LI",
      co2Intensity: "EN.ATM.CO2E.GD.PP.KD",
      arableLand: "AG.LND.ARBL.ZS",
      freshwater: "ER.H2O.FWTL.K3",
      elecAccess: "EG.ELC.ACCS.ZS",
      cleanFuel: "EG.CFT.ACCS.ZS",
      popGrowth: "SP.POP.GROW",
      urbanPop: "SP.URB.TOTL.IN.ZS",
      ageDependency: "SP.POP.DPND",
      schoolLife: "SE.SCH.LIFE",
      domesticCredit: "FS.AST.PRVT.GD.ZS",
      youthUnemployment: "SL.UEM.1524.ZS",
      vulnerableEmployment: "SL.EMP.VULN.ZS",
      femaleLFPR: "SL.TLF.CACT.FE.ZS",
      maleLFPR: "SL.TLF.CACT.MA.ZS",
      researchers: "SP.POP.SCIE.RD.P6",
      patents: "IP.PAT.RESD",
      serviceExports: "BX.GSR.NFSV.CD",
      militarySpendWdi: "MS.MIL.XPND.GD.ZS"
    };
  }

  function mergePhase2WdiIntoData(data, rows, overlay, filled) {
    if (!data || !rows) return;
    var countryList = countriesRef();
    for (var c = 0; c < countryList.length; c++) {
      var country = countryList[c];
      var iso = codesRef()[country];
      overlay(data.macroExt.gdpGrowth[country], filled(rows.gdpGrowth, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.macroExt.currentAccount[country], filled(rows.currentAccount, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.macroExt.taxRevenue[country], filled(rows.taxRevenue, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.macroExt.tradeGdp[country], filled(rows.tradeGdp, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.inequalityExt.incomeBottom20[country], filled(rows.incomeBottom20, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.inequalityExt.incomeTop10[country], filled(rows.incomeTop10, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.inequalityExt.poverty365[country], filled(rows.poverty365, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.governanceExt.controlCorruption[country], filled(rows.controlCorruption, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.governanceExt.politicalStability[country], filled(rows.politicalStability, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.healthExt2.hiv[country], filled(rows.hiv, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.healthExt2.tuberculosis[country], filled(rows.tuberculosis, iso, null), function (v) { return Math.round(v); });
      overlay(data.healthExt2.suicide[country], filled(rows.suicide, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.healthExt2.alcohol[country], filled(rows.alcohol, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.environmentExt.co2Intensity[country], filled(rows.co2Intensity, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.environmentExt.arableLand[country], filled(rows.arableLand, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.environmentExt.freshwater[country], filled(rows.freshwater, iso, null), function (v) { return Math.round(v); });
      overlay(data.environmentExt.elecAccess[country], filled(rows.elecAccess, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.environmentExt.cleanFuel[country], filled(rows.cleanFuel, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.demographicsExt.popGrowth[country], filled(rows.popGrowth, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
      overlay(data.demographicsExt.urbanPop[country], filled(rows.urbanPop, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.demographicsExt.ageDependency[country], filled(rows.ageDependency, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.demographicsExt.schoolLife[country], filled(rows.schoolLife, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.investmentExt.domesticCredit[country], filled(rows.domesticCredit, iso, null), function (v) { return Math.round(v); });
      overlay(data.labor.youthUnemployment[country], filled(rows.youthUnemployment, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.labor.vulnerableEmployment[country], filled(rows.vulnerableEmployment, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.labor.femaleLFPR[country], filled(rows.femaleLFPR, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.labor.maleLFPR[country], filled(rows.maleLFPR, iso, null), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.techExt.researchers[country], filled(rows.researchers, iso, null), function (v) { return Math.round(v); });
      overlay(data.techExt.patents[country], filled(rows.patents, iso, null), function (v) { return Math.round(v); });
      overlay(data.tradeExt.serviceExports[country], filled(rows.serviceExports, iso, function (v) { return v / 1e9; }), function (v) { return parseFloat(Number(v).toFixed(1)); });
      overlay(data.militaryExt.militarySpendWdi[country], filled(rows.militarySpendWdi, iso, null), function (v) { return parseFloat(Number(v).toFixed(2)); });
    }
  }

  function buildPhase2EuropeAggregate(data, weightedCountrySeries, sumCountrySeries, popByCountry) {
    function w(src, digits) {
      return weightedCountrySeries(src, europeRef(), popByCountry, digits);
    }
    ["gdpGrowth", "currentAccount", "taxRevenue", "tradeGdp"].forEach(function (f) {
      data.macroExt[f].Europe = w(data.macroExt[f], 1);
    });
    ["incomeBottom20", "incomeTop10", "poverty365"].forEach(function (f) {
      data.inequalityExt[f].Europe = w(data.inequalityExt[f], 1);
    });
    ["controlCorruption", "politicalStability"].forEach(function (f) {
      data.governanceExt[f].Europe = w(data.governanceExt[f], 2);
    });
    ["hiv", "tuberculosis", "suicide", "alcohol"].forEach(function (f) {
      data.healthExt2[f].Europe = w(data.healthExt2[f], f === "tuberculosis" ? 0 : 1);
    });
    ["co2Intensity", "arableLand", "freshwater", "elecAccess", "cleanFuel"].forEach(function (f) {
      data.environmentExt[f].Europe = w(data.environmentExt[f], f === "freshwater" ? 0 : 1);
    });
    ["popGrowth", "urbanPop", "ageDependency", "schoolLife"].forEach(function (f) {
      data.demographicsExt[f].Europe = w(data.demographicsExt[f], f === "popGrowth" ? 2 : 1);
    });
    data.investmentExt.domesticCredit.Europe = w(data.investmentExt.domesticCredit, 0);
    ["youthUnemployment", "vulnerableEmployment", "femaleLFPR", "maleLFPR"].forEach(function (f) {
      data.labor[f].Europe = w(data.labor[f], 1);
    });
    data.techExt.researchers.Europe = w(data.techExt.researchers, 0);
    data.techExt.patents.Europe = sumCountrySeries(data.techExt.patents, europeRef(), 0);
    data.tradeExt.serviceExports.Europe = sumCountrySeries(data.tradeExt.serviceExports, europeRef(), 1);
    data.militaryExt.militarySpendWdi.Europe = w(data.militaryExt.militarySpendWdi, 2);
  }

  function extendData(data) {
    var p2 = generatePhase2Data();
    data.macroExt = p2.macroExt;
    data.inequalityExt = p2.inequalityExt;
    data.governanceExt = p2.governanceExt;
    data.healthExt2 = p2.healthExt2;
    data.environmentExt = p2.environmentExt;
    data.demographicsExt = p2.demographicsExt;
    data.investmentExt = p2.investmentExt;
    data.labor = p2.labor;
    data.techExt = p2.techExt;
    data.tradeExt = p2.tradeExt;
    data.militaryExt = p2.militaryExt;
  }

  var PHASE2_CHART_BINDINGS = [
    ["gdpGrowthChart", "macroExt", "gdpGrowth"],
    ["currentAccountChart", "macroExt", "currentAccount"],
    ["taxRevenueChart", "macroExt", "taxRevenue"],
    ["tradeGdpChart", "macroExt", "tradeGdp"],
    ["incomeBottom20Chart", "inequalityExt", "incomeBottom20"],
    ["incomeTop10Chart", "inequalityExt", "incomeTop10"],
    ["poverty365Chart", "inequalityExt", "poverty365"],
    ["controlCorruptionChart", "governanceExt", "controlCorruption"],
    ["politicalStabilityChart", "governanceExt", "politicalStability"],
    ["hivPrevalenceChart", "healthExt2", "hiv"],
    ["tuberculosisChart", "healthExt2", "tuberculosis"],
    ["suicideRateChart", "healthExt2", "suicide"],
    ["alcoholConsumptionChart", "healthExt2", "alcohol"],
    ["co2IntensityChart", "environmentExt", "co2Intensity"],
    ["arableLandChart", "environmentExt", "arableLand"],
    ["freshwaterWithdrawalChart", "environmentExt", "freshwater"],
    ["electricityAccessChart", "environmentExt", "elecAccess"],
    ["cleanFuelAccessChart", "environmentExt", "cleanFuel"],
    ["populationGrowthChart", "demographicsExt", "popGrowth"],
    ["urbanPopulationChart", "demographicsExt", "urbanPop"],
    ["ageDependencyChart", "demographicsExt", "ageDependency"],
    ["schoolLifeExpectancyChart", "demographicsExt", "schoolLife"],
    ["domesticCreditChart", "investmentExt", "domesticCredit"],
    ["youthUnemploymentChart", "labor", "youthUnemployment"],
    ["vulnerableEmploymentChart", "labor", "vulnerableEmployment"],
    ["femaleLaborForceChart", "labor", "femaleLFPR"],
    ["maleLaborForceChart", "labor", "maleLFPR"],
    ["researchersChart", "techExt", "researchers"],
    ["patentsChart", "techExt", "patents"],
    ["serviceExportsChart", "tradeExt", "serviceExports"],
    ["militarySpendWdiChart", "militaryExt", "militarySpendWdi"]
  ];

  var PHASE2_WDI_BADGE_SPECS = PHASE2_CHART_BINDINGS.map(function (b) {
    var keyMap = {
      gdpGrowthChart: "gdpGrowth", currentAccountChart: "currentAccount", taxRevenueChart: "taxRevenue", tradeGdpChart: "tradeGdp",
      incomeBottom20Chart: "incomeBottom20", incomeTop10Chart: "incomeTop10", poverty365Chart: "poverty365",
      controlCorruptionChart: "controlCorruption", politicalStabilityChart: "politicalStability",
      hivPrevalenceChart: "hiv", tuberculosisChart: "tuberculosis", suicideRateChart: "suicide", alcoholConsumptionChart: "alcohol",
      co2IntensityChart: "co2Intensity", arableLandChart: "arableLand", freshwaterWithdrawalChart: "freshwater",
      electricityAccessChart: "elecAccess", cleanFuelAccessChart: "cleanFuel",
      populationGrowthChart: "popGrowth", urbanPopulationChart: "urbanPop", ageDependencyChart: "ageDependency", schoolLifeExpectancyChart: "schoolLife",
      domesticCreditChart: "domesticCredit",
      youthUnemploymentChart: "youthUnemployment", vulnerableEmploymentChart: "vulnerableEmployment",
      femaleLaborForceChart: "femaleLFPR", maleLaborForceChart: "maleLFPR",
      researchersChart: "researchers", patentsChart: "patents", serviceExportsChart: "serviceExports", militarySpendWdiChart: "militarySpendWdi"
    };
    return { id: b[0], keys: [keyMap[b[0]]] };
  });

  var PHASE2_EXTERNAL_ANCHOR_IDS = PHASE2_CHART_BINDINGS.map(function (b) { return b[0]; });

  var PHASE2_TAB_QUALITY_MAP = {
    economic: ["gdpGrowthChart", "currentAccountChart", "taxRevenueChart", "tradeGdpChart", "militarySpendWdiChart"],
    labor: ["youthUnemploymentChart", "vulnerableEmploymentChart", "femaleLaborForceChart", "maleLaborForceChart"],
    inequality: ["incomeBottom20Chart", "incomeTop10Chart", "poverty365Chart"],
    governance: ["controlCorruptionChart", "politicalStabilityChart"],
    health: ["hivPrevalenceChart", "tuberculosisChart", "suicideRateChart", "alcoholConsumptionChart"],
    environment: ["co2IntensityChart", "arableLandChart", "freshwaterWithdrawalChart", "electricityAccessChart", "cleanFuelAccessChart"],
    demographics: ["populationGrowthChart", "urbanPopulationChart", "ageDependencyChart", "schoolLifeExpectancyChart"],
    investment: ["domesticCreditChart"],
    technology: ["researchersChart", "patentsChart"],
    trade: ["serviceExportsChart"]
  };

  function initPhase2Charts(createChartFn, getChartDataFn, getOptionsFn, data) {
    PHASE2_CHART_BINDINGS.forEach(function (b) {
      createChartFn(b[0], getChartDataFn(data[b[1]][b[2]]), getOptionsFn(b[0]));
    });
  }

  function updatePhase2Charts(chartsMap, getChartDataFn, data) {
    PHASE2_CHART_BINDINGS.forEach(function (b) {
      var ch = chartsMap[b[0]];
      if (ch) {
        ch.data = getChartDataFn(data[b[1]][b[2]]);
        ch.update();
      }
    });
  }

  global.DashboardPhase2 = {
    extendData: extendData,
    buildPhase2EuropeAggregate: buildPhase2EuropeAggregate,
    getWdiMap: getWdiMap,
    mergePhase2WdiIntoData: mergePhase2WdiIntoData,
    PHASE2_CHART_BINDINGS: PHASE2_CHART_BINDINGS,
    PHASE2_WDI_BADGE_SPECS: PHASE2_WDI_BADGE_SPECS,
    PHASE2_EXTERNAL_ANCHOR_IDS: PHASE2_EXTERNAL_ANCHOR_IDS,
    PHASE2_TAB_QUALITY_MAP: PHASE2_TAB_QUALITY_MAP,
    initPhase2Charts: initPhase2Charts,
    updatePhase2Charts: updatePhase2Charts
  };
})(typeof window !== "undefined" ? window : globalThis);
