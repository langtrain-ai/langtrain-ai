#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .scriptName("langtrain")
  .usage("$0 <cmd> [args]")
  .command("init", "Initialize project", () => { }, async (argv) => {
    console.log("langtrain init");
  })
  .command("prepare", "Prepare dataset", () => { }, async (argv) => {
    console.log("prepare called");
  })
  .command("tune", "Run tune", (y) => y.option("config", { type: "string", demandOption: true }), async (argv) => {
    console.log("tune with config", (argv as any).config);
  })
  .command("publish", "Publish packages (--dry-run)", (y) => y.option("dry-run", { type: "boolean", default: false }), async (argv) => {
    console.log("publish requested, dry-run:", (argv as any)["dry-run"]);
  })
  .command("test", "Run tests", () => { }, async () => {
    console.log("test");
  })
  .option("dry-run", { type: "boolean", default: false })
  .help()
  .argv;
