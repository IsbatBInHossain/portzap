import { Command } from 'commander';
import { detectOs } from '../utils/detectOs.js';
import { executeCommand } from '../utils/executeCommand.js';
import { parseOutput, filterData } from '../utils/parseOutput.js';
import { prettyPrint } from '../utils/prettyPrint.js';
import chalk from 'chalk';

// List all the ports
export const listCommand = new Command('list')
  .description('Shows all port in use')
  .option('-p, --port <port>', 'Optional port number')
  .action(async (options) => {
    const currentOs = detectOs();
    const headers = ['Protocol', 'Port', 'PID'];

    // Define OS-specific command and args
    let command;
    let args;

    if (currentOs === 'windows') {
      command = 'netstat';
      args = ['-ano'];
    } else if (currentOs === 'unix') {
      command = 'lsof';
      args = ['-i'];
    }

    try {
      const { stdout, stderr } = await executeCommand(command, args);
      if (stdout) {
        const allProcessData = parseOutput(stdout, currentOs);
        const filteredProcessData = filterData(allProcessData, options.port);
        prettyPrint(headers, filteredProcessData);
      }
      if (stderr) {
        console.error('stderr:', stderr);
      }
    } catch (error) {
      console.error(`${chalk.redBright('Error:')} ${error.message}`);
    }
  });
