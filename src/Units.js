import { createElement } from './utils';

function Units() {
  function mmToInches() {
    const mmContainer = createElement('div', { className: 'mm-container' });
    const mmInput = createElement('input', { type: 'number', placeholder: 'Enter mm', id: 'mm-input' });
    const convertButton = createElement('button', { textContent: 'Convert to Inches' });
    const inchResult = createElement('p', { id: 'inch-result' });

    mmContainer.appendChild(mmInput);
    mmContainer.appendChild(convertButton);
    mmContainer.appendChild(inchResult);

    // Event listener for the button click
    convertButton.addEventListener('click', () => {
      const mm = parseFloat(document.getElementById('mm-input').value);
      if (isNaN(mm)) {
        document.getElementById('inch-result').textContent = 'Please enter a valid number.';
      } else {
        const inches = mm / 25.4; // 1 inch = 25.4 mm
        document.getElementById('inch-result').textContent = `${mm} mm is equal to ${inches.toFixed(2)} inches.`;
      }
    });

    return mmContainer;
  }

  function getCircumference() {
    const circContainer = createElement('div', { className: 'circ-container' });
    const diameterInput = createElement('input', { type: 'number', placeholder: 'Enter diameter', id: 'diameter-input' });
    const calcButton = createElement('button', { textContent: 'Calculate Circumference' });
    const circResult = createElement('p', { id: 'circ-result' });
  
    circContainer.appendChild(diameterInput);
    circContainer.appendChild(calcButton);
    circContainer.appendChild(circResult);
  
    calcButton.addEventListener('click', () => {
      const diameter = parseFloat(document.getElementById('diameter-input').value);
      if (isNaN(diameter) || diameter <= 0) {
        document.getElementById('circ-result').textContent = 'Please enter a valid number.';
      } else {
        const circumference = Math.PI * diameter;
        document.getElementById('circ-result').textContent = `The circumference of the circle is ${circumference.toFixed(2)}.`;
      }
    });
    
    return circContainer;
  }

  const unitsContainer = createElement('div', { className: 'units-container' }, [
    createElement('h2', { textContent: 'Unit Conversions' }),
    mmToInches(),
    getCircumference()
  ]);

  return unitsContainer;
}

export default Units;