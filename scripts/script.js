
const gameField = document.getElementById('game-field');

import { unitCoords } from "../scripts/unit-settings.js";
import { generateUnitBase } from "../scripts/unit-settings.js";

import { cheatOn } from "../scripts/cheats.js";

export const unitBase = generateUnitBase(12);
// console.log(unitBase[0].children[4].innerText);

const moveLogField = document.getElementById('move-log');

let phases = 1;
moveLogField.innerText = `Phase: ${phases}`;

// unit generation -------------------------------------------------------

function createUnits(value, type) {
    let units = [];
    let j = type == 'hero' ? 0 : 6;
    let k = type == 'hero' ? 0 : -6;
    for (let i = 0 + j; i < value + j; i++) {
        const unit1 = document.createElement('div');

        const healthBar = document.createElement('div');
        const healthValue = document.createElement('div');
        healthBar.className = 'health-bar';
        healthValue.className = 'health-value';
        healthBar.appendChild(healthValue);
       
        const hitText = document.createElement('div');
        hitText.className = 'unit-hit-text hidden';
        hitText.innerHTML = `0`;

        const waitIcon = document.createElement('div');
        waitIcon.className = 'waiting hidden';
        waitIcon.innerHTML = '⏱';

        unit1.appendChild(healthBar);
        unit1.appendChild(hitText);
        unit1.appendChild(waitIcon);
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

let heroPoints = heroUnits.length;
let enemyPoints = heroUnits.length;


// check unit ------------------------------------------------------------

export function checkUnit(unit) {
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

let selectedUnit1 = null;
let selectedUnit2 = null;
let disabledMove = false;
let heroTurn = true;

heroes.forEach(hero => {
    hero.addEventListener('click', handleHeroClick);
    unitBase[checkUnit(hero.id)].side = 'Hero';
});

enemies.forEach(enemy => {
    enemy.addEventListener('click', handleEnemyClick);
    unitBase[checkUnit(enemy.id)].side = 'Enemy';
});

function checkActive(text) {
    let activeCounter = 0;
    unitBase.forEach(unit => {
        if (unit.side == text && !unit.active) {
            activeCounter++;
        }
    });
    console.log('Hero active units:', activeCounter);
    if (activeCounter == 3) {
        heroTurn = false;
    } else {
        heroTurn = true;
    }
}


function handleHeroClick(event) {
    checkActive('Hero');
    if (!disabledMove && heroTurn && !event.target.classList.contains('die')) {
        if (selectedUnit1 === null) {
            selectedUnit1 = event.target;
            selectedUnit1.classList.add('selected');

            if (!unitBase[checkUnit(selectedUnit1.id)].active && selectedUnit2 === null) {
                selectedUnit1.classList.remove('selected');
                selectedUnit1 = null;
            }

        } else if (selectedUnit1 == event.target) {
            selectedUnit1.classList.remove('selected');
            selectedUnit1 = null;
        } else {
            selectedUnit1.classList.remove('selected');
            selectedUnit1 = event.target;
            selectedUnit1.classList.add('selected');
        }

        if (selectedUnit1 !== null && selectedUnit2 !== null && 
            !selectedUnit1.classList.contains('die') && 
            unitBase[checkUnit(selectedUnit1.id)].currHp !== 0) {
            if (
                ((selectedUnit1.id == 'hero1' && selectedUnit2.id == 'enemy3') || 
                (selectedUnit1.id == 'hero3' && selectedUnit2.id == 'enemy1')) &&
                unitBase[1].currHp !== 0
                ) {
                    selectedUnit1.classList.remove('selected');
                    selectedUnit1 = null;
            } else {
                    selectedUnit1.classList.add('selected');
                    let type = checkUnitType(selectedUnit2);
                    battle(selectedUnit2, type, selectedUnit1);  
            }     
        }
        heroTurn = false;
    }
}

function handleEnemyClick(event) {
    // checkActive('Enemy');
    if (!disabledMove && !heroTurn && !event.target.classList.contains('die')) {
        if (selectedUnit2 === null) {
            selectedUnit2 = event.target;
            selectedUnit2.classList.add('selected');
            
            if (!unitBase[checkUnit(selectedUnit2.id)].active && selectedUnit1 === null) {
                selectedUnit2.classList.remove('selected');
                selectedUnit2 = null;
            }

        } else if (selectedUnit2 == event.target) {
            selectedUnit2.classList.remove('selected');
            selectedUnit2 = null;
        } else {
            selectedUnit2.classList.remove('selected');
            selectedUnit2 = event.target;
            selectedUnit2.classList.add('selected');
        }

        if (selectedUnit2 !== null && selectedUnit1 !== null && 
            !selectedUnit2.classList.contains('die') && 
            unitBase[checkUnit(selectedUnit2.id)].currHp !== 0) {
            if (
                ((selectedUnit1.id == 'hero1' && selectedUnit2.id == 'enemy3') || 
                (selectedUnit1.id == 'hero3' && selectedUnit2.id == 'enemy1')) &&
                unitBase[7].currHp !== 0
                ) {
                selectedUnit2.classList.remove('selected');
                selectedUnit2 = null;
            } else {
                selectedUnit2.classList.add('selected');
                let type = checkUnitType(selectedUnit1);
                battle(selectedUnit1, type, selectedUnit2);
            }
        }
        heroTurn = true;
    }

}

function clearSelection() {
    if (selectedUnit1 !== null) {
        selectedUnit1.classList.remove('selected');
        selectedUnit1 = null;
    }
    if (selectedUnit2 !== null) {
        selectedUnit2.classList.remove('selected');
        selectedUnit2 = null;
    }
    disabledMove = false;
}

function checkUnitType(eventTarget) {
    if (eventTarget.classList.contains('hero')) {
        return 'hero';
    } else {
        return 'enemy';
    }
}

function battle(attackUnit, type, defenceUnit) {
    disabledMove = true;
    unitAttack(attackUnit, type, defenceUnit);
    setTimeout(clearSelection, 2000);
    unitBase[checkUnit(attackUnit.id)].active = false;

    setTimeout(() => {
        attackUnit.children[2].style.visibility = 'visible';
    }, 2000);
    setTimeout(() => {
        checkTurns();
        heroTurn = !heroTurn;
    }, 3000);
}

function unitAttack(selectedUnit1, type, selectedUnit2) {
    let count = 0;
    const damageValue = takeDamageValue(selectedUnit1);

    const timerInterval = setInterval(function() {
        if (count < 4) {
            if (count == 2) {
                selectedUnit2.classList.add('hitted');
                let minus = damageValue != 'Miss' ? '-' : '';
                selectedUnit2.children[1].innerHTML = `${minus}${damageValue}`;

                hitVisibility(selectedUnit2);
            }
            selectedUnit1.className = `sprite ${type} attack${count}`;
            count++;
        } else {
            selectedUnit1.classList.remove('attack3');
            selectedUnit2.classList.remove('hitted');
            calculateDamage(damageValue, selectedUnit2);
            checkDeath(selectedUnit2);
            clearInterval(timerInterval);
        }
    }, 300);
}

function takeDamageValue(u1) {
    let u1Attack = unitBase[checkUnit(u1.id)].damage;
    let hitChance = unitBase[checkUnit(u1.id)].hitChance;
    let u1Damage = Math.floor((Math.random() * hitChance) / 100 * u1Attack);
    if (cheatOn) {
        return 100;
    } else if (!cheatOn && u1Damage > 10) {
        return u1Damage;
    } else {
        return 'Miss';
    }
}

function calculateDamage(damage, u2) {
    if (damage == 'Miss') {
        damage = 0;
    }
    let u2Hp = unitBase[checkUnit(u2.id)].currHp;
    u2Hp -= damage;
    unitBase[checkUnit(u2.id)].currHp = u2Hp;
    setHealthBar(unitBase[checkUnit(u2.id)].currHp, u2.querySelector('.health-value'));
}

function setHealthBar(health, healthBar) {
    const percentage = (health / 75) * 100;
    const clampedHealth = Math.floor(Math.min(Math.max(percentage, 0), 100));
    healthBar.style.width = clampedHealth + "%";
}

function checkDeath(u2) {

    const attacked = unitBase[checkUnit(u2.id)];

    if (attacked.currHp <= 0) {

        attacked.currHp = 0;
        u2.classList.add('die');
        u2.children[2].style.visibility = 'hidden';
        attacked.img = '☠️';
        attacked.name = `${attacked.name} <span class='die-status'>[dead]</span>`;
        attacked.active = false;
        
        if (checkUnit(u2.id) < 6) {
            heroPoints--;
        } else {
            enemyPoints--;
        }

        if (heroPoints == 0) {
            gameOverScreen(enemies);
        } else if (enemyPoints == 0) {
            gameOverScreen(heroes);
        }
    }
}

function checkTurns() {

    let activeCounter = 0;
    unitBase.forEach(unit => {
        if (!unit.active) {
            activeCounter++;
        }
    })

    if (activeCounter == 6) {


        for (let i = 0; i < unitBase.length; i++) {
            if (i < 6) {
                heroes.forEach(hero => {
                    if (!hero.classList.contains('die')) {
                        unitBase[i].active = true;
                    }
                });
            } else {
                enemies.forEach(enemy => {
                    if (!enemy.classList.contains('die')) {
                        unitBase[i].active = true;
                    }
                });    
            }
        }


        waitingVisible();
        newPhase();

    }
    moveLogField.innerText = `Phase: ${phases}`;
}



function waitingVisible() {
    heroes.forEach(hero => {
        hero.children[2].style.visibility = 'hidden';
    });
    enemies.forEach(enemy => {
        enemy.children[2].style.visibility = 'hidden';
    });    
}

function newPhase() {
    phases++;
    const newPahseBanner = document.createElement('div');
    newPahseBanner.id = 'phase-banner';
    newPahseBanner.innerHTML = 'New phase!';
    document.body.appendChild(newPahseBanner);
    newPahseBanner.style.opacity = 1;
    newPahseBanner.style.visibility = 'visible';
    setTimeout(() => {
        newPahseBanner.style.opacity = 0;
        newPahseBanner.style.visibility = 'hidden';
    }, 2000);
}

function gameOverScreen(winnerName) {
    
    const winner = winnerName == heroes ? 'heroes' : 'enemies';
    
    const finalScreen = document.createElement('div');
    finalScreen.id = 'final-screen';
    finalScreen.innerHTML = `${winner} <br>win!`;
    if (winner == 'heroes') {
        finalScreen.classList.add('heroes-winner');
    } else if (winner == 'enemies') {
        finalScreen.classList.add('enemies-winner');
    }
    finalScreen.addEventListener('click', ()=> {
        location.reload();
    });

    document.body.appendChild(finalScreen);

    winPose(winnerName);
}

function winPose(winner) {
    winner.forEach(unit => {
        if (!unit.classList.contains('die') && unitBase[checkUnit(unit.id)].currHp !== 0) {
            unit.classList.add('win-pose');
            unit.style.scale = 1.3;
        }
    });
}


// hit animation ---------------------------------------

function hitVisibility(target) {
    const hitText = target.children[1];
    hitText.style.opacity = 1;
    hitText.style.visibility = 'visible';
    // hitText.style.transform = 'translate(-50%, -50%) translate(-15px, -0px)';
    hitText.style.left = 30 + 'px';
    hitText.style.top = 0 + 'px';
    if (checkUnit(target.id) > 5) {
        // hitText.style.transform = 'translate(-50%, -50%) translate(27px, -0px)';
        hitText.style.left = -10 + 'px';
        hitText.style.top = 0 + 'px';
    }

    setTimeout(() => {
        hitText.style.opacity = 0;
        hitText.style.visibility = 'hidden';
        // hitText.style.transform = 'translate(0%, 0%) translate(0px, 0px)';
        hitText.style.left = 0 + 'px';
        hitText.style.top = 0 + 'px';

    }, 1000);

}

// ----------------------


