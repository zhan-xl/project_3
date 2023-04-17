import React, {useContext, useEffect, useState} from "react";
import NavBar from "../components/navBar";
import PostContainer from "../components/postContainer";
import ProfileContainer from "../components/profileContainer";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

export default function Profile () {

  const {auth} = useContext(AuthContext);


  // useEffect(() => {
  //   const userLogInTemp = JSON.parse(localStorage.getItem("userLogIn"));
  //   async function fetchUserName() {
  //     const res = await axios.get(userLogInTemp.userId);
  //     return res.data.username;
  //   }
  //   if (userLogInTemp) {
  //     setUserLogIn(userLogInTemp);
  //     fetchUserName().then(res => {
  //       setUserName(res);
  //     });
  //   }
  // }, []);


  return (
      <div>
        <NavBar user={auth.user} ></NavBar>
        <ProfileContainer ></ProfileContainer>
        <PostContainer ></PostContainer>
      </div>
  )
}