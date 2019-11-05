/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

/*

Before V5.x callback 
d3.json("data.json", function(data){
	// CODE
})

After V5.x promises
d3.json("data.json").then(function(data){
	// CODE
})

Error catching also change from:

function(error, data)
if (error) throw error;

to

.catch(function(error){
	console.log(error);
})

*/

d3.json("data/buildings.json").then(function(data){
	data.forEach(function(d){
		d.height= + d.height;
	});
	console.log(data);

	var svg = d3.select("#chart-area").append("svg")
		.attr("width", 500)
		.attr("height", 500);

	var buildings = svg.selectAll("rect")
		.data(data);

	buildings.enter()
		.append("rect")
			.attr("x", (d,i) => {
				return (i * 60) + 200;
			})
			.attr("y", 100)
			.attr("width", 40)
			.attr("height", (d) => {
				return d.height;
			})
			.attr("fill", "gray")
});