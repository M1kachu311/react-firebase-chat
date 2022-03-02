import React from "react";

function ChatMessage({ message }) {
  return (
    <div className={`chatMessage`}>
      <span
        className="displayNameContainer"
        style={{ color: message.color }}
      >
        {message.name}:{" "}
      </span>
      {message.text}
    </div>
  );
}
export default ChatMessage;
