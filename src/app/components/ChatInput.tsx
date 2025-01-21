"use client";

import React, { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
      <input
        type="text"
        placeholder="Wpisz wiadomość..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border rounded px-4 py-2"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Wyślij
      </button>
    </form>
  );
};

export default ChatInput;
