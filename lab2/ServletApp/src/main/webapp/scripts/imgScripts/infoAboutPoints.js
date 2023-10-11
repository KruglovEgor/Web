
function showInfo(e){
    console.log("showed")
    infoBox.innerText = e.target.getAttribute("data-info");
    infoBox.style.display = "block";

    const x = e.clientX+"px";
    const y = e.clientY+"px";

    infoBox.style.left = x;
    infoBox.style.top = y;
}


function hideInfo(){
    console.log("hided");
    infoBox.style.display = "none";
}