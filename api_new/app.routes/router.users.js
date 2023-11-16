// router.users.js

const express = require('express');
const router = express.Router();

const UserController = require('../app.controllers/controller.user');

// Define route handlers
router.get('/get_users', UserController.getAllUsers);
// Add more route handlers using UserController functions for other user-related operations (POST, PUT, DELETE, etc.) as needed

// Define a route handler for updating a user by ID using a PUT request
router.put('/update/:id', UserController.updateUserById);

module.exports = router;
