import {Controller} from "react-hook-form";

const RecordFormInputCheckBox = ({control, name, label, defValue}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defValue}
            value={defValue}
            render={({field}) => (
                <div className={"form_bools"}>
                    <input type="checkbox" name={field.name} id={field.name} {...field}/>
                    <label htmlFor={field.name}>{label}</label>
                </div>
                )}
        />
    );
}

export default RecordFormInputCheckBox;