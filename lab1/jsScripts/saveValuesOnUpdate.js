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
    const  r_checkbox = document.getElementsByName("r-value");
    const checked = [];
    for(let i=0; i <r_checkbox.length; i++){
        if(r_checkbox[i].checked){
            checked.push(r_checkbox[i].value);
        }
    }
    localStorage.setItem("r", JSON.stringify(checked));
    console.log("saved r=", JSON.stringify(checked));
}