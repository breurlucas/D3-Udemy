/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

// Chaining methods in Javascript by using '.'

var svg = d3.select("#chart-area")
	.append("svg")
		.attr("width",500)
		.attr("height",400)

var rect = svg.append("rect")
	.attr("x",100)
	.attr("y",100)
	.attr("width",40)
	.attr("height",20)
	.attr("fill","green")

var circle = svg.append("circle")
	.attr("cx",250)
	.attr("cy",100)
	.attr("r",50)
	.attr("fill","yellow")

var ellipse = svg.append("ellipse")
	.attr("cx",350)
	.attr("cy",150)
	.attr("rx",30)
	.attr("ry",70)
	.attr("fill","red")

var line = svg.append("line")
	.attr("x1",400)
	.attr("y1",170)
	.attr("x2",700)
	.attr("y2",300)
	.attr("stroke","grey")
	.attr("stroke-width","2")


