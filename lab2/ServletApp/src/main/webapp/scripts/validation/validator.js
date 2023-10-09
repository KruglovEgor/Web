const xValues = ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"];
const floatRegexString = "^-?\\d+\\.?\\d*$";
const floatRegex = new RegExp(floatRegexString);


function validateValues(x, y, r, type){
    rError.textContent = "";
    xError.textContent = "";
    yError.textContent = "";
    serverError.textContent = "";

    if(type === "input"){
        validateInputValues(x, y, r);
    }
    else if (type === "click"){
        validateClickValues(x, y, r);
    }
    else {
        serverError.textContent = "There is problem with type! Try to update the page."
    }
}