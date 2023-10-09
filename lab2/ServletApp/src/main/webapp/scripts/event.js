


document.addEventListener("DOMContentLoaded", function () {


    const img = document.getElementById("graphic");
    img.addEventListener('click', function (event) {
        checkHitByClick(event);
    })


    const yValueInput = document.getElementById("y-value");
    yValueInput.addEventListener("input", saveLastY);

    const rValueInput = document.getElementById("r-value");
    rValueInput.addEventListener("input", saveLastR);


    const xValueInput = document.getElementById("x-value");
    xValueInput.addEventListener("change", function () {
        saveLastX(this.value);
    });


    const sendButton = document.getElementById("send-button");
    sendButton.addEventListener('click', function () {
        validateInputValues(xValueInput.value, yValueInput.value, rValueInput.value);
    })

    const cleanButton = document.getElementById("clear-button");
    cleanButton.addEventListener('click', function () {
        cleanSessionAndTable();
    })

    const previousButton = document.getElementById("prev-button");
    previousButton.addEventListener('click', function () {
        previousPage()
    });


    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener('click', function () {
        nextPage();
    })
});
