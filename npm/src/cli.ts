#!/usr/bin/env node

// Simplified CLI that wraps the main CLI package
console.log('langtrain CLI v1.0.0');
console.log('');

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  printHelp();
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  console.log('v1.0.0');
  process.exit(0);
}

printHelp();

function printHelp() {
  console.log(`Usage: langtrain <command> [options]

Commands:
  init <name>              Initialize new project
  prepare                  Prepare dataset for training
  tune --config <path>     Run fine-tuning with config
  publish                  Publish trained model
  test --dry-run           Run in test mode

Options:
  --help, -h               Show help
  --version, -v            Show version
  --dry-run                Run in test mode

Examples:
  langtrain init my-project
  langtrain prepare --input data.csv --output manifest.jsonl
  langtrain tune --config config.yaml
  langtrain publish --checkpoint ./checkpoints/final.json

For full functionality, install workspace packages:
  npm install @langtrain/cli

Documentation: https://github.com/langtrain-ai/langtrain-ai
`);
}
