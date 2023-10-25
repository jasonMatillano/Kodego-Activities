// Get references to the search input and button
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Get reference to the user table tbody
const userTableBody = document.querySelector("#user-table tbody");

// Add a click event listener to the "Search" button
searchButton.addEventListener("click", () => {
    const searchId = searchInput.value.toLowerCase(); // Get the search text and convert to lowercase for case-insensitive search

    // Send a GET request to retrieve user data based on the search text
    fetch(`http://localhost:3030/users/${searchId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then((user) => {
            // Clear the existing table rows
            userTableBody.innerHTML = '';

            // Use the fillRow function from scripts/script.fill.table.row.js to create the rows
            const row = fillRow(user); 
            userTableBody.appendChild(row);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
});

