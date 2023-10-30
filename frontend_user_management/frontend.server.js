const express = require('express'); // Import the Express framework
const app = express(); // Create an Express application instance

const port = 5000;

// Serve static files, including index.html
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`); // Start the server and listen on the specified port
});

module.exports = app; // Export the server instance for potential reuse in other parts of your application
