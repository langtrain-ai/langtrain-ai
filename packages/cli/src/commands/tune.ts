import { CliArgs } from '../args';
import { train, loadDataset } from '@langtrain/langtune';
import { existsSync, readFileSync } from 'fs';

interface Config {
  model: {
    name: string;
    epochs: number;
    batch_size?: number;
    learning_rate?: number;
  };
  lora: {
    rank?: number;
    alpha?: number;
    dropout?: number;
  };
  training: {
    output_dir?: string;
    checkpoint_interval?: number;
  };
  dataset?: {
    path: string;
  };
}

export async function tuneCommand(args: CliArgs) {
  const configPath = args.config;

  if (!configPath) {
    throw new Error('--config parameter is required');
  }

  if (!existsSync(configPath)) {
    throw new Error(`Config file not found: ${configPath}`);
  }

  console.log('🔧 Loading configuration...');
  const config = loadConfig(configPath);

  const datasetPath = args.input || config.dataset?.path || './data/train.json';

  if (!existsSync(datasetPath)) {
    throw new Error(`Dataset not found: ${datasetPath}`);
  }

  console.log('📚 Loading dataset...');
  const dataset = await loadDataset(datasetPath);
  console.log(`Loaded ${dataset.data.length} samples`);

  if (args.dryRun) {
    console.log('\n[DRY RUN] Training simulation');
    console.log('Configuration:', JSON.stringify(config, null, 2));
    console.log('Would train for', config.model.epochs, 'epochs');
    return;
  }

  console.log('🚀 Starting fine-tuning...');

  const result = await train({
    dataset,
    modelName: config.model.name,
    epochs: config.model.epochs,
    batchSize: config.model.batch_size,
    learningRate: config.model.learning_rate,
    loraRank: config.lora.rank,
    loraAlpha: config.lora.alpha,
    outputDir: config.training.output_dir,
    checkpointInterval: config.training.checkpoint_interval,
    adapter: 'mock'
  });

  console.log('\n✅ Fine-tuning complete!');
  console.log(`Final loss: ${result.finalLoss.toFixed(4)}`);
  console.log(`Checkpoint: ${result.checkpointPath}`);
  console.log(`Duration: ${(result.duration / 1000).toFixed(2)}s`);
}

function loadConfig(path: string): Config {
  const content = readFileSync(path, 'utf-8');

  // Simple YAML-like parser for basic configs
  if (path.endsWith('.yaml') || path.endsWith('.yml')) {
    return parseSimpleYaml(content);
  }

  return JSON.parse(content);
}

function parseSimpleYaml(content: string): Config {
  const config: any = {};
  let currentSection: any = config;
  let currentKey = '';

  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.search(/\S/);
    const colonIndex = trimmed.indexOf(':');

    if (colonIndex > -1) {
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();

      if (indent === 0) {
        currentKey = key;
        if (!value) {
          config[key] = {};
          currentSection = config[key];
        } else {
          config[key] = parseValue(value);
        }
      } else {
        if (currentSection) {
          currentSection[key] = parseValue(value);
        }
      }
    }
  }

  return config as Config;
}

function parseValue(value: string): any {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(Number(value))) return Number(value);
  return value;
}
