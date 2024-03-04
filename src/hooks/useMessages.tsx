import { useState, useEffect } from "react";
import { socket } from "../../common/lib/socket";
import { Message } from "../../common/types/global";

const useMessages = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket.connected) socket.emit("join_message_room", roomId);
    socket.on("message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, userName: "Other" },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (message: string) => {
    socket.emit("sendMessage", {
      room: roomId,
      message: message || "no message",
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { message, userName: "You" },
    ]);
  };

  return { messages, sendMessage };
};

export default useMessages;
