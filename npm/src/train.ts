import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Dataset, DataPoint, TrainingOptions, TrainingResult } from './types';
import { CheckpointManager, defaultConfig } from './config';
import { MetricsTracker } from './metrics';
import { MockAdapter } from './adapters';
import { createTokenizer } from './tokenizer';

export class DatasetLoader {
  static async loadJSON(path: string): Promise<Dataset> {
    const content = readFileSync(resolve(path), 'utf-8');
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return { data: parsed };
    }
    if (parsed.data && Array.isArray(parsed.data)) {
      return { data: parsed.data, metadata: parsed.metadata };
    }
    throw new Error('Invalid JSON format');
  }
}

export async function loadDataset(path: string): Promise<Dataset> {
  return DatasetLoader.loadJSON(path);
}

export async function train(options: TrainingOptions): Promise<TrainingResult> {
  const config = {
    ...defaultConfig,
    ...options,
    loraConfig: {
      ...defaultConfig.loraConfig,
      rank: options.loraRank || defaultConfig.loraConfig.rank,
      alpha: options.loraAlpha || defaultConfig.loraConfig.alpha,
    }
  };

  const adapter = new MockAdapter();
  await adapter.initialize(config.modelName, config.loraConfig);

  const tokenizer = createTokenizer();
  const checkpointManager = new CheckpointManager(config.outputDir || './checkpoints');
  const metrics = new MetricsTracker();
  metrics.start();

  const { dataset } = options;
  const batchSize = config.batchSize || 8;
  const totalSteps = Math.ceil(dataset.data.length / batchSize) * config.epochs;
  let globalStep = 0;

  for (let epoch = 1; epoch <= config.epochs; epoch++) {
    for (let i = 0; i < dataset.data.length; i += batchSize) {
      const batch = dataset.data.slice(i, i + batchSize);
      for (const sample of batch) {
        const text = sample.text || sample.input || '';
        const inputIds = tokenizer.encode(text);
        await adapter.forward(inputIds);
        const loss = Math.random() * 2 + 0.5;
        await adapter.backward(loss);
        metrics.recordTrainLoss(loss);
        globalStep++;
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

  return {
    success: true,
    finalLoss: metrics.getAverageLoss(),
    checkpointPath,
    metrics: metrics.getSummary(),
    duration: metrics.getDuration()
  };
}
