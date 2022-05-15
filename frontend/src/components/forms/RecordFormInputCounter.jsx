import {Controller} from "react-hook-form";


const RecordFormInputPeopleCounter = ({control, name, label, single, plural}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: { onChange, value, name } }) => (
                <div className={"form_counter"}>
                    <label htmlFor={name}>{label}: {value} {value === 1 ? single : plural}</label>
                    <input type="range"
                           name={name} id={name}
                           value={value} defaultValue={0} step={1}
                           max={20} onChange={onChange}/>
                </div>
            )}
        />
    );
}

const RecordFormInputIncomeCounter = ({control, name, label, min, max}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: { onChange, handleBlur, value, name } }) => (
                <div className={"form_counter"}>
                    <label htmlFor={name}>{label}: {value} £</label>
                    <div className={"form_counter_input"}>
                        <input type="range" name={name} id={name}
                               value={value} defaultValue={0}
                               step={1}
                               max={parseFloat(max)}
                               min={parseFloat(min)}
                               onChange={onChange}/>
                        <input type="number" name={name} id={name}
                               value={value}
                               size="small"
                               onChange={onChange}
                               onBlur={handleBlur}
                               min={0}
                               max={parseFloat(max)}
                               step={0.1}/>
                    </div>
                </div>
            )}
        />
    );
}

export {
    RecordFormInputPeopleCounter,
    RecordFormInputIncomeCounter
};