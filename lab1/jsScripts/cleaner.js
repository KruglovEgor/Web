function clean(){
    localStorage.removeItem("history");
    const history = document.getElementById("history");
    const lines = history.getElementsByTagName("tr");
    if (lines.length > 2){
        for(let i=lines.length-1; i > 1; i--){
            history.deleteRow(i);
        }
    }
}