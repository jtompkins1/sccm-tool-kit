import { createElement } from './utils';

function Units() {
  //save conversion history
  const saveConversion = (type, input, result) => {



    let conversions = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    conversions.push({ type, input, result, timestamp: new Date().toISOString() });
    //display the last 10 unit conversions
    if (conversions.length > 10) conversions.shift();
    localStorage.setItem('conversionHistory', JSON.stringify(conversions));
  };

  //display conversion history
  const displayConversionHistory = () => {
    let historyContainer = document.getElementById('conversion-history');
    if (!historyContainer) {
      historyContainer = createElement('div', { id: 'conversion-history' });
      unitsContainer.appendChild(historyContainer);
    } else {
      historyContainer.innerHTML = ''; // Clear existing history before adding new
    }

    const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');

    if (history.length === 0) {
      historyContainer.appendChild(createElement('p', { textContent: 'No conversion history yet.' }));
    } else {
      history.forEach((conversion) => {
        const formattedTime = new Date(conversion.timestamp).toLocaleString();
        const entry = createElement('p', { textContent: `${formattedTime} - ${conversion.type}: ${conversion.input} = ${conversion.result}` });
        historyContainer.appendChild(entry);
      });
    }
  };

  // Convert mm to inches
  function mmToInches() {
    const mmContainer = createElement('div', { className: 'mm-container' });
    const mmInput = createElement('input', { type: 'number', placeholder: 'Enter mm', id: 'mm-input' });
    const convertButton = createElement('button', { textContent: 'Convert to Inches' });
    const inchResult = createElement('p', { id: 'inch-result' });

    mmContainer.appendChild(mmInput);
    mmContainer.appendChild(convertButton);
    mmContainer.appendChild(inchResult);

    // Local storage
    mmInput.value = localStorage.getItem('mmInput') || '';
    inchResult.textContent = localStorage.getItem('inchResult') || '';

    mmInput.addEventListener('input', () => localStorage.setItem('mmInput', mmInput.value));

    // Event listener for the button click
    convertButton.addEventListener('click', () => {
      const mm = parseFloat(document.getElementById('mm-input').value);
      if (isNaN(mm)) {
        inchResult.textContent = 'Please enter a valid number.';
      } else {
        const inches = mm / 25.4; // 1 inch = 25.4 mm
        const resultText = `${mm} mm is equal to ${inches.toFixed(2)} inches.`;
        inchResult.textContent = resultText;
        localStorage.setItem('inchResult', resultText);
        saveConversion('mm to inches', `${mm} mm`, `${inches.toFixed(2)} inches`);
        displayConversionHistory();
      }
    });

    mmContainer.append(mmInput, convertButton, inchResult);
    return mmContainer;
  }

  // Calculate circumference
  function getCircumference() {
    const circContainer = createElement('div', { className: 'circ-container' });
    const diameterInput = createElement('input', { type: 'number', placeholder: 'Enter diameter', id: 'diameter-input' });
    const calcButton = createElement('button', { textContent: 'Calculate Circumference' });
    const circResult = createElement('p', { id: 'circ-result' });

    circContainer.appendChild(diameterInput);
    circContainer.appendChild(calcButton);
    circContainer.appendChild(circResult);

    // save values to Local storage
    diameterInput.value = localStorage.getItem('diameterInput') || '';
    circResult.textContent = localStorage.getItem('circResult') || '';

    diameterInput.addEventListener('input', () => localStorage.setItem('diameterInput', diameterInput.value));

    calcButton.addEventListener('click', () => {
      const diameter = parseFloat(document.getElementById('diameter-input').value);
      if (isNaN(diameter) || diameter <= 0) {
        circResult.textContent = 'Please enter a valid number.';
      } else {
        const circumference = Math.PI * diameter;
        const resultText = `The circumference of the circle is ${circumference.toFixed(2)}.`;
        circResult.textContent = resultText;
        localStorage.setItem('circResult', resultText);
        saveConversion('circumference', `${diameter} diameter`, `${circumference.toFixed(2)} circumference`);
        displayConversionHistory();
      }
    });

    circContainer.append(diameterInput, calcButton, circResult);
    return circContainer;
  }

  const unitsContainer = createElement('div', { className: 'units-container' }, [
    createElement('h2', { textContent: 'Unit Conversions' }),
    mmToInches(),
    getCircumference()
  ]);

  // Display conversion history
  displayConversionHistory();

  return unitsContainer;
}

export default Units;