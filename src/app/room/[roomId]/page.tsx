import React from "react";
import Chat from "@/components/pages/Room/Chat";
import ExcalidrawWrapper from "@/components/pages/Room/ExcalidrawWrapper";
import RoomTitle from "@/components/pages/Room/RoomTitle";

export default function Room({ params }: { params: { roomId: string } }) {
  const { roomId } = params;

  return (
    <div className="flex h-screen w-full relative">
      <div className="h-full w-full flex flex-col">
        <RoomTitle roomId={roomId} />
        <div className="w-full h-full relative flex justify-between">
          <ExcalidrawWrapper params={{ roomId: roomId }} />
        </div>
      </div>
      <Chat roomId={roomId} />
    </div>
  );
}
