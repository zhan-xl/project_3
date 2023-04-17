import React, {useEffect, useState} from "react";
import "../style/profileContainer.css"
import "../style/post.css"
import axios from "axios";

export default function ProfileContainer(props) {

  const [joinTime, setJoinTime] = useState(new Date().toString());
  const [description, setDescription] = useState("Default");

  useEffect( () => {
    if(props.username) {
      async function fetchUserInformation() {
        const res = await axios.get(props.userId);
        return res.data;
      }
      fetchUserInformation().then(res => {
        setDescription(res.personalDescription);
        setJoinTime(res.joinTime);
      });
    }
  }, []);

  return (
      <div className="profile-container">
        <img className="profile-avatar"
             src={require("../img/charlie-avatar.png")}></img>
        <div className="profile-username">{props.username}</div>
        <div className="profile-join-time">{new Date(joinTime).toLocaleString()}</div>
        <div className="description">{description}</div>
      </div>
  )
}