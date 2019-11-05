/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

// Load the data
data = d3.json("data/revenues.json").then((data) => {
	data.forEach((d) => {
		d.revenue = + d.revenue;
	});
	console.log(data);

	// Define margins
	var margin = { top:10, right:10, bottom:100, left:100};
	var width = 600 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	// Create scales. Band scale for x and linear scale for y
	var x = d3.scaleBand()
			.domain(data.map((d) => {
				return d.month;
			}))
			.range([0, width])
			.paddingInner(0.3)
			.paddingOuter(0.3);

	var y = d3.scaleLinear()
			.domain([0, d3.max(data, (d) => {
				return d.revenue
			})])
			.range([height, 0]);
				
	// Create svg invisible group and append a group to it
	// The group has no size so the drawing has to be
	// limited by using the scale functions above (x and y)

	var g = d3.select("#chart-area")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
				.append("g")
					.attr("transform", `translate(${(margin.left)},
						${margin.top})`);

	// Create the rectangles to represent the data

	var revenues = g.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
			.attr("x", (d) => {
				return x(d.month);
			})
			.attr("y", (d) => {
				return y(d.revenue);
			})
			.attr("width", x.bandwidth)
			.attr("height", (d) => {
				return height - y(d.revenue);
			})
			.attr("fill", "gray")

	// Create the axis functions

	var xAxisCall = d3.axisBottom(x);
	var yAxisCall = d3.axisLeft(y)
		.ticks(5)
		.tickFormat(d3.format(".0s"));

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
		.text("Month");

	g.append("text")
		.attr("x", -height/2)
		.attr("y", -60)
		.attr("font-size", 20)
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.text("Revenue [$]");
});

