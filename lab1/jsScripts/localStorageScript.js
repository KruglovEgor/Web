window.addEventListener("load", () => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    savedHistory.forEach(record => {
        const jsonRecord = JSON.parse(record);
        addRecord(jsonRecord.x, jsonRecord.y, jsonRecord.r, jsonRecord.time, jsonRecord.execution_time, jsonRecord.hit);
    });
});

function saveToLocalStorage(json_record) {
    const savedRecords = JSON.parse(localStorage.getItem("history")) || [];
    savedRecords.push(json_record);
    localStorage.setItem("history", JSON.stringify(savedRecords));
}