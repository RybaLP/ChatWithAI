import React from "react";

type MessageProps = {
  content: string;
  sender: "user" | "bot";
};

const Message: React.FC<MessageProps> = ({ content, sender }) => {
  return (
    <div className={`p-3 my-2 ${sender === "user" ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block px-4 py-2 rounded-lg ${
          sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
