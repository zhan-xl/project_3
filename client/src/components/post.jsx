import React, {useEffect, useState} from "react";
import "../style/post.css"
import axios from "axios";
import {Link} from "react-router-dom";

export default function Post(props) {

  return (
      <div className="grid-container">
        <div className="post-avatar-div">
          <img className="post-avatar"
               src={require("../img/charlie-avatar.png")}/>
        </div>
        <div>
          <Link to={"/profile"}
                state={{userName: props.user}}
                className="username">{props.user}
          </Link>
          <span className="date-and-time">{new Date(
              props.postTime).toLocaleString()}</span>
        </div>
        <div className="content">{props.postCont}</div>
      </div>
  )
}