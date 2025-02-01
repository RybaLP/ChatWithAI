"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [isBotTyping, setIsBotTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            if (chatId) {
                try {
                    const response = await fetch(`/api/chats/${chatId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    setMessages(data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            } else {
                setMessages([]);
            }
        };

        fetchMessages();
    }, [chatId]);

    useEffect(() => {
        if (!isUserScrolling) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isBotTyping]);

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            setIsUserScrolling(scrollHeight - scrollTop - clientHeight > 50);
        }
    };

    const handleSendMessage = async () => {
        if (newMessageText.trim() !== '' && chatId) {
            const newMessage: Message = {
                _id: Math.random().toString(36).substr(2, 9),
                role: 'user',
                text: newMessageText
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setNewMessageText('');

            setTimeout(async () => {
                try {
                    setIsBotTyping(true);
                    
                    await fetch(`/api/chats/${chatId}/addMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ message: newMessage.text }),
                    });

                    const updatedChat = await fetch(`/api/chats/${chatId}`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                    });
                    const data = await updatedChat.json();
                    setMessages(data);
                } catch (error) {
                    console.error('Error sending message:', error);
                } finally {
                    setIsBotTyping(false);
                }
            }, 500);
        }
    };

    const TypingIndicator = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 flex justify-start"
        >
            <div className="max-w-[70%] p-4 rounded-2xl bg-gray-800 text-gray-100">
                <div className="flex space-x-2 justify-center items-center">
                    {[...Array(3)].map((_, index) => (
                        <motion.div
                            key={index}
                            animate={{
                                y: [0, -5, 0],
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: index * 0.2
                            }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                    ))}
                </div>
                <div className="mt-2 text-xs opacity-70 text-gray-400">
                    AI Assistant is typing...
                </div>
            </div>
        </motion.div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col p-6 bg-gray-900 border-l border-gray-700 h-screen"
        >
            <div 
                className="flex-grow overflow-y-auto pr-4 custom-scrollbar" 
                ref={chatContainerRef} 
                onScroll={handleScroll}
            >
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] p-4 rounded-2xl ${
                                message.role === 'user' 
                                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-100'
                            }`}>
                                <p className="text-sm">{message.text}</p>
                                <div className={`mt-2 text-xs opacity-70 ${
                                    message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                                }`}>
                                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isBotTyping && <TypingIndicator />}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            <div className="mt-6 flex gap-3">
                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    value={newMessageText}
                    onChange={e => setNewMessageText(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-grow bg-gray-800 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!newMessageText.trim()}
                    className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold px-6 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Send
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ChatWindow;
