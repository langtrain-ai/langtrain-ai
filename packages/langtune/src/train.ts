import { TrainingOptions, TrainingResult } from './types';
import { CheckpointManager, defaultConfig } from './config';
import { MetricsTracker } from './metrics';
import { HuggingFaceAdapter, MockAdapter } from './adapters';
import { createTokenizer } from './tokenizer';

export async function train(options: TrainingOptions): Promise<TrainingResult> {
  console.log('🚀 Starting training...');

  const config = {
    ...defaultConfig,
    modelName: options.modelName,
    epochs: options.epochs,
    batchSize: options.batchSize || defaultConfig.batchSize,
    learningRate: options.learningRate || defaultConfig.learningRate,
    outputDir: options.outputDir || defaultConfig.outputDir,
    loraConfig: {
      ...defaultConfig.loraConfig,
      rank: options.loraRank || defaultConfig.loraConfig.rank,
      alpha: options.loraAlpha || defaultConfig.loraConfig.alpha,
    }
  };

  const adapter = options.adapter === 'huggingface' ? new HuggingFaceAdapter() : new MockAdapter();
  await adapter.initialize(config.modelName, config.loraConfig);

  const tokenizer = createTokenizer();
  const checkpointManager = new CheckpointManager(config.outputDir);
  const metrics = new MetricsTracker();
  metrics.start();

  const { dataset } = options;
  const totalSteps = Math.ceil(dataset.data.length / config.batchSize) * config.epochs;
  let globalStep = 0;

  for (let epoch = 1; epoch <= config.epochs; epoch++) {
    console.log(`\n📚 Epoch ${epoch}/${config.epochs}`);

    for (let i = 0; i < dataset.data.length; i += config.batchSize) {
      const batch = dataset.data.slice(i, i + config.batchSize);

      for (const sample of batch) {
        const text = sample.text || sample.input || '';
        const inputIds = tokenizer.encode(text);

        await adapter.forward(inputIds);
        const loss = Math.random() * 2 + 0.5; // Mock loss
        await adapter.backward(loss);

        metrics.recordTrainLoss(loss);
        globalStep++;
      }

      if (globalStep % 10 === 0) {
        metrics.logProgress(epoch, globalStep, totalSteps);
      }

      if (options.checkpointInterval && globalStep % options.checkpointInterval === 0) {
        const checkpoint = {
          epoch,
          step: globalStep,
          loss: metrics.getAverageLoss(),
          modelState: adapter.getState(),
          timestamp: new Date().toISOString()
        };
        const path = checkpointManager.save(checkpoint);
        console.log(`💾 Checkpoint saved: ${path}`);
      }
    }
  }

  const finalCheckpoint = {
    epoch: config.epochs,
    step: globalStep,
    loss: metrics.getAverageLoss(),
    modelState: adapter.getState(),
    timestamp: new Date().toISOString()
  };
  const checkpointPath = checkpointManager.save(finalCheckpoint);

  console.log('\n✅ Training complete!');
  console.log(`📊 Final loss: ${metrics.getAverageLoss().toFixed(4)}`);
  console.log(`⏱️  Duration: ${(metrics.getDuration() / 1000).toFixed(2)}s`);

  return {
    success: true,
    finalLoss: metrics.getAverageLoss(),
    checkpointPath,
    metrics: metrics.getSummary(),
    duration: metrics.getDuration()
  };
}
