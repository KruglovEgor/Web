let table;
let points = [];

document.addEventListener("DOMContentLoaded", function () {
    table = document.getElementById("history-table");
    parseTable();
    console.log(points);
});


function parseTable(){
    let rows = table.getElementsByTagName("tr");
    let rValue = parseFloat(document.getElementById("show-r-value").textContent);
    for(let i = 0; i < rows.length; i++){
        let cells = rows[i].getElementsByTagName("td");

        let x = parseFloat(cells[0].textContent);
        let y = parseFloat(cells[1].textContent);
        let r = parseFloat(cells[2].textContent);
        let hit = cells[5].textContent;

        let point = [x, y, r, hit];
        drawPoint(x, y, r)
        points.push(point);
    }
}

function drawPoint(x, y, r){
    
}


function getColor(x, y, r){

}