import { TokenizerOptions } from './types';

export class TokenizerHook {
  private options: Required<TokenizerOptions>;

  constructor(options: TokenizerOptions = {}) {
    this.options = {
      vocabSize: options.vocabSize || 50257,
      maxLength: options.maxLength || 512,
      padding: options.padding !== false,
      truncation: options.truncation !== false,
    };
  }

  encode(text: string): number[] {
    // Mock tokenization - split by whitespace and create simple IDs
    const tokens = text.toLowerCase().split(/\s+/);
    let ids = tokens.map(token => {
      let hash = 0;
      for (let i = 0; i < token.length; i++) {
        hash = ((hash << 5) - hash) + token.charCodeAt(i);
        hash = hash & hash;
      }
      return Math.abs(hash) % this.options.vocabSize;
    });

    if (this.options.truncation && ids.length > this.options.maxLength) {
      ids = ids.slice(0, this.options.maxLength);
    }

    if (this.options.padding && ids.length < this.options.maxLength) {
      ids = [...ids, ...new Array(this.options.maxLength - ids.length).fill(0)];
    }

    return ids;
  }

  decode(ids: number[]): string {
    // Mock decoding
    return ids.filter(id => id !== 0).map(id => `token_${id}`).join(' ');
  }

  get vocabSize(): number {
    return this.options.vocabSize;
  }
}

export function createTokenizer(options?: TokenizerOptions): TokenizerHook {
  return new TokenizerHook(options);
}
