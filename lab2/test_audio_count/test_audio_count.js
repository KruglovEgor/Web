const startBtn = document.getElementById("start-btn");
const result = document.getElementById("result");
const parityBtns = document.querySelectorAll(".parity-btn");
const numberofTests = 5;
let currentLogin = localStorage.getItem("login")
let countOfNumbers = 5;
let sum;

let startTime;
let endTime;
let allTime = 0;
let currentTest = 0;
let rightTests = 0;


function getRandomNumberLessThanHungred() {
    const randomNumber = Math.floor(Math.random() * 100);
    sum += randomNumber;
    return randomNumber;
}

function MakeList(length_of_list){
    const list = [];
    sum = 0;
    for(let i = 0; i < length_of_list; i++){
        list.push(getRandomNumberLessThanHungred());
    }
    return list;

}

function evenFunction(){
    endTime = Date.now();

    parityBtns.forEach((btn) => {
        btn.disabled = true;
    });

    currentTest++;
    if (sum % 2 === 0){
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
        fetch("/sendResultsOfAudioCountTest?&" + currentLogin + "?&" + Date.now() + "?&" + rightTests + "?&" + (numberofTests - rightTests) + "?&" + averageTime,
            {"body": null, "method":  "GET"}).then(r =>{
            allTime = 0;
            currentTest = 0;
            rightTests = 0;
        })
    }
    setTimeout(() => {
        field.innerHTML = "Вы услышите 5 чисел, сложите их в уме. Их сумма чётная или нет?";
        startBtn.disabled = false;
    }, 1000)
}

function oddFunction(){
    currentTest++;
    endTime = Date.now();

    parityBtns.forEach((btn) => {
        btn.disabled = true;
    });

    if (sum % 2 === 1){
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
        fetch("/sendResultsOfAudioCountTest?&" + currentLogin + "?&" + Date.now() + "?&" + rightTests + "?&" + (numberofTests - rightTests) + "?&" + averageTime,
            {"body": null, "method":  "GET"}).then(r =>{
            allTime = 0;
            currentTest = 0;
            rightTests = 0;
        })
    }
    setTimeout(() => {
        field.innerHTML = "Вы услышите 5 чисел, сложите их в уме. Их сумма чётная или нет?";
        startBtn.disabled = false;
    }, 1000)
}

function makeAudio(count){
    let txt = MakeList(count).join(" ");

    // for(i; i < (list.length-1); i++){
    //     responsiveVoice.speak(list.at(i).toString(), "Russian Female", {volume: 1});
    //     if (i === list.length-2){
    //         responsiveVoice.speak(list.at(length-1).toString(), "Russian Female", {volume: 1, onend: function (){turnOnButtonsAndStartTime()}});
    //     }
    // }
    responsiveVoice.speak(txt, "Russian Female", {volume:1, onend: function (){turnOnButtonsAndStartTime()}})
}


function turnOnButtonsAndStartTime(){
    parityBtns.forEach((btn) => {
        btn.disabled = false;
    });
    startTime = Date.now();
}



parityBtns.forEach((btn) => {
    btn.disabled = true;
});

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    field.style.borderColor = "black";
    makeAudio(countOfNumbers);
});

