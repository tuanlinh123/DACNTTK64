import { gridConfigClasses } from "./gridConfigClasses.js";
import { getData } from "../../firebase/firebaseMethod.js";
import {
    getCodeRenderHeader,
    getCodeRenderGrid,
    getCodeRenderSidebar,
    getCodeRenderNavbar,
    getCodeRenderTableRoom,
} from "../../core/grid.js";
window.onload = () => checkAccOnLoad();

const ROOM_TABLE = 12;

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

document.querySelector(".search-btn").addEventListener("click", onSearch);
document.querySelector(".nav.nav-pills").innerHTML =
    getCodeRenderSidebar("classes");
document.querySelector("nav").innerHTML = getCodeRenderNavbar();
document.querySelector(".classRoom").innerHTML =
    getCodeRenderTableRoom(ROOM_TABLE);
renderGridClasses();

window.getStudentInClass = async (classCode) => {
    let allDetailClasses = await getData("classDetail");
    let detailClass = allDetailClasses.find((x) => x.classCode == classCode);
    return (detailClass && detailClass.students) || [];
};
