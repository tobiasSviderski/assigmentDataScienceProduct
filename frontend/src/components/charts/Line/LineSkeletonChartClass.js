import * as d3 from 'd3';

import Graph2ThumbSlider from '../../ui/Grap2ThumbSlider';
import GraphDateDensity from '../../ui/GraphDateDensity';
import GraphTooltip from '../../ui/GraphTooltip';


class LineSkeletonChartClass {
    containerEl;
    svg;
    props;

    constructor(containerEl, props) {
        this.containerEl = containerEl;
        this.props = props;
        this.init();
    }

    init() {
        const {height, width, margin, data, label, densityOptions} = this.props;
        this.props.width = width - margin.left - margin.right;
        this.props.height = height - margin.top - margin.bottom

        const [rescaleFrom, rescaleTo] = d3.extent(data, d => +d[label]);
        this.props.rescaleFrom = rescaleFrom;
        this.props.rescaleTo = rescaleTo;

        // Create a div for the slider and density chart

        const range = new Graph2ThumbSlider(this.containerEl, data, label);
        range.draw();

        const density = new GraphDateDensity(this.containerEl, densityOptions);
        density.draw();

        const statistics = new GraphDateDensity(this.containerEl, ["Sum", "Max", "Avg", "Median"]);
        statistics.draw();

        const tooltip = new GraphTooltip(this.containerEl);
        tooltip.draw();
        this.props.tooltip = tooltip;

        this.props.rescaleStep = densityOptions[0];
        this.props.statistics = "Sum";

        this.handleRange(range);
        this.handleDensity(density);
        this.handleStatistics(statistics);

        this.rescale();
        this.initSVG();

        this.scaleAxis();
        this.initGraph();
        this.initInteraction();
    }

    //#region Handeling the visualisation options
    handleRange(range) {
        const sliderRangeFrom = range.getInputFrom();
        const sliderRangeTo = range.getInputTo();

        const handleRangeSliderChange = () => {
            this.props.rescaleFrom = range.getValueFrom();
            this.props.rescaleTo = range.getValueTo();

            this.update();
        }

        sliderRangeFrom.on('change', handleRangeSliderChange);
        sliderRangeTo.on("change", handleRangeSliderChange);
    }

    handleDensity(density) {
        const sliderDensity = density.getInput();

        sliderDensity.on("change", (event) => {
            this.props.rescaleStep = density.getValue(event.target.value);
            this.update();
        });
    }

    handleStatistics(statistics){
        const sliderDensity = statistics.getInput();

        sliderDensity.on("change", (event) => {
            this.props.statistics = statistics.getValue(event.target.value);
            this.update();
        });
    }

    //#endregion
    //#region Init things
    initSVG() {
        const {margin, height, width} = this.props;

        this.svg = d3.select(this.containerEl)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    }

