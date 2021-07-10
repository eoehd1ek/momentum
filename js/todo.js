const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");
const TODOS_KEY = "todos";

const EDIT_INPUT_CLASSNAME = "edit-input";
const EDIT_FORM_CLASSNAME = "edit-form"
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// delete "li button" click
function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(function (todo) { return todo.id !== parseInt(li.id); });
    saveToDos();
}

function changeToDo(id, text) {
    toDos.forEach(function (data) {
        if (data.id == id) {
            data.text = text;
        }
    })
    saveToDos();
}

// this == form, 자식으로 input을 가짐
function editToDoSubmit(event) {    // 입력 후 enter를 쳤을 때
    event.preventDefault();
    const li = this.parentElement;
    const span = li.childNodes.item(1);
    const changedTodoText = this.childNodes.item(0).value;
    span.innerText = changedTodoText;
    try {   // submit을 사용하면 이미 blur로 form이 삭제됐다는 오류 발생
        li.removeChild(li.childNodes.item(2));
        span.classList.remove(HIDDEN_CLASSNAME);
        changeToDo(li.id, changedTodoText);
    } catch (err) {
        console.log("form element is already removed in blur event handler");
    }
}

// this == input, 부모로는 form, form의 부모로는 li
function inputBlur(event) {     // input에서 포커스가 사라질 때
    event.preventDefault();
    const li = this.parentElement.parentElement;
    const span = li.childNodes.item(1);
    const changedTodoText = this.value;
    span.innerText = changedTodoText;
    li.removeChild(li.childNodes.item(2));
    span.classList.remove(HIDDEN_CLASSNAME);
    changeToDo(li.id, changedTodoText);
}

function liDblClick(event) {
    let li = null;
    // find li element
    if (event.path.length == 7) {   // span double click
        li = event.path[1];
    }
    else if (event.path.length == 6) {  // li double click
        li = event.path[0];
    }

    if (li != null) {
        // span hidden 처리
        const spanValue = li.lastChild.innerText;

        const input = document.createElement("input");
        input.classList.add(EDIT_INPUT_CLASSNAME);
        input.addEventListener("blur", inputBlur);
        input.type = "text";
        input.value = spanValue;

        const form = document.createElement("form");
        form.classList.add(EDIT_FORM_CLASSNAME);
        form.addEventListener("submit", editToDoSubmit);

        li.childNodes.item(1).classList.add(HIDDEN_CLASSNAME);
        form.appendChild(input);
        li.appendChild(form);

        input.focus();
    }
}

// append todo-list li
function paintToDo(newTodoObj) {
    const li = document.createElement("li");
    li.addEventListener("dblclick", liDblClick);
    li.id = newTodoObj.id;
    // span에 할 일 작성
    const span = document.createElement("span");
    span.innerText = newTodoObj.text;
    // 버튼 생성
    const clickSpan = document.createElement("span");
    clickSpan.innerText = "❌";
    clickSpan.addEventListener("click", deleteToDo);
    // 요소 등록
    li.appendChild(clickSpan);
    li.appendChild(span);
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
}
