function moveNewPage(){
    cleanTable();
    const currentPage = document.getElementById("current-page");
    const lastPage = document.getElementById("last-page");
    lastPage.textContent = parseInt(lastPage.textContent) + 1;
    currentPage.textContent = lastPage.textContent;
}


function goToPage(number){
    cleanTable();
    const currentPage = document.getElementById("current-page");
    const lastPage = document.getElementById("last-page");
    currentPage.textContent = number;
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    if(number !== parseInt(lastPage.textContent)){
        for(let i = 0; i < 10; i++){
            addRecord(savedHistory[(number-1) * 10+ i].x,
                savedHistory[(number-1) * 10+ i].y,
                savedHistory[(number-1) * 10+ i].r,
                savedHistory[(number-1) * 10+ i].time,
                savedHistory[(number-1) * 10+ i].execution_time,
                savedHistory[(number-1) * 10+ i].hit)
        }
    }
    else {
        showLastPage(savedHistory);
    }
}



function previousPage(){
    const currentPage = document.getElementById("current-page");
    const numberOfPage = parseInt(currentPage.textContent) - 1;
    if(numberOfPage >= 1){
        currentPage.textContent = numberOfPage;
        goToPage(numberOfPage);
    }
}

function nextPage() {
    const currentPage = document.getElementById("current-page");
    const lastPage = document.getElementById("last-page");
    const numberOfPage = parseInt(currentPage.textContent) + 1;
    if(numberOfPage <= parseInt(lastPage.textContent)){
        goToPage(numberOfPage);
    }
}

function showLastPage(savedHistory){
    cleanTable();
    if(savedHistory.length % 10 === 0){
        if(savedHistory.length !== 0){
            goToPage(Math.floor(savedHistory.length / 10)+1);
        }
    }
    else {
        for(let i = 0; i < savedHistory.length % 10; i++){
            addRecord(savedHistory[Math.floor(savedHistory.length / 10) * 10+ i].x,
                savedHistory[Math.floor(savedHistory.length / 10) * 10+ i].y,
                savedHistory[Math.floor(savedHistory.length / 10) * 10+ i].r,
                savedHistory[Math.floor(savedHistory.length / 10) * 10+ i].time,
                savedHistory[Math.floor(savedHistory.length / 10) * 10+ i].execution_time,
                savedHistory[Math.floor(savedHistory.length / 10) * 10+ i].hit)
        }
    }
}


function newElementInHistory(x, y, r, time, execution_time, hit){
    const currentPage = document.getElementById("current-page");
    const lastPage = document.getElementById("last-page");
    if(currentPage.textContent !== lastPage.textContent){
        goToPage(parseInt(lastPage.textContent))
    }
    const history = document.getElementById("history");
    const lines = history.getElementsByTagName("tr");
    if(lines.length >= 12){
        moveNewPage();
    }
    addRecord(x, y, r, time, execution_time, hit);
}
