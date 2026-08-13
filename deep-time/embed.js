/**
 * Bridge so Deep Time can run inside To Be Logic Free Knowledge.
 * - Reads ?theme=dark|light from the iframe URL
 * - Accepts parent postMessage for theme
 * - Reports content height so the iframe can grow with the page
 */
(function () {
  'use strict'

  function allowedOrigin(origin) {
    try {
      if (origin === window.location.origin) return true
      var host = new URL(origin).hostname
      return host === 'tobelogic.com' || host === 'www.tobelogic.com'
    } catch (_) {
      return false
    }
  }

  function applyTheme(theme) {
    var isLight = theme === 'light'
    document.documentElement.dataset.theme = isLight ? 'light' : 'dark'
    document.body.classList.toggle('dark-theme', !isLight)
  }

  function themeFromQuery() {
    try {
      var t = new URLSearchParams(window.location.search).get('theme')
      if (t === 'light' || t === 'dark') return t
    } catch (_) {
      /* ignore */
    }
    return 'dark'
  }

  var lastReportedHeight = 0

  function reportHeight() {
    var height = Math.ceil(document.documentElement.scrollHeight)
    if (height === lastReportedHeight) return
    lastReportedHeight = height
    try {
      window.parent.postMessage({ source: 'tobelogic', type: 'height', height: height }, '*')
    } catch (_) {
      /* ignore */
    }
  }

  function watchHeight() {
    if (window.parent === window) return
    var scheduled = false
    var schedule = function () {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(function () {
        scheduled = false
        reportHeight()
      })
    }
    if (typeof ResizeObserver === 'function') {
      new ResizeObserver(schedule).observe(document.documentElement)
    } else {
      window.setInterval(schedule, 500)
    }
    window.addEventListener('load', schedule)
    schedule()
  }

  function isEmbedded() {
    try {
      if (new URLSearchParams(window.location.search).get('embed') === '1') return true
    } catch (_) {
      /* ignore */
    }
    return window.parent !== window
  }

  function boot() {
    if (isEmbedded()) document.body.classList.add('tbl-embed')
    applyTheme(themeFromQuery())
    watchHeight()

    window.addEventListener('message', function (event) {
      if (!allowedOrigin(event.origin)) return
      var data = event.data
      if (!data || data.source !== 'tobelogic') return
      if (data.type === 'theme' && (data.theme === 'light' || data.theme === 'dark')) {
        applyTheme(data.theme)
      }
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
