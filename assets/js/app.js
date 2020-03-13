// D3 Times
// Author: Andrew McKinney
// Creation Date: 3/12/2020

var width = parseInt(d3.select('#scatter').style('width'))
var height = width - width / 3.5
var margin = 20
var labelArea = 110

var svg = d3.select('#scatter')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'chart')

var circRadius = 10


// income
svg.append('g')
    .attr('class', 'x_axis')


var x_axis = d3.select('.x_axis')

x_axis
    .append('text')
    .attr('data-name', 'income')
    .attr('data-axis', 'x')
    .attr('transform', 'translate(' + ((width - labelArea) / 3 + labelArea) + ', ' + (height - labelArea + margin) + ')' )
    .text('Income (USD)')


// obesity
svg.append('g')
    .attr('class', 'y_axis')

var y_axis = d3.select('.y_axis')

y_axis
    .append('text')
    .attr('data-name', 'obesity')
    .attr('data-axis', 'y')
    .attr('transform', 'translate(' + ((labelArea - margin) ) + ', ' + (height * 0.5) + ')rotate(-90)' )
    .text('Obesity (%)')



d3.csv('assets/data/data.csv').then( function (data) {
    visualize(data)
})

function visualize(data) {
    var x_value = 'income'
    var y_value = 'obesity'

    var xMin
    var xMax
    var yMin
    var yMax


    function xMinMax() {
        xMin = d3.min(data, (d) => d[x_value] )
        xMax = d3.max(data, (d) => d[x_value] )
    }

    function yMinMax() {
        yMin = d3.min(data, (d) => d[y_value] )
        yMax = d3.max(data, (d) => d[y_value] )
    }

    xMinMax()
    yMinMax()

    var xScale = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([margin + labelArea, width - margin])

    var yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height - margin - labelArea, margin])

    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)


    svg.append('g')
        .call(xAxis)
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (height - margin - labelArea) + ')')

    svg.append('g')
    .call(yAxis)
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (margin + labelArea) + ')')

    var circles = svg.selectAll('g circles')
        .data(data)
        .enter()

    circles.append('circle')
        .attr('cx', (d) => xScale(d[x_value]) )
        .attr('cy', (d) => yScale(d[y_value]) )
        .attr('r', circRadius)
        .attr('class', (d) => 'stateCircle ' + d.abbr)


    circles.append('text')
        .text( (d) => d.abbr)
        .attr('dx', (d) => xScale(d[x_value]) - circRadius / 1.5 )
        .attr('dy', (d) => yScale(d[y_value]) + circRadius / 2.5 )
        .attr('font-size', circRadius)

}


console.log(width)