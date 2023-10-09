function cleanSessionAndTable(){
    cleanTable();
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
    const history = document.getElementById("history");
    const lines = history.getElementsByTagName("tr");
    if (lines.length > 2){
        for(let i=lines.length-1; i > 1; i--){
            history.deleteRow(i);
        }
    }
}