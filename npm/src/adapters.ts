import { LoRAConfig } from './config';

export interface Adapter {
  initialize(modelName: string, loraConfig: LoRAConfig): Promise<void>;
  forward(inputIds: number[]): Promise<number[]>;
  backward(loss: number): Promise<void>;
  getState(): any;
  loadState(state: any): void;
}

export class HuggingFaceAdapter implements Adapter {
  private modelName: string = '';
  private config: LoRAConfig | null = null;

  async initialize(modelName: string, loraConfig: LoRAConfig): Promise<void> {
    this.modelName = modelName;
    this.config = loraConfig;
  }

  async forward(inputIds: number[]): Promise<number[]> {
    return inputIds.map(id => id + 1);
  }

  async backward(loss: number): Promise<void> {}

  getState(): any {
    return { modelName: this.modelName, config: this.config };
  }

  loadState(state: any): void {
    this.modelName = state.modelName;
    this.config = state.config;
  }
}

export class MockAdapter implements Adapter {
  private initialized = false;
  private step = 0;

  async initialize(modelName: string, loraConfig: LoRAConfig): Promise<void> {
    this.initialized = true;
  }

  async forward(inputIds: number[]): Promise<number[]> {
    if (!this.initialized) throw new Error('Adapter not initialized');
    return inputIds.map((id, i) => (id + i) % 50257);
  }

  async backward(loss: number): Promise<void> {
    this.step++;
  }

  getState(): any {
    return { initialized: this.initialized, step: this.step };
  }

  loadState(state: any): void {
    this.initialized = state.initialized;
    this.step = state.step;
  }
}
