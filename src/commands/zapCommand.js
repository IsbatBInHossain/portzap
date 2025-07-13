import { Command } from 'commander'

// Kills the process running in the port
export const zapCommand = new Command('zap')
  .description('Finds the process using the port and terminates it')
  .argument('<port>', 'port to manage')
  .option('--force', 'Skips confirmation before termination')
  .option('--dry-run', 'Previews processes before termination')
  .action((port, options) => {
    if (options.force) {
      return console.log(`Forcefully Killed process in port ${port}`)
    }
    return console.log(`Killed process in port ${port}`)
  })
