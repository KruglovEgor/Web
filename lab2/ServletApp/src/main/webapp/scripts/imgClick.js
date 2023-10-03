
function checkHitByClick(event){
    const r = document.getElementById("r-value");
    const rError = document.getElementById("r-error");
    rError.textContent = "";
    if(validateR(r.value)){
        const rValue = parseFloat(r.value);
        console.log('x', event.x);
        console.log('y', event.y);
        console.log('client x', event.clientX);
        console.log('client y', event.clientY);
        console.log('page x', event.pageX);
        console.log('page y', event.pageY);
    }
    else {
        rError.textContent = "You must to choose R first. It must be float(2<R<5)."
    }
}