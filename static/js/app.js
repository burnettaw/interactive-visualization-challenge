d3.json("samples.json".then(function(data){
    var panelBody = d3.select("panel-body").append("row")
        .attr("width", 500)
        .attr("height", 500)
    console.log(data)
    panelBody.selectAll("row")
        .data(data)
        .enter()
            .append("text")
            .text(function (d) {
                return d.name;

            })



})

// // Load data from miles-walked-this-month.csv
// d3.csv("miles-walked-this-month.csv").then(function(milesData) {

//     // Print the milesData
//     console.log(milesData);
  
//     // Format the date and cast the miles value to a number
//     milesData.forEach(function(data) {
//       data.date = parseTime(data.date);
//       data.miles = +data.miles;
//     });