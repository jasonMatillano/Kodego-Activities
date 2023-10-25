const express = require('express'); // Import the Express.js framework
const userControllers = require('../app_controllers/user.controller'); // Import the user controller module
const router = express.Router(); // Create an instance of an Express router instance and configure it to use the 'cors' middleware middleware to enable CORS support and to parse JSON in request bodies instead of urlencoded form data when reading request bodies from the request body of the request. This middleware is automatically added to the router instance.

// Define a GET route at the path '/readusers' and link it to the 'read' function from the 'userControllers' module
router.get('/users', userControllers.read);
router.get('/users/:id', userControllers.readById);

// Export the router instance to make it available for use in other parts of the application
module.exports = router;
