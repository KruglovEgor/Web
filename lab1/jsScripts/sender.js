function checkValues(x, y, r){
    const x_values = ["-3", "-2", "-1", "0", "1", "2", "3", "4", "5"];
    const r_values = ["1", "1.5", "2", "2.5", "3"];
    if(!x_values.includes(x) || !r_values.includes(r)){
        return false
    }


}

function sendValues(){
    const x_radio = document.getElementsByName("x-value");
    const  r_radio = document.getElementsByName("r-value");
    for (let i=0; i<x_radio.length; i++){
        if (x_radio[i].checked) {
            console.log("x ", x_radio[i].value);
        }
    }
    for (let i=0; i<r_radio.length; i++){
        if (r_radio[i].checked) {
            console.log("r ", r_radio[i].value);
        }
    }


}