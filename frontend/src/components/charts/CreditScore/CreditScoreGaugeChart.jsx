import {useEffect, useState} from 'react';
import {getCreditScoreValues} from "../../../api/RecordAPIGraphs";
import CreditScoreGaugeChartComponent from "./CreditScoreGaugeChartComponent";

// Import the stylesheet
import './CreditScoreGaugeChart.scss';


const CreditScoreGaugeChart = () => {
    // All the data for the chart
    const [data, setData] = useState(null);
    // The current credit score meaning just the index of the data
    const [currentCreditScore, setCurrentCreditScore] = useState(0);
    // Limited data by the selection of the user
    const [limitedData, setLimitedData] = useState(null);

    useEffect(() => {
        let mounted = true;
        getCreditScoreValues().then(data => {
            if (mounted){
                setData(data);
                setLimitedData(data[0]);
            }
            return () => mounted = false;
        })
    }, []);

    useEffect(() => {
        if (data){
            setLimitedData(data[currentCreditScore]);
        }
    }, [currentCreditScore]);

    return (
        <div className="graph_gauge_chart">
            <div className="options">
                <label htmlFor="credit_options">Select credit score options</label>
                <select id="credit_options"
                        onChange={e => setCurrentCreditScore(e.target.value[e.target.value.length - 1])}>
                    { data && data.map((d, i) => <option key={`agency${i}`} value={`agency${i}`}>{d.agency}</option>) }
                </select>
            </div>
            {limitedData && <CreditScoreGaugeChartComponent creditScore={limitedData}/> }
        </div>
    );
}

export default CreditScoreGaugeChart;
