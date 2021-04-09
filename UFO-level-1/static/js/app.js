// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

data.forEach((ufoReport) => {
    console.log('It worked!')
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });