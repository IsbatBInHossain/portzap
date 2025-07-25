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
    const headers = ['Protocol', 'Port', 'PID'];
    const currentOs = detectOs();
    let command;
    let shell;

    if (currentOs === 'windows') {
      command = 'netstat -ano';
      shell = process.env.comspec;
    } else {
      command = 'lsof -i';
      shell = process.env.shell;
    }

    try {
      const { stdout, stderr } = await executeCommand(command, shell);
      if (stdout) {
        const allProcessData = parseOutput(stdout, currentOs);
        const filteredProcessData = filterData(allProcessData, options.port);
        filteredProcessData.sort((a, b) => Number(a.port) - Number(b.port));
        prettyPrint(headers, filteredProcessData);
      }
      if (stderr) {
        console.error('stderr:', stderr);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });
