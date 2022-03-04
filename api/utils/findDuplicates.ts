import { interchanges } from "../interfaces/interchanges";

export const findDuplicates = (arr: any[]) => {
  const nameSets = new Set(arr);
  const mapInterchanges = arr.filter((item) => {
    if (nameSets.has(item)) {
      nameSets.delete(item);
    } else {
      return item;
    }
  });

  return [...new Set(mapInterchanges)];
};
