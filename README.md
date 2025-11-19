# Langtrain AI

Monorepo for Langtrain AI tools.

## Packages

- `packages/langtune`: Text fine-tuning toolkit (core API + CLI helpers)
- `packages/langvision`: Vision utilities (reference for langtune)
- `packages/cli`: Langtrain CLI wrapper

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build all packages:
   ```bash
   npm run build
   ```

3. Run CLI:
   ```bash
   node packages/cli/dist/index.js --help
   ```

4. Run example fine-tune:
   ```bash
   node packages/cli/dist/index.js tune --dry-run
   ```

## Publishing

To publish the `langtrain` npm package:

```bash
cd npm
npm pack
```
