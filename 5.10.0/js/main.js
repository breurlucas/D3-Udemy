/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

// Define year loop variable
var year = 0;

// Define interval between years
var interval = 100;

// Scale for continent color
var color;

// Scale for area
var a;

// Define margins, width and height
var margin = { top:10, right:10, bottom:100, left:100};
var width = 1000 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// Create scales. Log scale for x and linear scale for y
var x = d3.scaleLog()
		.domain([300, 150000])
		.range([0, width]);


var y = d3.scaleLinear()
		.domain([0, 90])
		.range([height, 0]);

// Create a group 'g' and append an invisible group to it
// The group has no size so the drawing has to be
// limited by using the scale functions above (x and y)
var g = d3.select("#chart-area")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", `translate(${(margin.left)},
					${margin.top})`);

// Create the axis functions
var xAxisCall = d3.axisBottom(x)
	.tickValues([400, 4000, 40000])
	.tickFormat(d3.format("$"));
		
var yAxisCall = d3.axisLeft(y);

// Create and append the axes. Each axis is appended as a new group
// so we can translate them accordingly
g.append("g")
	.attr("class", "bottom axis")
	.call(xAxisCall)
	.attr("transform", `translate(0,${height})`);

g.append("g")
	.attr("class", "left axis")
	.call(yAxisCall)

// Add labels to each axis
g.append("text")
	.attr("x", width/2)
	.attr("y", height + 60)
	.attr("font-size", 20)
	.attr("text-anchor", "middle")
	.text("GDP Per Capita [$]");

g.append("text")
	.attr("x", -height/2)
	.attr("y", -60)
	.attr("font-size", 20)
	.attr("text-anchor", "middle")
	.attr("transform", "rotate(-90)")
	.text("Life Expectancy [Years]");

var yearLabel = g.append("text")
	.attr("x", width - 70)
    .attr("y", height -20)
    .attr("text-anchor", "middle")
    .attr("font-size", "60px")
    .attr("opacity", "0.4")
    .text("1800");

// Load data
d3.json("data/data.json").then((data) => {

	// Clean null values from data
	const filteredData = data.map((year) => {
		// Returns true only for the countries in each year
		// which don't have null values for income and life_exp
	    return year["countries"].filter((country) => {
	        var notNull = (country.income && country.life_exp);
	        return notNull;
	    // For each country returned true in the filter above, it
	    // converts income and life_exp to numbers
	    }).map((country) => {
	        country.income = +country.income;
	        country.life_exp = +country.life_exp;
	        // Returns only the countries with existing and
	        // formatted income and life_exp data for that
	        // specific year
	        return country;            
	    })
	});

	console.log(filteredData);

	/*** Linear scale for circle area ***/

	// Define min and max values for the population by a bottom-up approach
	var maxPopulation = d3.max(filteredData, (d) => { 
        		return d3.max(d, (d) => { 
        			return d.population;
        		});
        	});

	var minPopulation = d3.min(filteredData, (d) => { 
        		return d3.min(d, (d) => { 
        			return d.population;
        		});
        	});

	a = d3.scaleLinear()
			.domain([minPopulation, maxPopulation])
			.range([75, 7500])

	/*** Ordinal scale for continent color ***/
	color = d3.scaleOrdinal()
		.domain(filteredData.map((d) => {
			return d.continent;
		}))
		.range(d3.schemeSet2);

	// Interval Loop
	d3.interval(function(){
		year = (year < 214) ? year + 1 : 0;
		update(filteredData[year]);
	}, interval);

	// First run of the visualization
	update(filteredData[0]);
})

// UPDATE function
function update(data) {

	var transition = d3.transition().duration(.7 * interval);
	// DATA JOIN
	// Join new data with old elements, if any
	var countries = g.selectAll("circle")
		.data(data, (d) => {
			// Now it tracks the items by the country name
			// instead of the index (index changes when a country is added)
			return d.country;
		});

	// EXIT
	// Remove old elements as needed
	countries.exit().remove();
		
	// ENTER
	// Create new elements as needed
	countries.enter()
		.append("circle")
			.attr("fill", (country) => {
				return color(country.continent);
			})
		// UPDATE
		// Update old elements as needed
		.merge(countries)
		.transition(transition)
			.attr("cx", (country) => {
				return x(country.income);
			})
			.attr("cy", (country) => {
				return y(country.life_exp);
			})
			.attr("r", (country) => {
				return Math.sqrt(a(country.population) / Math.PI);
			});

	// Update the year label every iteration
    yearLabel.text(year + 1800)
}


