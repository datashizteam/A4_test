var width = 1200,
    height = 600

var svg = d3.select(".scroll__figure").append("svg")
    .style("width", "100%")
    .style("height", "100%");

var time = ["1","2","3"];

// var g = svg.append("g");

var projection = d3.geoAlbersUsa()
    .scale(1280)
    .translate([480, 300]);

// d3.json("https://gist.githubusercontent.com/krwarner/ba149b4ed187b80cce4b9aad2135ddae/raw/8d564df8079729c819781819a084c9a1587dc434/congress_topo.json").then(
// //background map
// function bgMap(congressTopo) {
//   const hasNoCongressionalRep = ['Puerto Rico', 'District of Columbia', 'U.S. Virgin Islands', 'Guam', 'Northern Mariana Islands', 'American Samoa'];
//   const geojson = topojson.feature(congressTopo, congressTopo.objects.congress);
//   const filtered = geojson.features.filter(f => !hasNoCongressionalRep.includes(f.properties.STATE));
//   geojson.features = filtered;

//   const congress = geojson;

//   g.selectAll(".region")
//         .data(congress.features)
//         .enter()
//         .append("path")
//         .attr("class", "region")
//         .attr("d", albersPath)
//         .style("stroke", "#595959")
//         .style("stroke-width", "0.15px")
//         .style("fill", '#fff')
// });


// OBSERVABLE CODE
var us = d3.json("https://unpkg.com/us-atlas@1/us/10m.json");
const data = d3.csv("https://raw.githubusercontent.com/ceguiluzrosas/D3_Json/master/new_coordinates.csv", d => ({
  type: "Feature", 
  properties: {city: d.City, state: d.State, lat: +d.Lat, long: +d.Long, five: +d.five, six: +d.six, present:+d.present},
  geometry: {
    type: "Point",
    coordinates: [+d.Long, +d.Lat]
  }
}));

Promise.all([us, data]).then(ready);

function ready(d) {

  let us = d['0'];
  let data = d['1'];

  var us_states = topojson.feature(us, us.objects.states);

  function colorRange(p) {
    if (p==0) { return "#F5F5F5"; }
    else if (p==1) { return "#ed8181"; }
    else if (p==2) { return "#e12d2d"; }
    else if (p==3) { return "#871b1b"; }
    else if (p==8) { return "#2d0909"; }
    else if (p==9) { return "#000000"; }};


  svg.append("path")
        .datum(topojson.merge(us, us.objects.states.geometries.filter(d => d.id !== "02" && d.id !== "15")))
        .attr("fill", "rgba(0,0,0,0)")
        .attr("d", d3.geoPath());

    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "rgba(0,0,0,0)")
        .attr("stroke", "#fff")
        .attr("stroke-linejoin", "round")
        .attr("d", d3.geoPath());


      for (let d of data){
          var val = d.properties.five;
          if (val != 0) {
            var node = svg.append("path")
              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
              .attr("d", d3.geoPath(projection).pointRadius(4))
              .attr("fill", colorRange(val))
              .style('stroke', 'black').style('stroke-width', 0.5)
              .attr("opacity", 0.75)
            }
      }

  d3.select("#timeslide").on("input", function() {
      update(+this.value);
    });
 // }
  
  function update(value) {
    document.getElementById("range").innerHTML=time[value];
    time_period = time[value];
       
    if (time_period==1) {
      for (let d of data){
          var val = d.properties.five;

          if (val != 0) {
            var node = svg.append("path")
              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
              .attr("d", d3.geoPath(projection).pointRadius(4))
              .attr("fill", colorRange(val))
              .style('stroke', 'black').style('stroke-width', 0.5)
              .attr("opacity", 0.75)
          }
    }}
    else if (time_period==2) {
      for (let d of data){
          var val = d.properties.six;

          if (val != 0) {
            var node = svg.append("path")
              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
              .attr("d", d3.geoPath(projection).pointRadius(4))
              .attr("fill", colorRange(val))
              .style('stroke', 'black').style('stroke-width', 0.5)
              .attr("opacity", 0.75)
          }
    }}
    else if (time_period==3) {
      for (let d of data){
          var val = d.properties.present;

          if (val != 0) {
            var node = svg.append("path")
              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
              .attr("d", d3.geoPath(projection).pointRadius(4))
              .attr("fill", colorRange(val))
              .style('stroke', 'black').style('stroke-width', 0.5)
              .attr("opacity", 0.75)
          }
    }}
  }
   

}

  //return svg.node();



