// Define file type and functionality 
const express = require('express'); // Import the Express.js framework
const router = express.Router(); // Create an instance of an Express router 

// Mount controller from app_controllers/user.controller
const userControllers = require('../app_controllers/user.controller'); // Import the user controller module
router.get('/users', userControllers.read);
router.get('/users/:id', userControllers.readById);

// Define a other routs here...

// Export the router instance to make it available for use in other parts of the application
module.exports = router;
