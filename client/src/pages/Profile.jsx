import React, {useEffect, useState} from "react";
import NavBar from "../components/navBar";
import PostContainer from "../components/postContainer";
import ProfileContainer from "../components/profileContainer";
import axios from "axios";

export default function Profile () {
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

  if (!username) {
    return null;
  }

  return (
      <div>
        <NavBar userId={userLogIn.userId} user={username}></NavBar>
        <ProfileContainer userId={userLogIn.userId} username={username}></ProfileContainer>
        <PostContainer userId={userLogIn.userId} username={username}></PostContainer>
      </div>
  )
}