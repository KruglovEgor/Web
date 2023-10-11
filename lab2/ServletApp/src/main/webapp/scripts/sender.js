async function sendValues(x, y, r, type) {
    const path = "./controller";
    const data = new URLSearchParams();
    data.append("type", type);
    data.append("x", x);
    data.append("y", y);
    data.append("r", r);

    try {
        const response = await fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data.toString(),
        });

        if(!response.ok){
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        else {
            const json = await response.json();
            myHistory.push(json);
            newElementInHistory(json.x, json.y, json.r, json.time, json.executionTime, json.hit);
            points.push([json.x, json.y]);
            if(rGraphic.value === json.r.toString()){
                drawPoint(json.x, json.y, json.r);
            }
            else {
                rGraphic.value = json.r;
                resizeGraphic(json.r);
            }
        }
    }

    catch (error) {
        serverError.textContent = error;
    }
}

