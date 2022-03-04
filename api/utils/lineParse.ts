export const splitByLines = (
  route: string[],
  obj: { [key: string]: string[] }
) => {
  const indexes: number[] = [];
  let currLine: string[] = [];
  for (let i = 0; i < route.length; i++) {
    const curr = i;
    const next = i + 1;
    if (next > route.length - 1) {
    } else {
      obj[route[curr]].forEach((item) => {
        obj[route[next]].forEach((data) => {
          if (item === data && !currLine.includes(item)) {
            indexes.push(i);
            currLine.push(item);
          }
        });
      });
    }
  }
  const routes: {
    [key: string]: string[];
  } = {};
  for (let i = 0; i < indexes.length; i++) {
    if (i === indexes.length - 1) {
      routes[currLine[i]] = route.slice(indexes[i]);
    } else {
      routes[currLine[i]] = route.slice(indexes[i], indexes[i + 1] + 1);
    }
  }
  return routes;
};
