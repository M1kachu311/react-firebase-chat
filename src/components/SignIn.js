import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserColor } from "../redux/user";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { message, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginOutlined, WechatOutlined } from "@ant-design/icons";
import "../style/SignIn.scss";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");

  const generateRandomColorForNewUser = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
  const handleChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleLogin = async () => {
    if (!displayName) {
      message.error("Please enter a display name", 3);
      return;
    }
    const { user } = await signInAnonymously(auth);
    await updateProfile(user, { displayName });
    const userColor = generateRandomColorForNewUser();
    dispatch(setUser(user));
    dispatch(setUserColor(userColor));
    navigate("/chat");
  };
  return (
    <div className="signIn">
      <div className="signInHeader">
        ChatMock <WechatOutlined />
      </div>
      <div> Enter your name below</div>
      <Input
        name="displayName"
        className="displayNameInput"
        value={displayName}
        onChange={handleChange}
        maxlength="25"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      />
      <div
        type="primary"
        onClick={handleLogin}
        className="signInButton pillButton"
      >
        <LoginOutlined />
        Sign In
      </div>
    </div>
  );
}
export default SignIn;
