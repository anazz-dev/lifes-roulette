const startButton = document.getElementById('start');
const gameDiv = document.getElementById('game');
const nextButton = document.getElementById('next');
const balanceElement = document.getElementById('balance');
const eventElement = document.getElementById('event');
const resultElement = document.createElement('p');

let balance = 1000;
let round = 0;
const maxRounds = 30;

startButton.addEventListener('click', () => {
    startButton.hidden = true;
    gameDiv.hidden = false;
});

nextButton.addEventListener('click', () => {
    round++;
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

    if (round >= maxRounds) {
        nextButton.disabled = true;
        resultElement.textContent = "In the grand scheme of life, we arrive empty-handed and depart the same way.";
        gameDiv.appendChild(resultElement);
    }
});
