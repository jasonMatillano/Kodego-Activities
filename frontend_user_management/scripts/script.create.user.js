// Add an event listener to the "Add User" button
const addUserButton = document.getElementById("add-user");
addUserButton.addEventListener("click", function () {
    // Retrieve the values from the input fields
    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");
    const emailInput = document.getElementById("email-input");

    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;

    // Create an object with the input values
    const userObject = {
        username: username,
        password: password,
        email: email
    };

    // Log the user object to the console
    console.log("User Object:", userObject);

    // Clear the input fields
    usernameInput.value = "";
    passwordInput.value = "";
    emailInput.value = "";

    // Send a POST request to add the user
    fetch('http://localhost:3030/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        return response.json();
    })
    .then(data => {
        // Handle the response if needed
        console.log('User added successfully:', data);
    })
    .catch(error => {
        console.error('Error adding user:', error);
    });
});


    // Add an event listener to the "Add User" button
    const toggleUserButton = document.getElementById("toggle-add-user");
    const addUserForm = document.getElementById("add-user-form");

    toggleUserButton.addEventListener("click", function () {
        // Toggle the visibility of the add user form
        if (addUserForm.style.display === "block" || addUserForm.style.display === "") {
            addUserForm.style.display = "none"; // Hide the form
        } else {
            addUserForm.style.display = "block"; // Show the form
        }
    });