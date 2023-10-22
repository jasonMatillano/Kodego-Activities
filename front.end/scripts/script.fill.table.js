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
      deleteButton.addEventListener("click", () => {
        // Find the parent row
        const parentRow = deleteButton.closest("tr");
        const deletedUserId = parentRow.querySelector("td").textContent; // Get the ID of the deleted user
        console.log("Deleted User ID:", deletedUserId); // Log the deleted user's ID to the console
        parentRow.remove(); // Remove the row
      });
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Call the function to fetch and fill the table
fetchUserData();
