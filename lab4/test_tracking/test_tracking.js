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
//range of random acceleration
const rangeOfRandomAcceleration = 5;
const leftRedZone = 45;
const rightRedZone = 55;

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
function Start(){
    timeOutOfZone = 0;
    const timeOfTest = timeSlider.value * secondsInUnitOfMeasurement;
    //fot quick tests
    //const timeOfTest = 1 * secondsInUnitOfMeasurement;
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


    let velocity = startVelocity;

    const startTime = Date.now();
    let updatePosition = setInterval(function (){
        let spentTime = Date.now() - startTime;
        if ((testBar.value < leftRedZone) || (testBar.value>rightRedZone)) timeOutOfZone+=frequencyOfUpdate;
        testBar.value += (frequencyOfUpdate)*velocity;
        console.log(testBar.value, spentTime);
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


function Trigger(direction){
    if(direction === 'left'){
        testBar.value -= 5;
    }
    else if(direction === 'right') testBar.value += 5;
}