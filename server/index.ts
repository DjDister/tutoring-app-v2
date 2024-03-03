import { createServer } from "http";

import express from "express";
import next, { NextApiHandler } from "next";
import { Server } from "socket.io";
import { v4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.PORT);

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from the server!" });
  });

  app.all("*", (req: any, res: any) => nextHandler(req, res));

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnecting", () => {
      console.log("user disconnected");
    });

    socket.on("hello", (message) => {
      console.log("hello from client:", message);
    });
  });

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
});
