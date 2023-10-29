const app = require(`../app.js`); // Import the 'app' module which represents your Express.js application.
const fs = require('fs'); // Require the file sytem 'fs' module

// Define the path to the users.json file
const usersFilePath = `./app_models/users.json`;

// READ all users using router.get('/readusers', userControllers.read);
read = (req, res) => {
    try {
        // Read users from the JSON file
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err) {
                // Handle any error that occurs while reading the file
                console.error('Error reading users data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            
            // Parse the JSON data to get an array of user objects
            const users = JSON.parse(data);
            
            // Send the user data as a JSON response with a 200 status code
            res.status(200).json(users);
        });
    } catch (error) {
        // Handle any other error that might occur
        console.error('Error reading users data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// READ user by ID using router.get('/readusers/:id', userControllers.readById);
readById = (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10); // Get the user ID from the request parameters

        // Read users from the JSON file
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err) {
                // Handle any error that occurs while reading the file
                console.error('Error reading users data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            
            // Parse the JSON data to get an array of user objects
            const users = JSON.parse(data);
            
            // Find the user with the specified ID
            const user = users.find((user) => user.id === userId);

            if (user) {
                // Send the user data as a JSON response with a 200 status code
                res.status(200).json(user);
            } else {
                // If the user is not found, return a 404 error response
                res.status(404).json({ error: 'User not found' });
            }
        });
    } catch (error) {
        // Handle any other error that might occur
        console.error('Error reading users data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Export the read and readById functions
module.exports = {
    read,
    readById
}
