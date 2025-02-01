"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";

interface Chat {
  _id: string;
  title: string;
}



const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  // Funkcja do pobrania czatów
  const fetchChats = async () => {
    try {
      const response = await fetch("/api/chats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched chats: ", data);
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []); // Pobieramy czaty tylko na początku

  useEffect(() => {
    if (!chats.some(chat => chat._id === selectedChatId)) {
      setSelectedChatId(null);
    }
  }, [chats, selectedChatId]);

  // Funkcja do obsługi wybierania czatu
  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  // Funkcja do tworzenia nowego czatu
  const handleNewChat = async (title: string) => {
    try {
      const response = await fetch("/api/chats/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newChat = (await response.json()) as Chat;

      // Odświeżamy listę czatów po dodaniu nowego czatu
      fetchChats();
      setSelectedChatId(newChat._id); // Ustawiamy nowy czat jako wybrany
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Brak tokena uwierzytelniającego.");
        return;
      }
  
      const response = await fetch(`/api/chats/${chatId}/deleteMessage`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Błąd usuwania czatu");
      }
  
      // Aktualizujemy listę czatów bez odświeżania strony
      setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
    } catch (error) {
      console.error("Błąd usuwania czatu:", error);
    }
  };
  


  return (
    <div className="relative min-h-screen bg-black flex">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-40 blur-2xl" />
      </motion.div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} onDeleteChat={handleDeleteChat} />
      </motion.div>

      {/* Chat Window */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="flex-1 relative z-10"
      >
        {selectedChatId ? <ChatWindow chatId={selectedChatId} /> : <div className="flex items-center justify-center h-full text-gray-300">Wybierz rozmowę</div>}
      </motion.div>
    </div>
  );
};

export default ChatPage;
