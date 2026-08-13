/**
 * English / French UI strings for the dashboard. Large HTML blobs (historical panels,
 * speculation lists) live in dashboard-i18n-fr.js as window.I18N_HIST_FR and window.I18N_SPEC_LISTS_FR.
 */
(function (global) {
  "use strict";

  var MSGS = {
    en: {},
    fr: {},
    es: {},
  };

  function add(key, en, fr, es) {
    MSGS.en[key] = en;
    MSGS.fr[key] = fr;
    MSGS.es[key] = es != null ? es : en;
  }

  add(
    "meta.title",
    "Global Economic & Social Indicators ({start}–{end})",
    "Indicateurs économiques et sociaux mondiaux ({start}–{end})",
    "Indicadores económicos y sociales mundiales ({start}–{end})",
  );
  add("lang.toggleTitle", "Switch language", "Changer de langue", "Cambiar idioma");
  add("lang.labelEn", "EN", "EN", "EN");
  add("lang.labelFr", "FR", "FR", "FR");
  add("lang.labelEs", "ES", "ES", "ES");
  add(
    "theme.toggleTitle",
    "Toggle light/dark theme",
    "Basculer thème clair/sombre",
    "Cambiar tema claro/oscuro",
  );
  add("theme.toggleAria", "Toggle theme", "Basculer le thème", "Cambiar tema");

  add(
    "country.selectTitle",
    "Select Countries to Compare",
    "Sélectionner les pays à comparer",
    "Seleccionar países para comparar",
  );
  add(
    "country.europeAggregateLabel",
    "Europe (Aggregate)",
    "Europe (Agrégat)",
    "Europa (agregado)",
  );

  add(
    "overview.title",
    "Country share overview",
    "Vue d’ensemble des parts par pays",
    "Resumen de participación por país",
  );
  add(
    "overview.metricNotePop",
    "Tile size ∝ latest population share (millions) among countries shown.",
    "Taille des tuiles ∝ part de population (millions) parmi les pays affichés.",
    "Tamaño de baldosa ∝ participación poblacional (millones) entre los países mostrados.",
  );
  add(
    "overview.metricNoteGdp",
    "Tile size ∝ latest GDP share (trillion USD) among countries shown.",
    "Taille des tuiles ∝ part du PIB (billions USD) parmi les pays affichés.",
    "Tamaño de baldosa ∝ participación del PIB (billones USD) entre los países mostrados.",
  );
  add("overview.metric.population", "Population", "Population", "Población");
  add("overview.metric.gdp", "GDP", "PIB", "PIB");
  add("overview.continent.all", "All", "Tous", "Todos");
  add("overview.continent.africa", "Africa", "Afrique", "África");
  add("overview.continent.asia", "Asia", "Asie", "Asia");
  add("overview.continent.europe", "Europe", "Europe", "Europa");
  add("overview.continent.north_america", "North America", "Amérique du Nord", "Norteamérica");
  add("overview.continent.south_america", "South America", "Amérique du Sud", "Sudamérica");
  add("overview.continent.oceania", "Oceania", "Océanie", "Oceanía");
  add("overview.mapToggle.africa", "Africa", "Afrique", "África");
  add("overview.mapToggle.asia", "Asia", "Asie", "Asia");
  add("overview.mapToggle.europe", "Europe", "Europe", "Europa");
  add("overview.mapToggle.north_america", "N. America", "Am. du Nord", "N. América");
  add("overview.mapToggle.south_america", "S. America", "Am. du Sud", "S. América");
  add("overview.mapToggle.oceania", "Oceania", "Océanie", "Oceanía");
  add(
    "overview.mapHint",
    "Click countries on the map or treemap to toggle selection. Continent buttons turn that continent’s countries on or off.",
    "Cliquez sur les pays de la carte ou du treemap pour basculer la sélection. Les boutons de continent activent ou désactivent les pays de ce continent.",
    "Haz clic en países del mapa o del treemap para alternar la selección. Los botones de continente activan o desactivan esos países.",
  );
  add(
    "overview.emptyTreemap",
    "No selected countries in this continent.",
    "Aucun pays sélectionné dans ce continent.",
    "No hay países seleccionados en este continente.",
  );
  add(
    "overview.treemapAria",
    "Country share treemap",
    "Treemap des parts par pays",
    "Treemap de participación por país",
  );
  add(
    "overview.mapLoadFail",
    "World map could not be loaded.",
    "La carte du monde n’a pas pu être chargée.",
    "No se pudo cargar el mapa mundial.",
  );

  add("tab.economic", "Economic", "Économie", "Economía");
  add("tab.employment", "Jobs", "Emploi", "Empleo");
  add("tab.costs", "Costs", "Coûts", "Costos");
  add("tab.social", "Social", "Social", "Social");
  add("tab.demographics", "Population", "Population", "Población");
  add("tab.health", "Health", "Santé", "Salud");
  add("tab.environment", "Environment", "Environnement", "Medio ambiente");
  add("tab.technology", "Tech", "Technologie", "Tecnología");
  add("tab.trade", "Trade", "Commerce", "Comercio");
  add("tab.immigration", "Migration", "Migration", "Migración");
  add("tab.wellbeing", "Quality of Life", "Qualité de vie", "Calidad de vida");
  add("tab.governance", "Governance", "Gouvernance", "Gobernanza");
  add("tab.inequality", "Inequality", "Inégalités", "Desigualdad");
  add("tab.investment", "Investment", "Investissement", "Inversión");
  add("tab.energy", "Energy & Industry", "Énergie & industrie", "Energía e industria");
  add("tab.humanitarian", "Humanitarian", "Humanitaire", "Humanitario");
  add("tab.labor", "Labor", "Travail", "Trabajo");

  add("nav.group.macro", "Macro", "Macro", "Macro");
  add("nav.group.people", "People", "Population", "Personas");
  add("nav.group.society", "Society", "Société", "Sociedad");
  add("nav.group.planet", "Planet", "Planète", "Planeta");
  add("nav.group.tech", "Tech", "Technologie", "Tecnología");
  add(
    "nav.searchPlaceholder",
    "Search indicators (e.g. Gini, CO₂, Edelman, unemployment…)",
    "Rechercher un indicateur (ex. Gini, CO₂, Edelman, chômage…)",
    "Buscar indicadores (p. ej. Gini, CO₂, Edelman, desempleo…)",
  );
  add(
    "nav.searchAria",
    "Search dashboard indicators",
    "Rechercher un indicateur du tableau de bord",
    "Buscar indicadores del panel",
  );

  add(
    "sec.statsSummary",
    "Key Indicators Overview",
    "Indicateurs clés — graphiques",
  );
  add(
    "sec.yoy",
    "Year-over-Year Changes ({prev} → {end})",
    "Variations d’une année sur l’autre ({prev} → {end})",
  );
  add(
    "sec.comparison",
    "Detailed Country Comparison ({end})",
    "Comparaison détaillée des pays ({end})",
  );
  add(
    "sec.trends",
    "Long-term Trends ({start} → {end})",
    "Tendances de long terme ({start} → {end})",
  );
  add("sec.economic", "Economic Indicators", "Indicateurs économiques");
  add("sec.military", "Military Spending", "Dépenses militaires");
  add("sec.employment", "Employment & Salary", "Emploi et revenus");
  add("sec.costs", "Cost of Living", "Coût de la vie");
  add(
    "sec.telecom",
    "Telecom & Connectivity Costs",
    "Télécoms et connectivité",
  );
  add("sec.social", "Social Indicators", "Indicateurs sociaux");
  add(
    "sec.demographics",
    "Demographic Indicators",
    "Indicateurs démographiques",
  );
  add("sec.health", "Health Indicators", "Indicateurs de santé");
  add(
    "sec.environment",
    "Environmental Indicators",
    "Indicateurs environnementaux",
  );
  add("sec.technology", "Technology Adoption", "Adoption des technologies");
  add("sec.trade", "International Trade", "Commerce international");
  add("sec.immigration", "Immigration", "Immigration");
  add(
    "sec.wellbeing",
    "Quality of Life & Social Progress",
    "Qualité de vie et progrès social",
  );
  add("sec.governance", "Governance & Rights", "Gouvernance et droits");
  add("sec.inequality", "Inequality & Fiscal Pressure", "Inégalités et pression fiscale");
  add("sec.investment", "Investment & Finance", "Investissement et finance");
  add("sec.energy", "Energy & Industry", "Énergie et industrie");
  add("sec.humanitarian", "Humanitarian & Global Affairs", "Humanitaire et affaires mondiales");
  add("sec.mediaTrust", "Media Trust (Edelman anchors 2012+)", "Confiance médias (Edelman 2012+)");
  add("sec.educationExt", "Education (extended)", "Éducation (étendu)");
  add("sec.macroExt", "Macro & Fiscal (extended, WDI)", "Macro & fiscal (étendu, WDI)");
  add("sec.demographicsExt", "Population Dynamics (WDI)", "Dynamique démographique (WDI)");
  add("sec.healthExt2", "Disease & Risk Factors (WDI)", "Maladies et facteurs de risque (WDI)");
  add("sec.environmentExt", "Environment & Access (WDI)", "Environnement et accès (WDI)");
  add("sec.techExt", "Innovation Output (WDI)", "Production d'innovation (WDI)");
  add("sec.labor", "Labor Market (WDI)", "Marché du travail (WDI)");
  add("sec.media", "Speech & Media", "Expression et médias");
  add("sec.religion", "Religious Composition", "Composition religieuse");
  add(
    "spec.chartHidden",
    "Chart hidden due to insufficient data",
    "Graphique masqué en raison de données insuffisantes",
  );

  add("dq.title", "Data Quality Snapshot", "Instantané de qualité des données");
  add(
    "dq.summary",
    "Quick audit of source coverage and model reliance for the currently rendered dashboard.",
    "Audit rapide de la couverture des sources et de la part modélisée pour le tableau de bord affiché.",
  );
  add("dq.wdiLoaded", "WDI indicators loaded:", "Indicateurs WDI chargés :");
  add(
    "dq.totalCharts",
    "Total chart surfaces:",
    "Nombre total de graphiques :",
  );
  add(
    "dq.externalCharts",
    "Charts externally anchored:",
    "Graphiques ancrés sur des sources externes :",
  );
  add(
    "dq.modelledCharts",
    "Charts still model-first:",
    "Graphiques encore principalement modélisés :",
  );
  add("dq.horizon", "Time horizon:", "Horizon temporel :");
  add(
    "dq.freshness",
    "Last live data refresh:",
    "Dernière actualisation des données live :",
  );
  add("dq.warning", "Quality warning:", "Alerte qualité :");
  add(
    "dq.warningLowCoverage",
    "Low live-source coverage; several charts remain model-first.",
    "Couverture des sources live faible ; plusieurs graphiques restent principalement modélisés.",
  );
  add(
    "dq.warningOk",
    "Coverage acceptable for baseline dashboard use.",
    "Couverture acceptable pour un usage de base du tableau de bord.",
  );
  add(
    "dq.tabBreakdown",
    "Per-tab external coverage:",
    "Couverture externe par onglet :",
  );
  add(
    "dq.countryCoverage",
    "Selected-country WDI point coverage:",
    "Couverture des points WDI pour les pays sélectionnés :",
  );
  add("dq.notAvailable", "n/a", "n/d");

  add("table.country", "Country", "Pays");
  add("table.gdp", "GDP (T$)", "PIB (T$)");
  add("table.gdppc", "GDP/Capita ($)", "PIB/hab. ($)");
  add("table.empl", "Empl. 15+ (%)", "Empl. 15+ (%)");
  add("table.gni", "GNI/cap ($)", "RNB/hab. ($)");
  add("table.life", "Life Exp. (yrs)", "Esp. vie (ans)");
  add("table.rent", "Rent ($/mo)", "Loyer ($/mois)");
  add("table.co2", "CO2 (tons/cap)", "CO₂ (t/hab.)");
  add("table.internet", "Internet (%)", "Internet (%)");

  add("stats.range", "Range:", "Plage :");
  add(
    "stats.avgGdp",
    "Average GDP (Trillion USD)",
    "PIB moyen (milliards USD)",
  );
  add(
    "stats.avgGdppc",
    "Average GDP Per Capita (USD)",
    "PIB par habitant moyen (USD)",
  );
  add(
    "stats.empl",
    "Employment to population 15+ (%)",
    "Taux d’emploi 15+ (%)",
  );
  add(
    "stats.gni",
    "Average GNI per capita (USD, WDI)",
    "RNB par habitant moyen (USD, BM)",
  );
  add(
    "stats.life",
    "Average Life Expectancy (years)",
    "Espérance de vie moyenne (ans)",
  );
  add(
    "stats.birth",
    "Average Birth Rate (per 1000)",
    "Taux de natalité moyen (pour 1 000)",
  );
  add("stats.rent", "Average Monthly Rent (USD)", "Loyer mensuel moyen (USD)");
  add(
    "stats.gas",
    "Average Gas Price (USD/L)",
    "Prix moyen du carburant (USD/L)",
  );
  add(
    "stats.co2",
    "Average CO2 Emissions (tons/capita)",
    "Émissions de CO₂ moyennes (t/hab.)",
  );
  add(
    "stats.edu",
    "Average Education Level (%)",
    "Niveau d’éducation moyen (%)",
  );
  add(
    "stats.trade",
    "Average Trade Balance (Billion USD)",
    "Balance commerciale moyenne (milliards USD)",
  );
  add(
    "stats.tradeB",
    "Average Trade Balance (B USD)",
    "Balance commerciale moyenne (milliards USD)",
  );
  add(
    "stats.internet",
    "Average Internet Penetration (%)",
    "Pénétration Internet moyenne (%)",
  );
  add("stats.cardGdpGrowth", "GDP Growth", "Croissance du PIB");
  add(
    "stats.cardEmpChange",
    "Employment Rate Change",
    "Variation du taux d’emploi",
  );
  add(
    "stats.cardGniGrowth",
    "GNI per capita growth",
    "Croissance du RNB par habitant",
  );
  add(
    "stats.cardCo2Change",
    "CO2 Emissions Change",
    "Variation des émissions de CO₂",
  );
  add(
    "stats.cardAvgAcross",
    "Average across selected countries",
    "Moyenne des pays sélectionnés",
  );
  add(
    "stats.trendGdp",
    "Total GDP Growth Since 1970",
    "Croissance totale du PIB depuis 1970",
  );
  add(
    "stats.trendLife",
    "Life Expectancy Gain Since 1970",
    "Gain d’espérance de vie depuis 1970",
  );
  add(
    "stats.trendLifeIncrease",
    "Life Expectancy Increase",
    "Augmentation de l’espérance de vie",
  );
  add(
    "stats.trendCo2",
    "CO2 Change Since 1970",
    "Variation du CO₂ depuis 1970",
  );
  add("stats.trendAvg", "Average:", "Moyenne :");
  add("stats.trendUnitYears", "years", "ans");
  add("stats.trendUnitTons", "tons", "tonnes");

  add(
    "toast.minCountry",
    "At least one country must be selected",
    "Au moins un pays doit être sélectionné",
  );

  add(
    "wdi.ok",
    "World Bank WDI merged successfully.",
    "Données WDI de la Banque mondiale fusionnées avec succès.",
  );
  add(
    "wdi.fail",
    "World Bank data could not be loaded; charts use deterministic modelled series.",
    "Les données de la Banque mondiale n’ont pas pu être chargées ; les graphiques utilisent des séries modélisées.",
  );

  add("badge.highAccuracy", "High Accuracy", "Haute précision");
  add("badge.estimated", "Estimated", "Estimé");
  add("badge.lowAccuracy", "Low Accuracy", "Faible précision");
  add("badge.modelled", "Modelled", "Modélisé");
  add("badge.highWdi", "High (WDI)", "Élevé (WDI)");
  add("badge.partialWdi", "Partial WDI", "WDI partiel");
  add("badge.mixedWdiPop", "Mixed (WDI pop)", "Mixte (pop. WDI)");
  add("badge.partialEdelman", "Partial (Edelman)", "Partiel (Edelman)");
  add("badge.yoy", "YoY", "A/A");
  add(
    "badge.lowModelled",
    "Low Accuracy — Modelled",
    "Faible précision — Modélisé",
  );
  add(
    "badge.lowWhr2012",
    "Low Accuracy — WHR data begins 2012",
    "Faible précision — données WHR à partir de 2012",
  );
  add(
    "badge.lowCpi1995",
    "Low Accuracy — CPI exists since 1995 only",
    "Faible précision — IPC disponible seulement depuis 1995",
  );
  add(
    "badge.lowPre1990",
    "Low Accuracy — Modelled pre-1990",
    "Faible précision — modélisé avant 1990",
  );

  add(
    "note.giniInQol",
    "Gini coefficient chart is in the <strong>Quality of Life</strong> tab — now WDI-anchored when live data loads.",
    "Le graphique du coefficient de Gini se trouve dans l'onglet <strong>Qualité de vie</strong> — ancré WDI lorsque les données en direct sont chargées.",
  );
  add(
    "note.mediaTrustGov",
    "<strong>Media trust sources:</strong> Values from 2012 onward are anchored to the Edelman Trust Barometer (traditional media vs. search engines + social media). Pre-2012 points are backward-modelled. See also the Quality of Life tab for market-share trends.",
    "<strong>Sources confiance médias :</strong> les valeurs à partir de 2012 sont ancrées au Trust Barometer d’Edelman (médias traditionnels vs moteurs de recherche + réseaux sociaux). Les points avant 2012 sont modélisés rétrospectivement. Voir aussi l’onglet Qualité de vie pour les parts de marché.",
  );
  add(
    "note.mediaTrustSpeech",
    "This block separates the institutional environment for speech from trust in old and new media. From 2012 onward, trust ratings are anchored to the <strong>Edelman Trust Barometer</strong> (traditional media vs. search engines + social media). Pre-2012 values are modelled. Trust can fall even in free systems when polarization rises.",
    "Ce bloc sépare l’environnement institutionnel de l’expression de la confiance envers les médias anciens et nouveaux. À partir de 2012, les scores de confiance sont ancrés au <strong>Trust Barometer d'Edelman</strong> (médias traditionnels vs moteurs de recherche + réseaux sociaux). Avant 2012, les valeurs sont modélisées. La confiance peut baisser même dans des systèmes libres lorsque la polarisation augmente.",
  );

  add("chart.axis.year", "Year", "Année");
  add("chart.race.play", "Play ranking animation", "Lancer l'animation du classement");
  add("chart.race.close", "Close", "Fermer");
  add("chart.race.pause", "Pause", "Pause");
  add("chart.race.resume", "Resume", "Reprendre");
  add("chart.race.replay", "Replay", "Relire");

  add("spec.tag.logic", "Logic", "Logique");
  add("spec.tag.better", "If true, better", "Si vrai, plutôt bon");
  add("spec.tag.worse", "If true, worse", "Si vrai, plutôt mauvais");
  add("spec.head", "Reading the trend (logic)", "Lire la tendance (logique)");
  add(
    "spec.note",
    "Treat these as interpretation aids, not conclusions. They are most useful for understanding what a pattern would usually mean and what counter-pattern should make you hesitate.",
    "Traitez ces éléments comme des aides à l’interprétation, pas comme des conclusions. Ils servent surtout à comprendre ce qu’un schéma signifie d’ordinaire et quel contre-schéma devrait vous inciter à la prudence.",
  );
  add(
    "spec.fallbackCharts",
    "the chart(s) above",
    "le ou les graphiques ci-dessus",
  );
  add(
    "spec.guideNoChartTitles",
    "Use this panel with the indicators in this section: start with the long-run direction, then whether series move together in time, and only then infer a story.",
    "Utilisez ce cadre avec les indicateurs de cette section : commencez par la tendance de long terme, puis si les séries évoluent en phase dans le temps, et seulement ensuite dégagez une lecture.",
  );
  add(
    "spec.accuracyPrefix",
    "Accuracy labels here:",
    "Niveaux de précision affichés :",
  );
  add(
    "spec.accuracyHint",
    "Use direction, timing, and gaps more confidently than exact point values.",
    "Accordez plus de confiance à la direction, au calendrier et aux écarts qu’aux valeurs ponctuelles exactes.",
  );
  add(
    "spec.readShape",
    "Read the shape first: trend, turning points, and whether the lines confirm or contradict each other.",
    "Lisez d’abord la forme : tendance, points de retournement, et si les courbes se confirment ou se contredisent.",
  );
  add("spec.panel.look", "Look For", "À observer");
  add("spec.panel.read", "Read It As", "Interprétation");
  add("spec.panel.caution", "Do Not Overread", "Ne pas sur-interpréter");
  add(
    "spec.panel.lookText",
    "Shared breaks, widening gaps, or a line that changes direction while the other stays flat. Those patterns usually matter more than minor year-to-year wiggles.",
    "Ruptures communes, écarts qui se creusent, ou une courbe qui change de direction pendant que l’autre reste plate. Ces motifs comptent souvent plus que de petites oscillations d’une année sur l’autre.",
  );
  add(
    "spec.panel.readText",
    "When multiple series move together, a common driver is plausible. When they diverge, the useful question is what changed in productivity, policy, prices, demographics, or measurement.",
    "Quand plusieurs séries bougent ensemble, un facteur commun est plausible. Quand elles divergent, la question utile est ce qui a changé côté productivité, politique, prix, démographie ou mesure.",
  );
  add(
    "spec.guideIntro",
    "Use this box to interpret",
    "Utilisez ce cadre pour interpréter",
  );
  add(
    "spec.guideMid",
    ". Start with the long-run direction, then check whether the lines turn at the same time, and only then infer a story.",
    ". Commencez par la tendance de long terme, vérifiez si les courbes tournent en même temps, puis seulement dégagez une lecture.",
  );

  add(
    "provenance.html",
    '<strong>Data sources:</strong> On load, the page requests <a href="https://data.worldbank.org/" target="_blank" rel="noopener">World Bank World Development Indicators</a> (WDI) and merges: GDP (current US$), GDP per capita, GNI per capita (Atlas), current health expenditure per capita, secondary school enrollment (gross), goods &amp; services exports/imports, unemployment, employment-to-population (15+, ILO modelled), life expectancy, crude birth/death rates, fertility, infant mortality, CO₂ per capita, renewable share, forest area, adult literacy, internet users, mobile subscriptions per 100 people, R&amp;D % of GDP, and population (for immigration-per-capita denominators). Extended tabs add ~90 further WDI series (governance WGI, poverty, debt, FDI, energy, labor, patents, etc.) under the same merge rules. Trade balance is computed as exports minus imports from those series. Remaining charts use deterministic modelled series. WDI gaps are forward/backward-filled within each series. Chart pills update after merge: <strong>High (WDI)</strong> when the live indicator loaded; <strong>Partial WDI</strong> if the request failed for that series; <strong>Partial (Edelman)</strong> for media-trust anchors from 2012+. <strong>If you open this file as <code>file://</code>, the browser may block the API</strong>, but the dashboard still works using built-in deterministic data (no backend required). Illegal migration and composite “indices” here are not official cross-country statistics.',
    '<strong>Sources des données :</strong> au chargement, la page interroge les <a href="https://data.worldbank.org/" target="_blank" rel="noopener">Indicateurs du développement dans le monde</a> (WDI) de la Banque mondiale et fusionne notamment : PIB (US$ courants), PIB par habitant, RNB par habitant (méthode Atlas), dépenses de santé par habitant, scolarisation secondaire (brute), exportations/importations de biens et services, chômage, taux d’emploi (15+, modélisé OIT), espérance de vie, taux bruts de natalité/mortalité, fécondité, mortalité infantile, CO₂ par habitant, part des énergies renouvelables, surface forestière, alphabétisation des adultes, utilisateurs d’Internet, abonnements mobiles pour 100 habitants, R-D en % du PIB, et population (dénominateurs d’immigration par habitant). Les onglets étendus ajoutent ~90 séries WDI supplémentaires (gouvernance WGI, pauvreté, dette, IDE, énergie, travail, brevets, etc.) selon les mêmes règles de fusion. La balance commerciale est exportations moins importations. Les autres graphiques utilisent des séries modélisées déterministes. Les lacunes WDI sont comblées dans chaque série. Les pastilles se mettent à jour : <strong>Élevé (WDI)</strong> si l’indicateur a bien été chargé ; <strong>WDI partiel</strong> si la requête a échoué pour cette série ; <strong>Partiel (Edelman)</strong> pour les ancrages confiance médias à partir de 2012. <strong>Si vous ouvrez ce fichier en <code>file://</code>, le navigateur peut bloquer l’API</strong>, mais le tableau de bord fonctionne quand même avec les données déterministes intégrées (aucun backend requis). Les migrations « illégales » et certains indices composites ne sont pas des statistiques officielles comparatives.',
  );

  var chartIds = [
    "gdpChart",
    "gdpPerCapitaChart",
    "capitalGainsChart",
    "valuationChart",
    "militaryBudgetChart",
    "militaryShareChart",
    "militaryPerCapitaChart",
    "productivityChart",
    "employmentChart",
    "unemploymentChart",
    "salaryChart",
    "foodCostChart",
    "rentChart",
    "housingChart",
    "electricityChart",
    "gasChart",
    "carChart",
    "phoneContractChart",
    "internetContractChart",
    "tvContractChart",
    "telecomBundleChart",
    "healthcareChart",
    "foodbankChart",
    "homeownershipChart",
    "ageChart",
    "educationChart",
    "literacyChart",
    "deiChart",
    "genderEqualityChart",
    "happinessChart",
    "politicalFreedomChart",
    "violenceChart",
    "birthRateChart",
    "deathRateChart",
    "lifeExpectancyChart",
    "fertilityRateChart",
    "abortionRateChart",
    "infantMortalityChart",
    "obesityChart",
    "smokingChart",
    "diabetesChart",
    "mentalHealthChart",
    "co2EmissionsChart",
    "renewableEnergyChart",
    "forestCoverageChart",
    "waterQualityChart",
    "internetUsersChart",
    "mobilePhonesChart",
    "broadbandSpeedChart",
    "rndInvestmentChart",
    "exportsChart",
    "importsChart",
    "tradeBalanceChart",
    "legalImmigrationChart",
    "illegalImmigrationChart",
    "legalImmigrationPerCapitaChart",
    "illegalImmigrationPerCapitaChart",
    "immigrationNativeRatioChart",
    "expatArrivalsChart",
    "expatDeparturesChart",
    "qolIndexChart",
    "qolHappinessChart",
    "hdiChart",
    "giniChart",
    "corruptionChart",
    "qolPoliticalChart",
    "freeSpeechChart",
    "legacyMediaRatingChart",
    "newMediaRatingChart",
    "legacyMediaShareChart",
    "newMediaShareChart",
    "surgeryWaitChart",
    "physiciansChart",
    "hospitalBedsChart",
    "qolHealthcareChart",
    "christianChart",
    "muslimChart",
    "secularChart",
    "hinduBuddhistChart",
    "ruleOfLawChart",
    "govEffectivenessChart",
    "regulatoryQualityChart",
    "voiceAccountabilityChart",
    "womenParliamentChart",
    "govLegacyMediaTrustChart",
    "govNewMediaTrustChart",
    "povertyHeadcountChart",
    "inflationChart",
    "publicDebtChart",
    "fdiInflowsChart",
    "fdiOutflowsChart",
    "capitalFormationChart",
    "remittancesChart",
    "marketCapChart",
    "co2TotalChart",
    "energyUseChart",
    "fossilFuelChart",
    "elecRenewableChart",
    "pm25Chart",
    "industryGdpChart",
    "manufacturingGdpChart",
    "hiTechExportsChart",
    "protectedAreasChart",
    "odaReceivedChart",
    "netMigrationChart",
    "militaryPersonnelChart",
    "eduPrimaryChart",
    "eduTertiaryChart",
    "eduSpendingChart",
    "under5MortalityChart",
    "maternalMortalityChart",
    "gdpGrowthChart",
    "currentAccountChart",
    "taxRevenueChart",
    "tradeGdpChart",
    "incomeBottom20Chart",
    "incomeTop10Chart",
    "poverty365Chart",
    "controlCorruptionChart",
    "politicalStabilityChart",
    "hivPrevalenceChart",
    "tuberculosisChart",
    "suicideRateChart",
    "alcoholConsumptionChart",
    "co2IntensityChart",
    "arableLandChart",
    "freshwaterWithdrawalChart",
    "electricityAccessChart",
    "cleanFuelAccessChart",
    "populationGrowthChart",
    "urbanPopulationChart",
    "ageDependencyChart",
    "schoolLifeExpectancyChart",
    "domesticCreditChart",
    "youthUnemploymentChart",
    "vulnerableEmploymentChart",
    "femaleLaborForceChart",
    "maleLaborForceChart",
    "researchersChart",
    "patentsChart",
    "serviceExportsChart",
    "militarySpendWdiChart",
    "populationTotalChart",
    "healthSpendGdpChart",
  ];

  var TITLES_EN = {
    gdpChart: "GDP (Trillion USD)",
    gdpPerCapitaChart: "GDP Per Capita (USD)",
    capitalGainsChart: "Average Capital Gains (USD)",
    valuationChart: "Company Valuation Index",
    militaryBudgetChart: "Military Expenditure (USD bn)",
    militaryShareChart: "Military Expenditure (% of GDP)",
    militaryPerCapitaChart: "Military Expenditure Per Capita (USD)",
    productivityChart: "Labour Productivity Index (1990 = 100)",
    employmentChart: "Employment to population (15+, %)",
    unemploymentChart: "Unemployment Rate (%)",
    salaryChart: "GNI per capita, Atlas (USD, WDI)",
    foodCostChart: "Food Costs (USD/month)",
    rentChart: "Rent (USD/month)",
    housingChart: "Housing Costs (USD)",
    electricityChart: "Electricity Costs (USD/month)",
    gasChart: "Gas Price (USD/litre)",
    carChart: "Car Costs (USD)",
    phoneContractChart: "Monthly Phone Contract (USD/month)",
    internetContractChart: "Monthly Broadband / Internet Contract (USD/month)",
    tvContractChart: "Monthly TV / Streaming Subscription (USD/month)",
    telecomBundleChart:
      "Total Telecom Bundle (Phone + Internet + TV) (USD/month)",
    healthcareChart: "Health expenditure per capita (WDI) (USD/year)",
    foodbankChart: "Food Bank Costs (Million USD)",
    homeownershipChart: "Homeownership Rate (%)",
    ageChart: "Average Age (Years)",
    educationChart: "Secondary school enrollment, gross (WDI) (%)",
    literacyChart: "Literacy Rate (%)",
    deiChart: "DEI Index (Score 0-100)",
    genderEqualityChart: "Gender Equality Index (Index 0-1)",
    happinessChart: "Happiness Index (Index 0-10)",
    politicalFreedomChart: "Political Freedom Index (Index 0-10)",
    violenceChart: "Violence Index (Index)",
    birthRateChart: "Birth Rate (Per 1000 people)",
    deathRateChart: "Death Rate (Per 1000 people)",
    lifeExpectancyChart: "Life Expectancy (Years)",
    fertilityRateChart: "Fertility Rate (Children per woman)",
    abortionRateChart: "Abortion Rate (Per 1,000 women ages 15-44)",
    infantMortalityChart: "Infant Mortality Rate (Per 1000 live births)",
    obesityChart: "Obesity Rate (%)",
    smokingChart: "Smoking Prevalence (%)",
    diabetesChart: "Diabetes Rate (%)",
    mentalHealthChart: "Mental Health Index (Index)",
    co2EmissionsChart: "CO2 Emissions (metric tons per capita)",
    renewableEnergyChart: "Renewable Energy (% of total energy)",
    forestCoverageChart: "Forest Coverage (% of land area)",
    waterQualityChart: "Water Quality Index (Index)",
    internetUsersChart: "Internet Users (% of population)",
    mobilePhonesChart: "Mobile cellular subscriptions (per 100 people)",
    broadbandSpeedChart: "Broadband Speed (Mbps)",
    rndInvestmentChart: "R&D Investment (% of GDP)",
    exportsChart: "Exports (Billion USD)",
    importsChart: "Imports (Billion USD)",
    tradeBalanceChart: "Trade Balance (Billion USD)",
    legalImmigrationChart: "Legal Immigration (People)",
    illegalImmigrationChart: "Illegal Immigration (People)",
    legalImmigrationPerCapitaChart:
      "Legal Immigration Per Capita (Per 100k people)",
    illegalImmigrationPerCapitaChart:
      "Illegal Immigration Per Capita (Per 100k people)",
    immigrationNativeRatioChart:
      "Immigration Inflow Ratio (% of resident population)",
    expatArrivalsChart: "Expat Arrivals (People)",
    expatDeparturesChart: "Expat Departures (People)",
    qolIndexChart: "Quality of Life Index (Score 0–100)",
    qolHappinessChart:
      "Happiness Index (World Happiness Report basis) (Score 0–10)",
    hdiChart: "Human Development Index (HDI 0–1)",
    giniChart:
      "Gini Coefficient – Income Inequality (Gini 0 = equal, 100 = unequal)",
    corruptionChart:
      "Corruption Perception Index (Score 0–100, higher = cleaner)",
    qolPoliticalChart: "Political Freedom Index (Score 0–10)",
    freeSpeechChart: "Free Speech Rating (Score 0–10)",
    legacyMediaRatingChart: "Legacy Media Trust Rating (Score 0–10, Edelman 2012+)",
    newMediaRatingChart: "New Media Trust Rating (Score 0–10, Edelman 2012+)",
    legacyMediaShareChart: "Legacy Media Market Share (Share %)",
    newMediaShareChart: "New Media Market Share (Share %)",
    ruleOfLawChart: "Rule of Law Index (WGI, −2.5 to +2.5)",
    govEffectivenessChart: "Government Effectiveness (WGI)",
    regulatoryQualityChart: "Regulatory Quality (WGI)",
    voiceAccountabilityChart: "Voice & Accountability (WGI)",
    womenParliamentChart: "Women in Parliament (%)",
    govLegacyMediaTrustChart: "Legacy / Traditional Media Trust (Edelman, 0–10)",
    govNewMediaTrustChart: "New / Digital Media Trust (Edelman, 0–10)",
    povertyHeadcountChart: "Poverty Headcount ($2.15/day, %)",
    inflationChart: "Inflation, CPI (annual %)",
    publicDebtChart: "Public Debt (% of GDP)",
    fdiInflowsChart: "FDI Inflows (% of GDP)",
    fdiOutflowsChart: "FDI Outflows (% of GDP)",
    capitalFormationChart: "Gross Capital Formation (% of GDP)",
    remittancesChart: "Remittances Received (% of GDP)",
    marketCapChart: "Stock Market Cap (% of GDP)",
    co2TotalChart: "CO₂ Total Emissions (kt)",
    energyUseChart: "Energy Use (kg oil eq. per capita)",
    fossilFuelChart: "Fossil Fuel Share (% of energy)",
    elecRenewableChart: "Electricity from Renewables (%)",
    pm25Chart: "PM2.5 Air Pollution (μg/m³)",
    industryGdpChart: "Industry Value Added (% of GDP)",
    manufacturingGdpChart: "Manufacturing (% of GDP)",
    hiTechExportsChart: "High-Tech Exports (% of mfg exports)",
    protectedAreasChart: "Protected Areas (% of land)",
    odaReceivedChart: "ODA Received (% of GNI)",
    netMigrationChart: "Net Migration (people)",
    militaryPersonnelChart: "Armed Forces (% of labor force)",
    eduPrimaryChart: "Primary Enrollment (% gross)",
    eduTertiaryChart: "Tertiary Enrollment (% gross)",
    eduSpendingChart: "Education Spending (% of GDP)",
    under5MortalityChart: "Under-5 Mortality (per 1,000 live births)",
    maternalMortalityChart: "Maternal Mortality Ratio (per 100,000 live births)",
    gdpGrowthChart: "GDP Growth (annual %)",
    currentAccountChart: "Current Account Balance (% of GDP)",
    taxRevenueChart: "Tax Revenue (% of GDP)",
    tradeGdpChart: "Trade (% of GDP)",
    incomeBottom20Chart: "Income Share – Bottom 20% (%)",
    incomeTop10Chart: "Income Share – Top 10% (%)",
    poverty365Chart: "Poverty Headcount ($3.65/day, %)",
    controlCorruptionChart: "Control of Corruption (WGI, −2.5 to +2.5)",
    politicalStabilityChart: "Political Stability (WGI, −2.5 to +2.5)",
    hivPrevalenceChart: "HIV Prevalence (% ages 15–49)",
    tuberculosisChart: "Tuberculosis Incidence (per 100,000)",
    suicideRateChart: "Suicide Mortality Rate (per 100,000)",
    alcoholConsumptionChart: "Alcohol Consumption (litres pure alcohol/capita)",
    co2IntensityChart: "CO₂ Intensity (kg per PPP $ of GDP)",
    arableLandChart: "Arable Land (% of land area)",
    freshwaterWithdrawalChart: "Freshwater Withdrawal (billion m³)",
    electricityAccessChart: "Access to Electricity (% of population)",
    cleanFuelAccessChart: "Access to Clean Fuels for Cooking (%)",
    populationGrowthChart: "Population Growth (annual %)",
    urbanPopulationChart: "Urban Population (% of total)",
    ageDependencyChart: "Age Dependency Ratio (% of working-age population)",
    schoolLifeExpectancyChart: "School Life Expectancy (years)",
    domesticCreditChart: "Domestic Credit to Private Sector (% of GDP)",
    youthUnemploymentChart: "Youth Unemployment (% ages 15–24)",
    vulnerableEmploymentChart: "Vulnerable Employment (% of total employment)",
    femaleLaborForceChart: "Female Labor Force Participation (% ages 15+)",
    maleLaborForceChart: "Male Labor Force Participation (% ages 15+)",
    researchersChart: "Researchers in R&D (per million people)",
    patentsChart: "Patent Applications (residents)",
    serviceExportsChart: "Service Exports (billion USD)",
    militarySpendWdiChart: "Military Expenditure (% of GDP, WDI)",
    populationTotalChart: "Total Population (millions, WDI)",
    healthSpendGdpChart: "Health Expenditure (% of GDP, WDI)",
    surgeryWaitChart: "Median Elective Surgery Wait Time (Weeks)",
    physiciansChart: "Physicians per 1,000 People (Physicians / 1k)",
    hospitalBedsChart: "Hospital Beds per 1,000 People (Beds / 1k)",
    qolHealthcareChart: "Healthcare Expenditure per Capita (USD / year)",
    christianChart: "Christian Population Share (%)",
    muslimChart: "Muslim Population Share (%)",
    secularChart: "Secular / Unaffiliated Population Share (%)",
    hinduBuddhistChart: "Hindu & Buddhist Population Share (%)",
  };

  var TITLES_FR = {
    gdpChart: "PIB (milliards USD)",
    gdpPerCapitaChart: "PIB par habitant (USD)",
    capitalGainsChart: "Plus-values moyennes (USD)",
    valuationChart: "Indice de valorisation des entreprises",
    militaryBudgetChart: "Dépenses militaires (milliards USD)",
    militaryShareChart: "Dépenses militaires (% du PIB)",
    militaryPerCapitaChart: "Dépenses militaires par habitant (USD)",
    productivityChart: "Indice de productivité du travail (1990 = 100)",
    employmentChart: "Taux d’emploi (15+, %)",
    unemploymentChart: "Taux de chômage (%)",
    salaryChart: "RNB par habitant, Atlas (USD, BM)",
    foodCostChart: "Alimentation (USD/mois)",
    rentChart: "Loyer (USD/mois)",
    housingChart: "Logement (USD)",
    electricityChart: "Électricité (USD/mois)",
    gasChart: "Prix du carburant (USD/litre)",
    carChart: "Coût automobile (USD)",
    phoneContractChart: "Forfait téléphonique mensuel (USD/mois)",
    internetContractChart: "Internet / haut débit mensuel (USD/mois)",
    tvContractChart: "TV / streaming mensuel (USD/mois)",
    telecomBundleChart:
      "Forfait télécom total (tél. + Internet + TV) (USD/mois)",
    healthcareChart: "Dépenses de santé par habitant (BM) (USD/an)",
    foodbankChart: "Coûts banques alimentaires (millions USD)",
    homeownershipChart: "Taux d’accession à la propriété (%)",
    ageChart: "Âge moyen (ans)",
    educationChart: "Scolarisation secondaire brute (BM) (%)",
    literacyChart: "Taux d’alphabétisation (%)",
    deiChart: "Indice EDI (score 0-100)",
    genderEqualityChart: "Indice d’égalité femmes-hommes (0-1)",
    happinessChart: "Indice de bonheur (0-10)",
    politicalFreedomChart: "Indice de liberté politique (0-10)",
    violenceChart: "Indice de violence",
    birthRateChart: "Taux de natalité (pour 1 000 hab.)",
    deathRateChart: "Taux de mortalité (pour 1 000 hab.)",
    lifeExpectancyChart: "Espérance de vie (ans)",
    fertilityRateChart: "Indice de fécondité (enfants/femme)",
    abortionRateChart: "Taux d’IVG (pour 1 000 femmes 15-44 ans)",
    infantMortalityChart: "Mortalité infantile (pour 1 000 naissances)",
    obesityChart: "Taux d’obésité (%)",
    smokingChart: "Prévalence du tabagisme (%)",
    diabetesChart: "Taux de diabète (%)",
    mentalHealthChart: "Indice de santé mentale",
    co2EmissionsChart: "Émissions de CO₂ (tonnes métriques/hab.)",
    renewableEnergyChart: "Énergies renouvelables (% de l’énergie)",
    forestCoverageChart: "Surface forestière (% du territoire)",
    waterQualityChart: "Indice de qualité de l’eau",
    internetUsersChart: "Utilisateurs d’Internet (% de la population)",
    mobilePhonesChart: "Abonnements mobiles (pour 100 hab.)",
    broadbandSpeedChart: "Débit haut débit (Mbit/s)",
    rndInvestmentChart: "R-D (% du PIB)",
    exportsChart: "Exportations (milliards USD)",
    importsChart: "Importations (milliards USD)",
    tradeBalanceChart: "Balance commerciale (milliards USD)",
    legalImmigrationChart: "Immigration légale (personnes)",
    illegalImmigrationChart: "Immigration irrégulière (personnes)",
    legalImmigrationPerCapitaChart: "pour 100k hab.",
    illegalImmigrationPerCapitaChart: "pour 100k hab.",
    immigrationNativeRatioChart:
      "Ratio des flux migratoires (% population résidente)",
    expatArrivalsChart: "Personnes",
    expatDeparturesChart: "Personnes",
    qolIndexChart: "Score (0–100)",
    qolHappinessChart: "Score (0–10)",
    hdiChart: "IDH (0–1)",
    giniChart: "Gini (0 = égal, 100 = inégal)",
    corruptionChart: "Score (0–100, plus haut = plus propre)",
    qolPoliticalChart: "Score (0–10)",
    freeSpeechChart: "Score (0–10)",
    legacyMediaRatingChart:
      "Indice de confiance médias traditionnels (0–10, Edelman 2012+)",
    newMediaRatingChart:
      "Indice de confiance médias numériques (0–10, Edelman 2012+)",
    legacyMediaShareChart: "Part (%)",
    newMediaShareChart: "Part (%)",
    surgeryWaitChart: "Semaines",
    physiciansChart: "Médecins / 1k",
    hospitalBedsChart: "Lits / 1k",
    qolHealthcareChart: "USD / an",
    christianChart: "% de la population",
    muslimChart: "% de la population",
    secularChart: "% de la population",
    hinduBuddhistChart: "% de la population",
    ruleOfLawChart: "Indice État de droit (WGI)",
    govEffectivenessChart: "Efficacité gouvernementale (WGI)",
    regulatoryQualityChart: "Qualité réglementaire (WGI)",
    voiceAccountabilityChart: "Voix et responsabilité (WGI)",
    womenParliamentChart: "Femmes au parlement (%)",
    govLegacyMediaTrustChart: "Confiance médias traditionnels (Edelman, 0–10)",
    govNewMediaTrustChart: "Confiance médias numériques (Edelman, 0–10)",
    povertyHeadcountChart: "Pauvreté ($2,15/jour, %)",
    inflationChart: "Inflation IPC (%)",
    publicDebtChart: "Dette publique (% PIB)",
    fdiInflowsChart: "IDE entrants (% PIB)",
    fdiOutflowsChart: "IDE sortants (% PIB)",
    capitalFormationChart: "Formation brute de capital (% PIB)",
    remittancesChart: "Transferts reçus (% PIB)",
    marketCapChart: "Capitalisation boursière (% PIB)",
    co2TotalChart: "Émissions CO₂ totales (kt)",
    energyUseChart: "Consommation d’énergie (kg éq. pétrole/hab.)",
    fossilFuelChart: "Part des énergies fossiles (%)",
    elecRenewableChart: "Électricité renouvelable (%)",
    pm25Chart: "Pollution PM2,5 (μg/m³)",
    industryGdpChart: "Industrie (% PIB)",
    manufacturingGdpChart: "Manufacture (% PIB)",
    hiTechExportsChart: "Exportations high-tech (% export. manuf.)",
    protectedAreasChart: "Aires protégées (% territoire)",
    odaReceivedChart: "Aide publique reçue (% RNB)",
    netMigrationChart: "Migration nette (personnes)",
    militaryPersonnelChart: "Forces armées (% main-d’œuvre)",
    eduPrimaryChart: "Scolarisation primaire (% brut)",
    eduTertiaryChart: "Scolarisation tertiaire (% brut)",
    eduSpendingChart: "Dépenses éducation (% PIB)",
    under5MortalityChart: "Mortalité -5 ans (pour 1 000 naissances)",
    maternalMortalityChart: "Mortalité maternelle (pour 100 000 naissances)",
    gdpGrowthChart: "Croissance du PIB (% annuel)",
    currentAccountChart: "Balance courante (% PIB)",
    taxRevenueChart: "Recettes fiscales (% PIB)",
    tradeGdpChart: "Commerce (% PIB)",
    incomeBottom20Chart: "Part de revenu – 20 % les plus pauvres (%)",
    incomeTop10Chart: "Part de revenu – 10 % les plus riches (%)",
    poverty365Chart: "Pauvreté ($3,65/jour, %)",
    controlCorruptionChart: "Contrôle de la corruption (WGI)",
    politicalStabilityChart: "Stabilité politique (WGI)",
    hivPrevalenceChart: "Prévalence du VIH (% 15–49 ans)",
    tuberculosisChart: "Incidence tuberculose (pour 100 000)",
    suicideRateChart: "Mortalité par suicide (pour 100 000)",
    alcoholConsumptionChart: "Consommation d'alcool (litres/hab.)",
    co2IntensityChart: "Intensité CO₂ (kg par $ PIB PPA)",
    arableLandChart: "Terres arables (% du territoire)",
    freshwaterWithdrawalChart: "Prélèvements d'eau douce (milliards m³)",
    electricityAccessChart: "Accès à l'électricité (% pop.)",
    cleanFuelAccessChart: "Accès aux combustibles propres (%)",
    populationGrowthChart: "Croissance démographique (% annuel)",
    urbanPopulationChart: "Population urbaine (% du total)",
    ageDependencyChart: "Ratio de dépendance démographique (%)",
    schoolLifeExpectancyChart: "Espérance de scolarisation (ans)",
    domesticCreditChart: "Crédit intérieur au secteur privé (% PIB)",
    youthUnemploymentChart: "Chômage des jeunes (% 15–24 ans)",
    vulnerableEmploymentChart: "Emploi vulnérable (% emploi total)",
    femaleLaborForceChart: "Participation féminine (% 15+)",
    maleLaborForceChart: "Participation masculine (% 15+)",
    researchersChart: "Chercheurs en R-D (par million)",
    patentsChart: "Demandes de brevets (résidents)",
    serviceExportsChart: "Exportations de services (milliards USD)",
    militarySpendWdiChart: "Dépenses militaires (% PIB, WDI)",
    populationTotalChart: "Population totale (millions, WDI)",
    healthSpendGdpChart: "Dépenses de santé (% du PIB, WDI)",
  };

  var Y_EN = {
    gdpChart: "Trillion USD",
    gdpPerCapitaChart: "USD",
    capitalGainsChart: "USD",
    valuationChart: "Index",
    militaryBudgetChart: "USD bn",
    militaryShareChart: "% of GDP",
    militaryPerCapitaChart: "USD/person",
    productivityChart: "Index (1990 = 100)",
    employmentChart: "%",
    unemploymentChart: "%",
    salaryChart: "USD",
    foodCostChart: "USD/month",
    rentChart: "USD/month",
    housingChart: "USD",
    electricityChart: "USD/month",
    gasChart: "USD/litre",
    carChart: "USD",
    phoneContractChart: "USD/month",
    internetContractChart: "USD/month",
    tvContractChart: "USD/month",
    telecomBundleChart: "USD/month",
    healthcareChart: "USD/year",
    foodbankChart: "Million USD",
    homeownershipChart: "%",
    ageChart: "Years",
    educationChart: "%",
    literacyChart: "%",
    deiChart: "Score (0-100)",
    genderEqualityChart: "Index (0-1)",
    happinessChart: "Index (0-10)",
    politicalFreedomChart: "Index (0-10)",
    violenceChart: "Index",
    birthRateChart: "Per 1000 people",
    deathRateChart: "Per 1000 people",
    lifeExpectancyChart: "Years",
    fertilityRateChart: "Children per woman",
    abortionRateChart: "Per 1,000 women ages 15-44",
    infantMortalityChart: "Per 1000 live births",
    obesityChart: "%",
    smokingChart: "%",
    diabetesChart: "%",
    mentalHealthChart: "Index",
    co2EmissionsChart: "metric tons per capita",
    renewableEnergyChart: "% of total energy",
    forestCoverageChart: "% of land area",
    waterQualityChart: "Index",
    internetUsersChart: "% of population",
    mobilePhonesChart: "per 100 people",
    broadbandSpeedChart: "Mbps",
    rndInvestmentChart: "% of GDP",
    exportsChart: "Billion USD",
    importsChart: "Billion USD",
    tradeBalanceChart: "Billion USD",
    legalImmigrationChart: "People",
    illegalImmigrationChart: "People",
    legalImmigrationPerCapitaChart: "Per 100k people",
    illegalImmigrationPerCapitaChart: "Per 100k people",
    immigrationNativeRatioChart: "% of resident population",
    expatArrivalsChart: "People",
    expatDeparturesChart: "People",
    qolIndexChart: "Score (0–100)",
    qolHappinessChart: "Score (0–10)",
    hdiChart: "HDI (0–1)",
    giniChart: "Gini (0 = equal, 100 = unequal)",
    corruptionChart: "Score (0–100, higher = cleaner)",
    qolPoliticalChart: "Score (0–10)",
    freeSpeechChart: "Score (0–10)",
    legacyMediaRatingChart: "Score (0–10)",
    newMediaRatingChart: "Score (0–10)",
    legacyMediaShareChart: "Share (%)",
    newMediaShareChart: "Share (%)",
    surgeryWaitChart: "Weeks",
    physiciansChart: "Physicians / 1k",
    hospitalBedsChart: "Beds / 1k",
    qolHealthcareChart: "USD / an",
    christianChart: "% of population",
    muslimChart: "% of population",
    secularChart: "% of population",
    hinduBuddhistChart: "% of population",
    ruleOfLawChart: "WGI index",
    govEffectivenessChart: "WGI index",
    regulatoryQualityChart: "WGI index",
    voiceAccountabilityChart: "WGI index",
    womenParliamentChart: "%",
    govLegacyMediaTrustChart: "Score (0–10)",
    govNewMediaTrustChart: "Score (0–10)",
    povertyHeadcountChart: "%",
    inflationChart: "Annual %",
    publicDebtChart: "% of GDP",
    fdiInflowsChart: "% of GDP",
    fdiOutflowsChart: "% of GDP",
    capitalFormationChart: "% of GDP",
    remittancesChart: "% of GDP",
    marketCapChart: "% of GDP",
    co2TotalChart: "kt",
    energyUseChart: "kg oil eq./capita",
    fossilFuelChart: "% of energy",
    elecRenewableChart: "%",
    pm25Chart: "μg/m³",
    industryGdpChart: "% of GDP",
    manufacturingGdpChart: "% of GDP",
    hiTechExportsChart: "% of mfg exports",
    protectedAreasChart: "% of land",
    odaReceivedChart: "% of GNI",
    netMigrationChart: "People",
    militaryPersonnelChart: "% of labor force",
    eduPrimaryChart: "% gross",
    eduTertiaryChart: "% gross",
    eduSpendingChart: "% of GDP",
    under5MortalityChart: "Per 1,000 live births",
    maternalMortalityChart: "Per 100,000 live births",
    gdpGrowthChart: "Annual %",
    currentAccountChart: "% of GDP",
    taxRevenueChart: "% of GDP",
    tradeGdpChart: "% of GDP",
    incomeBottom20Chart: "%",
    incomeTop10Chart: "%",
    poverty365Chart: "%",
    controlCorruptionChart: "WGI index",
    politicalStabilityChart: "WGI index",
    hivPrevalenceChart: "%",
    tuberculosisChart: "Per 100,000",
    suicideRateChart: "Per 100,000",
    alcoholConsumptionChart: "Litres/capita",
    co2IntensityChart: "kg/PPP $",
    arableLandChart: "% of land",
    freshwaterWithdrawalChart: "Billion m³",
    electricityAccessChart: "%",
    cleanFuelAccessChart: "%",
    populationGrowthChart: "Annual %",
    urbanPopulationChart: "%",
    ageDependencyChart: "%",
    schoolLifeExpectancyChart: "Years",
    domesticCreditChart: "% of GDP",
    youthUnemploymentChart: "%",
    vulnerableEmploymentChart: "%",
    femaleLaborForceChart: "%",
    maleLaborForceChart: "%",
    researchersChart: "Per million",
    patentsChart: "Applications",
    serviceExportsChart: "Billion USD",
    militarySpendWdiChart: "% of GDP",
    populationTotalChart: "Millions",
    healthSpendGdpChart: "% of GDP",
  };

  var Y_FR = {
    gdpChart: "Milliards USD",
    gdpPerCapitaChart: "USD",
    capitalGainsChart: "USD",
    valuationChart: "Indice",
    militaryBudgetChart: "milliards USD",
    militaryShareChart: "% du PIB",
    militaryPerCapitaChart: "USD/hab.",
    productivityChart: "Indice (1990 = 100)",
    employmentChart: "%",
    unemploymentChart: "%",
    salaryChart: "USD",
    foodCostChart: "USD/mois",
    rentChart: "USD/mois",
    housingChart: "USD",
    electricityChart: "USD/mois",
    gasChart: "USD/litre",
    carChart: "USD",
    phoneContractChart: "USD/mois",
    internetContractChart: "USD/mois",
    tvContractChart: "USD/mois",
    telecomBundleChart: "USD/mois",
    healthcareChart: "USD/an",
    foodbankChart: "millions USD",
    homeownershipChart: "%",
    ageChart: "Ans",
    educationChart: "%",
    literacyChart: "%",
    deiChart: "Score (0-100)",
    genderEqualityChart: "Indice (0-1)",
    happinessChart: "Indice (0-10)",
    politicalFreedomChart: "Indice (0-10)",
    violenceChart: "Indice",
    birthRateChart: "Pour 1 000 hab.",
    deathRateChart: "Pour 1 000 hab.",
    lifeExpectancyChart: "Ans",
    fertilityRateChart: "Enfants/femme",
    abortionRateChart: "Pour 1 000 femmes 15-44 ans",
    infantMortalityChart: "Pour 1 000 naissances",
    obesityChart: "%",
    smokingChart: "%",
    diabetesChart: "%",
    mentalHealthChart: "Indice",
    co2EmissionsChart: "tonnes métriques/hab.",
    renewableEnergyChart: "% de l’énergie",
    forestCoverageChart: "% du territoire",
    waterQualityChart: "Indice",
    internetUsersChart: "% de la population",
    mobilePhonesChart: "pour 100 hab.",
    broadbandSpeedChart: "Mbit/s",
    rndInvestmentChart: "% du PIB",
    exportsChart: "milliards USD",
    importsChart: "milliards USD",
    tradeBalanceChart: "milliards USD",
    legalImmigrationChart: "Personnes",
    illegalImmigrationChart: "Personnes",
    legalImmigrationPerCapitaChart: "pour 100k hab.",
    illegalImmigrationPerCapitaChart: "pour 100k hab.",
    immigrationNativeRatioChart: "% de la population résidente",
    expatArrivalsChart: "Personnes",
    expatDeparturesChart: "Personnes",
    qolIndexChart: "Score (0–100)",
    qolHappinessChart: "Score (0–10)",
    hdiChart: "IDH (0–1)",
    giniChart: "Gini (0 = égal, 100 = inégal)",
    corruptionChart: "Score (0–100, plus haut = plus propre)",
    qolPoliticalChart: "Score (0–10)",
    freeSpeechChart: "Score (0–10)",
    legacyMediaRatingChart:
      "Indice de confiance médias traditionnels (0–10, Edelman 2012+)",
    newMediaRatingChart:
      "Indice de confiance médias numériques (0–10, Edelman 2012+)",
    legacyMediaShareChart: "Part (%)",
    newMediaShareChart: "Part (%)",
    surgeryWaitChart: "Semaines",
    physiciansChart: "Médecins / 1k",
    hospitalBedsChart: "Lits / 1k",
    qolHealthcareChart: "USD / an",
    christianChart: "% de la population",
    muslimChart: "% de la population",
    secularChart: "% de la population",
    hinduBuddhistChart: "% de la population",
    ruleOfLawChart: "Indice WGI",
    govEffectivenessChart: "Indice WGI",
    regulatoryQualityChart: "Indice WGI",
    voiceAccountabilityChart: "Indice WGI",
    womenParliamentChart: "%",
    govLegacyMediaTrustChart: "Score (0–10)",
    govNewMediaTrustChart: "Score (0–10)",
    povertyHeadcountChart: "%",
    inflationChart: "% annuel",
    publicDebtChart: "% du PIB",
    fdiInflowsChart: "% du PIB",
    fdiOutflowsChart: "% du PIB",
    capitalFormationChart: "% du PIB",
    remittancesChart: "% du PIB",
    marketCapChart: "% du PIB",
    co2TotalChart: "kt",
    energyUseChart: "kg éq. pétrole/hab.",
    fossilFuelChart: "% de l’énergie",
    elecRenewableChart: "%",
    pm25Chart: "μg/m³",
    industryGdpChart: "% du PIB",
    manufacturingGdpChart: "% du PIB",
    hiTechExportsChart: "% export. manuf.",
    protectedAreasChart: "% du territoire",
    odaReceivedChart: "% du RNB",
    netMigrationChart: "Personnes",
    militaryPersonnelChart: "% main-d’œuvre",
    eduPrimaryChart: "% brut",
    eduTertiaryChart: "% brut",
    eduSpendingChart: "% du PIB",
    under5MortalityChart: "Pour 1 000 naissances",
    maternalMortalityChart: "Pour 100 000 naissances",
    gdpGrowthChart: "% annuel",
    currentAccountChart: "% du PIB",
    taxRevenueChart: "% du PIB",
    tradeGdpChart: "% du PIB",
    incomeBottom20Chart: "%",
    incomeTop10Chart: "%",
    poverty365Chart: "%",
    controlCorruptionChart: "Indice WGI",
    politicalStabilityChart: "Indice WGI",
    hivPrevalenceChart: "%",
    tuberculosisChart: "Pour 100 000",
    suicideRateChart: "Pour 100 000",
    alcoholConsumptionChart: "Litres/hab.",
    co2IntensityChart: "kg/$ PIB PPA",
    arableLandChart: "% du territoire",
    freshwaterWithdrawalChart: "Milliards m³",
    electricityAccessChart: "%",
    cleanFuelAccessChart: "%",
    populationGrowthChart: "% annuel",
    urbanPopulationChart: "%",
    ageDependencyChart: "%",
    schoolLifeExpectancyChart: "Ans",
    domesticCreditChart: "% du PIB",
    youthUnemploymentChart: "%",
    vulnerableEmploymentChart: "%",
    femaleLaborForceChart: "%",
    maleLaborForceChart: "%",
    researchersChart: "Par million",
    patentsChart: "Demandes",
    serviceExportsChart: "Milliards USD",
    militarySpendWdiChart: "% du PIB",
    populationTotalChart: "Millions",
    healthSpendGdpChart: "% du PIB",
  };

  chartIds.forEach(function (id) {
    add(
      "ct." + id,
      TITLES_EN[id],
      TITLES_FR[id],
      typeof TITLES_ES !== "undefined" && TITLES_ES[id] ? TITLES_ES[id] : TITLES_EN[id],
    );
    add(
      "cy." + id,
      Y_EN[id],
      Y_FR[id],
      typeof Y_ES !== "undefined" && Y_ES[id] ? Y_ES[id] : Y_EN[id],
    );
  });

  function getLocale() {
    var lang = localStorage.getItem("locale") || "en";
    if (lang !== "en" && lang !== "fr" && lang !== "es") lang = "en";
    return lang;
  }

  function setLocale(lang) {
    if (lang !== "en" && lang !== "fr" && lang !== "es") lang = "en";
    localStorage.setItem("locale", lang);
    document.documentElement.lang = lang;
    if (typeof window.applyDashboardLocale === "function") {
      window.applyDashboardLocale();
    }
    updateLangToggleUi();
  }

  function toggleLocale() {
    var order = ["en", "fr", "es"];
    var i = order.indexOf(getLocale());
    setLocale(order[(i + 1) % order.length]);
  }

  function yearTokens() {
    var start =
      typeof YEARS !== "undefined" && YEARS.length ? YEARS[0] : 1970;
    var end =
      typeof YEARS !== "undefined" && YEARS.length
        ? YEARS[YEARS.length - 1]
        : new Date().getFullYear();
    return {
      start: String(start),
      end: String(end),
      prev: String(end - 1),
    };
  }

  function applyYearTokens(str) {
    if (typeof str !== "string" || str.indexOf("{") === -1) return str;
    var tok = yearTokens();
    return str
      .replace(/\{start\}/g, tok.start)
      .replace(/\{end\}/g, tok.end)
      .replace(/\{prev\}/g, tok.prev);
  }

  function resolved(key) {
    var loc = getLocale();
    var pack = MSGS[loc] || MSGS.en;
    var raw = (pack && pack[key]) || (MSGS.en && MSGS.en[key]);
    if (!raw || raw === key) return null;
    return applyYearTokens(raw);
  }

  function t(key) {
    return resolved(key) || key;
  }

  function updateLangToggleUi() {
    var el = document.getElementById("lang-toggle-label");
    if (!el) return;
    var loc = getLocale();
    el.textContent =
      loc === "fr"
        ? t("lang.labelFr")
        : loc === "es"
          ? t("lang.labelEs")
          : t("lang.labelEn");
    var btn = document.getElementById("lang-toggle");
    if (btn) btn.setAttribute("title", t("lang.toggleTitle"));
  }

  function applyDataI18nAttributes() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      var val = resolved(key);
      if (!val) return;
      if (el.getAttribute("data-i18n-html") === "true") {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      var val = key && resolved(key);
      if (val) el.setAttribute("title", val);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      var val = key && resolved(key);
      if (val) el.setAttribute("aria-label", val);
    });
  }

  function applyChartTitlesFromLocale() {
    chartIds.forEach(function (id) {
      var canvas = document.getElementById(id);
      if (!canvas) return;
      var container = canvas.closest(".chart-container");
      if (!container) return;
      var titleRow = container.querySelector(".chart-title");
      if (!titleRow) return;
      var spans = titleRow.querySelectorAll("span");
      if (!spans.length) return;
      var first = spans[0];
      if (first.classList.contains("accuracy-badge") && spans[1])
        first = spans[1];
      if (!first.classList.contains("accuracy-badge")) {
        var title = resolved("ct." + id);
        if (title) first.textContent = title;
      }
    });
  }

  function translateStaticAccuracyBadge(el) {
    var map = {
      "High Accuracy": "badge.highAccuracy",
      Estimated: "badge.estimated",
      "Low Accuracy": "badge.lowAccuracy",
      Modelled: "badge.modelled",
      YoY: "badge.yoy",
      "High (WDI)": "badge.highWdi",
      "Partial WDI": "badge.partialWdi",
      "Mixed (WDI pop)": "badge.mixedWdiPop",
      "Partial (Edelman)": "badge.partialEdelman",
      "Low Accuracy — Modelled": "badge.lowModelled",
      "Low Accuracy — WHR data begins 2012": "badge.lowWhr2012",
      "Low Accuracy — CPI exists since 1995 only": "badge.lowCpi1995",
      "Low Accuracy — Modelled pre-1990": "badge.lowPre1990",
    };
    var txt = (el.textContent || "").trim();
    if (!el.dataset.i18nBadgeEn) el.dataset.i18nBadgeEn = txt;
    if (getLocale() === "en") {
      el.textContent = el.dataset.i18nBadgeEn;
      return;
    }
    var en = el.dataset.i18nBadgeEn;
    var key = map[en];
    if (key) {
      el.textContent = t(key);
      return;
    }
    var parts = en.split(" — ");
    if (parts.length === 2 && map[parts[0]] && map[parts[1]]) {
      el.textContent = t(map[parts[0]]) + " — " + t(map[parts[1]]);
    }
  }

  function applyStaticBadges() {
    document
      .querySelectorAll(".accuracy-badge")
      .forEach(translateStaticAccuracyBadge);
  }

  function refreshWdiStatusMessage() {
    var el = document.getElementById("wbLiveStatus");
    if (!el) return;
    var ok =
      typeof window.__wdiMergeOk === "boolean"
        ? window.__wdiMergeOk
        : el.style.color && el.style.color.indexOf("2e7d32") !== -1;
    el.textContent = ok ? t("wdi.ok") : t("wdi.fail");
  }

  global.DashboardI18n = {
    getLocale: getLocale,
    setLocale: setLocale,
    toggleLocale: toggleLocale,
    t: t,
    applyDataI18nAttributes: applyDataI18nAttributes,
    applyChartTitlesFromLocale: applyChartTitlesFromLocale,
    applyStaticBadges: applyStaticBadges,
    refreshWdiStatusMessage: refreshWdiStatusMessage,
    updateLangToggleUi: updateLangToggleUi,
    chartIds: chartIds,
    MSGS: MSGS,
  };

  global.t = t;
  global.getLocale = getLocale;
})(typeof window !== "undefined" ? window : this);
