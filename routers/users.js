const express = require('express');
const router = express.Router();

// // Route for displaying a user list when accessing '/'
// router.get('/', (req, res) => {
//     // This route handles the root URL ('/') and sends a response of "User List".
//     res.send("User List");
// });

// // Route for displaying a new user form when accessing '/new'
// router.get('/new', (req, res) => {
//     // This route handles the '/new' URL and sends a response of "User New Form".
//     res.send("User New Form");
// });

// // Route for creating a new user when submitting a POST request to '/'
// router.post('/', (req, res) => {
//     // This route handles the '/' URL for a POST request and sends a response of "Create User".
//     res.send("Create User");
// });

// // Route for retrieving user details when accessing '/:id' (e.g., '/1', '/2', etc.)
// router.get('/:id', (req, res) => {
//     // This route handles dynamic URLs like '/1', '/2', etc., and sends a response with user details.
//     const userId = req.params.id;
//     res.send("Get User with ID: " + userId);
// });

// // Route for updating a user when sending a PUT request to '/:id'
// router.put('/:id', (req, res) => {
//     // This route handles updating a user with a specific ID via a PUT request.
//     const userId = req.params.id;
//     res.send("Update User with ID: " + userId);
// });

// // Route for deleting a user when sending a DELETE request to '/:id'
// router.delete('/:id', (req, res) => {
//     // This route handles deleting a user with a specific ID via a DELETE request.
//     const userId = req.params.id;
//     res.send("Delete User with ID: " + userId);
// });


// Define routes for updating and deleting a user with a specific ID
router
    .route('/:id') // Specify the dynamic parameter 'id'
    .get((req, res) => {
        // This route handles retrieving user details based on the specific 'id'.
        const userId = req.params.id;
        res.send("Get User with ID: " + userId);
    })
    .put((req, res) => {
        // This route handles updating a user with a specific 'id' via a PUT request.
        const userId = req.params.id;
        res.send("Update User with ID: " + userId);
    })
    .delete((req, res) => {
        // This route handles deleting a user with a specific 'id' via a DELETE request.
        const userId = req.params.id;
        res.send("Delete User with ID: " + userId);
    });

module.exports = router;