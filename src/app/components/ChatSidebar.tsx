"use client";

import React, { useState } from "react";

type ChatSidebarProps = {
  chats: { id: string; name: string }[];
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, onSelectChat, onNewChat }) => {
  return (
    <div className="w-1/4 bg-gray-800 text-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-semibold"
        >
          Nowy Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
