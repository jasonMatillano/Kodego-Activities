const fs = require('fs');

// Sample registration data (in-memory database)
const registeredUsers = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    // Add more registered users here
];

// Create an object to hold the registeredUsers array
const data = { users: registeredUsers };

// Convert the data object to JSON format
const jsonData = JSON.stringify(data, null, 4); // The 'null, 4' is for pretty-printing with an indentation of 4 spaces

// Write the JSON data to a file named 'data.json'
fs.writeFile('data.json', jsonData, 'utf8', (err) => {
    if (err) {
        console.error('Error writing data to data.json:', err);
    } else {
        console.log('Data has been written to data.json');
    }
});
