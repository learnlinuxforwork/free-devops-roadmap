# Contributing

Thanks for helping keep this roadmap useful and accurate.

## What's most welcome

- **Dead or moved links.** These rot constantly. Fixing one is a real contribution.
- **Corrections.** Wrong exam code, outdated pricing, a command that no longer works.
- **Clearer task wording.** If a week's task confused you, it will confuse others.
- **Better free resources.** Especially free ones that replace paid ones.

## What's out of scope

This roadmap covers **Linux and AWS only**. Content for other operating systems or cloud
providers is out of scope by design, and a CI check enforces it. PRs adding that content
will be closed — nothing personal, it's a focus decision.

## How to contribute

1. Fork and branch: `git checkout -b fix/dead-link-phase-3`
2. Almost everything lives in [`data/roadmap.json`](data/roadmap.json). You rarely need to
   touch HTML, CSS, or JavaScript.
3. Validate your JSON before pushing:

   ```bash
   python3 -c "import json; json.load(open('data/roadmap.json')); print('ok')"
   ```

4. Preview locally:

   ```bash
   python3 -m http.server 8000   # then open http://localhost:8000
   ```

5. Open a PR. Say what changed and why in one or two sentences.

## Content style

- Plain, direct language. No hype, no "simply", no "just".
- Prefer free resources. Where a paid one is genuinely better, say what it costs.
- Every claim about a product (price, entitlement count, exam code) should be checkable
  from the linked page.
- **Disclose affiliate links in your PR description.** Some existing links are affiliate
  links; that's fine and it funds the free roadmap, but it has to be transparent.

## Adding a week

Weeks live under `phases[].items[]`:

```json
{
  "week": "Week 12",
  "focus": "Certification checkpoint",
  "hours": "6-8",
  "tasks": ["First task", "Second task"],
  "resources": [{ "label": "AWS exam guide", "url": "https://..." }]
}
```

Task text is escaped and rendered as plain text. Prose fields (`desc`, `intro`, `text`)
allow inline HTML — keep it to `<strong>`, `<em>`, `<code>`, and `<a>`.

## License

By contributing, you agree your contributions are licensed under the
[GNU AGPL v3.0 or later](https://learnlinuxforwork.com/license), the same as the rest of this project.
