import NavBar from "../components/navBar";
import PostContainer from "../components/postContainer";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

export default function Home() {

  const {auth} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect( () => {
    const fetchUserName = async () => {
      const userName = await axios.get("/user/user");
      setUserName(userName.data);
      //console.log(userName.data);
    }
      const fetchPosts = async () => {
        const postRes = await axios.get("post");
        postRes.data.sort((a, b) => {
          return a.postTime < b.postTime ? 1 : -1;
        })
        setPosts(postRes.data);
      }
      fetchPosts().then();
      fetchUserName().then();
  }, []);


  return (
      <div>
        <NavBar user={userName}></NavBar>
        <PostContainer posts={posts}></PostContainer>
      </div>
  )
}
