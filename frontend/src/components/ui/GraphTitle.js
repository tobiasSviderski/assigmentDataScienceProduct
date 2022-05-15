import * as d3 from 'd3';

class GraphTitle {
    svg;
    width;
    title;

    constructor(svg, width, title) {
        this.svg = svg;
        this.width = width;
        this.title = title;
    }

    // Draws the title of the graph
    draw() {
        this.svg.append("text")
            .attr('class', 'graph-title')
            .attr("x", (this.width / 2))
            .attr("y", 0 - 5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(this.title);
    }

    // Updates the title of the graph
    update(title) {
        this.title = title;
        d3.select('.graph-title')
            .transition()
            .duration(750)
            .text(this.title);
    }

    // Removes the title of the graph
    remove() {
        this.svg.selectAll("text").remove();
    }
}

export default GraphTitle;