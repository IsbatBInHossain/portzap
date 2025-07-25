import { Command } from 'commander';

// Kills the process running in the port
export const zapCommand = new Command('zap')
  .description('Finds the process using the port and terminates it')
  .argument('<port>', 'port to manage')
  .option('--force', 'Skips confirmation before termination')
  .option('--dry-run', 'Previews processes before termination')
  .action((port, options) => {
    const osConfigs = {
      windows: {
        list: 'netstat -ano',
        kill: pid => `taskkill /PID ${pid} /F`,
        shell: process.env.compspec,
      },
      default: {
        list: 'lsof -i',
        kill: pid => `kill -9 ${pid}`,
        shell: process.env.shell,
      },
    };

    return console.log('Killer process on port');
  });
