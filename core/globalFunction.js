const changePath = (code, path) => {
    switch (code) {
        case "students":
            if (!checkRole("admin")) {
                alert("Bạn không có quyền truy cập");
                return;
            }
            break;
        case "teachers":
            if (!checkRole("admin")) {
                alert("Bạn không có quyền truy cập");
                return;
            }
            break;
        default:
            break;
    }
    window.location.href = path;
};

const checkRole = (role) => {
    let currentRole = JSON.parse(localStorage.getItem("userInfo")).role;
    if (currentRole == "admin") return true;
    else if (
        currentRole == "teacher" &&
        (role == "teacher" || role == "student")
    ) {
        return true;
    } else if (currentRole == "student" && role == "student") {
        return true;
    }

    return false;
};

const checkAccOnLoad = () => {
    if (!localStorage.getItem("userInfo")) {
        window.location.href = "../auth/login.html";
    }
};

const logOut = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "../auth/login.html";
};
