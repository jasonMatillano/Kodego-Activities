// Get references to HTML elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Function to add a new task
function addTask() {
    // Get the task text from the input field
    const taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText !== "") {
        // Create a new list item
        const listItem = document.createElement("li");
        listItem.innerHTML = `
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

// Add functionality to add tasks on Enter key press
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
