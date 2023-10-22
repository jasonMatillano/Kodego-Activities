// Get references to the "Update User" button and input fields
const updateUserButton = document.getElementById("update-user");
const idInput = document.getElementById("id-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const emailInput = document.getElementById("email-input");

// Add an event listener to the "Update User" button
updateUserButton.addEventListener("click", function () {
    // Retrieve the values from the input fields
    const id = idInput.value; // Assuming you want to update a user by ID
    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;

    // Create an object with the updated user data
    const userObject = {
        username: username,
        password: password,
        email: email
    };

    // Log the user object to the console
    console.log("Updated User Object:", userObject);

    // Clear the input fields
    idInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";
    emailInput.value = "";

    // Send a PUT request to update the user
    fetch(`http://localhost:3030/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        return response.json();
    })
    .then(data => {
        // Handle the response if needed
        console.log('User updated successfully:', data);
    })
    .catch(error => {
        console.error('Error updating user:', error);
    });
});
