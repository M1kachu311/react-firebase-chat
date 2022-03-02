import React, { useState } from "react";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { message, Input } from "antd";
import { useNavigate } from "react-router-dom";
import {LoginOutlined} from '@ant-design/icons';

function SignIn() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");

  const handleChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleClick = async () => {
    if (!displayName) {
      message.error("Please enter a display name", 3);
      return;
    }
    const { user } = await signInAnonymously(auth);
    await updateProfile(user, { displayName });
    navigate("/chat");
  };
  return (
    <div className="signIn">
      <div className="signInHeader">Welcome to the chat</div>
      <div> Enter your name below</div>
      <Input
        name="displayName"
        className="displayNameInput"
        value={displayName}
        onChange={handleChange}
      />
      <div type="primary" onClick={handleClick} className="signInButton pillButton">
        <LoginOutlined/>
        Sign In
      </div>
    </div>
  );
}
export default SignIn;
