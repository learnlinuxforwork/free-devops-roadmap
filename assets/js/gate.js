/*
 * Free DevOps Roadmap — free.learnlinuxforwork.com
 * Copyright (C) 2026 Shea's Tech
 * Licensed under the GNU AGPL v3.0 or later.
 *
 * OS/browser gate. Excluded from the scope-check grep in
 * .github/workflows/pages.yml on purpose -- see CLAUDE.md.
 */
(function () {
  "use strict";
  try {
    var ua = navigator.userAgent || "";
    var isWindows = /Windows/i.test(ua);
    var isEdge = /Edg/i.test(ua);
    if (!isWindows && !isEdge) return;
    if (/\/unsupported\.html$/.test(location.pathname)) return;
    var inLab = location.pathname.indexOf("/lab/") !== -1;
    location.replace((inLab ? "../" : "") + "unsupported.html");
  } catch (e) {}
})();
