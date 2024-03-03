import { Input } from "@/components/ui/input";
import useMessages from "@/hooks/useMessages";
import React, { useState } from "react";

export default function Chat({ roomId }: { roomId: string }) {
  const [messageInput, setMessageInput] = useState("");
  const { messages, sendMessage } = useMessages(roomId);

  return (
    <div className="w-auto flex flex-col justify-end p-1">
      <div className="flex flex-col h-full w-full overflow-scroll p-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`leading-1.5 p-4 w-fit border-gray-200 text-sm font-normal py-2.5 text-gray-900 dark:text-white ${
              message.userName === "You"
                ? "bg-blue-400 text-right self-end rounded-s-xl rounded-b-xl"
                : "bg-gray-100 rounded-e-xl rounded-es-xl "
            }`}
          >
            {message.message}
          </div>
        ))}
      </div>
      <div className="flex">
        <Input
          placeholder="Enter message"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMessageInput(e.target.value);
          }}
        />
        <button onClick={() => sendMessage(messageInput)}>{">"}</button>
      </div>
    </div>
  );
}
