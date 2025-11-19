export interface CliArgs {
  command?: string;
  help?: boolean;
  version?: boolean;
  dryRun?: boolean;
  config?: string;
  input?: string;
  output?: string;
  checkpoint?: string;
  [key: string]: any;
}

export function parseArgs(): CliArgs {
  const args: CliArgs = {};
  const argv = process.argv.slice(2);

  if (argv.length === 0) {
    args.help = true;
    return args;
  }

  // First non-flag argument is the command
  let commandSet = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = argv[i + 1];

      if (key === 'help') {
        args.help = true;
      } else if (key === 'version') {
        args.version = true;
      } else if (key === 'dry-run') {
        args.dryRun = true;
      } else if (nextArg && !nextArg.startsWith('--')) {
        args[key] = nextArg;
        i++;
      } else {
        args[key] = true;
      }
    } else if (!commandSet) {
      args.command = arg;
      commandSet = true;
    } else {
      // Additional positional arguments
      if (!args.positional) args.positional = [];
      args.positional.push(arg);
    }
  }

  return args;
}
