import React, { useState } from "react";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { message, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

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
      <div className="loginContainer">
        <Input
          placeholder="Display name"
          value={displayName}
          onChange={handleChange}
        />
        <Button type="primary" onClick={handleClick}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
export default SignIn;
