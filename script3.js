const gameField = document.getElementById('game-field');
const gameBoard = document.getElementById('board');

function createTerrain(value) {
    let bgTerrains = [];
    for (let i = 0; i < value; i++) {
        const bg1 = document.createElement('div');
        bg1.className = `terrain-sprite-container pos-ter0`;

        const bg2 = document.createElement('div');
        bg2.className = `terrain-sprite`;

        bg1.appendChild(bg2);
        bgTerrains.push(bg1);
    }
    return bgTerrains;
}

const terrains = createTerrain(10);
terrains.forEach(terrain => gameBoard.appendChild(terrain));

function createUnits(value, type) {
    let units = [];
    for (let i = 0; i < value; i++) {
        const unit1 = document.createElement('div');
        unit1.className = `sprite-container pos-${type+(i+1)}`;

        const unit2 = document.createElement('div');
        unit2.className = `sprite ${type}`;

        unit1.appendChild(unit2);
        units.push(unit1);
    }
    return units;
}

const heroUnits = createUnits(6, 'hero');
heroUnits.forEach(unit => gameField.appendChild(unit));


const enemyUnits = createUnits(1, 'enemy');
enemyUnits.forEach(unit => gameField.appendChild(unit));


let i = 1;
function heroIdle() {
    // heroUnits[0].lastChild.className = `sprite hero idle${i+1}`;

    // OR

    // heroUnits.forEach(element => {
    //     element.lastChild.className = `sprite hero idle${i}`;
    // })

    i = (i + 1) % 2; 
}
setInterval(heroIdle, 1500);
