# Mock Fine-Tune Example

This example demonstrates a 10-step mock fine-tuning workflow using langtrain.

## Steps

1. **Install dependencies**
   ```bash
   cd ../../
   npm install
   npm run build
   ```

2. **Navigate to example directory**
   ```bash
   cd examples/mock-finetune
   ```

3. **Review the dataset**
   ```bash
   cat train.json
   ```

4. **Review the configuration**
   ```bash
   cat config.yaml
   ```

5. **Run training (from repo root)**
   ```bash
   node packages/cli/dist/index.js tune --config examples/mock-finetune/config.yaml --input examples/mock-finetune/train.json
   ```

6. **Check the checkpoints**
   ```bash
   ls -la checkpoints/
   ```

7. **Run in dry-run mode**
   ```bash
   node packages/cli/dist/index.js tune --config examples/mock-finetune/config.yaml --input examples/mock-finetune/train.json --dry-run
   ```

8. **Test the CLI**
   ```bash
   node packages/cli/dist/index.js test --dry-run
   ```

9. **Initialize a new project**
   ```bash
   node packages/cli/dist/index.js init test-project
   ```

10. **Publish model (dry-run)**
    ```bash
    node packages/cli/dist/index.js publish --checkpoint checkpoints/checkpoint_epoch3_step15.json --dry-run
    ```

## Expected Output

The training should complete successfully with:
- 3 epochs
- 15 total steps (10 samples / batch size 2 = 5 steps per epoch)
- Checkpoint saved at the end
- Mock loss values decreasing over time

## Dataset Format

The dataset is a simple JSON file with text samples and labels:

```json
{
  "data": [
    { "text": "Sample text", "label": "positive" },
    ...
  ]
}
```

## Configuration

The `config.yaml` file defines:
- Model parameters (name, epochs, batch size)
- LoRA configuration (rank, alpha, dropout)
- Training settings (output directory, checkpoint interval)

## Notes

- This uses a mock adapter for demonstration
- No actual model weights are loaded or trained
- Loss values are randomly generated for simulation
- Perfect for testing the pipeline without GPU requirements
