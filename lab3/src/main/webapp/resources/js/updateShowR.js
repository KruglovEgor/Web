let showR;
let slider;

document.addEventListener("DOMContentLoaded", function () {
    showR = document.getElementById("show-r-value");
    slider = document.getElementById("input-form:r-value_hidden");
});

function updateShowR(){
    showR.innerHTML = slider.value;
}