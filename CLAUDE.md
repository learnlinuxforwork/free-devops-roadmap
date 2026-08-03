# CLAUDE.md

Context for Claude Code working in this repository.

## What this is

A static site published at **https://free.learnlinuxforwork.com**, branded **AWS DevOps** —
an open-source 54-week self-study roadmap taking someone from Linux fundamentals to AWS
Certified DevOps Engineer – Professional. Owned by Shea's Tech (`github.com/learnlinuxforwork`).

It started life as a branded PDF eBook and was converted into this site. The PDF and the
site share the same source content; the site is now the canonical version.

## Hard constraints — do not violate these

1. **No Microsoft, Windows, or Azure content. Ever.** This is a deliberate scope decision by
   the owner, not an oversight. `.github/workflows/pages.yml` greps `*.html`, `*.css`,
   `*.js`, and `*.json` for `microsoft|azure|windows|powershell|wsl|rufus` and **fails the
   build** on a match. `README.md` is exempt because it documents the policy itself. If you
   need a USB-writing tool, use `dd` or balenaEtcher — not Rufus.
   - **Two more exemptions, both intentional:** `unsupported.html` and `assets/js/gate.js`
     implement the OS/browser gate — every page except `unsupported.html` loads `gate.js`,
     which redirects Windows and Microsoft Edge visitors to `unsupported.html`, a page that
     tells them (by name) to install Linux or macOS instead. Those two files necessarily
     contain the literal words and are excluded from the grep by name. Don't "clean up" the
     Windows/Microsoft/Edge references out of them — that's the entire point of the page.
2. **License is AGPL-3.0-or-later.** Keep the `LICENSE` file intact and keep the license
   header comments at the top of `style.css` and `app.js`. New source files get the same
   header.
3. **No build step, no dependencies, no framework.** Plain HTML, CSS, and vanilla ES5-ish
   JavaScript. Do not introduce npm, a bundler, Tailwind, React, or any CDN script. The
   whole point is that it works forever with zero maintenance.
4. **No tracking, no analytics, no cookies, no third-party requests.** Progress lives in
   `localStorage` only. Do not add telemetry of any kind.
5. **Keep the affiliate links intact.** Several resource URLs carry affiliate parameters
   (`?via=`, `?affcode=`, `tidd.ly` shortlinks). They fund the free roadmap. Do not
   "clean up" or rewrite them. Current affiliate links:
   - `learn.cantrill.io?affcode=212820_n7shpfjf`
   - `portal.tutorialsdojo.com/ref/sheastech`
   - `tidd.ly/4fBRIub` (KodeKloud), `tidd.ly/4yFi0UN` (LabEx), `tidd.ly/4pCL8rI` (Linux Foundation)
   - `scrimba.com/...?via=u4481332`

## Architecture

```
index.html              Shell only: header, sidebar container, empty <main>, footer.
                        Contains an inline anti-FOUC script that reads the saved theme
                        before first paint. Nothing else is hardcoded here.
assets/css/style.css    Design tokens in :root, [data-theme="light"], [data-theme="dark"],
                        plus a prefers-color-scheme block for the unset case.
                        All colors are variables — never hardcode a hex in a component rule.
assets/js/app.js        One IIFE. fetch()es data/roadmap.json, renders every section as
                        HTML strings, then wires events. No framework, no virtual DOM.
assets/js/lab.js        Tiny IIFE shared by every page under lab/. Theme toggle only —
                        no fetch, no progress tracking. Lab pages are static HTML, not
                        rendered by app.js.
assets/js/gate.js       OS/browser gate. Loaded (render-blocking, no defer/async, on
                        purpose) from every page except unsupported.html. Redirects
                        Windows and Microsoft Edge visitors to unsupported.html.
unsupported.html        The gate's destination. Explains the site is Linux/macOS-only
                        and links out to install Ubuntu, Rocky Linux, or RHEL. Does NOT
                        load gate.js itself (would infinite-loop). See "Hard constraints"
                        above for why this file is exempt from the scope-check grep.
data/roadmap.json       ALL CONTENT. This is the file to edit for any content change.
lab/                    One static HTML page per week: phase-<n>-week-<n>.html.
                        Real commands/configs/scripts for that week's tasks, plus a
                        Reference & community links block (always Doc Linux + The Hood,
                        plus that week's specific resources from roadmap.json).
                        Self-contained pages: own <head>, reuses style.css + lab.js,
                        no dependency on app.js or the SPA shell.
```

### Lab guide pages (lab/)

Each week in `data/roadmap.json` may carry a `"lab"` field, e.g.
`"lab": "lab/phase-0-week-1.html"`. When present, `app.js` renders a "Lab guide" pill
next to that week's hours (`.week__lab`, wired in `phaseHTML()`). Weeks without a `lab`
field simply don't show the pill — this is how partial rollout across phases works
without breaking anything.

To add a new lab page:
1. Copy the structure of an existing `lab/phase-*-week-*.html` — same `<head>` block
   (anti-FOUC script, canonical URL, favicon, stylesheet), same header/footer markup as
   `index.html` but with `../` path prefixes and no progress bar / reset button.
