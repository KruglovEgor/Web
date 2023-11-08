let showR;
let slider;

document.addEventListener("DOMContentLoaded", function () {
    showR = document.getElementById("show-r-value");
    slider = document.getElementById("input-form:r-value_hidden");
});

function updateR(){
    showR.innerHTML = slider.value;

}


function resizeGraphic(r){
    const rValue = parseFloat(r);
    cleanPoints();
    for (const point of points){
        console.log(point);
        if(isPointFitsGraphic(point[0], point[1], rValue)){
            drawPointScript(point[0], point[1], rValue, point[2]);
        }
    }
}