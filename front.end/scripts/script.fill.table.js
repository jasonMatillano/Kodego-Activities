const userTable = document.getElementById("user-table");
const tbody = userTable.querySelector("tbody");

async function fetchUserData() {
  try {
    const response = await fetch('http://localhost:3030/users');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    data.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.email}</td>
        <td><button id="delete-user-${user.id}" class="btn btn-danger">Delete</button></td>
      `;
      tbody.appendChild(row);

      // Add a click event listener to each "Delete" button
      const deleteButton = row.querySelector(`#delete-user-${user.id}`);
      deleteButton.addEventListener("click", async () => {
        const userId = user.id;

        // Make a DELETE request to remove the user with the specified ID
        try {
          const deleteResponse = await fetch(`http://localhost:3030/users/${userId}`, {
            method: 'DELETE',
          });

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
