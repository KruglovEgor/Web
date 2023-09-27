import {saveLastR} from "./saveValuesOnUpdate";
import {saveLastY} from "./saveValuesOnUpdate";
import {saveLastX} from "./saveValuesOnUpdate";
import {validateValues} from './sender';
import {cleanLocalStorageAndTable} from './cleaner';
import {previousPage} from "./pageHistory";
import {nextPage} from "./pageHistory";


const yValueInput = document.getElementById("y-value");
yValueInput.addEventListener("input", saveLastY);


const radioInputs = document.querySelectorAll('input[type="radio"]');
radioInputs.forEach(input => {
    input.addEventListener('click', function() {
        const value = this.value;
        saveLastX(value);
    });
});


const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');

checkboxInputs.forEach(input => {
    input.addEventListener('click', function () {
        saveLastR();
    })
})


const sendButton = document.getElementById("send-button");
sendButton.addEventListener('click', function () {
    validateValues();
})

const cleanButton = document.getElementById("clear-button");
cleanButton.addEventListener('click', function () {
    cleanLocalStorageAndTable();
})

const previousButton = document.getElementById("prev-button");
previousButton.addEventListener('click', function () {
    previousPage()
});


const nextButton = document.getElementById("next-button");
nextButton.addEventListener('click', function () {
    nextPage();
})
