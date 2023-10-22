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
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
});
