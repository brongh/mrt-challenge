import { generateGraph } from "../db/generateGraph";
import { stationAndLines } from "../db/stationAndLines";
import { splitByLines } from "../utils/lineParse";
import { timingChecker } from "../utils/timingChecker";
export const routing = async (
  starting: string,
  ending: string,
  date: string
) => {
  const linesData = stationAndLines();
  const { shortlist } = await generateGraph(starting, ending);
  const sortedList = shortlist.sort((a, b) => {
    return a.length - b.length;
  });
  sortedList.splice(3);
  let shortListSplit: any = [];
  let ticker = 0;

  const timingCheck = timingChecker(date);
  console.log("time: ", timingCheck);

  for (let i of sortedList) {
    const count = sortedList[ticker].length - 1;
    Promise.resolve(splitByLines(i, linesData)).then((item) => {
      let duration = 0;
      Object.keys(item).forEach((line: any) => {
        // @ts-ignore
        if (timingCheck[line]) {
          // @ts-ignore
          const numOfStations = item[line].length - 1;
          // @ts-ignore
          duration = duration + numOfStations * timingCheck[line];
        }
      });
      const interchanges = Object.keys(item).length - 1;
      // @ts-ignore
      duration = duration + interchanges * timingCheck["inter"];
      shortListSplit.push({ ...item, totalCount: count, duration });
    });
    ticker += 1;
  }

  return shortListSplit;
};
