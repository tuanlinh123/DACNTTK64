import { gridConfigClasses } from "./gridConfigClasses.js";
import { getData } from "../../firebase/firebaseMethod.js";

const getCodeRenderHeader = () => {
    return `
        <tr>
            ${gridConfigClasses
                .map((item) => {
                    return `<th style="width: ${item.width}px; text-align: center; border: 1px solid #e0e0e0">${item.headerName}</th>`;
                })
                .join("")}
        </tr>
    `;
};

const getCodeRenderGridClasses = (dataClasses) => {
    console.log(dataClasses.map((item) => item.classCode).join());
    return dataClasses
        .map((item, index) => {
            return `
            <tr>
                <td scope="row" style="border: 1px solid #e0e0e0; text-align: center">${
                    index + 1
                }</td>
                ${gridConfigClasses
                    .map((item1) => {
                        if (item1.headerName === "STT") return "";
                        return `<td style="border: 1px solid #e0e0e0; text-align: ${
                            item1.align ?? "left"
                        }">${item[item1.field]}</td>`;
                    })
                    .join("")}
            </tr>
        `;
        })
        .join("");
};

const renderGridClasses = async () => {
    let dataClasses = await getData("classes");
    document.getElementById("header-classes").innerHTML = getCodeRenderHeader();
    document.getElementById("grid-classes").innerHTML =
        getCodeRenderGridClasses(dataClasses);
};

renderGridClasses();
