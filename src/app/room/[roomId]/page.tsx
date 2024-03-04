"use client";

import React from "react";
import Chat from "@/components/pages/Room/Chat";
import { useRouter } from "next/navigation";
import ExcalidrawWrapper from "@/components/pages/Room/ExcalidrawWrapper";

export default function Room({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const router = useRouter();

  const handleLeaveRoom = () => {
    router.push(`/`);
  };

  return (
    <div className="flex h-screen w-full relative">
      <div className="h-full w-full flex flex-col">
        <div>
          Room {roomId}
          <button className="ml-4" onClick={handleLeaveRoom}>
            Leave room
          </button>
        </div>
        <div className="w-full h-full relative flex justify-between">
          <ExcalidrawWrapper params={{ roomId: roomId }} />
        </div>
      </div>
      <Chat roomId={roomId} />
    </div>
  );
}
