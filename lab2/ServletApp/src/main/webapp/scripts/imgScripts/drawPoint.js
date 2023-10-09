//todo check all code. Maybe add all document-items in listener after page is downloaded
//todo maybe combine different listeners
//todo maybe change names of files and directories
//todo maybe add bundle

function drawPoint(x, y, r){
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle"); // Создаем элемент точки (круг)
    const rValue = parseFloat(r);

    const width = graphic.offsetWidth;
    const height = graphic.offsetHeight;
    const radiusCircle = 1.5;
    const xCircle = 50 + x/(rValue*rScale)*100 - radiusCircle/width;
    const yCircle = 50 - (y/(rValue*rScale)) * 100 - radiusCircle/height;

    point.setAttribute("cx", xCircle+"%");
    point.setAttribute("cy", yCircle+"%");
    point.setAttribute("r", radiusCircle.toString());
    point.setAttribute("fill", "red");

    graphic.appendChild(point);
}