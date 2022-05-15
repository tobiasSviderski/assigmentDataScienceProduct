import * as d3 from 'd3';

class GraphDateDensity {
    container;
    steps;
    props;

    constructor(container, steps) {
        this.container = container;
        this.steps = steps;
        this.props = {};
    }

    draw() {
        this.props.cointainer = d3.select(this.container).append("div")
            .attr("class", "density-container")
        ;

        this.props.labels = this.props.cointainer.append("datalist")
            .attr("class", "labels")
            .attr("id", "labels")
            ;

            
        for (let value = 0; value < this.steps.length; value++) {
            this.props.labels.append("option")
                .attr("value", value)
                .attr("label", this.steps[value])
                ;
        }

        this.props.range = this.props.cointainer.append("input")
            .attr("class", "density-range")
            .attr("type", "range")
            .attr("min", 0)
            .attr("max", this.steps.length-1)
            .attr("value", 0)
            .attr("step", 1)
        ;
    }

    // Get the input prop 
    getInput() {
        return this.props.range;
    }

    getValue(index) {
        return this.steps[index];
    }
}


export default GraphDateDensity;