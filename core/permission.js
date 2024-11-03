// Danh sách quyền

// 1. Quản trị viên: admin
// 2. Giảng viên: teacher
// 3. Học sinh: student

export const checkRole = (role) => {
    let currentRole = JSON.parse(localStorage.getItem("userInfo")).role;
    if (currentRole == "admin") return true;
    else if (
        currentRole == "teacher" &&
        (role == "teacher" || role == "student")
    ) {
        return true;
    } else if (currentRole == "student" && role == "student") return true;
};
