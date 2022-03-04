import csv from "csvtojson";

export const mapData = async () => {
  const mrtData = await csv().fromFile("./StationMap.csv");
  return mrtData;
};
