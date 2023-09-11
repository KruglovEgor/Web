function checkValues(x, y, r){
    const x_values = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
    const r_values = [1, 1.5, 2, 2.5, 3];
    if(!x_values.includes(x) || !r_values.includes(r) || !isNumber(y)){
        return false;
    }
    else return !(y < -5 || y > 3);
}


function isNumber(number){
    if (number != null && number !== "") {
        if (/-?\d+\.?\d*?/.test(number)) {
            return true;
        }
    }
    return false;
}


function sendValues(x, y, r) {
    const path = "phpScripts/main.php";
    let data = {
        "x": x,
        "y": y,
        "r": r
    };
    fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            response.text().then(result => {
                //console.log(result);
                const index_of_json = result.indexOf('{');
                if (index_of_json !== -1){
                    saveToLocalStorage(result.slice(index_of_json));
                    const json_data = JSON.parse(result.slice(index_of_json));
                    addRecord(json_data.x, json_data.y, json_data.r, json_data.time, json_data.execution_time, json_data.hit)
                }
                else {
                    alert(result)
                }
            })
            }
        )
}


function validateValues(){
    let x;
    let r = [];
    const x_radio = document.getElementsByName("x-value");
    const  r_checkbox = document.getElementsByName("r-value");
    let haveErrors = false;
    const xError = document.getElementById("x-error");
    xError.textContent = "";
    const rError = document.getElementById("r-error");
    rError.textContent = "";
    const  yError = document.getElementById("y-error");
    yError.textContent = "";

    for (let i=0; i<x_radio.length; i++){
        if (x_radio[i].checked) {
            x =  parseFloat(x_radio[i].value);
            break;
        }
    }
    if(isNaN(x)){
        xError.textContent = "You need to choose x!";
        haveErrors = true;
    }
    for (let i=0; i<r_checkbox.length; i++){
        if (r_checkbox[i].checked) {
            r.push(parseFloat(r_checkbox[i].value));
        }
    }
    if(r.length === 0){
        rError.textContent = "You have to choose at least one r!"
        haveErrors = true;
    }
    const y =  parseFloat(document.getElementById("y-value").value.trim());
    if (isNaN(y) || y === ""){
        yError.textContent = "You must enter y!";
    }
    else {
        if(y <= -5 || y >= 3) {
            yError.textContent = "It must be in (-5; 3)!"
        }
        else if (!haveErrors){
            for(let i = 0; i < r.length; i++){
                if(checkValues(x, y, r.at(i))){
                    sendValues(x, y, r.at(i));
                }
                else {
                    alert("It seems like you changed values of buttons. Try to update the page!")
                }
            }
        }
    }
}