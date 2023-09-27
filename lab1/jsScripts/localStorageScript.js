import {showLastPage} from './pageHistory';

window.addEventListener("load", () => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];

    const lastPage = document.getElementById("last-page");
    lastPage.textContent = Math.floor(savedHistory.length / 10) + 1;
    const currentPage = document.getElementById("current-page");
    currentPage.textContent = lastPage.textContent;
    showLastPage(savedHistory);

    const savedX = JSON.parse(localStorage.getItem("x")) || "";
    const savedY = JSON.parse(localStorage.getItem("y")) || "";
    const savedR = JSON.parse(localStorage.getItem("r")) || [];
    
    if (savedX !== ""){
        const x_radio = document.getElementsByName("x-value");
        for(let i=0; i<x_radio.length; i++){
            if(x_radio[i].value == parseInt(savedX)){
                x_radio[i].checked = true;
            }
        }
    }

    if (savedY !== ""){
        const yValue = document.getElementById("y-value");
        yValue.value = savedY;
    }

    if (savedR !== []){
        const  r_checkbox = document.getElementsByName("r-value");
        for(let i = 0; i<savedR.length; i++){
            for(let j = 0; j < r_checkbox.length; j++){
                if(r_checkbox[j].value === savedR[i]){
                    r_checkbox[j].checked = true;
                }
            }
        }
    }

});

export function saveToLocalStorage(json_record) {
    const savedRecords = JSON.parse(localStorage.getItem("history")) || [];
    savedRecords.push(json_record);
    localStorage.setItem("history", JSON.stringify(savedRecords));
}