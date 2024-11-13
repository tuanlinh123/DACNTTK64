import { gridConfigTeachers } from "./gridConfigTeachers.js";
import { getData } from "../../firebase/firebaseMethod.js";
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
        getCodeRenderSidebar("teachers");
    document.querySelector("nav").innerHTML = getCodeRenderNavbar();
    renderGridUsers();
};
const renderGridUsers = async (dataTeachers) => {
    !dataTeachers && (dataTeachers = await getData("users"));
    dataTeachers = dataTeachers.filter((x) => x.role == "teacher");
    document.getElementById("header-classes").innerHTML =
        getCodeRenderHeader(gridConfigTeachers);
    document.getElementById("grid-classes").innerHTML = getCodeRenderGrid(
        dataTeachers,
        gridConfigTeachers
    );
};

const onSearch = async () => {
    event.preventDefault();
    let searchInput = document.querySelector(".search-input").value;
    let dataTeachers = await getData("users");
    dataTeachers = dataTeachers.filter(
        (x) =>
            x.role == "teacher" &&
            (x.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
                x.userCode.toLowerCase().includes(searchInput.toLowerCase()))
    );
    renderGridUsers(dataTeachers);
};
