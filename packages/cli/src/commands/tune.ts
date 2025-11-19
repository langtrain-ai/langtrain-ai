import { tune as langtuneTune } from '@langtrain/langtune';

export async function tune(config: any, args: string[]) {
  console.log("Running tune command...");
  if (config.dryRun) {
    console.log("[Dry Run] Would start tuning");
    return;
  }
  // Parse --config
  const configIndex = args.indexOf('--config');
  const configFile = configIndex > -1 ? args[configIndex + 1] : null;

  await langtuneTune({ configFile });
}
