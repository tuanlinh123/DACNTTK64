import { getData } from "../../firebase/firebaseMethod.js";

async function student() {
    let dataUser = await getData("users")
    let arrStudent = []
    dataUser.forEach(element => {
        if(element.role == "student"){
            arrStudent.push(element)
        }
    });
    return arrStudent
}
console.log(student());
let tableHtmls = document.querySelectorAll(".select")
console.log(tableHtmls);
tableHtmls.forEach(async (tableHtml)=>  {
    let arrStudent = JSON.parse(JSON.stringify(await student()))  ;
  
    console.log(arrStudent[0]);
    
    arrStudent.forEach(element => {
        if(tableHtml.value !== element.fullName){
            const option = document.createElement("option");
            option.value = element.fullName
       option.text = element.fullName
       tableHtml.append(option)
        }
        
    });
   

})

