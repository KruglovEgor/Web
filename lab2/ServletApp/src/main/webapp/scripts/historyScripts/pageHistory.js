
function moveNewPage(){
    cleanTable();
    lastPage.textContent = parseInt(lastPage.textContent) + 1;
    currentPage.textContent = lastPage.textContent;
}


function goToPage(number){
    cleanTable();
    currentPage.textContent = number;

    if(number !== parseInt(lastPage.textContent)){
        for(let i = 0; i < 10; i++){
            const record = myHistory[(number-1) * 10+ i];
            drawRecord(record.x,
                record.y,
                record.r,
                record.time,
                record.executionTime,
                record.hit)
        }
    }
    else {
        showLastPage();
    }
}



function previousPage(){
    const numberOfPage = parseInt(currentPage.textContent) - 1;
    if(numberOfPage >= 1){
        currentPage.textContent = numberOfPage;
        goToPage(numberOfPage);
    }
}

function nextPage() {
    const numberOfPage = parseInt(currentPage.textContent) + 1;
    if(numberOfPage <= parseInt(lastPage.textContent)){
        goToPage(numberOfPage);
    }
}

function showLastPage(){
    cleanTable();
    if(myHistory.length % 10 === 0){
        if(myHistory.length !== 0){
            for(let i = 0; i < 10; i++){
                const record = myHistory[Math.floor(myHistory.length / 10 - 1) * 10 + i];
                console.log("record", record);
                drawRecord(record.x,
                    record.y,
                    record.r,
                    record.time,
                    record.executionTime,
                    record.hit);
            }
        }
    }
    else {
        for(let i = 0; i < myHistory.length % 10; i++){
            const record = myHistory[Math.floor(myHistory.length / 10) * 10 + i];
            drawRecord(record.x,
                record.y,
                record.r,
                record.time,
                record.executionTime,
                record.hit);
        }
    }
}



