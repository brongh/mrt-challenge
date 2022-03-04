import { mapData } from "./db/map";
import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";
import http from "http";

import { interchangeGenerator } from "./utils/interchangeParser";
import { routing } from "./service/routing";
import bodyParser from "body-parser";
import helmet from "helmet";

const startServer = async () => {
  const app = express();
  const port = 8000;

  // const path = "./interchange.json";
  const path = "./allStationNames.json";
  const path2 = "./names.json";
  const path3 = "./interchange.json";
  const path4 = "./stationAndLines.json";

  if (
    fs.existsSync(path) &&
    fs.existsSync(path2) &&
    fs.existsSync(path3) &&
    fs.existsSync(path4)
  ) {
    // path exists
    console.log("exists:", path);
  } else {
    console.log("===========================");
    console.log("Generating json file at: ", path);
    console.log("===========================");
    interchangeGenerator();
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    // @ts-ignore
    cors({
      origin: "*",
    })
  );
  app.use(helmet());

  const server = http.createServer(app);

  app.get("/", async (req: Request, res: Response) => {
    console.log("test");
    const map = fs.readFileSync("./names.json");
    const parsedMap = JSON.parse(map.toString("utf8"));
    res.send(parsedMap);
  });

  app.get("/route", async (req: Request, res: Response) => {
    try {
      const { starting, ending, date } = req.query;
      if (!starting || !ending || !date) {
        throw new Error("Invalid parameters");
      }
      const routingData = await routing(
        starting as string,
        ending as string,
        date as string
      );

      res.send(routingData);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  });

  server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();
