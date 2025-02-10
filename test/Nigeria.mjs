//import { text } from "express";

// Function to get or cache Nigeria time
export function getOrCacheNigeriaTime() {
    console.log('getOrCacheNigeriaTime called');
    const cachedData = localStorage.getItem('nigeriaTimeData');
    if (cachedData) {
        const { time, expiry } = JSON.parse(cachedData);
        if (new Date().getTime() < expiry) {
            // If data is still valid, use cached time
            document.getElementById('nigeriaTime').textContent = time;
            return;
        }
    }

    const apiUrl = `/api/nigeria-time`;

    fetch(apiUrl, { cache: 'no-store' })
        .then(response => {
            console.log('Response headers:', response.headers);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                return response.text().then(text => {
                    console.error('Response was not JSON:', text);
                    throw new TypeError("Oops, we haven't got JSON!");
                });
            }
        return response.json();
    })
        .then(data => {
            console.log('Data received:', JSON.stringify(data, null, 2)); // Log the actual data
            // Handle JSON data
            if (data.time_zone) { // Note: 'time_zone' is used in the API documentation, not 'timezone'
                const nigeriaTimezone = 'Africa/Lagos';  // Nigeria's timezone
                const options = {
                    timeZone: nigeriaTimezone,
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit',
                    hour12: false
                };

                const formatter = new Intl.DateTimeFormat('en-US', options);
                const currentTime = formatter.format(new Date());
                
                // Cache the time for 1 hour (3600000 milliseconds)
                const cacheExpiry = new Date().getTime() + 3600000;
                localStorage.setItem('nigeriaTimeData', JSON.stringify({
                    time: currentTime,
                    expiry: cacheExpiry
                }));

                const nigeriaTimeElement = document.getElementById('nigeriaTime');
                if (nigeriaTimeElement) {
                    nigeriaTimeElement.textContent = currentTime;
                } else {
                    console.error("Element with ID 'nigeriaTime' not found in the DOM.");
                }
            } else {
                console.error('Timezone not found in the response:', data);
                document.getElementById('nigeriaTime').textContent = 'Timezone data not available';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('nigeriaTime').textContent = 'Error fetching time';
            // Optionally, inform user about the error or use cached data
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', getOrCacheNigeriaTime);