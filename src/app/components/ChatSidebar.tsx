"use client";

import { useState } from 'react';

interface Chat {
    _id: string;
    title: string;
}

interface SidebarProps {
    chats: Chat[];
    onSelectChat: (chatId: string) => void;
    onNewChat: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, onSelectChat, onNewChat }) => {
    const [newChatTitle, setNewChatTitle] = useState('');

    const handleNewChatClick = () => {
        onNewChat(newChatTitle);
        setNewChatTitle('');
    };

    return (
        <div className="w-64 bg-gray-100 p-4">
            <h2 className="text-lg font-bold mb-4">Czat</h2>
            <ul>
                {chats.map(chat => (
                    <li
                        key={chat._id}
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                        onClick={() => onSelectChat(chat._id)}
                    >
                        {chat.title}
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Tytuł nowego czatu"
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                    value={newChatTitle}
                    onChange={e => setNewChatTitle(e.target.value)}
                />
                <button onClick={handleNewChatClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    Nowy czat
                </button>
            </div>
        </div>
    );
};

export default Sidebar;