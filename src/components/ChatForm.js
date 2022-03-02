import React, { useState } from "react";
import { Input } from "antd";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Picker from "emoji-picker-react";
import { SmileOutlined, SendOutlined } from "@ant-design/icons";

function ChatForm({ user, userColor }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setText(`${text}${emojiObject.emoji}`);
    setShowEmojiPicker(false);
  };
  const messagesRef = collection(db, "messages");

  const handleSendMessage = async (e) => {
    if (text) {
      await addDoc(messagesRef, {
        uid: user.uid,
        name: user.displayName,
        text: text,
        color: userColor,
        created_date: new Date(),
      });
      setText("");
    }
  };
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="formContainer">
      <Input
        placeholder="Send a message"
        value={text}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      ></Input>
      <SmileOutlined
        className="emojiSelectorButton"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      />
      <div className="sendMessageButton" onClick={handleSendMessage}>
        <SendOutlined />
      </div>
      {showEmojiPicker && (
        <Picker
          pickerStyle={{
            position: "absolute",
            bottom: "90px",
            right: "15px",
          }}
          onEmojiClick={onEmojiClick}
        />
      )}
    </div>
  );
}
export default ChatForm;
