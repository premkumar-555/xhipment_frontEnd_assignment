import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config.js";
import NavBar from "./NavBar";
import Loader from "./loader";
import Container from "@mui/material/Container";
const MaterialContainer = Container;

import PostsContainer from "./PostsContainer";

export default function MainContainer() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const postsRef = collection(db, "posts");

  // get posts
  const getPosts = async () => {
    setLoader(true);
    const posts = await getDocs(postsRef);
    setPosts(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    posts ? setLoader(false) : setLoader(true);
    console.log(posts);
  };

  // delete a doc
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    getPosts();
  };

  // update a doc
  const updatePost = async (id, post) => {
    console.log(id, post);
    await updateDoc(doc(db, "posts", id), post);
    getPosts();
  };

  // create new doc
  const createPost = async (post) => {
    await addDoc(collection(db, "posts"), post);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <NavBar createPost={createPost} />
      {loader ? (
        <MaterialContainer
          maxWidth="xl"
          sx={{
            position: "absolute",
            top: "150px",
            alignSelf: "center",
            display: "flex",
            justifyContent: "center",
            width: "90vw",
          }}
        >
          <Loader />
        </MaterialContainer>
      ) : (
        <>
          <PostsContainer
            posts={posts}
            deletePost={deletePost}
            updatePost={updatePost}
          />
        </>
      )}
    </>
  );
}
