# @langtrain/langvision

Vision utilities and dataset transforms for image-to-text fine-tuning workflows.

## Features

- Image dataset loading & transforms
- Simple augmentation utilities
- Image-to-text conversion helpers
- Export to langtune-compatible manifest format

## Installation

```bash
npm install @langtrain/langvision
```

## Usage

```typescript
import { loadImageDataset, createManifest } from '@langtrain/langvision';

const images = await loadImageDataset('./images');
const manifest = await createManifest(images, {
  outputPath: './manifest.jsonl',
  captionField: 'description'
});
```

## API

- `loadImageDataset(path)` - Load images from directory
- `createManifest(images, options)` - Convert to langtune format
- `augmentImage(image, options)` - Apply augmentation
- `resizeImage(image, width, height)` - Resize utilities

## License

MIT
