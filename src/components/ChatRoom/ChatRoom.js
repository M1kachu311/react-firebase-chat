import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { collection, orderBy, query, limitToLast } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ChatRoomHeader from '../ChatRoomHeader/ChatRoomHeader';
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatForm from "../ChatForm/ChatForm";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./ChatRoom.scss";

function ChatRoom() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(
    messagesRef,
    orderBy("created_date"),
    limitToLast(50)
  );
  const [messages] = useCollectionData(messagesQuery);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (!user) {
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
      <ChatRoomHeader/>
      <div className="messagesContainer" ref={messagesContainerRef}>
        {messages &&
          messages.map((message,index) => {
            return <ChatMessage message={message} key={`message${index}`} />;
          })}
      </div>
      <ChatForm />
    </div>
  );
}
export default ChatRoom;
