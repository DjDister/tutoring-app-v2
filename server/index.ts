import { createServer } from "http";

import express from "express";
import next, { NextApiHandler } from "next";
import { Server } from "socket.io";
import dotenv from "dotenv";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../common/types/global";
dotenv.config();

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(async () => {
    const app = express();
    const server = createServer(app);

    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
      transports: ["websocket", "polling"],
      cors: {
        allowedHeaders: ["Content-Type", "Authorization"],
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
      },
      allowEIO3: true,
    });

    app.all("*", (req: any, res: any) => nextHandler(req, res));

    io.on("connection", (socket) => {
      console.log("a user connected", socket.id);
      socket.on("join_room", (room) => {
        console.log("joined room", room, socket.id);
        socket.join(room);
      });
      // socket.to(data.room).emit("initData_message", data)  // DB

      socket.on("stream_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("stream_receive_message", data);
      });

      socket.on("stream_move_Element", (data) => {
        console.log(data);
        socket.to(data.room).emit("stream_move_receive_message", data);
      });

      socket.on("add_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("add_receive_message", data);
      });

      socket.on("move_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("move_receive_message", data);
      });
      socket.on("change_strokeColor_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("change_strokeColor_receive_message", data);
      });

      socket.on("remove_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("remove_receive_message", data);
      });

      socket.on("stream_pointer", (data) => {
        console.log(data);
        socket.to(data.room).emit("stream_pointer_receive_message", data);
      });

      socket.on("join_message_room", async (room) => {
        console.log("joined message room", room, socket.id);
        socket.join(room);
      });

      socket.on("sendMessage", (data) => {
        socket.to(data.room).emit("message", data);
      });
    });

    server.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
