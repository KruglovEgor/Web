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
             document.open();
             document.write(await response.text());
             document.close();
        }
    }

    catch (error) {
        serverError.textContent = error;
    }
}

