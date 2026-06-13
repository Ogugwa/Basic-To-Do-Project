document.addEventListener("DOMContentLoaded", function() {
const todoInput = document.getElementById("todo-input");
const addTaskBtn = document.getElementById("add-task-btn")
const todoList= document.getElementById("todo-list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => renderTask(task));

let editingTaskId = null; // Variable to keep track of the task being edited



// Adding Task
addTaskBtn.addEventListener("click", function() {
  const taskText= todoInput.value.trim();
  if (taskText === "") return; //If input is empty do nothing 


  // Editing an existing task
  if (editingTaskId !== null) {
    updateTask(editingTaskId, taskText);
    const li = document.querySelector(
      `[data-id="${editingTaskId}"]`
    );
    li.querySelector("span").textContent = taskText;

    editingTaskId = null;
    addTaskBtn.textContent = "Add Task";
    todoInput.value = "";
    return;
  }
// Creating a new task object
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  // Pushing the new task to the tasks array 
  tasks.push(newTask);
  saveTasks(); // Save tasks to localStorage after adding a new task
  renderTask(newTask); // Render the new task on the page that way it will be displayed without refreshing
  todoInput.value = ""; // Clear the input field

  
 
});
// Displays the task on the page
 function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
    <span>${task.text}</span>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    `;
    // Adding an event listener to the task so once clicked it will be marked as completed
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return; // If the delete button is clicked, do not toggle completed status
        task.completed = !task.completed;
        li.classList.toggle("completed")
        saveTasks();
      })
   li.querySelector(".delete-btn").addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the li element
    tasks = tasks.filter(t => t.id !== task.id); // Remove the task from the tasks array
    li.remove(); // Remove the task from the DOM
    saveTasks();
   }); // Adding an event listener to the delete button so once clicked it will delete the task
    
    // Adding an event listener to the edit button so once clicked it will allow the user to edit the task
  li.querySelector(".edit-btn").addEventListener("click", (e) => {
    e.stopPropagation(); 
     editingTaskId = task.id;
  todoInput.value = task.text;
  todoInput.focus();

  addTaskBtn.textContent = "Update Task";
    
  })
   todoList.appendChild(li); 

  }
 
  // Saving tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function updateTask(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.text = newText;
      saveTasks();
    }
  }
});