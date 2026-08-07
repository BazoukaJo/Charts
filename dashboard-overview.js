/**
 * Charts overview: population/GDP treemap, continent filter, interactive world map.
 * Tile size metric (default): latest total population (millions) — share of selected total.
 * Alternate metric: latest GDP (trillion USD).
 */
(function (global) {
  "use strict";

  var CONTINENTS = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ];

  /** Real countries only (not the Europe aggregate chip). */
  var CONTINENT_BY_COUNTRY = {
    Ethiopia: "Africa",
    Nigeria: "Africa",
    Somalia: "Africa",
    "South Africa": "Africa",
    Bangladesh: "Asia",
    China: "Asia",
    India: "Asia",
    Indonesia: "Asia",
    Iran: "Asia",
    Israel: "Asia",
    Japan: "Asia",
    Malaysia: "Asia",
    Pakistan: "Asia",
    "Saudi Arabia": "Asia",
    "South Korea": "Asia",
    "United Arab Emirates": "Asia",
    Finland: "Europe",
    France: "Europe",
    Germany: "Europe",
    Italy: "Europe",
    Norway: "Europe",
    Romania: "Europe",
    Russia: "Europe",
    Sweden: "Europe",
    Ukraine: "Europe",
    "United Kingdom": "Europe",
    Canada: "North America",
    Cuba: "North America",
    Mexico: "North America",
    "United States": "North America",
    Argentina: "South America",
    Brazil: "South America",
    Venezuela: "South America",
    Australia: "Oceania",
    "New Zealand": "Oceania",
  };

  var state = {
    continentFilter: "All",
    metric: "population",
    geojson: null,
    mapReady: false,
    initialized: false,
  };

  function tKey(key, fallback) {
    if (typeof global.t === "function") {
      var v = global.t(key);
      if (v && v !== key) return v;
    }
    return fallback;
  }

  function getCountriesList() {
    return Array.isArray(global.COUNTRIES) ? global.COUNTRIES.slice() : Object.keys(CONTINENT_BY_COUNTRY);
  }

  function getSelected() {
    return Array.isArray(global.selectedCountries) ? global.selectedCountries.slice() : [];
  }

  function getDisplayCountries() {
    return Array.isArray(global.DISPLAY_COUNTRIES)
      ? global.DISPLAY_COUNTRIES.slice()
      : getCountriesList();
  }

  function countriesInContinent(continent) {
    if (!continent || continent === "All") return getCountriesList();
    return getCountriesList().filter(function (c) {
      return CONTINENT_BY_COUNTRY[c] === continent;
    });
  }

  function continentOf(country) {
    if (country === "Europe") return "Europe";
    return CONTINENT_BY_COUNTRY[country] || null;
  }

  function latestValue(series) {
    if (!Array.isArray(series) || !series.length) return 0;
    var v = series[series.length - 1];
    return typeof v === "number" && isFinite(v) ? v : 0;
  }

  function metricValue(country, metric) {
    var data = global.DATA;
    if (!data) return 0;
    if (country === "Europe") {
      var euro = Array.isArray(global.EUROPE_COUNTRIES) ? global.EUROPE_COUNTRIES : [];
      var sum = 0;
      for (var i = 0; i < euro.length; i++) sum += metricValue(euro[i], metric);
      return sum;
    }
    if (metric === "gdp") {
      return data.gdp && data.gdp[country] ? latestValue(data.gdp[country]) : 0;
    }
    var pop =
      data.demographics && data.demographics.populationTotal
        ? data.demographics.populationTotal[country]
        : null;
    return latestValue(pop);
  }

  /**
   * Share ratios for countries (values sum to 1 when total > 0).
   */
  function getShareValues(countries, metric) {
    var rows = (countries || []).map(function (name) {
      return { name: name, value: Math.max(0, metricValue(name, metric || state.metric)) };
    });
    var total = rows.reduce(function (s, r) {
      return s + r.value;
    }, 0);
    return rows.map(function (r) {
      return {
        name: r.name,
        value: r.value,
        share: total > 0 ? r.value / total : 0,
      };
    });
  }

  function worstRatio(row, w, h) {
    var s = row.sum;
    var max = row.max;
    var min = row.min;
    var sw = s * s;
    var area = w * h;
    return Math.max((area * max) / sw, sw / (area * min));
  }

  function layoutRow(row, x, y, w, h, horizontal) {
    var rects = [];
    var total = row.sum;
    var offset = 0;
    for (var i = 0; i < row.items.length; i++) {
      var item = row.items[i];
      var frac = total > 0 ? item.value / total : 1 / row.items.length;
      if (horizontal) {
        var rh = h * frac;
        rects.push({
          name: item.name,
          value: item.value,
          share: item.share,
          color: item.color,
          continent: item.continent,
          x: x,
          y: y + offset,
          width: w,
          height: rh,
        });
        offset += rh;
      } else {
        var rw = w * frac;
        rects.push({
          name: item.name,
          value: item.value,
          share: item.share,
          color: item.color,
          continent: item.continent,
          x: x + offset,
          y: y,
          width: rw,
          height: h,
        });
        offset += rw;
      }
    }
    return rects;
  }

  /** Squarified treemap (Bruls / WinDirStat-style). */
  function squarify(items, x, y, width, height) {
    var list = (items || [])
      .filter(function (it) {
        return it && it.value > 0;
      })
      .slice()
      .sort(function (a, b) {
        return b.value - a.value;
      });
    if (!list.length || width <= 0 || height <= 0) return [];

    var total = list.reduce(function (s, it) {
      return s + it.value;
    }, 0);
    list.forEach(function (it) {
      it.share = total > 0 ? it.value / total : 0;
    });

    var rects = [];
    var i = 0;
    var cx = x;
    var cy = y;
    var cw = width;
    var ch = height;

    while (i < list.length) {
      var horizontal = cw >= ch;
      var side = horizontal ? ch : cw;
      var row = { items: [], sum: 0, max: 0, min: Infinity };
      var best = Infinity;

      while (i < list.length) {
        var next = list[i];
        var trial = {
          items: row.items.concat([next]),
          sum: row.sum + next.value,
          max: Math.max(row.max, next.value),
          min: Math.min(row.min, next.value),
        };
        var score = worstRatio(trial, side, (trial.sum / total) * (horizontal ? cw : ch) || side);
        if (row.items.length && score > best) break;
        row = trial;
        best = score;
        i++;
      }

      var rowThickness =
        total > 0 ? ((row.sum / total) * (horizontal ? cw : ch)) : side / list.length;
      if (horizontal) {
        rects = rects.concat(layoutRow(row, cx, cy, rowThickness, ch, true));
        cx += rowThickness;
        cw -= rowThickness;
      } else {
        rects = rects.concat(layoutRow(row, cx, cy, cw, rowThickness, false));
        cy += rowThickness;
        ch -= rowThickness;
      }
    }
    return rects;
  }

  function colorFor(country) {
    var colors = global.COLORS || {};
    return colors[country] || "#5c7a72";
  }

  function contrastLabel(hex) {
    if (!hex || hex.charAt(0) !== "#" || (hex.length !== 7 && hex.length !== 4)) return "#fff";
    var h = hex.length === 4
      ? "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
      : hex;
    var r = parseInt(h.slice(1, 3), 16);
    var g = parseInt(h.slice(3, 5), 16);
    var b = parseInt(h.slice(5, 7), 16);
    var lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.62 ? "#12241f" : "#f4fffb";
  }

  function countriesForTreemap() {
    var selected = getSelected();
    var filter = state.continentFilter;
    return selected.filter(function (c) {
      if (filter === "All") return true;
      return continentOf(c) === filter;
    });
  }

  function buildTreemapItems(flatCountries) {
    var metric = state.metric;
    if (state.continentFilter !== "All") {
      return getShareValues(flatCountries, metric).map(function (r) {
        return {
          name: r.name,
          value: r.value,
          share: r.share,
          color: colorFor(r.name),
          continent: continentOf(r.name),
        };
      });
    }

    // Nested: continent groups → countries (WinDirStat-style folders)
    var byCont = {};
    CONTINENTS.forEach(function (c) {
      byCont[c] = [];
    });
    flatCountries.forEach(function (name) {
      var cont = continentOf(name);
      if (cont && byCont[cont]) byCont[cont].push(name);
    });

    var nested = [];
    CONTINENTS.forEach(function (cont) {
      var kids = getShareValues(byCont[cont], metric).filter(function (r) {
        return r.value > 0;
      });
      if (!kids.length) return;
      var sum = kids.reduce(function (s, r) {
        return s + r.value;
      }, 0);
      nested.push({
        name: cont,
        value: sum,
        continent: cont,
        children: kids.map(function (r) {
          return {
            name: r.name,
            value: r.value,
            share: r.share,
            color: colorFor(r.name),
            continent: cont,
          };
        }),
      });
    });
    return nested;
  }

  function layoutNested(groups, x, y, w, h) {
    var outer = squarify(
      groups.map(function (g) {
        return { name: g.name, value: g.value, color: "#0000", continent: g.continent };
      }),
      x,
      y,
      w,
      h
    );
    var out = [];
    outer.forEach(function (rect) {
      var group = groups.filter(function (g) {
        return g.name === rect.name;
      })[0];
      if (!group) return;
      var pad = 2;
      var inner = squarify(
        group.children,
        rect.x + pad,
        rect.y + pad + 14,
        Math.max(0, rect.width - pad * 2),
        Math.max(0, rect.height - pad * 2 - 14)
      );
      out.push({
        type: "group",
        name: rect.name,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        value: group.value,
      });
      inner.forEach(function (r) {
        out.push(Object.assign({ type: "leaf" }, r));
      });
    });
    return out;
  }

  function formatMetric(value) {
    if (!isFinite(value)) return "—";
    if (state.metric === "gdp") return value.toFixed(2) + " T$";
    if (value >= 100) return value.toFixed(0) + " M";
    if (value >= 10) return value.toFixed(1) + " M";
    return value.toFixed(2) + " M";
  }

  function displayName(country) {
    if (typeof global.getCountryDisplayName === "function") {
      return global.getCountryDisplayName(country);
    }
    return country;
  }

  function renderTreemap() {
    var el = document.getElementById("countryTreemap");
    if (!el) return;
    var countries = countriesForTreemap();
    var width = Math.max(el.clientWidth || 640, 200);
    var height = 280;
    el.style.height = height + "px";

    if (!countries.length) {
      el.innerHTML =
        '<div class="charts-overview__empty">' +
        tKey("overview.emptyTreemap", "No selected countries in this continent.") +
        "</div>";
      return;
    }

    var items = buildTreemapItems(countries);
    var rects;
    if (state.continentFilter === "All" && items.length && items[0].children) {
      rects = layoutNested(items, 0, 0, width, height);
    } else {
      rects = squarify(
        items.map(function (r) {
          return {
            name: r.name,
            value: r.value,
            share: r.share,
            color: r.color,
            continent: r.continent,
          };
        }),
        0,
        0,
        width,
        height
      ).map(function (r) {
        return Object.assign({ type: "leaf" }, r);
      });
    }

    var svg =
      '<svg class="charts-overview__treemap-svg" viewBox="0 0 ' +
      width +
      " " +
      height +
      '" width="100%" height="' +
      height +
      '" role="img" aria-label="' +
      tKey("overview.treemapAria", "Country share treemap") +
      '">';

    rects.forEach(function (r) {
      if (r.type === "group") {
        svg +=
          '<rect class="treemap-group" x="' +
          r.x +
          '" y="' +
          r.y +
          '" width="' +
          Math.max(0, r.width) +
          '" height="' +
          Math.max(0, r.height) +
          '" />';
        if (r.width > 48 && r.height > 18) {
          svg +=
            '<text class="treemap-group-label" x="' +
            (r.x + 4) +
            '" y="' +
            (r.y + 12) +
            '">' +
            escapeXml(tKey("overview.continent." + slug(r.name), r.name)) +
            "</text>";
        }
        return;
      }
      var fill = r.color || colorFor(r.name);
      var label = displayName(r.name);
      var showLabel = r.width > 44 && r.height > 28;
      var showSub = r.width > 56 && r.height > 42;
      var tc = contrastLabel(fill);
      svg +=
        '<g class="treemap-leaf" data-country="' +
        escapeXml(r.name) +
        '" tabindex="0" role="button">' +
        '<rect x="' +
        r.x +
        '" y="' +
        r.y +
        '" width="' +
        Math.max(0, r.width - 0.6) +
        '" height="' +
        Math.max(0, r.height - 0.6) +
        '" fill="' +
        fill +
        '" stroke="rgba(18,36,31,0.35)" stroke-width="0.6" />';
      if (showLabel) {
        svg +=
          '<text fill="' +
          tc +
          '" x="' +
          (r.x + 4) +
          '" y="' +
          (r.y + 14) +
          '" font-size="11">' +
          escapeXml(label) +
          "</text>";
      }
      if (showSub) {
        svg +=
          '<text fill="' +
          tc +
          '" x="' +
          (r.x + 4) +
          '" y="' +
          (r.y + 28) +
          '" font-size="10" opacity="0.9">' +
          escapeXml(formatMetric(r.value)) +
          " · " +
          Math.round((r.share || 0) * 100) +
          "%</text>";
      }
      svg += "</g>";
    });
    svg += "</svg>";
    el.innerHTML = svg;

    el.querySelectorAll(".treemap-leaf").forEach(function (node) {
      node.addEventListener("click", function () {
        toggleCountryByName(node.getAttribute("data-country"));
      });
      node.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          toggleCountryByName(node.getAttribute("data-country"));
        }
      });
    });
  }

  function slug(name) {
    return String(name || "")
      .toLowerCase()
      .replace(/\s+/g, "_");
  }

  function escapeXml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function project(lon, lat, width, height) {
    var x = ((lon + 180) / 360) * width;
    var y = ((90 - lat) / 180) * height;
    return [x, y];
  }

  function ringToPath(ring, width, height) {
    if (!ring || !ring.length) return "";
    var d = "";
    for (var i = 0; i < ring.length; i++) {
      var p = project(ring[i][0], ring[i][1], width, height);
      d += (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1);
    }
    return d + "Z";
  }

  function geomToPath(geometry, width, height) {
    if (!geometry) return "";
    var type = geometry.type;
    var coords = geometry.coordinates;
    var parts = [];
    if (type === "Polygon") {
      coords.forEach(function (ring) {
        parts.push(ringToPath(ring, width, height));
      });
    } else if (type === "MultiPolygon") {
      coords.forEach(function (poly) {
        poly.forEach(function (ring) {
          parts.push(ringToPath(ring, width, height));
        });
      });
    }
    return parts.join(" ");
  }

  function isoToCountry() {
    var codes = global.COUNTRY_CODES || {};
    var map = {};
    Object.keys(codes).forEach(function (name) {
      map[codes[name]] = name;
    });
    return map;
  }

  function renderMap() {
    var host = document.getElementById("worldMapSvg");
    if (!host || !state.geojson) return;
    var width = 960;
    var height = 420;
    var selected = {};
    getSelected().forEach(function (c) {
      selected[c] = true;
    });
    var isoMap = isoToCountry();
    var filter = state.continentFilter;
    var paths = "";

    state.geojson.features.forEach(function (f) {
      var iso = f.properties && f.properties.iso;
      var country = isoMap[iso] || null;
      var d = geomToPath(f.geometry, width, height);
      if (!d) return;
      var inApp = !!country;
      var isSel = inApp && selected[country];
      var cont = country ? CONTINENT_BY_COUNTRY[country] : null;
      var dimByFilter = filter !== "All" && inApp && cont !== filter;
      var cls = "wm-country";
      if (!inApp) cls += " wm-other";
      else if (isSel) cls += " wm-selected";
      else cls += " wm-unselected";
      if (dimByFilter) cls += " wm-dim";
      var fill = !inApp
        ? "var(--wm-other, #2a3833)"
        : isSel
          ? colorFor(country)
          : "var(--wm-off, #4a635b)";
      paths +=
        '<path class="' +
        cls +
        '" data-iso="' +
        escapeXml(iso) +
        '" data-country="' +
        escapeXml(country || "") +
        '" d="' +
        d +
        '" fill="' +
        fill +
        '" stroke="rgba(18,36,31,0.45)" stroke-width="0.4">' +
        "<title>" +
        escapeXml(country ? displayName(country) : (f.properties && f.properties.name) || iso) +
        "</title></path>";
    });

    host.setAttribute("viewBox", "0 0 " + width + " " + height);
    host.innerHTML =
      '<rect class="wm-ocean" x="0" y="0" width="' +
      width +
      '" height="' +
      height +
      '" />' +
      paths;

    host.querySelectorAll("path.wm-country[data-country]").forEach(function (path) {
      var name = path.getAttribute("data-country");
      if (!name) return;
      path.style.cursor = "pointer";
      path.addEventListener("click", function () {
        toggleCountryByName(name);
      });
    });
    state.mapReady = true;
  }

  function syncChipClasses() {
    var selected = getSelected();
    var box = document.getElementById("countryChips");
    if (!box) return;
    box.querySelectorAll(".chip").forEach(function (chip, idx) {
      var list = getDisplayCountries();
      var country = list[idx];
      if (!country) return;
      if (selected.indexOf(country) !== -1) chip.classList.add("selected");
      else chip.classList.remove("selected");
    });
  }

  function applySelection(nextCountries, opts) {
    opts = opts || {};
    var next = (nextCountries || []).filter(function (c) {
      return getDisplayCountries().indexOf(c) !== -1;
    });
    next.sort(function (a, b) {
      return a.localeCompare(b, "en");
    });
    if (!next.length) {
      if (typeof global.M !== "undefined" && global.M.toast && typeof global.t === "function") {
        global.M.toast({ html: global.t("toast.minCountry"), classes: "rounded" });
      }
      return false;
    }
    var sel = global.selectedCountries;
    if (!Array.isArray(sel)) {
      global.selectedCountries = next;
    } else {
      sel.length = 0;
      next.forEach(function (c) {
        sel.push(c);
      });
      global.selectedCountries = sel;
    }
    try {
      localStorage.setItem("selectedCountries", JSON.stringify(next));
    } catch (_) {}
    syncChipClasses();
    if (!opts.silentCharts && typeof global.updateAllCharts === "function") {
      global.updateAllCharts();
    }
    if (!opts.silentStats && typeof global.updateStatisticsSummary === "function") {
      global.updateStatisticsSummary();
    }
    if (
      typeof global.DashboardNav !== "undefined" &&
      global.DashboardNav.syncUrl &&
      global.DashboardNav.getActiveTabId
    ) {
      global.DashboardNav.syncUrl({ tab: global.DashboardNav.getActiveTabId() || "tab-economic" });
    }
    refreshView({ skipCharts: true });
    return true;
  }

  function toggleCountryByName(country) {
    if (!country) return;
    var selected = getSelected();
    var idx = selected.indexOf(country);
    if (idx > -1) {
      if (selected.length <= 1) {
        if (typeof global.M !== "undefined" && global.M.toast && typeof global.t === "function") {
          global.M.toast({ html: global.t("toast.minCountry"), classes: "rounded" });
        }
        return;
      }
      selected.splice(idx, 1);
    } else {
      selected.push(country);
    }
    applySelection(selected);
  }

  /**
   * Continent map control: turn on/off only app countries in that continent.
   * If any in-continent country is selected → deselect them (keep ≥1 global).
   * If none selected → select all in continent (union with current).
   */
  function toggleContinentCountries(continent) {
    var inCont = countriesInContinent(continent);
    var selected = getSelected();
    var anyOn = inCont.some(function (c) {
      return selected.indexOf(c) !== -1;
    });
    var next;
    if (anyOn) {
      next = selected.filter(function (c) {
        return inCont.indexOf(c) === -1;
      });
      if (!next.length) {
        // Keep one outside if possible; else keep first of continent
        var outside = getCountriesList().filter(function (c) {
          return inCont.indexOf(c) === -1;
        });
        next = outside.length ? [outside[0]] : [inCont[0]];
      }
    } else {
      var set = {};
      selected.forEach(function (c) {
        set[c] = true;
      });
      inCont.forEach(function (c) {
        set[c] = true;
      });
      next = Object.keys(set);
    }
    applySelection(next);
  }

  function setContinentFilter(continent) {
    state.continentFilter = continent || "All";
    document.querySelectorAll("#overviewContinentTabs .overview-cont-btn").forEach(function (btn) {
      var on = btn.getAttribute("data-continent") === state.continentFilter;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    refreshView({ skipCharts: true });
  }

  function setMetric(metric) {
    state.metric = metric === "gdp" ? "gdp" : "population";
    document.querySelectorAll("#overviewMetricToggle .overview-metric-btn").forEach(function (btn) {
      var on = btn.getAttribute("data-metric") === state.metric;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    var note = document.getElementById("overviewMetricNote");
    if (note) {
      note.textContent =
        state.metric === "gdp"
          ? tKey(
              "overview.metricNoteGdp",
              "Tile size ∝ latest GDP share (trillion USD) among countries shown."
            )
          : tKey(
              "overview.metricNotePop",
              "Tile size ∝ latest population share (millions) among countries shown."
            );
    }
    refreshView({ skipCharts: true });
  }

  function refreshView(opts) {
    opts = opts || {};
    renderTreemap();
    renderMap();
    updateContinentToggleState();
    if (!opts.skipCharts) {
      /* selection already drove charts */
    }
  }

  function updateContinentToggleState() {
    var selected = getSelected();
    document.querySelectorAll("#overviewContinentToggles .overview-map-cont-btn").forEach(function (btn) {
      var cont = btn.getAttribute("data-continent");
      var inCont = countriesInContinent(cont);
      var onCount = inCont.filter(function (c) {
        return selected.indexOf(c) !== -1;
      }).length;
      btn.classList.toggle("is-partial", onCount > 0 && onCount < inCont.length);
      btn.classList.toggle("is-on", onCount === inCont.length && inCont.length > 0);
      btn.classList.toggle("is-off", onCount === 0);
      btn.setAttribute("aria-pressed", onCount > 0 ? "true" : "false");
    });
  }

  function bindUi() {
    var tabs = document.getElementById("overviewContinentTabs");
    if (tabs && !tabs._bound) {
      tabs._bound = true;
      tabs.querySelectorAll(".overview-cont-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          setContinentFilter(btn.getAttribute("data-continent"));
        });
      });
    }
    var metric = document.getElementById("overviewMetricToggle");
    if (metric && !metric._bound) {
      metric._bound = true;
      metric.querySelectorAll(".overview-metric-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          setMetric(btn.getAttribute("data-metric"));
        });
      });
    }
    var toggles = document.getElementById("overviewContinentToggles");
    if (toggles && !toggles._bound) {
      toggles._bound = true;
      toggles.querySelectorAll(".overview-map-cont-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          toggleContinentCountries(btn.getAttribute("data-continent"));
        });
      });
    }
  }

  function loadGeojson() {
    if (state.geojson) return Promise.resolve(state.geojson);
    var url = "world-map.geojson";
    try {
      var scripts = document.getElementsByTagName("script");
      for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src || "";
        if (src.indexOf("dashboard-overview.js") !== -1) {
          url = src.replace(/dashboard-overview\.js(\?.*)?$/, "world-map.geojson");
          break;
        }
      }
    } catch (_) {}
    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("geojson " + r.status);
        return r.json();
      })
      .then(function (geo) {
        state.geojson = geo;
        return geo;
      });
  }

  function init() {
    if (!document.getElementById("chartsOverview")) return;
    bindUi();
    setMetric(state.metric);
    setContinentFilter(state.continentFilter);
    state.initialized = true;
    loadGeojson()
      .then(function () {
        renderMap();
        updateContinentToggleState();
      })
      .catch(function (err) {
        console.warn("ChartsOverview: world map failed to load", err);
        var host = document.getElementById("worldMapSvg");
        if (host) {
          host.innerHTML =
            '<text x="24" y="40" fill="currentColor">' +
            escapeXml(tKey("overview.mapLoadFail", "World map could not be loaded.")) +
            "</text>";
        }
      });
    renderTreemap();
    if (!global._overviewResizeBound) {
      global._overviewResizeBound = true;
      global.addEventListener("resize", function () {
        if (state.initialized) renderTreemap();
      });
    }
  }

  function refresh() {
    if (!state.initialized) {
      init();
      return;
    }
    refreshView({ skipCharts: true });
  }

  var api = {
    CONTINENTS: CONTINENTS,
    CONTINENT_BY_COUNTRY: CONTINENT_BY_COUNTRY,
    countriesInContinent: countriesInContinent,
    continentOf: continentOf,
    getShareValues: getShareValues,
    squarify: squarify,
    metricValue: metricValue,
    toggleContinentCountries: toggleContinentCountries,
    setContinentFilter: setContinentFilter,
    setMetric: setMetric,
    applySelection: applySelection,
    toggleCountryByName: toggleCountryByName,
    init: init,
    refresh: refresh,
    getState: function () {
      return {
        continentFilter: state.continentFilter,
        metric: state.metric,
        mapReady: state.mapReady,
      };
    },
  };

  global.ChartsOverview = api;
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this);

try {
  module.exports = globalThis.ChartsOverview;
} catch (_exportErr) {
  /* browser / non-CJS */
}
