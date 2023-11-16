const express = require('express'); // Import the Express framework
const app = express(); // Create an instance of the Express application

// Use the cors middleware to enable CORS
const cors = require('cors'); // Import the cors package
app.use(cors({
    // Define the allowed origins for CORS requests
    origin: 'http://localhost:5000'
}));

app.use(express.json()); // Enable JSON parsing of request bodies

app.use('/users', require('./app.routes/router.users'));

module.exports = app; // Export the Express application to be used in other parts of your project
