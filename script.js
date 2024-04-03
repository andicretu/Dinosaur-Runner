let width = window.innerWidth;
let height = window.innerHeight;

let dino = document.getElementById("dino");
dino.classList.add('dino');
let dinoWidth = dino.offsetWidth;
let dinoHeight = dino.offsetHeight;
dino.style.position = 'absolute';
let base = height - 2 * dinoHeight;
dino.style.top = base + "px";
dino.style.left = 0 + dinoWidth + "px";

let jumpInterval = "";
let isJumping = false;
let gameStarted = false;
let startButton = document.getElementById("startButton");

function jumpDino() {
    isJumping = true;
    if (gameStarted === false) {
        startGame();
    }
    let dinoPosition = parseInt(dino.style.top);
    var dinoSpeed = 50 ;
    let acceleration = 5;

    jumpInterval = setInterval(() => {
        if (dinoSpeed >= 0) {
            dinoSpeed -= acceleration;
            dinoPosition -= dinoSpeed;
            dino.style.top = dinoPosition + "px";
        } else if (dinoSpeed < 0) {
            dinoSpeed -= acceleration;
            dinoPosition -= dinoSpeed;
            dino.style.top = dinoPosition + "px";
        }
        if (dinoPosition >= base) {
            clearInterval(jumpInterval);
            isJumping = false;
            dino.style.top = base + "px";
        };
    }, 100);
    createEnemies();
}

function startGame() {
    createEnemies();
    gameStarted = true;
    startButton.textContent = '';
}

let enemyArray = [];
let enemyContainer = document.getElementById('enemyContainer');
let createEnemiesInterval;

function createEnemies() {
    let enemy = {
        id: enemyArray.length,
        element: document.createElement('div'),
    }
    enemy.element.classList.add('enemy');
    enemy.element.style.top = base + "px";
    let enemyWidth = enemy.element.offsetWidth;
    enemy.element.style.left = (width - enemyWidth) + "px";
    enemyArray.push(enemy);
    enemyContainer.appendChild(enemy.element);
    moveEnemies(enemy);
}

let minFreq = 4000;
let maxFreq = 7000;

clearInterval(createEnemiesInterval);
let randomFreq = Math.random() * (maxFreq - minFreq) + minFreq;
createEnemiesInterval = setInterval(createEnemies, randomFreq);

let enemySpeed = 30;
let moveInterval = "";
let enemyXPositionArray = [];

function moveEnemies(enemy) {
    let enemyXPosition = parseInt(enemy.element.style.left) || width;
    enemyXPositionArray[enemy.id] = enemyXPosition;
    if (enemyXPositionArray[enemy.id] > 0) {
        enemyXPositionArray[enemy.id] -= enemySpeed;
        enemy.element.style.left = enemyXPositionArray[enemy.id] + "px";
    } else {
        removeEnemy(enemy);
        updateScore();
    }
    checkColision(enemy);
}

function removeEnemy(enemy) {
    enemyContainer.removeChild(enemy.element);
    enemyArray.splice(enemyArray.indexOf(enemy), 1);
}

let score = 0;
let scoreValue = document.getElementById("scoreValue");

function updateScore() {
    score += 100;
    scoreValue.textContent = score;
}

function checkColision(enemy) {
    let enemyLocation = enemy.element.getBoundingClientRect();
    let dinoLocation = dino.getBoundingClientRect();
    dino.textContent = enemyLocation.right;
    if (
        enemyLocation.top < dinoLocation.bottom &&
        enemyLocation.right > dinoLocation.left &&
        enemyLocation.bottom > dinoLocation.top &&
        enemyLocation.left < dinoLocation.right
    ) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(jumpInterval);
    clearInterval(moveEnemiesInterval);
    clearInterval(createEnemiesInterval);
    startButton.textContent = "Game Over!"
}

let moveEnemiesInterval = setInterval(function() {
    for (let i = 0; i < enemyArray.length; i++) {
        moveEnemies(enemyArray[i]);
    }
}, 100);

let keyPressed = {};

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !isJumping) {
        jumpDino();
    } 
});

