// mouseover info ---------------------------------------------------

const heroElements = document.querySelectorAll('.sprite.hero');
const enemyElements = document.querySelectorAll('.sprite.enemy');

heroElements.forEach(function(heroElement) {
    const unitHpBar = heroElement.querySelector('.health-bar');
    heroElement.addEventListener('mouseenter', function() {

        // unitHpBar.classList.remove('hide');
        
    });
    heroElement.addEventListener('mouseleave', function() {

        // unitHpBar.classList.add('hide');

    });
});

enemyElements.forEach(function(enemyElement) {
    const unitHpBar = enemyElement.querySelector('.health-bar');
    enemyElement.addEventListener('mouseenter', function() {

        // unitHpBar.classList.remove('hide');

    });
    enemyElement.addEventListener('mouseleave', function() {

        // unitHpBar.classList.add('hide');

    });
});