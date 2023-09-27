const gameBoard = document.getElementById('board');
const gameField = document.getElementById('game-field');

// terrains -------------------------------------------------------

function generatePositions(value) {
    let positions = [];
    for (let i = 0; i < value; i++) {
        const pos = document.createElement('div');
        pos.className = "pos pos" + (i + 1);

        const pos2 = document.createElement('div');
        pos2.className = "sprite-container2";

        const pos3 = document.createElement('div');
        pos3.className = "sprite terrain-sprites terrain";
        
        pos2.appendChild(pos3);
        pos.appendChild(pos2);
        positions.push(pos);
    }
    return positions;
}

const newPos = generatePositions(12);
newPos.forEach(pos => gameBoard.appendChild(pos));

// units ------------------------------------------------------------

function createUnits(value, type) {
    let units = [];
    for (let i = 0; i < value; i++) {
        const unit1 = document.createElement('div');
        unit1.className = `pixel pos-${type}` + (i+1);

        const unit2 = document.createElement('div');
        unit2.className = `sprite-container`;

        const unit3 = document.createElement('div');
        unit3.className = `sprite unit-sprites ${type}`;

        unit2.appendChild(unit3);
        unit1.appendChild(unit2);
        units.push(unit1);
    }
    return units;
}

const heroUnits = createUnits(6, 'hero');
const enemyUnits = createUnits(3, 'enemy');
heroUnits.forEach(unit => gameField.appendChild(unit));
enemyUnits.forEach(unit => gameField.appendChild(unit));

