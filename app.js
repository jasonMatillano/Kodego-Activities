// Import the necessary dependencies: Express.js for building the server, and CORS for handling cross-origin requests.
const express = require('express');
const cors = require('cors');

// Create an Express application.
const app = express();

// Configure CORS to specify which origins are allowed to access this server. 
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

// Set up middleware to parse incoming request bodies as JSON.
app.use(express.json());

// Use the user router for routes starting with '/users'. The user router is imported from './routers/user.router'.
app.use('/users', require('./routers/user.router'));

// Export the Express application to use it in your main server or application.
module.exports = app;
