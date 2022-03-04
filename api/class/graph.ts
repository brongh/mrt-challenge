export class Graph {
  noOfVertices: number;
  AdjList: any;
  output: any[];
  final: any;
  shortlist: any[];
  constructor(noOfVertices: number) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
    this.output = [];
    this.final;
    this.shortlist = [];
  }

  addVertex(v: string) {
    this.AdjList.set(v, []);
  }

  addEdge(v: string, w: string) {
    const vList = this.AdjList.get(v);
    vList.push(w);
    // const wList = this.AdjList.get(w);
    // if (!wList.includes(v)) vList.push(v);
  }

  printGraph() {
    const getKeys = this.AdjList.keys();

    for (let i of getKeys) {
      const getValues = this.AdjList.get(i);
      let conc = "";
      for (let j of getValues) {
        conc += j + " ";
      }
      if (i === "Little India") console.log(i + " -> " + conc);
      console.log(i + " -> " + conc);
    }
  }

  dfs(startNode: string, endNode: string) {
    this.dfsFunc(startNode, endNode);
    return {
      shortest: [...new Set(this.final), endNode],
      shortlist: this.shortlist,
    };
  }

  dfsFunc(vert: string, endNode: string, prevPaths?: any) {
    const getAdj: string[] = this.AdjList.get(vert);
    const notPassedBy = prevPaths ? !prevPaths.has(vert) : true;
    const sizeOfPath = prevPaths ? prevPaths.size : 0;
    const lengthOfAdj = getAdj ? getAdj.length : 0;
    if (this.output.length > 800) {
      this.output = [];
      return;
    }
    if (vert === endNode) {
      if (!this.final) {
        this.shortlist.push([...new Set(prevPaths)]);
        this.final = prevPaths;
      } else if (this.final.size > sizeOfPath) {
        this.final = prevPaths;
        this.shortlist.push([...new Set(prevPaths)]);
      }
    } else {
      for (let item in getAdj) {
        const element = getAdj[item];

        if (!prevPaths) {
          const route = new Set([vert]);
          this.output.push(route);
          this.dfsFunc(element, endNode, route);
        } else if (prevPaths && sizeOfPath < 40) {
          if (lengthOfAdj === 2) {
            if (notPassedBy) {
              prevPaths.add(vert);
              this.dfsFunc(element, endNode, prevPaths);
            }
          }
          if (lengthOfAdj > 2) {
            if (notPassedBy) {
              const route = new Set([...prevPaths, vert]);
              this.output.push(route);
              this.dfsFunc(element, endNode, route);

              // prevPaths.add(vert);
              // this.dfsFunc(element, endNode, prevPaths);
            }
          }
        }
      }
    }
    this.output = [];
    return;
  }
}
