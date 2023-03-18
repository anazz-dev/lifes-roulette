const balanceChartCanvas = document.getElementById('balanceChart');

let balanceChartData = {
  labels: [],
  datasets: [
    {
      label: 'Monetary Success Over the Years',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      pointRadius: 2,
    },
  ],
};

let balanceChart = new Chart(balanceChartCanvas, {
  type: 'line',
  data: balanceChartData,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Wealth',
        },
        beginAtZero: true,
      },
    },
  },
});

const startButton = document.getElementById('start');
const gameDiv = document.getElementById('game');
const nextButton = document.getElementById('next');
const wealthElement = document.getElementById('wealth');
const eventElement = document.getElementById('event');
const resultElement = document.createElement('p');

let wealth = Math.floor(Math.random() * 1001) - 500;
let age = 0;
const maxAge = 75;

startButton.addEventListener('click', () => {
  startButton.hidden = true;
  gameDiv.hidden = false;
  wealthElement.textContent = `Wealth: $${wealth}`; // Add this line to show the starting wealth
});

nextButton.addEventListener('click', () => {
  age++;
  const impactFactor = age <= 20 ? 1 : (75 - age) / 40;
  const randomEvent = Math.floor(Math.random() * 3) - 1;
  wealth += randomEvent * 100 * impactFactor;
  wealthElement.textContent = `Wealth: $${Math.round(wealth)}`;

  if (randomEvent < 0) {
    eventElement.textContent = `Random Event: Lost $${Math.round(-randomEvent * 100 * impactFactor)}`;
  } else if (randomEvent > 0) {
    eventElement.textContent = `Random Event: Gained $${Math.round(randomEvent  * 100 * impactFactor)}`;
  } else {
    eventElement.textContent = 'Random Event: No change';
  }

  // Late life event with a 10% chance of happening between ages 50 and 60
  if (age >= 40 && age <= 60 && Math.random() < 0.1) {
    const lateLifeEvent = Math.floor(Math.random() * 2001) - 1000;
    wealth += lateLifeEvent;
    wealthElement.textContent = `Wealth: $${Math.round(wealth)}`;
    eventElement.textContent += ` | Late Life Event: ${(lateLifeEvent > 0 ? 'Gained' : 'Lost')} $${Math.abs(lateLifeEvent)}`;
  }

  balanceChartData.labels.push(age);
  balanceChartData.datasets[0].data.push(wealth);
  balanceChart.update();

  if (age >= 75) {
    nextButton.disabled = true;
    resultElement.textContent = "In the grand scheme of life, we arrive empty-handed 👶🏼 and depart empty-handed.⚰️";
    gameDiv.appendChild(resultElement);
  }
});
