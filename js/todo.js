const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const stats = document.getElementById('todo_stats');
const resetBtn = document.getElementById('reset-todo');

const audioDone = new Audio("assets/sounds/done.mp3");
let bunnyName = localStorage.getItem("bunnyName") || "Rabbit";

let tasks = JSON.parse(localStorage.getItem('zenTodo')) || [];

function renderTasks() {
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.classList.toggle('done', task.done);

    li.addEventListener('click', () => {
      task.done = !task.done;
      saveTasks();

      if (task.done) {
        audioDone.play();
        bunnyTalk("Keep it up !");
      }
    });

    li.addEventListener('dblclick', () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    todoList.appendChild(li);
  });

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  stats.textContent = `Task counts : ${done}/${total}`;
}

function saveTasks() {
  const today = new Date().toISOString().split("T")[0]; 
  const history = JSON.parse(localStorage.getItem("todoHistory")) || {};
  history[today] = tasks;
  localStorage.setItem("todoHistory", JSON.stringify(history));

  localStorage.setItem('zenTodo', JSON.stringify(tasks));
  renderTasks();
}

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const text = todoInput.value.trim();
    if (text) {
      tasks.push({ text, done: false });
      todoInput.value = '';
      saveTasks();
    }
  }
});

resetBtn.addEventListener("click", () => {
  if (confirm("Do you really want to reset all tasks?")) {
    tasks = [];
    saveTasks();
  }
});

function bunnyTalk(message) {
  const dialog = document.getElementById("bunny-dialog");
  dialog.textContent = `${bunnyName} : ${message}`;
  dialog.style.display = "block";
  gsap.fromTo(dialog, { opacity: 0 }, { opacity: 1, duration: 0.3 });

  setTimeout(() => {
    gsap.to(dialog, { opacity: 0, duration: 0.5, onComplete: () => (dialog.style.display = "none") });
  }, 2500);
}

renderTasks();
