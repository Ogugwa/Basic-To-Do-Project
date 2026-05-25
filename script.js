const input = document.getElementById("todo-input");
const addTaskBtn = document.getElementById("add-task-btn")
const taskList= document.getElementById("todo-list")
let displayTask= [];

// Create a delete button


// Add an event listeneter
addTaskBtn.addEventListener("click", function() { 
  const  task = input.value.trim(); 
  const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.style.backgroundColor = "red";
deleteBtn.style.color = "white";
deleteBtn.style.borderRadius = "5px";
deleteBtn.style.padding = "5px 10px";
deleteBtn.style.marginLeft = "10px";
deleteBtn.style.cursor = "pointer";
if (task !==""){
    const listItem = document.createElement("li");
    listItem.textContent = task + " ";
    taskList.appendChild(listItem);
    listItem.appendChild(deleteBtn);
    deleteBtn.addEventListener("click",function() {
    // console.log("Delete button clicked");
  listItem.remove();
});
}else {
     input.value = "Please enter a task";
}
});

// Adding an event listerner to the delete button

