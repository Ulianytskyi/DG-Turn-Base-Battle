const gameBoard = document.getElementById('board');
const randomizer = document.getElementById('shuffle-btn');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let personsName = [
    'Ugre', 'Indulm', 'Tezi', 'Dizu', 'Zathmen', 
    'Tendozak', 'Hidruch', 'Tirdurg', 'Tigraum', 
    'Maoge', 'Duhgilzit', 'Chigesh',
];

let personsQuotes = [
    'Shine in the light!', 'For king and country!',
    'Death to the enemy!', 'We reign forever!',
    'For gold and glory!', 'Follow me to glory!',
    'Stand united!', 'Fill them with regret!', 
    'Destroy them all!', 'Bring it on!', 
    'We are not afraid!', 'Victory or death!',
];

let personsIcons = [
    '👨🏻‍🦰', '👨🏻', '🧔🏻', '🧔🏾', '👨🏻‍🦲', '👨🏽‍🦲', 
    '👨🏻‍🦳', '🧑🏻', '👨🏼', '👨🏿‍🦰', '🧔🏼', '👨🏿‍🦱',
];

function generatePerson(value) {
    const cards = [];
    for (let i = 0; i < value; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<div class="card-title">${personsName[i]}</div>`;
        card.innerHTML += `<div class="card-hp">10</div>`;
        card.innerHTML += `<div class="card-img">${personsIcons[i]}</div>`;
        card.innerHTML += `<div class="card-quote">${personsQuotes[i]}</div>`;
        cards.push(card);
    }
    return cards;
}

function refreshGameBoard() {
    shuffleArray(personsName);
    shuffleArray(personsQuotes);
    shuffleArray(personsIcons);

    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    const newCards = generatePerson(3);
    newCards.forEach(card => gameBoard.appendChild(card));
}

// refreshGameBoard();

randomizer.addEventListener('click', () => {
    refreshGameBoard();
});

