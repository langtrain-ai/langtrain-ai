# @langtrain/langtune

Text fine-tuning toolkit with LoRA adapters for large language models.

## Features

- Dataset loaders (CSV, JSON, manifest)
- Tokenizer hooks
- Training loop with checkpointing
- HuggingFace & mock adapters
- Metrics tracking
- Configuration system
- TypeScript-first API

## Installation

```bash
npm install @langtrain/langtune
```

## Usage

```typescript
import { train, loadDataset } from '@langtrain/langtune';

const dataset = await loadDataset('path/to/data.json');
const result = await train({
  dataset,
  modelName: 'gpt2',
  epochs: 3,
  loraRank: 8,
  outputDir: './checkpoints'
});
```

## API

See [documentation](../../README.md) for full API reference.

## License

MIT
