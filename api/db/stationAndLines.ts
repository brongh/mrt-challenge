import fs from "fs";

export const stationAndLines = () => {
  const rawData = fs.readFileSync("./stationAndLines.json");
  // @ts-ignore
  const output = JSON.parse(rawData);
  return output;
};
