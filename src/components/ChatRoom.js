import React, { useEffect, useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { unsetUser } from "../redux/user";
import { db, auth } from "../firebase";
import { collection, orderBy, query, limitToLast } from "firebase/firestore";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "../style/ChatRoom.scss";

function ChatRoom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      <div className="chatRoomHeader">
        <div className="greeting">
          <span>Hi {user?.displayName}, </span>
          <span>Say hi to your friends 👋</span>
        </div>
        <div
          className="logoutButton pillButton"
          type="primary"
          onClick={async () => {
            await auth.signOut();
            dispatch(unsetUser());
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
      <ChatForm />
    </div>
  );
}
export default ChatRoom;
