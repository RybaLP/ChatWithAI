import React from "react";
import { HiPlus } from "react-icons/hi"; // Ikona plusa
import { BiMessageAltDots } from "react-icons/bi"; // Ikona wiadomości

type ChatSidebarProps = {
  chats: { id: string; name: string }[];
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
};

const Sidebar: React.FC<ChatSidebarProps> = ({ chats, onSelectChat, onNewChat }) => {
  return (
    <div className="bg-gray-800 text-white w-64 h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Moje czaty</h1>
        <button
          className="p-2 bg-gray-700 rounded hover:bg-gray-600"
          onClick={onNewChat}
        >
          <HiPlus className="text-xl" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-4 flex items-center space-x-2 cursor-pointer hover:bg-gray-700`}
          >
            <BiMessageAltDots className="text-xl" />
            <span>{chat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Sidebar;
