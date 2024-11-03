import { getData } from "../../firebase/firebaseMethod.js";

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
    alert("Chưa hỗ trợ chức năng đăng ký");
    // container.classList.add('right-panel-active');
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

document
    .querySelector("#signin-btn")
    .addEventListener("click", () => loginLMS());

const loginLMS = async () => {
    event.preventDefault();
    const email = document.getElementById("email-signin").value;
    const password = document.getElementById("password-signin").value;
    // validate empty
    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    let users = await getData("users");
    let result = users.find(
        (x) => x.email === email && x.password === btoa(password)
    );
    if (!result) {
        alert("Email hoặc mật khẩu không đúng");
        return;
    } else {
        afterLogin(result);
    }
};

const afterLogin = (result) => {
    localStorage.setItem("userInfo", JSON.stringify(result));
    window.location.href = "../classes/classes.html";
};
