const UserModel = require('../models/users.model');
const errorHandler = require('../errorHandler');

class UserController {
  constructor(filePath) {
    // Constructor initializes a UserController instance with the provided file path.
    this.userModel = new UserModel(filePath);
  }

  // Method to get all users and send a response with the user data.
  getAllUsers(response) {
    this.userModel.getAllUsers((error, users) => {
      if (error) {
        // If there's an error, call the error handler and return a 500 Internal Server Error response.
        errorHandler(response, error, 'Internal Server Error', 500);
        return; // Exit the function
      } else {
        // If successful, send a 200 OK response with the user data.
        response.writeHead(200, { 'Content-type': 'application/json' });
        response.end(JSON.stringify(users));
      }
    });
  }

  // Method to handle user registration.
  register(request, response) {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      try {
        // Attempt to parse the request body as JSON.
        const payload = JSON.parse(body);
        const { firstName, lastName, userName, email, password } = payload;

        if (!firstName || !lastName || !userName || !email || !password) {
          // If required fields are missing, call the error handler and return a 400 Bad Request response.
          errorHandler(response, 'Some fields are missing', 'All fields are required', 400);
          return;
        } else {
          // If the payload is valid, call the UserModel's register method to add the new user.
          this.userModel.register({ firstName, lastName, userName, email, password }, (error, message) => {
            if (error) {
              // If there's an error during registration, call the error handler and return a 400 Bad Request response.
              errorHandler(response, error, 'Invalid format', 400);
              return;
            } else {
              // If registration is successful, send a 200 OK response with a success message.
              response.writeHead(200, { 'Content-type': 'application/json' });
              response.end(JSON.stringify({ status: true, message: message }));
            }
          });
        }
      } catch (error) {
        // Catch any JSON parsing errors and call the error handler to handle the invalid format.
        errorHandler(response, error, 'Invalid format', 400);
      }
    });
  }
}

module.exports = UserController;
