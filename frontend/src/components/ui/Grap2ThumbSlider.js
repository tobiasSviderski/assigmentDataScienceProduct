import * as d3 from 'd3';


class Graph2ThumbSlider {
    container;
    data;
    label;
    props;

    constructor(container, data, label) {
        this.container = container;
        this.data = data;
        this.label = label
        this.props = {};
    }

    draw() {
        const {label} = this;

        this.props.step = 1;
        this.props.max = d3.max(this.data, d => +d[label]);
        this.props.min = d3.min(this.data, d => +d[label]);

        this.setDivs();
        this.handleChanges();
    }

    setDivs(){
        this.props.container = d3.select(this.container).append("div")
            .attr("class", "slider-container");

        this.props.rangeSlider = this.props.container.append("div")
            .attr("class", "range-slider")
            ;

        this.props.containerDate = this.props.container.append("div")
            .attr("class", "container-date")
            ;

        this.props.containerFrom = this.props.containerDate.append("div")
            .attr("class", "container-from")
            ;

        this.props.labelFrom = this.props.containerFrom.append("label")
            .attr("class", "label-from")
            .attr("for", "number-from")
            .text(`From: ${this.props.min}`)
            ;

        this.props.containerTo = this.props.containerDate.append("div")
            .attr("class", "container-to")
            ;

        this.props.labelTo = this.props.containerTo.append("label")
            .attr("class", "label-to")
            .attr("for", "number-to")
            .text(`To: ${this.props.max}`)
            ;
            
        this.props.rangeFrom = this.props.rangeSlider.append("input")
            .attr("type", "range")
            .attr("min", this.props.min)
            .attr("max", this.props.max)
            .attr("step", this.props.step)
            .attr("value", this.props.min)
            ;

        this.props.rangeTo = this.props.rangeSlider.append("input")
            .attr("type", "range")
            .attr("min", this.props.min)
            .attr("max", this.props.max)
            .attr("step", this.props.step)
            .attr("value", this.props.max)
            ;
    }

    handleChanges(){
        this.props.rangeFrom.on("input", () => {
            let value = this.props.rangeFrom.property("value");
            this.props.labelFrom.text("From: " + value);

        });

        this.props.rangeTo.on("input", () => {
            let value = this.props.rangeTo.property("value");
            this.props.labelTo.text("To: " + value);
        });
    }

    getInputFrom() {
        return this.props.rangeFrom;
    }

    getInputTo() {
        return this.props.rangeTo;
    }

    getValueFrom() {
        return this.props.rangeFrom.property("value");
    }

    getValueTo() {
        return this.props.rangeTo.property("value");
    }
}

export default Graph2ThumbSlider;