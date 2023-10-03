
async function sendValues(x, y, r) {
    const formData = new FormData();
    formData.append("x", x);
    formData.append("y", y);
    formData.append("r", r);
    const path = "phpScripts/main.php";

    try {
        const response = await fetch(path, {
            method: "POST",
            body: formData
        });

        if(!response.ok){
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        else {
            const data = await response.json();
            newElementInHistory(data.x, data.y, data.r, data.time, data.execution_time, data.hit);
            saveToLocalStorage(data);
        }
    }

    catch (error) {
        const serverError = document.getElementById("server-error");
        serverError.textContent = error;
    }
}

