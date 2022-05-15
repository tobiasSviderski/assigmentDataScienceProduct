import moment from "moment";

export const dateDifference = (data) => {
    let now = moment(new Date()); //today's date
    let duration = moment.duration(now.diff(data));
    let days = duration.asDays() + duration.asWeeks() + duration.asMonths() + duration.asYears();
    return -Math.abs(Math.round(days));
}

export const countDate = (date) => {
    let now = moment(new Date()); //today's date
    let before = now.subtract(Math.abs(date), 'days'); //date before today's date
    return before.format('YYYY-MM-DD'); //format date;
}

// Count years between two dates
export const countYears = (date) => {
    return moment().diff(countDate(date), 'years');
}

export const multipleYears = (data) => {
    // Loop through the dates and convert the numbers into a year
    let {min, max, first, third} = data;

    return {
        max: min,
        min: max,
        first: third,
        third: first
    };
}