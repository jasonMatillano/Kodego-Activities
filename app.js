const express = require('express'); // Require the Express.js framework
const fs = require('fs'); // Require the file sytem 'fs' module
const cors = require('cors'); // Require the 'cors' middleware



const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in request bodies
app.use(express.json());

// Function to read users from the JSON file
function readusersFromFile() {
    try {
        const data = fs.readFileSync('./models/users.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users.json:', error);
        return [];
    }
}

let users = readusersFromFile();

// Import controllers for CRUD operations
const getUsersController = require('./controllers/user.controller');

// GET all users
app.get('/users', (req, res) => {
    // Read users from the JSON file
    users = readusersFromFile();

    // Return the users as a JSON response
    res.json(users);
});

// GET a specific user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);

    // Read users from the JSON file
    users = readusersFromFile();

    // Find the user with the specified ID
    const user = users.find((p) => p.id === userId);

    if (user) {
        // If the user is found, return it as a JSON response
        res.json(user);
    } else {
        // If the user is not found, return a 404 error response
        res.status(404).json({ error: 'user not found' });
    }
});

// POST - Create a new user
app.post('/users', (req, res) => {
  const newuser = req.body;

  // Read users from the JSON file
  users = readusersFromFile();

  // Calculate the next available user ID
  const nextuserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  newuser.id = nextuserId;

  // Add the new user to the users array
  users.push(newuser);

  // Save the updated users array to users.json
  fs.writeFile('./models/users.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
        if (err) {
        console.error('Error writing to users.json:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        // Return the created user with a 201 status code
        res.status(201).json(newuser);
        }
    });
});


// PUT - Update an existing user by ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const updateduser = req.body;
  
    // Read users from the JSON file
    users = readusersFromFile();
  
    // Find the user with the specified ID
    const existinguserIndex = users.findIndex((p) => p.id === userId);
  
    if (existinguserIndex !== -1) {
      // Update the user details in the users array
      users[existinguserIndex] = { id: userId, ...updateduser };
  
      // Save the updated users array to users.json
      fs.writeFile('./models/users.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to users.json:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Return the updated user with a 200 status code
          res.status(200).json({ id: userId, ...updateduser });
        }
      });
    } else {
      // If the user is not found, return a 404 error response
      res.status(404).json({ error: 'user not found' });
    }
});


// DELETE - Remove an existing user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
  
    // Read users from the JSON file
    users = readusersFromFile();
  
    // Find the user with the specified ID
    const deleteduserIndex = users.findIndex((p) => p.id === userId);
  
    if (deleteduserIndex !== -1) {
      // Remove the user from the users array
      const deleteduser = users.splice(deleteduserIndex, 1)[0];
  
      // Save the updated users array to users.json
      fs.writeFile('./models/users.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to users.json:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Return the deleted user with a 200 status code
          res.status(200).json(deleteduser);
        }
      });
    } else {
      // If the user is not found, return a 404 error response
      res.status(404).json({ error: 'user not found' });
    }
});




// Export the app instance to make it available for use in other parts of the application
module.exports = app;