import axios from "axios";
import {URL} from "../constants/APIFields"

export const createNewSingleRecord = async data => {
    return axios({
        method: "POST",
        url: URL + 'record/new/',
        data,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getDetails = (id) => {
    return axios({
        method: "GET",
        url: URL + 'record/details/' + id,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

