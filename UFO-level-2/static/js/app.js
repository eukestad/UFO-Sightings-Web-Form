// from data.js
var tableData = data;

function removeAlert() {
  var selectedAlert = d3.selectAll("#no-data")
  if (typeof selectedAlert !== 'undefined') {
    selectedAlert.remove()
  };
};

// Get a reference to the table body
var tbody = d3.select("tbody");

var citySelect = d3.select("#city");
var stateSelect = d3.select("#state");
var countrySelect = d3.select("#country");
var shapeSelect = d3.select("#shape");

// Select the buttons
var filterButton = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn");

// Select the form
var form = d3.select("form");

cities = tableData.map(item => item.city)
  .filter((value, index, self) => self.indexOf(value) === index).sort();

states = tableData.map(item => item.state)
  .filter((value, index, self) => self.indexOf(value) === index).sort();

countries = tableData.map(item => item.country)
  .filter((value, index, self) => self.indexOf(value) === index).sort();

shapes = tableData.map(item => item.shape)
  .filter((value, index, self) => self.indexOf(value) === index).sort();

cities.forEach((city) => {
  var row = citySelect.append("option").text(city).property("value", city);
});

states.forEach((state) => {
  var row = stateSelect.append("option").text(state).property("value", state);
});

countries.forEach((country) => {
  var row = countrySelect.append("option").text(country).property("value", country);
});

shapes.forEach((shape) => {
  var row = shapeSelect.append("option").text(shape).property("value", shape);
});

// Create event handlers 
filterButton.on("click", runEnter);
form.on("submit",runEnter);
resetButton.on("click", init);

function init() {
  // remove alert
  removeAlert();

  tableData.forEach((ufoReport) => {
    // console.log(Object.keys(ufoReport))
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
}

// Complete the event handler function for the form
function runEnter() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // remove alert
  removeAlert();

  // Remove current rows
  tbody.selectAll("tr").remove();

// get input values
  var inputDate = d3.select("#datetime").property("value");
  var inputCity = d3.select("#city").property("value");
  var inputState = d3.select("#state").property("value");
  var inputCountry = d3.select("#country").property("value");
  var inputShape = d3.select("#shape").property("value");

  // prepare filter object
  var filterInputs = {}

  // check filters for values and add to filter object
  if (inputDate != "") {
    filterInputs.datetime = inputDate
  };

  if (inputCity != "") {
    filterInputs.city = inputCity
  };

  if (inputState != "") {
    filterInputs.state = inputState
   };

  if (inputCountry != "") {
    filterInputs.country = inputCountry
  };

  if (inputShape != "") {
    filterInputs.shape = inputShape
  };

  // iterate through filter object to filter table
  var filterData = tableData.filter(ufo => {
    return Object.keys(filterInputs).every(filter => {
      return filterInputs[filter] === ufo[filter]
    });
  });

  // check that filtered data will return rows
  if (filterData.length > 0) {
    // Re-populate Table
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
    // alert showing no data returned
    var noData = d3.select("#table-area").append("div");
    noData.text("Oops! No records matching your entries were found.");
    noData.attr("class", "alert alert-warning");
    noData.property("role", "alert");
    noData.attr("id","no-data");
  };
};

init();