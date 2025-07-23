import { promisify } from 'node:util';
import child_process from 'node:child_process';
const exec = promisify(child_process.exec);

export const executeCommand = async (command, shell) => {
  const { stdout, stderr } = await exec(command, {
    shell: shell,
  });
  return { stdout, stderr };
};
