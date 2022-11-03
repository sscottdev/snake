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
const leaderboardContent = document.getElementById("leaderboardContent");
const leaderboard = document.getElementById("leaderboard");

let speed = 9;
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
let colorInput = document.getElementById("colorInput");
let defaultColor = "green"
let bgColor = "black"
let apColor = "red"
let bgInput = document.getElementById("bgInput");
let appleInput = document.getElementById("appleInput");
let nameInput = document.getElementById("nameInput");
let name = "Player"
const gulpSound = new Audio("gulp.mp3");
const overSound = new Audio("game-over.mp3");
let counter = 0;
highscoreView.innerHTML = "Highscore: " + localStorage.getItem("highscore")

function setSpeed() {
    speedVal = document.getElementById("speedInput").value
    speed = speedVal;
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




var fps = document.getElementById("fps");
var startTime = Date.now();
var frame = 0;

function tick() {
    var time = Date.now();
    frame++;
    if (time - startTime > 1000) {
        fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
        startTime = time;
        frame = 0;
    }
    window.requestAnimationFrame(tick);
}
tick();







function enableDevTools() {
    document.getElementById("myBtn").style.display = "block";
    devWarning.style.display = "none";
    // localStorage.clear()
    fps.style.display = "block"
    localStorage.setItem("highscore", '0');
    colorBtn.style.display = "block";
    bgButton.style.display = "block";
    appleButton.style.display = "block";
    nameButton.style.display = "block";
    leaderboard.style.display = "block";
    highscoreView.innerHTML = "Highscore: " + localStorage.getItem("highscore")
}

function disableDevTools(){
    devWarning.style.display = "none";
}


function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }
/*    console.log(counter++)*/
    clearScreen()
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/ speed);

}

function clearScreen() {
    ctx.fillStyle = bgColor ;
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function setBg() {
    bgColor = bgInput.value;
    bgModal.style.display = "none";
    systemMessage(`Set background color to ${bgInput.value} `)
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
        getLeaderboard().then(data => {
            data.forEach((item, index) => {
                leaderboardContent.innerHTML += `<li>${item.name} - ${item.score}</li>`
            })
        })


        restartBtn.innerHTML = `<button onclick="restart()">Restart</button>`;

    }

    return gameOver;
}

const getLeaderboard = async () => {
    const response = await fetch('http://ec2-18-205-191-200.compute-1.amazonaws.com:3000/leaderboard');
    const data = await response.json();
    return data;
}


function setName() {
    name = nameInput.value;
    nameModal.style.display = "none";
    systemMessage(`Username set to ${nameInput.value}`)
}

const saveScore = async () => {
    const score = localStorage.getItem("highscore");
    const data = { name, score };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('http://ec2-18-205-191-200.compute-1.amazonaws.com:3000/leaderboard', options);
    const json = await response.json();
    console.log(json);
}




function restart() {
    location.reload();
/*    headX = 10;
    headY = 10;
    canvas.style.display = "block";
    restartBtn.innerHTML = "";
    score = 0;
    xVelocity = 0;
    yVelocity = 0;
    drawGame()*/
}

/*
function setCustomSound() {
    let sound = document.getElementById("soundInput").value;
    gulpSound.src = sound;
    modal.style.display = "none";
}
*/






function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width-50, 10);
}







function drawSnake() {
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





function setColor(){
    defaultColor = colorInput.value;
    colorModal.style.display = "none";
    systemMessage(`Set tail color to ${colorInput.value}`)
}



function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = apColor;
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function setAppleColor() {
    apColor = appleInput.value;
    appleModal.style.display = "none";
    systemMessage(`Set apple color to ${appleInput.value}`)
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
            localStorage.setItem("highscore", '0');
        } else {
            if (highscore < score) {
                localStorage.setItem("highscore", score);
            }

        }
        highscoreView.innerHTML = "Highscore: " + localStorage.getItem("highscore");
    }


    document.body.addEventListener("keydown", keyDown);

    /*if (nameModal.display.style === "block") {


    }*/


    function keyDown(event) {
        // up arrow
        if (event.keyCode === 38) {
            if (yVelocity === 1)
                return;
            yVelocity = -1;
            xVelocity = 0;
        }

        // down arrow
        if (event.keyCode === 40) {
            if (yVelocity === -1)
                return;
            yVelocity = 1;
            xVelocity = 0;
        }
        // left arrow
        if (event.keyCode === 37) {
            if (xVelocity === 1)
                return;
            yVelocity = 0;
            xVelocity = -1;
        }
        // right arrow
        if (event.keyCode === 39) {
            if (xVelocity === -1)
                return;
            yVelocity = 0;
            xVelocity = 1;
        }
        /// w key
        if (event.keyCode === 87) {
            if (yVelocity === 1)
                return;
            yVelocity = -1;
            xVelocity = 0;
        }
        // s key
        if (event.keyCode === 83) {
            if (yVelocity === -1)
                return;
            yVelocity = 1;
            xVelocity = 0;
        }
        // a key
        if (event.keyCode === 65) {
            if (xVelocity === 1)
                return;
            yVelocity = 0;
            xVelocity = -1;
        }

        // d key
        if (event.keyCode === 68) {
            if (xVelocity === -1)
                return;
            yVelocity = 0;
            xVelocity = 1;
        }


    }

    function swipeControls() {
        let touchstartX = 0
let touchendX = 0
    

// const drawLeaderboard = async () => {
//     let response = await getLeaderboard()
//     console.log(response)
// }
// drawLeaderboard()
    getLeaderboard().then(data => {
        data.forEach((item, index) => {
            leaderboardContent.innerHTML += `<li>${item.name} - ${item.score}</li>`
        })
    })

    let isGamingRunning = false;

    const startGame = () => {
        isGamingRunning = true;
        gameLoop();
    }

    const gameLoop = () => {
        while (isGamingRunning) {
            drawGame();
            isGameOver();
            changeSnakePosition();
            checkAppleCollision();
            drawScore();
            highScore();
            if (isGameOver()) {
                isGamingRunning = false;
                break;
            }
        }
    }
}









drawGame();
