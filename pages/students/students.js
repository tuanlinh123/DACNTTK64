import { gridConfigStudents } from "./gridConfigStudents.js";
import { getData } from "../../firebase/firebaseMethod.js";
import { getCodeRenderHeader, getCodeRenderGrid } from "../../core/grid.js";
import { checkAccOnLoad } from "../../core/auth.js";
window.onload = () => checkAccOnLoad();
const renderGridUsers = async (dataClasses) => {
    !dataClasses && (dataClasses = await getData("users"));
    dataClasses = dataClasses.filter((x) => x.role == "student");
    document.getElementById("header-classes").innerHTML =
        getCodeRenderHeader(gridConfigStudents);
    document.getElementById("grid-classes").innerHTML = getCodeRenderGrid(
        dataClasses,
        gridConfigStudents
    );
};

const onSearch = async () => {
    event.preventDefault();
    let searchInput = document.querySelector(".search-input").value;
    let dataClasses = await getData("users");
    dataClasses = dataClasses.filter(
        (x) =>
            x.role == "student" &&
            (x.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
                x.userCode.toLowerCase().includes(searchInput.toLowerCase()))
    );
    renderGridUsers(dataClasses);
};

document.querySelector(".search-btn").addEventListener("click", onSearch);

renderGridUsers();
