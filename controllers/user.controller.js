// Import the 'app' module which represents your Express.js application.
const app = require(`../app.js`);

// // GET all users
// app.get('/users', (req, res) => {
//     // Read users from the JSON file
//     users = readusersFromFile();
  
//     // Return the users as a JSON response
//     res.json(users);
// });
  
// // GET a specific user by ID
// app.get('/users/:id', (req, res) => {
//     const userId = parseInt(req.params.id, 10);
  
//     // Read users from the JSON file
//     users = readusersFromFile();
  
//     // Find the user with the specified ID
//     const user = users.find((p) => p.id === userId);
  
//     if (user) {
//       // If the user is found, return it as a JSON response
//       res.json(user);
//     } else {
//       // If the user is not found, return a 404 error response
//       res.status(404).json({ error: 'user not found' });
//     }
// });

