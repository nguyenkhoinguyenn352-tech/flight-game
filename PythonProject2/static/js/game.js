const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Plane
let planeX = 100;
let planeY = 200;

function drawPlane() {
    ctx.fillStyle = "red";
    ctx.fillRect(planeX, planeY, 40, 20);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlane();
    requestAnimationFrame(update);
}

update();
// ====== CANVAS SETUP ======
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ====== GAME STATE ======
let fuel = 100;
let cityIndex = 0;
let gameOver = false;
let win = false;

// ====== CITIES & WEATHER ======
const cities = [
    { name: "Tokyo", weather: "rain" },
    { name: "London", weather: "wind" },
    { name: "Dubai", weather: "hot" },
    { name: "VIP City", weather: "clear" }
];

// ====== PROGRESS ======
let progress = 0;
const progressSpeed = 0.05;

// ====== WEATHER EFFECT ======
function applyWeatherEffect() {
    let weather = cities[cityIndex].weather;

    if (weather === "rain") fuel -= 0.02;
    if (weather === "wind") fuel -= 0.03;
    if (weather === "hot") fuel -= 0.04;

    if (fuel <= 0) {
        fuel = 0;
        gameOver = true;
    }
}

// ====== CITY LOGIC ======
function reachNextCity() {
    cityIndex++;

    if (cityIndex >= cities.length - 1) {
        win = true;
        gameOver = true;
    }
}

// ====== PROGRESS LOGIC ======
function updateProgress() {
    progress += progressSpeed;

    if (progress >= 100) {
        progress = 0;
        reachNextCity();
    }
}

// ====== DRAW FUNCTIONS ======
function drawPlane() {
    ctx.fillStyle = "blue";
    ctx.fillRect(200, 200, 40, 20);
}

function drawHUD() {
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Fuel: " + Math.floor(fuel), 10, 20);
    ctx.fillText("City: " + cities[cityIndex].name, 10, 40);
}

function drawProgressBar() {
    const x = 10;
    const y = 70;
    const width = 200;
    const height = 15;

    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, width, height);

    ctx.fillStyle = "green";
    ctx.fillRect(x, y, width * (progress / 100), height);

    ctx.fillStyle = "black";
    ctx.fillText("Progress: " + Math.floor(progress) + "%", x, y - 5);
}

function drawEndScreen() {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";

    if (win) {
        ctx.fillText("YOU WIN!", 170, 200);
    } else {
        ctx.fillText("GAME OVER", 150, 200);
    }
}

// ====== GAME LOOP ======
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        applyWeatherEffect();
        updateProgress();
        drawPlane();
        drawHUD();
        drawProgressBar();
        requestAnimationFrame(gameLoop);
    } else {
        drawEndScreen();
    }
}

// ====== START GAME ======
gameLoop();
