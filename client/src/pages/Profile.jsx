import React, {useEffect, useState} from "react";
import NavBar from "../components/navBar";
import PostContainer from "../components/postContainer";
import ProfileContainer from "../components/profileContainer";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Profile() {

  const {visitUserName} = useParams(); // retrieve username from the url, the profile page is rendered for this user
  const [editable, setEditable] = useState(false); // boolean for if the user can edit the post
  const [logInUserName, setLogInUserName] = useState(""); // the user who logged in

  useEffect(() => {
    const fetchLogInUserName = async () => {
      try {
        const userResponse = await axios.get("/user");
        setLogInUserName(userResponse.data.user);
        setEditable(visitUserName === userResponse.data.user);
      } catch (err) {
        console.log(err);
      }
    }
    fetchLogInUserName().then();
  }, [visitUserName, editable]);

  return (
      <div>
        <NavBar logInUserName={logInUserName}></NavBar>
        <ProfileContainer visitUserName={visitUserName} editable={editable}></ProfileContainer>
        <PostContainer visitUserName={visitUserName} editable={editable}></PostContainer>
      </div>
  )
}