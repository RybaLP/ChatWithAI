import React from "react";

const Message: React.FC<{ content: string; sender: "user" | "bot" }> = ({
  content,
  sender,
}) => {
  return (
    <div
      className={`p-3 rounded-lg ${
        sender === "user"
          ? "bg-blue-600 text-white self-end"
          : "bg-gray-700 text-gray-200 self-start"
      }`}
      style={{ maxWidth: "75%" }}
    >
      {content}
    </div>
  );
};

export default Message;
