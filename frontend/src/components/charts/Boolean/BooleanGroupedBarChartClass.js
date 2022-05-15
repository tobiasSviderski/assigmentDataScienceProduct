import * as d3 from 'd3';
import GraphTooltip from "../../ui/GraphTooltip";

class BooleanGroupedBarChartClass {
    containerEl;
    svg;
    props;


    constructor(containerEl, props) {
        this.containerEl = containerEl;
        this.props = props;

        const {height, width, margin} = this.props;
        this.props.width = width - margin.left - margin.right;
        this.props.height = height - margin.top - margin.bottom;

        this.processData();
        this.initSVG();
        this.initScales();
        this.setYAxis();
        this.setXAxis();
        this.setBars();
    }

    processData() {
        const {props: {data}} = this;

        this.props.booleanNames = Object.keys(data);
        this.props.optionNames = ['Accepted', 'Rejected'];

        // const searchedOption = options ? 'true' : 'false';
        const booleanMap = [];
        for (const key of Object.keys(data)) {
            booleanMap.push({
                "label" : key,
                "value_true" : data[key]['true'],
                "value_false" : data[key]['false']
            })
        }

        this.props.data = booleanMap;
        this.props.stacked_keys = d3.map(booleanMap, d => d.label);
    }

    initSVG() {
        const {margin, height, width, stacked_keys} = this.props;

        this.svg = d3.select(this.containerEl)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        this.props.colour = d3.scaleOrdinal().domain(stacked_keys)
            .range(['#EB89B5','antiquewhite']);//,'#4daf4a'])

    }

    initScales() {
        const {props: {data, height, width, stacked_keys}} = this;

        this.props.xScale = d3.scaleBand()
            .range([0, width])
            .padding(0.2)
            .domain(stacked_keys);

        this.props.yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, d => d.value_true + d.value_false)]);
    }

    setXAxis() {
        const {xScale, height} = this.props;

        this.svg.append("g")
            .attr('class', 'axis axis--x')
            .attr("transform", `translate(0, ${height})`)
            .call(d3
                .axisBottom(xScale)
                .tickFormat(d => this.formatAxis(d))
            );
    }

    setYAxis() {
        const {yScale} = this.props;

        this.svg.append("g")
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(yScale)
                .tickFormat(d3.format(".0s")));
    }


    setBars() {
        const {data, xScale, yScale, colour} = this.props;

        const tooltip = new GraphTooltip(this.containerEl);
        tooltip.draw();

        const stacked_data = d3.stack().keys(["label","value_true", "value_false" ])
        (data);

        this.svg.append("g")
            .selectAll("g")
            .data(stacked_data)
            .join("g")
                .attr("fill", d => colour(d.key))
                .selectAll("rect")
                .data(d => d)
                .join("rect")
                    .attr("x", d => xScale(d.data.label))
                    .attr("y", d => yScale(d[1]))
                    .attr("height", d => yScale(d[0]) - yScale(d[1]))
                    .attr("width", xScale.bandwidth())
            .on("mouseover", (event, item) => {
                const [value_a, value_b] = item;
                let value_diff = value_b - value_a
                tooltip.setText(`This area has ${value_diff} applications`);
                return tooltip.show();
            })
            .on("mousemove", (event) => tooltip.move(event.pageX, event.pageY))
            .on("mouseout", () => tooltip.hide())
            ;
    }

    formatAxis(d) {
        d = d.substring(5);
        return d.charAt(0).toUpperCase() + d.slice(1).replaceAll('_', ' ')
    }
}

export default BooleanGroupedBarChartClass;