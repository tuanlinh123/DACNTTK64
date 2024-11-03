import { gridConfigUsers } from "./gridConfigUsers.js";
import { getData } from "../../firebase/firebaseMethod.js";
import { getCodeRenderHeader, getCodeRenderGrid } from "../../core/grid.js";

const renderGridUsers = async () => {
    let dataClasses = await getData("teachers");
    document.getElementById("header-classes").innerHTML =
        getCodeRenderHeader(gridConfigUsers);
    document.getElementById("grid-classes").innerHTML = getCodeRenderGrid(
        dataClasses,
        gridConfigUsers
    );
};

renderGridUsers();
