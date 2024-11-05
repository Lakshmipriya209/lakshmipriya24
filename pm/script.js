document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addTaskButton").addEventListener("click", addTask);
});

function addTask() {
    const taskNameInput = document.getElementById("newTaskName");
    const taskName = taskNameInput.value.trim();

    // Check if task name is provided
    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    // Select the task list container
    const taskList = document.querySelector(".task-list");
    if (!taskList) {
        console.error("Task list element not found");
        return;
    }

    // Create a new task item
    const newTaskItem = document.createElement("div");
    newTaskItem.classList.add("task-item");
    newTaskItem.innerHTML = `
        <div>${taskName}</div>
        <div>New Member</div>
        <div>2023-12-01</div>
        <div>
            <select>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
            </select>
        </div>
    `;

    // Append the new task item to the task list
    taskList.appendChild(newTaskItem);

    // Clear the input field
    taskNameInput.value = "";
}
