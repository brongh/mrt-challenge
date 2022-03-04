import fs from "fs";

export const getInterChanges = () => {
  const rawData = fs.readFileSync("./interchange.json");
  // @ts-ignore
  const output = JSON.parse(rawData);
  return output;
};
