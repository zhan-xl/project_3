import React, {useEffect, useState} from "react";
import "./post.css"
import axios from "axios";
import {Link} from "react-router-dom";

export default function Post(props) {

  const [username, setUserName] = useState("");

  useEffect(() => {
    async function fetchUserName() {
      const res = await axios.get(props.userId);
      return res.data.username;
    }

    fetchUserName().then(res => {
      setUserName(res);
    });
  }, []);

  return (
      <div className="grid-container">
        <div className="post-avatar-div">
          <img className="post-avatar"
               src={require("../img/charlie-avatar.png")}/>
        </div>
        <div>
          <span className="username">
            <Link to={"/profile"}>{username}</Link>
          </span>
          <span className="date-and-time">{props.postTime}</span>
        </div>
        <div className="content">{props.content}</div>
      </div>
  )
}