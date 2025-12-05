# Publishing Packages

This guide explains how to publish the langtrain-ai packages to NPM and PyPI.

## Package Overview

| Package | Registry | Location |
|---------|----------|----------|
| `langtrain-ai-cli` | NPM | `/npm/` |
| `langtune` | PyPI | `/pypi/langtune/` |
| `langvision` | PyPI | `/pypi/langvision/` |
| `langtrain-ai` | PyPI | `/pypi/langtrain_ai/` |

---

## Getting API Tokens

### NPM Token

1. Go to [npmjs.com](https://www.npmjs.com/) and sign in
2. Navigate to **Account Settings** → **Access Tokens**
3. Click **Generate New Token** → **Classic Token**
4. Select **Automation** type for CI/CD use
5. Copy the token (starts with `npm_`)

### PyPI Token

1. Go to [pypi.org](https://pypi.org/) and sign in
2. Navigate to **Account Settings** → **API tokens**
3. Click **Add API token**
4. Set scope to "Entire account" or specific packages
5. Copy the token (starts with `pypi-`)

---

## Setting Up GitHub Secrets

Add these secrets to your repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

| Secret Name | Value |
|-------------|-------|
| `NPM_TOKEN` | Your NPM access token |
| `PYPI_API_TOKEN` | Your PyPI API token |

---

## Manual Publishing

### Publish to NPM

```bash
# Set your token
export NPM_TOKEN=npm_xxxxxxxxxxxx

# Dry run (build and pack only)
./scripts/publish-npm.sh --dry-run

# Real publish
./scripts/publish-npm.sh
```

### Publish to PyPI

```bash
# Set your token
export PYPI_API_TOKEN=pypi-xxxxxxxxxxxx

# Dry run (build only)
./scripts/publish-pypi.sh --dry-run

# Real publish
./scripts/publish-pypi.sh
```

---

## Automated Publishing (GitHub Actions)

### On Version Tags

Both NPM and PyPI packages are automatically published when you push a version tag:

```bash
# Bump version in package.json files
npm version patch  # or minor, major

# Create and push tag
git tag v0.2.0
git push origin v0.2.0
```

### Manual Trigger

You can also trigger publishing manually from GitHub:

1. Go to **Actions** tab in your repository
2. Select **Publish to NPM** or **Publish to PyPI**
3. Click **Run workflow**
4. Optionally enable dry-run mode

---

## Using Changesets (Recommended)

For proper versioning and changelog generation:

```bash
# Create a changeset
npx changeset

# Push to main - creates a release PR
git add .
git commit -m "feat: add new feature"
git push

# When PR is merged, packages are published automatically
```

---

## Troubleshooting

### NPM Publish Fails

- Ensure `NPM_TOKEN` secret is set correctly
- Check if package name is available on npm
- Verify you're logged in: `npm whoami`

### PyPI Publish Fails

- Ensure `PYPI_API_TOKEN` secret is set correctly
- Check if package name is available on PyPI
- Verify token has correct permissions

### Version Already Exists

Bump the version in the respective `package.json` or `pyproject.toml` before publishing.
