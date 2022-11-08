const restartBtn = document.getElementById("restart");
const highscoreView = document.getElementById("highscore")
const leaderboardContent = document.getElementById("leaderboardContent");
const leaderboard = document.getElementById("leaderboard");
const app = document.getElementById("loadGame");
const colorInput = document.getElementById("colorInput");
const bgInput = document.getElementById("bgInput");
const appleInput = document.getElementById("appleInput");
const nameInput = document.getElementById("nameInput");

let isGamingRunning = false;
let ctx;
let canvas;
let canvasWidth = 600;
let canvasHeight = 600;
let fps = 10;
let tileCount = 24;
let tileSize = canvasWidth / tileCount - 2;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let appleX = 5;
let appleY = 5;
let tailLength = 2;
let score = 0;
let defaultColor = "green"
let bgColor = "black"
let apColor = "red"
let name = "Player"
const snakeParts = [];

const gulpSound = new Audio("gulp.mp3");
const overSound = new Audio("game-over.mp3");



/*-----------------Essentials-------------------*/
const drawSnake = () => {
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    ctx.fillStyle = defaultColor;
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new snakePart(headX, headY));
    if (snakeParts.length > tailLength){
        snakeParts.shift();
    }
}


function drawApple() {
    ctx.fillStyle = apColor;
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvasWidth-50, 10);
}


const draw = () => {
    drawSnake()
    drawApple()
    drawScore()
    highscore()
}

const createCanvas = () => {
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", canvasWidth.toString())
    canvas.setAttribute("height", canvasHeight.toString())
    app.appendChild(canvas)
    ctx = canvas.getContext("2d");
}


const initializeGame = () => {
    createCanvas()
    draw();
}

initializeGame()
const startGame = () => {
    isGamingRunning = true;
    gameLoop();
    document.getElementById("spacebar").style.display = "none";
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
    console.log("HeadX: " + headX + " HeadY: " + headY)

}


const boundaryCollisionCheck = () => {
    /*    console.log("Border colison check " + (canvasWidth / tileCount - 10))*/
    /*Make a boundary collison check but its dynamic to the canvas size*/
    if (headX < 1 || headX > canvasWidth / tileCount - 2 || headY < 1 || headY > canvasHeight / tileCount - 2){

        return true;
    }
    return false;
}

const selfCollisionCheck = () => {
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            return true;
        }
    }
    return false;

}

const gameOverCheck = () => {
    if(boundaryCollisionCheck() || selfCollisionCheck()) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width/6.5, canvas.height/2);
        overSound.play();
        isGamingRunning = false;
    }
}

const checkAppleCollision = () => {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
        highscore()
    }
}

const collisionChecker = () => {
    gameOverCheck()
    checkAppleCollision()
}


const gameLoop = () => {

    //update snake position
    changeSnakePosition()
    clearScreen()
    //checking for collisions
    collisionChecker()
    draw()
    //continue or not
    if(isGamingRunning){
        setTimeout(gameLoop, 1000 / fps);
    }
}


const clearScreen = () => {
    ctx.fillStyle = bgColor ;
    ctx.fillRect(0,0,canvas.width, canvas.height);
}


//modals

function setAppleColor() {
    apColor = appleInput.value;
    appleModal.style.display = "none";
}
/*-----------------------------------------------------*/


// Controller
const keyDown = (event) =>{

    switch (event.keyCode){
        //spacebar
        case 32: startGame();
            break;
        // up arrow || 'w'
        case 38:
        case 87: yVelocity === 1 ? yVelocity = 1 : yVelocity = -1; xVelocity = 0;
            break;
        //left arrow or 'a'
        case 65:
        case 37: xVelocity === 1 ? xVelocity = 1: xVelocity = -1; yVelocity = 0;
            break;
        // down arrow or 's'
        case 40:
        case 83:  yVelocity === -1 ? yVelocity = -1 : yVelocity = 1; xVelocity = 0;
            break;
        // right arrow or 'd'
        case 39:
        case 68: xVelocity === -1 ? xVelocity = -1: xVelocity = 1; yVelocity = 0;
            break;


    }
}



/*Features*/

function enableDevTools() {
    let devWarning = document.getElementById("devWarning");
    let fps = document.getElementById("fps");
    let colorBtn = document.getElementById("colorBtn");
    let bgButton = document.getElementById("bgButton");
    let appleButton = document.getElementById("appleBtn");
    let nameButton = document.getElementById("nameButton")
    let sizeButton = document.getElementById("sizeBtn")


    document.getElementById("myBtn").style.display = "block";
    devWarning.style.display = "none";
    // localStorage.clear()
    fps.style.display = "block"
    localStorage.setItem("highscore", '0');
    colorBtn.style.display = "block";
    bgButton.style.display = "block";
    appleButton.style.display = "block";
    leaderboard.style.display = "block";
    sizeButton.style.display = "block";
    highscoreView.innerHTML = "Highscore: " + localStorage.getItem("highscore")
}

function setSpeed() {
    speedVal = document.getElementById("speedInput").value
    fps = speedVal;
    modal.style.display = "none";
    if (speedVal == 0) {
        speed = 9;
    }

    if (speedVal == 0) {
        systemMessage("Invalid number, set to default")
    } else {
        systemMessage(`Speed set to ${speedVal}`)
    }

}

function systemMessage(message) {
    popup.innerHTML = message
    popup.className = "show"
    setTimeout(function(){popup.className = popup.className.replace("show", "") }, 3000)
}

function setBg() {
    bgColor = bgInput.value;
    bgModal.style.display = "none";
}

function setColor() {
    defaultColor = colorInput.value;
    colorModal.style.display = "none";
}

function highscore() {
    let highscore = localStorage.getItem("highscore");
    if (highscore === null) {
        localStorage.setItem("highscore", '0');
    } else {
        if (highscore < score) {
            localStorage.setItem("highscore", score);
        }

    }
    highscoreView.innerHTML = "Highscore: " + localStorage.getItem("highscore");
}

function setGameSize() {
let widthInput = document.getElementById("widthInput");
let heightInput = document.getElementById("heightInput");

canvas.width = widthInput.value;
canvas.height = heightInput.value;
canvasWidth = canvas.width;
canvasHeight = canvas.height;
console.log(canvasWidth);
console.log(canvasHeight);
sizeModal.style.display = "none";
systemMessage("Size changed")


}





document.body.addEventListener("keydown", keyDown);