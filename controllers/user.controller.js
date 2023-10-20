// // Import the user model or data structure containing user information.
// const usersModel = require('../models/user.model');

// // Function to retrieve all users.
// function getAllUsers(request, response) {
//     // Respond with a 200 OK status and return all users as JSON.
//     response.status(200).json(usersModel);
// }

// // Function to retrieve a user by their ID.
// function getUserById(request, response) {
//     // Extract the user ID from the request parameters.
//     const userId = Number(request.params.id);
//     // Find the user with the matching ID in the usersModel.
//     const user = usersModel.find(user => user.id === userId);

//     // If a user with the specified ID is found, respond with their data.
//     if (user) {
//         response.status(200).json(user);
//     } else {
//         // If no user with the specified ID is found, respond with a 400 status and an error message.
//         response.status(400).json({
//             status: false,
//             message: 'User not found'
//         });
//     }
// }

// // Function to add a new user.
// function addUser(request, response) {
//     // Extract user data (name, username, and password) from the request body.
//     const { name, username, password } = request.body;
//     // Create a new user object with an ID based on the number of existing users.
//     const user = { id: usersModel.length + 1, name, username, password };
//     // Check if the username already exists in the usersModel.
//     const usernameExists = usersModel.some(user => user.username === username);

//     // If the username already exists, respond with an error indicating the duplication.
//     if (usernameExists) {
//         response.status(200).json({
//             status: false,
//             uNameDup: true,
//             message: 'Username already exists'
//         });
//         return; // Exit the function to prevent further execution.
//     }

//     // If any of the required fields are missing, respond with a 400 status and an error message.
//     if (!name || !username || !password) {
//         response.status(400).json({
//             status: false,
//             message: 'Fields cannot be empty'
//         });
//         return; // Exit the function to prevent further execution.
//     } else {
//         // If the data is valid, add the new user to the usersModel array.
//         usersModel.push(user);
//         // Respond with a 200 status and a success message.
//         response.status(200).json({
//             status: true,
//             message: 'User successfully added'
//         });
//     }
// }

// // Export the functions for use in an Express or Node.js application.
// module.exports = {
//     getAllUsers,
//     getUserById,
//     addUser
// };

//With data.json===========================================================================================================================

// Import the user model module (presumably containing functions for interacting with user data).
const userModel = require('./user.model');

// Controller function to get all users.
function getAllUsers(req, res) {
    // Retrieve all users using the getUser method from the user model.
    const users = userModel.getUsers();
    // Respond with the list of users in JSON format.
    res.json(users);
}

// Controller function to create a new user.
function createUser(req, res) {
    // Extract the 'name' and 'email' from the request's body.
    const { name, email } = req.body;
    
    // Add a new user with the provided name and email using the addUser method from the user model.
    const newUser = userModel.addUser({ name, email });
    
    // Respond with the newly created user in JSON format.
    res.json(newUser);
}

// Controller function to get a user by their ID.
function getUser(req, res) {
    // Extract the 'userId' from the request parameters and parse it to an integer.
    const userId = parseInt(req.params.userId);
    
    // Retrieve the user with the specified ID using the getUserById method from the user model.
    const user = userModel.getUserById(userId);
    
    if (user) {
        // If a user is found, respond with the user data in JSON format.
        res.json(user);
    } else {
        // If no user is found, set the HTTP status to 404 (Not Found) and respond with an error message.
        res.status(404).json({ message: 'User not found' });
    }
}

// Export the controller functions to be used in the application's routes.
module.exports = {
    getAllUsers,
    createUser,
    getUser
};
