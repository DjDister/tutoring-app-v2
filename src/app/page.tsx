"use client";

import { socket } from "../../common/lib/socket";

export default function Home() {
  const handleHello = () => {
    socket.emit("hello", "Hello from the client!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      Tutoring app v2 init
      <button onClick={handleHello}>Say hello to the server</button>
    </div>
  );
}
