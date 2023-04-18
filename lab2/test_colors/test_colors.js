const rectangle = document.getElementById("rectangle");
const startBtn = document.getElementById("start-btn");
const colorBtns = document.querySelectorAll(".color-btn");
const result = document.getElementById("result");
const numberofTests = 5;
let currentLogin = localStorage.getItem("login")
let intervalId;
let startTime;
let endTime;
let currentColor;
let allTime = 0;
let currentTest = 0;
let rightTests = 0;

function getRandomColor() {
    const colors = ["red", "blue", "green", "yellow"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function startTimer() {
    const min = 2;
    const max = 5;
    const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
    const remainingTime = document.createElement("div");
    remainingTime.textContent = randomTime;

    intervalId = setInterval(() => {
        const currentTime = parseInt(remainingTime.textContent);
        if (currentTime === 1) {
            clearInterval(intervalId);
            startGame();
        } else {
            remainingTime.textContent = currentTime - 1;
        }
    }, 1000);
}

function startGame() {
    currentColor = getRandomColor();
    rectangle.style.backgroundColor = currentColor;
    startTime = Date.now();

    colorBtns.forEach((btn) => {
        btn.addEventListener("click", checkAnswer);
    });
}


function checkAnswer(event) {
    currentTest++;
    endTime = Date.now();
    const userAnswer = event.target.id.slice(0, -4);
    if (userAnswer === currentColor) {
        //TODO fetch - send time in database
        result.textContent = `Правильно! Тест №${currentTest} из ${numberofTests}.`;
        rectangle.style.borderColor = "lime";
        allTime += endTime - startTime;
        rightTests++;
    } else {
        result.textContent = `Неправильно. Тест №${currentTest} из ${numberofTests}.`;
        rectangle.style.borderColor = "red";
    }
    colorBtns.forEach((btn) => {
        btn.removeEventListener("click", checkAnswer);
    });
    rectangle.style.backgroundColor = "white";
    if (currentTest === numberofTests){
        let averageTime = 0;
        if(rightTests !== 0){
            averageTime = Math.round(allTime/rightTests);
        }
        result.textContent = `Пройдено ${rightTests} тестов из ${numberofTests}. Среднее время: ${averageTime} мс`;
        fetch("/sendResultsOfColorTest?&" + currentLogin + "?&" + Date.now() + "?&" + rightTests + "?&" + (numberofTests - rightTests) + "?&" + averageTime,
            {"body": null, "method":  "GET"}).then(r =>{
            allTime = 0;
            currentTest = 0;
            rightTests = 0;
        })

    }
    startBtn.disabled = false;
    rectangle.innerHTML = "Вы увидите цвет. Нажмите кнопку того же цвета, как можно быстрее.";
    setTimeout(() => {
        result.textContent = "";
        rectangle.style.borderColor = "black";
        }, 2000);
}

startBtn.addEventListener("click", () => {
    rectangle.style.borderColor = "black";
    rectangle.innerHTML = "";
    startBtn.disabled = true;
    startTimer();
});