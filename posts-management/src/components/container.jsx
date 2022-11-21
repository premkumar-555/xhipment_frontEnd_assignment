import { useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config.js";
import NavBar from "./NavBar";

import PostsContainer from "./PostsContainer";

export default function Container() {
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");

  // get posts
  const getPosts = async () => {
    const posts = await getDocs(postsRef);
    setPosts(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(posts);
  };

  // delete a doc
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    getPosts();
  };

  // update a doc
  const updatePost = async (id, post) => {
    await updateDoc(postsRef, post);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <NavBar />
      <PostsContainer
        posts={posts}
        deletePost={deletePost}
        updatePost={updatePost}
      />
    </>
  );
}
