import React from "react";

function ChatMessage({ message }) {
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
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diff < oneDay) {
      const hours = Math.floor(diff / oneHour);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diff / oneDay);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };
  return (
    <div className={`chatMessage`}>
      <span className="chatMessageName" style={{ color: message.color }}>
        {message.name + " "}
      </span>
      <span className="chatMessageTime">{getTimeDiffString(message)}</span>
      <p className="chatMessageText">{message.text}</p>
    </div>
  );
}
export default ChatMessage;
