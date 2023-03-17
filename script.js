const startButton = document.getElementById('start');
const gameDiv = document.getElementById('game');
const nextButton = document.getElementById('next');
const balanceElement = document.getElementById('balance');
const eventElement = document.getElementById('event');

let balance = 1000;

startButton.addEventListener('click', () => {
    startButton.hidden = true;
    gameDiv.hidden = false;
});

nextButton.addEventListener('click', () => {
    const randomEvent = Math.floor(Math.random() * 3) - 1;
    balance += randomEvent * 100;
    balanceElement.textContent = `Balance: $${balance}`;

    if (randomEvent < 0) {
        eventElement.textContent = `Random Event: Lost $${-randomEvent * 100}`;
    } else if (randomEvent > 0) {
        eventElement.textContent = `Random Event: Gained $${randomEvent * 100}`;
    } else {
        eventElement.textContent = 'Random Event: No change';
    }
});
