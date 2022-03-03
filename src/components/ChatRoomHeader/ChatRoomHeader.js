import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { LogoutOutlined } from "@ant-design/icons";
import { unsetUser } from "../../redux/user";
import './ChatRoomHeader.scss';

function ChatRoomHeader() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="chatRoomHeader">
      <div className="greeting">
        <span>Hi {user?.displayName}, </span>
        <span>Say hi to your friends 👋</span>
      </div>
      <button
        className="logoutButton pillButton"
        type="primary"
        onClick={async () => {
          await auth.signOut();
          dispatch(unsetUser());
        }}
      >
        <LogoutOutlined />
        Sign out
      </button>
    </div>
  );
}
export default ChatRoomHeader;
