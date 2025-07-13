import { Command } from 'commander'

// Shows port info
export const infoCommand = new Command('info')
  .description(
    'Shows PID, process name, full command, status of the process in port'
  )
  .argument('<port>', 'port to manage')
