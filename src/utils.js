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

// export function createTimer() {
//   const timerName = prompt("Enter the name for your timer:");
//   const timerDuration = parseInt(prompt("Enter the duration in seconds:"));

//   if (!timerName || isNaN(timerDuration) || timerDuration <= 0) {
//       alert("Please enter valid inputs.");
//       return;
//   }

//   // Create container for the timer
//   const container = createElement('div', { className: 'timer-container' }, [
//       createElement('h2', { textContent: timerName }),
//       createElement('div', { id: `progressBar-${timerName}` }),
//       createElement('span', { id: `timeLeft-${timerName}` })
//   ]);

//   document.body.appendChild(container);

//   // Timer logic
//   let timeLeft = timerDuration;
//   const progressBar = document.getElementById(`progressBar-${timerName}`);
//   const timeLeftDisplay = document.getElementById(`timeLeft-${timerName}`);

//   progressBar.style.width = '0%';
//   timeLeftDisplay.textContent = formatTime(timeLeft);

//   const timer = setInterval(() => {
//       timeLeft--;
//       const percentComplete = ((timerDuration - timeLeft) / timerDuration) * 100;
//       progressBar.style.width = `${percentComplete}%`;
//       timeLeftDisplay.textContent = formatTime(timeLeft);

//       if (timeLeft <= 0) {
//           clearInterval(timer);
//           alert(`${timerName} timer finished!`);
//       }
//   }, 1000);

//   // Helper function to format time
//   function formatTime(seconds) {
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   }

  // Styling (you might want to add this to your CSS or inline styles for simplicity)
  // progressBar.style.height = '20px';
  // progressBar.style.backgroundColor = 'green';
  // progressBar.style.transition = 'width 1s linear';
//}


