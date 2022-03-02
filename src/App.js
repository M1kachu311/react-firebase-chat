import "./App.scss";
import "antd/dist/antd.css";
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from './firebase';


function App() {
  const [user] = useAuthState(auth);
  console.log(user)
  return (
    <div className="App">
      <header className="App-header">
        {user ? <ChatRoom /> : <SignIn />}
      </header>
    </div>
  );
}

export default App;
