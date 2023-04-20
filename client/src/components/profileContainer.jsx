import React, {useEffect, useState} from "react";
import "../style/profileContainer.css"
import "../style/post.css"
import axios from "axios";

export default function ProfileContainer(props) {

  const visitUserName = props.visitUserName;
  const [user, setUser] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (visitUserName) {
        try {
          const userResponse = await axios.get(
              "/user/findByName/" + visitUserName);
          setUser(userResponse.data); //join time, description, username
        } catch (err) {
          if (err.response.status === 422) {
            setNotFound(true);
          }
        }
      }
    }
    fetchUser().then();
  }, [visitUserName]);

  return (
      notFound ?
          <div>User does not exist</div>
          :
          (<div className="profile-container">
            <img className="profile-avatar"
                 src={require("../img/charlie-avatar.png")} alt=""></img>
            <div className="profile-username">{user.user}</div>
            <div className="profile-join-time">Joined on: {new Date(
                user.joinTime).toLocaleString().split(",")[0]}</div>
            <div className="description">{user.perDescr}</div>
          </div>)
  )
}