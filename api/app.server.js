const app = require('./app.js'); // Import the Express application instance from app.js

const port = 3030;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`); // Start the server and listen on the specified port
});

module.exports = app; // Export the server instance for potential reuse in other parts of your application
