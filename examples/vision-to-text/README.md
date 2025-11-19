# Vision-to-Text Example

This example shows how to convert image datasets to langtune-compatible manifest format.

## Setup

1. Add images to `images/` directory
2. Run the conversion script:

```bash
node packages/cli/dist/index.js prepare --input examples/vision-to-text/images --output examples/vision-to-text/manifest.jsonl
```

## Expected Output

A `manifest.jsonl` file with entries like:

```json
{"text": "image1.jpg", "image_path": "/path/to/images/image1.jpg"}
{"text": "image2.jpg", "image_path": "/path/to/images/image2.jpg"}
```

## Usage

The generated manifest can be used for training:

```bash
node packages/cli/dist/index.js tune --config config.yaml --input manifest.jsonl
```

## Sample Images

For testing, you can use any images in common formats (jpg, png, gif, webp).
