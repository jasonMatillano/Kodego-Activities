const express = require('express'); // Import the Express.js framework
const userControllers = require('../controllers/user.controller'); // Import the user controller module

// Create an instance of an Express router
const router = express.Router();

// Define a GET route at the path '/readusers' and link it to the 'read' function from the 'userControllers' module
router.get('/users', userControllers.read);
router.get('/users/:id', userControllers.readById);

// Export the router instance to make it available for use in other parts of the application
module.exports = router;
