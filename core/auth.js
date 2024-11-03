export const checkAccOnLoad = () => {
    if (!localStorage.getItem("userInfo")) {
        window.location.href = "../auth/login.html";
    }
};
