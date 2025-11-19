export interface Dataset {
  data: DataPoint[];
  metadata?: Record<string, any>;
}

export interface DataPoint {
  text?: string;
  input?: string;
  output?: string;
  label?: string | number;
  [key: string]: any;
}

export interface TrainingOptions {
  dataset: Dataset;
  modelName: string;
  epochs: number;
  batchSize?: number;
  learningRate?: number;
  loraRank?: number;
  loraAlpha?: number;
  outputDir?: string;
  checkpointInterval?: number;
  resumeFrom?: string;
  adapter?: 'huggingface' | 'mock';
}

export interface TrainingResult {
  success: boolean;
  finalLoss: number;
  checkpointPath: string;
  metrics: MetricsSummary;
  duration: number;
}

export interface MetricsSummary {
  trainLoss: number[];
  valLoss?: number[];
  accuracy?: number[];
}

export interface TokenizerOptions {
  vocabSize?: number;
  maxLength?: number;
  padding?: boolean;
  truncation?: boolean;
}

export interface CheckpointData {
  epoch: number;
  step: number;
  loss: number;
  modelState: any;
  optimizerState?: any;
  timestamp: string;
}
