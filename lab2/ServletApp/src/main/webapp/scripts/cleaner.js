function cleanSessionAndTable(){
    cleanTable();
    clenPoints();
    currentPage.textContent = 1;
    lastPage.textContent = 1;
    myHistory = [];
    const response =  fetch("./clean-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
}


function cleanTable(){
    const lines = historyTable.getElementsByTagName("tr");
    if (lines.length > 2){
        for(let i=lines.length-1; i > 1; i--){
            historyTable.deleteRow(i);
        }
    }
}


function clenPoints(){
    const points = graphic.querySelectorAll("circle");

    for(const point of points){
        graphic.removeChild(point);
    }

}