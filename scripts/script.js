
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



const allUnitsArray = document.querySelectorAll('.sprite');

let disabledMove = false;

let unitHeroSelected = null;
let unitEnemySelected = null;
let heroTurn = true;
let enemyTurn = false;
let actionPointsHero = 3;
let actionPointsEnemy = 3;

allUnitsArray.forEach(unit => {
    unit.addEventListener('click', handleUnitClick);
    if (unit.classList.contains('hero')) {
        unitBase[checkUnit(unit.id)].side = 'Hero';
    } else {
        unitBase[checkUnit(unit.id)].side = 'Enemy';
    }
});

function handleUnitClick(event) {
    // console.log(event.target);

    if (!disabledMove) {
        if (event.target.classList.contains('hero')) {

            if (unitHeroSelected === null) {
                unitHeroSelected = event.target;
                unitHeroSelected.classList.add('selected');

                if (!unitBase[checkUnit(unitHeroSelected.id)].active && unitEnemySelected === null) {
                    unitHeroSelected.classList.remove('selected');
                    unitHeroSelected = null;
                }

            } else if (unitHeroSelected == event.target) {
                unitHeroSelected.classList.remove('selected');
                unitHeroSelected = null;
            } else {
                unitHeroSelected.classList.remove('selected');
                unitHeroSelected = event.target;
                unitHeroSelected.classList.add('selected');
            }

            if (unitHeroSelected !== null && unitEnemySelected !== null && 
                !unitHeroSelected.classList.contains('die') && 
                unitBase[checkUnit(unitHeroSelected.id)].currHp !== 0) {
                if (
                    ((unitHeroSelected.id == 'hero1' && unitEnemySelected.id == 'enemy3') || 
                    (unitHeroSelected.id == 'hero3' && unitEnemySelected.id == 'enemy1')) &&
                    unitBase[1].currHp !== 0
                    ) {
                        unitHeroSelected.classList.remove('selected');
                        unitHeroSelected = null;
                } else {
                    unitHeroSelected.classList.add('selected');
                        let type = checkUnitType(unitEnemySelected);
                        battle(unitEnemySelected, type, unitHeroSelected); 
                }     
                
            }


        } else if (event.target.classList.contains('enemy')) {

            if (unitEnemySelected === null) {
                unitEnemySelected = event.target;
                unitEnemySelected.classList.add('selected');

                if (!unitBase[checkUnit(unitEnemySelected.id)].active && unitHeroSelected === null) {
                    unitEnemySelected.classList.remove('selected');
                    unitEnemySelected = null;
                }

            } else if (unitEnemySelected == event.target) {
                unitEnemySelected.classList.remove('selected');
                unitEnemySelected = null;
            } else {
                unitEnemySelected.classList.remove('selected');
                unitEnemySelected = event.target;
                unitEnemySelected.classList.add('selected');
            }

            if (unitEnemySelected !== null && unitHeroSelected !== null && 
                !unitEnemySelected.classList.contains('die') && 
                unitBase[checkUnit(unitEnemySelected.id)].currHp !== 0) {
                if (
                    ((unitEnemySelected.id == 'hero1' && unitHeroSelected.id == 'enemy3') || 
                    (unitEnemySelected.id == 'hero3' && unitHeroSelected.id == 'enemy1')) &&
                    unitBase[1].currHp !== 0
                    ) {
                        unitEnemySelected.classList.remove('selected');
                        unitEnemySelected = null;
                } else {
                    unitEnemySelected.classList.add('selected');
                        let type = checkUnitType(unitHeroSelected);
                        battle(unitHeroSelected, type, unitEnemySelected);
                }     
                
            }

        }

    }
}

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


function clearSelection() {
    if (unitHeroSelected !== null) {
        unitHeroSelected.classList.remove('selected');
        unitHeroSelected = null;
    }
    if (unitEnemySelected !== null) {
        unitEnemySelected.classList.remove('selected');
        unitEnemySelected = null;
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

        allUnitsArray.forEach(unit => {
            if (!unit.classList.contains('die')) {
                unitBase[checkUnit(unit.id)].active = true;
            }
        });

        waitingVisible();
        newPhase();

    }
    moveLogField.innerText = `Phase: ${phases}`;
}

// timer visible and new phase ------------------------------------------------------

function waitingVisible() {
    allUnitsArray.forEach(unit => {
        unit.children[2].style.visibility = 'hidden';
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

// game over ---------------------------------------------------------

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

