// utils.js

export function createElement(type, props = {}, children = []) {
    const element = document.createElement(type);
  
    // props: {textContent: "Hello world!", id: "header1", "data-productId": 123, ...}
    Object.entries(props).forEach(([key, value]) => {
      if(~key.indexOf('-')) {
        element.setAttribute(key, value); // data attributes
      } else {
        element[key] = value;
      }
    });
  
    children.forEach((child) => {
      element.appendChild(child);
    });
  
    return element;
  }

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=36.32&lon=-94.10&units=imperial&appid=c7039a0ebd28f4b790d99a40ca9311c5";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=36.32&lon=-94.10&units=imperial&appid=c7039a0ebd28f4b790d99a40ca9311c5";


export async function apiFetch(type = 'weather') {
  const url = type === 'forecast' ? forecastUrl : weatherUrl;
  try {
      const response = await fetch(url);
      if (response.ok) {
          const data = await response.json();
          console.log(data); // for testing
          if (type === 'forecast') {
              displayForecastResults(data);
          } else {
              displayWeatherResults(data);
          }
      } else {
          throw new Error(await response.text());
      }
  } catch (error) {
      console.log(error);
  }
};

export function displayWeatherResults(data) {
  document.getElementById('current-temp').innerHTML = `${Math.round(data.main.temp)}°F  and ${data.weather[0].main}`;

};

export function displayForecastResults(forecastData) {
  // Assuming you have elements with these IDs in your forecast page
  let forecastDays = ['#day1', '#day2', '#day3'];
  let forecastTemps = ['#forecast1', '#forecast2', '#forecast3'];
  
  for(let i = 0; i < 3; i++) {
      let forecastIndex = i * 8 + 4; // Every 8 entries is about 24 hours, we want the middle of the day 
      let item = forecastData.list[forecastIndex];
      
      document.querySelector(forecastDays[i]).textContent = getDayDate(item.dt);
      document.querySelector(forecastTemps[i]).textContent = `${Math.round(item.main.temp)}°F`;
  }
};


function getDayDate(timestamp) {
  const dateObject = new Date(timestamp * 1000);
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObject.getDay()];

  return `${dayOfWeek} ${month}/${day}`;
};

