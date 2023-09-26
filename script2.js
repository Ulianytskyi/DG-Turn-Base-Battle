const gameBoard = document.getElementById('board');

function generatePositions(value) {
    let positions = [];
    for (let i = 0; i < value; i++) {
        const pos = document.createElement('div');
        pos.className = "pos pos" + (i + 1);
        pos.innerText = (i + 1);
        positions.push(pos);
    }
    return positions;
}

const newPos = generatePositions(12);
newPos.forEach(pos => gameBoard.appendChild(pos));

function createUnits(value) {
    let units = [];
    for (let i = 0; i < value; i++) {
        const unit = document.createElement('div');
        const sword = document.createElement('div');
        sword.innerHTML = '🗡';
        sword.className = 'sword sword' + (i+1);
        unit.innerHTML = '🧍🏻‍♂️';
        unit.className = 'unit unit' + (i+1);
        units.push(unit, sword);
    }
    return units;
}

const newUnits = createUnits(6);
newUnits.forEach(unit => gameBoard.appendChild(unit));

const enemy = document.createElement('div');
enemy.innerHTML = '🦄';
enemy.className = 'enemy';
gameBoard.appendChild(enemy);