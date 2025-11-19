export interface ImageData {
  path: string;
  filename: string;
  width?: number;
  height?: number;
  caption?: string;
  metadata?: Record<string, any>;
}

export interface ImageDatasetOptions {
  extensions?: string[];
  recursive?: boolean;
  loadMetadata?: boolean;
}

export interface TransformOptions {
  resize?: { width: number; height: number };
  normalize?: boolean;
  augment?: boolean;
}
