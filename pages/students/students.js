import { gridConfigStudents } from "./gridConfigStudents.js";
import { getData } from "../../firebase/firebaseMethod.js";
import {
  getCodeRenderHeader,
  getCodeRenderGrid,
  getCodeRenderSidebar,
  getCodeRenderNavbar,
} from "../../core/grid.js";

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
  let dataStudents = await getData("users");
  dataStudents = dataStudents.filter(
    (x) =>
      x.role == "student" &&
      (x.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
        x.userCode.toLowerCase().includes(searchInput.toLowerCase()))
  );
  renderGridUsers(dataStudents);
};

document.querySelector(".search-btn").addEventListener("click", onSearch);

document.querySelector(".nav.nav-pills").innerHTML =
  getCodeRenderSidebar("students");
document.querySelector("nav").innerHTML = getCodeRenderNavbar();
renderGridUsers();
