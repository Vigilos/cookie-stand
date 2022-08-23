'use strict';

let cookieSalesListEl = document.getElementById('cookies-per-hour');

// Declare location objects
let seattle = {
  name: 'Seattle',
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
let tokyo = {
  name: 'Tokyo',
  hourOpen: 6,
  hourClosed: 20,
  minCust: 3,
  maxCust: 24,
  avgSoldCookies: 1.2,
  hourlyTotals: [],
  custPerHour: function randomNumber() {
    return Math.floor(
      this.minCust + Math.random() * (this.maxCust - this.minCust + 1)
    );
  },
};
let dubai = {
  name: 'Dubai',
  hourOpen: 6,
  hourClosed: 20,
  minCust: 11,
  maxCust: 38,
  avgSoldCookies: 3.7,
  hourlyTotals: [],
  custPerHour: function randomNumber() {
    return Math.floor(
      this.minCust + Math.random() * (this.maxCust - this.minCust + 1)
    );
  },
};
let paris = {
  name: 'Paris',
  hourOpen: 6,
  hourClosed: 20,
  minCust: 20,
  maxCust: 38,
  avgSoldCookies: 2.3,
  hourlyTotals: [],
  custPerHour: function randomNumber() {
    return Math.floor(
      this.minCust + Math.random() * (this.maxCust - this.minCust + 1)
    );
  },
};
let lima = {
  name: 'Lima',
  hourOpen: 6,
  hourClosed: 20,
  minCust: 2,
  maxCust: 16,
  avgSoldCookies: 4.6,
  hourlyTotals: [],
  custPerHour: function randomNumber() {
    return Math.floor(
      this.minCust + Math.random() * (this.maxCust - this.minCust + 1)
    );
  },
};

// Declare locations array, create initial HTML structure, and call functions for display of estimated sales
const locations = [seattle, tokyo, dubai, paris, lima];
createSalesListStructure(locations);
for (let location of locations) {
  calcCustPerHour(location);
  displayCookiesPerHour(location);
}

// Calcualte estimates sales per hour and store in object
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

// Display estimate sales per hour to DOM
function displayCookiesPerHour(location) {
  let hourTotalsIndex = 0;
  let sumSales = 0;
  let salesListEl = document.querySelector(`.${location.name}`);
  let locTitle = salesListEl.appendChild(document.createElement('h2'));
  locTitle.textContent = location.name;
  salesListEl.appendChild(document.createElement('ul'));
  let text2Add = document.createElement('li');
  for (let i = location.hourOpen; i < location.hourClosed; i++) {
    text2Add = document.createElement('li');
    text2Add.textContent = `${i > 12 ? i - 12 + 'pm' : i + 'am'}: ${
      location.hourlyTotals[hourTotalsIndex]
    } cookies`;
    salesListEl.querySelector(`.${location.name} ul`).appendChild(text2Add);
    hourTotalsIndex++;
  }
  for (let sales of location.hourlyTotals) {
    sumSales += sales;
  }
  text2Add = document.createElement('li');
  text2Add.textContent = `Total: ${sumSales} cookies`;
  salesListEl.querySelector(`.${location.name} ul`).appendChild(text2Add);
}

// Create initial HTML structure for sales data on sales page
function createSalesListStructure(locations) {
  for (let location of locations) {
    let elementName = document.createElement('div');
    elementName.classList.add(location.name);
    cookieSalesListEl.appendChild(elementName);
  }
}
