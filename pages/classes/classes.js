import { gridConfigClasses } from "./gridConfigClasses.js";
import { getData } from "../../firebase/firebaseMethod.js";
import { getCodeRenderHeader, getCodeRenderGrid } from "../../core/grid.js";

const renderGridClasses = async () => {
    let dataClasses = await getData("classes");
    document.getElementById("header-classes").innerHTML =
        getCodeRenderHeader(gridConfigClasses);
    document.getElementById("grid-classes").innerHTML = getCodeRenderGrid(
        dataClasses,
        gridConfigClasses
    );
};

renderGridClasses();
