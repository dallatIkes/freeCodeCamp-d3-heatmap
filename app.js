async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json');
        const dataset = await response.json();
        return dataset.monthlyVariance;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function main() {
    const dataset = await fetchData();
    console.log(dataset);

    const w = 1200;
    const h = 600;
    const padding = 100;

    const svg = d3.select('#heatmap')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

    const years = dataset.map(d => d.year);
    const months = dataset.map(d => d.month);
    const variances = dataset.map(d => d.variance);

    const minYear = d3.min(years);
    const maxYear = d3.max(years);
    const minMonth = 1;
    const maxMonth = 12;
    const minVariance = d3.min(variances);
    const maxVariance = d3.max(variances);
    const baseTemperature = 8.66;

    // Scales
    const xScale = d3.scaleBand()
        .domain(d3.range(minYear, maxYear + 1))
        .range([padding, w - padding]);

    const yScale = d3.scaleBand()
        .domain(d3.range(1, 13))
        .range([padding, h - padding]);

    const colorScale = d3.scaleSequential()
        .interpolator(d3.interpolateRdYlBu)
        .domain([maxVariance + baseTemperature, minVariance + baseTemperature]);

    // Axes
    const xAxis = d3.axisBottom(xScale)
        .tickValues(xScale.domain().filter(year => year % 10 === 0))
        .tickFormat(d3.format('d'));

    const yAxis = d3.axisLeft(yScale)
        .tickFormat(month => {
            const date = new Date(0);
            date.setUTCMonth(month - 1);
            return d3.timeFormat('%B')(date);
        });

    svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${h - padding})`)
        .call(xAxis);

    svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`)
        .call(yAxis);

    // Labels
    const tooltip = d3.select('#heatmap')
        .append('div')
        .attr('id', 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', '1px solid black')
        .style('padding', '5px');

    // Data rectangles
    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.month))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .attr('data-year', d => d.year)
        .attr('data-month', d => d.month - 1)
        .attr('data-temp', d => baseTemperature + d.variance)
        .attr('fill', d => colorScale(baseTemperature + d.variance))
        .on('mouseover', (event, d) => {
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip.html(`Year: ${d.year}<br/>Month: ${d3.timeFormat('%B')(new Date(0, d.month - 1))}<br/>Temp: ${(baseTemperature + d.variance).toFixed(2)}℃<br/>Variance: ${d.variance.toFixed(2)}℃`)
                .attr('data-year', d.year)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', () => {
            tooltip.transition().duration(500).style('opacity', 0);
        });

    // Legend
    const legendWidth = 400;
    const legendHeight = 30;
    const legend = svg.append('g')
        .attr('id', 'legend')
        .attr('transform', `translate(${(w - legendWidth) / 2}, ${h - padding + 40})`);

    const legendScale = d3.scaleLinear()
        .domain([minVariance + baseTemperature, maxVariance + baseTemperature])
        .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
        .tickFormat(d3.format('.1f'))
        .ticks(10);

    const legendData = d3.range(minVariance + baseTemperature, maxVariance + baseTemperature, (maxVariance - minVariance) / 10);

    legend.selectAll('rect')
        .data(legendData)
        .enter()
        .append('rect')
        .attr('x', d => legendScale(d))
        .attr('y', 0)
        .attr('width', legendWidth / legendData.length)
        .attr('height', legendHeight)
        .attr('fill', d => colorScale(d));

    legend.append('g')
        .attr('transform', `translate(0, ${legendHeight})`)
        .call(legendAxis);
}

main();