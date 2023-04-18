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

let sumsOfDistanceFromStick = [];
let countsOfClicks = [];

for (let i =0; i<bigCircles.length; i++){
    sumsOfDistanceFromStick[i] = 0;
    countsOfClicks[i]=0;
}

//*69/70 cause border also is in radius (width=35vw border=0.5vw)
const radius = bigCircles.item(0).offsetWidth/2 * 39/40;
const centers_x = [];
const centers_y = [];
for(let i = 0; i<bigCircles.length; i++){
    centers_x.push(bigCircles.item(i).offsetLeft + bigCircles.item(i).offsetWidth/2);
    centers_y.push(bigCircles.item(i).offsetTop + bigCircles.item(i).offsetHeight/2);
}


const speedForOneRotationPerMinute = (2*Math.PI*radius) / secondsInUnitOfMeasurement /(180/Math.PI);
const frequency = 10;
//range of random acceleration
const rangeOfRandomAcceleration = 10;


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
    for (let i =0; i<bigCircles.length; i++){
        sumsOfDistanceFromStick[i] = 0;
        countsOfClicks[i]=0;
    }
    const timeOfTest = timeSlider.value * secondsInUnitOfMeasurement;
    //const  timeOfTest = 0.5 * secondsInUnitOfMeasurement;
    const startVelocities = [];
    for(let i = 0; i < velocitySliders.length; i++){
        startVelocities.push(velocitySliders.item(i).value*speedForOneRotationPerMinute)
    }
    let accelerations = [];
    for(let i = 0; i < accelerationSliders.length; i++){
        if(randomAccelerationButtons.item(i).checked){
            accelerations.push(Math.round(Math.random()*rangeOfRandomAcceleration)*speedForOneRotationPerMinute);
        }
        else accelerations.push(accelerationSliders.item(i).value*speedForOneRotationPerMinute);
    }

    result.textContent="";
    startButton.disabled = true;
    triggerButtons.forEach(elem => {elem.disabled=false;})
    DisableAllStuffForSettingParameters();

    let velocities = [];
    for(let i = 0; i<startVelocities.length; i++){
        velocities[i] = startVelocities[i];
    }

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
        if(needResultsButton.checked) {result.textContent = `Your results (average distance of missing, clicks, count of spins): `;
        for (let i = 0; i<bigCircles.length; i++){
            result.textContent += `[${(sumsOfDistanceFromStick[i]/countsOfClicks[i]).toFixed(2)}, ${countsOfClicks[i]}, ${allRotationsCounts[i]}]; `
            }
        }
        triggerButton.disabled = true;
        startButton.disabled = false;
        EnableAllStuffForSettingParameters();
    }, timeOfTest)
}


function Rotation(deltaTime, currentVelocity, id){
    const angle = ((currentVelocity*deltaTime*180)/(Math.PI*radius)) % 360 ;
    const x = centers_x[id] + radius * Math.sin(angle);
    const y = centers_y[id] - radius * Math.cos(angle);
    smallCircles[id].style.left = x + 'px';
    smallCircles[id].style.top = y + 'px';
}


function Trigger(id){
    //check if it's surely center of small circle
    const x = smallCircles[id].offsetLeft;
    const y = smallCircles[id].offsetTop;
    let sign = 1;
    if(x<centers_x[id]){
        sign = -1
    }
    //Math.round(2*radius/80) cause border is 1/40
    sumsOfDistanceFromStick[id] += sign*(Math.sqrt((x-centers_x[id])**2 + (y-Math.round(2*radius/80))**2)/(2*radius));
    countsOfClicks[id] += 1;
    console.log(sign*(Math.sqrt((x-centers_x[id])**2 + (y-Math.round(2*radius/80))**2)/(2*radius)));
}