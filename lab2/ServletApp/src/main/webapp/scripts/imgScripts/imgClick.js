//we have 5/2=2.5 radius in width and height
const rScale = 2.5;

function checkHitByClick(event){
    const graphic = document.getElementById("graphic");
    const r = document.getElementById("r-value");
    if(validateR(r.value)){
        const rValue = parseFloat(r.value);
        // console.log("event_y", event.y);
        // console.log("event_Offset", event.offsetY);
        // console.log("event_client", event.clientY);
        // console.log("graphic_y", graphic.y);
        // console.log("graphic_offsetTop", graphic.offsetTop);
        // console.log("graphic_clientHeight", graphic.clientHeight);
        // console.log("graphic_clientTop", graphic.clientTop);
        // console.log("graphic_scrollHeight", graphic.scrollHeight);

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