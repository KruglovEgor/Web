let infoBox;

document.addEventListener("DOMContentLoaded", function () {
    infoBox = document.getElementById("info-box");
});

function showInfo(e){
    infoBox.innerText = e.target.getAttribute("data-info");
    infoBox.style.display = "block";
    const x = e.target.getAttribute("cx");
    const y = e.target.getAttribute("cy");

    //todo пофиксить если совсем справа или снизу то невидно

    infoBox.style.left = x;
    infoBox.style.top = y;
}


function hideInfo(){
    infoBox.style.display = "none";
}