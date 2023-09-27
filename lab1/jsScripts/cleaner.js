export function cleanLocalStorageAndTable(){
    localStorage.removeItem("history");
    cleanTable();
    const currentPage = document.getElementById("current-page");
    const lastPage = document.getElementById("last-page");
    currentPage.textContent = 1;
    lastPage.textContent = 1;
}


export function cleanTable(){
    const history = document.getElementById("history");
    const lines = history.getElementsByTagName("tr");
    if (lines.length > 2){
        for(let i=lines.length-1; i > 1; i--){
            history.deleteRow(i);
        }
    }
}