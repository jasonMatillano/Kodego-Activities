const express = require('express');
const router = express.Router();

// Route for displaying a user list when accessing '/'
router.get('/', (req, res) => {
    // This route handles the root URL ('/') and sends a response of "User List".
    res.send("User List");
});

// Route for displaying a new user form when accessing '/new'
router.get('/new', (req, res) => {
    // This route handles the '/new' URL and sends a response of "User New Form".
    res.send("User New Form");
});

router.post('/', (req, res) => {
    // This route handles the '/new' URL and sends a response of "User New Form".
    res.send("Create User");
});

router.get('/:id', (req, res) => { 
    // This route handles the '/:id' URL and sends a response of "User Details".
    req.params.id
    res.send("Get User with ID: " + req.params.id);
});

module.exports = router;
