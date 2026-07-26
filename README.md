# Free DevOps Roadmap

**[free.learnlinuxforwork.com](https://free.learnlinuxforwork.com)**

A free, open-source, 54-week self-study roadmap that takes you from `ls -la` to
**AWS Certified DevOps Engineer – Professional** — with a real Linux home lab, a
capstone project, and a certification checkpoint at the end of every phase.

Built by [Shea's Tech](https://www.learnlinuxforwork.com). Free forever, AGPL licensed,
and open to contributions.

| | |
|---|---|
| **54** | weeks, week by week |
| **9** | phases, from Linux foundations to the Professional exam |
| **6** | certifications (RHCSA + five AWS) |
| **$0** | to start — the whole roadmap is free to read and use |

---

## What's inside

- **Linux first.** A full six-week Linux on-ramp before you touch AWS: shell, permissions,
  systemd, LVM, networking, SELinux, and a timed RHCSA mock-exam checkpoint in Week 4.
- **A real home lab.** Where to get a $120 used laptop, how to install RHEL 10 free for up to
  16 systems, which Linux-first laptop vendors are worth it, and how to scale to a closet
  server running Proxmox when one machine stops being enough.
- **Certification roadmap.** RHCSA, then Cloud Practitioner, Solutions Architect, Developer,
  SysOps, and DevOps Engineer – Professional, with target weeks and costs.
- **Week-by-week tasks.** Every week has a focus, 2–4 concrete tasks, an hour estimate, and
  linked resources. Check them off; your progress is saved in your browser.
- **Job description coverage map.** Every responsibility in a real DevOps job posting mapped
  to the phase that covers it.
- **Honest costs.** Exams, practice tests, hardware, and AWS usage — with the specific
  advice that stops surprise AWS bills.

## Scope

This roadmap covers **Linux and AWS only**. It intentionally contains no Microsoft Windows
or Azure material — that is a deliberate scope decision, not an oversight, and it is enforced
by a check in CI. Pull requests adding that content will be closed.

## Running it locally

No build step, no dependencies. It's plain HTML, CSS, and JavaScript.

```bash
git clone https://github.com/learnlinuxforwork/free-devops-roadmap.git
cd free-devops-roadmap
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

> Opening `index.html` directly with `file://` will not work — the page fetches
> `data/roadmap.json`, and browsers block that over the `file://` protocol. Use the
> local server above.

## Project structure

```
.
├── index.html              # the whole UI shell
├── assets/
│   ├── css/style.css       # design tokens + dark/light themes
│   ├── js/app.js           # renders roadmap.json, progress tracking, theme toggle
│   └── img/favicon.svg
├── data/
│   └── roadmap.json        # ← all content lives here
├── .github/workflows/
│   └── pages.yml           # validates JSON, blocks out-of-scope content, deploys Pages
├── CNAME                   # free.learnlinuxforwork.com
└── LICENSE                 # GNU AGPL v3.0
```

**Everything you'd want to edit is in `data/roadmap.json`.** Add a week, change a task,
swap a resource link — no HTML or JavaScript required. The page renders whatever is in
that file.

## Features

- **Dark and light mode.** Follows your system preference by default; the toggle in the
  header overrides it and the choice persists.
- **Progress tracking.** Every task is a checkbox. Per-phase rings, sidebar percentages,
  and an overall progress bar update live. Stored in `localStorage` — nothing is sent
  anywhere, there is no account, and there is no analytics.
- **Keyboard and screen-reader friendly.** Skip link, focus rings, semantic landmarks,
  `aria-expanded` on the phase accordions.
- **Prints cleanly.** All phases expand and the chrome drops away when you print or save
  to PDF.
- **No tracking, no cookies, no third-party scripts.** Zero JavaScript dependencies.

## Contributing

Contributions are welcome — corrections, dead-link fixes, better resource suggestions,
and clearer task wording especially.

1. Fork the repo and create a branch.
2. Edit `data/roadmap.json` (or the CSS/JS if you're changing the interface).
3. Validate before you push: `python3 -c "import json;json.load(open('data/roadmap.json'))"`
4. Open a pull request describing what changed and why.

Please keep the tone plain and practical, keep resources free or genuinely low-cost where
possible, and disclose affiliate relationships in the PR description. Some links in this
roadmap are affiliate links to training platforms; they cost you nothing extra and they
help keep this free.

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which validates
`data/roadmap.json`, runs the scope check, and deploys to GitHub Pages at
[free.learnlinuxforwork.com](https://free.learnlinuxforwork.com).

To set the custom domain up the first time:

1. **Settings → Pages → Source:** GitHub Actions.
2. **Settings → Pages → Custom domain:** `free.learnlinuxforwork.com`, then tick
   *Enforce HTTPS* once the certificate is issued.
3. At your DNS provider, add a `CNAME` record:

   | Type | Name | Value |
   |---|---|---|
   | CNAME | `free` | `learnlinuxforwork.github.io` |

## License

Copyright (C) 2026 Shea's Tech.

Licensed under the **GNU Affero General Public License v3.0 or later** (AGPL-3.0-or-later).
See [LICENSE](LICENSE).

In short: you're free to use, study, share, and modify this. If you run a modified version
as a public web service, you must offer that version's source to its users.

## Related

- [Learn Linux For Work](https://www.learnlinuxforwork.com) — structured, work-focused Linux training
- [Doc Linux](https://learnlinuxforwork.com/doc-linux) — command reference and syntax lookups
- [LinuxCert Guru](https://linuxcert.guru/) — hands-on RHCSA mock exams
- [Kubecraft Linux](https://www.skool.com/linux/classroom) — Linux and Kubernetes community classroom