    scaleAxis() {
        const {filteredData, height, width, label, yLabel} = this.props;

        this.props.xScale = d3.scaleLinear()
            .domain(d3.extent(filteredData, d => d[label]))
            .range([0, width]);

        this.svg.append("g")
            .attr('class', 'axis axis--x')
            .attr("transform", `translate(0, ${height})`)
            .call(d3
                .axisBottom(this.props.xScale)
                .ticks(15)
                .tickFormat(d3.format(".0s"))
            );       

        this.props.yScale = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.total)])
            .range([height, 0]);

        const yCurrLabel = yLabel ? yLabel : "Total";

        this.svg.append("g")
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(this.props.yScale))
            .append("text")
                .attr("class", "axis--y-label")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text(yCurrLabel);
    }

    initGraph() {
        const {filteredData, xScale, yScale, label} = this.props;

        this.svg
            .append("path")
            .datum(filteredData)
            .attr("class", "line")
            .attr("d", d3.line()
                .x(d => xScale(d[label]))
                .y(d => yScale(d.total))
            )
            .attr("stroke", "#EB89B5")
            .attr("stroke-width", 1)
            .attr("fill", "none");
    }    

    initInteraction() {
        const {xScale, tooltip, filteredData, label, labelTitle} = this.props;

        const closestIndex = (x0) => {
            // Find the closest value to x0
            for (let i = 0; i < filteredData.length; i++) {
                const currentItemValue = filteredData[i][label];
                if (currentItemValue < x0) {
                    // If it's an income type graph
                    if (label !== "amt_income_total") {
                        // If the next value is greater than x0, we have found the closest value
                        if (filteredData[i-1][label] > x0) {
                            return filteredData[i];
                        }
                    } else {
                        // If the next value is greater than x0, we have found the closest value
                        if (filteredData[i+1][label] > x0) {
                            return filteredData[i];
                        }
                    }
                }
            }
        }

        this.svg
        .on('mouseover', (event) => {
            try {
                const pointer = d3.pointer(event)[0];
                const x0 = xScale.invert(pointer);
                const selectedData = closestIndex(x0);    
    
                let text = label;
                // If text contains undescore, replace it with space
                if (text.includes("_")) {
                    text = text.replace("_", " ");
                }
    
                if (labelTitle.includes("%s")){
                    // If the number is greater then thousand, format it with commas
                    if (selectedData[label] > 1000) {
                        text = labelTitle.replace("%s", selectedData[label].toLocaleString());
                    } else {
                        text = labelTitle.replace("%s", selectedData[label]);
                    }
                    tooltip
                    .setText(`On ${text}, we have ${selectedData.total} applicants`);
                } else {
                    tooltip
                    .setText(`On ${text} ${selectedData[label]}, we have ${selectedData.total} applicants`);
                }
            }
            catch (error) {
                // console.log(error);
            }

        })
        .on('mousemove', (event) => {
            tooltip.show(event);
            tooltip.move(event.pageX, event.pageY)
        })
        .on('mouseout', (event) => {
            tooltip.hide(event);
        });
    }
    //#endregion
    //#region Update things
    update(){
        this.rescale();
        this.updateAxis();
        this.updateGraph();
    }

    rescale() {
        const {data, rescaleFrom, rescaleTo, rescaleStep, label} = this.props;
        const filterMin = d3.min(data, d => +d[label]);
        const filterMax = d3.max(data, d => +d[label]);

        const from = rescaleFrom;
        const to = rescaleTo;

        // Is it already filtered
        if (from === filterMin && to === filterMax) {
            this.props.filteredData = data;
        }

        const dataFiltered = data.filter(d => {
            return +d[label] >= from && +d[label] <= to;
        });    

        const dataFilteredRescaled = []; // Start with an empty array
        // Get the first day and and a year of the data
        let currentNumber = dataFiltered[0][label];
        let currentTotal = dataFiltered[0].total;

        let itemPush = {};
        itemPush[label] = currentNumber;
        itemPush.totals = []

        for(let i = 1; i < dataFiltered.length; i++) {
            // Get the current item
            let currentItem = dataFiltered[i]; // Can this be shortened into one line? {label: currentNumber, total: currentTotal}? 
            let currentItemNumber = currentItem[label];
            let currentItemTotal = currentItem.total;

            if (i === 1)
                itemPush.totals.push(currentTotal);

            const judgeNumber = (judgeCurrentNumber, judgeItemNumber, judgeRescaleStep) => {
                switch (judgeRescaleStep) {
                    case"Each year":
                    if (judgeCurrentNumber === judgeItemNumber)
                        return true;
                    break;
                    case "3 years":
                        if (Math.floor(judgeCurrentNumber / 3) === Math.floor(judgeItemNumber / 3))
                            return true;
                    break;
                    case "5 years":
                        if (Math.floor(judgeCurrentNumber / 5) === Math.floor(judgeItemNumber / 5))
                            return true;
                    break;
                    case "Decades":
                        if (Math.floor(judgeCurrentNumber / 10) === Math.floor(judgeItemNumber / 10))
                            return true;
                    break;

                    case "All":
                        if (Math.floor(judgeCurrentNumber) === Math.floor(judgeItemNumber))
                            return true;
                        break;
                    case "100":
                        if (Math.floor(judgeCurrentNumber/100) === Math.floor(judgeItemNumber/100))
                            return true;
                        break;
                    case "1k":
                        if (Math.floor(judgeCurrentNumber/1000) === Math.floor(judgeItemNumber/1000))
                            return true;
                        break;

                    case "10k":
                        if (Math.floor(judgeCurrentNumber/10000) === Math.floor(judgeItemNumber/10000))
                            return true;
                        break;
                    case "100k":
                        // console.log(Math.floor(judgeCurrentNumber)/100000, Math.floor(judgeItemNumber)/100000);
                        if (Math.floor(judgeCurrentNumber/100000) === Math.floor(judgeItemNumber/100000))
                            return true;
                        break;
                    default:
                        return false;
                }
                return false;
            }
            if (judgeNumber(currentNumber, currentItemNumber, rescaleStep)) {
                itemPush.totals.push(currentItemTotal);
            } else {
                const [itemArray, itemTotal] = this.countStatistics(itemPush);
                itemPush.total = itemTotal;
                itemPush.totals = itemArray; // Add the totals to the object

                dataFilteredRescaled.push(itemPush);  // Push the current item
                itemPush = {};  // Reset the object
                itemPush.totals = []; // Reset the totals array
                itemPush[label] = currentItem[label];  // Add the current item
                itemPush.totals.push(currentItemTotal); // Add the current total
                currentItemTotal = currentItem.total;  // Reset the total
                currentNumber = currentItem[label];  // Reset the current date
            }

            // If we are at the end of the data, add the last item
            if (i === dataFiltered.length - 1) {
                const [itemArray, itemTotal] = this.countStatistics(itemPush);
                itemPush[label] = currentNumber;
                itemPush.total = itemTotal;  // Add the total to the object
                itemPush.totals = itemArray; // Add the totals to the object
            }
        } 
        this.props.filteredData = dataFilteredRescaled;
    }

    countStatistics(itemPush) {
        const {statistics} = this.props;
        const {totals} = itemPush;
        // ["Sum", "Max", "Avg", "Median"]
        let [sum, max, avg, median, length] = [0, 0, 0, 0, 0];
        // Count the sum, max, avg, median
        for (let i = 0; i < totals.length; i++) {
            sum += totals[i];
            max = totals[i] > max ? totals[i] : max;
        }
        avg = sum / totals.length;
        median = totals.length % 2 === 0 ? (totals[totals.length / 2] + totals[totals.length / 2 - 1]) / 2 : totals[Math.floor(totals.length / 2)];
        length = totals.length;

        // Check for zero avg and median and round them if they are not null
        !avg ? avg = 0 : Math.round(avg);
        !median ? median = 0 : Math.round(median);

        let total;
        switch (statistics){
            case "Sum": total = sum; break;
            case "Max": total = max; break;
            case "Avg": total = avg; break;
            case "Median": total = median; break;
            default: total = totals[0]; break;  
        }

        return [{sum, max, avg, median,length}, total];
    }

    updateGraph() {
        const {filteredData, xScale, yScale, label} = this.props;

        this.svg.selectAll(".line")
            .datum(filteredData)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(d => xScale(d[label]))
                .y(d => yScale(d.total))
            )
    }

    updateAxis() {
        const {filteredData, height, width, label} = this.props;

        this.props.xScale = d3.scaleLinear()
            .domain(d3.extent(filteredData, d => d[label]))
            .range([0, width]);        

        this.svg.select('.axis--x')
            .transition()
            .duration(1000)
            .call(d3
                .axisBottom(this.props.xScale)
                .ticks(15)
                .tickFormat(d3.format(".0s"))
            )

        this.props.yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.total)])
        .range([height, 0]);

        this.svg.select('.axis--y')
            .transition()
            .duration(1000)
            .call(d3.axisLeft(this.props.yScale));      
    }
    //#endregion
}

export default LineSkeletonChartClass;