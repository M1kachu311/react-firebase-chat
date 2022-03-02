import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, orderBy, query, limit, addDoc } from "firebase/firestore";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom({ user }) {
  const navigate = useNavigate();
  const [userColor, setUserColor] = useState();
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("created_date"), limit(25));
  const [messages] = useCollectionData(messagesQuery);

  const handleSendMessage = async (e) => {
    if (e.key === "Enter") {
      if (newMessage) {
        await addDoc(messagesRef, {
          uid: user.uid,
          name: user.displayName,
          text: newMessage,
          color: userColor,
          created_date: new Date(),
        });
        setNewMessage("");
      }
    }
  };
  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };
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
    <div className="chatRoomContainer">
      <div className="chatRoomHeader">
        <div className="greeting"> Hello {user?.displayName}</div>
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
      <div className="textAreaContainer">
        <Input
          placeholder="Send a message"
          value={newMessage}
          onChange={handleChange}
          onKeyDown={handleSendMessage}
        ></Input>
      </div>
    </div>
  );
}
export default ChatRoom;
