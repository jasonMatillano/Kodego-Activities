// Add an event listener to the "Add User" button
const addUserButton = document.getElementById("add-user");
addUserButton.addEventListener("click", function () {
    // Retrieve the values from the input fields
    const idInput = document.getElementById("id-input");
    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");
    const emailInput = document.getElementById("email-input");

    const id = idInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;

    // Create an object with the input values
    const userObject = {
        id: id,
        username: username,
        password: password,
        email: email
    };

    // Log the user object to the console
    console.log("User Object:", userObject);

    // Clear the input fields
    idInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";
    emailInput.value = "";
});