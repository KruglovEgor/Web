import {newElementInHistory} from './pageHistory';
import {saveToLocalStorage} from './localStorageScript';


const xValues = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
const rValues = [1, 1.5, 2, 2.5, 3];

function checkValues(x, y, r){
    if(!xValues.includes(x) || !rValues.includes(r) || !isNumber(y)){
        return false;
    }
    else return !(y < -5 || y > 3);
}


function isNumber(number){
    if (number != null && number !== "") {
        if (/-?\d+\.?\d*?/.test(number)) {
            return true;
        }
    }
    return false;
}




async function sendValues(x, y, r) {
    const formData = new FormData();
    formData.append("x", x);
    formData.append("y", y);
    formData.append("r", r);
    const path = "phpScripts/main.php";

    try {
        const response = await fetch(path, {
            method: "POST",
            body: formData
        });

        if(!response.ok){
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        else {
            const data = await response.json();
            newElementInHistory(data.x, data.y, data.r, data.time, data.execution_time, data.hit);
            saveToLocalStorage(data);
        }
    }

    catch (error) {
        const serverError = document.getElementById("server-error");
        serverError.textContent = error;
    }
}


export function validateValues(){

    const serverError = document.getElementById("server-error");
    serverError.textContent = "";

    let x;
    let r = [];
    const x_radio = document.getElementsByName("x-value");
    const  r_checkbox = document.getElementsByName("r-value");
    let haveErrors = false;
    const xError = document.getElementById("x-error");
    xError.textContent = "";
    const rError = document.getElementById("r-error");
    rError.textContent = "";
    const  yError = document.getElementById("y-error");
    yError.textContent = "";

    for (let i=0; i<x_radio.length; i++){
        if (x_radio[i].checked) {
            x =  parseFloat(x_radio[i].value);
            break;
        }
    }
    if(isNaN(x)){
        xError.textContent = "You need to choose x!";
        haveErrors = true;
    }
    for (let i=0; i<r_checkbox.length; i++){
        if (r_checkbox[i].checked) {
            r.push(parseFloat(r_checkbox[i].value));
        }
    }
    if(r.length === 0){
        rError.textContent = "You have to choose at least one r!"
        haveErrors = true;
    }
    const yStr = document.getElementById("y-value").value.trim();
    const y =  parseFloat(yStr);
    if (yStr === ""){
        yError.textContent = "You must enter y!";
    }
    else if(isNaN(y)){
        yError.textContent ="It must be float number!";
    }
    else if(yStr.search(/^-?[0-9]*\.?[0-9]*$/) === -1){
        yError.textContent = "Don't enter extra letters or any other symbols!";
    }
    else {
        if(y <= -5 || y >= 3) {
            yError.textContent = "It must be in (-5; 3)!"
        }
        else if (!haveErrors){
            for(let i = 0; i < r.length; i++){
                if(checkValues(x, y, r.at(i))){
                    sendValues(x, y, r.at(i));
                }
                else {
                    serverError.textContent = "It seems like you changed values of buttons. Try to update the page!";
                }
            }
        }
    }
}