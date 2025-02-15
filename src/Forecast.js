import { createElement, apiFetch } from './utils';

// Cache for forecast data
let forecastData = null; 

function Forecast() {
  // Forecast Container
  const forecastContainer = createElement('div', { className: 'forecast-container' });

  // Title
  const title = createElement('h1', { id: 'forecast-title', textContent: '3-Day Forecast' });

  // Refresh button for updating forecast
  const refreshButton = createElement('button', { 
    textContent: 'Refresh Forecast', 
    id: 'refresh-forecast'
  });

  // Forecast Days and Temperatures
  const forecastDays = [
    { id: 'day1', forecastId: 'forecast1' },
    { id: 'day2', forecastId: 'forecast2' },
    { id: 'day3', forecastId: 'forecast3' }
  ];

  forecastDays.forEach(day => {
    const dayElement = createElement('div', { id: day.id, textContent: 'Loading...' });
    const forecastElement = createElement('div', { id: day.forecastId });
    forecastContainer.appendChild(dayElement);
    forecastContainer.appendChild(forecastElement);
    forecastContainer.appendChild(createElement('br')); 
  });

  // Combine all elements
  const container = createElement('div', {}, [
    title,
    forecastContainer,
    refreshButton
  ]);

  //update forecast display
  const updateForecast = (data) => {
    if (!data) return;
    forecastDays.forEach((day, index) => {
      const dayEl = document.getElementById(day.id);
      const forecastEl = document.getElementById(day.forecastId);
      if (dayEl && forecastEl) {
        dayEl.textContent = data.days[index].day;
        forecastEl.textContent = data.days[index].forecast;
      }
    });
  };

  // Fetch forecast data when the DOM is loaded or refresh button is clicked
  document.addEventListener('DOMContentLoaded', () => {
    apiFetch('forecast').then(data => {
      forecastData = data;
      updateForecast(forecastData);
    });
  });

  // Event listener for the refresh button
  refreshButton.addEventListener('click', async () => {
    try {
      const data = await apiFetch('forecast');
      forecastData = data;
      updateForecast(forecastData);
    } catch (error) {
      console.error('Error refreshing forecast:', error);

    }
  });

  return container;
}

export const fetchForecast = async () => {
  const response = await apiFetch('forecast');
  forecastData = response;
  updateForecast(forecastData);
};

export const checkAndFetchForecast = () => {
  if (window.location.pathname === '/forecast') {
    fetchForecast();
  }
};

export default Forecast;