import { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import swal from "sweetalert";
import PopupModal from "./Model";
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
import Alert from "@mui/material/Alert";
import UserContext from "./UserContext";

export default function NavBar({ createPost }) {
  const auth = getAuth(fireBase);
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showLoader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const { userId, setUserId } = useContext(UserContext);

  const handleSignInFlow = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
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
        swal("Signed out successfully", " ", "success");
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
    <Box>
      <AppBar
        position="absolute"
        top="0px"
        left="0px"
        sx={{
          height: 70,
          backgroundColor: "black",
          padding: "0 5rem",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontSize: "2vw" }}
          >
            Posts Manager
          </Typography>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            sx={{ textTransform: "none" }}
            color="inherit"
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 3, fontSize: "2vw" }}
            >
              Create-Post
            </Typography>
          </Button>
          <Button
            onClick={() => googleSignOut()}
            sx={{ textTransform: "none" }}
            color="inherit"
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontSize: "2vw" }}
            >
              Sign-out
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <PopupModal
        open={open}
        setOpen={setOpen}
        post={{ userId: "", title: "", body: "" }}
        createPost={createPost}
      />
    </Box>
  );
}
