

initdropdown(); //calls function to fill dropdown object


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
        gauge(id);
    })//end d3.json 

}//end function initdropdown

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
            y:otu_ids.slice(0, 10).map(otu_ids => `OTU${otu_ids}`).reverse(),
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

function optionChanged(id){

    metadata(id);
    createChart(id);
    createBubbles(id);
    gauge(id);
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
    d3.json("data/samples.json").then(function(data){
/*
Create a bubble scatter chart 
*/
        console.log(data)//displays data to console
        var samples = data.samples;
        var filterdata = samples.filter(row => row.id == sampleid);
        var result = filterdata[0];
        //console.log("result otu labels");
        //console.log(result.otu_labels);
       // console.log(filterdata[0].otu_labels);
        var sample_values = result.sample_values;
        var otu_ids = result.otu_ids;
       // var otu_labels = filterdata[0].otu_labels;
        var otu_labels = result.otu_labels;
       // var filterdata_otu_labels = samples.filter(row => row.id == sampleid);
        console.log("otu_labels");
        console.log(otu_labels);
        marker_sizes = sample_values.slice(0, 10).reverse();
        var data = [{
            y:sample_values.slice(0, 10).reverse(), 
            //x:otu_ids.slice(0, 10).map(otu_ids => `OTU${otu_ids}`).reverse(),
            x:otu_ids.slice(0, 10).reverse(),
            mode: 'markers',
            marker: {
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                size: marker_sizes
            },
            text:otu_ids.slice(0, 10).map(otu_ids => `OTU${otu_ids}`).reverse(),
            //type:"bubble",
            //orientation:"h",
            //ylabels: otu_ids,
            //xlabels: sample_values,
            transform: "rotate(-90)"
        }];

        var layout = {
            title: "Belly Button Biodiversity",
            yaxis: { title: "Sample Values" },
            xaxis: { title: "OTU" }
        };
        Plotly.newPlot("bubble", data, layout);
    })

}//end function

function metadata(sampleid){

    d3.json("data/samples.json").then(function(data){
        console.log("in metadata")
        console.log(data)
        var metadata = data.metadata;
        var filterdata = metadata.filter(row => row.id == sampleid);

        var result = filterdata[0];
        var display = d3.select("#sample-metadata");
        display.html("");
        Object.entries(result).forEach(([key, value]) => {
            var boldkey = key.bold();
            display.append("h5").text(`${boldkey}: ${value}`);
        })//end forEach
    })//end d3
}//end function

function gauge(sampleid){
    d3.json("data/samples.json").then(function(data){
        console.log("in metadata")
        console.log(data)
        var metadata = data.metadata;
        var filterdata = metadata.filter(row => row.id == sampleid);

        var result = filterdata[0];
        var wfreq = result.wfreq;
        var data = [{
            
          type: "indicator",
          mode: "gauge",
          value: wfreq,
          gauge: {
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 1], color: "rgba(0,128,128,.05)" },
              { range: [1, 2], color: "rgba(0,128,128,.1)"  },
              { range: [2, 3], color: "rgba(0,128,128,.15)" },
              { range: [3, 4], color: "rgba(0,128,128,.18)" },
              { range: [4, 5], color: "rgba(0,128,128,.20)" },
              { range: [5, 6], color: "rgba(0,128,128,.25)" },
              { range: [6, 7], color: "rgba(0,128,128,.30)" },
              { range: [7, 8], color: "rgba(0,128,128,.35)" },
              { range: [8, 9], color: "rgba(0,128,128,.40)" }
            ],//end steps
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: wfreq
            }//end threshold
          }//end gauge
        }]; //data
      
      var layout = {
        width: 500,
        height: 500,
        margin: { t: 0, r: 0, l: 0, b: 0 },
        font: { color: "darkblue", family: "Arial" }
      };
      
      Plotly.newPlot('gauge', data, layout);
    })//end d3
}//end function



