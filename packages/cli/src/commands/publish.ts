export function publish(config: any) {
  console.log("Running publish command...");
  if (config.dryRun) {
    console.log("[Dry Run] Would publish package");
    return;
  }
  // Publish logic
}
