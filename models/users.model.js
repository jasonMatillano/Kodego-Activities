const fs = require('fs');
const errorHandler = require('../errorHandler');

class UserModel {
  constructor() {
    // Constructor initializes the UserModel instance with the path to the user data file.
    this.filePath = 'userData.json';
  }

  // Method to get all users.
  getAllUsers(callback) {
    fs.readFile(this.filePath, 'utf8', (error, data) => {
      // Check for errors during file reading.
      if (error) {
        // If there's an error, pass it to the callback with a null result.
        return callback(error, null);
      }

      // If reading the file is successful, parse the data and pass the 'users' property to the callback.
      const users = JSON.parse(data).users;
      callback(null, users);
    });
  }

  // Method to register a new user.
  register(user, callback) {
    fs.readFile(this.filePath, 'utf8', (error, data) => {
      // Check for errors during file reading.
      if (error) {
        // If there's an error, pass it to the callback with a null result.
        callback(error, null);
      }

      // Parse the existing data to extract the 'users' property.
      const users = JSON.parse(data).users;

      // Check if the provided user already exists based on username or email.
      const userExists = users.some(existingUser =>
        existingUser.userName === user.userName || existingUser.email === user.email
      );

      if (userExists) {
        // If the user already exists, send an error message to the callback.
        callback('Username or email already exists', null);
      } else {
        // If the user doesn't exist, add the new user to the 'users' array and write the updated data back to the file.
        users.push(user);
        fs.writeFile(this.filePath, JSON.stringify({ users }), 'utf8', (writeError) => {
          // Check for errors during file writing.
          if (writeError) {
            // If there's an error, pass it to the callback with a null result.
            return callback(writeError, null);
          }
          // If registration is successful, send a success message to the callback.
          callback(null, 'User registered successfully');
        });
      }
    });
  }
}

module.exports = UserModel;
