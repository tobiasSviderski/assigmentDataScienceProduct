import {useState} from 'react';
import {countYears} from "../../utils/DateManipulation";

function DetailsTable(data) {
    const [person, ] = useState(data.person);

    return (
        <>
            <h2>Your information</h2>
            <table>
            <tbody>
                <tr>
                    <th>Gender</th>
                    <td>{person.code_gender === 'F' ? 'Female' : 'Male'}</td>
                </tr>
                <tr>
                    <th>Annual income</th>
                    <td>£{person.amt_income_total.toLocaleString("GB-EN")}</td>
                </tr>
                <tr>
                    <th>Income category</th>
                    <td>{person.name_income_type.toUpperCase()}</td>
                </tr>
                <tr>
                    <th>Education level</th>
                    <td>{person.name_education_type.toUpperCase()}</td>
                </tr>
                <tr>
                    <th>Marital status</th>
                    <td>{person.name_family_status.toUpperCase()}</td>
                </tr>
                <tr>
                    <th>Way of living</th>
                    <td>{person.name_housing_type.toUpperCase()}</td>
                </tr>
                <tr>
                    <th>Birthday</th>
                    <td>{countYears(person.days_birth)} years of age</td>
                </tr>
                <tr>
                    <th>Start date of employment</th>
                    <td>{countYears(person.days_employed)} years</td>
                </tr>
                <tr>
                    <th>Is there a car</th>
                    <td>{person.flag_own_car === true ? 'yes' : 'no'}</td>
                </tr>
                <tr>
                    <th>Is there a property</th>
                    <td>{person.flag_own_realty === true ? 'yes' : 'no'}</td>
                </tr>
                <tr>
                    <th>Is there a mobile phone</th>
                    <td>{person.flag_mobil === true ? 'yes' : 'no'}</td>
                </tr>
                <tr>
                    <th>Is there a work phone</th>
                    <td>{person.flag_work_phone === true ? 'yes' : 'no'}</td>
                </tr>
                <tr>
                    <th>Is there a phone</th>
                    <td>{person.flag_phone === true ? 'yes' : 'no'}</td>
                </tr>
                <tr>
                    <th>Is there an email</th>
                    <td>{person.flag_email === true ? 'yes' : 'no'}</td>
                </tr>
                <tr>
                    <th>Occupation</th>
                    <td>{person.occupation_type}</td>
                </tr>
                <tr>
                    <th>Family size</th>
                    <td>{person.cnt_fam_members} {person.cnt_fam_members === 1 ? 'member' : 'members'}</td>
                </tr>
                <tr>
                    <th>Number of children</th>
                    <td>{person.cnt_children} {person.cnt_children === 1 ? 'child' : 'chidren'}</td>
                </tr>
                </tbody>
            </table>

        </>
    );

}

export default DetailsTable;