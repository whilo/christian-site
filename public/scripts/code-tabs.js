/**
 * Site-wide Superficie/Clojure tab switching for .code-dual blocks, plus
 * highlight.js initialization for the two code panels.
 *
 * Behavior:
 *   - A click on any .code-dual-tab flips every .code-dual block on the page
 *     to the chosen language.
 *   - The choice is persisted in localStorage under 'codeDualLang' so it
 *     survives navigation and browser restarts.
 *   - A 'storage' event listener mirrors the change into other browser tabs
 *     on the same site.
 *   - First-paint correctness is handled by an inline boot script in
 *     BaseLayout.astro that sets <html data-code-lang="..."> before the body
 *     renders; CSS in global.css keys off that attribute.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'codeDualLang';

  function applyLang(lang) {
    document.documentElement.setAttribute('data-code-lang', lang);
    // Also flip .active classes so any code path that reads them stays in
    // sync (the CSS rules in global.css now key off [data-code-lang], but
    // keeping .active correct is cheap defense-in-depth).
    document.querySelectorAll('.code-dual').forEach(function (wrap) {
      wrap.querySelectorAll('.code-dual-tab').forEach(function (t) {
        t.classList.toggle('active', t.getAttribute('data-lang') === lang);
      });
      wrap.querySelectorAll('.code-dual-panel').forEach(function (p) {
        p.classList.toggle('active', p.getAttribute('data-lang') === lang);
      });
    });
  }

  // Tab click: flip globally + persist.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.code-dual-tab');
    if (!btn) return;
    var lang = btn.getAttribute('data-lang');
    if (lang !== 'clojure' && lang !== 'superficie') return;
    applyLang(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e2) {}
  });

  // Cross-browser-tab sync.
  window.addEventListener('storage', function (e) {
    if (e.key !== STORAGE_KEY) return;
    if (e.newValue === 'clojure' || e.newValue === 'superficie') {
      applyLang(e.newValue);
    }
  });

  // Highlight superficie + clojure panels once hljs is ready.
  function highlightPanels() {
    if (typeof hljs === 'undefined') return;
    document.querySelectorAll('.code-dual-panel code').forEach(function (el) {
      if (!el.dataset.highlighted) {
        hljs.highlightElement(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightPanels);
  } else {
    highlightPanels();
  }
})();
