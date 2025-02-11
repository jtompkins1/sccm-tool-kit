import { createElement, apiFetch } from './utils';

function Home() {
  // Weather Container
  const weatherContainer = createElement('div', { className: 'weather-container' });

  // Day and Time
  const dateTime = createElement('h2', {
    textContent: `Today is ${new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })}`
  });

  // Current Weather
  const currentWeather = createElement('div', { id: 'todayWeather' });
  const currentTemp = createElement('span', { id: 'current-temp' });
  const captionDesc = createElement('span', { id: 'desc' });

  const weatherLine = createElement('h3', {}, [
    createElement('span', { textContent: 'The current weather is ' }),
    currentTemp,
    createElement('span', { textContent: '  ' }),
    captionDesc
  ]);

  currentWeather.appendChild(weatherLine);
  weatherContainer.appendChild(dateTime);
  weatherContainer.appendChild(currentWeather);

  // Timer Container
  const timerContainer = createElement('div', { className: 'timer-container' });

  // Create Timer Button
  const timerButton = createElement('button', {
    textContent: 'Create Timer',
    id: 'createTimerButton'
  });

  // Add click event listener to the button
  timerButton.addEventListener('click', () => {
    const timerName = prompt("Enter the name for your timer:");
    const timerDuration = parseInt(prompt("Enter the duration in seconds:"));

    if (!timerName || isNaN(timerDuration) || timerDuration <= 0) {
        alert("Please enter valid inputs.");
        return;
    }

    // Create timer elements
    const timerTitle = createElement('h2', { textContent: timerName });
    const progressBar = createElement('div', { id: `progressBar-${timerName}`, className: 'progress-bar' });
    const timeLeftDisplay = createElement('span', { id: `timeLeft-${timerName}`, className: 'time-left' });

    // Append elements to timerContainer
    timerContainer.appendChild(timerTitle);
    timerContainer.appendChild(progressBar);
    timerContainer.appendChild(timeLeftDisplay);

    let timeLeft = timerDuration;

    // Timer logic
    progressBar.style.width = '0%';
    timeLeftDisplay.textContent = formatTime(timeLeft);

    const timer = setInterval(() => {
        timeLeft--;
        const percentComplete = ((timerDuration - timeLeft) / timerDuration) * 100;
        progressBar.style.width = `${percentComplete}%`;
        timeLeftDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`${timerName} timer finished!`);
        }
    }, 1000);

    // Helper function to format time
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
  });

  // Append the button to the timer container
  timerContainer.appendChild(timerButton);

  // Main container with both weather and timer sections
  const container = createElement('div', {}, [
    weatherContainer,
    timerContainer
  ]);

  // Fetch weather data when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', async () => {
    await apiFetch(); 
  });

  return container;
}

export default Home;