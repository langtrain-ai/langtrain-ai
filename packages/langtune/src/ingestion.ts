import fs from 'fs';

export interface DataItem {
  text: string;
  label?: string;
}

export async function ingest(filePath: string): Promise<DataItem[]> {
  console.log(`Ingesting data from ${filePath}`);
  // Mock implementation for CSV/JSON
  if (filePath.endsWith('.json')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
  }
  return [{ text: "sample data" }];
}
