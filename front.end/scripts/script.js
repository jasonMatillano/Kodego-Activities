// Get references to HTML elements
const idInput = document.getElementById("id-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const emailInput = document.getElementById("email-input");
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Function to add a new task
function addTask() {
    // Get the task text from the input field
    const idText = idInput.value.trim();
    const usernameText = usernameInput.value.trim();
    const passwordText = passwordInput.value.trim();
    const emailText = emailInput.value.trim();
    const taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText !== "") {
        // Create a new list item
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${idText}</span>
            <span>${usernameText}</span>
            <span>${passwordText}</span>
            <span>${emailText}</span>
            <span>${taskText}</span>
            <button class="delete-button">Delete</button>
        `;

        // Add a click event listener to the delete button
        const deleteButton = listItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            listItem.remove();
        });

        // Add the new task to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";
    }
}


// Add a click event listener to the "Add Task" button
addTaskButton.addEventListener("click", addTask);
