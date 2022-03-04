import { scheduleCheck } from "../constants/lineSchedules";
import { night, normal, peak } from "../constants/timing";
import { timeCategory } from "../enums/timeCategory";
import { getHours, parseDategetDay } from "./time";

export const timingChecker = (date: string) => {
  const now = new Date(date);
  const day = parseDategetDay(now);
  if (!day) {
    throw new Error("Error with day");
  }
  const hour = getHours(now);
  const timingType = scheduleCheck(day, hour);
  switch (timingType) {
    case timeCategory.PEAK:
      return peak;
    case timeCategory.NON:
      return normal;
    case timeCategory.NIGHT:
      return night;
    default:
      throw new Error("timingChecker error");
  }
};
