window.addEventListener("load", () => {


    //todo add working with history
    const lastPage = document.getElementById("last-page");
    const currentPage = document.getElementById("current-page");

    const savedX = JSON.parse(localStorage.getItem("x")) || "";
    const savedY = JSON.parse(localStorage.getItem("y")) || "";
    const savedR = JSON.parse(localStorage.getItem("r")) || "";
    
    if (savedX !== ""){
        const xValues = document.getElementById("x-value");
        for(let i=0; i<xValues.options.length; i++){
            const option = xValues.options[i];

            if(parseInt(option.value) === parseInt(savedX)){
                option.selected = true;
                break;
            }
        }
    }

    if (savedY !== ""){
        const yValue = document.getElementById("y-value");
        yValue.value = savedY;
    }

    if (savedR !== ""){
        const rValue = document.getElementById("r-value");
        rValue.value = savedR;
    }
});