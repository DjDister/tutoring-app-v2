"use client";
import dynamic from "next/dynamic";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);
import { socket } from "../../common/lib/socket";

export default function Home() {
  const handleHello = () => {
    socket.emit("hello", "Hello from the client!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full h-1/2 bg-slate-400">
        Tutoring app v2 init
        <button onClick={handleHello}>Say hello to the server</button>
      </div>
      <div className="w-full h-1/2">
        <Excalidraw />
      </div>
    </div>
  );
}
