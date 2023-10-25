// Import the 'app' module which represents your Express.js application.
const app = require(`../app.js`);
const fs = require('fs'); // Require the file sytem 'fs' module
const cors = require('cors'); // Require the 'cors' middleware


// Define the path to the users.json file
const usersFilePath = `./models/users.json`;

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

// Export the 'read' function to be used as a controller for the '/readusers' route
module.exports = {
    read
}
