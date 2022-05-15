import {Controller} from "react-hook-form";

const RecordFormInputDate = ({control, name, label}) => {
    return (
        // DAYS_BIRTH
        <Controller
            name={name}
            control={control}
            defaultValue={null}
            render={({field: { onChange, name }}) => (
                <div className={"form_date form_date_" + name}>
                    <label htmlFor={name}>{label}</label>
                    <input type="date" name={name} id={name} onChange={onChange} />
                </div>
            )}
        />
    );
}

export default RecordFormInputDate;