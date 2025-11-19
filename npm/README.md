# langtrain

Efficient LoRA fine-tuning toolkit for text and vision models.

## Installation

```bash
npm install -g langtrain
```

## Quick Start

```bash
# Initialize project
langtrain init my-project

# Prepare dataset
langtrain prepare --input data.csv --output manifest.jsonl

# Fine-tune model
langtrain tune --config config.yaml

# Publish model
langtrain publish --checkpoint ./checkpoints/final.json
```

## Features

- 🚀 **LoRA Fine-Tuning** - Efficient parameter-efficient fine-tuning
- 📚 **Dataset Loaders** - Support for CSV, JSON, and manifest formats
- 🖼️ **Vision Support** - Image dataset processing with langvision
- ⚙️ **Configuration** - YAML/JSON config system
- 📊 **Metrics** - Built-in training metrics and visualization
- 🔄 **Checkpointing** - Automatic checkpoint saving and resuming
- 🧪 **Mock Adapters** - Test training without actual model weights

## Commands

### `langtrain init <name>`

Initialize a new fine-tuning project.

```bash
langtrain init my-nlp-project
```

### `langtrain prepare`

Prepare datasets for training.

```bash
langtrain prepare --input data.csv --output manifest.jsonl
```

Options:
- `--input` - Input data path (CSV, JSON, or image directory)
- `--output` - Output manifest path
- `--dry-run` - Preview without making changes

### `langtrain tune`

Run fine-tuning with a configuration file.

```bash
langtrain tune --config config.yaml --input train.json
```

Options:
- `--config` - Configuration file path (YAML or JSON)
- `--input` - Training dataset path
- `--dry-run` - Simulate training

### `langtrain publish`

Publish a trained model.

```bash
langtrain publish --checkpoint ./checkpoints/final.json
```

Options:
- `--checkpoint` - Checkpoint file path
- `--dry-run` - Preview without uploading

### `langtrain test`

Run system tests.

```bash
langtrain test --dry-run
```

## Configuration

Example `config.yaml`:

```yaml
model:
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
```

## Programmatic API

```typescript
import { train, loadDataset } from 'langtrain';

const dataset = await loadDataset('data.json');
const result = await train({
  dataset,
  modelName: 'gpt2',
  epochs: 3,
  loraRank: 8,
});

console.log('Training complete:', result.checkpointPath);
```

## Examples

See the [examples](https://github.com/langtrain-ai/langtrain-ai/tree/main/examples) directory for complete examples:

- Text classification fine-tuning
- Question answering
- Vision-language tasks
- Custom dataset preparation

## Documentation

Full documentation: [https://github.com/langtrain-ai/langtrain-ai](https://github.com/langtrain-ai/langtrain-ai)

## License

MIT © Pritesh Raj

## Contributing

Contributions welcome! See [CONTRIBUTING.md](https://github.com/langtrain-ai/langtrain-ai/blob/main/CONTRIBUTING.md)

## Support

- [GitHub Issues](https://github.com/langtrain-ai/langtrain-ai/issues)
- [Documentation](https://github.com/langtrain-ai/langtrain-ai)
