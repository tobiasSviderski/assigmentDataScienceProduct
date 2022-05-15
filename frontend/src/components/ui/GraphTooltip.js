import * as d3 from 'd3';

class GraphTooltip {
    container;
    tooltip;

    constructor(container) {
        this.setContainer(container);
    }

    setContainer(container) {
        this.container = container;
    }

    draw() {
        this.tooltip = d3.select(this.container)
            .append("div")
            .attr("class", "tooltip")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "1px")
                .style("border-radius", "5px")
                .style("padding", "10px");
    }

    show() {
        this.tooltip.style("visibility", "visible");
    }

    hide() {
        this.tooltip.style("visibility", "hidden");
    }

    move(x, y) {
        this.tooltip.style("left", (x+10) + "px")
            .style("top", (y-10) + "px");
    }

    setText(text) {
        this.tooltip.text(text);
    }
}

export default GraphTooltip;