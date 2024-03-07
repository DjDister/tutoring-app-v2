import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import * as ExcalidrawTypes from "@excalidraw/excalidraw/types/types";
export interface ServerToClientEvents {
  message: (message: MessageToSend) => void;
  connect: () => void;
  error: (error: any) => void;
  stream_receive_message: (data: MESSAGE_ElProps) => void;
  add_receive_message: (data: MESSAGE_ElProps) => void;
  stream_move_receive_message: (data: MESSAGE_ElsProps) => void;
  move_receive_message: (data: MESSAGE_ElProps) => void;
  change_strokeColor_receive_message: (data: MESSAGE_ElsProps) => void;
  remove_receive_message: (data: MESSAGE_ElProps) => void;
  stream_pointer_receive_message: (data: STREAM_POINTER) => void;
  user_joined: (user: ConnectedUser) => void;
  user_disconnected: (userId: string) => void;
}

export interface ClientToServerEvents {
  sendMessage: (data: MessageToSend) => void;
  join_message_room: (room: string) => void;
  join_room: ({ room, userName }: { room: string; userName: string }) => void;
  stream_message: (data: MESSAGE_ElProps) => void;
  stream_move_Element: (data: MESSAGE_ElsProps) => void;
  add_message: (data: MESSAGE_ElProps) => void;
  move_message: (data: MESSAGE_ElProps) => void;
  change_strokeColor_message: (data: MESSAGE_ElsProps) => void;
  remove_message: (data: MESSAGE_ElProps) => void;
  stream_pointer: (data: STREAM_POINTER) => void;
}

export interface ConnectedUser {
  socketId: string;
  userName: string;
}

export interface Message {
  message: string;
  userName: string;
}

export interface MessageToSend {
  message: string;
  room: string;
}

export type JOIN_ROOM = string;
export type MESSAGE_ElProps = {
  room: JOIN_ROOM;
  message: ExcalidrawElement;
};
export type MESSAGE_ElsProps = {
  room: JOIN_ROOM;
  message: ExcalidrawElement[];
};

export type MESSAGE_REMOVE_MESSAGE = {
  room: JOIN_ROOM;
  message: string[];
};
export type STREAM_MESSAGE = {
  room: JOIN_ROOM;
  message: ExcalidrawElement;
};

export type STREAM_POINTER = {
  room: JOIN_ROOM;
  message: UserPonterType;
};

export type UserPonterType = {
  x: number;
  y: number;
  writerId: string;
  color?: string;
};

export enum pointerStateEnm {
  DOWN = "down",
  UP = "up",
}
export type pointerButtonType = Parameters<
  NonNullable<ExcalidrawTypes.ExcalidrawProps["onPointerUpdate"]>
>[0]["button"];

export type pointerPointerType = Parameters<
  NonNullable<ExcalidrawTypes.ExcalidrawProps["onPointerUpdate"]>
>[0]["pointer"];
