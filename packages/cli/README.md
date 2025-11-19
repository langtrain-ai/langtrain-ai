# @langtrain/cli

Command-line interface for Langtrain fine-tuning workflows.

## Installation

```bash
npm install -g @langtrain/cli
```

## Usage

```bash
# Initialize project
langtrain init my-project

# Prepare dataset
langtrain prepare --input data.csv --output manifest.jsonl

# Fine-tune model
langtrain tune --config config.yaml

# Publish model
langtrain publish --checkpoint ./checkpoints/final.json

# Test mode
langtrain test --dry-run
```

## Commands

- `init` - Initialize new project
- `prepare` - Prepare datasets for training
- `tune` - Run fine-tuning
- `publish` - Publish trained model
- `test` - Run in test/dry-run mode

## License

MIT
