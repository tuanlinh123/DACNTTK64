import { gridConfigTeachers } from "./gridConfigTeachers.js";
import { getData } from "../../firebase/firebaseMethod.js";
import { getCodeRenderHeader, getCodeRenderGrid } from "../../core/grid.js";
import { checkAccOnLoad } from "../../core/auth.js";
window.onload = () => checkAccOnLoad();
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
    let dataClasses = await getData("users");
    dataClasses = dataClasses.filter(
        (x) =>
            x.role == "teacher" &&
            (x.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
                x.userCode.toLowerCase().includes(searchInput.toLowerCase()))
    );
    renderGridUsers(dataClasses);
};

document.querySelector(".search-btn").addEventListener("click", onSearch);

renderGridUsers();
