import { useState, useEffect, useContext } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { fireBase } from "../firebase/firebase.config.js";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const auth = getAuth(fireBase);
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = () => {
    var provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsSignedIn(true);
      })
      .catch((error) => {
        setIsSignedIn(false);
      });
  };

  const handleSignInFlow = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigate("/");
      } else {
        navigate("/signin");
      }
    });
  };

  const googleSignOut = () => {
    // var provider = new GoogleAuthProvider();
    signOut(auth)
      .then(() => {
        setIsSignedIn(false);
        console.log("Sign-out successful");
      })
      .catch((err) => {
        setIsSignedIn(true);
        console.log(err);
      });
  };

  useEffect(() => {
    handleSignInFlow();
  }, [isSignedIn]);

  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        width: "12rem",
        justifyContent: "center",
        height: "4rem",
        borderRadius: "0.5rem",
        margin: "auto",
        marginTop: "20vh",
        background: "whitesmoke",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <Button
        onClick={() => signIn()}
        variant="contained"
        size="large"
        sx={{ textTransform: "none" }}
      >
        Signin with Google
      </Button>
    </Stack>
  );
}
