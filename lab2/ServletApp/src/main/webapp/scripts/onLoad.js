const defaultR = 4;

window.addEventListener("load", () => {

    lastPage.textContent = Math.max(Math.ceil(myHistory.length / 10), 1);
    goToPage(Math.max(Math.ceil(myHistory.length / 10), 1));


    const savedX = JSON.parse(localStorage.getItem("x")) || "";
    const savedY = JSON.parse(localStorage.getItem("y")) || "";
    const savedR = JSON.parse(localStorage.getItem("r")) || "";
    
    if (savedX !== ""){
        for(let i=0; i<xValueInput.options.length; i++){
            const option = xValueInput.options[i];
            if(parseInt(option.value) === parseInt(savedX)){
                option.selected = true;
                break;
            }
        }
    }

    if (savedY !== ""){
        yValueInput.value = savedY;
    }

    if (savedR !== ""){
        rValueInput.value = savedR;
        rGraphic.value = savedR;
        resizeGraphic(savedR);
    }
    else {
        rGraphic.value = defaultR;
        resizeGraphic(defaultR);
    }
});