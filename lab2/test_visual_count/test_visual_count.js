const field = document.getElementById("field")
const startBtn = document.getElementById("start-btn");
const result = document.getElementById("result");
const parityBtns = document.querySelectorAll(".parity-btn");
const numberofTests = 5;
let countOfNumbers = 5;

let evenorodd;
let sum;

let startTime;
let endTime;
let allTime = 0;
let currentTest = 0;
let rightTests = 0;
let currentLogin = localStorage.getItem("login")
function getRandomNumberLessThanHungred() {
    const randomNumber = Math.floor(Math.random() * 100);
    sum += randomNumber;
    return randomNumber;
}

function MakeList(length_of_list){
    const list = [];
    sum = 0;
    evenorodd = 0;
    for(let i = 0; i < length_of_list; i++){
        list.push(getRandomNumberLessThanHungred());
    }
    evenorodd = sum % 2;
    return list;
}


function evenFunction(){
    endTime = Date.now();

    parityBtns.forEach((btn) => {
        btn.disabled = true;
    });

    currentTest++;
    if (evenorodd === 0){
        result.textContent = `Правильно! Тест №${currentTest} из ${numberofTests}.`;
        allTime += endTime - startTime;
        rightTests++;
        field.style.borderColor = "lime";
    } else {
        result.textContent = `Неправильно. Тест №${currentTest} из ${numberofTests}.`;
        field.style.borderColor = "red";
    }
    if (currentTest === numberofTests){
        let averageTime = 0;
        if(rightTests !== 0){
            averageTime = Math.round(allTime/rightTests);
        }
        result.textContent = `Пройдено ${rightTests} тестов из ${numberofTests}. Среднее время: ${averageTime} мс`;
        fetch("/sendResultsOfVisualCountTest?&" + currentLogin + "?&" + Date.now() +"?&" + rightTests + "?&" + (numberofTests - rightTests) + "?&" + averageTime,
            {"body": null, "method":  "GET"}).then(r =>{
            allTime = 0;
            currentTest = 0;
            rightTests = 0;
        })
        fetch(document.location.href="testChoose.html");
    }
    setTimeout(() => {
        field.innerHTML = "Вы увидите 5 чисел, сложите их в уме. Их сумма чётная или нет?";
        startBtn.disabled = false;
    }, 1000)
}

function oddFunction(){

    parityBtns.forEach((btn) => {
        btn.disabled = true;
    });

    currentTest++;
    endTime = Date.now();
    if (evenorodd === 1){
        result.textContent = `Правильно! Тест №${currentTest} из ${numberofTests}.`;
        allTime += endTime - startTime;
        rightTests++;
        field.style.borderColor = "lime";
    } else {
        result.textContent = `Неправильно. Тест №${currentTest} из ${numberofTests}.`;
        field.style.borderColor = "red";
    }
    if (currentTest === numberofTests){
        let averageTime = 0;
        if(rightTests !== 0){
            averageTime = Math.round(allTime/rightTests);
        }
        result.textContent = `Пройдено ${rightTests} тестов из ${numberofTests}. Среднее время: ${averageTime} мс`;
        fetch("/sendResultsOfVisualCountTest?&" + currentLogin + "?&" + Date.now() + "?&" + rightTests + "?&" + (numberofTests - rightTests) + "?&" + averageTime,
            {"body": null, "method":  "GET"}).then(r =>{
            allTime = 0;
            currentTest = 0;
            rightTests = 0;
        })
        fetch(document.location.href="testChoose.html");
    }
    setTimeout(() => {
        field.innerHTML = "Вы увидите 5 чисел, сложите их в уме. Их сумма чётная или нет?";
        startBtn.disabled = false;
    }, 1000)
}


parityBtns.forEach((btn) => {
    btn.disabled = true;
});
startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    field.style.borderColor = "black";
    field.innerHTML = MakeList(countOfNumbers).join(", ");

    parityBtns.forEach((btn) => {
        btn.disabled = false;
    });

    startTime = Date.now();
});
