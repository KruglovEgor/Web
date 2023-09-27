
export function addRecord(x, y, r, time, execution_time, hit) {
    const history = document.getElementById("history");
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
    hitCell.textContent = hit;
    if(hit === "TRUE"){
        hitCell.classList.add("green-text");
    }
    else {
        hitCell.classList.add("red-text");
    }
    newRecord.appendChild(hitCell);

    history.appendChild(newRecord);
}

