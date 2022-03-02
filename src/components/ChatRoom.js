import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import { collection, orderBy, query, limitToLast } from "firebase/firestore";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "../style/ChatRoom.scss";

function ChatRoom({ user }) {
  const navigate = useNavigate();
  const [userColor, setUserColor] = useState();
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(
    messagesRef,
    orderBy("created_date"),
    limitToLast(50)
  );
  const [messages] = useCollectionData(messagesQuery);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (user) {
      //generate random color for user in chat
      setUserColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    } else {
      //redirect to login when logged out
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    //scroll to bottom when we get new messages
    const messagesContainer = messagesContainerRef.current;
    messagesContainer.scrollTo({
      top: messagesContainer.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chatRoom">
      <div className="chatRoomHeader">
        <div className="greeting">
          <span>Hi {user?.displayName}, </span>
          <span>Say hi to your friends 👋</span>
        </div>
        <div
          className="logoutButton pillButton"
          type="primary"
          onClick={() => {
            auth.signOut();
          }}
        >
          <LogoutOutlined />
          Sign out
        </div>
      </div>
      <div className="messagesContainer" ref={messagesContainerRef}>
        {messages &&
          messages.map((message) => {
            return <ChatMessage message={message} />;
          })}
      </div>
      <ChatForm user={user} userColor={userColor} />
    </div>
  );
}
export default ChatRoom;
