// Get a reference to the user table and its tbody
const userTable = document.getElementById("user-table");
const tbody = userTable.querySelector("tbody");

// Define an asynchronous function to fetch user data and populate the table
async function fetchUserData() {
  try {
    // Send a GET request to retrieve user data from the server
    const response = await fetch('http://localhost:3030/users');

    // Check if the response status is OK
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    // Parse the response body as JSON
    const data = await response.json();

    // Iterate through each user data and create a table row for them
    data.forEach((user) => {
      // Create a new row element
      const row = document.createElement("tr");
      // Populate the row's HTML with user data
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.email}</td>
        <td>
          <button id="delete-user-${user.id}" class="btn btn-danger">Delete</button>
          <button id="toggle-form-button" class="btn btn-secondary">Update</button>
        </td>
      `;

      // Append the row to the table body
      tbody.appendChild(row);

      // Add a click event listener to the "Delete" button
      const deleteButton = row.querySelector(`#delete-user-${user.id}`);
      deleteButton.addEventListener("click", async () => {
        const userId = user.id;

        // Make a DELETE request to remove the user with the specified ID
        try {
          const deleteResponse = await fetch(`http://localhost:3030/users/${userId}`, {
            method: 'DELETE',
          });

          // Check if the DELETE request was successful
          if (deleteResponse.ok) {
            console.log(`User with ID ${userId} has been deleted.`);
            // Remove the row from the table
            row.remove();
          } else {
            console.error(`Failed to delete user with ID ${userId}.`);
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Call the function to fetch and fill the table
fetchUserData();
