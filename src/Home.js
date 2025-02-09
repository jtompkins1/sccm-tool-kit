//Home.js

import { createElement } from './utils';
import { apiFetch } from './utils';
import { getHolidays, displayHolidays } from './Holiday';


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

  // Row 2 Container
  const row2Container = createElement('div', { className: 'row2-container' });
  //holiday container
  const holidayContainer = createElement('div', { className: 'holiday-container', id: 'holiday-container' });

  row2Container.appendChild(holidayContainer);

   // Function to display holidays
   function displayHolidays(holidays) {
    holidayContainer.innerHTML = ''; // Clear previous content
    
    // Add the title before listing holidays
    holidayContainer.appendChild(createElement('h2', { textContent: 'US Holidays in 2025' }));
    
    holidays.forEach(holiday => {
      const holidayItem = createElement('p', {
        textContent: `${holiday.name} - ${holiday.dateString}`
      });
      holidayContainer.appendChild(holidayItem);
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    apiFetch(); // Fetch weather data

    const holidays = getHolidays();
    displayHolidays(holidays);
    console.log('Holiday container content:', holidayContainer.innerHTML);
  });


    //time zone container
    const timeZoneContainer = createElement('div', { className: 'time-zone' });
    row2Container.appendChild(timeZoneContainer);

    timeZoneContainer.appendChild(createElement('h2', { textContent: 'Time in Nigeria' }));




  return createElement('div', {}, [weatherContainer, row2Container]);
}

export default Home;