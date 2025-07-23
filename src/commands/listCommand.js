import { Command } from 'commander';
import { detectOs } from '../utils/detectOs.js';
import { promisify } from 'node:util';
import child_process from 'node:child_process';
const exec = promisify(child_process.exec);

// List all the ports
export const listCommand = new Command('list')
  .description('Shows all port in use')
  .argument('<port>', 'port to manage')
  .action(async port => {
    const currentOs = detectOs();
    if (currentOs === 'windows') {
      try {
        const { stdout, stderr } = await exec(
          `netstat -ano | findstr ${port}`,
          {
            shell: 'powershell.exe',
          }
        );
        if (stdout) {
          console.log('stdout:', stdout);
        }
        if (stderr) {
          console.error('stderr:', stderr);
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    } else {
      console.log(`Run lsof -i | grep ${port}`);
    }
  });
