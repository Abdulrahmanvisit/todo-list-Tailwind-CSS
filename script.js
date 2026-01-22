document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTasks(task));

  addTaskBtn.addEventListener("click", () => {
    const newInput = todoInput.value.trim();
    if (newInput === "") return;

    const newTask = {
      id: Date.now(),
      text: newInput,
      completed: false,
    };

    tasks.push(newTask);
    renderTasks(newTask);
    saveTasks();

    todoInput.value = "";
  });

  function renderTasks(task) {
    const li = document.createElement("li");
    li.className =
      "bg-[#2a2a2a] p-2 mb-2 rounded-md flex justify-between items-center";
    if (task.completed) li.classList.add("completed");
    li.setAttribute("data-id", task.id);

    li.innerHTML = `
      <span>${task.text}</span>
      <button class="bg-[#d32f2f] px-3 py-1 rounded-md text-white hover:bg-[#b71c1c] transition-colors">
        Delete
      </button>
    `;

    // Toggle completion
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    // Delete task
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
