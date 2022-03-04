import { timing } from "../interfaces/trainTiming";

export const normal: timing | string = {
  DT: 8,
  TE: 8,
  NS: 10,
  NE: 10,
  CG: 10,
  EW: 10,
  CC: 10,
  CE: 10,
  inter: 10,
};

export const peak: timing | string = {
  NS: 12,
  NE: 12,
  DT: 10,
  TE: 10,
  CG: 10,
  EW: 10,
  CC: 10,
  CE: 10,
  inter: 15,
};

export const night: timing | string = {
  NS: 10,
  NE: 10,
  TE: 8,
  EW: 10,
  CC: 10,
  inter: 10,
};
