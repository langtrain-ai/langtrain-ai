import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { ImageData, ImageDatasetOptions } from './types';

export class ImageDataset {
  private images: ImageData[] = [];
  private basePath: string;

  constructor(basePath: string, options: ImageDatasetOptions = {}) {
    this.basePath = basePath;
    const extensions = options.extensions || ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const recursive = options.recursive !== false;

    this.images = this.scanDirectory(basePath, extensions, recursive);
  }

  private scanDirectory(dir: string, extensions: string[], recursive: boolean): ImageData[] {
    const results: ImageData[] = [];

    try {
      const entries = readdirSync(dir);

      for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory() && recursive) {
          results.push(...this.scanDirectory(fullPath, extensions, recursive));
        } else if (stat.isFile()) {
          const ext = extname(entry).toLowerCase();
          if (extensions.includes(ext)) {
            results.push({
              path: fullPath,
              filename: entry,
              width: undefined,
              height: undefined,
            });
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to scan directory: ${dir}`, error);
    }

    return results;
  }

  getImages(): ImageData[] {
    return this.images;
  }

  count(): number {
    return this.images.length;
  }

  filter(predicate: (img: ImageData) => boolean): ImageData[] {
    return this.images.filter(predicate);
  }
}

export async function loadImageDataset(path: string, options?: ImageDatasetOptions): Promise<ImageDataset> {
  return new ImageDataset(path, options);
}
