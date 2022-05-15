import * as d3 from 'd3';

import GraphTooltip from '../../ui/GraphTooltip';

class PeopleGroupedBarChartClass {
    containerEl;
    svg;
    props;

    constructor(containerEl, props) {
        this.containerEl = containerEl;
        this.props = props;
        this.init();
    }

    init() {
        const {height, width, margin} = this.props;
        this.props.width = width - margin.left - margin.right;
        this.props.height = height - margin.top - margin.bottom

        const tooltip = new GraphTooltip(this.containerEl);
        tooltip.draw();
        this.props.tooltip = tooltip;

        this.processData();
        this.initSVG();

        this.scaleAxis();
        this.initGraph();
        this.buildLegend();
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

    processData() {
        const {data} = this.props;

        const XAxisChildren = d3.extent(data.cnt_children, d => d.cnt_children);
        const XAxisMembers = d3.extent(data.cnt_fam_members, d => d.cnt_fam_members);
        // Get the bigger of the two
        this.props.XMin = Math.min(XAxisChildren[0], XAxisMembers[0]);
        this.props.XMax = Math.max(XAxisChildren[1], XAxisMembers[1]);

        const YAxisChildren = d3.extent(data.cnt_children, d => d.total);
        const YAxisMembers = d3.extent(data.cnt_fam_members, d => d.total);
        // Get the bigger of the two
        this.props.YMin = Math.min(YAxisChildren[0], YAxisMembers[0]);
        this.props.YMax = Math.max(YAxisChildren[1], YAxisMembers[1]);

        const processedData = [];
        for (let i = this.props.XMin; i <= this.props.XMax; i++) {
            let [children, members, index] = [0, 0, i];

            if (data.cnt_children.find(d => d.cnt_children === i)) {
                children = data.cnt_children.find(d => d.cnt_children === i).total;
            }

            if (data.cnt_fam_members.find(d => d.cnt_fam_members === i)) {
                members = data.cnt_fam_members.find(d => d.cnt_fam_members === i).total;
            }

            // Doesn't somehow work if check if they are both different then zerro 
            // amitting the else part and flipping it -- who knows why
            if (children === 0 && members === 0) {
            } else {
                processedData.push({
                    children,
                    members,
                    index
                });
            }
        }
        this.props.data = processedData;
    }

    scaleAxis() {
        const {YMin, YMax, width, height, data} = this.props;
            
        this.props.xScale = d3.scaleBand()
            .domain(data.map(d => d.index))
            .range([0, width])
            .padding(0.1);

        this.svg.append("g")
            .attr('class', 'axis axis--x')
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(this.props.xScale));

        this.props.yScale = d3.scaleLinear()
        .domain([YMin, YMax])
        .range([height, 0]);

        this.svg.append("g")
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(this.props.yScale).tickFormat(d3.format(".0s")));     

        this.props.xSubScale = d3.scaleBand()
            .domain(["children", "members"])
            .range([0, this.props.xScale.bandwidth()])
            .padding(0.1);

        this.props.colorScale = d3.scaleOrdinal()
            .domain(["children", "members"])
            .range(['#EB89B5','antiquewhite']);//,'#4daf4a'])
    }

    initGraph() {
        const {data, xScale, yScale, xSubScale, colorScale, height} = this.props;
        const bars = this.svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
            .attr("transform", d => `translate(${xScale(d.index)}, 0)`)
        .selectAll("rect")
        .data(d => ["children", "members"].map(function(key) {return {key, value: d[key]}}))
        .enter();
        
        bars.append("rect")
            .attr("x", d => xSubScale(d.key))
            .attr("y", d =>  yScale(d.value))
            .attr("width", xSubScale.bandwidth())
            .attr("height", d => height - yScale(d.value))
            .attr("fill", d => colorScale(d.key))
        ;

        bars.append("text")
            .text(d => `${d.value}`)
            .attr("x", d => xSubScale(d.key) + xSubScale.bandwidth() / 2)
            .attr("y", d => yScale(d.value) - 5)
            .attr("text-anchor", "middle");
    }  

    buildLegend() {
        const {height, width, colorScale} = this.props;
        const legend = this.svg.append("g")
            .attr("transform", `translate(${width - 100}, ${height - 100})`)
            .selectAll("g")
            .data(["Number of children", "Members of family"])
            .enter()
            .append("g")
            .attr("transform", (d, i) =>  `translate(-20, ${i * -40})`);

        legend.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", d => colorScale(d));

        legend.append("text")
            .text(d => d)
            .attr("x", 25)
            .attr("y", 15)
            .style("text-anchor", "start");
    }
}

export default PeopleGroupedBarChartClass;