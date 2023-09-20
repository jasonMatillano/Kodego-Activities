// Function to display the registration form
function showRegistrationForm() {
    const container = document.getElementById("container");
    container.innerHTML = `
        <h2>Registration</h2>
        <form id="registrationForm">
            <label for="newUsername">Username:</label>
            <input type="text" id="newUsername" required><br>
            <label for="newPassword">Password:</label>
            <input type="password" id="newPassword" required><br>
            <button type="submit">Register</button>
        </form>
    `;

    const registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newUsername = document.getElementById("newUsername").value;
        const newPassword = document.getElementById("newPassword").value;

        // You can add your registration logic here.
        // For demonstration, we'll just display the entered values.
        alert(`Registration Successful!\nNew Username: ${newUsername}\nNew Password: ${newPassword}`);
    });
}

// Initially, show the registration form
showRegistrationForm();