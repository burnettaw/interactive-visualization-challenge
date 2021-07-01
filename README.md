# interactive-visualization-challenge

Builds an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels using d3, plotly.

Uses the D3 library to read in samples.json.
Creates a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
Uses sample_values as the values for the bar chart.
Uses otu_ids as the labels for the bar chart.
Uses otu_labels as the hovertext for the chart.
Creates a bubble chart that displays each sample.
Uses otu_ids for the x values.
Uses sample_values for the y values.
Uses sample_values for the marker size.
Uses otu_ids for the marker colors.
Uses otu_labels for the text values.
Display the sample metadata, i.e., an individual's demographic information.
Display each key-value pair from the metadata JSON object somewhere on the page.
Update all of the plots any time that a new sample is selected.
Creates layout for your dashboard. 
Adapts the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
Modifies the example gauge code to account for values ranging from 0 through 9.
Updates the chart whenever a new sample is selected.
Deploys app to free static page hosting service-GitHub Pages. 
