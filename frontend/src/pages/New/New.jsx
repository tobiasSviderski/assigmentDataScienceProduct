import {useEffect, useState} from "react";
import {getAcceptedApplicant, getRejectedApplicant} from "../../api/RecordAPITemplate";
import {amt_income_total_field_default_value, amt_income_total_field_label, occupation_type_field_name, amt_income_total_field_max_value, amt_income_total_field_min_value, amt_income_total_field_name, cnt_children_field_label, cnt_children_field_name, cnt_fam_members_field_label, cnt_fam_members_field_name, days_birth_field_label, days_birth_field_name, days_employed_field_label, days_employed_field_name, education_type_field_label, education_type_field_name, education_type_field_required, family_status_field_label, family_status_field_name, family_status_field_required, flag_email_field_default_value, flag_email_field_label, flag_email_field_name, flag_mobile_field_default_value, flag_mobile_field_label, flag_mobile_field_name, flag_own_car_field_default_value, flag_own_car_field_label, flag_own_car_field_name, flag_own_realty_field_default_value, flag_own_realty_field_label, flag_own_realty_field_name, flag_phone_field_default_value, flag_phone_field_label, flag_phone_field_name, flag_work_phone_field_default_value, flag_work_phone_field_label, flag_work_phone_field_name, gender_field_label, gender_field_name, gender_field_required, housing_type_field_label, housing_type_field_name, housing_type_field_required, income_type_field_label, income_type_field_name, income_type_field_required, occupation_type_field_default_value, occupation_type_field_label} from "../../constants/RecordFormFields";
import {createNewSingleRecord} from "../../api/RecordAPISingle";
import RecordFormSkeleton from "../../components/forms/RecordFormSkeleton";
import RecordFormInputOptions from "../../components/forms/RecordFormInputOptions";
import {educationOptions, familyOptions, genderOption, housingOptions, incomeOptions} from "../../constants/RecordFormMenuOptions";
import RecordFormInputCheckBox from "../../components/forms/RecordFormInputCheckBox";
import {RecordFormInputIncomeCounter, RecordFormInputPeopleCounter} from "../../components/forms/RecordFormInputCounter";
import RecordFormInputDate from "../../components/forms/RecordFormInputDate";
import RecordFormInputOccupation from "../../components/forms/RecordFormInputOccupation";
import { countDate, dateDifference } from "../../utils/DateManipulation";
import { useNavigate } from "react-router-dom";

// Import stylesheet
import './New.scss';

