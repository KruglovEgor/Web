function cleanSessionAndTable(){
    cleanTable();
    clenPoints();
    points = [];
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
    for(const point of circles){
        point.removeEventListener("mouseenter", showInfo);
        point.removeEventListener("mouseleave", hideInfo);
        overlay.removeChild(point);
    }
    circles = [];

}