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