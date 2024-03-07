import { Input } from "@/components/ui/input";
import useMessages from "@/hooks/useMessages";
import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Chat({ roomId }: { roomId: string }) {
  const [messageInput, setMessageInput] = useState("");
  const { messages, sendMessage } = useMessages(roomId);
  const [isMinimized, setIsMinimized] = useState(false);

  const minimizeChat = () => {
    setIsMinimized((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (!messageInput) return;
    sendMessage(messageInput);
    setMessageInput(() => "");
  };

  return (
    <>
      <button
        className="absolute top-2 z-10 bg-white rounded-md right-3"
        onClick={minimizeChat}
      >
        {isMinimized ? <ChevronLeft /> : <ChevronRight />}
      </button>
      {!isMinimized && (
        <div className="w-[250px] flex flex-col justify-end p-1 relative">
          <>
            <div className="flex flex-col-reverse gap-2 h-full w-full overflow-auto p-1">
              {[...messages].reverse().map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-wrap text-wrap break-all max-w-full leading-1.5 p-4 w-fit border-gray-200 text-sm font-normal py-2.5 text-gray-900 dark:text-white ${
                    message.userName === "You"
                      ? "bg-blue-400 text-right self-end rounded-s-xl rounded-b-xl"
                      : "bg-gray-100 rounded-e-xl rounded-es-xl "
                  }`}
                >
                  {message.message}
                </div>
              ))}
            </div>
            <div className="flex mt-2">
              <Input
                value={messageInput}
                placeholder="Enter message"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMessageInput(e.target.value);
                }}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <button onClick={handleSendMessage}>
                <ChevronRight />
              </button>
            </div>
          </>
        </div>
      )}
    </>
  );
}
