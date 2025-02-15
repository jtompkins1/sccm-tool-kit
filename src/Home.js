//home.js
import { createElement, apiFetch } from './utils';

let isHome = true;

function Home() {
    //fetch the weather data and update each element
    apiFetch().then(data => {
      console.log('Fetched data:', data);
      if (data && data.main) {
      currentTemp.textContent = `${Math.round(data.main.temp)}°F `;
      feelsLike.textContent = `${Math.round(data.main.feels_like)}°F`;
      humidity.textContent = `${data.main.humidity}%`;
      tempMax.textContent = `${Math.round(data.main.temp_max)}°F`;
      tempMin.textContent = `${Math.round(data.main.temp_min)}°F`;
      windSpeed.textContent = `${data.wind.speed} m/s`;
      } else {
        console.error('Data or data.main is missing');
      }
    }).catch(error => {
      console.error('Failed to fetch weather data:', error);
    });
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
  const feelsLike = createElement('span', { id: 'feels-like'});
  const humidity = createElement('span', { id: 'humidity'});
  const tempMax = createElement('span', { id: 'temp-max'});
  const tempMin = createElement('span', { id: 'temp-min'});
  const windSpeed = createElement('span', { id: 'wind-speed'});

  const weatherLine = createElement('h3', { id: 'weather-line'}, [
    createElement('span', { textContent: 'The current weather is ' }),
    currentTemp,
    createElement('span', { textContent: '' }),
    captionDesc,
    createElement('br', { textContent: '' }),
    createElement('span', { textContent: 'Feels Like: ' }), feelsLike,
    createElement('br', { textContent: '' }),
    createElement('span', { textContent: 'Humidity: ' }), humidity,
    createElement('br', { textContent: '' }),
    createElement('span', { textContent: 'Max Temp: ' }), tempMax, 
    createElement('br', { textContent: '' }), 
    createElement('span', { textContent: 'Min Temp: ' }), tempMin,
    createElement('br', { textContent: '' }),
    createElement('span', { textContent: 'Wind Speed: ' }), windSpeed
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

  // Function to recreate a single timer
  const recreateTimer = (timer) => {
    const timerTitle = createElement('h2', { textContent: timer.name });
    const progressBar = createElement('div', { id: `progressBar-${timer.name}`, className: 'progress-bar' });
    const timeLeftDisplay = createElement('span', { id: `timeLeft-${timer.name}`, className: 'time-left' });

    timerContainer.appendChild(timerTitle);
    timerContainer.appendChild(progressBar);
    timerContainer.appendChild(timeLeftDisplay);

    let timeLeft = timer.duration;

    // Here we're assuming the timer should start immediately on recreation. If not, adjust this logic.
    progressBar.style.width = '0%';
    timeLeftDisplay.textContent = formatTime(timeLeft);

    const timerInterval = setInterval(() => {
      timeLeft--;
      const percentComplete = ((timer.duration - timeLeft) / timer.duration) * 100;
      progressBar.style.width = `${percentComplete}%`;
      timeLeftDisplay.textContent = formatTime(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert(`${timer.name} timer finished!`);
      }
    }, 1000);

    // Function to format time
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
  };

  // Load saved timers into a select dropdown
  const loadSavedTimers = () => {
    const savedTimers = JSON.parse(localStorage.getItem('timers') || '[]');
    console.log('Saved Timers:', savedTimers); // Log all saved timers
  
    const selectTimer = createElement('select', { id: 'timer-selector' });
  
    savedTimers.forEach(timer => {
      const option = createElement('option', { value: timer.name, textContent: `${timer.name} (${timer.duration} seconds)` });
      selectTimer.appendChild(option);
    });
    
    const selectButton = createElement('button', { textContent: 'Load Timer', className: 'select-timer-button' });
    selectButton.addEventListener('click', () => {
      const savedTimers = JSON.parse(localStorage.getItem('timers') || '[]'); // Re-fetch from localStorage
      const selectedTimerName = selectTimer.value;
      console.log('Selected Timer:', selectedTimerName); // Log the selected timer name
      
      const timerToRecreate = savedTimers.find(timer => timer.name === selectedTimerName);
      console.log('Timer to Recreate:', timerToRecreate); // Log the found timer or undefined
      
      if (timerToRecreate) {
        recreateTimer(timerToRecreate);
      } else {
        alert('Selected timer not found. Please ensure the timer name matches exactly.');
      }
    });
  
    timerContainer.appendChild(selectTimer);
    timerContainer.appendChild(selectButton);
  };

  // Add click event listener to the button for creating new timers
  timerButton.addEventListener('click', () => {
    const timerName = prompt("Enter the name for your timer:");
    const timerDuration = parseInt(prompt("Enter the duration in seconds:"));

    if (!timerName || isNaN(timerDuration) || timerDuration <= 0) {
      alert("Please enter valid inputs.");
      return;
    }

    // Store new timer in local storage
    const timers = JSON.parse(localStorage.getItem('timers') || '[]');
    timers.push({ name: timerName, duration: timerDuration });
    localStorage.setItem('timers', JSON.stringify(timers));
    console.log('After adding new timer:', JSON.parse(localStorage.getItem('timers')));

    // Optionally, update the dropdown with the new timer
    const selectTimer = document.getElementById('timer-selector');
    if (selectTimer) {
      const option = createElement('option', { value: timerName, textContent: `${timerName} (${timerDuration} seconds)` });
      selectTimer.appendChild(option);
    }
  });

  // Append the button to the timer container
  timerContainer.appendChild(timerButton);

  // Load saved timers into a dropdown for selection
  loadSavedTimers();

  // Main container with both weather and timer sections
  const container = createElement('div', {}, [
    weatherContainer,
    timerContainer
  ]);

  const fetchWeather = async () => {
    await apiFetch(); 
  };

  document.addEventListener('DOMContentLoaded', fetchWeather);

  window.addEventListener('popstate', () => {
    if (window.location.hash === '#/home') { 
      fetchWeather();
    }
  });


  return container;
}

export const fetchWeather = async () => {
  await apiFetch();
};

export const checkAndFetchWeather = () => {
  if (window.location.pathname === '/home') {
    fetchWeather();
  }
};

export default Home;