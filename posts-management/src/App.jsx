import { useState, useEffect } from "react";
import { db, fireBase } from "./firebase/firebase.config.js";
import { collection, doc, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Routers from "./components/Routers";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const getUsers = async () => {
    const usersRef = collection(db, "users");
    const users = await getDocs(usersRef);
    setUsers(users.docs.map((ele) => ({ ...ele.data(), id: ele.id })));
    console.log(users);
  };

  const handleSignInFlow = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  };

  useEffect(() => {
    handleSignInFlow();
  }, [isSignedIn]);

  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;
