import moment from "moment";
import {locales} from "./locales";

const createRESTUrl = (url) => {
  return `http://localhost:8080${url}`;
};

const dateRanges = [
  {
    name: locales("allTime"),
    isValid: (date) => true
  },
  {
    name: locales("thisYear"),
    isValid: (date) => moment(new Date()).diff(moment(date), 'years') === 0
  },
  {
    name: locales("thisMonth"),
    isValid: (date) => moment(new Date()).diff(moment(date), 'months') === 0
  },
  {
    name: locales("thisWeek"),
    isValid: (date) => moment(new Date()).diff(moment(date), 'weeks') === 0
  },
  {
    name: locales("thisDay"),
    isValid: (date) => moment(new Date()).diff(moment(date), 'days') === 0
  },
  {
    name: locales("thisHalfDay"),
    isValid: (date) => notNegativeAndLess(moment(new Date()).diff(moment(date), 'hours'), 12)
  },
  {
    name: locales("thisHour"),
    isValid: (date) => notNegativeAndLess(moment(new Date()).diff(moment(date), 'hours'), 1)
  },
  {
    name: locales("halfHour"),
    isValid: (date) => notNegativeAndLess(moment(new Date()).diff(moment(date), 'minutes'), 30)
  },
  {
    name: locales("quarterHour"),
    isValid: (date) => notNegativeAndLess(moment(new Date()).diff(moment(date), 'minutes'), 15)
  }
];

const notNegativeAndLess = (value, range) => value >= 0 && value <= range;

export { createRESTUrl, dateRanges };
