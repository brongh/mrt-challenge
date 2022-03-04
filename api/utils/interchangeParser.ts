import fs from "fs";
import { mapData } from "../db/map";
import { csvTrains } from "../interfaces/csvTrains";
import { findDuplicates } from "./findDuplicates";

export const interchangeGenerator = async () => {
  const map: csvTrains[] = await mapData();
  const onlyName = map.map((item) => {
    return item["Station Name"];
  });
  const interchanges = findDuplicates(onlyName);
  const mapString = JSON.stringify(onlyName);
  fs.writeFile("names.json", mapString, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("names.json written successfully");
    }
  });
  const interchange = JSON.stringify(interchanges);
  fs.writeFile("interchange.json", interchange, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("interchange.json written successfully");
    }
  });

  let obj: {
    [key: string]: string[];
  } = {};
  map.forEach((item) => {
    const line = item["Station Code"].slice(0, 2);
    if (obj[line] === undefined || obj[line] === null) obj[line] = [];
    obj[line].push(item["Station Name"]);
  });
  const onlyNames = JSON.stringify(obj);
  fs.writeFile("allStationNames.json", onlyNames, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("allStationName.json written successfully");
    }
  });

  obj = {};
  map.forEach((item) => {
    const line = item["Station Code"].slice(0, 2);
    const name = item["Station Name"];
    if (obj[name] === undefined || obj[name] === null) obj[name] = [];
    if (!obj[name].includes(line)) obj[name].push(line);
  });
  const parsed = JSON.stringify(obj);
  fs.writeFile("stationAndLines.json", parsed, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("stationAndLines.json written successfully");
    }
  });
};
