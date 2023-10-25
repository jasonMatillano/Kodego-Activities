// Import the 'app' module which represents your Express.js application.
const app = require(`./app.js`);

// Define the port where the server will listen for incoming requests.
const port = 3030;

// Start the Express.js server, listening on the specified port.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
