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
    const overlay = document.getElementById("overlay");
    const windowElement = document.getElementById("window");

export const getCodeRenderGrid = (dataClasses, gridConfig, keyCode) => {
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
                            return item1.customDisplay(
                                keyCode && item[keyCode]
                            );
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

const sidebarItems = [
    {
        code: "admin",
        path: "../admin/admin.html",
        icon: `<i class="fa-solid fa-house"></i>`,
    },
    {
        code: "classes",
        path: "../classes/classes.html",
        icon: `<i class="fa-solid fa-school"></i>`,
    },
    {
        code: "students",
        path: "../students/students.html",
        icon: `<i class="fa-solid fa-user"></i>`,
    },
    {
        code: "teachers",
        path: "../teachers/teachers.html",
        icon: `<i class="fa-solid fa-chalkboard-user"></i>`,
    },
];

export const getCodeRenderSidebar = (code) => {
    return sidebarItems
        .map((item) => {
            return `
              <li class="nav-item" style="cursor: pointer" onclick="changePath('${
                  item.code
              }', '${item.path}')">
                  <div
                      href="${item.path}"
                      class="nav-link ${
                          item.code == code ? "active" : ""
                      } py-3 border-bottom"
                  >
                      ${item.icon}
                  </div>
              </li>
          `;
        })
        .join("");
};

export const getCodeRenderNavbar = () => {
    return `<ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
              <li>
                <button
                  class="btn btn-outline-light my-2 my-sm-0 search-btn"
                  type="submit"
                  onclick="logOut()"
                >
                  Đăng xuất
                </button>
              </li>
            </ul>`;
};
