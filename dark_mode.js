let darkMode = false;
let body = document.querySelector("body")
let header = document.querySelector("header")
let search_block = document.querySelector("#search_block")
let input_block = document.querySelector(".input_block")
let label =  document.querySelector("label")
let input = document.querySelector("#search_input")
let filter_block = document.querySelector("#filter_block")
let main = document.querySelector("main")

let elements=[];
elements.push(body);
elements.push(header);
elements.push(search_block);
elements.push(input_block);
elements.push(label);
elements.push(input);
elements.push(filter_block);
elements.push(main);

let darkModeBtn = document.getElementById("btn_dark_mode")
darkModeBtn.addEventListener("click",()=>toggleDarkMode())

function toggleDarkMode(){
    console.log(darkMode)
    darkMode = !darkMode;

        for(element of elements)
        {
            if(element!=undefined && element!=""){
            element.classList.toggle("dark")
            }
        }
    }

