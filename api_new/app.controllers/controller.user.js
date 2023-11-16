// controller.user.js

// Import the fs module for file system operations
const fs = require('fs');

// Function to read users from the file
const readUsersFromFile = (callback) => {
    // Read the users.json file asynchronously
    fs.readFile('./app.models/users.json', 'utf8', (err, data) => {
        if (err) {
            // Handle errors while reading the file
            console.error('Error reading users.json:', err);
            callback(err, null);
        } else {
            try {
                // Parse the JSON data from the file
                const users = JSON.parse(data);
                // Call the callback with the parsed users data
                callback(null, users);
            } catch (error) {
                // Handle errors while parsing JSON
                console.error('Error parsing JSON:', error);
                callback(error, null);
            }
        }
    });
};

// Function to get all users
const getAllUsers = (req, res) => {
    // Call the readUsersFromFile function
    readUsersFromFile((err, users) => {
        if (err) {
            // Handle errors returned by readUsersFromFile
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Return the users data with a 200 status code
            res.status(200).json(users);
        }
    });
};

// Function to update a user by ID
const updateUserById = (req, res) => {
    // Extract user ID from the request parameters
    const userId = parseInt(req.params.id);
    // Extract updated user data from the request body
    const updatedUserData = req.body;

    // Call readUsersFromFile to get the current users data
    readUsersFromFile((err, users) => {
        if (err) {
            // Handle errors returned by readUsersFromFile
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Find the index of the user with the specified ID
            const userIndex = users.findIndex((user) => user.id === userId);

            if (userIndex !== -1) {
                // Update the user data
                users[userIndex] = { ...users[userIndex], ...updatedUserData };

                // Write the updated users array back to the file
                fs.writeFile('./app.models/users.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
                    if (err) {
                        // Handle errors while writing to the file
                        console.error('Error writing to users.json:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        // Return the updated user data with a 200 status code
                        res.status(200).json(users[userIndex]);
                    }
                });
            } else {
                // Return a 404 status code if the user is not found
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
};

// Add more controller functions for other user-related operations (POST, DELETE, etc.) as needed

// Export the controller functions
module.exports = {
    getAllUsers,
    updateUserById,
    // Add other controller functions here
};
