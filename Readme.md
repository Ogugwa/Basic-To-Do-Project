# Building a Basic TODO app

This project is from my Web development course on Udemy
My goal is to try and replicate the solution without going through it.

The starter code already has the Html and CSS given. What is required is my Javascript knowledge

## Targeting the form and adding an event listener

- I first targeted the Add Taks button so I can add an event listener ("Click")
- Second step is writing the function in the add Task button. The function should be able to display the output of whatever was typed in the input. This worked showing the add event listener works
- Writing how the display should show when
- I created an empty array to store the input data
- I had to target the list item on the html so I can push the styling inside

## Creating the Delete Button

This was not as hard as I thought it was going to be all i had to do was

- Create a const to save my dom target in `const deleteBtn`
- used ` document.createElement("button")` to create the button then used `deleteBtn.style.  ` to customise the css
- After this i add it to the list item so it is replicated in every list item
  `` taskList.innerHTML +=`<li>${task} ${deleteBtn.outerHTML}</li>`;``

### Adding an Event Listener to the Delete Button

This might givr an issue because I need to find a way to target the delete button such that only the element selected is acted on and not all the delete button
I encountered issues here cause the delete button created does not respond to the add event listener in the Task. Now I have to reorder my code such that rather putting the list item directly to the Li such that it is automatic. I have to manually create a list item , create abutton elemet, append the deleteBtn element to the list item that way the delete button event listener
Something like this:

```js
const listItem = document.createElement("li");
listItem.textContext = task + " ";
taskList.appendChild(listItem);
listItem.appendChild(deleteBtn);
```

- Using `listItem.remove(); ` inside the delete add event listener to remove the list item once it is clicked.
## Adding Read Feature
 Before adding this feature i updated my whole Js code to activate only when the whole page is loaded using
 ```js
 document.addEventListener("DOMContentLoaded", function() {});
 ```
 Creating a save task function that stores the task in the local storage
 ```js
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  ```
  then pushing the save task immediately after pushing each task.


## Adding an Update Function
First i created an Edit button
Added an event listener to ensure when the button is clicked an action can be done
```js 
 li.querySelector(".edit-btn").addEventListener("click", (e) => {
     e.stopPropagation(); 
     editingTaskId = task.id;
  todoInput.value = task.text;
  todoInput.focus();

  addTaskBtn.textContent = "Update Task";
    
  })
```
I also created a updateTask function 
```js
 function updateTask(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.text = newText;
      saveTasks();
    }
  }
```

After creating the update function i got stuck and had to turn to AI for help in understanding how to ensure the update is done in the input as the Add Task and it assisted in creating a variable to track the editing
```js
let editingTaskId = null;
```

I also add to put the edit task into the event listener for adding task

The Logic was a bit confusing for now but i guess a little more practise and I will be good
```js
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
```
With this the CRUD- Create,Read, Update and Delete operations are complete

I now have to go to the CSS to ensure the app is responsive on mobile also