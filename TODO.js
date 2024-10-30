// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to add task to the list
function addTask() {
  const input = document.getElementById("todo-input");
  const taskText = input.value.trim();

  if (taskText) {
    const task = {
      text: taskText,
      completed: false,
    };
    
    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    
    input.value = '';
  }
}

// Function to add a task to the DOM
function addTaskToDOM(task) {
  const taskEl = document.createElement("li");
  taskEl.classList.add("todo-item");
  if (task.completed) taskEl.classList.add("completed");

  taskEl.innerHTML = `
    <span class="task">${task.text}</span>
    <button class="complete-btn" onclick="toggleComplete(this)">✓</button>
    <button class="delete-btn" onclick="deleteTask(this)">✕</button>
  `;

  document.getElementById("todo-list").appendChild(taskEl);
}

// Function to toggle task completion
function toggleComplete(button) {
  const taskEl = button.parentElement;
  taskEl.classList.toggle("completed");

  updateLocalStorage();
}

// Function to delete a task
function deleteTask(button) {
  const taskEl = button.parentElement;
  taskEl.remove();

  updateLocalStorage();
}

// Function to save a task to local storage
function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToDOM);
}

// Function to update local storage after completion or deletion
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll(".todo-item").forEach(taskEl => {
    tasks.push({
      text: taskEl.querySelector(".task").textContent,
      completed: taskEl.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}