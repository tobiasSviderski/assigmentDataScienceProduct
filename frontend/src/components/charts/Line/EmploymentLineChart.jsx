import {useEffect, useRef, useState} from "react";
import {getEmploymentValues} from "../../../api/RecordAPIGraphs";
import LineSkeletonChartClass from "./LineSkeletonChartClass";
import {countDate} from '../../../utils/DateManipulation';
import moment from "moment";
import loadingLogo from '../../../graphics/credit_swiping.gif';


// Import stylesheet
import './LineChart.scss';


const EmploymentLineChart = () => {
    const [loading, setLoading] = useState(true);
    const [width, ] = useState(600);
    const [height, ] = useState(400);

    const canvas = useRef(null);

    const processData = (data, label) => {
        // Loop through the data and remove the days_employed that is more then zero
        for (let i = 0; i < data.length; i++) {
            if (data[i].days_employed > 0) {
                data.splice(i, 1);
            }
        }

        data.forEach(d => {
            // Get the years of employment from the number 
            const years = moment().diff(countDate(d.days_employed), 'years');
            delete d.days_employed;  // Remove the days_employed from the data
            // Add the years of employment to the data
            d[label] = years;
        })

    }

    useEffect(() => {
        getEmploymentValues().then(data => {
            setLoading(false);
            const label = "years_employed"
            processData(data.data, label);
            new LineSkeletonChartClass(
                canvas.current,{
                    data: data.data,
                    margin: {top: 20, right: 20, bottom: 70, left: 60},
                    width: width,
                    height: height,
                    label,
                    labelTitle: "years %s of employment",
                    yLabel: "Total accepted",
                    densityOptions:["Each year", "3 years" ,"5 years", "Decades"]
                });
        });
    }, [height, width]);

    return loading
        ? <img src={loadingLogo} alt="Loading" width={width} height={height}/>
            : <div className={"line_chart"} ref={canvas} />
}

export default EmploymentLineChart;