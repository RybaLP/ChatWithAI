"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";

interface Chat {
    _id: string;
    title: string;
}

interface SidebarProps {
    chats: Chat[];
    onSelectChat: (chatId: string) => void;
    onNewChat: (title: string) => void;
    onDeleteChat : (chatId : string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, onSelectChat, onNewChat, onDeleteChat }) => {
    const [newChatTitle, setNewChatTitle] = useState("");
    const [isOpen, setIsOpen] = useState(true);

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

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (response.ok) {
                localStorage.removeItem('token');
                window.location.href = '/';
                console.log("Wylogowano pomyślnie");
            } else {
                console.error("Błąd wylogowywania:", response.status);
                const errorData = await response.json();
                alert(errorData.message || "Wystąpił błąd podczas wylogowywania.");
            }
        } catch (error) {
            console.error("Błąd wylogowywania:", error);
            alert("Wystąpił błąd podczas wylogowywania.");
        }
    };

    return (
        <div className="relative h-screen">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ duration: 0.5 }}
                        className="w-64 bg-gray-900 text-white p-6 shadow-xl border-r border-gray-700 h-screen fixed top-0 left-0 z-10 overflow-y-auto md:static"
                    >
                        {/* Przycisk wylogowania na samej górze */}
                       

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

                            <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg mb-6 transition-all my-5" // Dodano margin-bottom
                        >
                            Wyloguj
                        </motion.button>


                        </div>

                        <h2 className="text-xl font-bold mb-4 text-purple-400">Czat</h2>
                        <ul className="space-y-2">
    {chats.map(chat => (
        <motion.li
            key={chat._id}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer flex justify-between items-center bg-gray-800 hover:bg-purple-600 p-3 rounded-lg transition-colors"
        >
            <span onClick={() => onSelectChat(chat._id)} className="flex-1">{chat.title}</span>
            
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Zapobiega przypadkowemu otwieraniu czatu podczas usuwania
                    onDeleteChat(chat._id);
                }}
                className="text-red-500 hover:text-red-700"
            >
                <FaTrash />
            </button>
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