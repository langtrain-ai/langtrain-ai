import { CliArgs } from '../args';
import { loadDataset } from '@langtrain/langtune';
import { loadImageDataset, createManifest } from '@langtrain/langvision';
import { existsSync } from 'fs';

export async function prepareCommand(args: CliArgs) {
  const input = args.input;
  const output = args.output || './manifest.jsonl';

  if (!input) {
    throw new Error('--input parameter is required');
  }

  if (!existsSync(input)) {
    throw new Error(`Input path does not exist: ${input}`);
  }

  console.log('📦 Preparing dataset...');
  console.log(`Input: ${input}`);
  console.log(`Output: ${output}`);

  // Check if input is a directory (images) or file (text data)
  const { statSync } = await import('fs');
  const isDirectory = statSync(input).isDirectory();

  if (isDirectory) {
    console.log('🖼️  Processing image dataset...');
    const imageDataset = await loadImageDataset(input);
    console.log(`Found ${imageDataset.count()} images`);

    await createManifest(imageDataset.getImages(), {
      outputPath: output,
      includeMetadata: true
    });
  } else {
    console.log('📄 Processing text dataset...');
    const dataset = await loadDataset(input);
    console.log(`Loaded ${dataset.data.length} samples`);

    // Convert to manifest format
    const { writeFileSync } = await import('fs');
    const manifestContent = dataset.data
      .map(item => JSON.stringify(item))
      .join('\n');

    writeFileSync(output, manifestContent);
    console.log(`✅ Manifest created: ${output}`);
  }

  if (args.dryRun) {
    console.log('\n[DRY RUN] No files were modified');
  }
}
