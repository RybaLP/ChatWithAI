"use client";

import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";

type MessageType = { content: string; sender: "user" | "bot" };

const ChatWindow: React.FC<{ chatId: string; userId: string }> = ({ chatId, userId }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(chatId);

  useEffect(() => {
    if (!currentChatId) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chats/${currentChatId}`, {
          headers: { "x-user-id": userId },
        });

        if (!response.ok) {
          console.error("Failed to fetch messages");
          setMessages([]);
          return;
        }

        const data = await response.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentChatId, userId]);

  const sendMessage = async (message: string) => {
    const userMessage: MessageType = { content: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: currentChatId,
          message,
          userId,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send message");
        return;
      }

      const data = await response.json();
      const botMessage: MessageType = { content: data.reply, sender: "bot" };

      // Aktualizacja ID czatu, jeśli nowy czat został utworzony
      if (!currentChatId) setCurrentChatId(data.chatId);

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full flex-1 bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} content={msg.content} sender={msg.sender} />
        ))}
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  );
};


export default ChatWindow;
