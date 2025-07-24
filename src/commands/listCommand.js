import { Command } from 'commander';
import { detectOs } from '../utils/detectOs.js';
import { executeCommand } from '../utils/executeCommand.js';
import { parseOutput } from '../utils/parseOutput.js';

// List all the ports
export const listCommand = new Command('list')
  .description('Shows all port in use')
  .argument('<port>', 'port to manage')
  .action(async port => {
    const currentOs = detectOs();
    if (currentOs === 'windows') {
      const winCommand = `netstat -ano`;
      try {
        const { stdout, stderr } = await executeCommand(winCommand, 'cmd.exe');
        if (stdout) {
          const processData = parseOutput(stdout, currentOs, port);
          console.log(processData);
        }
        if (stderr) {
          console.error('stderr:', stderr);
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    } else {
      const unixCommand = `lsof -i`;
      try {
        const { stdout, stderr } = await executeCommand(
          unixCommand,
          '/bin/bash'
        );
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.error('stderr:', stderr);
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }
  });
