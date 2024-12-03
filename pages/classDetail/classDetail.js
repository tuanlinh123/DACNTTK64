import { addData, getData, updateData } from "../../firebase/firebaseMethod.js";
import { getCodeRenderSidebar, getCodeRenderNavbar } from "../../core/grid.js";

window.onload = async () => {
    checkAccOnLoad();
    if (!getClassCode()) {
        window.location.href = "../classes/classes.html";
    } else {
        document.querySelector(".nav.nav-pills").innerHTML =
            getCodeRenderSidebar("classes");
        document.querySelector("nav").innerHTML = getCodeRenderNavbar();
        document.querySelector(".class-code").innerText = getClassCode();
        await genCodeTabInformation();
    }
};
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

    let query = `<button onclick="editInfoClass()" type="button" class="btn btn-success mb-3" style="float: right">
                    Sửa thông tin
                </button>`;

    query += infoTabConfig
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
    if (!checkRole("teacher")) {
        document.querySelector(".content-tab").innerHTML =
            "Bạn không có quyền truy cập chức năng này";
        return;
    }
    let query = `
        <select class="form-select mb-4 select-lesson" onchange="onChangeLesson('attendance')">
            <option>Chọn buổi học</option>
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                .map((x) => `<option value="${x}">Buổi ${x}</option>`)
                .join("")}
        </select>
        <div class="students-attend"></div>
    `;
    document.querySelector(".content-tab").innerHTML = query;
};

const genCodeTabComment = async () => {
    if (!checkRole("teacher")) {
        document.querySelector(".content-tab").innerHTML =
            "Bạn không có quyền truy cập chức năng này";
        return;
    }
    let query = `
        <select class="form-select mb-4 select-lesson" onchange="onChangeLesson('comments')">
            <option>Chọn buổi học</option>
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                .map((x) => `<option value="${x}">Buổi ${x}</option>`)
                .join("")}
        </select>
        <div class="students-attend"></div>
    `;
    document.querySelector(".content-tab").innerHTML = query;
};

const genCodeTabHomework = async () => {
    let query = `
        <select class="form-select mb-4 select-lesson" onchange="onChangeHomework()">
            <option>Chọn buổi học</option>
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                .map((x) => `<option value="${x}">Buổi ${x}</option>`)
                .join("")}
        </select>
        <ol class="multiple-questions-hw"></ol>
    `;
    document.querySelector(".content-tab").innerHTML = query;
};

let current_answer = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
};
window.handleChooseAnswer = (questionIndex) => {
    current_answer[questionIndex] = event.target.value;
};

window.onChangeHomework = async () => {
    let selectedLesson = event.target.value;
    let detailClass = await getClassDetailByCode();
    let thisUserHomework = detailClass?.detailLessons?.find(
        (x) => x.lessonIndex == selectedLesson
    )?.homework;
    // Nếu học sinh thì cho làm bài
    if (!checkRole("teachers")) {
        let studentCode = JSON.parse(localStorage.getItem("userInfo")).userCode;
        let thisUserAnswer = thisUserHomework?.find(
            (x) => x.studentCode == studentCode
        );
        if (thisUserAnswer) {
            document.querySelector(".multiple-questions-hw").innerHTML =
                "Bạn đã hoàn thành bài tập";
            return;
        }
        let courseHWData = await getData("homework-data");
        let homeworkData = courseHWData?.find(
            (x) => x.lessonIndex == selectedLesson
        );
        let queryMultipleQuestions = homeworkData.data
            .map((x, questionIndex) => {
                return `
                <li class="mb-2">
                    ${x.titleQuestion} <br/>
                    <div class="d-flex mt-2" style="flex-direction: column; row-gap: 12px">
                        ${x.answerList
                            .map((y) => {
                                return `
                                    <div>
                                        <input onchange="handleChooseAnswer(${questionIndex})" ${
                                    thisUserAnswer &&
                                    thisUserAnswer[questionIndex]
                                        ? "selected"
                                        : ""
                                } type="radio" value="${questionIndex}" name="${`question${questionIndex}`}" class="question${questionIndex}"> ${y}
                                    </div>`;
                            })
                            .join("")}
                    </div>
                </li>
            `;
            })
            .join("");
        document.querySelector(".multiple-questions-hw").innerHTML = `
                ${queryMultipleQuestions} 
                <button onclick="submitHomework()" class="btn btn-primary my-3" style="float: right">Nộp bài</button>
            `;
    } else {
        let query = `
            <h6>Danh sách học sinh</h6>
            <ul class="list-group">
                ${detailClass.students
                    .map((x) => {
                        let studentAnswer = thisUserHomework?.find(
                            (y) => y.studentCode == x.studentCode
                        );
                        return `
                            <li class="list-group-item d-flex" style="align-items: center; justify-content: space-between;">
                                ${x.studentName}
                                <div>
                                    ${
                                        studentAnswer
                                            ? "Đã hoàn thành"
                                            : "Chưa hoàn thành"
                                    }
                                </div>
                            </li>
                            ${
                                studentAnswer
                                    ? JSON.stringify(studentAnswer.answer)
                                    : ""
                            }
                        `;
                    })
                    .join("")}
            </ul>
        `;
        document.querySelector(".multiple-questions-hw").innerHTML = query;
    }
};

