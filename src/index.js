document.addEventListener("DOMContentLoaded", () => {
  // Grab Form, prevent default
  const form = document.querySelector("#create-task-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskDescription = e.target.querySelector("#new-task-description").value;
    const taskValue = e.target.querySelector("#new-task-priority").value;
    const taskPriority = e.target.querySelector("#new-task-due").value;

    if (taskDescription) {
      createTask(taskDescription, taskValue, taskPriority);
    } else {
      alert("You can't leave that blank!");
    }
    form.reset();
  })

});

function createTask(task, priority, due) {
  const taskContainer = document.getElementById("tasks");
  // Create LI Element
  const li = document.createElement("li");
  li.className = priority;
  li.textContent = due ? due + ' - ' : '';
  const span = document.createElement("span");
  span.textContent = task;
  li.appendChild(span);

  const btn = document.createElement("button");
  btn.textContent = 'X';
  btn.className = 'btn-delete';
  btn.addEventListener("click", () => {
    btn.parentNode.remove();
  })
  li.appendChild(btn);

  const edit = document.createElement("button");
  edit.textContent = "EDIT";
  edit.className = 'btn-edit';
  edit.addEventListener("click", (e) => {
    const editValue = prompt("Update the description:", task);
    edit.parentNode.querySelector("span").textContent = editValue;
  })
  li.appendChild(edit);

  console.log(li);
  taskContainer.appendChild(li);
}

function sort(direction) {
  const itemsLow = document.querySelectorAll("#tasks li.low");
  const itemsMed = document.querySelectorAll("#tasks li.medium");
  const itemsHigh = document.querySelectorAll("#tasks li.high");
  let items = [];
  if (direction === "low") {
    items = [...itemsLow, ...itemsMed, ...itemsHigh];
  } else if (direction === "high") {
    items = [...itemsHigh, ...itemsMed, ...itemsLow];
  }
  if (items.length > 0) {
    const taskContainer = document.getElementById("tasks");
    taskContainer.textContent = '';
    for (const item of items) {
      taskContainer.appendChild(item);
      console.log("Appended.");
    }
  } else {
    alert("Nothing to sort, sorry.");
  }
}