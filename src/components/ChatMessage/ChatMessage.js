import React from "react";
import { useSelector } from "react-redux";
import { getTimeDiffString } from "../../utils/utils";
import "./ChatMessage.scss";

function ChatMessage({ message }) {
  const { user } = useSelector((state) => state.user);
  return (
    <div
      className={`chatMessage ${
        message.uid === user?.uid ? "myMessage" : "notMyMessage"
      }`}
    >
      <span className="chatMessageName" style={{ color: message.color }}>
        {message.name}
      </span>
      <p className="chatMessageText">{message.text}</p>
      <p className="chatMessageTime">{getTimeDiffString(message)}</p>
    </div>
  );
}
export default ChatMessage;
