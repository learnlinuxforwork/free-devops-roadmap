/*
 * Free DevOps Roadmap — free.learnlinuxforwork.com
 * Copyright (C) 2026 Shea's Tech
 * Licensed under the GNU AGPL v3.0 or later.
 */
(function () {
  "use strict";

  var STORE_THEME = "fdr.theme.v1";
  var root = document.documentElement;

  function applyTheme(t) {
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t);
    else root.removeAttribute("data-theme");
  }

  function currentTheme() {
    var saved = root.getAttribute("data-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-theme-toggle]");
    if (!t) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(STORE_THEME, next); } catch (err) {}
  });
})();
