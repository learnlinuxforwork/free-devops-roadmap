#!/usr/bin/env bash
# Create the GitHub repo and push. Requires the GitHub CLI: https://cli.github.com
set -euo pipefail

ORG="learnlinuxforwork"
REPO="free-devops-roadmap"
DOMAIN="free.learnlinuxforwork.com"

command -v gh >/dev/null || { echo "gh (GitHub CLI) is not installed."; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Run 'gh auth login' first."; exit 1; }

git init -b main
git add -A
git commit -m "Free DevOps Roadmap: initial release

54-week Linux-to-AWS self-study roadmap as a static site.
Dark/light themes, per-task progress tracking, all content in data/roadmap.json.
Licensed AGPL-3.0-or-later."

gh repo create "$ORG/$REPO" \
  --public \
  --source=. \
  --remote=origin \
  --description "Free 54-week self-study roadmap: Linux fundamentals to AWS Certified DevOps Engineer - Professional. Home lab guides, RHCSA + 5 AWS certs, hands-on labs." \
  --homepage "https://$DOMAIN" \
  --push

gh repo edit "$ORG/$REPO" --add-topic devops,aws,linux,rhcsa,homelab,roadmap,self-study,kubernetes,terraform,free

echo
echo "Pushed. Two manual steps remain:"
echo "  1. Settings -> Pages -> Source: GitHub Actions"
echo "  2. DNS: CNAME  free  ->  $ORG.github.io"
echo "Then Settings -> Pages -> Custom domain: $DOMAIN, and tick Enforce HTTPS."
