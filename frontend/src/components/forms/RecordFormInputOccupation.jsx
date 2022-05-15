import {Controller} from "react-hook-form";


const RecordFormInputOccupation = ({control, name, label, defValue}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defValue}
            render={({ field }) => (
                <div className={"form_occupation"}>
                    <label htmlFor={field.name}>{label}</label>
                    <input type="text" id={field.name}/>

                </div>
            )}
        />
    );
}

export default RecordFormInputOccupation;