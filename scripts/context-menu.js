import { checkUnit, unitBase } from "../scripts/script.js";

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
        const unitSide = event.target.id.slice(0, -1);

        if (unitIndex >= 0 && unitIndex < unitBase.length) {

            const unitStats = document.createElement('div');

            unitStats.className = 'unit';
            unitStats.innerHTML = `<div class="unit-img">${unitBase[unitIndex].img}</div>`;
            unitStats.innerHTML += `<div class="unit-name">${unitBase[unitIndex].name}</div>`;
            unitStats.innerHTML += `<div class="unit-quote">${unitBase[unitIndex].quote}</div>`;

            unitStats.innerHTML += `<div class="unit-level">Level: ${unitBase[unitIndex].level}</div>`;
            unitStats.innerHTML += `<div class="unit-xp">XP: ${unitBase[unitIndex].currXp}/${unitBase[unitIndex].maxXp}</div>`;
            unitStats.innerHTML += `<div class="unit-hp">HP: ${unitBase[unitIndex].currHp}/${unitBase[unitIndex].maxHp}</div>`;

            unitStats.innerHTML += `<div class="unit-attack">Attack: ${unitBase[unitIndex].attack}</div>`;
            unitStats.innerHTML += `<div class="unit-damage">Damage: ${unitBase[unitIndex].damage}</div>`;
            unitStats.innerHTML += `<div class="unit-hit-chance">Chance to hit: ${unitBase[unitIndex].hitChance}%</div>`;

            unitStats.innerHTML += `<div class="unit-initiative">Initiative: ${unitBase[unitIndex].initiative}</div>`;
            unitStats.innerHTML += `<div class="unit-reach">Reach: ${unitBase[unitIndex].reach}</div>`;
            unitStats.innerHTML += `<div class="unit-targets">Targets: ${unitBase[unitIndex].targets}</div>`;
            unitStats.innerHTML += `<div class="unit-hp">Active: ${unitBase[unitIndex].active}</div>`;
            unitStats.innerHTML += `<div class="unit-hp">Side: ${unitBase[unitIndex].side}</div>`;

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
