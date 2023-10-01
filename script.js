const gameField = document.getElementById('game-field');

import { unitCoords } from "./unit-settings.js";
import { generateUnitsCardArray } from "./unit-settings.js";

const [ unitCards, unitBase ] = generateUnitsCardArray(12);
console.log(unitCards[0].children[4].innerText);

// console.log(unitBase);

// unit generation -------------------------------------------------------

function createUnits(value, type) {
    let units = [];
    let j = type == 'hero' ? 0 : 6;
    let k = type == 'hero' ? 0 : -6;
    for (let i = 0 + j; i < value + j; i++) {
        const unit1 = document.createElement('div');
        const text = document.createElement('div');
        text.className = 'unit-text hide';
        text.innerText = `${unitBase[i].currHp}/${unitBase[i].maxHp}`;
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

// check unit ------------------------------------------------------------

function checkUnit(unit) {
    switch (unit) {
        case 'hero1': return 0;
        case 'hero2': return 1;
        case 'hero3': return 2;
        case 'hero4': return 3;
        case 'hero5': return 4;
        case 'hero6': return 5;
        case 'enemy1': return 6;
        case 'enemy2': return 7;
        case 'enemy3': return 8;
        case 'enemy4': return 9;
        case 'enemy5': return 10;
        case 'enemy6': return 11;
    }
}

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
    console.log(unitBase[checkUnit(selectedHero.id)].name);
}

function handleEnemyClick(event) {
    if (selectedHero !== null) {
        selectedEnemy = event.target;
        selectedEnemy.classList.add('selected');
        
        let type = checkUnitType(selectedHero);
        battle(selectedHero, type, selectedEnemy);
        console.log(unitBase[checkUnit(selectedEnemy.id)].name);
        // console.log(unitBase[checkUnit(selectedEnemy.id)].hp);
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
    }, 300);
    
    calculateDamage(selectedUnit1, selectedUnit2);
}

function calculateDamage(u1, u2) {
    let heroAttack = unitBase[checkUnit(u1.id)].damage;
    let enemyHp = unitBase[checkUnit(u2.id)].currHp;
    enemyHp -= heroAttack;
    unitBase[checkUnit(u2.id)].currHp = enemyHp;
    console.log(unitBase[checkUnit(u2.id)].currHp);
}

// mouseover info ---------------------------------------------------

const heroElements = document.querySelectorAll('.sprite.hero');
const enemyElements = document.querySelectorAll('.sprite.enemy');

heroElements.forEach(function(heroElement) {
    const unitText = heroElement.querySelector('.unit-text');
    heroElement.addEventListener('mouseenter', function() {
        unitText.classList.remove('hide');
        // console.log(unitText.innerHTML);
    });
    heroElement.addEventListener('mouseleave', function() {
        unitText.classList.add('hide');
    });
});

enemyElements.forEach(function(enemyElement) {
    const unitText = enemyElement.querySelector('.unit-text');
    enemyElement.addEventListener('mouseenter', function() {
        unitText.classList.remove('hide');
        // console.log(unitText.innerHTML);
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
        objectInfo.appendChild(unitCards[unitIndex]);
        objectInfo.className = 'information';
        objectInfo.style.display = 'block';
    });
});

document.addEventListener('click', function() {
    objectInfo.style.display = 'none';
});

