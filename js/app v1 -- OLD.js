'use strict';

let stores = [];
let cookieSalesListEl = document.getElementById('cookies-per-hour');

// Declare location objects
function Store(
  name,
  hourOpen,
  hourClosed,
  minCust,
  maxCust,
  avgSoldCookies,
  hourlyTotals
) {
  this.name = name;
  this.hourOpen = hourOpen;
  this.hourClosed = hourClosed;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSoldCookies = avgSoldCookies;
  this.hourlyTotals = hourlyTotals;
}

// Declare common functions to Store constructor prototype
Store.prototype.custPerHour = function () {
  return Math.floor(
    this.minCust + Math.random() * (this.maxCust - this.minCust + 1)
  );
};
Store.prototype.calcCustPerHour = function () {
  let hourTotals = [];
  let hourTotalsIndex = 0;
  for (let i = this.hourOpen; i < this.hourClosed; i++) {
    hourTotals[hourTotalsIndex] = Math.round(
      this.custPerHour() * this.avgSoldCookies
    );
    hourTotalsIndex++;
  }
  this.hourlyTotals = hourTotals;
};

// Create function for adding stores
function addStore(data) {
  stores.push(
    new Store(
      data.name,
      data.hourOpen,
      data.hourClosed,
      data.minCust,
      data.maxCust,
      data.avgSoldCookies,
      data.hourlyTotals
    )
  );
}

// Add stores lactions to stores array
addStore({
  name: 'seattle',
  hourOpen: 6,
  hourClosed: 20,
  minCust: 23,
  maxCust: 65,
  avgSoldCookies: 6.3,
  hourlyTotals: [],
});
addStore({
  name: 'tokyo',
  hourOpen: 6,
  hourClosed: 20,
  minCust: 3,
  maxCust: 24,
  avgSoldCookies: 1.2,
  hourlyTotals: [],
});

// Calculate and populate customers per hour
for (let store of stores) {
  store.calcCustPerHour();
}

// Create initial HTML structure for sales data table on sales page
function createSalesTableStructure() {
  let totalOfDailyTotals = 0;
  let salesTableEl = document.querySelector('#sales-table');
  let rowEl = document.createElement('tr');
  rowEl.classList.add('table-titles');
  salesTableEl.appendChild(rowEl);

  // Create blank top-left table cell
  let tableTitleEl = document.createElement('th');
  tableTitleEl.textContent = '';
  rowEl.appendChild(tableTitleEl);

  // Create row of open times as table headings (open time, close time, parent row object)
  createTableHeader(6, 20, rowEl);

  // Create row of hourly sales for each store, starting each row with store name
  for (let store of stores) {
    let rowEl = document.createElement('tr');
    rowEl.classList.add(store.name);
    salesTableEl.appendChild(rowEl);
    let tableTitleEl = document.createElement('td');
    tableTitleEl.textContent = store.name;
    rowEl.appendChild(tableTitleEl);

    // Create row of hourly sales for each store
    let sumSales = 0;
    for (let sale of store.hourlyTotals) {
      let tableTitleEl = document.createElement('td');
      tableTitleEl.textContent = sale;
      rowEl.appendChild(tableTitleEl);
      sumSales += sale;
    }

    // Add row total to total for Daily Totals column
    totalOfDailyTotals += sumSales;

    // Add store totals to end of row
    tableTitleEl = document.createElement('td');
    tableTitleEl.textContent = sumSales;
    rowEl.appendChild(tableTitleEl);
  }

  createTableFooter(6, 20, totalOfDailyTotals);
}

createSalesTableStructure();

// Create table header with row of open times
function createTableHeader(openTime, closedTime, rowEl) {
  let tableTitleEl = document.createElement('th');
  for (let i = openTime; i < closedTime; i++) {
    let tableTitleEl = document.createElement('th');
    tableTitleEl.textContent = `${i > 12 ? i - 12 + 'pm' : i + 'am'}`;
    rowEl.appendChild(tableTitleEl);
  }
  // Create daily totals header for end of row
  tableTitleEl = document.createElement('th');
  tableTitleEl.textContent = 'Daily Location Total';
  rowEl.appendChild(tableTitleEl);
}

// Create table footer with hourly totals
function createTableFooter(openTime, closedTime, totalOfDailyTotals) {
  let crossStoreTotals = [];
  let sumTotals = 0;
  let rowEl = document.createElement('tr');
  rowEl.classList.add('cross-store-totals');
  document.querySelector('#sales-table').appendChild(rowEl);

  // Create title for bottom-left table cell
  let tableTitleEl = document.createElement('td');
  tableTitleEl.textContent = 'Totals';
  rowEl.appendChild(tableTitleEl);

  // Get totals for each column across all stores
  for (let i = 0; i < closedTime - openTime; i++) {
    for (let store of stores) {
      sumTotals += store.hourlyTotals[i];
    }
    crossStoreTotals[i] = sumTotals;
    sumTotals = 0;
  }
  for (let total of crossStoreTotals) {
    let tableTitleEl = document.createElement('td');
    tableTitleEl.textContent = total;
    rowEl.appendChild(tableTitleEl);
  }

  // Add total of daily totals to end of footer row
  tableTitleEl = document.createElement('td');
  tableTitleEl.textContent = totalOfDailyTotals;
  rowEl.appendChild(tableTitleEl);
}

// ____________________________________________

let seattle = {
  name: 'seattle',
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
  name: 'tokyo',
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
  name: 'dubai',
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
  name: 'paris',
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
  name: 'lima',
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
// const locations = [seattle, tokyo, dubai, paris, lima];
// createSalesListStructure(locations);
// for (let location of locations) {
//   calcCustPerHour(location);
//   displayCookiesPerHour(location);
// }

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
