// ======= Select DOM elements =======
const inputBox = document.querySelector(".input-todo input");
const addBtn = document.querySelector(".input-todo button");
const todoList = document.querySelector(".todo-list ul");
const deleteAllBtn = document.querySelector(".info-box button");
const pendingTasksNumb = document.querySelector(".pendingTasks");

// ======= Helpers =======
const getTodos = () => JSON.parse(localStorage.getItem("todo")) || [];
const setTodos = (todos) => localStorage.setItem("todo", JSON.stringify(todos));

// ======= Render Tasks =======
const renderTasks = () => {
  const todos = getTodos();

  todoList.innerHTML = "";

  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const span = document.createElement("span");
    span.classList.add("icon");

    const i = document.createElement("i");
    i.className = "fas fa-trash-alt";
    i.dataset.index = index;

    span.appendChild(i);
    li.appendChild(span);
    todoList.appendChild(li);
  });

  pendingTasksNumb.textContent = `${todos.length} تسک مانده`;
  deleteAllBtn.classList.toggle("active", todos.length > 0);
};

// ======= Add Task =======
addBtn.addEventListener("click", () => {
  const value = inputBox.value.trim();
  if (!value) return;

  const todos = getTodos();
  todos.push(value);
  setTodos(todos);

  inputBox.value = "";
  addBtn.classList.remove("active");
  renderTasks();
});

// ======= Event Delegation =======
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-alt")) {
    const index = e.target.dataset.index;
    const todos = getTodos();
    todos.splice(index, 1);
    setTodos(todos);
    renderTasks();
  }
});

// ======= Delete All =======
deleteAllBtn.addEventListener("click", () => {
  localStorage.removeItem("todo");
  renderTasks();
});

// ======= Toggle Button =======
inputBox.addEventListener("keyup", () => {
  addBtn.classList.toggle("active", inputBox.value.trim() !== "");
});

// ======= Initial Render =======
document.addEventListener("DOMContentLoaded", renderTasks);
