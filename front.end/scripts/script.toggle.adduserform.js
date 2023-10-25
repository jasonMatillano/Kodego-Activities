    // Add an event listener to the "Add User" button
    const toggleUserButton = document.getElementById("toggle-add-user");
    const addUserForm = document.getElementById("add-user-form");

    toggleUserButton.addEventListener("click", function () {
        // Toggle the visibility of the add user form
        if (addUserForm.style.display === "block" || addUserForm.style.display === "") {
            addUserForm.style.display = "none"; // Hide the form
        } else {
            addUserForm.style.display = "block"; // Show the form
        }
    });