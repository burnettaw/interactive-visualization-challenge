d3.json(".data/samples.json", function(data) {
 
    var container = d3.select(".container")
        .append("avg")
        .attr("width", 600)
        .attr("height", 500)

    container.selectAll("rect")
        .data(data)
        .enter()
            .append("rect")
            .attr("width", function (d) {
                return d.name;
            })
            .attr("height", 50)
            .attr("y", function(d, i) { 
                return i
            })
            .attr("fill", "blue");
});