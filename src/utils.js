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

const url = "https://api.openweathermap.org/data/2.5/weather?lat=36.32&lon=-94.10&units=imperial&appid=c7039a0ebd28f4b790d99a40ca9311c5";


export async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);//for testing
            displayWeatherResults(data);

         } else {
            throw Error(await response.text());
         }

    } catch (error) {
        console.log(error);
    }

};

export function displayWeatherResults(data) {
  document.getElementById('current-temp').innerHTML = `${Math.round(data.main.temp)}°F  and ${data.weather[0].main}`;

};

