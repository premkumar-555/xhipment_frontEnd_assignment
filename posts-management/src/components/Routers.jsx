import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fireBase } from "../firebase/firebase.config.js";
import NavBar from "./NavBar";
import Container from "./container";
import "./Routers.css";
import SignIn from "./signIn";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Container />} />
      <Route path="signin" element={<SignIn />} />
    </Routes>
  );
}
