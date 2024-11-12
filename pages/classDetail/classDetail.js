import { getData, updateData } from "../../firebase/firebaseMethod.js";
import { getCodeRenderSidebar, getCodeRenderNavbar } from "../../core/grid.js";
window.onload = () => checkAccOnLoad();

document.querySelector(".nav.nav-pills").innerHTML =
    getCodeRenderSidebar("classes");
document.querySelector("nav").innerHTML = getCodeRenderNavbar();

const getClassCode = () => {
    let searchQuery = window.location.search.slice(1).split("&")[0].split("=");
    return searchQuery[1];
};

const getClassInfoByCode = async () => {
    let classes = await getData("classes");
    return classes.find((x) => x.classCode == getClassCode());
};

const getClassDetailByCode = async () => {
    let details = await getData("classDetail");
    return details.find((x) => x.classCode == getClassCode());
};

document.querySelector(".class-code").innerText = getClassCode();

const genCodeTabInformation = async () => {
    let detailClass = await getClassInfoByCode();
    let infoTabConfig = [
        {
            label: "Mã lớp học",
            value: detailClass.classCode,
        },
        {
            label: "Cơ sở",
            value: detailClass.baseName,
        },
        {
            label: "Giáo viên",
            value: detailClass.teacherName,
        },
        {
            label: "Số học sinh",
            value: detailClass.numberOfStudents,
        },
        {
            label: "Trạng thái",
            value: detailClass.status,
        },
    ];

    let query = infoTabConfig
        .map((item) => {
            return `
            <div class="input-group mb-3">
                <div class="input-group-prepend" style="width: 170px">
                    <span class="input-group-text" id="inputGroup-sizing-default">${item.label}</span>
                </div>
                <input type="text" class="form-control" aria-label="Default" disabled
                    aria-describedby="inputGroup-sizing-default" value="${item.value}">
            </div>
        `;
        })
        .join("");

    let detailClassX = await getClassDetailByCode();
    query += `
        <h6>Danh sách học sinh</h6>
        <ul class="list-group">
            ${detailClassX.students
                .map((x) => `<li class="list-group-item">${x.studentName}</li>`)
                .join("")}
        </ul>
    `;
    document.querySelector(".content-tab").innerHTML = query;
};

const genCodeTabAttendance = async () => {
    let query = `
        <select class="form-select mb-4 select-lesson" aria-label="Default select example" onchange="onChangeLesson()">
            <option selected>Chọn buổi học</option>
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                .map((x) => `<option value="${x}">Buổi ${x}</option>`)
                .join("")}
        </select>
        <div class="students-attend"></div>
    `;
    document.querySelector(".content-tab").innerHTML = query;
};

window.onChangeLesson = async () => {
    let selectedLesson = event.target.value;
    let attendanceType = [
        { label: "Có mặt", value: 1 },
        { label: "Đến muộn", value: 2 },
        { label: "Nghỉ phép", value: 3 },
        { label: "Nghỉ không phép", value: 4 },
    ];
    let detailClass = await getClassDetailByCode();
    let query = `
        <h6>Danh sách học sinh</h6>
        <ul class="list-group">
            ${detailClass.students
                .map((x) => {
                    return `
                        <li class="list-group-item d-flex" style="align-items: center; justify-content: space-between;">
                            ${x.studentName}
                            <select class="form-select type-attend-${
                                x.studentCode
                            }" style="width: 300px">
                                <option selected>Chọn điểm danh</option>
                                ${attendanceType
                                    .map(
                                        (y) =>
                                            `<option value="${y.value}">${y.label}</option>`
                                    )
                                    .join("")}
                            </select>
                        </li>
                    `;
                })
                .join("")}
        </ul>
        <button onclick="saveAttendance()" type="submit" class="btn btn-primary my-3" style="float: right">Lưu thông tin</button>
    `;
    document.querySelector(".students-attend").innerHTML = query;

    let attendanceInfo = detailClass.detailLessons.find(
        (x) => x.lessonIndex == selectedLesson
    )?.attendance;
    if (!attendanceInfo || attendanceInfo.length == 0) {
        return;
    } else {
        attendanceInfo.forEach((x) => {
            document.querySelector(`.type-attend-${x.studentCode}`).value =
                x.type;
        });
    }
};

window.saveAttendance = async () => {
    let payload = [];
    let detailClass = await getClassDetailByCode();
    detailClass.students.forEach((x) => {
        payload.push({
            studentCode: x.studentCode,
            type: document.querySelector(`.type-attend-${x.studentCode}`).value,
        });
    });
    let attendanceInfo = detailClass.detailLessons.find(
        (x) => x.lessonIndex == document.querySelector(".select-lesson").value
    );
    if (attendanceInfo) {
        attendanceInfo.attendance = payload;
    } else {
        detailClass.detailLessons.push({
            lessonIndex: Number.parseInt(
                document.querySelector(".select-lesson").value
            ),
            attendance: payload,
            comment: "",
        });
    }
    await updateData("classDetail", detailClass.id, detailClass);
    alert("Lưu thông tin thành công!");
};

window.changeTab = (type) => {
    document
        .querySelectorAll(".nav-link")
        .forEach((item) => item.classList.remove("active"));
    event.target.classList.add("active");
    switch (type) {
        case "info":
            genCodeTabInformation();
            break;
        case "attendance":
            genCodeTabAttendance();
            break;
        default:
            break;
    }
};
genCodeTabInformation();
