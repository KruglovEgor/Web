let historyTable;
let currentPage;
let lastPage;
let myHistory;
let graphic;
let xError;
let yError;
let rError;
let serverError;
let yValueInput;
let xValueInput;
let rValueInput;
let rGraphicError;
let rGraphic;
let overlay;
let points = [];
let circles = [];
let infoBox;


document.addEventListener("DOMContentLoaded", function () {

    historyTable = document.getElementById("history");
    currentPage = document.getElementById("current-page");
    lastPage = document.getElementById("last-page");

    graphic = document.getElementById("graphic");
    graphic.addEventListener('click', function (event) {
        checkHitByClick(event);
    })

    graphic.addEventListener("mouseenter", function () {
        console.log("img entered")
    })
    graphic.addEventListener("mouseover", function () {
        console.log("img over")
    })

    xError = document.getElementById("x-error");
    yError = document.getElementById("y-error");
    rError = document.getElementById("r-error");
    serverError = document.getElementById("server-error");

    yValueInput = document.getElementById("y-value");
    yValueInput.addEventListener("input", saveLastY);

    rValueInput = document.getElementById("r-value");
    rValueInput.addEventListener("input", saveLastR);


    xValueInput = document.getElementById("x-value");
    xValueInput.addEventListener("change", function () {
        saveLastX(this.value);
    });

    rGraphic = document.getElementById("r-graphic");
    rGraphicError = document.getElementById("r-graphic-error");
    overlay = document.getElementById("overlay");

    infoBox = document.getElementById("info-box")


    const resizeButton = document.getElementById("resize-graphic-button");
    resizeButton.addEventListener('click', function (){
        rGraphicError.textContent = "";
        if(validateR(rGraphic.value)){
            resizeGraphic(rGraphic.value);
            rValueInput.value = rGraphic.value;
        } else {
            rGraphicError.textContent = "There is problem with R. It must be float(2<R<5)"
        }
    })

    const sendButton = document.getElementById("send-button");
    sendButton.addEventListener('click', function () {
        validateInputValues(xValueInput.value, yValueInput.value, rValueInput.value);
    })

    const cleanButton = document.getElementById("clean-button");
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
