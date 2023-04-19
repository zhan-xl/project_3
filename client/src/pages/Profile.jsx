import React, {useEffect, useState} from "react";
import NavBar from "../components/navBar";
import PostContainer from "../components/postContainer";
import ProfileContainer from "../components/profileContainer";
import axios from "axios";
import {useLocation} from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const {userName} = location.state;
  const [editable, setEditable] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const userResponse = await axios.get("/user");
      setCurrentUser(userResponse.data.user);
      setEditable(userName === userResponse.data.user);
    }
    fetchUserName().then();
  }, []);

  return (
      <div>
        <NavBar user={currentUser}></NavBar>
        <ProfileContainer user={userName}></ProfileContainer>
        <PostContainer user={userName} editable={editable}></PostContainer>
      </div>
  )
}