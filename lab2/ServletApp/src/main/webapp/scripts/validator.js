const xValues = ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"];
const floatRegex = "^-?\\d+\\.?\\d*$";

function validateX(x){
    return xValues.includes(x);
}

function validateY(y){
    if (y.search(floatRegex)){
        const yFloat = parseFloat(y);
        return -5<yFloat && yFloat<3;
    }
    else {
        return false;
    }
}

function validateR(r){
    if (r.search(floatRegex)){
        const rFloat = parseFloat(r);
        return 2<rFloat && rFloat<5;
    }
    else {
        return false;
    }
}

function validateValues(x, y, r){
    let isOk = true;
    if(!validateX(x)){
        const xError = document.getElementById("x-error");
        xError.textContent = "There is problem with x! Try to update the page.";
        isOk = false;
    }
    if(!validateY(y)){
        const yError = document.getElementById("y-error");
        yError.textContent = "There is problem with y! It must be float (-5<y<3)."
        isOk = false;
    }
    if(!validateR(r)){
        const rError = document.getElementById("r-error");
        rError.textContent = "There is problem with R! It must be float (2<r<5).";
        isOk = false;
    }
    return isOk;
}

