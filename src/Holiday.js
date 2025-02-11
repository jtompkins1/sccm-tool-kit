// Holiday.js
//TODO - CAN'T USE THIS LIBRARY


// Import the package
const fedHolidays = require('@18f/us-federal-holidays');

// Get all holidays for a specific year (2025 in this example)
const options = { 
  shiftSaturdayHolidays: true, 
  shiftSundayHolidays: true 
};
const holidays = fedHolidays.allForYear(2025, options);

// Display the holidays
console.log('US Federal Holidays for 2025:');
holidays.forEach(holiday => {
  console.log(`${holiday.name} - ${holiday.dateString}`);
});

function getHolidays() {
    return holidays;
  }
  
  module.exports = {
    getHolidays
  };
  
