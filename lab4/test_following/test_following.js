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

const maxInTestBar = 100;

const speedForOneBarPerMinute = maxInTestBar / secondsInUnitOfMeasurement;

const frequencyOfUpdate = 10;
const frequencyOfChangingVelocitySign = 1000;
const rangeOfRandomAcceleration = 5;
const ratioOfVelocityForRedZone = 1.2;
const ratioForTimeOfMovingRedZone = 2;

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

let keepGoingLeft = false;
let keepGoingRight = false;
function handleKeyPress(event) {
    const code = event.keyCode;
    if(code === 37){
        keepGoingLeft = true;
        keepGoingRight = false;
    }
    else if(code === 39){
        keepGoingLeft = false;
        keepGoingRight = true;
    }
}


function handleKeyUp(event) {
    const code = event.keyCode;
    if(code === 37){
        keepGoingLeft = false;
    }
    else if(code === 39){
        keepGoingRight = false;
    }
}


let currentLeftOfRedZone = redZone.offsetLeft;
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
    document.addEventListener("keyup", handleKeyUp)

    velocity = startVelocity;

    const startTime = Date.now();
    //todo сделать когда заполнено по максимуму или наоборот 0 - менять знак возможно с рандомной задержкой (не знаю надо или нет)
    let updatePosition = setInterval(function (){
        let spentTime = Date.now() - startTime;

        if((redZone.offsetLeft > testBar.offsetWidth*testBar.value/maxInTestBar) || (redZone.offsetLeft+redZone.offsetWidth < testBar.offsetWidth*testBar.value/maxInTestBar)) timeOutOfZone += frequencyOfUpdate
        testBar.value += (frequencyOfUpdate)*velocity;

        if(velocity >= 0) velocity +=(frequencyOfUpdate/secondsInUnitOfMeasurement)*acceleration;
        else velocity -=(frequencyOfUpdate/secondsInUnitOfMeasurement)*acceleration;

        if(keepGoingLeft){
            leftTriggerButton.click();
        }
        if(keepGoingRight){
            rightTriggerButton.click();
        }
        //also should work. In case of getting problems with acceleration use this code
        // if(velocity >= 0) velocity = (spentTime/secondsInUnitOfMeasurement)*acceleration + startVelocity;
        // else velocity =velocity = -1*((spentTime/secondsInUnitOfMeasurement)*acceleration + startVelocity);
        progressBar.value =spentTime/timeOfTest;
    }, frequencyOfUpdate);

    let updateSighOfVelocity = setInterval(function () {
        if(Math.random()>=0.5)velocity *= -1;
    }, frequencyOfChangingVelocitySign);


    setTimeout(function (){
        clearInterval(updatePosition)
        clearInterval(updateSighOfVelocity)
        testBar.value = maxInTestBar/2;
        redZone.style.left = 45+'%';
        currentLeftOfRedZone = redZone.offsetLeft;
        if(needResultsButton.checked) {result.textContent = `You were out of red zone for ${timeOutOfZone/1000} second(s) of ${timeOfTest/1000} seconds`}
        leftTriggerButton.disabled = true;
        rightTriggerButton.disabled = true;
        startButton.disabled = false;
        EnableAllStuffForSettingParameters();
    }, timeOfTest)
}


function Trigger(direction){

    if (direction === 'left') {

        for(let i = 0; i < ratioForTimeOfMovingRedZone; i++){
            setTimeout(function () {
                currentLeftOfRedZone -= ratioOfVelocityForRedZone * frequencyOfUpdate *(testBar.offsetWidth / maxInTestBar) * Math.abs(velocity);
                currentLeftOfRedZone = Math.max(currentLeftOfRedZone, 0);
                redZone.style.left =  currentLeftOfRedZone + 'px';
            }, frequencyOfUpdate);
        }


    } else if (direction === 'right') {

        for(let i = 0; i < ratioForTimeOfMovingRedZone; i++){
            setTimeout(function () {
                currentLeftOfRedZone += ratioOfVelocityForRedZone * frequencyOfUpdate *(testBar.offsetWidth / maxInTestBar) * Math.abs(velocity);
                currentLeftOfRedZone = Math.min(currentLeftOfRedZone, testBar.offsetWidth-redZone.offsetWidth+redZone.offsetWidth/30);
                redZone.style.left = currentLeftOfRedZone + 'px';
            }, frequencyOfUpdate);
        }
    }
}