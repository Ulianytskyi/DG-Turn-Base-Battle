// cheat mode -----------------

export let cheatOn = false;
const cheatBtn = document.createElement('button');
cheatBtn.id = 'cheat';
cheatBtn.innerText = 'One punch mode off';
document.body.appendChild(cheatBtn);

cheatBtn.style.backgroundColor = '#6effba';
cheatBtn.addEventListener('click', ()=> {
    if (cheatOn) {
        cheatOn = false;
        cheatBtn.textContent = 'One punch mode off';
        cheatBtn.style.backgroundColor = '#6effba';
    } else {
        cheatOn = true;
        cheatBtn.textContent = 'One punch mode on';
        cheatBtn.style.backgroundColor = '#ffa3fb';
    }
});

