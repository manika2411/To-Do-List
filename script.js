// Get elements from the DOM
const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const errorMessage = document.getElementById('errorMessage');

// Load tasks from local storage when page loads
window.addEventListener('load', loadTasksFromStorage);

// Add event listener to the Add Task button
addTaskButton.addEventListener('click', addTask);

// Function to handle adding a task to the list
function addTask() {
  const taskText = taskInput.value.trim();

  // Check if input is empty
  if (!taskText) {
    errorMessage.textContent = 'Please enter a task!';
    return;
  }

  errorMessage.textContent = '';
  const taskItem = createTaskElement(taskText);
  taskList.prepend(taskItem);
  saveTasksToStorage();
  taskInput.value = '';
}

// Function to create a task item element
function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  li.className = 'task-item' + (completed ? ' completed' : '');

  // Create checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
    saveTasksToStorage();
  });

  // Create task text element
  const span = document.createElement('span');
  span.textContent = text;

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    saveTasksToStorage();
  });

  // Append elements to task item
  li.append(checkbox, span, deleteBtn);
  return li;
}

// Function to save all tasks to local storage
function saveTasksToStorage() {
  const tasks = [];
  document.querySelectorAll('#taskList .task-item').forEach((item) => {
    const text = item.querySelector('span').textContent;
    const completed = item.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage on page load
function loadTasksFromStorage() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    JSON.parse(saved).forEach(task => {
      const taskItem = createTaskElement(task.text, task.completed);
      taskList.appendChild(taskItem);
    });
  }
}
