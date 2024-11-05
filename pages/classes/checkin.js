import { getData } from "../../firebase/firebaseMethod.js";

async function student() {
  let dataUser = await getData("users");
  let arrStudent = [];
  dataUser.forEach((element) => {
    if (element.role == "student") {
      arrStudent.push(element);
    }
  });
  return arrStudent;
}
console.log(student());
let tableHtmls = document.querySelectorAll(".select");
let arrCheckin = [];
tableHtmls.forEach(async (tableHtml) => {
  let arrStudent = JSON.parse(JSON.stringify(await student()));
// console.log(arrStudent);

 
  function updateValues() {
      arrCheckin = [];
    tableHtmls.forEach(select => {
        arrCheckin.push(select.value);
        // console.log(arrCheckin);
        
        localStorage.setItem("arrCheckin",JSON.stringify(arrCheckin))
    });
    

  }
  tableHtmls.forEach(select => {
    select.addEventListener("change", updateValues);
  });

let getArrCheckIn = JSON.parse(localStorage.getItem("arrCheckin"))
    // console.log(getArrCheckIn);
      let check = true
      arrStudent.forEach((element) => {
        getArrCheckIn.forEach(checkName => {
            
            console.log(element.fullName);
            console.log(element.checkName);
            if (element.fullName == checkName) {
                check = false
                console.log("hello");
                
                
              }
        })
       if(check == true){
        const option = document.createElement("option");
        option.value = element.fullName;
        option.text = element.fullName;
        tableHtml.append(option);
       }
      });
  updateValues()
});
