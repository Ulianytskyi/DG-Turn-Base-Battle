const gameField = document.getElementById('game-field');

// unit generation -------------------------------------------------------

function createUnits(value, type) {
    let units = [];
    for (let i = 0; i < value; i++) {
        const unit1 = document.createElement('div');
        unit1.className = `sprite ${type} pos-${type+(i+1)}`;

        units.push(unit1);
    }
    return units;
}

const heroUnits = createUnits(9, 'hero');
heroUnits.forEach(unit => gameField.appendChild(unit));

const enemyUnits = createUnits(1, 'enemy');
enemyUnits.forEach(unit => gameField.appendChild(unit));


// unit animation ----------------------------------------------------------
let i = 1;
function heroIdle() {
    // heroUnits[0].lastChild.className = `sprite hero idle${i+1}`;

    // OR

    heroUnits.forEach(element => {
        element.lastChild.className = `sprite hero idle${i}`;
    })

    i = (i + 1) % 2; 
}
// setInterval(heroIdle, 1500);

// game board ----------------------------------------------------------

const gameBoard1 = document.getElementById('game-board1');
const gameBoard2 = document.getElementById('game-board2');

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    square.classList.add('terrain-sprite');
    gameBoard1.appendChild(square);
}

for (let j = 0; j < 225; j++) {
    const square = document.createElement('div');
    square.classList.add('terrain-sprite');
    gameBoard2.appendChild(square);
}

// mouse events ----------------------------------------------------------

const targetElement = document.getElementById('game-container');

targetElement.addEventListener('mousedown', handleMouseDown);


function handleMouseDown(event) {
    const rect = targetElement.getBoundingClientRect();
    
    const xRelativeToElement = event.clientX - rect.left;
    const yRelativeToElement = event.clientY - rect.top;

    // console.log(`Координати мишки: X=${xRelativeToElement}, Y=${yRelativeToElement}`);
}

function checkObject(x, y) {

}

gameField.addEventListener('mousedown', handleClick);

function handleClick(event) {
    
    const clickedElement = event.target;

    
    if (clickedElement.classList.contains('sprite')) {
        if (clickedElement.classList.contains('hero')) {
            
            console.log('Клікнуто на героя:', clickedElement.classList);

        } else if (clickedElement.classList.contains('enemy')) {
            
            console.log('Клікнуто на ворога:', clickedElement.classList);
        }
    }
}

// battle ---------------------

const heroes = document.querySelectorAll('.hero');
const enemies = document.querySelectorAll('.enemy');

let selectedHero = null;
let selectedEnemy = null;

heroes.forEach(hero => {
    hero.addEventListener('click', handleHeroClick);
});

enemies.forEach(enemy => {
    enemy.addEventListener('click', handleEnemyClick);
});

function handleHeroClick(event) {
    if (selectedHero === null) {
        selectedHero = event.target;
        selectedHero.classList.add('selected');
    } else if (selectedHero === event.target) {
        selectedHero.classList.remove('selected');
        selectedHero = null;
    } else {
        selectedHero.classList.remove('selected');
        selectedHero = event.target;
        selectedHero.classList.add('selected');
    }
}

function handleEnemyClick(event) {
    if (selectedHero !== null) {
        selectedEnemy = event.target;
        selectedEnemy.classList.add('selected');
        console.log('Двобій');
    }
}

document.getElementById('game-field').addEventListener('click', clearSelection);

function clearSelection() {
    if (selectedHero !== null) {
        selectedHero.classList.remove('selected');
        selectedHero = null;
    }
    if (selectedEnemy !== null) {
        selectedEnemy.classList.remove('selected');
        selectedEnemy = null;
    }
}
