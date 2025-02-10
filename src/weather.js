// weather.js
export async function getWeather(city) {
    const apiKey = 'c7039a0ebd28f4b790d99a40ca9311c5'; // Replace with your actual API key if needed
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // for testing
            return data;
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error('Weather fetch failed:', error);
        throw error; // Rethrow so it can be caught in the calling function
    }
}

export function renderWeather(weatherData) {
    const weatherSection = document.getElementById('weather');
    let weatherHTML = `
        
${weatherData.name}, ${weatherData.sys.country}

        
Temperature: ${Math.round(weatherData.main.temp)}°F and ${weatherData.weather[0].main}


    `;
    weatherSection.innerHTML += weatherHTML; // Append new data
}