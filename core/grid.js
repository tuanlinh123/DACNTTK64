export const getCodeRenderHeader = (gridConfigUsers) => {
    return `
        <tr>
            ${gridConfigUsers
                .map((item) => {
                    return `<th style="width: ${item.width}px; text-align: center; border: 1px solid #e0e0e0">${item.headerName}</th>`;
                })
                .join("")}
        </tr>
    `;
};

export const getCodeRenderGrid = (dataClasses, gridConfig) => {
    return dataClasses
        .map((item, index) => {
            return `
            <tr>
                <td scope="row" style="border: 1px solid #e0e0e0; text-align: center">${
                    index + 1
                }</td>
                ${gridConfig
                    .map((item1) => {
                        // Format cột STT
                        if (item1.headerName === "STT") {
                            return "";
                        }
                        // Format cột chức năng
                        else if (item1.field === "function") {
                            return item1.customDisplay();
                        }
                        if (item1.customDisplay) {
                            return item1.customDisplay(item[item1.field]);
                        }
                        // Mặc định các cột
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
