import ReactSpeedometer from "react-d3-speedometer";

const CreditScoreGaugeChartSkeleton = (props) => {
    return (
        <ReactSpeedometer
            endColor="green"
            startColor="red"
            needleHeightRatio={0.7}
            textColor="antiquewhite"
            onInput={props.onInput}
            value={props.value}
            forceRender={true}
            maxSegmentLabels={props.data.length}
            currentValueText={`Current Credit Score: ${props.value.toString()}`}
            customSegmentStops={props.customSegmentStops}
            minValue={props.min}
            maxValue={props.max}
            needleTransitionDuration={4000}
            needleTransition="easeElastic"
            needleColor="antiquewhite"
            labelFontSize={'0px'}
            valueTextFontWeight={'100'}
            paddingHorizontal={30}
            paddingVertical={30}
            width={500}
            height={350}

        />
    );
}

export default CreditScoreGaugeChartSkeleton;