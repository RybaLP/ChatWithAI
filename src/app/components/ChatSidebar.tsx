"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    const [newChatTitle, setNewChatTitle] = useState("");
    const [isOpen, setIsOpen] = useState(true); // Domyślnie otwarty

    const handleNewChatClick = () => {
        if (newChatTitle.trim() !== "") {
            onNewChat(newChatTitle);
            setNewChatTitle("");
        }
    };

    const sidebarVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: "-100%", opacity: 0 }
    };

    return (
        <div className="relative h-screen">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={sidebarVariants}
                        initial="closed" // Zawsze zaczynamy od zamkniętego stanu
                        animate="open" // Animujemy do otwartego stanu
                        exit="closed" // Animujemy do zamkniętego stanu przy wyjściu
                        transition={{ duration: 0.5 }}
                        className="w-64 bg-gray-900 text-white p-6 shadow-xl border-r border-gray-700 h-screen fixed top-0 left-0 z-10 overflow-y-auto md:static"
                    >
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Tytuł nowego czatu"
                                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={newChatTitle}
                                onChange={e => setNewChatTitle(e.target.value)}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleNewChatClick}
                                className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg mt-3 transition-all"
                            >
                                Nowy czat
                            </motion.button>
                        </div>

                        <h2 className="text-xl font-bold mb-4 text-purple-400">Czat</h2>
                        <ul className="space-y-2">
                            {chats.map(chat => (
                                <motion.li
                                    key={chat._id}
                                    whileHover={{ scale: 1.05 }}
                                    className="cursor-pointer bg-gray-800 hover:bg-purple-600 p-3 rounded-lg transition-colors"
                                    onClick={() => onSelectChat(chat._id)}
                                >
                                    {chat.title}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Sidebar;