window.editInfoClass = () => {
    if (!checkRole("admin")) {
        alert("Bạn không có quyền sửa thông tin lớp học");
        return;
    }
};

window.onChangeLesson = async (tabCode) => {
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
                    let inputCodeByTabCode =
                        tabCode == "attendance"
                            ? `
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
                    `
                            : `
                        <textarea style="width: 1000px" type="text" class="form-control type-attend-${x.studentCode}" placeholder="Nhập nhận xét"></textarea>
                    `;

                    return `
                        <li class="list-group-item d-flex" style="align-items: center; justify-content: space-between;">
                            ${x.studentName}
                            ${inputCodeByTabCode}
                        </li>
                    `;
                })
                .join("")}
        </ul>
        <button onclick="${
            tabCode == "attendance" ? "saveAttendance()" : "saveComments()"
        }" type="submit" class="btn btn-primary my-3" style="float: right">Lưu thông tin</button>
    `;
    document.querySelector(".students-attend").innerHTML = query;

    // cập nhật lại giá trị điểm danh nếu đã điểm danh trước đó
    let detailLessons = detailClass.detailLessons.find(
        (x) => x.lessonIndex == selectedLesson
    );
    let attendanceCommentInfo = detailLessons && detailLessons[tabCode];
    if (!attendanceCommentInfo || attendanceCommentInfo.length == 0) {
        return;
    } else {
        attendanceCommentInfo.forEach((x) => {
            document.querySelector(`.type-attend-${x.studentCode}`).value =
                tabCode == "attendance" ? x.type : x.value;
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
window.submitHomework = async () => {
    let payload = [];
    let detailClass = await getClassDetailByCode();
    let studentCode = JSON.parse(localStorage.getItem("userInfo")).userCode;
    payload.push({
        studentCode: studentCode,
        answer: current_answer,
    });
    let detailInfo = detailClass.detailLessons.find(
        (x) => x.lessonIndex == document.querySelector(".select-lesson").value
    );
    if (detailInfo.homework) {
        let indexX = detailInfo.homework.findIndex(
            (x) => x.studentCode == studentCode
        );
        detailInfo.homework[indexX] = payload;
    } else {
        detailInfo.homework = payload;
    }
    await updateData("classDetail", detailClass.id, detailClass);
    alert("Lưu thông tin thành công!");
};

window.saveComments = async () => {
    let payload = [];
    let detailClass = await getClassDetailByCode();
    detailClass.students.forEach((x) => {
        payload.push({
            studentCode: x.studentCode,
            value: document.querySelector(`.type-attend-${x.studentCode}`)
                .value,
        });
    });
    let attendanceInfo = detailClass.detailLessons.find(
        (x) => x.lessonIndex == document.querySelector(".select-lesson").value
    );
    if (attendanceInfo) {
        attendanceInfo.comments = payload;
    } else {
        detailClass.detailLessons.push({
            lessonIndex: Number.parseInt(
                document.querySelector(".select-lesson").value
            ),
            attendance: "",
            comments: payload,
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
        case "comment":
            genCodeTabComment();
            break;
        case "homework":
            genCodeTabHomework();
            break;
        default:
            break;
    }
};
