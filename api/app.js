const express = require('express'); // Import the Express framework
const app = express(); // Create an instance of the Express application
const userController = require('./app.contollers/contoller.user.js'); // Adjust the path to your userController file

// Use the cors middleware to enable CORS
const cors = require('cors'); // Import the cors package
app.use(cors());

// Use the userController as middleware
app.put('/users/:id', userController); // You can specify a base route like "/api" if needed
app.get('/users', userController);
app.get('/users/:id', userController);
app.delete('/users/:id', userController);
app.post('/users', userController);

module.exports = app; // Export the Express application to be used in other parts of your project
