import axios from "axios";
import {URL} from "../constants/APIFields"


export const getAcceptedApplicant = async () => {
    return axios({
        method: "GET",
        url: URL + 'template/success/',
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getRejectedApplicant = async () => {
    return axios({
        method: "GET",
        url: URL + 'template/reject/',
        headers: {
            "Content-Type": "application/json",
        },
    });
};

