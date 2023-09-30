const gameField = document.getElementById('game-field');

import { unitCoords } from "./unit-settings.js";

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

// battle -----------------------------------------------------------------

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

// mouseover info ---------------------------------------------------

const heroElements = document.querySelectorAll('.sprite.hero');
const enemyElements = document.querySelectorAll('.sprite.enemy');

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
    event.preventDefault();
});

// context menu - unit info -------------------------------------------------

import { generateUnitsArray } from "./unit-settings.js";

const unitsArray = generateUnitsArray(12);

console.log(unitsArray);

function checkUnit(unit) {
    switch (unit) {
        case 'hero1': return 1;
        case 'hero2': return 3;
        case 'hero3': return 3;
        case 'hero4': return 4;
        case 'hero5': return 5;
        case 'hero6': return 6;
        case 'enemy1': return 7;
        case 'enemy2': return 8;
        case 'enemy3': return 9;
        case 'enemy4': return 10;
        case 'enemy5': return 11;
        case 'enemy6': return 12;
    }
}

const sprites = document.querySelectorAll('.sprite');
const objectInfo = document.createElement('div');
objectInfo.id = 'object-info';
document.body.appendChild(objectInfo);

sprites.forEach(function(sprite) {
    sprite.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        if (objectInfo.lastElementChild) {
            objectInfo.removeChild(objectInfo.lastElementChild);
        }
        const unitIndex = checkUnit(event.target.id);
        objectInfo.appendChild(unitsArray[unitIndex]);
        objectInfo.className = 'information';
        objectInfo.style.display = 'block';
    });
});

document.addEventListener('click', function() {
    objectInfo.style.display = 'none';
});

