"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
  const [enterRoomId, setEnterRoomId] = useState("");
  const router = useRouter();

  const handleJoinRoom = () => {
    router.push(`/room/${enterRoomId}`);
  };

  return (
    <div className="flex  items-center justify-center h-screen">
      <div className="w-1/2 h-full flex items-center justify-center gap-2">
        <Input
          placeholder="Enter room id"
          onChange={(e) => setEnterRoomId(e.target.value)}
        />
        <button
          className="p-2 px-4 flex bg-slate-200 rounded-md w-auto text-nowrap"
          onClick={handleJoinRoom}
        >
          Join room
        </button>
      </div>
    </div>
  );
}
