import { addData,getData } from "../../firebase/firebaseMethod.js";
let inputEmail = document.querySelector(".addEmail")
let inputPW = document.querySelector(".addPassword")
let inputGender = document.querySelector("#cleGender")
let inputDate = document.querySelector(".addDate")
let inputSdt = document.querySelector(".addSdt")
let inputFullname = document.querySelector(".addFullname")

let btnAddTecher = document.querySelector(".btn.btn-primary")
console.log(btnAddTecher);

btnAddTecher.addEventListener("click",async function addTeacher (){
    let arrUser = await getData("users")
    console.log(arrUser);
    
 if(inputDate.value==""||inputEmail.value==""||inputFullname==""||inputPW==""||inputSdt==""){
    alert("Kiểm tra lại dữ liệu")
 }else{
    let newData = {
        dateOfBirth:inputDate.value,
        email: inputEmail.value,
        fullName:inputFullname.value,
        gender:inputGender.value,
        password:inputPW.value,
        phoneNumber:inputSdt.value,
        role:"teacher",
        userCode:arrUser.length +1

    }
    await addData("users",newData)
    console.log(newData);
 }
    
    
    
})
