// Get reference to the user table tbody
const userTable = document.getElementById("user-table");
const tbody = userTable.querySelector("tbody");

async function fetchUserData() {
    // Rest of your code
    try {
        // Send a GET request to retrieve user data from the server
        const response = await fetch('http://localhost:3030/users');

        // Check if the response status is OK
        if (!response.ok) {
        throw new Error('Failed to fetch data');
        }

        // Parse the response body as JSON
        const data = await response.json();


        data.forEach((user) => {
            // Use the fillRow function to create the rows
            const row = fillRow(user); 
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

}

fetchUserData();
