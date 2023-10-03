function saveLastX(value){
    localStorage.setItem("x", JSON.stringify(value));
    console.log("saved x=", JSON.stringify(value));
}


function saveLastY(){
    const yValue = document.getElementById("y-value").value;
    localStorage.setItem("y", JSON.stringify(yValue));
    console.log("saved y=", JSON.stringify(yValue));
}


function saveLastR(){
    const rValue = document.getElementById("r-value").value;
    localStorage.setItem("r", JSON.stringify(rValue));
    console.log("saved r=", JSON.stringify(rValue));
}