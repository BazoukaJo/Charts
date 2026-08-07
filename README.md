# Global Economic & Social Indicators Dashboard (1970–2026)

An interactive HTML dashboard comparing economic, social, demographic, health, environmental, technology, trade, governance, and migration indicators across many countries. The UI uses Materialize and Chart.js.

## Screenshot

Dark theme (default). The preview is a **fixed viewport** (about 1440×1520px)—not the full scrolling page—so the README stays readable. It shows the country selector, tab bar, **Economic** tab’s first chart row (GDP and GDP per capita), and the **GDP & income per capita (WDI)** context card that belongs with those charts.

![Dashboard screenshot](dashboard-screenshot.png)

## Countries

Selectable chips include (among others): United States, Canada, United Kingdom, France, Germany, Italy, Japan, Norway, Sweden, Finland, South Korea, China, India, Russia, Brazil, Malaysia, UAE, South Africa, New Zealand, and more—see the country row on the page for the full list.

Default selection is typically **United States, Canada, United Kingdom, China** (restored from `localStorage` or URL when present).

## Data sources

- On load, the app requests **World Bank World Development Indicators (WDI)** and merges series where configured (core macro, labour, health, environment, tech, plus ~90 extended indicators in Governance, Inequality, Investment, Energy, Humanitarian, and Labor tabs). See the **Data sources** paragraph on the page for the exact list.
- Remaining series use **deterministic modelled** values in-page. Chart **accuracy pills** update after the merge (e.g. High / Partial WDI / Partial Edelman vs modelled).
- **Important:** Opening the app as `file://` often **blocks** the WDI API. Use a **local HTTP server** (e.g. `python -m http.server` from this folder, or VS Code Live Server) so live data can load.

## Features

- **Country share overview** (top of page): WinDirStat-style **treemap** (tile size ∝ latest **population** share by default, or **GDP**), **continent filter** tabs, and an **interactive world map** to toggle countries/continents (drives chart series). Asset: `world-map.geojson` + `dashboard-overview.js`.
- **17 topic tabs** grouped under **Macro**, **People**, **Society**, **Planet**, and **Tech** for easier navigation.
- **Indicator search** — type e.g. *Gini*, *CO₂*, *Edelman*, *unemployment* to jump to a chart (with highlight).
- **Shareable URLs** — `?tab=tab-governance&chart=giniChart&countries=USA,CHN` restores tab, chart focus, and country selection.
- **Lazy chart loading** — only the active tab’s charts initialize at first; other tabs load when opened (faster startup).
- **~144 charts** across Economic, Jobs, Costs, Social, Population, Health, Environment, Tech, Trade, Migration, Quality of Life, Governance, Inequality, Investment, Energy & Industry, Humanitarian, and Labor.
- **KPI summary**, **year-over-year** tiles, **long-horizon** summaries, and a **comparison table** (latest year).
- **Historical context** under charts (dated episodes) plus a **“Reading the trend (logic)”** block: speculative, logic-only readings from how series move together—not news verification.
- **Data Quality Snapshot** at the bottom — per-tab WDI coverage and model reliance.
- **Dark / light** theme toggle; **dark is the default** (preference stored in `localStorage`).
- **English / French / Spanish** UI via `?lang=` (and host postMessage when embedded); historical panels translate via `dashboard-i18n-fr-content.js`.
- **Responsive** layout; chart sizing adjusts with country count and viewport.

### Overview smoke tests

```bash
npm run test:overview
```

## How to run

1. Clone or copy this folder.
2. Start a local server in the project directory, for example:
   `python -m http.server 8765`
   Then open `http://127.0.0.1:8765/` and choose `index.html` if needed.
3. Select countries with the chips, use the **search bar** or **group tabs**, and explore charts. Hover for values.

### Example URLs

- Governance + Gini: `index.html?tab=tab-wellbeing&chart=giniChart`
- France + Germany + US: `index.html?countries=FRA,DEU,USA&tab=tab-labor`

## Project structure

```
Charts/
├── index.html                    # Main dashboard (inline styles & app script)
├── dashboard-overview.js         # Treemap, continent filter, world map
├── dashboard-overview.css        # Overview styles (teal/coral)
├── world-map.geojson             # Compact Natural Earth 110m countries
├── dashboard-phase1.js           # Phase 1 charts, WDI map, Edelman media trust
├── dashboard-phase2.js           # Phase 2 charts and WDI extensions
├── dashboard-i18n.js             # EN/FR/ES UI strings and chart titles
├── dashboard-i18n-fr-content.js  # FR historical panels & speculation lists
├── dashboard-i18n-es.js          # ES content helpers
├── dashboard-nav.js              # Grouped tabs, search, URL state, lazy tab init
├── dashboard-core.js             # Shared chart update utilities
├── shortcuts.html                # Optional: developer keyboard shortcuts reference
├── dashboard-screenshot.png      # README preview
├── README.md                     # This file
└── scripts/                      # overview-smoke-test.mjs + helpers
```

## License / use

Indicators labelled as modelled or low-accuracy are **illustrative**. Use official national statistics and WDI documentation for policy or research. Migration “illegal” and some composite indices are **not** official cross-country statistics.
