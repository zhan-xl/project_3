import NavBar from "../components/navBar";
import PostContainer from "../components/postContainer";
import React, {createContext, useContext, useEffect, useState} from "react";
import {UserLogIn} from "../App";
import axios from "axios";

export default function Home() {

  const [userLogIn, setUserLogIn] = useState({logIn: false, userId: ""});
  const [username, setUserName] = useState("");

  useEffect(() => {
    const userLogInTemp = JSON.parse(localStorage.getItem("userLogIn"));
    async function fetchUserName() {
      const res = await axios.get(userLogInTemp.userId);
      return res.data.username;
    }
    if (userLogInTemp) {
      setUserLogIn(userLogInTemp);
      fetchUserName().then(res => {
        setUserName(res);
      });
    }
  }, []);

  return (
      <div>
        <NavBar userLogIn={userLogIn} username={username}></NavBar>
        <PostContainer></PostContainer>
      </div>
  )
}
