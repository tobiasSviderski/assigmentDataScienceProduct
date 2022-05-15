import * as d3 from 'd3';

import GraphTooltip from './ui/GraphTooltip';

class BoxPlotSkeletonChartClass {
    containerEl;
    svg;
    props;

    constructor(containerEl, props) {
        this.containerEl = containerEl;
        this.props = props;

        this.init();
        this.draw();
    }

    init() {

        this.svg = d3.select(this.containerEl)
            .append('svg')
            .attr('width', this.props.width)
            .attr('height', this.props.height)
        .append("g")
            .attr("transform", `translate(0, 0)`);
    }

    draw() {
        const {height, width, overall, person} = this.props;
        const xScale = d3.scaleLinear()
            .domain([overall.min, overall.max])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, height]);
        
        const tooltip = new GraphTooltip(this.containerEl);
        tooltip.draw();

        this.svg
            .append("line")
                .attr("x1", xScale(overall.min) )
                .attr("x2", xScale(overall.max) )
                .attr("y1", height/2)
                .attr("y2", height/2)
                .attr("stroke", "antiquewhite");

        this.svg
            .append('rect')
            .attr('x', xScale(overall.first))
            .attr('y', height - yScale(1))
            .attr('width', xScale(overall.third) - xScale(overall.first))
            .attr('height', yScale(1))
            .attr('fill', 'antiquewhite')
            .attr('stroke', 'antiquewhite');

        this.svg
            .selectAll('toto')
            .data([overall.min, overall.max])
            .enter()
            .append('line')
            .attr('x1', d => xScale(d))
            .attr('y1', height - yScale(1))
            .attr('x2', d => xScale(d))
            .attr('y2', height)
            .attr('stroke', 'antiquewhite');

        this.svg
            .selectAll('toto')
            .data([person])
            .enter()
            .append('line')
            .attr('x1', d => xScale(d))
            .attr('y1', height - yScale(1))
            .attr('x2', d => xScale(d))
            .attr('y2', height)
            .style("stroke-width", 5)
            .attr('stroke', '#EB89B5');
    }
}
export default BoxPlotSkeletonChartClass;