class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
const snakeParts = [];
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restart");
const highscoreView = document.getElementById("highscore")
const speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let appleX = 5;
let appleY = 5;
let tailLength = 2;
let score = 0;
const gulpSound = new Audio("gulp.mp3");
const overSound = new Audio("game-over.mp3");
highscoreView.innerHTML = "Highscore: " + localStorage.getItem("highscore")


function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }
    clearScreen()
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/ speed);

}


function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    // walls
    if (headX < 0) {
        gameOver = true;
    }
    else if (headX === tileCount) {
        gameOver = true;
    }
    else if (headY < 0) {
        gameOver = true;
    }
    else if (headY === tileCount) {
        gameOver = true;
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width/6.5, canvas.height/2);
        overSound.play();
        restartBtn.innerHTML = `<button onclick="restart()">Restart</button>`;

    }

    return gameOver;
}


function restart() {
    location.reload();
}




function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width-50, 10);
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    ctx.fillStyle = "green";
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new snakePart(headX, headY));
    if (snakeParts.length > tailLength){
        snakeParts.shift();
    }
}
function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
        highScore();
    }
}

function highScore() {
    let highscore = localStorage.getItem("highscore");
    if (highscore === null) {
        localStorage.setItem("highscore", score);
    } else {
        if (highscore < score) {
            localStorage.setItem("highscore", score);
        }
    }
    highscoreView.innerHTML = "Highscore: " + localStorage.getItem("highscore");
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
    // up arrow
    if(event.keyCode === 38) {
        if (yVelocity === 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    // down arrow
    if(event.keyCode === 40) {
        if (yVelocity === -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // left arrow
    if(event.keyCode === 37) {
        if (xVelocity === 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    // right arrow
    if(event.keyCode === 39) {
        if (xVelocity === -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
    /// w key
    if(event.keyCode === 87) {
        if (yVelocity === 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    // s key
    if(event.keyCode === 83) {
        if (yVelocity === -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // a key
    if(event.keyCode === 65) {
        if (xVelocity === 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

    // d key
    if(event.keyCode === 68) {
        if (xVelocity === -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }


}




drawGame();
