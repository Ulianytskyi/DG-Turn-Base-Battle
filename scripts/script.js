// cheat mode begins -----------------
let cheatOn = false;
const cheatBtn = document.getElementById('cheat');
cheatBtn.style.backgroundColor = '#6effba';
cheatBtn.addEventListener('click', ()=> {
    if (cheatOn) {
        cheatOn = false;
        cheatBtn.textContent = 'One punch mode off';
        cheatBtn.style.backgroundColor = '#6effba';
    } else {
        cheatOn = true;
        cheatBtn.textContent = 'One punch mode on';
        cheatBtn.style.backgroundColor = '#ffa3fb';
    }
});

// cheat mode end --------------------

const gameField = document.getElementById('game-field');

import { unitCoords } from "../scripts/unit-settings.js";
import { generateUnitBase } from "../scripts/unit-settings.js";

const unitBase = generateUnitBase(12);
// console.log(unitBase[0].children[4].innerText);

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

        unit1.appendChild(healthBar);
        unit1.appendChild(hitText);
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

let selectedUnit1 = null;
let selectedUnit2 = null;
let disabledMove = false;

heroes.forEach(hero => {
    hero.addEventListener('click', handleHeroClick);
});

enemies.forEach(enemy => {
    enemy.addEventListener('click', handleEnemyClick);
});

function handleHeroClick(event) {
    if (!disabledMove) {
        if (selectedUnit1 === null) {
            selectedUnit1 = event.target;
            selectedUnit1.classList.add('selected');
        } else if (selectedUnit1 == event.target) {
        selectedUnit1.classList.remove('selected');
        selectedUnit1 = null;
        } else {
            selectedUnit1.classList.remove('selected');
            selectedUnit1 = event.target;
            selectedUnit1.classList.add('selected');
        }
        
        if (selectedUnit1 !== null && selectedUnit2 !== null && !selectedUnit1.classList.contains('die') && unitBase[checkUnit(selectedUnit1.id)].currHp !== 0) {
            selectedUnit1.classList.add('selected');
            if (selectedUnit1 !== null && selectedUnit2 !== null) {
                let type = checkUnitType(selectedUnit2);
                battle(selectedUnit2, type, selectedUnit1);
            }
        }
    }
}

function handleEnemyClick(event) {
    if (!disabledMove) {
        if (selectedUnit2 === null) {
            selectedUnit2 = event.target;
            selectedUnit2.classList.add('selected');
        } else if (selectedUnit2 == event.target) {
            selectedUnit2.classList.remove('selected');
            selectedUnit2 = null;
        } else {
            selectedUnit2.classList.remove('selected');
            selectedUnit2 = event.target;
            selectedUnit2.classList.add('selected');
        }

        if (selectedUnit2 !== null && selectedUnit1 !== null && !selectedUnit2.classList.contains('die') && unitBase[checkUnit(selectedUnit2.id)].currHp !== 0) {
            selectedUnit2.classList.add('selected');
            if (selectedUnit2 !== null && selectedUnit1 !== null) {
                let type = checkUnitType(selectedUnit1);
                battle(selectedUnit1, type, selectedUnit2);
            }
        }
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

function battle(selectedUnit1, type, selectedUnit2) {
    disabledMove = true;
    unitAttack(selectedUnit1, type, selectedUnit2);
    setTimeout(clearSelection, 2000);
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
    if (unitBase[checkUnit(u2.id)].currHp <= 0) {
        unitBase[checkUnit(u2.id)].currHp = 0;
        u2.classList.add('die');
        unitBase[checkUnit(u2.id)].img = '☠️';
        unitBase[checkUnit(u2.id)].name = `${unitBase[checkUnit(u2.id)].name} <span class='die-status'>[dead]</span>`;
        
        if (checkUnit(u2.id) < 6) {
            heroPoints -= 1;
            console.log('Hero Points', heroPoints);
        } else {
            enemyPoints -= 1;
            console.log('Enemy Points', enemyPoints);
        }

        if (heroPoints == 0) {
            gameOverScreen('Enemies');
            enemies.forEach(enemy => {
                if (!enemy.classList.contains('die') && unitBase[checkUnit(enemy.id)].currHp !== 0) {
                    enemy.classList.add('win-pose');
                    enemy.style.scale = 1.3;
                }
            });
        } else if (enemyPoints == 0) {
            gameOverScreen('Heroes');
            heroes.forEach(hero => {
                if (!hero.classList.contains('die') && unitBase[checkUnit(hero.id)].currHp !== 0) {
                    hero.classList.add('win-pose');
                    hero.style.scale = 1.3;
                }
            });
        }
    }
}

function gameOverScreen(winner) {
    const finalScreen = document.createElement('div');
    finalScreen.id = 'final-screen';
    finalScreen.innerHTML = `${winner} <br>win!`;
    if (winner == 'Heroes') {
        finalScreen.classList.add('heroes-winner');
    } else {
        finalScreen.classList.add('enemies-winner');
    }
    finalScreen.addEventListener('click', ()=> {
        location.reload();
    });

    document.body.appendChild(finalScreen);
}

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

        if (unitIndex >= 0 && unitIndex < unitBase.length) {

            const unitStats = document.createElement('div');

            unitStats.className = 'unit';
            unitStats.innerHTML = `<div class="unit-img">${unitBase[unitIndex].img}</div>`;
            unitStats.innerHTML += `<div class="unit-name">${unitBase[unitIndex].name}</div>`;
            unitStats.innerHTML += `<div class="unit-quote">${unitBase[unitIndex].quote}</div>`;

            unitStats.innerHTML += `<div class="unit-level">Level:${unitBase[unitIndex].level}</div>`;
            unitStats.innerHTML += `<div class="unit-xp">XP:${unitBase[unitIndex].currXp}/${unitBase[unitIndex].maxXp}</div>`;
            unitStats.innerHTML += `<div class="unit-hp">HP:${unitBase[unitIndex].currHp}/${unitBase[unitIndex].maxHp}</div>`;

            unitStats.innerHTML += `<div class="unit-attack">Attack:${unitBase[unitIndex].attack}</div>`;
            unitStats.innerHTML += `<div class="unit-damage">Damage:${unitBase[unitIndex].damage}</div>`;
            unitStats.innerHTML += `<div class="unit-hit-chance">Chance to hit:${unitBase[unitIndex].hitChance}%</div>`;

            unitStats.innerHTML += `<div class="unit-initiative">Initiative:${unitBase[unitIndex].initiative}</div>`;
            unitStats.innerHTML += `<div class="unit-reach">Reach:${unitBase[unitIndex].reach}</div>`;
            unitStats.innerHTML += `<div class="unit-targets">Targets:${unitBase[unitIndex].targets}</div>`;

            objectInfo.appendChild(unitStats);

            objectInfo.className = 'information';
            objectInfo.style.display = 'block';

        } else {

            console.error("Error:", unitIndex);

        }
    });
});

document.addEventListener('click', function() {
    objectInfo.style.display = 'none';
});

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