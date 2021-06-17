function initdropdown(){


    d3.json("data/samples.json").then(function(data){
        
        console.log(data)
        var names = data.names;
        var display = d3.select("#selDataset");
        names.forEach((sample) => {

            display.append("option").text(sample).property("value", sample);
            
        } )
    var id = names[0];
    metadata(id);
    createChart(id);
    })

}

initdropdown();

function metadata(sampleid){

    d3.json("data/samples.json").then(function(data){
       
        console.log(data)
        var metadata = data.metadata;
        var filterdata = metadata.filter(row => row.id == sampleid);

    var result = filterdata[0];
    var display = d3.select("#sample-metadata");
    display.html("");
    Object.entries(result).forEach(([key, value]) => {
        display.append("h5").text(`${key}: ${value}`);
    })
})
}

function optionChanged(id){

    metadata(id);
    createChart(id);
}
   

function createChart(sampleid){
    d3.json("data/samples.json").then(function(data){
       
        console.log(data)
        var samples = data.samples;
        var filterdata = samples.filter(row => row.id == sampleid);

    
        var data = [{
            x:sample_values.slice(0, 10).reverse(), 
            y:otuid.slice(0, 10).reverse(),
            type:"bar",
            orientation:"h"
        }];
    Plotly.newPlot("bar", data);
    })
}



