import "./App.css";
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const app = initializeApp({
  apiKey: "AIzaSyACt1Sc4rq7DNADYZADBxRR1eyCkC8bjX8",
  authDomain: "reactfirebasechat-b6785.firebaseapp.com",
  projectId: "reactfirebasechat-b6785",
  storageBucket: "reactfirebasechat-b6785.appspot.com",
  messagingSenderId: "501897495435",
  appId: "1:501897495435:web:13718fdc331badd04b658e",
});

const auth = getAuth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        {user ? <ChatRoom auth={auth} /> : <SignIn auth={auth} />}
      </header>
    </div>
  );
}

export default App;
