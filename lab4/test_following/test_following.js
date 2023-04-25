const randomAccelerationButton = document.getElementById("random-acceleration");
const exactAccelerationButton = document.getElementById("exact-acceleration");

const needResultsButton = document.getElementById("need-results");
const dontNeedResultsButton = document.getElementById("dont-need-results");

const timeSlider = document.getElementById("time-slider");
const timeValue = document.getElementById("time-slider-value");

const velocitySlider = document.getElementById("velocity-slider");
const velocityValue = document.getElementById("velocity-slider-value");

const accelerationSlider = document.getElementById("acceleration-slider");
const accelerationValue = document.getElementById("acceleration-slider-value");

const accelerationStuff = document.querySelectorAll(".acceleration-stuff");

timeSlider.oninput = function (){timeValue.innerHTML = this.value;}
velocitySlider.oninput = function (){velocityValue.innerHTML=this.value;}
accelerationSlider.oninput = function (){accelerationValue.innerHTML=this.value;}

RandomAcceleration();
function RandomAcceleration(){
    accelerationStuff.forEach(el => {el.hidden = true});
}

function ExactAcceleration(){
    accelerationStuff.forEach(el => {el.hidden = false});
}


const progressBar = document.getElementById("progress-bar");
const result = document.getElementById("result");
const startButton = document.getElementById("start-btn");
const testBar = document.getElementById("test-bar");
const redZone = document.getElementById("red-zone");
const leftTriggerButton = document.getElementById("left-trigger-btn");
const rightTriggerButton = document.getElementById("right-trigger-btn");



//секунд в единице измерения
const secondsInUnitOfMeasurement = 60*1000;


const speedForOneBarPerMinute = 100 / secondsInUnitOfMeasurement;

const frequencyOfUpdate = 10;
const frequencyOfChangingVelocitySign = 1000;
const rangeOfRandomAcceleration = 5;


function DisableAllStuffForSettingParameters(){
    timeSlider.disabled = true;
    velocitySlider.disabled = true;
    accelerationSlider.disabled = true;
    randomAccelerationButton.disabled = true; exactAccelerationButton.disabled=true;
    needResultsButton.disabled = true; dontNeedResultsButton.disabled = true;
}


function EnableAllStuffForSettingParameters(){
    timeSlider.disabled = false;
    velocitySlider.disabled = false;
    accelerationSlider.disabled = false;
    randomAccelerationButton.disabled = false; exactAccelerationButton.disabled=false;
    needResultsButton.disabled = false; dontNeedResultsButton.disabled = false;
}


function handleKeyPress(event) {
    const code = event.keyCode;
    if(code === 37){leftTriggerButton.click()}
    else if(code === 39){rightTriggerButton.click()}
}


let timeOutOfZone = 0;
let velocity = 0
function Start(){
    timeOutOfZone = 0; velocity = 0;
    //const timeOfTest = timeSlider.value * secondsInUnitOfMeasurement;
    //fot quick tests
    const timeOfTest = 0.5 * secondsInUnitOfMeasurement;
    const startVelocity = velocitySlider.value * speedForOneBarPerMinute;
    let acceleration = 0;
    if(randomAccelerationButton.checked){
        acceleration = Math.round(Math.random()*rangeOfRandomAcceleration)*speedForOneBarPerMinute;
    } else acceleration = accelerationSlider.value * speedForOneBarPerMinute;

    result.textContent="";
    startButton.disabled = true;
    leftTriggerButton.disabled = false;
    rightTriggerButton.disabled = false;
    DisableAllStuffForSettingParameters();
    document.addEventListener("keydown", handleKeyPress);


    velocity = startVelocity;

    const startTime = Date.now();
    let updatePosition = setInterval(function (){
        let spentTime = Date.now() - startTime;

        if((redZone.offsetLeft > testBar.offsetWidth*testBar.value/100) || (redZone.offsetLeft+redZone.offsetWidth < testBar.offsetWidth*testBar.value/100)) timeOutOfZone += frequencyOfUpdate
        console.log(redZone.offsetLeft, testBar.offsetWidth*testBar.value/100)
        testBar.value += (frequencyOfUpdate)*velocity;

        if(velocity >= 0) velocity +=(frequencyOfUpdate/secondsInUnitOfMeasurement)*acceleration;
        else velocity -=(frequencyOfUpdate/secondsInUnitOfMeasurement)*acceleration;
        //also should work. In case of getting problems with acceleration use this code
        // if(velocity >= 0) velocity = (spentTime/secondsInUnitOfMeasurement)*acceleration + startVelocity;
        // else velocity =velocity = -1*((spentTime/secondsInUnitOfMeasurement)*acceleration + startVelocity);
        progressBar.value =spentTime/timeOfTest;
    }, frequencyOfUpdate);

    let updateSighOfVelocity = setInterval(function () {
        if(Math.random()>=0.5)velocity *= -1;
    }, frequencyOfChangingVelocitySign);


    //todo расставить всё по центру
    setTimeout(function (){
        clearInterval(updatePosition)
        clearInterval(updateSighOfVelocity)
        if(needResultsButton.checked) {result.textContent = `You were out of red zone for ${timeOutOfZone/1000} second(s) of ${timeOfTest/1000} seconds`}
        leftTriggerButton.disabled = true;
        rightTriggerButton.disabled = true;
        startButton.disabled = false;
        EnableAllStuffForSettingParameters();
    }, timeOfTest)
}

//todo сделать движение более плавным.
// Возможно надо создать константное или почти константное (зависит от скорости и ускорения прогресса) ускорение для зоны, которое будет её тормозить
// а вместо смещения давать скорость только не знаю от чего должна зависеть скорость, она уже вряд ли может быть константой
// в теории можно упростить всё и брать так: скоростьКраснойЗоны = 2*х (в момент нажатия), а ускорение равняется = 1*х. и чтобы через n (маленькое) секунд скорость = 0, а через 2n уже скорость
// была отрицательна и зона двигалась влево. Тогда всё сводится к 1 клавише. Этот х скорее всего должен зависеть от скорости теста в данный момент.
// в альтернативном варианте получаем плавное движение (надеюсь) и что-то похожее на рыбалку в геншине
// -
// также для плавности можно попробовать создавать setInterval и setTime который убивает setInterval, только надо быть осторожным с константами
function Trigger(direction){
    if(direction === 'left'){
        redZone.style.left = (redZone.offsetLeft - 3*(testBar.offsetWidth/100))+'px'
    }
    else if(direction === 'right')
        redZone.style.left = (redZone.offsetLeft + 3*(testBar.offsetWidth/100))+'px';
}