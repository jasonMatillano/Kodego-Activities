// Import the Express application instance from app.js
const app = require('./app.js');

// Import the http module
const http = require('http');

// Import the mongoose module
const mongoose = require('mongoose');

// MongoDB connection URL
const mongo_URL = `mongodb+srv://jasonmatillano:2FjCOHlQQUH7dOh0@cluster0.1px2qnd.mongodb.net/Users?retryWrites=true&w=majority`;

// Create an HTTP server using the Express application instance
const server = http.createServer(app);

// Event handler for when MongoDB connection is open
mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB');
});

// Event handler for MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error(err);
});

// Async function to start the server
async function serverStart() {
  // Connect to MongoDB using the defined URL
  await mongoose.connect(mongo_URL);

  // Define the port on which the server will listen
  const port = 3030;

  // Start the server and listen on the specified port
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
  });
}

// Call the async function to start the server
serverStart();
