import { createElement, apiFetch } from './utils';

let forecastData = null; 

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
    const dayElement = createElement('div', { id: day.id, textContent: '' });
    const forecastElement = createElement('div', { id: day.forecastId });
    forecastContainer.appendChild(dayElement);
    forecastContainer.appendChild(forecastElement);
    forecastContainer.appendChild(createElement('br')); 
  });

  // Combine all elements
  const container = createElement('div', {}, [
    title,
    forecastContainer
  ]);

  //update forecast display
  const updateForecast = (data) => {
    if (!data) return;
    forecastDays.forEach((day, index) => {
      const dayEl = document.getElementById(day.id);
      const forecastEl = document.getElementById(day.forecastId);
      if (dayEl && forecastEl) {
        dayEl.textContent = data.days[index].day || 'No Data';
        forecastEl.textContent = data.days[index].forecast || 'No Data';
      }
    });
  };

  //fetch forecast
  const fetchInitialForecast = async () => {
    try {
      const data = await apiFetch('forecast');
      forecastData = data;
      updateForecast(forecastData);
    } catch (error) {
      console.error('Error fetching initial forecast:', error);
      // Optionally, handle error by showing a message or using cached data if available
    }
  };

  // Call fetchInitialForecast immediately when the component is created
  fetchInitialForecast();



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