import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import * as Redux from "@/lib/modules/excalidrawSlice";
import { useExcalidrawSlice } from "./useExcalidrawSlice";
import { setPointer } from "@/lib/modules/excalidrawPointersSlice";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../common/types/global";

export const useSocket = ({ room_Name }: { room_Name: string }) => {
  const [onSocket, setOnSocket] = useState(false);
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const { handleExcalidrawSelectDispatch } = useExcalidrawSlice();
  useEffect(() => {
    if (onSocket) {
      const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
      socketRef.current = socket;
      if (socketRef.current) {
        const socket = socketRef.current;
        socket.on("connect", () => {
          socket.on("error", (error: any) => {
            console.error("Socket connection error:", error);
          });
          socket.emit("join_room", room_Name);

          socket.on("stream_receive_message", (data) => {
            handleExcalidrawSelectDispatch(Redux.setStreamEl, data);
          });

          socket.on("add_receive_message", (data) => {
            handleExcalidrawSelectDispatch(Redux.setAddOtherEl, data);
          });

          socket.on("stream_move_receive_message", (data) => {
            handleExcalidrawSelectDispatch(Redux.setChange_Els, data);
          });

          socket.on("move_receive_message", (data) => {
            handleExcalidrawSelectDispatch(Redux.setChange_Els, data);
          });

          socket.on("change_strokeColor_receive_message", (data) => {
            handleExcalidrawSelectDispatch(Redux.setChange_Els, data);
          });

          socket.on("remove_receive_message", (data) => {
            handleExcalidrawSelectDispatch(Redux.setRemove_Els, data);
          });

          socket.on("stream_pointer_receive_message", (data) => {
            // setPointer
            handleExcalidrawSelectDispatch(setPointer, data);
          });
        });
      }
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [onSocket]);
  return { socketAPI: socketRef.current, onSocket, setOnSocket };
};
