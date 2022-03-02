import React from "react";

function ChatRoom({ auth }) {
  return (
    <div>
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        sign out
      </button>
      <div>Chat Room</div>
    </div>
  );
}
export default ChatRoom;
