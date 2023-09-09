function checkValues(x, y, r){
    const x_values = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
    const r_values = [1, 1.5, 2, 2.5, 3];
    //console.log("x=", x);
    //console.log("y=", y);
    //console.log("r=", r);
    if(!x_values.includes(x) || !r_values.includes(r) || !isNumber(y)){
        //console.log('x inc ', x_values.includes(x));
        //console.log('r inc ', r_values.includes(r));
        //console.log("y isNum ", isNumber(y));
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
    let r;
    const x_radio = document.getElementsByName("x-value");
    const  r_radio = document.getElementsByName("r-value");
    for (let i=0; i<x_radio.length; i++){
        if (x_radio[i].checked) {
            x =  parseFloat(x_radio[i].value);
        }
    }
    for (let i=0; i<r_radio.length; i++){
        if (r_radio[i].checked) {
            r =  parseFloat(r_radio[i].value);
        }
    }
    const y =  parseFloat(document.getElementById("y-value").value.trim());
    console.log("x=", x);
    console.log("y=", y);
    console.log("r=", r);
    if(checkValues(x, y, r)){
            sendValues(x, y, r);
        }
    else{
            alert("Value error")
            //console.log("Value error");
        }
}