//todo check all code. Maybe add all document-items in listener after page is downloaded
//todo maybe combine different listeners
//todo maybe change names of files and directories
//todo maybe add bundle

function drawPointScript(xValue, yValue, rValue, hit){
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const width = graphic.offsetWidth;
    const height = graphic.offsetHeight;
    const radiusCircle = 3;
    const xCircle = 50 + xValue/(rValue*rScale)*100 - radiusCircle/width;
    const yCircle = 50 - (yValue/(rValue*rScale)) * 100 - radiusCircle/height;

    point.setAttribute("cx", xCircle+"%");
    point.setAttribute("cy", yCircle+"%");
    point.setAttribute("r", radiusCircle.toString());
    if(hit){
        point.setAttribute("fill", "green");
    }
    else {
        point.setAttribute("fill", "red");
    }
    point.setAttribute("data-info", "x="+xValue+"\ny="+yValue+"\nr="+rValue);

    overlay.appendChild(point);
    circles.push(point);
    point.addEventListener("mouseover", (e) => {
        showInfo(e);
    });
    point.addEventListener("mouseout",  () =>{
        hideInfo();
    });

}


function resizeGraphic(r){
    const rValue = parseFloat(r);
    clenPoints();
    for (const point of points){
        console.log(point);
        if(isPointFitsGraphic(point[0], point[1], rValue)){
            drawPointScript(point[0], point[1], rValue, point[2]);
        }
    }
}

function isPointFitsGraphic(xValue, yValue, rValue){
    return (-1.25*rValue <= xValue && xValue <= 1.25*rValue) && (-1.25*rValue <= yValue && yValue <= 1.25*rValue);
}