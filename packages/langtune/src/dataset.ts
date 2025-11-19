import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Dataset, DataPoint } from './types';

export class DatasetLoader {
  static async loadCSV(path: string): Promise<Dataset> {
    const content = readFileSync(resolve(path), 'utf-8');
    const lines = content.split('\n').filter(l => l.trim());
    const headers = lines[0].split(',');

    const data: DataPoint[] = lines.slice(1).map(line => {
      const values = line.split(',');
      const point: DataPoint = {};
      headers.forEach((header, i) => {
        point[header.trim()] = values[i]?.trim() || '';
      });
      return point;
    });

    return { data, metadata: { format: 'csv', path } };
  }

  static async loadJSON(path: string): Promise<Dataset> {
    const content = readFileSync(resolve(path), 'utf-8');
    const parsed = JSON.parse(content);

    if (Array.isArray(parsed)) {
      return { data: parsed, metadata: { format: 'json', path } };
    }

    if (parsed.data && Array.isArray(parsed.data)) {
      return { data: parsed.data, metadata: { format: 'json', path, ...parsed.metadata } };
    }

    throw new Error('Invalid JSON format. Expected array or object with "data" field.');
  }

  static async loadManifest(path: string): Promise<Dataset> {
    const content = readFileSync(resolve(path), 'utf-8');
    const lines = content.split('\n').filter(l => l.trim());

    const data: DataPoint[] = lines.map(line => {
      try {
        return JSON.parse(line);
      } catch {
        return { text: line };
      }
    });

    return { data, metadata: { format: 'manifest', path } };
  }
}

export async function loadDataset(path: string, format?: 'csv' | 'json' | 'manifest'): Promise<Dataset> {
  const ext = format || path.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'csv':
      return DatasetLoader.loadCSV(path);
    case 'json':
    case 'jsonl':
      return DatasetLoader.loadJSON(path);
    case 'manifest':
    case 'txt':
      return DatasetLoader.loadManifest(path);
    default:
      throw new Error(`Unsupported format: ${ext}`);
  }
}
