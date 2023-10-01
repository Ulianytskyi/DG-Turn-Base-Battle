
// unit information ------------------------------------------------------

export let unitCoords = [
    {x : 150, y : 150}, {x : 250, y : 150}, {x : 350, y : 150},
    {x : 150, y : 250}, {x : 250, y : 250}, {x : 350, y : 250},
    {x : 150, y : 550}, {x : 250, y : 550}, {x : 350, y : 550},
    {x : 150, y : 450}, {x : 250, y : 450}, {x : 350, y : 450},
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

function generateUnitInformation(value) {
    const units = [];
    for (let i = 0; i < value; i++) {

        units[i] = {};
        units[i].img = personsIcons[i];
        units[i].name = personsName[i];
        units[i].quote = personsQuotes[i];
        units[i].level = 1;
        units[i].currXp = 0;
        units[i].maxXp = 100;
        units[i].currHp = 75;
        units[i].maxHp = 75;
        units[i].attack = 'Spear';
        units[i].damage = 55;
        units[i].hitChance = 80;
        units[i].initiative = 60;
        units[i].reach = 'Any unit';
        units[i].targets = 1;
        
    }
    return units;
}

function generateUnitBase(value) {
    shuffleArray(personsName);
    shuffleArray(personsQuotes);
    shuffleArray(personsIcons);
    
    const unitsArray = generateUnitInformation(value);
    return unitsArray;
}

function makeInformationCard(value) {

    let unitBase = generateUnitBase(value);

    const unitCards = [];
    for (let i = 0; i < value; i++) {
        const unit = document.createElement('div');
        unit.className = 'unit';
        unit.innerHTML = `<div class="unit-img">${unitBase[i].img}</div>`;
        unit.innerHTML += `<div class="unit-name">${unitBase[i].name}</div>`;
        unit.innerHTML += `<div class="unit-quote">${unitBase[i].quote}</div>`;

        unit.innerHTML += `<div class="unit-level">Level: ${unitBase[i].level}</div>`;
        unit.innerHTML += `<div class="unit-xp">XP: ${unitBase[i].currXp}/${unitBase[i].maxXp}</div>`;
        unit.innerHTML += `<div class="unit-hp">HP: ${unitBase[i].currHp}/${unitBase[i].maxHp}</div>`;

        unit.innerHTML += `<div class="unit-attack">Attack: ${unitBase[i].attack}</div>`;
        unit.innerHTML += `<div class="unit-damage">Damage: ${unitBase[i].damage}</div>`;
        unit.innerHTML += `<div class="unit-hit-chance">Chance to hit: ${unitBase[i].hitChance}%</div>`;

        unit.innerHTML += `<div class="unit-initiative">Initiative: ${unitBase[i].initiative}</div>`;
        unit.innerHTML += `<div class="unit-reach">Reach: ${unitBase[i].reach}</div>`;
        unit.innerHTML += `<div class="unit-targets">Targets: ${unitBase[i].targets}</div>`;

        unitCards.push(unit);
    }
    return [unitCards, unitBase];
}

export function generateUnitsCardArray(value) {

    const unitCardsArray = makeInformationCard(value);

    return unitCardsArray;
}
