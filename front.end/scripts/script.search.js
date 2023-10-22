// Get references to the search input and button
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Get reference to the user table tbody
const userTableBody = document.querySelector("#user-table tbody");

// Add a click event listener to the "Search" button
searchButton.addEventListener("click", () => {
    const searchText = searchInput.value.toLowerCase(); // Get the search text and convert to lowercase for case-insensitive search

    // Send a GET request to retrieve user data based on the search text
    fetch(`http://localhost:3030/users/${searchText}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then((userData) => {
            // Clear the existing table rows
            userTableBody.innerHTML = '';

            // Add the retrieved user data to the table
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${userData.id}</td>
                <td>${userData.username}</td>
                <td>${userData.password}</td>
                <td>${userData.email}</td>
                <td><button id="delete-user-${userData.id}" class="btn btn-danger">Delete</button></td>
            `;
            userTableBody.appendChild(row);

            // Add a click event listener to the "Delete" button
            const deleteButton = row.querySelector(`#delete-user-${userData.id}`);
            deleteButton.addEventListener("click", () => {
                // Trigger the DELETE request when the "Delete" button is clicked
                fetch(`http://localhost:3030/users/${userData.id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (response.ok) {
                            // Optionally, you can remove the row from the table if the deletion was successful
                            row.remove();
                        } else {
                            throw new Error('Failed to delete user');
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting user:', error);
                    });
            });
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
});

// Get references to input fields in the input-container
const inputFields = document.querySelectorAll(".input-container input[type='text']");

// Add a click event listener to the "Search" button
searchButton.addEventListener("click", () => {
    const searchText = searchInput.value.toLowerCase(); // Get the search text and convert to lowercase for case-insensitive search

    // Send a GET request to retrieve user data based on the search text
    fetch(`http://localhost:3030/users/${searchText}`)
        .then((response) => {
            if (!response.ok) {
                throw Error('Failed to fetch data');
            }
            return response.json();
        })
        .then((userData) => {
            // Fill the input fields with the retrieved user data
            inputFields.forEach((input) => {
                const fieldName = input.id.replace("-input", ""); // Extract the field name from the input ID
                input.value = userData[fieldName] || ''; // Set the input value from the retrieved data
            });
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
});
