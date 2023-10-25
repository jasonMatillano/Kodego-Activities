// Import the Express.js framework
const express = require('express');

// Import the user controller module
const userControllers = require('./controllers/user.controller.js');

// Create an instance of an Express router
const router = express.Router();

// Define a GET route at the path '/readusers' and link it to the 'read' function from the 'userControllers' module
router.get('/readusers', userControllers.read);

// Export the router instance to make it available for use in other parts of the application
module.exports = router;
