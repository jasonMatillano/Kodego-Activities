const { exec } = require('child_process');

// Define the npm script command you want to run.
const command = 'npm install';

// Define the directory from which the script should be executed.
const workingDirectory1 = './api_new';
const workingDirectory2 = './frontend_barensimple';
const workingDirectory3 = './frontend_user_management';

// Log exectute command
console.log(`Executing command: "${command}"`);

// Create a child process to execute the npm script, specifying the working directory.
const child1 = exec(command, { cwd: workingDirectory1 });
const child2 = exec(command, { cwd: workingDirectory2 });
const child3 = exec(command, { cwd: workingDirectory3 });

// Capture and log the standard output from the child process.
child1.stdout.on('data', (data) => {
  console.log(data);
});
child2.stdout.on('data', (data) => {
  console.log(data);
});
child3.stdout.on('data', (data) => {
  console.log(data);
});


// Capture and log any errors from the child process.
child1.stderr.on('data', (data) => {
  console.error(data);
});
child2.stderr.on('data', (data) => {
  console.error(data);
});
child3.stderr.on('data', (data) => {
  console.error(data);
});

// Handle the child process's exit event and log the exit code.
child1.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
child2.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
child3.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
