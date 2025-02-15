// forecast.js
import { createElement, apiFetch } from './utils';

function Forecast() {
  // Forecast Container
  const forecastContainer = createElement('div', { className: 'forecast-container' });

  // Title
  const title = createElement('h1', { id: 'forecast-title', textContent: '3-Day Forecast' });

  // Forecast Days and Temperatures
  const forecastDays = [
    { id: 'day1', forecastId: 'forecast1' },
    { id: 'day2', forecastId: 'forecast2' },
    { id: 'day3', forecastId: 'forecast3' }
  ];

  forecastDays.forEach(day => {
    const dayElement = createElement('div', { id: day.id });
    const forecastElement = createElement('div', { id: day.forecastId });
    forecastContainer.appendChild(dayElement);
    forecastContainer.appendChild(forecastElement);
    forecastContainer.appendChild(createElement('br')); // Add line break for readablitity
  });

  // Combine all elements
  const container = createElement('div', {}, [
    title,
    forecastContainer
  ]);

  // Fetch forecast data when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    apiFetch('forecast');
  });

  // fetch forecast data when the URL changes to /page3
  window.addEventListener('popstate', () => {
    if (window.location.hash === '#/page3') { 
      apiFetch('forecast');
    }
  });

  return container;
}

export const fetchForecast = async () => {
  await apiFetch('forecast');
};

export const checkAndFetchForecast = () => {
  if (window.location.pathname === '/forecast') {
    fetchForecast();
  }
};

export default Forecast;