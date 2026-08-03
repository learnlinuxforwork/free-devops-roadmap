/*
 * AWS DevOps — free.learnlinuxforwork.com
 * Copyright (C) 2026 Shea's Tech
 * Licensed under the GNU AGPL v3.0 or later.
 *
 * Anti-FOUC theme init. Loaded via a plain, non-async/non-defer <script src>
 * in <head> so it still runs before first paint, the same way the inline
 * version it replaces did -- moved to its own file so script-src 'self' in
 * the CSP meta tag doesn't need 'unsafe-inline'.
 */
(function () {
  try {
    var t = localStorage.getItem("fdr.theme.v1");
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
