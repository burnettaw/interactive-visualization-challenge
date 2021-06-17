

initdropdown(); //calls function to fill dropdown object

//retrieves metadata from file
function metadata(sampleid){
    console.log(sampleid)
    d3.json("data/samples.json").then(function(data){
        
        console.log("data")
        console.log(data)
        var metadata = data.metadata;
        console.log("metadata")
        console.log(metadata)
        var filterdata = metadata.filter(row => row.id == sampleid);
        console.log("filterdata")
        console.log(filterdata)

        var result = filterdata[0];
        console.log("result")
        console.log(result)
        var display = d3.select("#sample-metadata");
        display.html("");
        console.log("display")
        console.log(display)

       
        Object.entries(result).forEach(([key, value]) => {
            //console.log(result, key, value)
            console.log("key")
            console.log( key)
            console.log("value")
            console.log("value")
            display.append("h5").text(`${key}: ${value}`)
            console.log("display")
            console.log(display)
        })//end Object.entries 
    })// end d3.json
}//end function


function createChart(sampleid){
    d3.json("data/samples.json").then(function(data){
       
        console.log(data)
        var samples = data.samples;
        var filterdata = samples.filter(row => row.id == sampleid);
        var result = filterdata[0]
        var sample_values = result.sample_values
        var otu_ids = result.otu_ids
    
        var data = [{
            x:sample_values.slice(0, 10).reverse(), 
           // x:samples.slice(0, 10).reverse(), 
            y:otu_ids.slice(0, 10).reverse(),
            type:"bar",
            orientation:"h"
        }];
    Plotly.newPlot("bar", data);
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
        // createBubbles(id);
    })//end d3.json 

}//end function initdropdown

function optionChanged(id){

    metadata(id);
    createChart(id);
   // createBubbles(id);
}
   


// function createBubbles(sampleid){
//     var svg2 = d3.select("#bubble");
//     // d3.queue()
//     //     .append()
//     //     .defer(d3.json, "data/samples.json")
//     //     .await(ready);
    
//      //   function ready(error, datapoints){

//     d3.json("data/samples.json").then(function(data){
    
//         console.log(data)
//         var samples = data.samples;
//         var filterdata = samples.filter(row => row.id === sampleid);

        
//     var circle = svg2.selectAll(".bubbledata")
//         .data(datapoints)
//         .enter()
//         .append("circle")
//         .attr("class", "bubbledata" 
//         .attr("r", 10)
//         .attr("fill", "lightpink")
//         .attr("cx", 100)
//         .attr("cy", 200)
//    }


// }



