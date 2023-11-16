Usage Instructions Option 1 : Running npm Commands and Development Servers ==========================================================================

This guide explains how to use the provided Node.js scripts to run npm commands and start development servers in multiple directories. There are two examples: one for running `npm install` and another for running `npm run devstart` in different directories.

### Running `npm install` Command

1. Open your terminal or command prompt.

2. Navigate to the directory where the `run-npm-init.js` file is located. In this case, it's the "MP2_New" directory.

3. Run the command using `node run-npm-init.js`.

4. The script will execute the `npm install` command in multiple directories and display the progress and output for each execution. It will also show whether any packages are looking for funding and if there are vulnerabilities in the installed packages.

5. You will see "child process exited with code 0" for each directory, indicating that the npm install process was successful.

### Running `npm run devstart` Command

1. Open your terminal or command prompt.

2. Navigate to the directory where the `run-devstart.js` file is located. In this case, it's the "MP2_New" directory.

3. Run the command using `node run-devstart.js`.

4. The script will execute the `npm run devstart` command in multiple directories and display the output for each execution.

5. You will see server startup information for each project, including the server URL where it's running (e.g., "Server is running on http://localhost:4000").

6. Each server runs in the background and can be accessed by navigating to the provided URL in a web browser.

7. The servers are typically set to automatically restart if code changes are detected (e.g., "nodemon" is used for auto-reloading).

These commands are helpful when you need to manage and work on multiple Node.js projects concurrently. They allow you to install dependencies and start development servers in multiple project directories with a single command.

Please note that the behavior and specifics of these commands may vary based on the actual code within your `run-npm-init.js` and `run-devstart.js` files. The instructions provided here are based on the examples you've given.

Option 2 : Run node run-npm-install.js and run-devstart.js using "node run" command. 
=================================================================================



