// Get references to the "Update User" button and modal input fields
const saveUpdateButton = document.getElementById("save-update");
const updateIdInput = document.getElementById("update-id");
const updateUsernameInput = document.getElementById("update-username");
const updatePasswordInput = document.getElementById("update-password");
const updateEmailInput = document.getElementById("update-email");

// Add an event listener to the "Save changes" button
saveUpdateButton.addEventListener("click", function () {
    // Retrieve the values from the modal input fields
    const id = updateIdInput.value;
    const username = updateUsernameInput.value;
    const password = updatePasswordInput.value;
    const email = updateEmailInput.value;

    // Create an object with the updated user data
    const userObject = {
        username: username,
        password: password,
        email: email
    };

    // Log the user object to the console
    console.log("Updated User Object:", userObject);

    // Clear the modal input fields
    updateIdInput.value = "";
    updateUsernameInput.value = "";
    updatePasswordInput.value = "";
    updateEmailInput.value = "";

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
