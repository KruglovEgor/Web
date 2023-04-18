const randomAccelerationButtons = document.querySelectorAll(".random-acceleration");
const exactAccelerationButtons = document.querySelectorAll(".exact-acceleration");

const needResultsButton = document.getElementById("need-results");
const dontNeedResultsButton = document.getElementById("dont-need-results");

const timeSlider = document.getElementById("time-slider");
const timeValue = document.getElementById("time-value");

const velocitySliders = document.querySelectorAll(".velocity-slider");
const velocityValues = document.querySelectorAll(".velocity-value");

const accelerationSliders = document.querySelectorAll(".acceleration-slider");
const accelerationValues = document.querySelectorAll(".acceleration-value");

const accelerationStuffs = document.querySelectorAll(".acceleration-stuff");


timeSlider.oninput = function (){timeValue.innerHTML = this.value;}

for(let i = 0; i < velocitySliders.length; i++){
    velocitySliders.item(i).oninput = function (){velocityValues.item(i).innerHTML=this.value;}
}

for(let i = 0; i < accelerationSliders.length; i++){
    accelerationSliders.item(i).oninput = function (){accelerationValues.item(i).innerHTML=this.value;}
}

for(let i = 0; i < accelerationSliders.length; i++){
    RandomAcceleration(i);
}

function RandomAcceleration(id){
    accelerationStuffs.item(id).hidden=true;
}

function ExactAcceleration(id){
    accelerationStuffs.item(id).hidden=false;
}


const bigCircles = document.querySelectorAll(".big-circle");
const smallCircles = document.querySelectorAll(".small-circle");
const sticks = document.querySelectorAll(".stick");


const progressBar = document.getElementById("progress-bar");
const result = document.getElementById("result");

const triggerButtons = document.querySelectorAll(".trigger-btn");

const startButton = document.getElementById("start-btn");

//секунд в единице измерения
const secondsInUnitOfMeasurement = 60*1000;

//for making test easier we may add these:
const offsetXZone = 0.08;

let rightClicks = 0;
let wrongClicks = 0;

//*69/70 cause border also is in radius (width=35vw border=0.5vw)
const radius = bigCircles.item(0).offsetWidth/2 * 39/40;
const centers_x = [];
const leftZones = [];
const rightZones = [];
for(let i = 0; i<bigCircles.length; i++){
    centers_x.push(bigCircles.item(i).offsetLeft + bigCircles.item(i).offsetWidth/2);
    leftZones.push(centers_x[i] - smallCircles.item(i).offsetWidth/2 - sticks.item(i).offsetWidth/2 - radius*offsetXZone);
    rightZones.push(centers_x[i] + smallCircles.item(i).offsetWidth/2 + sticks.item(i).offsetWidth/2 + radius*offsetXZone)
}
const center_y = bigCircles.item(0).offsetTop + bigCircles.item(0).offsetHeight/2;



//IDK why we should divide by 57.(3), but it works
const speedForOneRotationPerMinute = (2*Math.PI*radius) / secondsInUnitOfMeasurement /(57+1/3);
// const speedForOneRotationPerMinute = (2*Math.PI*radius) / secondsInUnitOfMeasurement;
const frequency = 40;
//range of random acceleration
const rangeOfRandomAcceleration = 10;
//for adding some more time after end:
const afterEndGap = 2;


function DisableAllStuffForSettingParameters(){
    timeSlider.disabled = true;
    velocitySliders.forEach(elem => {elem.disabled=true;})
    accelerationSliders.forEach(elem => {elem.disabled=true;})
    randomAccelerationButtons.forEach(elem => {elem.disabled=true;})
    exactAccelerationButtons.forEach(elem => {elem.disabled=true;})
    needResultsButton.disabled = true; dontNeedResultsButton.disabled = true;
}


function EnableAllStuffForSettingParameters(){
    timeSlider.disabled = false;
    velocitySliders.forEach(elem => {elem.disabled=false;})
    accelerationSliders.forEach(elem => {elem.disabled=false;})
    randomAccelerationButtons.forEach(elem => {elem.disabled=false;})
    exactAccelerationButtons.forEach(elem => {elem.disabled=false;})
    needResultsButton.disabled = false; dontNeedResultsButton.disabled = false;
}



function Start(){
    rightClicks = 0; wrongClicks = 0;
    const timeOfTest = timeSlider.value * secondsInUnitOfMeasurement;

    const startVelocities = [];
    for(let i = 0; i < velocitySliders.length; i++){
        startVelocities.push(velocitySliders.item(i).value*speedForOneRotationPerMinute)
    }
    let accelerations = [];
    for(let i = 0; i < accelerationSliders.length; i++){
        if(randomAccelerationButtons.item(i).checked){
            accelerations.push(Math.random()*rangeOfRandomAcceleration*speedForOneRotationPerMinute);
        }
        else accelerations.push(accelerationSliders.item(i).value*speedForOneRotationPerMinute);
    }

    result.textContent="";
    startButton.disabled = true;
    triggerButtons.forEach(elem => {elem.disabled=false;})
    DisableAllStuffForSettingParameters();

    let velocities = startVelocities;

    const allRotationsCounts = [];
    for (let i = 0; i<bigCircles.length; i++){
        allRotationsCounts.push(startVelocities[i]/speedForOneRotationPerMinute*timeOfTest/secondsInUnitOfMeasurement + accelerations[i]/speedForOneRotationPerMinute*((timeOfTest/secondsInUnitOfMeasurement) ** 2)/2);
    }

    const startTime = Date.now();
    let updatePosition = setInterval(function (){
        const spentTime = (Date.now()-startTime);
        for(let i = 0; i < bigCircles.length; i++){
            Rotation(spentTime, velocities[i], i);
            velocities[i] = (spentTime/secondsInUnitOfMeasurement)*accelerations[i] + startVelocities[i];
        }
        progressBar.value =spentTime/timeOfTest;
    }, frequency)

    setTimeout(function (){
        clearInterval(updatePosition)
        //todo fix
        // if(needResultsButton.checked) {result.textContent = `Вы успели нажать на кнопку в нужный момент ${rightClicks}  раз(a), промохнулись ${wrongClicks} раз(а). Всего кружок сделал ${allRotationsCount.toFixed(2)} оборот(а/ов)`;}
        // triggerButton.disabled = true;
        // startButton.disabled = false;
        // EnableAllStuffForSettingParameters();
    }, timeOfTest)
}


function Rotation(deltaTime, currentVelocity, id){
    const angle = ((currentVelocity*deltaTime*180)/(Math.PI*radius)) % 360 ;
    const x = centers_x[id] + radius * Math.sin(angle);
    const y = center_y - radius * Math.cos(angle);
    smallCircles[id].style.left = x + 'px';
    smallCircles[id].style.top = y + 'px';
}


function Trigger(id){
    const x = smallCircles[id].offsetLeft;
    if((leftZones[id] <= x) && (x <= rightZones[id]) && (smallCircles[id].offsetTop<center_y)){
        rightClicks += 1;
    }
    else wrongClicks += 1;
}