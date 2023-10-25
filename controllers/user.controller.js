// Import the 'app' module which represents your Express.js application.
const app = require(`../app.js`);
const fs = require('fs'); // Import the 'fs' module

// Define the path to the users.json file
const usersFilePath = `${__dirname}/users.json`;

// READ all users using router.get('/readusers', userControllers.read);
read = (req, res) => {
    try {
        // Read users from the JSON file
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading users data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            
            // Parse the JSON data to get an array of user objects
            const users = JSON.parse(data);
            
            // Send the user data as a JSON response
            res.status(200).json(users);
        });
    } catch (error) {
        console.error('Error reading users data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    read
}
