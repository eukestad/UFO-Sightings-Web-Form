// from data.js
var tableData = data;

function removeAlert() {
  var selectedAlert = d3.selectAll("#no-data")
  if (typeof selectedAlert !== 'undefined') {
    selectedAlert.remove()
  };
};

function init() {
  // remove alert
  removeAlert();

  tableData.forEach((ufoReport) => {
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
}

// Get a reference to the table body
var tbody = d3.select("tbody");

// Select the button
var button = d3.select("#filter-btn");
// Select the form
var form = d3.select("form");
// select the alert
// var noData = d3.select("noData");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // remove alert
  removeAlert();

  // Remove current rows
  tbody.selectAll("tr").remove();

  var inputElement = d3.select("#datetime");
  var inputDate = inputElement.property("value");
  console.log(inputDate);

  if (inputDate != "") {
    // filter by date
    filterData = tableData.filter(ufo => ufo.datetime === inputDate);
  }
  else {
    init()
  }

  // check that filtered data will return rows
  if (filterData.length > 0) {
    // Re-populate Table
    filterData.forEach((ufoReport) => {
      var row = tbody.append("tr");
      Object.entries(ufoReport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
  }
  else {   
    // alert showing no data returned
    var noData = d3.select("#table-area").append("div");
    noData.text("Oops! No records matching your entries were found.");
    noData.attr("class", "alert alert-warning");
    noData.property("role", "alert")
    noData.attr("id","no-data");
  };
};

init();