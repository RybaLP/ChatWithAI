"use client";

import { useState, useEffect } from 'react';

interface Message {
    _id: string;
    role: string;
    text: string;
}

interface ChatWindowProps {
    chatId: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessageText, setNewMessageText] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            if (chatId) {
                try {
                    const response = await fetch(`/api/chats/${chatId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setMessages(data);
                    console.log('Messages updated:', data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            } else {
                setMessages([]); // Czyścimy listę wiadomości, gdy chatId jest null
            }
        };

        fetchMessages();
    }, [chatId]);

    const handleSendMessage = async () => {
        if (newMessageText.trim() !== '' && chatId) {
            try {
                const response = await fetch(`/api/chats/${chatId}/addMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ message: newMessageText }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setNewMessageText('');
                // Odśwież listę wiadomości po wysłaniu nowej wiadomości
                const updatedChat = await fetch(`/api/chats/${chatId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await updatedChat.json();
                setMessages(data);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="flex-1 flex flex-col p-4">
            <div className="flex-grow overflow-y-auto">
                {messages.map(message => (
                    <div key={message._id} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    className="flex-grow border border-gray-300 rounded p-2 mr-2"
                    value={newMessageText}
                    onChange={e => setNewMessageText(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSendMessage}
                >
                    Wyślij
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;