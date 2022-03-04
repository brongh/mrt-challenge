import fs from "fs";
import { Graph } from "../class/graph";
import { csvTrains } from "../interfaces/csvTrains";

export const generateGraph = async (start: string, end: string) => {
  const map = fs.readFileSync("./names.json");
  const parsedMap = JSON.parse(map.toString("utf8"));
  const rawData = fs.readFileSync("./allStationNames.json");
  const allStationNames = JSON.parse(rawData.toString("utf8"));

  const stationSet = new Set(parsedMap);
  const graph = new Graph(stationSet.size);
  for (let item of stationSet) {
    // console.log(item);
    graph.addVertex(item as string);
  }
  const edges: { vertex: string; edges: string[] }[] = [];
  for (let item in allStationNames) {
    const lineArr = allStationNames[item];
    for (let i = 0; i < lineArr.length; i++) {
      if (i === 0) {
        edges.push({
          vertex: lineArr[i],
          edges: [lineArr[i + 1]],
        });
      } else if (i === lineArr.length - 1) {
        edges.push({
          vertex: lineArr[i],
          edges: [lineArr[i - 1]],
        });
      } else {
        edges.push({
          vertex: lineArr[i],
          edges: [lineArr[i - 1], lineArr[i + 1]],
        });
      }
    }
  }
  edges.forEach((item) => {
    item.edges.forEach((i) => {
      graph.addEdge(item.vertex, i);
    });
  });

  const route = graph.dfs(start, end);
  return route;
};
