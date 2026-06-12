
import dayjs from "dayjs";

export const TIMEOUT = {
      clickTimeout : 10000,
      veryShortTimeout : 1000,
      shortTimeout : 3000,
      mediumTimeout: 15000,
      longTimeout : 30000,
      dropdownTimeout: 20000
}

export const ADDNEWITEMS = {
      category:"Category",
      subcategory:"Subcategory",
      habit:"Habit"
}


 function getMonthName(monthNumber) {
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date();
  return  month[ Number(monthNumber - 1) - month.indexOf(date.toLocaleString("en-US", { month: "short" }))]; // get month Name
  
}

function getFullMonthName(monthNumber) {
  var month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const date = new Date();
  return  month[ Number(monthNumber - 1) - month.indexOf(date.toLocaleString("en-US", { month: "long" }))]; // get month Name
  
}

export function getDay(dateArg){
  let formatedDate = dateArg;

  let spliteddate = formatedDate.split("-");

  let day = spliteddate[1];// get day
  return day;
}

export function getMonth(dateArg){
  let formatedDate = dateArg;

  let spliteddate = formatedDate.split("-");

  let month = getMonthName(spliteddate[0]);// get month
  return month;
}


export function getFullMonthWithYear(dateArg){
  let formatedDate = dateArg;

  let spliteddate = formatedDate.split("-");

  let month = spliteddate[0];// get month
  let year = spliteddate[2];// get year

  return getFullMonthName(month) + " " + year;
}

export function getMonthWithDay(dateArg){
  let formatedDate = dateArg;

  let spliteddate = formatedDate.split("-");

  let month = spliteddate[0];// get month
  let day = spliteddate[1];// get day

  let leftSideDate = getMonthName(month) + " " + day;
  return leftSideDate;
}

export function weekDifferenceDate(dateArg) {
  let  d = new Date(dateArg);
  let days = d.getDay(); // get day 
  let diff = d.getDate() - days + (days == 0 ? -6 : 1); // adjust when day is sunday
  let currentWeekMondayDate = new Date(d.setDate(diff));

  let formatedDate = dayjs(currentWeekMondayDate).format("M-D-YYYY");

  let spliteddate = formatedDate.split("-");

  let month = spliteddate[0];// get month
  let day = spliteddate[1];// get day

  let leftSideDate = getMonthName(month) + " " + day;
  spliteddate = dayjs(formatedDate).add(6, "day").format("M-D-YYYY").split("-");

  month = spliteddate[0];
  day = spliteddate[1];
  let rightSideDate = getMonthName(month) + " " + day;

  let completeDate = leftSideDate + " - " + rightSideDate;
  return completeDate;
}
