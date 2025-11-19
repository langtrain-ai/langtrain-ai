import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { CliArgs } from '../args';

export async function initCommand(args: CliArgs) {
  const projectName = args.positional?.[0] || 'my-langtrain-project';
  const projectPath = resolve(projectName);

  if (existsSync(projectPath)) {
    throw new Error(`Directory already exists: ${projectPath}`);
  }

  console.log(`🚀 Initializing project: ${projectName}`);

  mkdirSync(projectPath, { recursive: true });
  mkdirSync(join(projectPath, 'data'), { recursive: true });
  mkdirSync(join(projectPath, 'checkpoints'), { recursive: true });
  mkdirSync(join(projectPath, 'config'), { recursive: true });

  const configContent = `model:
  name: gpt2
  epochs: 3
  batch_size: 8
  learning_rate: 0.0001
lora:
  rank: 8
  alpha: 16
  dropout: 0.1
training:
  output_dir: ./checkpoints
  checkpoint_interval: 100
`;

  writeFileSync(join(projectPath, 'config', 'config.yaml'), configContent);

  const readmeContent = `# ${projectName}

Langtrain fine-tuning project

## Setup

1. Add your training data to \`data/\`
2. Configure training in \`config/config.yaml\`
3. Run: \`langtrain tune --config config/config.yaml\`

## Structure

- \`data/\` - Training datasets
- \`checkpoints/\` - Model checkpoints
- \`config/\` - Configuration files
`;

  writeFileSync(join(projectPath, 'README.md'), readmeContent);

  console.log(`✅ Project initialized at: ${projectPath}`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${projectName}`);
  console.log(`  # Add training data to data/`);
  console.log(`  langtrain tune --config config/config.yaml`);
}
