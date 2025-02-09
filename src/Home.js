//Home.js

import { createElement } from './utils';
import { apiFetch } from './utils';

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

  document.addEventListener('DOMContentLoaded', apiFetch);

  

  // Combine all elements
  return createElement('div', {}, [weatherContainer]);
}

// Fetch weather data when Home component is loaded
apiFetch();




export default Home;