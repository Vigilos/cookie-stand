'use strict';

let stores = [];
let globalOpenTime = 6; // Used as long as all stores have same open times
let globalCloseTime = 20; // Used as long as all stores have same close times

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
addStore({
  name: 'dubai',
  hourOpen: 6,
  hourClosed: 20,
  minCust: 11,
  maxCust: 38,
  avgSoldCookies: 3.7,
  hourlyTotals: [],
});
addStore({
  name: 'paris',
  hourOpen: 6,
  hourClosed: 20,
  minCust: 20,
  maxCust: 38,
  avgSoldCookies: 2.3,
  hourlyTotals: [],
});
addStore({
  name: 'lima',
  hourOpen: 6,
  hourClosed: 20,
  minCust: 2,
  maxCust: 16,
  avgSoldCookies: 4.6,
  hourlyTotals: [],
});

// Calculate and populate (in object) customers per hour
for (let store of stores) {
  store.calcCustPerHour();
}

// Call function to generate and display sales estimates data table
if (window.location.pathname == '/sales.html') {
  createSalesTable();
}

// Create initial HTML structure for sales data table on sales page
function createSalesTable() {
  let totalOfDailyTotals = 0;
  let salesTableEl = document.querySelector('#sales-table');
  let rowEl = document.createElement('tr');

  // Create row of times as table headings (open time, close time, parent row object)
  createTableHeader(globalOpenTime, globalCloseTime);

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
      console.log(store.name, sale);
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
  // Create table footer with hourly totals (open time, close time, total of daily totals)
  createTableFooter(globalOpenTime, globalCloseTime, totalOfDailyTotals);
}

// Create table header with row of open times
function createTableHeader(openTime, closedTime) {
  let salesTableEl = document.querySelector('#sales-table');
  let rowEl = document.createElement('tr');
  rowEl.classList.add('table-titles');
  salesTableEl.appendChild(rowEl);

  // Create blank top-left table cell
  let tableTitleEl = document.createElement('th');
  tableTitleEl.textContent = '';
  rowEl.appendChild(tableTitleEl);

  // Populate times as header titles for all possible hours open
  tableTitleEl = document.createElement('th');
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
  let rowEl = document.createElement('tr');
  rowEl.classList.add('cross-store-totals');
  document.querySelector('#sales-table').appendChild(rowEl);

  // Create title for bottom-left table cell
  let tableTitleEl = document.createElement('th');
  tableTitleEl.textContent = 'Totals';
  rowEl.appendChild(tableTitleEl);

  // Get totals for each column across all stores
  let sumTotals = 0;
  for (let i = 0; i < closedTime - openTime; i++) {
    for (let store of stores) {
      sumTotals += store.hourlyTotals[i];
    }
    crossStoreTotals[i] = sumTotals;
    sumTotals = 0;
  }

  // Populate and dispaly column totals
  for (let total of crossStoreTotals) {
    let tableTitleEl = document.createElement('th');
    tableTitleEl.textContent = total;
    rowEl.appendChild(tableTitleEl);
  }

  // Add total of daily totals to end of footer row
  tableTitleEl = document.createElement('th');
  tableTitleEl.textContent = totalOfDailyTotals;
  rowEl.appendChild(tableTitleEl);
}

// Get user input for new store location
if (
  window.location.pathname == '/add-store.html' ||
  window.location.pathname == '/sales.html'
) {
  let formEl = document.getElementById('add-store');
  formEl.addEventListener('submit', function (event) {
    event.preventDefault(); //Prevent default actions such as page refresh

    let { store_name, open_time, close_time, cust_min, cust_max, avg_sold } =
      event.target;

    addStore({
      name: store_name.value,
      hourOpen: Number(open_time.value),
      hourClosed: Number(close_time.value),
      minCust: Number(cust_min.value),
      maxCust: Number(cust_max.value),
      avgSoldCookies: Number(avg_sold.value),
      hourlyTotals: [],
    });

    console.log(stores);

    document.querySelector('#sales-table').innerHTML = '';

    for (let store of stores) {
      store.calcCustPerHour();
    }
    createSalesTable();
  });
}
