// Import the 'http' module to create an HTTP server.
const http = require('http');

// Import the 'app' module that contains the Express application.
const app = require('./app');

// Define the port where the server will listen.
const PORT = 3000;

// Create an HTTP server using the 'http' module and the 'app' Express application.
const server = http.createServer(app);

// Define an asynchronous function 'startServer' to start the server.
async function startServer() {
    // Start the server by listening on the specified port.
    server.listen(PORT, () => {
        console.log(`Server is now listening on http://localhost:${PORT}`);
    });
}

// Call the 'startServer' function to start the server.
startServer();
