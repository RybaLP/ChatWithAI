"use client";

import { useState, useEffect } from 'react';
import Sidebar from "../components/ChatSidebar"
import ChatWindow from "../components/ChatWindow"

// Definiujemy interfejs dla danych czatu (dopasuj do swoich danych)
interface Chat {
    _id: string; // Dodajemy _id
    title: string;
    // Dodaj inne pola, które zwraca API
}

const ChatPage = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [chats, setChats] = useState<Chat[]>([]); // Określamy typ dla chats

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch('/api/chats', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Dane z API:', data);
                setChats(data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, []);

    const handleSelectChat = (chatId: string) => { // Dodajemy typ dla chatId
        console.log('Wybrano czat:', chatId);
        setSelectedChatId(chatId);
    };

    const handleNewChat = async (title: string) => { // Dodajemy typ dla title
        try {
            const response = await fetch('/api/chats/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newChat = await response.json() as Chat; // Dodajemy asercję typu
            setChats(prevChats => {
              if (prevChats.find(chat => chat._id === newChat._id)) {
                  console.warn('Czat z takim _id już istnieje:', newChat._id);
                  return prevChats; // Nie dodajemy duplikatu
              }
              return [...prevChats, newChat];
          });
            setSelectedChatId(newChat._id); // Używamy _id zamiast chatId
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
            {selectedChatId && <ChatWindow chatId={selectedChatId} />}
        </div>
    );
};

export default ChatPage;