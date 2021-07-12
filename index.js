const canvas = document.getElementById('gameMap');
const ctx = canvas.getContext('2d');

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let bounce = true;

ctx.lineWidth = 5;
let playerX = 5;
let playerY = 5;
let playerSpeed = 2;
let obdtacleSpeed = 7;
let obstacleX = [];
let obstacleY = 235;

function drawPlayer() {
    if (playerX < 3) playerX = 3;
    if (playerY < 3) playerY = 3;
    if (playerX > 978) playerX = 978;
    if (playerY > 478) playerY = 478;
    for (let i = 0; i < 25; i++) {
        if ((obstacleX[i] + 20) >= playerX && (obstacleX[i] - 20) <= playerX && obstacleY + 20 >= playerY && obstacleY - 20 <= playerY) {
            location.href="gameover.html";
        }
    }
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'red';
    ctx.strokeRect(playerX, playerY, 20, 20);
    ctx.fillRect(playerX, playerY, 20, 20);
}

function start(event) {
    if (event.key == 'ArrowLeft' || event.key == 'a' || event.key == 'A') {
        leftPressed = true;
    }
    else if (event.key == 'ArrowRight' || event.key == 'd' || event.key == 'D' || event.key == '6') {
        rightPressed = true;
    }
    else if (event.key == 'ArrowUp' || event.key == 'w' || event.key == 'W' || event.key == '8') {
        upPressed = true;
    }
    else if (event.key == 'ArrowDown' || event.key == 's' || event.key == 'S' || event.key == '2') {
        downPressed = true;
    }
}

function stop(event) {
    if (event.key == 'ArrowLeft' || event.key == 'a' || event.key == 'A' || event.key == '4') {
        leftPressed = false;
    }
    else if (event.key == 'ArrowRight' || event.key == 'd' || event.key == 'D' || event.key == '6') {
        rightPressed = false;
    }
    else if (event.key == 'ArrowUp' || event.key == 'w' || event.key == 'W' || event.key == '8') {
        upPressed = false;
    }
    else if (event.key == 'ArrowDown' || event.key == 's' || event.key == 'S' || event.key == '2') {
        downPressed = false;
    }
}

setInterval(function () {
    ctx.clearRect(0, 0, 1000, 500);
    if (bounce) {
        if (obstacleY > 465) {
            bounce = false;
        }
        obstacleY += obdtacleSpeed;
    }
    else {
        if (obstacleY < 10) {
            bounce = true;
        }
        obstacleY -= obdtacleSpeed;
    }
    drawPlayer();
    drawObstacle();
}, 20);

function move() {
    ctx.clearRect(0, 0, 1000, 500);
    if (leftPressed) {
        playerX -= playerSpeed;
    }
    if (rightPressed) {
        playerX += playerSpeed;
    }
    if (upPressed) {
        playerY -= playerSpeed;
    }
    if (downPressed) {
        playerY += playerSpeed;
    }
    drawPlayer();
    drawObstacle();
    setTimeout(move, 10);
}
move();



function drawObstacle() {
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'blue';
        obstacleX[i] = (i + 1) * 160;
        ctx.strokeRect(obstacleX[i], obstacleY, 20, 20);
        ctx.fillRect(obstacleX[i], obstacleY, 20, 20);
    }
}

document.addEventListener('keydown', start);
document.addEventListener('keyup', stop);