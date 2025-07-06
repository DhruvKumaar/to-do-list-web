let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text) {
    tasks.push({
      text,
      completed: false,
      timestamp: new Date().toLocaleString()
    });
    input.value = "";
    saveTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks();
  }
}

function setFilter(newFilter) {
  filter = newFilter;
  document.querySelectorAll(".filter-section button").forEach(btn => {
    btn.classList.remove("active");
  });
  document.querySelector(`.filter-section button:nth-child(${{
    all: 1,
    completed: 2,
    pending: 3
  }[filter]})`).classList.add("active");
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (filter === "completed" && !task.completed) ||
      (filter === "pending" && task.completed)
    ) return;

    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleTask(index);

    const span = document.createElement("span");
    span.className = "task-text" + (task.completed ? " completed" : "");
    span.innerText = `${task.text}\n${task.timestamp}`;

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => editTask(index);

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "🗑️";
    delBtn.onclick = () => deleteTask(index);

    buttons.appendChild(editBtn);
    buttons.appendChild(delBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(buttons);

    list.appendChild(li);
  });
}

setFilter("all");
