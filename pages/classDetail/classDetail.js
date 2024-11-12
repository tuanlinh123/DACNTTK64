import { getData } from "../../firebase/firebaseMethod.js";
import { getCodeRenderSidebar, getCodeRenderNavbar } from "../../core/grid.js";
window.onload = () => checkAccOnLoad();

document.querySelector(".nav.nav-pills").innerHTML =
    getCodeRenderSidebar("classes");
document.querySelector("nav").innerHTML = getCodeRenderNavbar();

const getClassCode = () => {
    let searchQuery = window.location.search.slice(1).split("&")[0].split("=");
    return searchQuery[1];
};

document.querySelector(".class-code").innerText = getClassCode();
