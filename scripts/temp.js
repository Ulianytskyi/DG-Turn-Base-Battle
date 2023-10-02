// mouse events ----------------------------------------------------------

const targetElement = document.getElementById('game-container');

targetElement.addEventListener('mousedown', handleMouseDown);


function handleMouseDown(event) {
    const rect = targetElement.getBoundingClientRect();
    
    const xRelativeToElement = event.clientX - rect.left;
    const yRelativeToElement = event.clientY - rect.top;

    // console.log(`Координати мишки: X=${xRelativeToElement}, Y=${yRelativeToElement}`);
}


gameField.addEventListener('mousedown', handleClick);

function handleClick(event) {
    
    const clickedElement = event.target;

    
    if (clickedElement.classList.contains('sprite')) {
        if (clickedElement.classList.contains('hero')) {
            
            // console.log('Клікнуто на героя:', clickedElement.classList);

        } else if (clickedElement.classList.contains('enemy')) {
            
            // console.log('Клікнуто на ворога:', clickedElement.classList);
        }
    }
}

// batle-----------------------------------
const heroes = document.querySelectorAll('.hero');
const enemies = document.querySelectorAll('.enemy');

let selectedUnit1 = null;
let selectedUnit2 = null;

heroes.forEach(hero => {
    hero.addEventListener('click', handleHeroClick);
});

enemies.forEach(enemy => {
    enemy.addEventListener('click', handleEnemyClick);
});

function handleHeroClick(event) {
    
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
}

function handleEnemyClick(event) {
    if (selectedUnit1 !== null) {
        selectedUnit2 = event.target;

        if (!selectedUnit2.classList.contains('die')) {
            selectedUnit2.classList.add('selected');
           
            let type = checkUnitType(selectedUnit1);
            battle(selectedUnit1, type, selectedUnit2);
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
}

function checkUnitType(eventTarget) {
    if (eventTarget.classList.contains('hero')) {
        return 'hero';
    } else {
        return 'enemy';
    }
}

function battle(selectedUnit1, type, selectedUnit2) {
    unitAttack(selectedUnit1, type, selectedUnit2);
    
    setTimeout(clearSelection, 2000);
}

function unitAttack(selectedUnit1, type, selectedUnit2) {
    let count = 0;
    const timerInterval = setInterval(function() {
        if (count < 4) {
            if (count == 2) {
                selectedUnit2.classList.add('hitted');
            }
            selectedUnit1.className = `sprite ${type} attack${count}`;
            count++;
        } else {
            selectedUnit1.classList.remove('attack3');
            selectedUnit2.classList.remove('hitted');

            calculateDamage(selectedUnit1, selectedUnit2);
            checkDeath(selectedUnit2);
            clearInterval(timerInterval);
        }
    }, 300);
}

function calculateDamage(u1, u2) {
    let u1Attack = unitBase[checkUnit(u1.id)].damage;
    let u2Hp = unitBase[checkUnit(u2.id)].currHp;
    u2Hp -= u1Attack;
    unitBase[checkUnit(u2.id)].currHp = u2Hp;
    u2.children[0].innerText = `${unitBase[checkUnit(u2.id)].currHp}/${unitBase[checkUnit(u2.id)].maxHp}`;
}

function checkDeath(u2) {
    if (unitBase[checkUnit(u2.id)].currHp <= 0) {
        unitBase[checkUnit(u2.id)].currHp = 0;
        u2.classList.add('die');
        u2.children[0].innerText = `0/${unitBase[checkUnit(u2.id)].maxHp}`;
        unitBase[checkUnit(u2.id)].img = '☠️';
        unitBase[checkUnit(u2.id)].name = `${unitBase[checkUnit(u2.id)].name} <span class='die-status'>[dead]</span>`;
    }
}