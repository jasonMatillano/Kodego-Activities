User Management Server
======================

This is a Node.js Express.js server that handles user management operations using RESTful APIs. It stores user data in a JSON file and provides endpoints to perform CRUD operations on this data.

Key Components:
----------------

1. Middleware:
   - CORS middleware is used for enabling cross-origin requests.
   - JSON body parsing middleware is added for handling JSON data in request bodies.

2. Data Handling:
   - User data is stored in a JSON file named "users.json."
   - There is a function, `readusersFromFile`, that reads user data from this file.

3. Endpoints:
   - `GET /users`: Retrieves a list of all users.
   - `GET /users/:id`: Retrieves a specific user by their ID.
   - `POST /users`: Creates a new user and adds it to the JSON file.
   - `PUT /users/:id`: Updates an existing user by their ID.
   - `DELETE /users/:id`: Deletes an existing user by their ID.

4. CRUD Operations:
   - Each CRUD operation first reads user data from the JSON file, performs the required operation, and then writes the updated data back to the file.

5. Error Handling:
   - Error handling is implemented for various scenarios, including handling invalid requests, file read/write errors, and user not found errors.

Usage:
------

1. Make sure to have Node.js installed.

2. Install required packages by running: `npm install`

3. Create a JSON file named "users.json" to store user data.

4. Start the server by running: `node server.js` (assuming your server file is named "server.js").

5. The server will listen on http://localhost:3030/ by default.

API Endpoints:
--------------

- `GET /users`: Retrieve a list of all users.
- `GET /users/:id`: Retrieve a user by their ID.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update an existing user by their ID.
- `DELETE /users/:id`: Delete a user by their ID.

Sample JSON for creating a user:
```json
{
  "username": "john_doe",
  "password": "securepassword",
  "email": "john@example.com"
}
