// function that selects elements
let findElement = (selectorName) => document.querySelector(`.${selectorName}`);

// element-generating function
let makeElement = (tagName) => document.createElement(tagName);

// selected elements
let todoForm = findElement("todo__form");
let todoInput = findElement("todo__input");
let todoList = findElement("todo__list");
let elTodoTemplate = findElement("todo-template").content;
let allCount = findElement("all-todos")
let completed = findElement("completed")
let efficiency = findElement("efficiency")


// local data
let localTodos = JSON.parse(window.localStorage.getItem("todos"))

// alltodos
let allTodos = localTodos || [];

// uptade todos
function uptadeTodos() {
    window.localStorage.setItem("todos", JSON.stringify(allTodos))
    renderTodo(allTodos, todoList);
}


// add new todo to array
function createNewTodo (event) {
    event.preventDefault();
    
    // input's value
    let todoValue = todoInput.value.trim();
    // unique id
    let uniqueId = allTodos[allTodos.length - 1] ? allTodos[allTodos.length - 1].id : 0;
    // new todo object
    let newTodo = {
        id: uniqueId+1,
        todoName: todoValue,
        isCompleted: false,
        // isDeleted: false
    }

    todoInput.value = null;
    
    allTodos.push(newTodo);

    uptadeTodos()
}

// delete todo function
function handleDeleteTodo (event) {
    let todoId = event.target.dataset.todoId;
    let foundTodoIndex = allTodos.findIndex(todo => todo.id == todoId);

    allTodos.splice(foundTodoIndex, 1);

    uptadeTodos()
}

// complete todo function
function handleCompleteTodo (event) {
    let todoId = event.target.dataset.todoId;

    let foundTodo = allTodos.find(todo => todo.id == todoId);

    foundTodo.isCompleted = !foundTodo.isCompleted;

    uptadeTodos()
}

// render todo function
function renderTodo (arr, element) {
    element.innerHTML = null;

    let completeCount = 0;

    arr.forEach(todo => {
        let todoTemplate = elTodoTemplate.cloneNode(true);

        let inputComplete = todoTemplate.querySelector(".todo__checkbox");
        let todoText = todoTemplate.querySelector(".todo__text");
        let todoDeleteBtn = todoTemplate.querySelector(".todo__x-btn")

        todoText.textContent = todo.todoName;
        todoDeleteBtn.dataset.todoId = todo.id;
        inputComplete.dataset.todoId = todo.id;
        inputComplete.checked = todo.isCompleted;

        if (todo.isCompleted) {
            todoText.style.color = `grey`;
            completeCount++;
        }

        allCount.textContent = "All tasks: " + arr.length;
        completed.textContent = "Completed tasks: " + completeCount;
        efficiency.textContent = "Efficiency: " + Math.floor((completeCount / arr.length) * 100) + "%";

        todoDeleteBtn.addEventListener("click", handleDeleteTodo)
        inputComplete.addEventListener("click", handleCompleteTodo)

        element.appendChild(todoTemplate);
    });
}

todoForm.addEventListener("submit", createNewTodo)

renderTodo(allTodos, todoList)