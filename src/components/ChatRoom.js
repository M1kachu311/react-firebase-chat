import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, orderBy, query, getDocs,limit } from "firebase/firestore";
import { Button } from 'antd';

function ChatRoom() {
//   const [messages, setMessages] = useState([]);

//   const messagesRef = collection(db, "messages");
//   const messagesQuery = query(messagesRef, orderBy("created_date"), limit(25));
//   getDocs(messagesQuery).then((response) => {
//     console.log(response);
//   });
  return (
    <div className="chatRoom">
      <Button
      type="primary"
        onClick={() => {
          auth.signOut();
        }}
      >
        sign out
      </Button>
      <div>Chat Room</div>
    </div>
  );
}
export default ChatRoom;
