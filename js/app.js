'use strict';

let cookieSalesListEl = document.getElementById('cookies-per-hour');

let seattle = {
  hourOpen: 6,
  hourClosed: 20,
  minCust: 23,
  maxCust: 65,
  avgSoldCookies: 6.3,
  hourlyTotals: [],
  custPerHour: function randomNumber() {
    return Math.floor(
      this.minCust + Math.random() * (this.maxCust - this.minCust + 1)
    );
  },
};

function calcCustPerHour(location) {
  let hourTotals = [];
  let hourTotalsIndex = 0;
  for (let i = location.hourOpen; i < location.hourClosed; i++) {
    hourTotals[hourTotalsIndex] = Math.round(
      location.custPerHour() * location.avgSoldCookies
    );

    hourTotalsIndex++;
  }
  location.hourlyTotals = hourTotals;
}

calcCustPerHour(seattle);
console.log(seattle);
displayCookiesPerHour(seattle);

function displayCookiesPerHour(location) {
  let hourTotalsIndex = 0;
  let text2Add = document.createElement('li');
  for (let i = location.hourOpen; i < location.hourClosed; i++) {
    text2Add = document.createElement('li');
    text2Add.textContent = `${i > 12 ? i - 12 + 'pm' : i + 'am'}: ${
      location.hourlyTotals[hourTotalsIndex]
    } cookies`;
    cookieSalesListEl.appendChild(text2Add);
    hourTotalsIndex++;
  }
}
