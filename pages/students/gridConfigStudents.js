export const gridConfigStudents = [
    {
        headerName: "STT",
        width: 100,
    },
    {
        field: "userCode",
        headerName: "Mã học viên",
        width: 350,
    },
    {
        field: "fullName",
        headerName: "Họ tên",
        width: 300,
    },
    {
        field: "dateOfBirth",
        headerName: "Ngày sinh",
        width: 250,
        align: "center",
    },
    {
        field: "gender",
        headerName: "Giới tính",
        width: 300,
        align: "center",
        customDisplay: (value) => {
            return `<td style="border: 1px solid #e0e0e0; text-align: center">${
                value == "male" ? "Nam" : "Nữ"
            }</td>`;
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
    },
    {
        field: "phoneNumber",
        headerName: "Số điện thoại",
        width: 200,
        align: "center",
    },
];
