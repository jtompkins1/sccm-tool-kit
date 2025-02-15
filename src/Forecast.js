import { createElement, apiFetch, getDayDate } from './utils';

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
    const dayElement = createElement('div', { id: day.id, textContent: 'Refresh to load forecast' });
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

  // Update forecast display
  const updateForecast = (data) => {
    if (!data || !data.list) return; 

    forecastDays.forEach((day, index) => {
      const forecastIndex = index * 8 + 4; 
      const forecast = data.list[forecastIndex];
      if (forecast) {
        const dayEl = document.getElementById(day.id);
        const forecastEl = document.getElementById(day.forecastId);
        if (dayEl && forecastEl) {
          dayEl.textContent = getDayDate(forecast.dt); // Turn the timestamp into a day
          forecastEl.textContent = `${Math.round(forecast.main.temp)}°F`; // Set the temperature
        }
      }
    });
  };

  // Fetch forecast
  const fetchInitialForecast = async () => {
    try {
      const data = await apiFetch('forecast');
      forecastData = data;
      updateForecast(forecastData);
    } catch (error) {
      console.error('Error fetching initial forecast:', error);
    }
  };

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

  // Fetch forecast data when the DOM is loaded
  document.addEventListener('DOMContentLoaded', fetchInitialForecast);

  return container;
}

export const fetchForecast = async () => {
  try {
    const response = await apiFetch('forecast');
    forecastData = response;
    updateForecast(forecastData);
  } catch (error) {
    console.error('Error fetching forecast:', error);
  }
};

export const checkAndFetchForecast = () => {
  if (window.location.pathname === '/forecast') {
    fetchForecast();
  }
};

export default Forecast;