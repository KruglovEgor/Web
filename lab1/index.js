import './jsScripts/cleaner.js';
import './jsScripts/history.js';
import './jsScripts/localStorageScript.js';
import './jsScripts/pageHistory.js';
import './jsScripts/sender.js';
import './jsScripts/saveValuesOnUpdate.js';
import {saveLastR, saveLastX, saveLastY} from "./jsScripts/saveValuesOnUpdate";
import {validateValues} from "./jsScripts/sender";
import {cleanLocalStorageAndTable} from "./jsScripts/cleaner";
import {nextPage, previousPage} from "./jsScripts/pageHistory";

document.addEventListener("DOMContentLoaded", function () {

    let yValueInput = document.getElementById("y-value");
    yValueInput.addEventListener("input", saveLastY);

    let radioInputs = document.querySelectorAll('input[type="radio"]');

    radioInputs.forEach(input => {
        input.addEventListener('click', function() {
            const value = this.value;
            saveLastX(value);
        });
    });


    let checkboxInputs = document.querySelectorAll('input[type="checkbox"]');

    checkboxInputs.forEach(input => {
        input.addEventListener('click', function () {
            saveLastR();
        })
    })


    let sendButton = document.getElementById("send-button");
    sendButton.addEventListener('click', function () {
        validateValues();
    })

    let cleanButton = document.getElementById("clear-button");
    cleanButton.addEventListener('click', function () {
        cleanLocalStorageAndTable();
    })

    let previousButton = document.getElementById("prev-button");
    previousButton.addEventListener('click', function () {
        previousPage()
    });


    let nextButton = document.getElementById("next-button");
    nextButton.addEventListener('click', function () {
        nextPage();
    })

});