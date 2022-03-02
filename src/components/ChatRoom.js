import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, orderBy, query, getDocs, limit } from "firebase/firestore";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import InputEmoji from "react-input-emoji";

function ChatRoom({ user }) {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleOnEnter = (text) => {
    console.log("enter", text);
  };
  //   const [messages, setMessages] = useState([]);

  //   const messagesRef = collection(db, "messages");
  //   const messagesQuery = query(messagesRef, orderBy("created_date"), limit(25));
  //   getDocs(messagesQuery).then((response) => {
  //     console.log(response);
  //   });

  useEffect(() => {
    //redirect to login when logged out
    if (!user) {
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
        <p>message1</p>
        <p>message2</p>
        <p>message3</p>
      </div>
      <div className="textAreaContainer">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
          borderRadius={0}
        />
      </div>
    </div>
  );
}
export default ChatRoom;
