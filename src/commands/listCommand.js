import { Command } from 'commander';
import { detectOs } from '../utils/detectOs.js';
import { executeCommand } from '../utils/executeCommand.js';
import { parseOutput } from '../utils/parseOutput.js';
import { prettyPrint } from '../utils/prettyPrint.js';

// List all the ports
export const listCommand = new Command('list')
  .description('Shows all port in use')
  .argument('<port>', 'port to manage')
  .action(async port => {
    const currentOs = detectOs();
    const headers = ['Protocol', 'Port', 'PID'];
    if (currentOs === 'windows') {
      const winCommand = `netstat -ano`;
      try {
        const { stdout, stderr } = await executeCommand(winCommand, 'cmd.exe');
        if (stdout) {
          const processData = parseOutput(stdout, currentOs, port);
          prettyPrint(headers, processData);
        }
        if (stderr) {
          console.error('stderr:', stderr);
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    } else {
      const unixCommand = 'lsof -i';
      try {
        const { stdout, stderr } = await executeCommand(unixCommand);
        if (stdout) {
          const processData = parseOutput(stdout, currentOs, port);
          prettyPrint(headers, processData);
        }
        if (stderr) {
          console.error('stderr:', stderr);
        }
      } catch (error) {
        console.error(`Error: ${error.message}, ${error.stack}`);
      }
    }
  });
