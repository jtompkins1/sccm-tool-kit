import { createElement } from './utils';
import { getWeather, renderWeather } from './weather.js';
import { mmToInches, renderConversion } from './unitConverter.js';

function WeatherSection() {
  const weatherSection = createElement('section', { id: 'weather' }, [
    createElement('input', { type: 'text', id: 'cityInput', placeholder: 'Enter a city' }),
    createElement('button', { id: 'getWeather', textContent: 'Get Weather' })
  ]);

  // Add event listener only after the element has been created and added to the DOM
  weatherSection.querySelector('#getWeather').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
      try {
        const weatherData = await getWeather(city);
        renderWeather(weatherData);
      } catch (error) {
        console.error('Weather fetch failed:', error);
      }
    }
  });

  return weatherSection;
}

function UnitConverterSection() {
  const unitConverterSection = createElement('section', { id: 'unitConverter' }, [
    createElement('input', { type: 'number', id: 'mmInput', placeholder: 'Enter mm' }),
    createElement('button', { id: 'convertButton', textContent: 'Convert to Inches' }),
    createElement('p', { id: 'result' })
  ]);

  // Add event listener only after the element has been created and added to the DOM
  unitConverterSection.querySelector('#convertButton').addEventListener('click', async () => {
    const mm = document.getElementById('mmInput').value;
    if (mm && !isNaN(mm)) {
      try {
        const inches = await mmToInches(mm);
        renderConversion(mm, inches);
      } catch (error) {
        document.getElementById('result').textContent = 'Error converting: ' + error.message;
      }
    } else {
      document.getElementById('result').textContent = "Please enter a valid number for mm.";
    }
  });

  return unitConverterSection;
}

function App() {
  const appContainer = createElement('main', { id: 'app' }, [
    WeatherSection(),
    UnitConverterSection()
  ]);

  return appContainer;
}

export default App;