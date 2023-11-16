const { exec } = require('child_process');

// Define the npm script commands you want to run.
const command1 = 'node run-npm-install';  // First command to run
const command2 = 'node run-devstart';  // Second command to run

// Define the directory from which the script should be executed.
const workingDirectory = './';  // Working directory

// Log execute command
console.log(`Executing commands: "${command1}" and "${command2}"`);

// Function to execute a command as a Promise
const executeCommand = (command) => {
  return new Promise((resolve, reject) => {
    // Create a child process to execute the specified command with the given working directory.
    const child = exec(command, { cwd: workingDirectory });

    // Capture and log the standard output from the child process.
    child.stdout.on('data', (data) => {
      console.log(data);
    });

    // Capture and log any errors from the child process.
    child.stderr.on('data', (data) => {
      console.error(data);
    });

    // Handle the child process's exit event and resolve or reject the Promise based on the exit code.
    child.on('close', (code) => {
      if (code === 0) {
        // If the exit code is 0, resolve the Promise.
        resolve(`Child process exited with code ${code}`);
      } else {
        // If the exit code is not 0, reject the Promise.
        reject(`Child process exited with code ${code}`);
      }
    });
  });
};


// Execute command1 and introduce a 2-second delay before running command2
executeCommand(command1)
  .then(() => {
    console.log('Command 1 completed successfully. Waiting for 5 seconds...');
    return new Promise((resolve) => setTimeout(resolve, 1000));
  })
  .then(() => {
    console.log('5-second delay completed. Executing command 2...');
    return executeCommand(command2);
  })
  .then(() => {
    console.log('Command 2 completed successfully.');
    console.log('All commands completed successfully.');
  })
  .catch((error) => {
    console.error('At least one command encountered an error:', error);
  });
