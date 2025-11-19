import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { ImageData } from './types';

export interface ManifestOptions {
  outputPath: string;
  captionField?: string;
  includeMetadata?: boolean;
}

export interface ManifestEntry {
  text: string;
  image_path: string;
  metadata?: Record<string, any>;
}

export async function createManifest(
  images: ImageData[],
  options: ManifestOptions
): Promise<string> {
  const entries: ManifestEntry[] = images.map(img => {
    const entry: ManifestEntry = {
      text: img.caption || img.filename,
      image_path: img.path,
    };

    if (options.includeMetadata && img.metadata) {
      entry.metadata = img.metadata;
    }

    return entry;
  });

  const manifestContent = entries.map(e => JSON.stringify(e)).join('\n');
  const outputPath = resolve(options.outputPath);

  writeFileSync(outputPath, manifestContent, 'utf-8');

  console.log(`✅ Manifest created: ${outputPath}`);
  console.log(`📝 Total entries: ${entries.length}`);

  return outputPath;
}

export function convertToLangtuneFormat(images: ImageData[]): Array<{text: string; metadata: any}> {
  return images.map(img => ({
    text: img.caption || `Image: ${img.filename}`,
    metadata: {
      image_path: img.path,
      filename: img.filename,
      ...img.metadata
    }
  }));
}
