import {Controller} from "react-hook-form";

const RecordFormInputOptions = ({control, name, label, menuOptions}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={menuOptions[0].value}
            render={({ field:{onChange, value} }) => (
                <div className={"form_category"}>
                    <label>{label}</label>
                    <select onChange={onChange} value={value ? value: menuOptions[0].value}>
                        {menuOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            )}
        />
    );
}

export default RecordFormInputOptions;