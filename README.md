<div align="center">

<img src="assets/img/ST-Brain-Logo-badge.png" width="96" height="96" alt="Shea's Tech">

# AWS DevOps

**An open-source, 54-week self-study roadmap from `ls -la` to**
**AWS Certified DevOps Engineer – Professional.**

[**free.learnlinuxforwork.com**](https://free.learnlinuxforwork.com) · [CHANGELOG](CHANGELOG.md)

[![License: AGPL v3](https://img.shields.io/badge/license-AGPL--3.0--or--later-0aa3ad?style=flat-square)](https://learnlinuxforwork.com/license)
[![Live site](https://img.shields.io/badge/live-free.learnlinuxforwork.com-0aa3ad?style=flat-square)](https://free.learnlinuxforwork.com)
[![No tracking](https://img.shields.io/badge/tracking-none-0aa3ad?style=flat-square)](#features)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-0aa3ad?style=flat-square)](#contributing)
[![Made by Shea's Tech](https://img.shields.io/badge/made%20by-Shea's%20Tech-0aa3ad?style=flat-square)](https://www.sheastech.io)

</div>

<br>

A real Linux home lab, a capstone project, and a certification checkpoint at the end of
every phase — with a real explanation of why it exists, not just a task list. See
[**Why I Built This Roadmap**](https://free.learnlinuxforwork.com/#story).

<br>

<div align="center">

| 54 | 9 | 6 | $0 |
|:---:|:---:|:---:|:---:|
| **weeks** | **phases** | **certifications** | **to start** |

</div>

<br>

## What's inside

- **Linux first.** A full six-week Linux on-ramp before you touch AWS: shell, permissions,
  systemd, LVM, networking, SELinux, and a timed RHCSA mock-exam checkpoint in Week 4.
- **Real lab guides.** Every one of the 54 weeks has its own guide with the actual commands,
  configs, and checkpoints — not just a task list. [See an example ›](https://free.learnlinuxforwork.com/lab/phase-0-week-1.html)
- **A real home lab.** Where to get a $120 used laptop, how to install RHEL 10 free for up to
  16 systems, and how to scale to a closet server running Proxmox when one machine stops
  being enough.
- **Certification roadmap.** RHCSA, then Cloud Practitioner, Solutions Architect, Developer,
  SysOps, and DevOps Engineer – Professional, with target weeks and costs.
- **Job description coverage map.** Every responsibility in a real DevOps job posting mapped
  to the phase that covers it.
- **Honest costs.** Exams, practice tests, hardware, and AWS usage — with the specific
  advice that stops surprise AWS bills.

## Scope

This roadmap covers **Linux and AWS only.** It intentionally contains no Microsoft Windows
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
├── index.html                 the whole UI shell
├── unsupported.html           OS/browser gate destination page
├── assets/
│   ├── css/style.css          design tokens + dark/light themes
│   ├── js/
│   │   ├── app.js             renders roadmap.json, progress tracking, theme toggle
│   │   ├── lab.js             theme toggle for the static lab pages
│   │   └── gate.js            OS/browser gate
│   └── img/
├── data/
│   └── roadmap.json           ← almost all content lives here
├── lab/                       one static page per week — real commands and configs
├── .github/workflows/
│   └── pages.yml               validates JSON, blocks out-of-scope content, deploys Pages
├── CNAME                       free.learnlinuxforwork.com
└── LICENSE                     GNU AGPL v3.0
```

**Everything you'd want to edit is in `data/roadmap.json`.** Add a week, change a task,
swap a resource link — no HTML or JavaScript required. The page renders whatever is in
that file.

## Features

| | |
|---|---|
| **Dark and light mode** | Follows your system preference by default; the toggle in the header overrides it and the choice persists. |
| **Progress tracking** | Every task is a checkbox. Per-phase rings, sidebar percentages, and an overall progress bar update live — stored in `localStorage`, nothing is sent anywhere. |
| **Keyboard and screen-reader friendly** | Skip link, focus rings, semantic landmarks, `aria-expanded` on the phase accordions. |
| **Prints cleanly** | All phases expand and the chrome drops away when you print or save to PDF. |
| **No tracking, no cookies** | Zero JavaScript dependencies, zero third-party scripts, zero analytics. |

## Contributing

Contributions are welcome — corrections, dead-link fixes, better resource suggestions,
and clearer task wording especially. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full
guide; the short version:

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

Copyright © 2026 Shea's Tech.

Licensed under the **GNU Affero General Public License v3.0 or later** (AGPL-3.0-or-later).
See [LICENSE](LICENSE) or the plain-language summary at
[learnlinuxforwork.com/license](https://learnlinuxforwork.com/license).

In short: you're free to use, study, share, and modify this. If you run a modified version
as a public web service, you must offer that version's source to its users.

## Related

<div align="center">

| | |
|---|---|
| **[Doc Linux](https://learnlinuxforwork.com/doc-linux)** | Command reference and syntax lookups |
| **[Learn Linux For Work](https://www.learnlinuxforwork.com)** | Structured, work-focused Linux training |
| **[The Hood](https://learnlinuxforwork.com/the-hood)** | Community space for questions and support |
| **[LinuxCert Guru](https://linuxcert.guru/)** | Hands-on RHCSA mock exams |
| **[Kubecraft Linux](https://www.skool.com/linux/classroom)** | Linux and Kubernetes community classroom |

</div>

<br>

<div align="center">

Built by **[Shea's Tech](https://www.sheastech.io)** · [sheastech.io](https://www.sheastech.io) · [learnlinuxforwork.com](https://www.learnlinuxforwork.com)

</div>
