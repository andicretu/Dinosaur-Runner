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

function jumpDino() {
    let dinoPosition = parseInt(dino.style.top);
    var dinoSpeed = 26 ;
    let acceleration = 1.8;

    jumpInterval = setInterval(() => {
        if (dinoSpeed >= 0 && dinoPosition === base) {
            dinoSpeed -= acceleration;
            dinoPosition -= dinoSpeed;
            dino.style.top = dinoPosition + "px";
            dino.textContent = dinoSpeed + " " + dino.style.top + " " + base;
        } else if (dinoSpeed < 0) {
            dinoSpeed -= acceleration;
            dinoPosition -= dinoSpeed;
            dino.style.top = dinoPosition + "px";
        }
        if (dinoPosition >= base) {
            clearInterval(jumpInterval);
        };
    }, 100);
    createEnemies();
}

let enemyArray = [];
let enemyContainer = document.getElementById("enemyContainer");

function createEnemies() {
    let enemy = {
        id: enemyArray.length,
        element: document.createElement('div'),
    }
    enemy.element.classList.add("enemy");
    enemy.element.style.left = width + "px";
    enemyArray.push(enemy);
    enemyContainer.appendChild(enemy.element);
    moveEnemies(enemy);
}

let enemyXPositionArray = [];
let enemySpeed = 30;

function moveEnemies(enemy) {
    let enemyXPosition = parseInt(enemy.element.style.left) || width;
    enemyXPositionArray[enemy.id] = enemyXPosition;
    if (enemyXPositionArray[enemy.id] <= 0 + "px") {
        enemyXPositionArray[enemy.id] -= enemySpeed;
        enemy.element.style.left = enemyXPositionArray[enemy.id] + "px";
    } else {
        removeEnemy(enemy);
    }
    checkColision(enemy);
}

function removeEnemy(enemy) {
    enemyContainer.removeChild(enemy.element);
    enemyArray.splice(enemyArray.indexOf(enemy), 1);
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

function gameOver(enemy) {
    clearInterval(jumpInterval);
    removeEnemy(enemy);
}

let moveEnemiesInterval = setInterval(function() {
    enemyArray.forEach(moveEnemies);
}, 100);

let keyPressed = {};

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !isJumping) {
        jumpDino();
    } 
});