2. Use `.doc-shell`, `.doc-hero`, `.doc-refs`, `.task-block`, and `pre.codeblock` (all
   defined in style.css under "lab pages") — don't invent new layout classes per page.
3. Reference links block: always include Doc Linux (`chip--accent`) and The Hood
   (`chip--accent`) first, then that week's specific resources as plain `.chip`s, pulled
   from the same week's `resources[]` array in roadmap.json.
4. One `.task-block` per task in that week, with real, technically accurate commands —
   this is the entire point of the page. Use `.codeblock__label` above a block to caption
   it. Use `.callout` / `.callout--warn` / `.callout--success` for checkpoints and traps.
5. Wire prev/next nav in `.doc-hero__nav` (top) and the matching block at the bottom of
   `<main>` to the adjacent week's page. The last week of a phase should point its "next"
   at `../index.html#phases` until the next phase's lab pages exist.
6. Add the `"lab"` field to that week's object in `data/roadmap.json`.
7. Run the verify steps below — the scope check applies to `lab/*.html` too (a Week 6
   file has previously tripped it over a throwaway "N/A on Windows" comment — don't
   mention Windows/Azure/etc at all, not even to exclude it).

As of the last update, **Phase 0 (Weeks 1-6) is fully built**. Phases 1-8 (Weeks 7-54)
do not have lab pages yet — those weeks have no `"lab"` field and show no pill.

`app.js` responsibilities, in order:

1. Theme: read `localStorage["fdr.theme.v1"]`, apply `data-theme` on `<html>`, toggle on click.
2. Progress: read `localStorage["fdr.progress.v1"]` (map of `taskId -> 1`).
   Task IDs are `"<phaseId>:<weekIndex>:<taskIndex>"`, e.g. `"phase-0:3:1"`.
3. Accordion open/closed state: `localStorage["fdr.open.v1"]`.
4. `render(data)` builds the whole page, then `wire()` attaches listeners, then
   `recalcAll()` computes per-phase and overall percentages.

**Escaping contract:** `esc()` escapes task text, names, and labels. Prose fields
(`desc`, `intro`, `text`, `outro`, table cell contents) are injected as raw HTML on
purpose so they can carry `<a>`, `<strong>`, `<em>`, `<code>`. Keep that split — if you
start escaping prose fields, links inside the content will render as literal markup.

## Editing content

Nearly every request ("add a week", "fix a link", "change a resource") is a
`data/roadmap.json` edit and nothing else. Structure:

- `meta`, `hero` — titles, stats
- `overview`, `stack`, `homelab`, `certs`, `coverage` — the intro sections
- `phases[]` — 9 phases, each with `items[]` (weeks), each week with `tasks[]` and `resources[]`
- `resources`, `costs`, `tips` — the reference sections

Adding or removing a task changes the denominator of the progress bar. Existing users'
saved progress is keyed by index, so **inserting a task in the middle of a week shifts the
IDs of every task after it** and their checkmarks will appear to move. Prefer appending.

## Verify before you commit

```bash
python3 -c "import json; json.load(open('data/roadmap.json')); print('json ok')"

grep -rniE '\b(microsoft|azure|windows|powershell|wsl2?|rufus)\b' \
  --include='*.html' --include='*.css' --include='*.js' --include='*.json' . \
  && echo "SCOPE VIOLATION" || echo "scope ok"

python3 -m http.server 8000   # then check http://localhost:8000 in both themes
```

Opening `index.html` over `file://` will not work — the `fetch()` of `roadmap.json` is
blocked by CORS. Always use the local server.

Manual checks that CI cannot do for you:

- Toggle dark and light. Every surface, border, and text color must remain readable.
- Check a task, reload the page, confirm it is still checked.
- Narrow the window below 1000px — the sidebar becomes a drawer behind the hamburger.
- Print preview: all phases should be expanded and the chrome gone.

## Deployment

Push to `main` → `.github/workflows/pages.yml` validates JSON, runs the scope check, and
deploys to GitHub Pages. `CNAME` pins the custom domain; do not delete it.

## Status / open items

- [x] Repo created on GitHub at `learnlinuxforwork/free-devops-roadmap` and pushed.
- [x] Settings → Pages → Source set to **GitHub Actions**.
- [x] DNS: `CNAME` record `free` → `learnlinuxforwork.github.io` created and live.
- [x] Enforce HTTPS turned on in Settings → Pages.
- [x] Lab guide pages built for all 9 phases, all 54 weeks (51 pages — Phase 8 groups
      Weeks 49-50 and 51-53 into single pages, matching how those items are grouped in
      `data/roadmap.json`). Every week has a `"lab"` field and a `.week__lab` pill.
      Prev/next nav chains unbroken from `phase-0-week-1.html` to `phase-8-week-54.html`.
      Verified: JSON valid, scope check clean, zero broken internal links across all 51
      pages, deployed live.

## Style

Prose in the content should be plain and direct — no hype, no "simply", no "just", no
exclamation marks. The audience is career changers on a budget; the tone is a
knowledgeable friend, not a marketing page.
