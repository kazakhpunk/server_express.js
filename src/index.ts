import "dotenv/config";
import express from "express";
import connectDB from "./db";
import globalRouter from "./global-router";
import { logger } from "./logger";
import { authMiddleware } from "./middlewares/auth-middleware";
import { Worker } from "worker_threads";
import { EventModel } from "./events/models/Event";
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);
app.use(express.json());

app.use("/api/v1/", globalRouter);

app.get("/slow", async (request, response) => {
  const worker = new Worker("./src/workers/counterWorker.ts");

  worker.on("message", (message) => {
    response.send(message);
  });
});

app.get("/fast", (request, response) => {
  response.send("I'm fast one!");
});

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
