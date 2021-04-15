// from data.js
var tableData = data;

var dataTable = tableData.reduce((obj, item) => (obj[item.key] = item.value, obj) ,{});
console.log(dataTable)

function init() {
  tableData.forEach((ufoReport) => {
    // console.log(Object.keys(ufoReport))
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
var form = d3.select("#form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  var inputElement = d3.select("#datetime");
  var inputDate = inputElement.property("value");
  console.log(inputDate);

  if (inputDate != "") {
    // Remove current rows
    tbody.selectAll("tr").remove();

    // Re-populate Table
    filterData = tableData.filter(ufo => ufo.datetime === inputDate);
    console.log(filterData);

    filterData.forEach((ufoReport) => {
      // console.log(Object.keys(ufoReport))
      var row = tbody.append("tr");
      Object.entries(ufoReport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
  }

  else {
    // Remove current rows
    tbody.selectAll("tr").remove()
    
    // Re-populate Table
    init()
  };
};

init();