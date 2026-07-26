# CLAUDE.md

Context for Claude Code working in this repository.

## What this is

A static site published at **https://free.learnlinuxforwork.com** — a free, open-source
54-week self-study roadmap taking someone from Linux fundamentals to AWS Certified DevOps
Engineer – Professional. Owned by Shea's Tech (`github.com/learnlinuxforwork`).

It started life as a branded PDF eBook and was converted into this site. The PDF and the
site share the same source content; the site is now the canonical version.

## Hard constraints — do not violate these

1. **No Microsoft, Windows, or Azure content. Ever.** This is a deliberate scope decision by
   the owner, not an oversight. `.github/workflows/pages.yml` greps `*.html`, `*.css`,
   `*.js`, and `*.json` for `microsoft|azure|windows|powershell|wsl|rufus` and **fails the
   build** on a match. `README.md` is exempt because it documents the policy itself. If you
   need a USB-writing tool, use `dd` or balenaEtcher — not Rufus.
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
data/roadmap.json       ALL CONTENT. This is the file to edit for any content change.
```

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

- [ ] Repo not yet created on GitHub. `setup.sh` creates and pushes it via `gh`.
- [ ] Settings → Pages → Source must be set to **GitHub Actions** (one-time, manual).
- [ ] DNS: `CNAME` record `free` → `learnlinuxforwork.github.io` (one-time, manual).
- [ ] Enforce HTTPS in Settings → Pages once the certificate issues.

## Style

Prose in the content should be plain and direct — no hype, no "simply", no "just", no
exclamation marks. The audience is career changers on a budget; the tone is a
knowledgeable friend, not a marketing page.
