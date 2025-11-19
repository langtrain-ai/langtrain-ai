import { train, loadDataset } from '../../packages/langtune/src';

async function main() {
  console.log('🚀 Programmatic API Example\n');

  // Load dataset
  const dataset = await loadDataset('../mock-finetune/train.json');
  console.log(`Loaded ${dataset.data.length} samples`);

  // Configure and run training
  const result = await train({
    dataset,
    modelName: 'gpt2',
    epochs: 2,
    batchSize: 4,
    loraRank: 8,
    loraAlpha: 16,
    outputDir: './output',
    checkpointInterval: 5,
    adapter: 'mock'
  });

  console.log('\n✅ Training complete!');
  console.log('Results:', {
    success: result.success,
    finalLoss: result.finalLoss.toFixed(4),
    checkpointPath: result.checkpointPath,
    duration: `${(result.duration / 1000).toFixed(2)}s`,
    totalSteps: result.metrics.trainLoss.length
  });
}

main().catch(console.error);
