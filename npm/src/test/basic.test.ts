import { describe, it, expect } from 'vitest';
import { createTokenizer } from '../tokenizer';
import { MetricsTracker } from '../metrics';

describe('Tokenizer', () => {
  it('should encode text', () => {
    const tokenizer = createTokenizer();
    const ids = tokenizer.encode('hello world');
    expect(ids).toBeDefined();
    expect(ids.length).toBeGreaterThan(0);
  });

  it('should have vocab size', () => {
    const tokenizer = createTokenizer({ vocabSize: 1000 });
    expect(tokenizer.vocabSize).toBe(1000);
  });
});

describe('MetricsTracker', () => {
  it('should track loss', () => {
    const metrics = new MetricsTracker();
    metrics.start();
    metrics.recordTrainLoss(1.5);
    metrics.recordTrainLoss(1.2);
    expect(metrics.getAverageLoss()).toBeCloseTo(1.35);
  });

  it('should return summary', () => {
    const metrics = new MetricsTracker();
    metrics.start();
    metrics.recordTrainLoss(1.0);
    const summary = metrics.getSummary();
    expect(summary.trainLoss).toHaveLength(1);
  });
});
