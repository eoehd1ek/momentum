const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// delete "li button" click
function deleteToDO(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(function (todo) { return todo.id !== parseInt(li.id) });
    saveToDos();
}

// append todo-list li
function paintToDo(newTodoObj) {
    const li = document.createElement("li");
    li.id = newTodoObj.id;
    // span에 할 일 작성
    const span = document.createElement("span");
    span.innerText = newTodoObj.text;
    // 버튼 생성
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDO);
    // 요소 등록
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

// enter the todo-form
function handleToDoFormSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";

    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoFormSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);

} else {

}