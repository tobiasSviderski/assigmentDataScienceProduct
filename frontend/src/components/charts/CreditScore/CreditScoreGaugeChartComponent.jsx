import CreditScoreGaugeChartSkeleton from "./CreditScoreGaugeChartSkeleton";
import {memo, useEffect, useState} from "react";

const CreditScoreGaugeChartComponent = memo((creditScore) => {
    const [value, setValue] = useState(0);
    const [data, setData] = useState(null);
    const [selectedScore, setSelectedScore] = useState(null);

    useEffect(() => {
        setData(creditScore.creditScore);
        makeCustomSegmentStops(creditScore.creditScore.scores);
    }, [creditScore.creditScore]);

    const changedValue = (value) => {
        setValue(value);

        // Loop through the scores array and find the index of the current value
        const findSelected = () => {
        for (let i = 0; i < data.scores.length; i++) {
            const currentObject = data.scores[i].score;

            // If the current value is less or equal to the first score, return the first score
            if (i <= data.scores[0].score) {
                if (value <= currentObject) 
                    return data.scores[i]
                
            }
            else if (i >= data.scores[data.scores.length - 1].score) {
                if (value >= currentObject) 
                    return data.scores[i]
                
            } else {
                // If the current value is between two scores, return the score that is less than the current value
                if (value <= currentObject && value >= data.scores[i - 1].score) {
                    return data.scores[i]
                } else {
                    return data.scores[i - 1]
                }
            }
            
        }  };
        // Find the object in the data where the score is below the value and return the object
        setSelectedScore(findSelected);
    }

    const makeCustomSegmentStops = (scores) => {
        const position = "INSIDE";
        const customSegmentStops = [];
        for (let i = 0; i < scores.length; i++) {
            let currentCustomSegmentStop = {};
            let colour = "black";
            currentCustomSegmentStop.text = scores[i].band;
            currentCustomSegmentStop.position = position;
            switch (scores[i].band){
                default: colour = "black"; break;
                case "Very Poor": colour = "red"; break;
                case "Poor": colour = "lightred"; break;
                case "Fair": colour = "orange"; break;
                case "Good": colour = "yellow"; break;
                case "Very Good": colour = "lightgreen"; break;
                case "Excellent": colour = "#7CFC00"; break;
                
            }
            // Add object into the customSegementStops array
            currentCustomSegmentStop.color = colour;
            customSegmentStops.push(currentCustomSegmentStop);
        }
        return customSegmentStops;
    }

    return (
        <>
            {data && <>
                <div className="range_area">
                    <label htmlFor="input_range">Credit score of {data.agency}</label>
                    <input type="range" id="input_range" min="0"
                            max={data.scores.map(d => d.score).reduce((a, b) => Math.max(a, b))} step="1"
                            value={value.toString()}
                            onInput={(e) => changedValue(e.target.value)}/>
                </div>
                <div className="graph">
                    <CreditScoreGaugeChartSkeleton
                        value={value}
                        data={data.scores}
                        customSegmentStops={[0].concat(data.scores.map(d => d.score))}
                        customSegmentLables={makeCustomSegmentStops(data.scores)}
                        min={0}
                        max={data.scores.map(d => d.score).reduce((a, b) => Math.max(a, b))}
                    />
                </div>
            </>}
            {selectedScore ? <div className="results">
                <div>Your score is <span>{value}</span></div>
                <div>The status of your score is <span>{selectedScore.band}</span></div>
                {selectedScore.rating ? <div>This is <span>{selectedScore.rating}</span></div> : null}
            </div> :
                <div className="results"> </div>}
        </>
    );

})

export default CreditScoreGaugeChartComponent;