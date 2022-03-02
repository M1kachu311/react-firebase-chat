import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, orderBy, query, limit, addDoc } from "firebase/firestore";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatForm from './ChatForm';
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom({ user }) {
  const navigate = useNavigate();
  const [userColor, setUserColor] = useState();
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("created_date"), limit(25));
  const [messages] = useCollectionData(messagesQuery);


  useEffect(() => {
    if (user) {
      //generate random color for user in chat
      setUserColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    } else {
      //redirect to login when logged out
      navigate("/");
    }
  }, [user]);

  return (
    <div className="chatRoom">
      <div className="chatRoomHeader">
        <div className="greeting"> 
          <span>Hi {user?.displayName}, </span> 
          <span>Say hi to your friends 👋</span> 
        </div>
        <Button
          className="logoutButton"
          type="primary"
          onClick={() => {
            auth.signOut();
          }}
        >
          Sign out
        </Button>
      </div>
      <div className="messagesContainer">
        {messages &&
          messages.map((message) => {
            return <ChatMessage message={message} key={message.id} />;
          })}
      </div>
     <ChatForm user={user} userColor={userColor}/>
    </div>
  );
}
export default ChatRoom;
