import React from "react";
import "antd/dist/antd.css";
import "./App.scss";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import SignIn from "./components/SignIn/SignIn";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="chat" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}

export default App;
