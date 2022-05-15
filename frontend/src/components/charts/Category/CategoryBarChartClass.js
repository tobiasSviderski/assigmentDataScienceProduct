import * as d3 from 'd3';
import {
    education_type_field_name,
    family_status_field_name, housing_type_field_name,
    income_type_field_name
} from "../../../constants/RecordFormFields";
import {educationOptions, familyOptions, housingOptions, incomeOptions} from "../../../constants/RecordFormMenuOptions";
import GraphTooltip from "../../ui/GraphTooltip";


class CategoryBarChartClass {
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
        this.setDropdown();
        this.initSVG();
        this.setYAxis();
        this.setXAxis();
        this.setBars();
    }

    processData() {
        const {data} = this.props;

        const categoryMap = [];
        for (const key of Object.keys(data)) {
            const arrayCurrent = [];
            categoryMap[key] = []
            for (const itemKey of Object.keys(data[key])) {
                const currentValue = {label: data[key][itemKey][key], value: data[key][itemKey].total};
                arrayCurrent.push(currentValue);
            }
            categoryMap[key] = arrayCurrent;
        }

        this.props.overallData = categoryMap;
        this.props.currentCategory = 'name_income_type';
        this.props.data = categoryMap[this.props.currentCategory];
    }

    initSVG() {
        const {margin, height, width, data} = this.props;

        this.svg = d3.select(this.containerEl)
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

        this.props.colour = d3.scaleOrdinal().domain(data)
            .range(d3.schemeSet3);
    }

    setXAxis() {
        const {width, height, data} = this.props;

        this.props.xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(data, d => d.value)])
        ;

        this.svg.append("g")
            .attr('class', 'axis axis--x')
            .attr("transform", "translate(0," + height + ")")
            .call(d3
                .axisBottom(this.props.xScale)
                .tickFormat(d3.format(".0s"))
            );
    }

    setYAxis() {
        const {height, data} = this.props;

        this.props.yScale = d3.scaleBand().range([0, height]).domain(data.map(d => d.label)).padding(0.1);
        this.svg.append("g")
            .attr('class', 'axis axis--y')
            .call(d3
                .axisLeft(this.props.yScale)
                .tickFormat(d => this.formatAxis(d)));
    }

    updateXAxis() {
        const {width, height, data} = this.props;

        this.props.xScale = d3.scaleLinear().range([0, width]).domain([0, d3.max(data, d => d.value)]);
        this.svg.select(".axis--x")
            .transition()
            .duration(750)
            .attr("transform", "translate(0," + height + ")")
            .call(d3
                .axisBottom(this.props.xScale)
                .tickFormat(d3.format(".0s"))
            );
    }

    updateYAxis() {
        const {height, data} = this.props;

        this.props.yScale = d3.scaleBand().range([0, height]).domain(data.map(d => d.label)).padding(0.1);
        this.svg.select(".axis--y")
            .transition()
            .duration(750)
            .call(d3
                .axisLeft(this.props.yScale)
                .tickFormat(d => this.formatAxis(d))
            );
    }

    setBars() {
    const {xScale, yScale, colour, data} = this.props;

    const tooltip = new GraphTooltip(this.containerEl);
    tooltip.draw();

    const bars = this.svg.selectAll(".bar").data(data)
        .join(
            enter => enter
                .append("rect")
                .attr("class", "bar")
                .attr("x", xScale(0))
                .attr("y", d => yScale(d.label))
                .attr("width", d => xScale(d.value))
                .attr("height", yScale.bandwidth())
                .attr("fill", d => colour(d))
                .attr("fill:hover", "gray"),//d => colour(d)),
            update => update
                .transition()
                .duration(750)
                .attr("x", xScale(0))
                .attr("y", d => yScale(d.label))
                .attr("width", d => xScale(d.value))
                .attr("height", yScale.bandwidth())
                .attr("fill", d => colour(d)),
        )
    
        .on("mouseover", (event, item) => {
            tooltip.setText(`${item.value} accepted applications`);
            return tooltip.show();
        })
        .on("mousemove", (event) => tooltip.move(event.pageX, event.pageY))
        .on("mouseout", () => tooltip.hide());

        bars.append("text")
            .attr("class", "label")
            .attr("y", d => yScale(d.label) + yScale.bandwidth() / 2 + 4)
            .attr("x", d => d.value + 3)
            .text(d => d.value)
        ;

    }

    setDropdown() {
        const {overallData} = this.props;

        const category_options = Object.keys(overallData);
        const dropDown = d3.select(this.containerEl)
            .append('select')
                .attr('class', 'selection')
                .attr('name', 'options-list')
                .on('change', (d) => {
                    this.props.currentCategory = d.target.value;
                    this.props.data = this.props.overallData[this.props.currentCategory];
                    this.updateXAxis();
                    this.updateYAxis();
                    this.setBars();
                });

        const options = dropDown.selectAll('option')
            .data(category_options)
            .enter()
            .append('option');

        options
            .text(d => this.beautifyDropName(d))
            .attr('value', d => d);
    }

    beautifyDropName(d) {return d.charAt(0).toUpperCase() + d.slice(1).replaceAll('_', ' ');}

    formatAxis(d) {
        let name = d;

        function swapAxisText(value, arrayOptions) {

            // eslint-disable-next-line array-callback-return
            arrayOptions.map(element => {
                // console.log(element);
                if(element.value === value) {
                    value = element.label;

                } else if (value === "higher_incompl[ete"){
                    value = "Higher education"
                }
            })
            return value;
        }//higher_incompl[ete
        // what is this topic now?
        switch(this.props.currentCategory.toLowerCase()) {

            // is it the same string as in
            case income_type_field_name.toLowerCase():
                // I know what array to use for swapping
                return swapAxisText(name, incomeOptions );
            case education_type_field_name.toLowerCase():
                return swapAxisText(name, educationOptions);
            case family_status_field_name.toLowerCase():
                return swapAxisText(name, familyOptions);
            case housing_type_field_name.toLowerCase():
                return swapAxisText(name, housingOptions);
            default: return name;
        }
    }
}

// const bars = this.svg.selectAll(".bar").data(data)
//     .join(
//         enter => enter
//             .append("rect")
//             .attr("class", "bar")
//             .attr("x", xScale(0))
//             .attr("y", d => yScale(d.label))
//             .attr("width", d => xScale(d.value))
//             .attr("height", yScale.bandwidth())
//             .attr("fill", d => colour(d))
//             .attr("fill:hover", "gray"),//d => colour(d)),
//         update => update
//             .transition()
//             .duration(750)
//             .attr("x", xScale(0))
//             .attr("y", d => yScale(d.label))
//             .attr("width", d => xScale(d.value))
//             .attr("height", yScale.bandwidth())
//             .attr("fill", d => colour(d)),
//     )

export default CategoryBarChartClass;