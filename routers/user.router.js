// Import the Express.js framework and the user controller module.
const express = require('express');
const userController = require('../controllers/user.controller');

// Create an Express router to handle user-related routes.
const userRouter = express.Router();

// Destructure the controller functions for simplicity.
const { getAllUsers, getUserById, addUser } = userController;

// Define and set up the routes:

// Route to get all users. Responds to a GET request at '/get-users'.
userRouter.get('/get-users', getAllUsers);

// Route to get a specific user by their ID. Responds to a GET request at '/get-users/:id'.
userRouter.get('/get-users/:id', getUserById);

// Route to add a new user. Responds to a POST request at '/add-user'.
userRouter.post('/add-user', addUser);

// Export the user router for use in the main Express application.
module.exports = userRouter;
