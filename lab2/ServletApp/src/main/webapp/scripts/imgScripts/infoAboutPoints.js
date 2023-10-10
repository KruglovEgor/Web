
//todo fix
function showInfo(point){
    const info = point.getAttribute("data-info");
    const x = point.cx;
    const y = point.cy;

    infoBox.style.left = x + "2%";
    infoBox.style.top = y;
    infoBox.textContent = info;
    infoBox.style.display = "block";
}

//todo fix
function hideInfo(){
    infoBox.style.display = "none";
}