function newElementInHistory(x, y, r, time, executionTime, hit){
    if(currentPage.textContent !== lastPage.textContent){
        goToPage(parseInt(lastPage.textContent))
    }
    const lines = historyTable.getElementsByTagName("tr");
    if(lines.length >= 12){
        moveNewPage();
    }
    drawRecord(x, y, r, time, executionTime, hit);
}

function drawRecord(x, y, r, time, execution_time, hit) {
    const newRecord = document.createElement("tr");
    const xCell = document.createElement("th");
    xCell.textContent = x;
    newRecord.appendChild(xCell);

    const yCell = document.createElement("th");
    yCell.textContent = y;
    newRecord.appendChild(yCell);

    const rCell = document.createElement("th");
    rCell.textContent = r;
    newRecord.appendChild(rCell);

    const timeCell = document.createElement("th");
    timeCell.textContent = time;
    newRecord.appendChild(timeCell);

    const executionCell = document.createElement("th");
    executionCell.textContent = execution_time;
    newRecord.appendChild(executionCell);

    const hitCell = document.createElement("th");
    hitCell.textContent = hit.toUpperCase();
    if(hit === "true"){
        hitCell.classList.add("green-text");
    }
    else {
        hitCell.classList.add("red-text");
    }
    newRecord.appendChild(hitCell);

    historyTable.appendChild(newRecord);
}

