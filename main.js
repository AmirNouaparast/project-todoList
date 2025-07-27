const addBtn = document.querySelector(".input-todo button");
const inputBox = document.querySelector(".input-todo input");
const todoList = document.querySelector(".todo-list ul");
const deleteAllBtn = document.querySelector(".info-box button");

inputBox.addEventListener("keyup", () => {
  if (inputBox.value.trim() !== "") {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
});


const showTasks = () => {
    let getLocalStorageData = localStorage.getItem("todo");
    let listArray = [];

    if (getLocalStorageData !== null) {
       listArray = JSON.parse(getLocalStorageData);
    }
    
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = `${listArray.length} تسک مانده`;
    
    if (listArray.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }
    
    let newTag = "";
    listArray.forEach((element, index) => {
        newTag += `<li>${element}<span class="icon"><i class="fas fa-trash-alt" onclick="deleteTask(${index})"></i></span></li>`;
    });
    
    todoList.innerHTML = newTag;
};
showTasks();



addBtn.addEventListener("click", () => {
    const value = inputBox.value.trim();
    if (value === "") return;

  const getLocalStorageData = JSON.parse(localStorage.getItem("todo")) || [];

  getLocalStorageData.push(inputBox.value.trim());
  localStorage.setItem("todo", JSON.stringify(getLocalStorageData));

  showTasks();
    addBtn.classList.remove("active");
    inputBox.value = "";

});



const deleteTask = (index) => {
  const todos = JSON.parse(localStorage.getItem("todo")) || [];
  todos.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todos));
  showTasks();
}



deleteAllBtn.addEventListener("click", function () {
  localStorage.removeItem("todo");
  showTasks();
});
