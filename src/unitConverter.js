// unitConverter.js
export async function mmToInches(mm) {
    const apiKey = 'KQKXQA-LRYEHRVPEX'; // Replace with your actual Wolfram Alpha AppID
    const query = `${mm} mm to inches`;
    const url = `http://api.wolframalpha.com/v2/result?appid=${apiKey}&i=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    if (response.ok) {
        return await response.text();
    } else {
        throw new Error('API request failed');
    }
}

export function renderConversion(mm, inches) {
    document.getElementById('result').innerHTML = `
        ${mm} mm is equal to ${inches} inches
    `;
}