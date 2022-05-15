import {useEffect, useRef, useState} from "react";
import {getBoolValues} from "../../../api/RecordAPIGraphs";
import BooleanGroupedBarChartClass from "./BooleanGroupedBarChartClass";
import loadingLogo from '../../../graphics/credit_swiping.gif';

// Import stylesheet
import './BooleanGroupedBarChart.scss';

const BooleanGroupedBarChart = () => {
    const [loading, setLoading] = useState(true);
    const [width, ] = useState(650);
    const [height, ] = useState(350);

    const canvas = useRef(null);

    useEffect(() => {
        getBoolValues().then(data => {
            setLoading(false);
            new BooleanGroupedBarChartClass(
                canvas.current,{
                    data: data.data,
                    margin: {top: 20, right: 20, bottom: 30, left: 40},
                    width: width,
                    height: height,
                });
        });
    }, [height, width]);

    return loading
        ? <img src={loadingLogo} alt="Loading" width={width} height={height}/>
            : <div ref={canvas} />
}

export default BooleanGroupedBarChart;