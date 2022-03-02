import React from "react";
import "antd/dist/antd.css";
import "./App.scss";
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { Routes, Route } from "react-router-dom";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="chat" element={<ChatRoom user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
