import { MetricsSummary } from './types';

export class MetricsTracker {
  private trainLoss: number[] = [];
  private valLoss: number[] = [];
  private accuracy: number[] = [];
  private startTime: number = 0;

  start(): void {
    this.startTime = Date.now();
    this.trainLoss = [];
    this.valLoss = [];
    this.accuracy = [];
  }

  recordTrainLoss(loss: number): void {
    this.trainLoss.push(loss);
  }

  recordValLoss(loss: number): void {
    this.valLoss.push(loss);
  }

  recordAccuracy(acc: number): void {
    this.accuracy.push(acc);
  }

  getSummary(): MetricsSummary {
    return {
      trainLoss: this.trainLoss,
      valLoss: this.valLoss.length > 0 ? this.valLoss : undefined,
      accuracy: this.accuracy.length > 0 ? this.accuracy : undefined,
    };
  }

  getDuration(): number {
    return Date.now() - this.startTime;
  }

  getAverageLoss(): number {
    if (this.trainLoss.length === 0) return 0;
    return this.trainLoss.reduce((a, b) => a + b, 0) / this.trainLoss.length;
  }

  logProgress(epoch: number, step: number, totalSteps: number): void {
    const progress = ((step / totalSteps) * 100).toFixed(1);
    const avgLoss = this.getAverageLoss().toFixed(4);
    console.log(`Epoch ${epoch} | Step ${step}/${totalSteps} (${progress}%) | Avg Loss: ${avgLoss}`);
  }
}
