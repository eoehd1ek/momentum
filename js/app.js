const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function paintGreeting() {
    const username = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

function onLoginSubmit(event) {
    event.preventDefault();
    const inputedUsername = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME_KEY, inputedUsername);    // 로컬db 저장
    paintGreeting();
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    // 입력 폼 보이기
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    // 유저 네임 보이기
    paintGreeting();
}

