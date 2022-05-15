import {useEffect, useRef, useState} from "react";
import {getDateValues} from "../../../api/RecordAPIGraphs";
import LineSkeletonChartClass from "./LineSkeletonChartClass";
import {countDate} from '../../../utils/DateManipulation'; // '../utils/DateManipulation';
import moment from "moment";
import loadingLogo from '../../../graphics/credit_swiping.gif';

// Import stylesheet
import './LineChart.scss';


const AgeLineChart = () => {
    const [loading, setLoading] = useState(true);
    const [width, ] = useState(600);
    const [height, ] = useState(400);

    const canvas = useRef(null);

    const processData = (data, label) => {
        // Loop through the data and create a new array with the age from the DOB
        data.forEach(d => {
            // Get the age from the DOB
            const age = moment().diff(countDate(d.days_birth), 'years');   
            delete d.days_birth;  // Remove the DOB from the data
            // Add the age to the data
            d[label] = age;
        });
    }

    useEffect(() => {
        getDateValues().then(data => {
            setLoading(false);
            const label = "age";
            processData(data.data, label);
            new LineSkeletonChartClass(
                canvas.current,{
                    data: data.data,
                    margin: {top: 20, right: 20, bottom: 70, left: 60},
                    width: width,
                    height: height,
                    label,
                    labelTitle: "age",
                    yLabel: "Total accepted",
                    densityOptions:["Each year", "3 years" ,"5 years", "Decades"]
                });
        });
    }, [height, width]);
    
    return loading
        ? <img src={loadingLogo} alt="Loading" width={width} height={height}/>
            : <div className={"line_chart"} ref={canvas} />
}

export default AgeLineChart;