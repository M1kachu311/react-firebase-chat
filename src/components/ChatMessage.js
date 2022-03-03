import React from "react";
import { useSelector } from "react-redux";
import "../style/ChatMessage.scss";

function ChatMessage({ message }) {
  const { user } = useSelector((state) => state.user);

  const getTimeDiffString = (message) => {
    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const postedDate = message.created_date.seconds * oneSecond;
    const now = new Date().getTime();
    const diff = now - postedDate;
    if (diff < oneSecond * 10) {
      return "A few seconds ago";
    } else if (diff < oneMinute) {
      return "Less than a minute ago";
    } else if (diff < oneHour) {
      const minutes = Math.floor(diff / oneMinute);
      return `${minutes}m ago`;
    } else if (diff < oneDay) {
      const hours = Math.floor(diff / oneHour);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diff / oneDay);
      return `${days}d ago`;
    }
  };
  return (
    <div
      className={`chatMessage ${message.uid === user?.uid ? "myMessage" : "notMyMessage"}`}
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
