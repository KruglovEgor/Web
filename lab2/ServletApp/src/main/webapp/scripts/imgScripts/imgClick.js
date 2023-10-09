//we have 5/2=2.5 radius in width and height
const rScale = 2.5;
function checkHitByClick(event){

    if(validateR(rValueInput.value)){
        const rValue = parseFloat(rValueInput.value);
        const relativeY = event.clientY - graphic.getBoundingClientRect().top;
        const relativeX = event.clientX - graphic.getBoundingClientRect().left;
        const width = graphic.offsetWidth;
        const height = graphic.offsetHeight;
        const x = relativeX/width * rValue * rScale - 0.5*rValue*rScale;
        const y = 0.5*rValue*rScale - relativeY/height * rValue * rScale ;
        console.log("x=", x, "y=", y);
        validateValues(x, y, rValue, "click");
    }
    else {
        rError.textContent = "You must to choose R first. It must be float(2<R<5)."
    }
}