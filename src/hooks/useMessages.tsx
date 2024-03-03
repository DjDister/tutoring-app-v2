import { useState, useEffect } from "react";
import { socket } from "../../common/lib/socket";
import { Message } from "../../common/types/global";

const useMessages = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket.connected) socket.emit("joinRoom", roomId);
    socket.on("message", (message: Message) => {
      console.log("message recieved", message);
      setMessages((prevMessages) => [...prevMessages, message]);
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
