"use client";

import React, { useState } from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<
    { content: string; sender: "user" | "bot" }[]
  >([]);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { content: message, sender: "user" }]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    setMessages((prev) => [...prev, { content: data.reply, sender: "bot" }]);
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto border rounded p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message key={index} content={msg.content} sender={msg.sender} />
        ))}
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default ChatWindow;
