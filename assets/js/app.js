/*
 * Free DevOps Roadmap — free.learnlinuxforwork.com
 * Copyright (C) 2026 Shea's Tech
 * Licensed under the GNU AGPL v3.0 or later.
 */
(function () {
  "use strict";

  var STORE_PROGRESS = "fdr.progress.v1";
  var STORE_THEME = "fdr.theme.v1";
  var STORE_OPEN = "fdr.open.v1";

  /* ------------------------------------------------------------ theme -- */
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

  try { applyTheme(localStorage.getItem(STORE_THEME)); } catch (e) {}

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-theme-toggle]");
    if (!t) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(STORE_THEME, next); } catch (err) {}
  });

  /* --------------------------------------------------------- progress -- */
  var progress = {};
  try { progress = JSON.parse(localStorage.getItem(STORE_PROGRESS) || "{}"); } catch (e) { progress = {}; }

  function saveProgress() {
    try { localStorage.setItem(STORE_PROGRESS, JSON.stringify(progress)); } catch (e) {}
  }

  var openState = {};
  try { openState = JSON.parse(localStorage.getItem(STORE_OPEN) || "{}"); } catch (e) { openState = {}; }
  function saveOpen() {
    try { localStorage.setItem(STORE_OPEN, JSON.stringify(openState)); } catch (e) {}
  }

  /* ----------------------------------------------------------- helpers - */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function extLink(url, label, cls) {
    if (!url) return '<span class="' + (cls || "chip") + '">' + esc(label) + "</span>";
    return '<a class="' + (cls || "chip") + '" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + "</a>";
  }

  var ICON = {
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    chev: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'
  };

  function ring(pct, size) {
    size = size || 34;
    var r = (size - 5) / 2;
    var c = 2 * Math.PI * r;
    var on = (pct / 100) * c;
    return (
      '<svg class="ring" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + " " + size + '">' +
      '<circle class="ring__bg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke-width="3.5"/>' +
      '<circle class="ring__fg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke-width="3.5" ' +
      'stroke-dasharray="' + on.toFixed(2) + " " + c.toFixed(2) + '"/></svg>'
    );
  }

  function callout(c) {
    if (!c) return "";
    var kind = c.kind && c.kind !== "info" ? " callout--" + c.kind : "";
    var body = c.steps
      ? "<ol>" + c.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>"
      : "<p>" + c.text + "</p>";
    return '<div class="callout' + kind + '"><div class="callout__title">' + esc(c.title) + "</div>" + body + "</div>";
  }

  function table(cols, rows) {
    return (
      '<div class="table-wrap"><table><thead><tr>' +
      cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      rows.map(function (r) {
        return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
      }).join("") +
      "</tbody></table></div>"
    );
  }

  function sectionHead(eyebrow, title, sub) {
    return (
      '<div class="section__head">' +
      '<div class="section__eyebrow">' + esc(eyebrow) + "</div>" +
      "<h2>" + esc(title) + "</h2>" +
      (sub ? '<p class="section__sub">' + esc(sub) + "</p>" : "") +
      "</div>"
    );
  }

  /* ------------------------------------------------------------ render - */
  var DATA = null;

  function render(data) {
    DATA = data;
    document.title = data.meta.title + " — " + data.meta.subtitle;
    var main = document.getElementById("main");
    var nav = document.getElementById("nav");
    var html = [];

    /* hero */
    html.push(
      '<section class="hero">' +
        '<div class="hero__kicker">' + esc(data.meta.org) + " · Free &amp; open source</div>" +
        "<h1>" + esc(data.meta.title) + "</h1>" +
        '<p class="hero__lead">' + esc(data.meta.subtitle) + ". " + esc(data.meta.tagline) + "</p>" +
        '<div class="hero__stats">' +
          data.hero.stats.map(function (s) {
            return '<div class="stat"><div class="stat__v">' + esc(s.value) + '</div><div class="stat__l">' + esc(s.label) + "</div></div>";
          }).join("") +
        "</div>" +
        '<div class="hero__cta">' +
          '<a class="btn btn--primary" href="#phase-0">Start Phase 0</a>' +
          '<a class="btn" href="#home-lab">Build the home lab</a>' +
          '<a class="btn" href="' + esc(data.meta.links.linuxTraining) + '" target="_blank" rel="noopener noreferrer">Linux training</a>' +
        "</div>" +
      "</section>"
    );

    /* overview */
    var ov = data.overview;
    html.push(
      '<section class="section" id="' + ov.id + '">' +
        sectionHead("01 · Overview", ov.title, ov.subtitle) +
        '<div class="prose">' + ov.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
        '<h3 style="margin:20px 0 4px;font-size:15px">Weekly rhythm</h3>' +
        '<div class="rhythm">' +
          ov.rhythm.map(function (r) {
            return (
              '<div class="rhythm__row"><span class="rhythm__pct">' + esc(r.pct) + "</span>" +
              '<span class="rhythm__track"><span class="rhythm__fill" style="width:' + esc(r.pct) + '"></span></span>' +
              '<span class="rhythm__text">' + esc(r.text) + "</span></div>"
            );
          }).join("") +
        "</div>" +
        '<h3 style="margin:20px 0 8px;font-size:15px">Pacing options</h3>' +
        table(ov.pacing.headers, ov.pacing.rows.map(function (r) {
          return [esc(r[0]), esc(r[1]), esc(r[2]), esc(r[3])];
        })) +
        callout(ov.note) +
      "</section>"
    );

    /* training stack */
    var st = data.stack;
    html.push(
      '<section class="section" id="' + st.id + '">' +
        sectionHead("02 · Linux first", st.title, st.subtitle) +
        '<div class="prose">' + st.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
        '<div class="grid grid--2" style="margin:16px 0">' +
          st.resources.map(function (r) {
            return (
              '<a class="res" href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' +
              '<div class="res__name">' + esc(r.name) + ICON.ext + "</div>" +
              '<div class="lab-card__sub">' + esc(r.display) + "</div>" +
              '<div class="res__desc">' + esc(r.desc) + "</div>" +
              '<div style="margin-top:8px"><span class="chip chip--accent">' + esc(r.tag) + "</span></div>" +
              "</a>"
            );
          }).join("") +
        "</div>" +
        callout(st.note) +
        '<p class="prose">' + st.outro + "</p>" +
      "</section>"
    );

    /* home lab */
    var hl = data.homelab;
    html.push(
      '<section class="section" id="' + hl.id + '">' +
        sectionHead("03 · Home lab", hl.title, hl.subtitle) +
        '<div class="prose">' + hl.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
        callout(hl.startHere) +
        callout(hl.budgetNote) +
        hl.groups.map(function (g) {
          return (
            '<div class="lab-group">' +
              '<div class="lab-group__head"><span class="lab-group__step">' + esc(g.step) + "</span><h3>" + esc(g.title) + "</h3></div>" +
              (g.intro ? '<p class="lab-group__intro">' + g.intro + "</p>" : "") +
              '<div class="card">' +
                g.items.map(function (it) {
                  return (
                    '<div class="lab-card">' +
                      "<div>" +
                        '<div class="lab-card__name">' + extLink(it.url, it.name, "") + "</div>" +
                        (it.sub ? '<div class="lab-card__sub">' + esc(it.sub) + "</div>" : "") +
                      "</div>" +
                      '<div class="lab-card__desc">' + it.desc + "</div>" +
                      '<div class="lab-card__meta">' + esc(it.meta || "") + "</div>" +
                    "</div>"
                  );
                }).join("") +
              "</div>" +
              (g.after
                ? '<div style="margin-top:14px"><h4 style="font-size:13.5px;margin-bottom:6px">' + esc(g.after.title) + "</h4><ul class=\"prose\">" +
                  g.after.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul></div>"
                : "") +
            "</div>"
          );
        }).join("") +
      "</section>"
    );

    /* certifications */
    var ce = data.certs;
    html.push(
      '<section class="section" id="' + ce.id + '">' +
        sectionHead("04 · Certifications", ce.title, ce.subtitle) +
        '<div class="prose">' + ce.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
        ce.items.map(function (c) {
          return (
            '<div class="cert' + (c.featured ? " cert--featured" : "") + '">' +
              '<div class="cert__n">' + c.n + "</div>" +
              '<div class="cert__body">' +
                '<div class="cert__name">' + esc(c.name) + "</div>" +
                '<div class="cert__meta"><span>' + extLink(c.codeUrl, c.code, "") + "</span>" +
                  "<span>" + esc(c.level) + "</span><span>" + esc(c.timing) + "</span><span>" + esc(c.cost) + "</span></div>" +
                '<div class="chips">' + c.prep.map(function (p) { return extLink(p.url, p.label, "chip"); }).join("") + "</div>" +
              "</div>" +
            "</div>"
          );
        }).join("") +
        callout(ce.note) +
      "</section>"
    );

    /* coverage map */
    var cv = data.coverage;
    html.push(
      '<section class="section" id="' + cv.id + '">' +
        sectionHead("05 · Coverage", cv.title, cv.subtitle) +
        table(cv.columns, cv.rows) +
      "</section>"
    );

    /* phases */
    html.push('<section class="section" id="phases">' + sectionHead("06 · The plan", "The 54-Week Plan", "Nine phases. Check tasks off as you go — your progress is saved in this browser.") + "</section>");
    data.phases.forEach(function (ph) {
      html.push(phaseHTML(ph));
    });

    /* resources */
    var rs = data.resources;
    html.push(
      '<section class="section" id="' + rs.id + '">' +
        sectionHead("07 · Resources", rs.title, rs.subtitle) +
        rs.groups.map(function (g) {
          return (
            '<div class="res-group"><h3>' + esc(g.category) + "</h3>" +
            '<div class="grid grid--2">' +
              g.items.map(function (it) {
                return (
                  '<a class="res" href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer">' +
                  '<div class="res__name">' + esc(it.name) + ICON.ext +
                    (it.badge ? '<span class="chip chip--warn">' + esc(it.badge) + "</span>" : "") +
                  "</div>" +
                  '<div class="res__desc">' + esc(it.desc) + "</div></a>"
                );
              }).join("") +
            "</div></div>"
          );
        }).join("") +
      "</section>"
    );

    /* costs */
    var co = data.costs;
    html.push(
      '<section class="section" id="' + co.id + '">' +
        sectionHead("08 · Costs", co.title, co.subtitle) +
        table(co.columns, co.rows) +
        callout(co.note) +
      "</section>"
    );

    /* tips */
    var tp = data.tips;
    html.push(
      '<section class="section" id="' + tp.id + '">' +
        sectionHead("09 · Habits", tp.title, tp.subtitle) +
        '<div class="card card--pad">' +
          tp.items.map(function (t) {
            return '<div class="tip"><span class="tip__arrow">&rarr;</span><div class="tip__text"><b>' + esc(t.head) + "</b> " + esc(t.text) + "</div></div>";
          }).join("") +
        "</div>" +
      "</section>"
    );

    /* story */
    var sy = data.story;
    html.push(
      '<section class="section story" id="' + sy.id + '">' +
        sectionHead("10 · Why", sy.title, sy.subtitle) +
        '<div class="story__layout">' +
          '<div class="story__photo"><img src="' + esc(sy.photo) + '" alt="' + esc(sy.photoAlt) + '" loading="lazy"></div>' +
          '<div class="story__text prose">' +
            sy.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
          "</div>" +
        "</div>" +
        '<div class="callout story__quote">' +
          sy.quote.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
        "</div>" +
        '<p class="story__closing">' + esc(sy.closing) + "</p>" +
      "</section>"
    );

    main.innerHTML = html.join("");
    nav.innerHTML = navHTML(data);

    wire();
    recalcAll();
  }

  function phaseHTML(ph) {
    var total = ph.items.reduce(function (a, w) { return a + w.tasks.length; }, 0);
    var open = openState[ph.id] !== false && ph.n === 0;
    return (
      '<div class="phase' + (open ? " is-open" : "") + '" id="' + ph.id + '" data-phase="' + ph.id + '" data-total="' + total + '">' +
        '<button class="phase__head" type="button" aria-expanded="' + (open ? "true" : "false") + '">' +
          '<span class="phase__badge"><b>' + ph.n + "</b><span>phase</span></span>" +
          '<span class="phase__meta">' +
            '<span class="phase__title">' + esc(ph.title) + " · " + esc(ph.weeks) + "</span>" +
            '<span class="phase__sub">' + esc(ph.subtitle) + "</span>" +
          "</span>" +
          '<span class="phase__right">' +
            '<span class="phase__count" data-count>0/' + total + "</span>" +
            '<span class="phase__ring" data-ring>' + ring(0) + "</span>" +
            '<span class="phase__chev">' + ICON.chev + "</span>" +
          "</span>" +
        "</button>" +
        '<div class="phase__body">' +
          ph.items.map(function (w, wi) {
            return (
              '<div class="week">' +
                '<div class="week__head">' +
                  '<span class="week__n">' + esc(w.week) + "</span>" +
                  '<span class="week__focus">' + esc(w.focus) + "</span>" +
                  '<span class="week__right">' +
                    (w.lab
                      ? '<a class="week__lab" href="' + esc(w.lab) + '">' + ICON.ext + "Lab guide</a>"
                      : "") +
                    '<span class="week__hrs">' + esc(w.hours) + " hrs</span>" +
                  "</span>" +
                "</div>" +
                '<ul class="tasks">' +
                  w.tasks.map(function (t, ti) {
                    var id = ph.id + ":" + wi + ":" + ti;
                    var done = !!progress[id];
                    return (
                      '<li class="task">' +
                        '<input type="checkbox" id="' + id + '" data-task="' + ph.id + '"' + (done ? " checked" : "") + ">" +
                        '<label for="' + id + '">' + esc(t) + "</label>" +
                      "</li>"
                    );
                  }).join("") +
                "</ul>" +
                (w.resources && w.resources.length
                  ? '<div class="chips">' + w.resources.map(function (r) {
                      return r.url ? extLink(r.url, r.label, "chip") : '<span class="chip">' + esc(r.label) + "</span>";
                    }).join("") + "</div>"
                  : "") +
              "</div>"
            );
          }).join("") +
          (ph.exit ? '<div style="padding:0 18px 16px">' + callout(ph.exit) + "</div>" : "") +
        "</div>" +
      "</div>"
    );
  }

  function navHTML(data) {
    var groups = [
      {
        label: "Get started",
        links: [
          { href: "#" + data.overview.id, text: data.overview.title },
          { href: "#" + data.stack.id, text: data.stack.title },
          { href: "#" + data.homelab.id, text: data.homelab.title },
          { href: "#" + data.certs.id, text: data.certs.title },
          { href: "#" + data.coverage.id, text: data.coverage.title }
        ]
      },
      {
        label: "The 54-week plan",
        links: data.phases.map(function (p) {
          return { href: "#" + p.id, text: p.title, n: p.n, phase: p.id };
        })
      },
      {
        label: "Reference",
        links: [
          { href: "#" + data.resources.id, text: data.resources.title },
          { href: "#" + data.costs.id, text: data.costs.title },
          { href: "#" + data.tips.id, text: data.tips.title },
          { href: "#" + data.story.id, text: data.story.title }
        ]
      }
    ];
    return groups.map(function (g) {
      return (
        '<div class="sidebar__group"><div class="sidebar__label">' + esc(g.label) + "</div>" +
        g.links.map(function (l) {
          return (
            '<a class="navlink" href="' + l.href + '"' + (l.phase ? ' data-navphase="' + l.phase + '"' : "") + ">" +
            (l.n != null ? '<span class="navlink__n">' + l.n + "</span>" : "") +
            "<span>" + esc(l.text) + "</span>" +
            (l.phase ? '<span class="navlink__pct" data-navpct>0%</span>' : "") +
            "</a>"
          );
        }).join("") +
        "</div>"
      );
    }).join("");
  }

  /* -------------------------------------------------------------- wire - */
  function wire() {
    // accordion
    document.querySelectorAll(".phase__head").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var ph = btn.closest(".phase");
        var isOpen = ph.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        openState[ph.dataset.phase] = isOpen;
        saveOpen();
      });
    });

    // checkboxes
    document.querySelectorAll('input[data-task]').forEach(function (cb) {
      cb.addEventListener("change", function () {
        if (cb.checked) progress[cb.id] = 1;
        else delete progress[cb.id];
        saveProgress();
        recalcAll();
      });
    });

    // open a phase when navigated to by hash
    document.querySelectorAll("[data-navphase]").forEach(function (a) {
      a.addEventListener("click", function () {
        var ph = document.getElementById(a.dataset.navphase);
        if (ph && !ph.classList.contains("is-open")) {
          ph.classList.add("is-open");
          ph.querySelector(".phase__head").setAttribute("aria-expanded", "true");
          openState[ph.dataset.phase] = true;
          saveOpen();
        }
      });
    });

    // reset
    var reset = document.getElementById("reset");
    if (reset) {
      reset.addEventListener("click", function () {
        if (!window.confirm("Clear all checked tasks? This only affects this browser.")) return;
        progress = {};
        saveProgress();
        document.querySelectorAll('input[data-task]').forEach(function (cb) { cb.checked = false; });
        recalcAll();
      });
    }

    // mobile sidebar
    var menu = document.getElementById("menu");
    var sidebar = document.getElementById("sidebar");
    var scrim = document.getElementById("scrim");
    function closeNav() { sidebar.classList.remove("is-open"); scrim.classList.remove("is-open"); }
    if (menu) {
      menu.addEventListener("click", function () {
        sidebar.classList.toggle("is-open");
        scrim.classList.toggle("is-open");
      });
      scrim.addEventListener("click", closeNav);
      sidebar.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
    }

    // scrollspy
    var links = Array.prototype.slice.call(document.querySelectorAll(".navlink"));
    var targets = links.map(function (l) { return document.querySelector(l.getAttribute("href")); }).filter(Boolean);
    if ("IntersectionObserver" in window && targets.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            links.forEach(function (l) {
              l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id);
            });
          });
        },
        { rootMargin: "-70px 0px -70% 0px", threshold: 0 }
      );
      targets.forEach(function (t) { io.observe(t); });
    }
  }

  /* ------------------------------------------------------------ totals - */
  function recalcAll() {
    var done = 0, total = 0;
    document.querySelectorAll(".phase").forEach(function (ph) {
      var boxes = ph.querySelectorAll('input[data-task]');
      var d = 0;
      boxes.forEach(function (b) { if (b.checked) d++; });
      var t = boxes.length;
      done += d; total += t;
      var pct = t ? Math.round((d / t) * 100) : 0;

      ph.querySelector("[data-count]").textContent = d + "/" + t;
      ph.querySelector("[data-ring]").innerHTML = ring(pct);

      var nl = document.querySelector('[data-navphase="' + ph.dataset.phase + '"]');
      if (nl) {
        nl.querySelector("[data-navpct]").textContent = pct + "%";
        nl.classList.toggle("is-done", pct === 100);
      }
    });

    var pct = total ? Math.round((done / total) * 100) : 0;
    var fill = document.getElementById("overallFill");
    var label = document.getElementById("overallLabel");
    if (fill) fill.style.width = pct + "%";
    if (label) label.textContent = pct + "% · " + done + "/" + total;
  }

  /* -------------------------------------------------------------- boot - */
  fetch("data/roadmap.json", { cache: "no-cache" })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(render)
    .catch(function (err) {
      document.getElementById("main").innerHTML =
        '<div class="callout callout--danger"><div class="callout__title">Could not load roadmap data</div>' +
        "<p>" + esc(err.message) + ". If you opened this file directly from disk, run a local server instead: " +
        "<code>python3 -m http.server 8000</code> then visit <code>http://localhost:8000</code>.</p></div>";
    });
})();
