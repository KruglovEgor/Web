function validateInputX(x){
    return xValues.includes(x);
}

function validateInputY(y){
    if (floatRegex.test(y)) {
        const yFloat = parseFloat(y);
        return -5<yFloat && yFloat<3;
    }
    else {
        return false;
    }
}

function validateR(r){
    if (floatRegex.test(r)){
        const rFloat = parseFloat(r);
        return 2<rFloat && rFloat<5;
    }
    else {
        return false;
    }
}

function validateInputValues(x, y, r){
    let isOk = true;
    if(!validateInputX(x)){
        const xError = document.getElementById("x-error");
        xError.textContent = "There is problem with x! Try to update the page.";
        isOk = false;
    }
    if(!validateInputY(y)){
        const yError = document.getElementById("y-error");
        yError.textContent = "There is problem with y! It must be float (-5<y<3)."
        isOk = false;
    }
    if(!validateR(r)){
        const rError = document.getElementById("r-error");
        rError.textContent = "There is problem with R! It must be float (2<r<5).";
        isOk = false;
    }

    if(isOk){
        sendValues(parseInt(x), parseFloat(y), parseFloat(r), "input");
    }
    return isOk;
}