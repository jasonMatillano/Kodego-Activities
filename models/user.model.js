// // An array of user objects representing user data.
// const users = [
//     {
//       id: 1,
//       name: 'Kimbo',
//       username: 'kimbo123',
//       password: 'kimbosanz'
//     },
//     {
//       id: 2,
//       name: 'Kataleya',
//       username: 'kataleya123',
//       password: 'kataleyamaria'
//     },
//     {
//       id: 3,
//       name: 'Diana',
//       username: 'diana123',
//       password: 'diana'
//     }
//   ];
  
//   // Export the 'users' array so it can be used in other parts of your application.
//   module.exports = users;


//With data.json===========================================================================================================================

// Import Node.js built-in modules: 'fs' for filesystem operations and 'path' for handling file paths.
const fs = require('fs');
const path = require('path');

// Construct the full path to the 'data.json' file, which is located in the same directory as this script.
const dataPath = path.join(__dirname, 'data.json');

// Function to read and return all users from 'data.json'.
function getUsers() {
    // Read the file synchronously and store its content in the 'data' variable.
    const data = fs.readFileSync(dataPath, 'utf8');
    
    // Parse the JSON data and return the result.
    return JSON.parse(data);
}

// Function to add a new user to 'data.json'.
function addUser(user) {
    // Fetch the existing users.
    const users = getUsers();
    
    // Assign an ID to the new user, which is one more than the number of existing users.
    user.id = users.length + 1;
    
    // Add the new user to the users array.
    users.push(user);
    
    // Write the updated array back to 'data.json' with pretty-printed JSON format.
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf8');
    
    // Return the newly added user.
    return user;
}

// Function to retrieve a user by ID from 'data.json'.
function getUserById(userId) {
    // Fetch the existing users.
    const users = getUsers();
    
    // Use the 'find' method to search for a user with the specified ID.
    return users.find(user => user.id === userId);
}

// Export the functions for use in other modules.
module.exports = {
    getUsers,
    addUser,
    getUserById
};

  