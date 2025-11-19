import { prepare as langtunePrepare } from '@langtrain/langtune';

export async function prepare(config: any) {
  console.log("Running prepare command...");
  if (config.dryRun) {
    console.log("[Dry Run] Would prepare data");
    return;
  }
  await langtunePrepare({});
}
