"use client";

import DoorSvg from "@/assets/svgs/DoorSvg";
import { useRouter } from "next/navigation";

export default function RoomTitle({ roomId }: { roomId: string }) {
  const router = useRouter();

  const handleLeaveRoom = () => {
    router.push(`/`);
  };
  return (
    <div className="w-auto p-2 text-lg flex gap-2 items-center">
      <button className="ml-4 flex gap-2" onClick={handleLeaveRoom}>
        <DoorSvg width={24} height={24} /> Leave
      </button>
      Room <span className="font-semibold">{roomId}</span>
    </div>
  );
}
