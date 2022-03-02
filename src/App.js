import './App.scss'
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from 'firebase/auth';


const app = initializeApp({
  apiKey: "AIzaSyACt1Sc4rq7DNADYZADBxRR1eyCkC8bjX8",
  authDomain: "reactfirebasechat-b6785.firebaseapp.com",
  projectId: "reactfirebasechat-b6785",
  storageBucket: "reactfirebasechat-b6785.appspot.com",
  messagingSenderId: "501897495435",
  appId: "1:501897495435:web:13718fdc331badd04b658e"
})

const auth = getAuth();
signInAnonymously(auth).then(()=>{
  console.log('logged in')
  console.log(auth)
}).catch()
function App() {
  return (
    <div className="App">
      <header className="App-header">
      {auth.currentUser ? "USER":"NO USER"}
      </header>
    </div>
  );
}

export default App;
