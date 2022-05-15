import {useEffect, useRef, useState} from "react";
import {getPpleValues} from "../../../api/RecordAPIGraphs";
import PeopleGroupedBarChartClass from "./PeopleGroupedBarChartClass";
import loadingLogo from '../../../graphics/credit_swiping.gif';


const PeopleGroupedBarChart = () => {
    const [loading, setLoading] = useState(true);
    const [width, ] = useState(700);
    const [height, ] = useState(650);

    const canvas = useRef(null);

    useEffect(() => {
        getPpleValues().then(data => {
            setLoading(false);
            new PeopleGroupedBarChartClass(
                canvas.current,{
                    data: data.data,
                    margin: {top: 20, right: 30, bottom: 70, left: 40},
                    width: width,
                    height: height,
                });
        });
    }, [height, width]);

    return loading
        ? <img src={loadingLogo} alt="Loading" width={width} height={height}/>
            : <div ref={canvas} />
}

export default PeopleGroupedBarChart;