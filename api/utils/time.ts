import { convertDay } from "../constants/days";

export const convertToDateTime = (now: Date) => {
  const year = now.getFullYear();
  const preMonth = now.getMonth() + 1;
  const month = preMonth > 9 ? preMonth : `0${preMonth}`;
  const preDay = now.getDate();
  const day = preDay > 9 ? preDay : `0${preDay}`;
  const preHour = now.getHours();
  const hour = preHour > 9 ? preHour : `0${preHour}`;
  const preMin = now.getMinutes();
  const min = preMin > 9 ? preMin : `0${preMin}`;

  return `${year}-${month}-${day}T${hour}:${min}`;
};

export const parseDategetDay = (now: Date) => {
  const day = convertDay(now.getDay());
  return day;
};

export const getHours = (now: Date) => {
  const hour = now.getHours();
  return hour;
};
