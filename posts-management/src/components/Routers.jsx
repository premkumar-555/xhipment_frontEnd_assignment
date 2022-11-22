import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fireBase } from "../firebase/firebase.config.js";
import NavBar from "./NavBar";
import MainContainer from "./container";
import "./Routers.css";
import SignIn from "./signIn";
import { useState, createContext, useContext } from "react";
import UserContext from "./UserContext";

export default function Routers() {
  const [userId, setUserId] = useState("");

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </UserContext.Provider>
  );
}
