import { Command } from 'commander';
import { detectOs } from '../utils/detectOs.js';
import { executeCommand } from '../utils/executeCommand.js';
import { parseOutput } from '../utils/parseOutput.js';
import { prettyPrint } from '../utils/prettyPrint.js';

const filterData = (data, portNumber) =>
  data.filter(line => (portNumber ? line.port === String(portNumber) : true));

// List all the ports
export const listCommand = new Command('list')
  .description('Shows all port in use')
  .option('-p, --port <port>', 'Optional port number')
  .action(async options => {
    const currentOs = detectOs();
    const headers = ['Protocol', 'Port', 'PID'];
    if (currentOs === 'windows') {
      const winCommand = `netstat -ano`;
      try {
        const { stdout, stderr } = await executeCommand(winCommand, 'cmd.exe');
        if (stdout) {
          const processData = parseOutput(stdout, currentOs);
          const filteredProcessData = filterData(processData, options.port);
          prettyPrint(headers, filteredProcessData);
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
          const processData = parseOutput(stdout, currentOs);
          const filteredProcessData = filterData(processData, options.port);
          prettyPrint(headers, filteredProcessData);
        }
        if (stderr) {
          console.error('stderr:', stderr);
        }
      } catch (error) {
        console.error(`Error: ${error.message}, ${error.stack}`);
      }
    }
  });
