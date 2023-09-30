
// unit information ------------------------------------------------------

export let unitCoords = [
    {x : 150, y : 150}, {x : 250, y : 150}, {x : 350, y : 150},
    {x : 150, y : 250}, {x : 250, y : 250}, {x : 350, y : 250},
    {x : 150, y : 550}, {x : 250, y : 550}, {x : 350, y : 550},
    {x : 150, y : 450}, {x : 250, y : 450}, {x : 350, y : 450},
]

let unitStats = [
    {img: 'X', 
    name: 'Name', 
    quote: 'Quote', 
    level: '1', 
    xp: 0, 
    hp: 75, 
    damage: 55, 
    hitChance: 80}
]

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

// functions --------------------------------------------------------------------

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generatePerson(value) {
    const units = [];
    for (let i = 0; i < value; i++) {
        const unit = document.createElement('div');
        unit.className = 'unit';
        unit.innerHTML = `<div class="unit-title">${personsName[i]}</div>`;
        unit.innerHTML += `<div class="unit-hp">10</div>`;
        unit.innerHTML += `<div class="unit-img">${personsIcons[i]}</div>`;
        unit.innerHTML += `<div class="unit-quote">${personsQuotes[i]}</div>`;
        units.push(unit);
    }
    return units;
}

export function generateUnitsArray(value) {
    shuffleArray(personsName);
    shuffleArray(personsQuotes);
    shuffleArray(personsIcons);
    
    const unitsArray = generatePerson(value);
    return unitsArray;
}
