const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a route for the root URL ('/')
app.get('/', (req, res) => {
    console.log('here');
    // Render the 'index.ejs' view and pass the { text: "<h2>Hello World2</h2>" } data
    res.render('index', { text: "<h2>Hello World2</h2>" });
});

// Import and use the user router defined in the './routers/users' module
const userRouter = require('./routers/users');

app.use('/users', userRouter);

// Start the Express application and make it listen on port 3000
app.listen(3000);
