import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { CheckpointData } from './types';

export interface LoRAConfig {
  rank: number;
  alpha: number;
  dropout: number;
  targetModules: string[];
}

export interface TrainingConfig {
  modelName: string;
  epochs: number;
  batchSize: number;
  learningRate: number;
  weightDecay: number;
  warmupSteps: number;
  loraConfig: LoRAConfig;
  outputDir: string;
}

export const defaultConfig: TrainingConfig = {
  modelName: 'gpt2',
  epochs: 3,
  batchSize: 8,
  learningRate: 1e-4,
  weightDecay: 0.01,
  warmupSteps: 100,
  loraConfig: {
    rank: 8,
    alpha: 16,
    dropout: 0.1,
    targetModules: ['q_proj', 'v_proj']
  },
  outputDir: './checkpoints'
};

export class CheckpointManager {
  private outputDir: string;

  constructor(outputDir: string) {
    this.outputDir = resolve(outputDir);
    if (!existsSync(this.outputDir)) {
      mkdirSync(this.outputDir, { recursive: true });
    }
  }

  save(checkpoint: CheckpointData): string {
    const filename = `checkpoint_epoch${checkpoint.epoch}_step${checkpoint.step}.json`;
    const path = resolve(this.outputDir, filename);
    writeFileSync(path, JSON.stringify(checkpoint, null, 2));
    return path;
  }

  load(path: string): CheckpointData {
    const content = readFileSync(resolve(path), 'utf-8');
    return JSON.parse(content);
  }

  latest(): string | null {
    if (!existsSync(this.outputDir)) return null;
    // Implementation would scan directory for latest checkpoint
    return null;
  }
}
