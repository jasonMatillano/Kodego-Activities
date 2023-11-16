// Define a function to create an HTML row for a user
function fillRow(user) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.password}</td>
        <td>${user.email}</td>
        <td>
            <button id="delete-user-${user.id}" class="btn btn-danger">Delete</button>
            <button id="update-user-${user.id}" class="btn btn-secondary">Update</button>
        </td>
    `;
  
    // Add a click event listener to the "Delete" button for the user row
    const deleteButton = row.querySelector(`#delete-user-${user.id}`);
    deleteButton.addEventListener("click", async () => {
        const userId = user.id;

        // Attempt to delete the user by sending a DELETE request to the server.
        try {
            // Send a DELETE request to the server to remove the user with the specified ID.
            const deleteResponse = await fetch(`http://localhost:3030/users/${userId}`, {
                method: 'DELETE',
            });

            // Check if the DELETE request was successful (HTTP status code 200).
            if (deleteResponse.ok) {
                // Log a success message to the console.
                console.log(`User with ID ${userId} has been successfully deleted.`);
                // Remove the corresponding row from the table.
                row.remove();
            } else {
                // Log an error message if the DELETE request was not successful.
                console.error(`Failed to delete user with ID ${userId}.`);
            }
        } catch (error) {
            // Handle any unexpected errors that may occur during the DELETE request.
            console.error('Error deleting user:', error);
        }
    });

  
    // Add a click event listener to the "Update" button
    const updateButton = row.querySelector(`#update-user-${user.id}`);
    updateButton.addEventListener("click", () => {
        // Populate the modal input fields with user data
        const modal = document.getElementById("updateUserModal");
        const userId = modal.querySelector("#update-id");
        const firstnameInput = modal.querySelector("#update-firstname");
        const lastnameInput = modal.querySelector("#update-lastname");
        const passwordInput = modal.querySelector("#update-password");
        const emailInput = modal.querySelector("#update-email");

        // Set the input field values with the user's data
        userId.value = user.id;
        firstnameInput.value = user.firstName;
        lastnameInput.value = user.lastName;
        passwordInput.value = user.password;
        emailInput.value = user.email;

        // Open the modal
        $('#updateUserModal').modal('show');
    });

    return row;
  }
  