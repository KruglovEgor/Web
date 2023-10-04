//we have 5/2=2.5 radius in width and height
const rScale = 2.5;

function checkHitByClick(event){
    const graphic = document.getElementById("graphic");
    const r = document.getElementById("r-value");
    const rError = document.getElementById("r-error");
    rError.textContent = "";
    console.log(validateR(r.value));
    if(validateR(r.value)){
        const rValue = parseFloat(r.value);
        const relativeY = event.y - graphic.offsetTop;
        const relativeX = event.x - graphic.offsetLeft;
        const width = graphic.offsetWidth;
        const height = graphic.offsetHeight;
        const x = relativeX/width * rValue * rScale - 0.5*rValue*rScale;
        const y = 0.5*rValue*rScale - relativeY/height * rValue * rScale ;
        console.log('x', x);
        console.log('y', y);
        //todo send request with x, y, rValue (all are numbers)
    }
    else {
        rError.textContent = "You must to choose R first. It must be float(2<R<5)."
    }
}