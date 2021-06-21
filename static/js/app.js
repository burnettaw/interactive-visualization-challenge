

initdropdown(); //calls function to fill dropdown object



function createChart(sampleid){
    d3.json("data/samples.json").then(function(data){
       
/*
Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs 
found in that individual.
*/
        console.log(data)//displays data
        var samples = data.samples;
        var filterdata = samples.filter(row => row.id == sampleid);
        var result = filterdata[0]
        var sample_values = result.sample_values
        var otu_ids = result.otu_ids
        console.log(otu_ids)
        var data = [{
            
            x:sample_values.slice(0, 10).reverse(), 
            y:otu_ids.slice(0, 10).reverse(),
            type:"bar",
            orientation:"h",
            ylabels: otu_ids,
            xlabels: sample_values,
            transform: "rotate(-90)"
        }];

        var layout = {
            title: "Belly Button Biodiversity",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU" }
          };
    Plotly.newPlot("bar", data, layout);
    })
}

function initdropdown(){


    d3.json("data/samples.json").then(function(data){
        
        console.log(data)
        var names = data.names;
        var display = d3.select("#selDataset");
        names.forEach((sample) => {
            display.append("option").text(sample).property("value", sample);
        })//end forEach
        var id = names[0];
        metadata(id);
        createChart(id);
        createBubbles(id);
    })//end d3.json 

}//end function initdropdown

function optionChanged(id){

    metadata(id);
    createChart(id);
    createBubbles(id);
}
   
var svgWidth = 500;
var svgHeight = 500;
var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

function createBubbles(sampleid){
    var svg2 = d3.select("#bubble")
        .append("svg2")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    var chartGroup = svg2.append("g")
        .attr("transform", 'translate(${margin.left}, ${ margin.top})');

    d3.json("data/samples.json").then(function(data){
    
        console.log(data)
        var samples = data.samples;
        
       // var filterdata = data.filter(row => row.id == sampleid);
       // console.log(filterdata)
        
    var circleData = svg2.selectAll("#bubble")
        .data(samples)
        .enter()
        .append("circle")
        .attr("class", "bubble" )
        .attr("r", 100)
        .attr("fill", "pink")
        .attr("cx", 500)
        .attr("cy", 200)
    var layout = {
            title: "Belly Button Biodiversity"
            //xaxis: { title: "Sample Values" },
            //yaxis: { title: "OTU" }
          };
    Plotly.newPlot("bubble", samples, layout);
    })
}


//retrieves metadata from file
function metadata(sampleid){
    d3.json("data/samples.json").then(function(data){
        
        var metadata = data.metadata;
        var filterdata = metadata.filter(row => row.id == sampleid);
        console.log("sampleid");
        console.log(sampleid);
        console.log(filterdata);
        console.log(filterdata[0]);
        var result = filterdata[0];
        var display = d3.select("#sample-metadata");
        display.html("");
               
        Object.entries(result).forEach(([key, value]) => {
            //console.log(result, key, value)
            display.append("h5").text(`${key}: ${value}`)
        })//end Object.entries 
    })// end d3.json
}//end function






