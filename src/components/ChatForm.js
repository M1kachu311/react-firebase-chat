import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Input } from "antd";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Picker from "emoji-picker-react";
import { SmileOutlined, SendOutlined } from "@ant-design/icons";

function ChatForm() {
  const emojiSelectorRef = useRef(null);
  const { user, userColor } = useSelector((state) => state.user);
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

  //close the emoji sleector if click outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiSelectorRef.current &&
        !emojiSelectorRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiSelectorRef]);

  return (
    <div className="formContainer">
      <Input
        placeholder="Send a message"
        value={text}
        onChange={handleChange}
        maxLength="128"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      ></Input>
      <div className="emojiPickerContainer" ref={emojiSelectorRef}>
        <SmileOutlined
          className="emojiSelectorButton"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />
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

      <div className="sendMessageButton" onClick={handleSendMessage}>
        <SendOutlined />
      </div>
    </div>
  );
}
export default ChatForm;
