const canvas = document.getElementById('gameMap');
const ctx = canvas.getContext('2d');
const audio = document.getElementById('myAudio');

canvas.width = 1000;
canvas.height = 500;

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let heightBounce = true;
let widthBounce = true;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1000, 500)
ctx.lineWidth = 5;

let playerX = 5;
let playerY = 5;
let playerSpeed = 2;
let heightObstacleSpeed = 21;
let heightObstacleX = [];
let heightObstacleY = 235;
let widthObstacleSpeed = 29.8 + 14.9;
let widthObstacleX = 500;
let widthObstacleY = [];

function drawPlayer() {
    if (playerX < 3) playerX = 3;
    if (playerY < 3) playerY = 3;
    if (playerX > 978) playerX = 978;
    if (playerY > 478) playerY = 478;
    for (let i = 0; i < 25; i++) {
        if ((heightObstacleX[i] + 20) >= playerX && (heightObstacleX[i] - 20) <= playerX && heightObstacleY + 20 >= playerY && heightObstacleY - 20 <= playerY) {
            location.href="gameover.html";
        }
        if ((widthObstacleX + 20) >= playerX && (widthObstacleX - 20) <= playerX && widthObstacleY[i] + 20 >= playerY && widthObstacleY[i] - 20 <= playerY) {
            location.href="gameover.html";
        } // 게임오버 장면
        if (playerX >= 900 && playerX <= 1000 && playerY >= 400 && playerY <= 500) {
            location.href="file:///C:/Users/user/Desktop/World's%20Hardest%20Game/src/fifthStage.html";
        } // 다음 단계 이동
    }
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'red';
    ctx.strokeRect(playerX, playerY, 20, 20);
    ctx.fillRect(playerX, playerY, 20, 20); // 플레이어 그리기
    audio.play(); // 오디오 재생
}

function start(event) {
    if (event.key == 'a' || event.key == 'A' || event.key == '4') {
        leftPressed = true;
    }
    else if (event.key == 'd' || event.key == 'D' || event.key == '6') {
        rightPressed = true;
    }
    else if (event.key == 'w' || event.key == 'W' || event.key == '8') {
        upPressed = true;
    }
    else if (event.key == 's' || event.key == 'S' || event.key == '2' || event.key == '5') {
        downPressed = true;
    } //플레이어 이동
}

function stop(event) {
    if (event.key == 'a' || event.key == 'A' || event.key == '4') {
        leftPressed = false;
    }
    else if (event.key == 'd' || event.key == 'D' || event.key == '6') {
        rightPressed = false;
    }
    else if (event.key == 'w' || event.key == 'W' || event.key == '8') {
        upPressed = false;
    }
    else if (event.key == 's' || event.key == 'S' || event.key == '2' || event.key == '5') {
        downPressed = false;
    }//플레이어 스탑
}

setInterval(function () {
    ctx.clearRect(0, 0, 1000, 500);
    ctx.fillStyle = "rgb(162, 255, 209)";
    ctx.fillRect(0, 0, 100, 100)
    ctx.fillRect(900, 400, 100, 100)
    if (heightBounce) {
        if (heightObstacleY > 465) {
            heightBounce = false;
        }
        heightObstacleY += heightObstacleSpeed;
    }
    else {
        if (heightObstacleY < 10) {
            heightBounce = true;
        }
        heightObstacleY -= heightObstacleSpeed;
    }
    if (widthBounce) {
        if (widthObstacleX > 978) {
            widthBounce = false;
        }
        widthObstacleX += widthObstacleSpeed;
    }
    else {
        if (widthObstacleX < 10) {
            widthBounce = true;
        }
        widthObstacleX -= widthObstacleSpeed;
    } // 장애물 이동
    drawPlayer();
    drawWidthObstacle();
    drawheightObstacle();
}, 20);

function move() {
    ctx.clearRect(0, 0, 1000, 500);
    ctx.fillStyle = "rgb(162, 255, 209)";
    ctx.fillRect(0, 0, 100, 100)
    ctx.fillRect(900, 400, 100, 100)
    if (leftPressed) {
        playerX -= playerSpeed + 0.5;
    }
    if (rightPressed) {
        playerX += playerSpeed + 1;
    }
    if (upPressed) {
        playerY -= playerSpeed + 1;
    }
    if (downPressed) {
        playerY += playerSpeed + 0.5;
    }
    playerX += 1.5;
    playerY -= 1.5; // 바람 표현
    drawPlayer();
    drawheightObstacle();
    drawWidthObstacle();
    setTimeout(move, 10);
} // 플레이어 이동
move();

function drawheightObstacle() {
    for (let i = 0; i < 10; i++) {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'blue';
        heightObstacleX[i] = (i + 1.5) * 80;
        ctx.strokeRect(heightObstacleX[i], heightObstacleY, 20, 20);
        ctx.fillRect(heightObstacleX[i], heightObstacleY, 20, 20);
    } // 장애물 그리기
}
function drawWidthObstacle() {
    for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'blue';
        widthObstacleY[i] = (i + 1.5) * 80;
        ctx.strokeRect(widthObstacleX, widthObstacleY[i], 20, 20);
        ctx.fillRect(widthObstacleX, widthObstacleY[i], 20, 20);
    }
}

function reload(event) {
    if (event.key == 'r' || event.key == 'R') {
        location.reload();
    }
} // 재시작

document.addEventListener('keydown', start);
document.addEventListener('keyup', stop);
document.addEventListener('keydown', reload);