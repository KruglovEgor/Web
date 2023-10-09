function validateClickCoordinate(coordinate, r){
    if (floatRegex.test(coordinate)) {
        const coordinateFloat = parseFloat(coordinate);
        const rValue = parseFloat(r);
        return (-1.25*rValue<coordinateFloat && coordinateFloat<1.25*rValue);
    }
    else {
        return false;
    }
}


function validateClickValues(x, y, r){
    let isOk = true;
    if(!validateR(r)){
        rError.textContent = "There is problem with R! It must be float (2<r<5).";
        isOk = false;
    } else {
        if(!validateClickCoordinate(x, r)){
            xError.textContent = "There is problem with x! Try to update the page.";
            isOk = false;
        }
        if(!validateClickCoordinate(y, r)){
            yError.textContent = "There is problem with y! Try to update the page."
            isOk = false;
        }
    }

    if(isOk){
        sendValues(parseFloat(x), parseFloat(y), parseFloat(r), "click");
    }

    return isOk;
}