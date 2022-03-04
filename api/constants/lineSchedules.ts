import { Day } from "../enums/days";
import { timeCategory } from "../enums/timeCategory";

export const scheduleCheck = (day: Day, hour: number) => {
  if (!day) {
    throw new Error("Error with day");
  }
  if (day !== Day.SAT && day !== Day.SUN) {
    if ((hour >= 6 && hour < 9) || (hour >= 18 && hour < 21)) {
      return timeCategory.PEAK;
    }
  }
  if (hour >= 22 && hour < 6) {
    return timeCategory.NIGHT;
  }
  return timeCategory.NON;
};
