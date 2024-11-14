import { getData } from "../../firebase/firebaseMethod.js";

let htmlStudent = document.querySelector(".comment")

async function renderHtml(){
   let data = await getData("classDetail")
   console.log(data);
   
}
renderHtml()

