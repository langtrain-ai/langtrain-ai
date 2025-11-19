#!/usr/bin/env bash
# Replace placeholder repo URL in package manifests with actual git remote
set -e
REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
if [[ -z "$REMOTE" ]]; then
  echo "No origin remote found. Please add one (git remote add origin <url>) and re-run."
  exit 1
fi
echo "Detected remote: $REMOTE"
# Replace repository fields in pyproject and package.json where placeholder exists
# Example: replace "repository = 'REPO_URL'" or similar if present
# For package.json we update repo field
find . -type f -name "package.json" -maxdepth 3 -print0 | while IFS= read -r -d '' f; do
  if grep -q '"repository":' "$f"; then
    echo "Skipping $f (already has repository)"
  else
    jq --arg url "$REMOTE" '. + {repository: $url}' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
  fi
done
echo "Updated package.json files with repository field where missing."
