import NavBar from "../components/navBar";
import PostContainer from "../components/postContainer";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

export default function Home() {

  const {auth} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  useEffect( () => {
      const fetchPosts = async () => {
        const postRes = await axios.get("posts");
        postRes.data.sort((a, b) => {
          return a.postTime < b.postTime ? 1 : -1;
        })
        setPosts(postRes.data);
      }
      fetchPosts().then();
  }, []);


  return (
      <div>
        <NavBar user={auth.user}></NavBar>
        <PostContainer posts={posts}></PostContainer>
      </div>
  )
}
