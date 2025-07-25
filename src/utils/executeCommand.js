import { spawn } from 'node:child_process';

export const executeCommand = (command, args = [], options = {}) => {
  return new Promise((resolve, reject) => {
    // Spawn the child process
    const child = spawn(command, args, options);

    let stdout = '';
    let stderr = '';

    // Capture stdout
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    // Capture stderr
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    // Handle errors during process spawning
    child.on('error', (error) => {
      reject(error);
    });

    // Handle process exit
    child.on('close', (code) => {
      if (code === 0) {
        // Resolve promise on successful exit
        resolve({ stdout, stderr });
      } else {
        // Reject promise on non-zero exit code
        const error = new Error(
          `Process exited with code ${code}\nStderr: ${stderr}`
        );
        error.code = code;
        reject(error);
      }
    });
  });
};
