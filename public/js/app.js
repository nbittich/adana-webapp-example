const todoContainer = document.getElementById("todosContainer");
const addTodoBtn = document.getElementById("addTodo");
const inputText = document.getElementById("todoInput");

listTodos();

addTodoBtn.onclick = async (event) => {
  event.preventDefault();
  if (inputText.value) {
    const params = new URLSearchParams();
    params.set("todo", inputText.value);
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Specify content type
      },
      body: params,
    });
    if (!response.ok) {
      const error = await response.text();
      alert(error);
    } else {
      const todo = await response.json();
      appendTodo(todo);
    }
    inputText.value = "";
  }
};

function appendTodo(todo) {
  const todoItem = document.createElement("todo-item");
  todoItem.title = todo.value;
  todoItem.dataset.id = todo.id;
  todoItem.checked = todo.checked;
  todoItem.checkedEventHandler = async (event) => {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
      },
      body: JSON.stringify({ checked: event.target.checked }), // Convert the data object to a JSON string
    });
    if (!response.ok) {
      console.log("err:", await response.text());
    }
  };
  todoContainer.appendChild(todoItem);
}
async function listTodos() {
  const response = await fetch("/api/todos");
  const todos = await response.json();
  todoContainer.innerHTML = "";
  for (const todo of todos) {
    appendTodo(todo);
  }
}
