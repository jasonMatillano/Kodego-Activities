// Select elements
const userContainer = document.getElementById('user-container');
const tBody = document.querySelector('tbody');
const nameInput = document.getElementById('name-id');
const usernameInput = document.getElementById('username-id');
const passwordInput = document.getElementById('password-id');
const addUserButton = document.getElementById('add-user-button');

// Fetch user data from the server
function fetchUsers() {
  // Make a GET request to the server to fetch user data
  fetch('http://localhost:3000/users')
    .then(response => {
      // Check if the response is successful
      if (response.ok) {
        return response.json();
      } else {
        // Handle errors if the response is not successful
        throw new Error('Request failed: ' + response.status);
      }
    })
    .then(data => {
      // Populate the table with the retrieved user data
      populateTable(data);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Request failed', error.message);
    });
}

// Populate the table with user data
function populateTable(users) {
  // Clear the table body to avoid duplicating data
  tBody.innerHTML = '';
  users.forEach(user => {
    // Create table rows and fill them with user data
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.password}</td>
    `;
    tBody.appendChild(row);
  });
}

// Add a new user
function addUser() {
  // Retrieve user input values
  const name = nameInput.value;
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Check if any of the input fields are empty
  if (!name || !username || !password) {
    // Display an alert if any field is missing
    alert('All fields are required');
    return;
  }

  // Make a POST request to the server to add a new user
  fetch('http://localhost:3000/users/add-user', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, username, password }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        // Handle errors if the response is not successful
        throw new Error('Request failed: ' + response.status);
      }
    })
    .then(data => {
      if (data.status) {
        // If the addition is successful, fetch and refresh the user data
        fetchUsers();
        // Clear input fields
        nameInput.value = '';
        usernameInput.value = '';
        passwordInput.value = '';
      } else if (data.uNameDup) {
        // Handle a duplicate username error
        alert(data.message);
      } else {
        // Handle other errors
        alert(data.message);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Request failed', error.message);
    });
}

// Add a click event listener to the "Add User" button
addUserButton.addEventListener('click', addUser);

// Fetch initial user data when the page loads
fetchUsers();
