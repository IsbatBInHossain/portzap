import { Command } from 'commander';
import { detectOs } from '../utils/detectOs.js';
import chalk from 'chalk';
import { executeCommand } from '../utils/executeCommand.js';
import { parseOutput, filterData } from '../utils/parseOutput.js';
import confirm from '@inquirer/confirm';

// Kills the process running in the port
export const zapCommand = new Command('zap')
  .description('Finds the process using the port and terminates it')
  .argument('<port>', 'port to manage')
  .option('--force', 'Skips confirmation before termination')
  .option('--dry-run', 'Previews processes before termination')
  .hook('preAction', (thisCommand) => {
    const opts = thisCommand.opts();
    if (opts.force && opts.dryRun) {
      console.error(
        `${chalk.redBright('Error:')} Cannot use '--dry-run' and '--force' together.`
      );
      process.exit(1);
    }
  })
  .action(async (port, options) => {
    const osConfigs = {
      windows: {
        listCmd: {
          command: 'netstat',
          args: ['-ano'],
        },
        killCmd: (pid) => ({
          command: 'taskkill',
          args: ['/PID', pid, '/F'],
        }),
      },
      unix: {
        listCmd: {
          command: 'lsof',
          args: ['-i'],
        },
        killCmd: (pid) => ({
          command: 'kill',
          args: ['-9', pid],
        }),
      },
    };
    const currentOs = detectOs();
    const config = osConfigs[currentOs];

    try {
      const { stdout, stderr } = await executeCommand(
        config.listCmd.command,
        config.listCmd.args
      );
      if (stdout) {
        const allProcessData = parseOutput(stdout, currentOs);
        const filteredProcessData = filterData(allProcessData, port);
        filteredProcessData.sort((a, b) => Number(a.port) - Number(b.port));
        if (filteredProcessData.length === 0) {
          console.warn(
            `${chalk.yellowBright('Warning: ')} No process found in given port`
          );
        } else if (filteredProcessData.length > 1) {
          console.warn(
            `${chalk.yellowBright(
              'Warning: '
            )} More than one process is running on port ${port}`
          );
        } else {
          const pid = filteredProcessData[0].pid;
          if (options.dryRun) {
            const { command, args } = config.killCmd(pid);
            console.warn(
              `${chalk.redBright('DRY RUN:')} Would execute ${command} ${args.join(
                ' '
              )} to stop process on port ${port}.`
            );
            return;
          } else if (options.force) {
            const { command, args } = config.killCmd(pid);
            await executeCommand(command, args);
            console.log(
              `${chalk.greenBright(
                `Successfully stopped the process at port ${port}`
              )}`
            );
          } else {
            const ans = await confirm({
              message: `${chalk.yellowBright(
                'Warning: '
              )} Are you sure to stop the process in port: ${port}`,
            });
            if (ans) {
              const { command, args } = config.killCmd(pid);
              await executeCommand(command, args);
              console.log(
                `${chalk.greenBright(
                  `Successfully stopped the process at port ${port}`
                )}`
              );
            } else {
              console.log(
                `${chalk.yellowBright('Warning:')} Stopped the process`
              );
            }
          }
        }
      }
      if (stderr) {
        console.error('stderr:', stderr);
      }
    } catch (error) {
      console.error(`${chalk.redBright('Error:')} ${error.message}`);
    }
  });
