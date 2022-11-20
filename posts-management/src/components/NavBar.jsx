import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { fireBase } from "../firebase/firebase.config.js";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

export default function NavBar() {
  const auth = getAuth(fireBase);
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showLoader, setLoader] = useState(false);

  const handleSignInFlow = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        navigate("/");
      } else {
        navigate("/signin");
      }
    });
  };

  const googleSignOut = () => {
    // var provider = new GoogleAuthProvider();
    setLoader(true);
    signOut(auth)
      .then(() => {
        setLoader(false);
        setIsSignedIn(false);
      })
      .catch((err) => {
        setLoader(false);
        setIsSignedIn(true);
        console.log(err);
      });
  };

  useEffect(() => {
    handleSignInFlow();
  }, [isSignedIn]);

  return (
    <Box sx={{ height: "500px" }}>
      <AppBar
        position="absolute"
        top="0px"
        left="0px"
        sx={{
          height: 70,
          backgroundColor: "black",
          padding: "0 2rem",
        }}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Posts Manager
          </Typography>
          <Button
            onClick={() => googleSignOut()}
            sx={{ textTransform: "none" }}
            color="inherit"
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Sign out
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
