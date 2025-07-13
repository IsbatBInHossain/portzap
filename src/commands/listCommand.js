import { Command } from 'commander'

// List all the ports
export const listCommand = new Command('list')
  .description('Shows all port in use')
  .argument('<port>', 'port to manage')
