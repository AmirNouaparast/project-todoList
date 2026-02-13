// ======= Select DOM elements =======
const inputBox = document.querySelector(".input-todo input");
const addBtn = document.querySelector(".input-todo button");
const todoList = document.querySelector(".todo-list ul");
const deleteAllBtn = document.querySelector(".info-box button");
const pendingTasksNumb = document.querySelector(".pendingTasks");

// ======= Show tasks from localStorage =======
const showTasks = () => {
  const listArray = JSON.parse(localStorage.getItem("todo")) || [];

  // Build list items
  todoList.innerHTML = listArray
    .map(
      (task, index) => `
        <li>
          ${task}
          <span class="icon">
            <i class="fas fa-trash-alt" onclick="deleteTask(${index})"></i>
          </span>
        </li>
      `,
    )
    .join("");

  // Update pending tasks count
  pendingTasksNumb.textContent = `${listArray.length} تسک مانده`;

  // Toggle delete all button
  deleteAllBtn.classList.toggle("active", listArray.length > 0);
};

// ======= Add new task =======
addBtn.addEventListener("click", () => {
  const value = inputBox.value.trim();
  if (!value) return;

  const todos = JSON.parse(localStorage.getItem("todo")) || [];
  todos.push(value);
  localStorage.setItem("todo", JSON.stringify(todos));

  inputBox.value = "";
  addBtn.classList.remove("active");
  showTasks();
});

// ======= Delete a single task =======
const deleteTask = (index) => {
  const todos = JSON.parse(localStorage.getItem("todo")) || [];
  todos.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todos));
  showTasks();
};

// ======= Delete all tasks =======
deleteAllBtn.addEventListener("click", () => {
  localStorage.removeItem("todo");
  showTasks();
});

// ======= Toggle add button on input =======
inputBox.addEventListener("keyup", () => {
  addBtn.classList.toggle("active", inputBox.value.trim() !== "");
});

// ======= Initial render =======
document.addEventListener("DOMContentLoaded", showTasks);