const New = () => {
    const [userData, setUserData] = useState(null);
    const [isReloading, setReloading] = useState(false); // on default is false
    let navigate = useNavigate();

    // If the value of the user data change the form will be reloaded
    // only if the user data is not null
    useEffect(() => {
        if (userData) {
            setReloading(false);
        }
    }, [userData]);

    // If I need to pre-fill the form with the data of the user that will be accepted
    // taken from the database where the status results is "accepted"
    // If error occurs show the error message
    const onAccepted = async () => {
        try{
            const response = await getAcceptedApplicant();
            setReloading(true);
            setUserData(response.data);

            document.getElementById("DAYS_BIRTH").value = countDate(response.data.BIRTH_DATE);
            document.getElementById("DAYS_EMPLOYED").value = countDate(response.data.EMPLOYED_DATE);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    // If I need to pre-fill the form with the data of the user that will be accepted
    // taken from the database where the status results is "rejected"
    // If error occurs show the error message
    const onRejected = async () => {
        try{
            const response = await getRejectedApplicant();
            setReloading(true);
            setUserData(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    // On click of the button Submit
    // change the dates fields to the format that the API requires
    // and send the data to the API
    // show the modal with the response of the API
    // on error show the error message
    const onSubmit = async (data) => {
        // Are they zero? 
        data[days_employed_field_name] = data[days_employed_field_name] ?
            data[days_employed_field_name] = countDate(data[days_employed_field_name]) : 0;

        data[days_birth_field_name] = data[days_birth_field_name] ?
            data[days_birth_field_name] = countDate(data[days_birth_field_name]) : 0;


        if (!data['CNT_CHILDREN'])
            data['CNT_CHILDREN'] = 0;

        if (!data['CNT_FAM_MEMBERS'])
            data['CNT_FAM_MEMBERS'] = 0;

        if (!data['AMT_INCOME_TOTAL'])
            data['AMT_INCOME_TOTAL'] = 0;

        data[days_employed_field_name] = dateDifference(data[days_employed_field_name]);
        data[days_birth_field_name] = dateDifference(data[days_birth_field_name]);

        data = JSON.stringify(data)
        try {
            const response = await createNewSingleRecord(data);
            if (response.status === 200) {
                navigate('/details/' + response.data.id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <header className={"header_new"}>
                <h1>Application for new credit card</h1>
                <div className="buttons">
                    <button onClick={onRejected}>Load rejected applicant</button>
                    <button onClick={onAccepted}>Load accepted applicant</button>
                </div>
            </header>
            {!isReloading &&
                <RecordFormSkeleton defaultValues={userData}  onSubmit={onSubmit} >

                        <h2>Select correct option</h2>
                        <RecordFormInputOptions name={gender_field_name} label={gender_field_label}
                                                required={gender_field_required} menuOptions={genderOption}/>
                        <RecordFormInputOptions name={income_type_field_name} label={income_type_field_label}
                                                required={income_type_field_required} menuOptions={incomeOptions}/>
                        <RecordFormInputOptions name={education_type_field_name} label={education_type_field_label}
                                                required={education_type_field_required} menuOptions={educationOptions}/>
                        <RecordFormInputOptions name={family_status_field_name} label={family_status_field_label}
                                                required={family_status_field_required} menuOptions={familyOptions}/>
                        <RecordFormInputOptions name={housing_type_field_name} label={housing_type_field_label}
                                                required={housing_type_field_required} menuOptions={housingOptions}/>


                    <h2>Check correct option</h2>
                    <RecordFormInputCheckBox name={flag_own_car_field_name} label={flag_own_car_field_label}
                                                defValue={flag_own_car_field_default_value}/>
                    <RecordFormInputCheckBox name={flag_own_realty_field_name} label={flag_own_realty_field_label}
                                                defValue={flag_own_realty_field_default_value}/>
                    <RecordFormInputCheckBox name={flag_email_field_name} label={flag_email_field_label}
                                                defValue={flag_email_field_default_value}/>
                    <RecordFormInputCheckBox name={flag_mobile_field_name} label={flag_mobile_field_label}
                                                defValue={flag_mobile_field_default_value}/>
                    <RecordFormInputCheckBox name={flag_phone_field_name} label={flag_phone_field_label}
                                                defValue={flag_phone_field_default_value}/>
                    <RecordFormInputCheckBox name={flag_work_phone_field_name} label={flag_work_phone_field_label}
                                                defValue={flag_work_phone_field_default_value}/>

                    <h2>Enter correct option</h2>
                    <RecordFormInputPeopleCounter name={cnt_children_field_name} label={cnt_children_field_label}
                                                single="child" plural="children"/>

                    <RecordFormInputPeopleCounter name={cnt_fam_members_field_name} label={cnt_fam_members_field_label}
                                                single="family member" plural="family members"/>

                    <RecordFormInputIncomeCounter name={amt_income_total_field_name} label={amt_income_total_field_label}
                                                min={amt_income_total_field_min_value}
                                                max={amt_income_total_field_max_value}
                                                defValue={amt_income_total_field_default_value}/>

                    <h2>Fill correct option</h2>
                    <RecordFormInputDate name={days_birth_field_name} label={days_birth_field_label}/>
                    <RecordFormInputDate name={days_employed_field_name} label={days_employed_field_label}/>

                    <RecordFormInputOccupation name={occupation_type_field_name} label={occupation_type_field_label}
                                            defValue={occupation_type_field_default_value}/>

                    <input type="submit" className={"form_submit"} value={"Create an application"}/>
                </RecordFormSkeleton>}
        </>
    );
}

export default New;