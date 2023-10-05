
// unit information ------------------------------------------------------

export let unitCoords = [
    {x : 150, y : 150}, {x : 270, y : 150}, {x : 390, y : 150},
    {x : 150, y : 250}, {x : 270, y : 250}, {x : 390, y : 250},
    {x : 150, y : 550}, {x : 270, y : 550}, {x : 390, y : 550},
    {x : 150, y : 450}, {x : 270, y : 450}, {x : 390, y : 450},
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
        units[i].active = true;
        units[i].side = null;
        
    }
    return units;
}

export function generateUnitBase(value) {
    shuffleArray(personsName);
    shuffleArray(personsQuotes);
    shuffleArray(personsIcons);
    
    const unitsArray = generateUnitInformation(value);
    return unitsArray;
}