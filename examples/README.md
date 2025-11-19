# Langtrain Examples

This directory contains examples demonstrating various features of langtrain.

## Examples

### 1. Mock Fine-Tune (`mock-finetune/`)

A complete 10-step walkthrough of the fine-tuning pipeline using mock data.

**Features:**
- Dataset loading (JSON format)
- YAML configuration
- Mock training loop
- Checkpointing
- CLI commands

**Run it:**
```bash
cd mock-finetune
# Follow steps in README.md
```

### 2. Vision-to-Text (`vision-to-text/`)

Convert image datasets to langtune-compatible manifest format.

**Features:**
- Image dataset scanning
- Manifest generation
- Integration with langvision

**Run it:**
```bash
node packages/cli/dist/index.js prepare --input examples/vision-to-text/images --output manifest.jsonl
```

### 3. Programmatic API (`programmatic-api/`)

Use langtrain as a library in your TypeScript/JavaScript code.

**Features:**
- Direct API usage
- No CLI required
- Custom configuration

**Run it:**
```bash
cd ../../
npm run build
cd examples/programmatic-api
npx ts-node example.ts
```

## Prerequisites

Before running examples:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build all packages:
   ```bash
   npm run build
   ```

## Common Workflows

### Text Classification

```bash
# Prepare data
echo '{"data":[{"text":"example","label":"positive"}]}' > data.json

# Train
node packages/cli/dist/index.js tune --config config.yaml --input data.json
```

### Image Dataset Processing

```bash
# Convert images to manifest
node packages/cli/dist/index.js prepare --input ./images --output manifest.jsonl

# Use manifest for training
node packages/cli/dist/index.js tune --config config.yaml --input manifest.jsonl
```

### Dry-Run Testing

```bash
# Test without making changes
node packages/cli/dist/index.js tune --config config.yaml --input data.json --dry-run
```

## Sample Datasets

Each example includes sample datasets. For production use:

- **Text data**: Use CSV, JSON, or JSONL format
- **Vision data**: Organize images in directories
- **Manifest format**: One JSON object per line

## Next Steps

1. Review the mock-finetune example
2. Adapt the configuration to your needs
3. Prepare your own datasets
4. Run training on real data
5. Publish your fine-tuned models

## Support

See the main [README](../README.md) for documentation and support.
