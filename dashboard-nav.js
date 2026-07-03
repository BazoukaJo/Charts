/**
 * Grouped tab navigation, indicator search, URL state, lazy chart tab loading.
 */
(function (global) {
  "use strict";

  var TAB_GROUPS = [
    {
      id: "macro",
      labelKey: "nav.group.macro",
      tabs: [
        "tab-economic",
        "tab-employment",
        "tab-costs",
        "tab-trade",
        "tab-investment",
        "tab-labor",
      ],
    },
    {
      id: "people",
      labelKey: "nav.group.people",
      tabs: ["tab-demographics", "tab-health", "tab-immigration"],
    },
    {
      id: "society",
      labelKey: "nav.group.society",
      tabs: [
        "tab-social",
        "tab-wellbeing",
        "tab-governance",
        "tab-inequality",
        "tab-humanitarian",
      ],
    },
    {
      id: "planet",
      labelKey: "nav.group.planet",
      tabs: ["tab-environment", "tab-energy"],
    },
    {
      id: "tech",
      labelKey: "nav.group.tech",
      tabs: ["tab-technology"],
    },
  ];

  var TAB_TO_GROUP = {};
  TAB_GROUPS.forEach(function (g) {
    g.tabs.forEach(function (tabId) {
      TAB_TO_GROUP[tabId] = g.id;
    });
  });

  var searchIndex = [];
  var activeGroupId = "macro";
  var highlightTimer = null;

  function t(key) {
    return global.DashboardI18n ? global.DashboardI18n.t(key) : key;
  }

  function getLocale() {
    return global.DashboardI18n ? global.DashboardI18n.getLocale() : "en";
  }

  function tabIdFromHref(href) {
    return (href || "").replace(/^#/, "");
  }

  function getTabsEl() {
    return document.getElementById("dashboardSubTabs");
  }

  function getTabLink(tabId) {
    var tabsEl = getTabsEl();
    if (!tabsEl) return null;
    return tabsEl.querySelector('a[href="#' + tabId + '"]');
  }

  function ensureTabCharts(tabId) {
    if (typeof global.initializeAllCharts === "function") {
      global.initializeAllCharts(tabId);
    }
    if (typeof global.refreshTabCharts === "function") {
      global.refreshTabCharts(tabId);
    }
    if (typeof global.updateChartDimensions === "function") {
      global.updateChartDimensions();
    }
    if (typeof global.resizeAllCharts === "function") {
      global.resizeAllCharts();
    }
    if (typeof global.scheduleChartsReflow === "function") {
      global.scheduleChartsReflow();
    }
  }

  function getMaterializeTabsInstance() {
    var tabsEl = getTabsEl();
    if (!tabsEl || typeof M === "undefined" || !M.Tabs) return null;
    return M.Tabs.getInstance(tabsEl);
  }

  function selectTab(tabId, options) {
    options = options || {};
    var link = getTabLink(tabId);
    if (!link) return false;

    var groupId = TAB_TO_GROUP[tabId];
    if (groupId) setActiveGroup(groupId, { skipTabSelect: true });

    var inst = getMaterializeTabsInstance();
    if (inst && typeof inst.select === "function") {
      inst.select(tabId);
    } else if (link) {
      link.click();
    }

    if (!options.skipUrl) syncUrl({ tab: tabId });
    return true;
  }

  function setActiveGroup(groupId, options) {
    options = options || {};
    activeGroupId = groupId;

    document.querySelectorAll("#tabGroupBar [data-group]").forEach(function (btn) {
      var on = btn.getAttribute("data-group") === groupId;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });

    document.querySelectorAll("#dashboardSubTabs li.tab[data-tab-group]").forEach(function (li) {
      var show = li.getAttribute("data-tab-group") === groupId;
      li.classList.toggle("group-visible", show);
      li.setAttribute("aria-hidden", show ? "false" : "true");
    });

    var group = TAB_GROUPS.find(function (g) {
      return g.id === groupId;
    });
    var subTabsWrap = document.getElementById("tabNavSecondary");
    if (subTabsWrap) {
      subTabsWrap.classList.toggle(
        "sub-tabs-single",
        !!(group && group.tabs.length <= 1),
      );
    }

    if (!options.skipTabSelect) {
      var group = TAB_GROUPS.find(function (g) {
        return g.id === groupId;
      });
      if (group && group.tabs.length) {
        var current = getActiveTabId();
        if (!current || TAB_TO_GROUP[current] !== groupId) {
          selectTab(group.tabs[0], { skipUrl: true });
        }
      }
    }
  }

  function getActiveTabId() {
    var tabsEl = getTabsEl();
    if (!tabsEl) return null;
    var active = tabsEl.querySelector("a.active");
    return active ? tabIdFromHref(active.getAttribute("href")) : null;
  }

  function buildSearchIndex() {
    searchIndex = [];
    if (!global.DashboardI18n || !global.DashboardI18n.chartIds) return;

    global.DashboardI18n.chartIds.forEach(function (chartId) {
      var canvas = document.getElementById(chartId);
      if (!canvas) return;
      var tabId = global.__chartTabMap && global.__chartTabMap[chartId];
      if (!tabId) {
        var panel = canvas.closest('[id^="tab-"]');
        tabId = panel ? panel.id : "";
      }
      var titleEn =
        (global.DashboardI18n.MSGS.en["ct." + chartId] || chartId) + "";
      var titleFr =
        (global.DashboardI18n.MSGS.fr["ct." + chartId] || titleEn) + "";
      searchIndex.push({
        chartId: chartId,
        tabId: tabId,
        groupId: TAB_TO_GROUP[tabId] || "",
        titleEn: titleEn.toLowerCase(),
        titleFr: titleFr.toLowerCase(),
        labelEn: global.DashboardI18n.MSGS.en["ct." + chartId] || chartId,
        labelFr: global.DashboardI18n.MSGS.fr["ct." + chartId] || titleEn,
      });
    });
  }

  function normalizeQuery(q) {
    return (q || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function searchIndicators(query, limit) {
    var q = normalizeQuery(query);
    if (!q) return [];
    limit = limit || 12;
    var loc = getLocale();
    var out = [];

    searchIndex.forEach(function (item) {
      var hay =
        item.chartId.toLowerCase() +
        " " +
        item.titleEn +
        " " +
        item.titleFr;
      if (hay.indexOf(q) === -1) return;
      var score = 0;
      if (item.chartId.toLowerCase().indexOf(q) !== -1) score += 3;
      var title = loc === "fr" ? item.titleFr : item.titleEn;
      if (title.indexOf(q) !== -1) score += 2;
      if (title.indexOf(q) === 0) score += 2;
      out.push({ item: item, score: score });
    });

    out.sort(function (a, b) {
      return b.score - a.score;
    });
    return out.slice(0, limit).map(function (x) {
      return x.item;
    });
  }

  function getTabLabel(tabId) {
    var link = getTabLink(tabId);
    if (!link) return tabId;
    return link.textContent.trim();
  }

  function renderSearchResults(items) {
    var list = document.getElementById("indicatorSearchResults");
    if (!list) return;
    list.innerHTML = "";
    if (!items.length) {
      list.classList.remove("open");
      return;
    }
    var loc = getLocale();
    items.forEach(function (item) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "indicator-search-result";
      btn.setAttribute("data-chart-id", item.chartId);
      var label = loc === "fr" ? item.labelFr : item.labelEn;
      btn.innerHTML =
        '<span class="indicator-search-result__title">' +
        escapeHtml(label) +
        '</span><span class="indicator-search-result__meta">' +
        escapeHtml(getTabLabel(item.tabId)) +
        "</span>";
      btn.addEventListener("click", function () {
        navigateToChart(item.chartId);
        closeSearchResults();
        var input = document.getElementById("indicatorSearch");
        if (input) input.value = loc === "fr" ? item.labelFr : item.labelEn;
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
    list.classList.add("open");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function closeSearchResults() {
    var list = document.getElementById("indicatorSearchResults");
    if (list) {
      list.innerHTML = "";
      list.classList.remove("open");
    }
  }

  function highlightChart(chartId) {
    var canvas = document.getElementById(chartId);
    if (!canvas) return;
    var container = canvas.closest(".chart-container");
    if (!container) return;
    container.classList.add("chart-highlight");
    if (highlightTimer) clearTimeout(highlightTimer);
    highlightTimer = setTimeout(function () {
      container.classList.remove("chart-highlight");
    }, 3200);
    container.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function navigateToChart(chartId) {
    var tabId =
      (global.__chartTabMap && global.__chartTabMap[chartId]) ||
      (function () {
        var canvas = document.getElementById(chartId);
        var panel = canvas && canvas.closest('[id^="tab-"]');
        return panel ? panel.id : null;
      })();
    if (!tabId) return false;

    selectTab(tabId, { skipUrl: false });
    syncUrl({ tab: tabId, chart: chartId });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        highlightChart(chartId);
      });
    });
    return true;
  }

  function readUrlState() {
    var params = new URLSearchParams(global.location.search);
    return {
      tab: params.get("tab") || "",
      chart: params.get("chart") || "",
      countries: params.get("countries") || "",
    };
  }

  function syncUrl(partial) {
    var params = new URLSearchParams(global.location.search);
    if (partial.tab) params.set("tab", partial.tab);
    if (partial.chart) params.set("chart", partial.chart);
    else if (partial.chart === null) params.delete("chart");

    if (typeof global.selectedCountries !== "undefined") {
      params.set("countries", global.selectedCountries.join(","));
    }

    var qs = params.toString();
    var url =
      global.location.pathname +
      (qs ? "?" + qs : "") +
      global.location.hash;
    global.history.replaceState(null, "", url);
  }

  function applyUrlCountriesOnly() {
    var state = readUrlState();
    if (!state.countries || typeof global.COUNTRIES === "undefined") return;
    var list = state.countries
      .split(",")
      .map(function (c) {
        return c.trim();
      })
      .filter(Boolean);
    var valid = list.filter(function (c) {
      return global.COUNTRIES.indexOf(c) !== -1;
    });
    if (!valid.length) return;
    global.selectedCountries = valid.slice();
    try {
      localStorage.setItem(
        "selectedCountries",
        JSON.stringify(global.selectedCountries),
      );
    } catch (_) {}
    if (typeof global.createCountryChips === "function") {
      global.createCountryChips();
    }
  }

  function applyUrlCountries() {
    applyUrlCountriesOnly();
    if (typeof global.updateAllCharts === "function") {
      global.updateAllCharts();
    }
    if (typeof global.updateStatisticsSummary === "function") {
      global.updateStatisticsSummary();
    }
  }

  function applyInitialRoute() {
    var state = readUrlState();
    applyUrlCountries();

    var tabId = state.tab;
    if (tabId && document.getElementById(tabId)) {
      if (TAB_TO_GROUP[tabId]) setActiveGroup(TAB_TO_GROUP[tabId], { skipTabSelect: true });
      selectTab(tabId, { skipUrl: true });
    }

    if (state.chart) {
      setTimeout(function () {
        navigateToChart(state.chart);
      }, 120);
    }
  }

  function wireSearch() {
    var input = document.getElementById("indicatorSearch");
    if (!input) return;

    input.setAttribute("placeholder", t("nav.searchPlaceholder"));
    input.addEventListener("input", function () {
      renderSearchResults(searchIndicators(input.value));
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeSearchResults();
        input.blur();
      }
      if (e.key === "Enter") {
        var items = searchIndicators(input.value, 1);
        if (items.length) navigateToChart(items[0].chartId);
      }
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".indicator-search-wrap")) closeSearchResults();
    });
  }

  function wireGroupBar() {
    var bar = document.getElementById("tabGroupBar");
    if (!bar) return;
    bar.querySelectorAll("[data-group]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setActiveGroup(btn.getAttribute("data-group"));
        syncUrl({ tab: getActiveTabId(), chart: null });
      });
    });
  }

  function applyGroupLabels() {
    document.querySelectorAll("#tabGroupBar [data-group]").forEach(function (btn) {
      var g = TAB_GROUPS.find(function (x) {
        return x.id === btn.getAttribute("data-group");
      });
      if (g) btn.textContent = t(g.labelKey);
    });
  }

  function onTabShown(tabContent) {
    if (!tabContent || !tabContent.id) return;
    document.querySelectorAll('.container > div[id^="tab-"]').forEach(function (panel) {
      panel.classList.toggle('active', panel.id === tabContent.id);
    });
    ensureTabCharts(tabContent.id);
    syncUrl({ tab: tabContent.id, chart: null });
    var groupId = TAB_TO_GROUP[tabContent.id];
    if (groupId && groupId !== activeGroupId) {
      setActiveGroup(groupId, { skipTabSelect: true });
    }
  }

  function init() {
    wireGroupBar();
    wireSearch();
    buildSearchIndex();
    setActiveGroup("macro", { skipTabSelect: true });
    applyInitialRoute();
    applyGroupLabels();
  }

  function refreshLocale() {
    applyGroupLabels();
    var input = document.getElementById("indicatorSearch");
    if (input) input.setAttribute("placeholder", t("nav.searchPlaceholder"));
    buildSearchIndex();
  }

  global.DashboardNav = {
    TAB_GROUPS: TAB_GROUPS,
    init: init,
    refreshLocale: refreshLocale,
    onTabShown: onTabShown,
    ensureTabCharts: ensureTabCharts,
    selectTab: selectTab,
    navigateToChart: navigateToChart,
    searchIndicators: searchIndicators,
    getActiveTabId: getActiveTabId,
    syncUrl: syncUrl,
    applyUrlCountriesOnly: applyUrlCountriesOnly,
    applyUrlCountries: applyUrlCountries,
    getInitialTab: function () {
      var state = readUrlState();
      return state.tab || "tab-economic";
    },
  };

  global.ensureTabCharts = ensureTabCharts;
  global.navigateToChart = navigateToChart;
})(typeof window !== "undefined" ? window : this);
