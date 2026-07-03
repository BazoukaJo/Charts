/**
 * Shared chart utilities and global state accessors for the dashboard.
 */
(function (global) {
  "use strict";

  function getCharts() {
    return global.charts || {};
  }

  function getChart(chartId) {
    return getCharts()[chartId] || null;
  }

  /**
   * Update an existing chart's data/options and recalculate scales.
   */
  function updateChartData(chartId, data, options) {
    var chart = getChart(chartId);
    if (!chart) return false;
    if (data) chart.data = data;
    if (options) chart.options = options;
    chart.resize();
    chart.update("active");
    if (typeof global.applyChartVisibility === "function") {
      global.applyChartVisibility(chartId);
    }
    return true;
  }

  /**
   * Destroy and recreate when canvas was hidden or zero-sized.
   */
  function ensureChart(chartId, data, options, createFn) {
    var chart = getChart(chartId);
    var canvas = document.getElementById(chartId);
    if (!canvas) return null;

    var panel = canvas.closest('div[id^="tab-"]');
    var panelHidden = panel && getComputedStyle(panel).display === "none";
    var zeroSize = !canvas.clientWidth || !canvas.clientHeight;

    if (chart && (panelHidden || zeroSize)) {
      chart.destroy();
      delete getCharts()[chartId];
      chart = null;
    }

    if (chart) {
      updateChartData(chartId, data, options);
      return chart;
    }

    if (typeof createFn !== "function") return null;
    return createFn(chartId, data, options);
  }

  function syncChartFromSource(chartId, dataSource, optionsFn, getChartDataFn) {
    if (!getChartDataFn) getChartDataFn = global.getChartData;
    if (!getChartDataFn) return false;
    var options =
      typeof optionsFn === "function"
        ? optionsFn(chartId)
        : typeof global.getLocalizedChartOptions === "function"
          ? global.getLocalizedChartOptions(chartId)
          : null;
    return updateChartData(chartId, getChartDataFn(dataSource), options);
  }

  function refreshCharts(chartIds) {
    (chartIds || []).forEach(function (chartId) {
      var chart = getChart(chartId);
      if (!chart) return;
      chart.resize();
      chart.update("active");
      if (typeof global.applyChartVisibility === "function") {
        global.applyChartVisibility(chartId);
      }
    });
  }

  global.DashboardCore = {
    getCharts: getCharts,
    getChart: getChart,
    updateChartData: updateChartData,
    ensureChart: ensureChart,
    syncChartFromSource: syncChartFromSource,
    refreshCharts: refreshCharts,
  };
})(typeof window !== "undefined" ? window : this);
