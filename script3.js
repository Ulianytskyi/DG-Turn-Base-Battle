const gameField = document.getElementById('game-field');

let unitCoords = [
    {x : 150, y : 150}, {x : 250, y : 150}, {x : 350, y : 150},
    {x : 150, y : 250}, {x : 250, y : 250}, {x : 350, y : 250},
    {x : 150, y : 550}, {x : 250, y : 550}, {x : 350, y : 550},
    {x : 150, y : 450}, {x : 250, y : 450}, {x : 350, y : 450},
]

// unit generation -------------------------------------------------------

function createUnits(value, type) {
    let units = [];
    let j = type == 'hero' ? 0 : 6;
    let k = type == 'hero' ? 0 : -6;
    for (let i = 0 + j; i < value + j; i++) {
        const unit1 = document.createElement('div');
        const text = document.createElement('div');
        text.className = 'unit-text hide';
        text.innerText = 10;
        unit1.appendChild(text);
        unit1.className = `sprite ${type}`;
        unit1.id = `${type}` + (i + 1 + k);
        unit1.style.top = unitCoords[i].x + 'px';
        unit1.style.left = unitCoords[i].y + 'px';
        units.push(unit1);
    }
    return units;
}


const heroUnits = createUnits(3, 'hero');
heroUnits.forEach(unit => gameField.appendChild(unit));

const enemyUnits = createUnits(3, 'enemy');
enemyUnits.forEach(unit => gameField.appendChild(unit));

console.log(heroUnits[0].innerText);

// unit animation ----------------------------------------------------------

function unitAttack(selectedUnit1, type, selectedUnit2) {
    let count = 0;
    const timerInterval = setInterval(function() {

        if (count < 4) {

            if (count == 2) {
                selectedUnit2.classList.add('hitted');
            }

            selectedUnit1.className = `sprite ${type} attack${count}`;

            count++;
        } else {
            selectedUnit1.classList.remove('attack3');
            selectedUnit2.classList.remove('hitted');
            clearInterval(timerInterval);
        }
        
    }, 300)
    
}

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


gameField.addEventListener('mousedown', handleClick);

function handleClick(event) {
    
    const clickedElement = event.target;

    
    if (clickedElement.classList.contains('sprite')) {
        if (clickedElement.classList.contains('hero')) {
            
            // console.log('Клікнуто на героя:', clickedElement.classList);

        } else if (clickedElement.classList.contains('enemy')) {
            
            // console.log('Клікнуто на ворога:', clickedElement.classList);
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
        
    } else if (selectedHero == event.target) {
        
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
        
        let type = checkUnitType(selectedHero);

        battle(selectedHero, type, selectedEnemy);
    }
}

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

function checkUnitType(eventTarget) {
    if (eventTarget.classList.contains('hero')) {
        return 'hero';
    } else {
        return 'enemy';
    }
}

function battle(selectedUnit1, type, selectedUnit2) {
    unitAttack(selectedUnit1, type, selectedUnit2);
    setTimeout(clearSelection, 2000);
}

// mouseover info ------------------------------------

// Отримуємо всі об'єкти hero та enemy
const heroElements = document.querySelectorAll('.sprite.hero');
const enemyElements = document.querySelectorAll('.sprite.enemy');

// Додаємо обробники подій для об'єктів hero
heroElements.forEach(function(heroElement) {
    const unitText = heroElement.querySelector('.unit-text');

    heroElement.addEventListener('mouseenter', function() {
        unitText.classList.remove('hide');
        console.log(unitText.innerHTML);
    });

    heroElement.addEventListener('mouseleave', function() {
        unitText.classList.add('hide');
    });
});

// Додаємо обробники подій для об'єктів enemy (можете додати аналогічний код)
enemyElements.forEach(function(enemyElement) {
    const unitText = enemyElement.querySelector('.unit-text');

    enemyElement.addEventListener('mouseenter', function() {
        unitText.classList.remove('hide');
        console.log(unitText.innerHTML);
    });

    enemyElement.addEventListener('mouseleave', function() {
        unitText.classList.add('hide');
    });
});

// context menu disable --------------------------------------------------

const gameContainer = document.getElementById('game-container');

gameContainer.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Блокуємо виведення контекстного меню
});

// context menu - unit info -------------------------------------------------

const sprites = document.querySelectorAll('.sprite');
const objectInfo = document.createElement('div');
objectInfo.id = 'object-info';
document.body.appendChild(objectInfo);

sprites.forEach(function(sprite) {
    sprite.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const rect = sprite.getBoundingClientRect();
        objectInfo.innerText = 'Lorem Ipsum';
        objectInfo.className = 'information';
        objectInfo.style.display = 'block';
    });
});

document.addEventListener('click', function() {
    objectInfo.style.display = 'none';
});
