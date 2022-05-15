import {useEffect, useRef, useState} from "react";
import {getIncomeValues} from "../../../api/RecordAPIGraphs";
import LineSkeletonChartClass from "./LineSkeletonChartClass";
import loadingLogo from '../../../graphics/credit_swiping.gif';

// Import stylesheet
import './LineChart.scss';


const IncomeLineChart = () => {
    const [loading, setLoading] = useState(true);
    const [width, ] = useState(700);
    const [height, ] = useState(400);

    const canvas = useRef(null);

    useEffect(() => {
        getIncomeValues().then(data => {
            setLoading(false);
            new LineSkeletonChartClass(
                canvas.current,{
                    data: data.data,
                    margin: {top: 20, right: 20, bottom: 70, left: 60},
                    width: width,
                    height: height,
                    label: "amt_income_total",
                    labelTitle: "income of %s",
                    yLabel: "Total accepted",
                    densityOptions:["All", "100" ,"1k", "10k", "100k"]
                });
            });
        }, [height, width]);
    
        return loading
            ? <img src={loadingLogo} alt="Loading" width={width} height={height}/>
                : <div className={"line_chart"} ref={canvas} />
}

export default IncomeLineChart;