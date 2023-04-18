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
const stick = document.getElementById("stick");
const progressBar = document.getElementById("progress-bar");
const result = document.getElementById("result");
const triggerButton = document.getElementById("trigger-btn");
const startButton = document.getElementById("start-btn");

//секунд в единице измерения
const secondsInUnitOfMeasurement = 60*1000;

//for making test easier we may add these:
const offsetXZone = 0.08;


//*69/70 cause border also is in radius (width=35vw border=0.5vw)
const radius = bigCircle.offsetWidth/2 * 69/70;
const center_x = bigCircle.offsetLeft + bigCircle.offsetWidth/2;
const center_y = bigCircle.offsetTop + bigCircle.offsetHeight/2;
const leftZone = center_x - smallCircle.offsetWidth/2  - stick.offsetWidth/2 - radius*offsetXZone;
const rightZone = center_x + smallCircle.offsetWidth/2 +stick.offsetWidth/2 + radius*offsetXZone;



//IDK why we should divide by 57.(3), but it works
const speedForOneRotationPerMinute = (2*Math.PI*radius) / secondsInUnitOfMeasurement /(57+1/3);
const frequency = 40;
//range of random acceleration
const rangeOfRandomAcceleration = 10;
//for adding some more time after end:
const afterEndGap = 2;


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


let rightClicks = 0;
let wrongClicks = 0;
function Start(){
	rightClicks = 0; wrongClicks = 0;
	const timeOfTest = timeSlider.value * secondsInUnitOfMeasurement;
	//const timeOfTest = 0.25 * secondsInUnitOfMeasurement;
	const startVelocity = velocitySlider.value * speedForOneRotationPerMinute;
	let acceleration = 0;
	if(randomAccelerationButton.checked){
		acceleration = Math.random()*rangeOfRandomAcceleration*speedForOneRotationPerMinute;
	} else acceleration = accelerationSlider.value * speedForOneRotationPerMinute;

	result.textContent="";
	startButton.disabled = true;
	triggerButton.disabled = false;
	DisableAllStuffForSettingParameters();

	let velocity = startVelocity;
	const allRotationsCount = velocitySlider.value*timeSlider.value + (acceleration/speedForOneRotationPerMinute * (timeSlider.value) ** 2)/2;

	const startTime = Date.now();
	let updatePosition = setInterval(function (){
		const spentTime = (Date.now()-startTime);
		Rotation(spentTime, velocity);
		velocity = (spentTime/secondsInUnitOfMeasurement)*acceleration + startVelocity;
		progressBar.value =spentTime/timeOfTest;
	}, frequency)

	setTimeout(function (){
		clearInterval(updatePosition)
		if(needResultsButton.checked) {result.textContent = `Вы успели нажать на кнопку в нужный момент ${rightClicks}  раз(a), промохнулись ${wrongClicks} раз(а). Всего кружок сделал ${allRotationsCount.toFixed(2)} оборот(а/ов)`;}
		triggerButton.disabled = true;
		startButton.disabled = false;
		EnableAllStuffForSettingParameters();
	}, timeOfTest)
}


function Rotation(deltaTime, currentVelocity){
	const angle = ((currentVelocity*deltaTime*180)/(Math.PI*radius)) % 360 ;
	const x = center_x + radius * Math.sin(angle);
	const y = center_y - radius * Math.cos(angle);
	smallCircle.style.left = x + 'px';
	smallCircle.style.top = y + 'px';
}


function Trigger(){
	const x = smallCircle.offsetLeft;
	if((leftZone <= x) && (x <= rightZone) && (smallCircle.offsetTop<center_y)){
		rightClicks += 1;
	}
	else wrongClicks += 1;
	// console.log('x ', x);
	// console.log('left ', leftZone);
	// console.log('right ', rightZone)
}