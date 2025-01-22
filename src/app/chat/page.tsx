"use client";

import { useState } from "react";
import Sidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chats, setChats] = useState([{ id: "1", name: "Czat 1" }]);

  const handleSelectChat = (id: string) => {
    setSelectedChat(id);
  };

  const handleNewChat = () => {
    const newChat = { id: `${chats.length + 1}`, name: `Czat ${chats.length + 1}` };
    setChats([...chats, newChat]);
    setSelectedChat(newChat.id);
  };

  return (
    <div className="flex h-screen">
      <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatWindow chatId={selectedChat} userId="demoUserId" />
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            Wybierz czat, aby rozpocząć rozmowę.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
