# Changelog

All notable changes to this project are documented here.

## [0.1.0] — 2026-07-26

Initial public release.

### Added

- The full 54-week, 9-phase roadmap: Linux Foundations through AWS Certified DevOps
  Engineer – Professional, with tasks, resources, and certification checkpoints for
  every week.
- 51 lab guide pages (`lab/`) — one per week, with real commands, configs, and
  checkpoints, chained prev/next from Week 1 through Week 54.
- Home lab, certification roadmap, job description coverage map, cost breakdown, and
  habits sections.
- Dark and light themes, progress tracking via `localStorage`, keyboard and
  screen-reader support, print-friendly layout.
- "Why I Built This Roadmap" — the founder's story, with LinkedIn and YouTube links.
- OS/browser gate (`unsupported.html`, `assets/js/gate.js`): Windows and Microsoft Edge
  visitors are redirected to a page explaining the site is Linux/macOS-only, with links
  to install Ubuntu, Rocky Linux, or Red Hat Enterprise Linux.
- "Requires Login" badges on Core Resource List entries that need an account.
- GitHub Pages deployment via `.github/workflows/pages.yml`, with JSON validation and a
  scope check (no Microsoft/Windows/Azure content) gating every deploy.
- Organization profile README at [github.com/learnlinuxforwork](https://github.com/learnlinuxforwork).

### License

AGPL-3.0-or-later. See [LICENSE](LICENSE) or
[learnlinuxforwork.com/license](https://learnlinuxforwork.com/license).
