import React, {useEffect, useState} from "react";
import "../style/profileContainer.css"
import "../style/post.css"
import axios from "axios";

// props.user = username
export default function ProfileContainer(props) {

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (props.user) {
        const userResponse = await axios.get("/user/findByName/" + props.user);
        setUser(userResponse.data); //join time, description, username
      }
    }
    fetchUser();
  }, []);

  return (
      <div className="profile-container">
        <img className="profile-avatar"
             src={require("../img/charlie-avatar.png")} alt=""></img>
        <div className="profile-username">{user.user}</div>
        <div className="profile-join-time">Joined on: {new Date(user.joinTime).toLocaleString().split(",")[0]}</div>
        <div className="description">{user.perDescr}</div>
      </div>
  )
}