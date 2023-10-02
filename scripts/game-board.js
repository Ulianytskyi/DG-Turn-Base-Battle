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