//todo check all code. Maybe add all document-items in listener after page is downloaded
//todo maybe combine different listeners
//todo maybe change names of files and directories
//todo maybe add bundle

function drawPoint(xValue, yValue, rValue){
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const width = graphic.offsetWidth;
    const height = graphic.offsetHeight;
    const radiusCircle = 1.5;
    const xCircle = 50 + xValue/(rValue*rScale)*100 - radiusCircle/width;
    const yCircle = 50 - (yValue/(rValue*rScale)) * 100 - radiusCircle/height;

    point.setAttribute("cx", xCircle+"%");
    point.setAttribute("cy", yCircle+"%");
    point.setAttribute("r", radiusCircle.toString());
    point.setAttribute("fill", "red");
    point.setAttribute("data-info", "x="+xValue+"\ny="+yValue);

    overlay.appendChild(point);
    circles.push(point);
    point.addEventListener("mouseenter", showInfo(point));
    point.addEventListener("mouseleave", hideInfo);
}


function resizeGraphic(r){
    const rValue = parseFloat(r);
    //todo make cleaning (idk why it's not working just by cleanPoints();
    clenPoints();
    for (const point of points){
        if(isPointFitsGraphic(point[0], point[1], rValue)){
            drawPoint(point[0], point[1], rValue);
        }
    }
}

function isPointFitsGraphic(xValue, yValue, rValue){
    return (-1.25*rValue <= xValue && xValue <= 1.25*rValue) && (-1.25*rValue <= yValue && yValue <= 1.25*rValue);
}