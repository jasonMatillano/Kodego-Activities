// Define a function to create an HTML row for a user
function fillRow(user) {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.password}</td>
      <td>${user.email}</td>
      <td>
          <button id="delete-user-${user.id}" class="btn btn-danger">Delete</button>
          <button id="update-user-${user.id}" class="btn btn-secondary">Update</button>
      </td>
  `;

  // Add a click event listener to the "Delete" button
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

  return row;
}