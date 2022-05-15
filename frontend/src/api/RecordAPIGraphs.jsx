import axios from "axios";
import {URL} from "../constants/APIFields"
import jsonFile from '../constants/CreditScore.json';

const boilerplate = (address) =>
    axios({
        method: "GET",
        url: URL + 'graph/' + address,
        headers: {
            "Content-Type": "application/json",
        },
    })

export const getCreditScoreValues = ()=> Promise.resolve(jsonFile);

export const getCategoricalValues = () => boilerplate('category/');
export const getBoolValues = () => boilerplate('bool/');
export const getDateValues = ()=> boilerplate('date/');
export const getEmploymentValues = () => boilerplate('employed/');
export const getIncomeValues = () => boilerplate('income/');
export const getPpleValues = () => boilerplate('pple/');