import {useEffect, useRef, useState} from "react";
import CategoryBarChartClass from "./CategoryBarChartClass";
import {getCategoricalValues} from "../../../api/RecordAPIGraphs";
import loadingLogo from '../../../graphics/credit_swiping.gif';

// Import the stylesheet.
import './CategoryBarChart.scss';

const CategoryBarChart = () =>{
    const [loading, setLoading] = useState(true);
    const [width, ] = useState(650);
    const [height, ] = useState(350);

    const canvas = useRef(null);

    useEffect(() => {
        getCategoricalValues().then(data => {
            setLoading(false);
            new CategoryBarChartClass(canvas.current, {
                data: data.data,
                margin: {top: 20, right: 20, bottom: 30, left: 250},
                width: width,
                height: height,
            });
        })
    }, [height, width]);

    return loading
        ? <img src={loadingLogo} alt="Loading" width={width} height={height}/>
            : <div className={"category"} ref={canvas} />
}

export default CategoryBarChart;