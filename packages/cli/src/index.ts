#!/usr/bin/env node

import { parseArgs } from './args';
import { initCommand } from './commands/init';
import { prepareCommand } from './commands/prepare';
import { tuneCommand } from './commands/tune';
import { publishCommand } from './commands/publish';
import { testCommand } from './commands/test';

async function main() {
  const args = parseArgs();

  if (args.help || !args.command) {
    printHelp();
    process.exit(0);
  }

  if (args.version) {
    console.log('langtrain v1.0.0');
    process.exit(0);
  }

  try {
    switch (args.command) {
      case 'init':
        await initCommand(args);
        break;
      case 'prepare':
        await prepareCommand(args);
        break;
      case 'tune':
        await tuneCommand(args);
        break;
      case 'publish':
        await publishCommand(args);
        break;
      case 'test':
        await testCommand(args);
        break;
      default:
        console.error(`Unknown command: ${args.command}`);
        printHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
Langtrain CLI - Efficient LoRA fine-tuning toolkit

Usage: langtrain <command> [options]

Commands:
  init <name>              Initialize new project
  prepare                  Prepare dataset for training
  tune --config <path>     Run fine-tuning with config
  publish                  Publish trained model
  test --dry-run           Run in test mode

Options:
  --help                   Show help
  --version                Show version
  --dry-run                Run in test mode without making changes

Examples:
  langtrain init my-project
  langtrain prepare --input data.csv --output manifest.jsonl
  langtrain tune --config config.yaml
  langtrain publish --checkpoint ./checkpoints/final.json
  langtrain test --dry-run
`);
}

main();
