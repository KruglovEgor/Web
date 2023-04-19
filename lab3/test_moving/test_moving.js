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


const bigCircle = document.getElementById("big-circle");
const smallCircle = document.getElementById("small-circle");
const progressBar = document.getElementById("progress-bar");
const result = document.getElementById("result");
const triggerButton = document.getElementById("trigger-btn");
const startButton = document.getElementById("start-btn");

//секунд в единице измерения
const secondsInUnitOfMeasurement = 60*1000;

//*69/70 cause border also is in radius (width=35vw border=0.5vw)
const radius = bigCircle.offsetWidth/2 * 69/70;
const center_x = bigCircle.offsetLeft + bigCircle.offsetWidth/2;
const center_y = bigCircle.offsetTop + bigCircle.offsetHeight/2;


const speedForOneRotationPerMinute = (2*Math.PI*radius) / secondsInUnitOfMeasurement /(180/Math.PI);
const frequency = 10;
//range of random acceleration
const rangeOfRandomAcceleration = 10;


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


let sumOfDistanceFromStick = 0;
let countOfClicks = 0;
let allRotationsCount = 0;
function Start(){
	sumOfDistanceFromStick = 0; countOfClicks = 0; allRotationsCount = 0;
	const timeOfTest = timeSlider.value * secondsInUnitOfMeasurement;
	const startVelocity = velocitySlider.value * speedForOneRotationPerMinute;
	let acceleration = 0;
	if(randomAccelerationButton.checked){
		acceleration = Math.round(Math.random()*rangeOfRandomAcceleration)*speedForOneRotationPerMinute;
	} else acceleration = accelerationSlider.value * speedForOneRotationPerMinute;

	result.textContent="";
	startButton.disabled = true;
	triggerButton.disabled = false;
	DisableAllStuffForSettingParameters();

	let velocity = startVelocity;
	
	const startTime = Date.now();
	let updatePosition = setInterval(function (){
		const spentTime = (Date.now()-startTime);
		Rotation(spentTime, velocity);
		velocity = (spentTime/secondsInUnitOfMeasurement)*acceleration + startVelocity;
		progressBar.value =spentTime/timeOfTest;
	}, frequency)

	setTimeout(function (){
		clearInterval(updatePosition)
		if(needResultsButton.checked) {result.textContent = `Your accuracy: ${(sumOfDistanceFromStick/countOfClicks).toFixed(2)}, Count of clicks: ${countOfClicks}, Count of spins: ${allRotationsCount.toFixed(2)}`;}
		triggerButton.disabled = true;
		startButton.disabled = false;
		EnableAllStuffForSettingParameters();
	}, timeOfTest)
}


function Rotation(deltaTime, currentVelocity){
	const previousX = smallCircle.offsetLeft+smallCircle.offsetWidth/2;
	const angle = ((currentVelocity*deltaTime*180)/(Math.PI*radius)) % 360 ;
	const x = Math.floor(center_x + radius * Math.sin(angle));
	const y = Math.floor(center_y - radius * Math.cos(angle));

	if ((previousX < center_x) && (x + smallCircle.offsetWidth/2 >= center_x) && (y < center_y)){allRotationsCount++;}
	smallCircle.style.left = x + 'px';
	smallCircle.style.top = y + 'px';
}


function Trigger(){
	const x = smallCircle.offsetLeft;
	const y = smallCircle.offsetTop;
	let sign = 1;
	if(x<center_x){
		sign = -1
	}
	//Math.floor(bigCircle.offsetWidth/140) cause border is 1/70
	sumOfDistanceFromStick += sign*(Math.sqrt((x-center_x)**2 + (y-Math.floor(bigCircle.offsetWidth/140))**2)/(2*radius));
	countOfClicks += 1;
}
