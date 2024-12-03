import { gridConfigClasses } from "./gridConfigClasses.js";
import { addData, getData } from "../../firebase/firebaseMethod.js";
import {
    getCodeRenderHeader,
    getCodeRenderGrid,
    getCodeRenderSidebar,
    getCodeRenderNavbar,
} from "../../core/grid.js";
window.onload = () => {
    checkAccOnLoad();
    document.querySelector(".search-btn").addEventListener("click", onSearch);
    document.querySelector(".nav.nav-pills").innerHTML =
        getCodeRenderSidebar("classes");
    document.querySelector("nav").innerHTML = getCodeRenderNavbar();
    renderGridClasses();
};

const renderGridClasses = async (dataClasses) => {
    if (!dataClasses) dataClasses = await getData("classes");
    document.getElementById("header-classes").innerHTML =
        getCodeRenderHeader(gridConfigClasses);
    document.getElementById("grid-classes").innerHTML = getCodeRenderGrid(
        dataClasses,
        gridConfigClasses,
        "classCode"
    );
};

const onSearch = async () => {
    let classCodeInput = document.querySelector(".classCodeInput").value;
    let baseCodeInput = document.querySelector(".baseCodeInput").value;
    let teacherCodeInput = document.querySelector(".teacherCodeInput").value;
    let statusCodeInput = document.querySelector(".statusCodeInput").value;

    let dataClasses = await getData("classes");
    classCodeInput &&
        (dataClasses = dataClasses.filter((x) =>
            x.classCode.toLowerCase().includes(classCodeInput)
        ));
    baseCodeInput &&
        (dataClasses = dataClasses.filter((x) => x.baseCode == baseCodeInput));
    teacherCodeInput &&
        (dataClasses = dataClasses.filter((x) =>
            x.teacherCode.toLowerCase().includes(baseCodeInput)
        ));
    statusCodeInput &&
        (dataClasses = dataClasses.filter((x) => x.status == statusCodeInput));
    renderGridClasses(dataClasses);
};

window.handleAddClass = async () => {
    let users = await getData("users");
    let students = users.filter((x) => x.role == "student");

    let selectedStudent = document
        .querySelector(".form-control.studentcode")
        .split(";");
    let selectedStudentLst = students
        .filter((x) => selectedStudent.includes(x.studentCode))
        .map((x) => {
            return {
                studentCode: x.studentCode,
                studentName: x.fullName,
            };
        });
    let newData = {
        baseCode: document.querySelector(".form-control.basecode"),
        baseName: document.querySelector(".form-control.basename"),
        classCode: document.querySelector(".form-control.classcode"),
        numberOfStudents: selectedStudentLst.length,
        status: "Running",
        teacherCode: document.querySelector(".form-control.teachercode"),
        teacherName: document.querySelector(".form-control.teachername"),
    };
    await addData("classes", newData);
    await addData(`classDetail`, {
        detailLessons: [],
        students: selectedStudentLst,
        classCode: document.querySelector(".form-control.classcode"),
    });
    alert("Thêm lớp thành công");
};
