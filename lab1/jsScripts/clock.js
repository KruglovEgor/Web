
function updateClock(){
    const clock = document.getElementById("clock");
    const now = new Date();
    clock.textContent = now.toLocaleString();
    console.log(now.toLocaleString())
}

setInterval(updateClock, 1000);