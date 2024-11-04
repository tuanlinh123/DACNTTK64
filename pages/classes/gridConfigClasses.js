export const gridConfigClasses = [
    {
        headerName: "STT",
        width: 100,
    },
    {
        field: "classCode",
        headerName: "Mã lớp",
        width: 350,
    },
    {
        field: "baseName",
        headerName: "Cơ sở",
        width: 300,
    },
    {
        field: "status",
        headerName: "Trạng thái",
        width: 250,
        customDisplay: (value) => {
            let mappingStatus = {
                Pending: "Đang chờ",
                Completed: "Đã kết thúc",
                Running: "Đang hoạt động",
            };
            return `<td style="border: 1px solid #e0e0e0; text-align: left">${mappingStatus[value]}</td>`;
        },
    },
    {
        field: "teacherName",
        headerName: "Giảng viên",
        width: 300,
    },
    {
        field: "numberOfStudents",
        headerName: "Số học viên",
        width: 200,
        align: "center",
    },
    {
        field: "function",
        headerName: "Thao tác",
        width: 200,
        align: "center",
        customDisplay: () => {
            return `<td style="border: 1px solid #e0e0e0; text-align: center">
                <button type="button" class="btn btn-secondary">Chi tiết</button>
            </td>`;
        },
    },
];
