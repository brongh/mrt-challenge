import { Day } from "../enums/days";

export const convertDay = (day: number) => {
  switch (day) {
    case 0:
      return Day.SUN;
    case 1:
      return Day.MON;
    case 2:
      return Day.TUES;
    case 3:
      return Day.WED;
    case 4:
      return Day.THURS;
    case 5:
      return Day.FRI;
    case 6:
      return Day.SAT;
  }
};
