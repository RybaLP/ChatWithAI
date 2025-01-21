"use client";

import React, { useState } from "react";
import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";

export default function Home() {
  const [chats, setChats] = useState<{ id: string; name: string }[]>([
    { id: "1", name: "Czat 1" },
  ]);
  const [activeChatId, setActiveChatId] = useState("1");

  const handleNewChat = () => {
    const newChatId = (chats.length + 1).toString();
    setChats([...chats, { id: newChatId, name: `Czat ${newChatId}` }]);
    setActiveChatId(newChatId);
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
  };

  return (
    <main className="h-screen flex bg-gray-100">
      <ChatSidebar
        chats={chats}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />
      <ChatWindow chatId={activeChatId} />
    </main>
  );
}
