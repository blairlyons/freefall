const world = document.getElementById("world");
const ball = document.getElementById("ball");
const airButton = document.getElementById("airButton");
const timeDisplay = document.getElementById("time");
const resistanceDisplay = document.getElementById("resistance");
const velocityDisplay = document.getElementById("velocity");
const gravityDisplay = document.getElementById("gravity");
const dragDisplay = document.getElementById("drag");

const mass = 1.0;
const resistance = 0.01;
const gravity = 9.8;
var playing = false;
var air = false;
var startTime = 0.0;
var lastTime = 0.0;
const forceGravity = mass * gravity;
var forceDrag = 0.0;
var velocity = 0.0;
var displacement = 0.0;

function getBallPosition() {
    return parseInt(ball.getBoundingClientRect().top);
}

function setBallPosition(newPos) {
    ball.style.top = newPos + "px";
}

function start() {
    playing = true;
    startTime = performance.now();
    lastTime = startTime;
    airButton.disabled = true;
}

function reset() {
    playing = false;
    velocity = 0.0;
    setBallPosition(10);
    timeDisplay.innerText = "0.0 s";
    velocityDisplay.innerText = "velocity = 0.0 m/s";
    gravityDisplay.innerText = "gravity = 0.0 N";
    dragDisplay.innerText = "drag = 0.0 N";
    airButton.disabled = false;
}

function toggleAir() {
    air = !air;
    airButton.innerText = air ? "remove air" : "add air";
    resistanceDisplay.innerText = "resistance = " + (air ? resistance : "0.00") + " kg/m";
    world.style.backgroundColor = air ? "lightblue" : "white";
}

function calculate() {    
    const dTime = (performance.now() - lastTime) / 100;
    lastTime = performance.now();
    forceDrag = air ? -resistance * velocity * velocity : 0.0;
    velocity += (forceGravity + forceDrag) * dTime / mass;
    displacement = velocity * dTime;
}

function formatNumber(number) {
    var numberStr = String(Math.round(10 * number) / 10);
    if (!numberStr.includes("."))
    {
        numberStr = numberStr + ".0";
    }
    return numberStr;
}

function update() {
    if (!playing) {
        return;
    }
    const posY = getBallPosition();
    if (posY >= 390) {
        playing = false;
        return;
    }
    calculate();
    setBallPosition(Math.min(posY + displacement, 390));
    timeDisplay.innerText = formatNumber((lastTime - startTime) / 1000) + " s";
    velocityDisplay.innerText = "velocity = " + formatNumber(velocity) + " m/s";
    gravityDisplay.innerText = "gravity = " + formatNumber(forceGravity) + " N";
    dragDisplay.innerText = "drag = " + formatNumber(forceDrag) + " N";
}

document.addEventListener("DOMContentLoaded", function(event) {
    ball.style.position = "absolute";
    setInterval("update()", 30);
});