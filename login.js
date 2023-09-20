var divElement = document.createElement('div');
var buttonElement = document.createElement('button');

divElement.id = 'tester-id';
buttonElement.id = 'div-id';
buttonElement.className = 'div-class';

divElement.appendChild(buttonElement); 
// gawa na yung unang container at yung button sa loob

var parElement = document.createElement('p'); parElement.innerText = 'Im a paragraph';

buttonElement.appendChild(parElement);
// gawa na dito yung main objective;

function showLoginForm() {
    const container = document.getElementById("container");
    container.innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
            <label for="username">Username:</label>
            <input type="text" id="username" required><br>
            <label for="password">Password:</label>
            <input type="password" id="password" required><br>
            <button type="submit">Login</button>
        </form>
    `;

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        alert(`Login Successful!\nUsername: ${username}\nPassword: ${password}`);
    });
}

function showRegistrationForm() {
    const container = document.getElementById("container2");
    container.innerHTML = `
        <h2>Registration</h2>
        <form id="registrationForm">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" required><br>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" required><br>
            <label for="birthdate">Birthdate:</label>
            <input type="date" id="birthdate" required><br>
            <label for="newUsername">Username:</label>
            <input type="text" id="newUsername" required><br>
            <label for="email">Email:</label>
            <input type="email" id="email" required><br>
            <label for="newPassword">Password:</label>
            <input type="password" id="newPassword" required><br>
            <button type="submit">Register</button>
        </form>
    `;

    const registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const birthdate = document.getElementById("birthdate").value;
        const newUsername = document.getElementById("newUsername").value;
        const email = document.getElementById("email").value;
        const newPassword = document.getElementById("newPassword").value;

        alert(`Registration Successful!\n
               First Name: ${firstName}\n
               Last Name: ${lastName}\n
               Birthdate: ${birthdate}\n
               Username: ${newUsername}\n
               Email: ${email}\n
               Password: ${newPassword}`);
    });
}

// Initially, show the forms
showRegistrationForm();
showLoginForm();
